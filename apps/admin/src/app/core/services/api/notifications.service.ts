import { Injectable, inject, signal, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, shareReplay, finalize } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, PageResponse, Notification as NotificationModel } from '@repo/types';
import { AuthService } from '@repo/auth';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private baseUrl = `${environment.apiUrl}/notifications`;
  private streamUrl = `${environment.apiUrl}/notifications/stream`;

  private eventSource: EventSource | null = null;

  unreadCount = signal<number>(0);
  notifications = signal<NotificationModel[]>([]);
  loading = signal<boolean>(false);
  private unreadCountRequest$: Observable<ApiResponse<number>> | null = null;

  constructor() {
    this.connectSse();
  }

  private connectSse() {
    if (this.eventSource) {
      this.eventSource.close();
    }

    const token = this.auth.token();
    if (!token) return;

    const urlWithToken = `${this.streamUrl}?token=${token}`;
    this.eventSource = new EventSource(urlWithToken);

    this.eventSource.addEventListener('CONNECT', (event: any) => {
      console.log('SSE Connected:', event.data);
      this.getUnreadCount().subscribe();
    });

    this.eventSource.addEventListener('NOTIFICATION', (event: any) => {
      try {
        const notification: NotificationModel = JSON.parse(event.data);
        this.handleNewNotification(notification);
      } catch (err) {
        console.error('Error parsing SSE notification:', err);
      }
    });

    this.eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      this.eventSource?.close();
      this.eventSource = null;
      // Wait for a new token or retry after a delay (e.g., 5 seconds)
      setTimeout(() => {
        if (this.auth.isLoggedIn()) {
          this.connectSse();
        }
      }, 5000);
    };
  }

  private handleNewNotification(notification: NotificationModel) {
    this.notifications.update(prev => {
      const exists = prev.some(n => n.id === notification.id);
      if (exists) return prev;
      return [notification, ...prev].slice(0, 10);
    });
    this.unreadCount.update(count => count + 1);
    
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, { body: notification.message });
    }
  }

  getNotifications(page = 0, size = 10): Observable<ApiResponse<PageResponse<NotificationModel>>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'createdAt')
      .set('direction', 'DESC');

    this.loading.set(true);
    return this.http.get<ApiResponse<PageResponse<NotificationModel>>>(this.baseUrl, { params }).pipe(
      tap(res => {
        if (res.success) {
          this.notifications.set(res.data.content);
        }
        this.loading.set(false);
      })
    );
  }

  getUnreadCount(): Observable<ApiResponse<number>> {
    if (this.unreadCountRequest$) {
      return this.unreadCountRequest$;
    }

    this.unreadCountRequest$ = this.http.get<ApiResponse<number>>(`${this.baseUrl}/unread-count`).pipe(
      tap(res => {
        if (res.success) {
          this.unreadCount.set(res.data);
        }
      }),
      finalize(() => {
        this.unreadCountRequest$ = null;
      }),
      shareReplay(1)
    );

    return this.unreadCountRequest$;
  }

  markAsRead(id: string): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.baseUrl}/${id}/read`, {}).pipe(
      tap(res => {
        if (res.success) {
          this.unreadCount.update(c => Math.max(0, c - 1));
          this.notifications.update(list => 
            list.map(n => n.id === id ? { ...n, isRead: true, status: 'READ' as any } : n)
          );
        }
      })
    );
  }

  markAllAsRead(): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.baseUrl}/mark-all-read`, {}).pipe(
      tap(res => {
        if (res.success) {
          this.unreadCount.set(0);
          this.notifications.update(list => 
            list.map(n => ({ ...n, isRead: true, status: 'READ' as any }))
          );
        }
      })
    );
  }

  deleteNotification(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(
      tap(res => {
        if (res.success) {
          this.notifications.update(list => list.filter(n => n.id !== id));
          // Update unread count if the deleted one was unread
          this.getUnreadCount().subscribe();
        }
      })
    );
  }

  ngOnDestroy() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
