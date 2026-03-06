import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, interval, switchMap, startWith } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, PageResponse, Notification } from '@repo/types';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/notifications`;

  unreadCount = signal<number>(0);
  notifications = signal<Notification[]>([]);
  loading = signal<boolean>(false);

  constructor() {
    // Poll unread count every 60 seconds
    interval(60000)
      .pipe(
        startWith(0),
        switchMap(() => this.getUnreadCount())
      )
      .subscribe(res => {
        if (res.success) {
          this.unreadCount.set(res.data);
        }
      });
  }

  getNotifications(page = 0, size = 10): Observable<ApiResponse<PageResponse<Notification>>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'createdAt')
      .set('direction', 'DESC');

    this.loading.set(true);
    return this.http.get<ApiResponse<PageResponse<Notification>>>(this.baseUrl, { params }).pipe(
      tap(res => {
        if (res.success) {
          this.notifications.set(res.data.content);
        }
        this.loading.set(false);
      })
    );
  }

  getUnreadCount(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${this.baseUrl}/unread-count`).pipe(
      tap(res => {
        if (res.success) {
          this.unreadCount.set(res.data);
        }
      })
    );
  }

  markAsRead(id: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/${id}/read`, {}).pipe(
      tap(res => {
        if (res.success) {
          this.getUnreadCount().subscribe();
          this.notifications.update(list => 
            list.map(n => n.id === id ? { ...n, status: 'READ' as any } : n)
          );
        }
      })
    );
  }

  markAllAsRead(): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/read-all`, {}).pipe(
      tap(res => {
        if (res.success) {
          this.unreadCount.set(0);
          this.notifications.update(list => 
            list.map(n => ({ ...n, status: 'READ' as any }))
          );
        }
      })
    );
  }
}
