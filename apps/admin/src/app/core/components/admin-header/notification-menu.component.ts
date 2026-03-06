import {
  Component,
  inject,
  signal,
  HostListener,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '@core/services/api/notifications.service';
import { ZrdCardComponent } from '@repo/ui';
import { Notification, NotificationType } from '@repo/types';

@Component({
  selector: 'app-admin-notification-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    ZrdCardComponent
  ],
  template: `
    <!-- Trigger Button -->
    <button 
      (click)="toggle()" 
      class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-100 dark:hover:bg-white/5 text-google-gray-600 dark:text-google-gray-400 transition-all relative outline-none focus:ring-2 focus:ring-google-blue/30"
      matTooltip="Notifications"
    >
      <mat-icon>notifications_none</mat-icon>
      @if (notificationService.unreadCount() > 0) {
        <span class="absolute top-2 right-2 w-2 h-2 bg-google-red rounded-full border-2 border-white dark:border-google-gray-900 animate-pulse"></span>
      }
    </button>

    <!-- Notification Panel -->
    @if (isOpen()) {
      <div class="fixed inset-0 z-[998]" (click)="close()"></div>
      <div class="absolute top-[calc(100%+12px)] right-0 w-[360px] sm:w-[400px] z-[999] animate-in fade-in zoom-in-95 duration-200">
        <zrd-card variant="default" class="p-0 overflow-hidden !rounded-[24px] bg-white dark:bg-google-gray-900 border border-google-gray-200 dark:border-white/10 shadow-2xl">
          
          <!-- Header -->
          <div class="p-5 pb-3 border-b border-google-gray-100 dark:border-white/10 flex items-center justify-between">
            <h3 class="text-lg font-medium text-google-gray-900 dark:text-white m-0">Notifications</h3>
            @if (notificationService.unreadCount() > 0) {
              <button (click)="markAllAsRead()" class="text-xs font-medium text-google-blue hover:underline bg-transparent border-none cursor-pointer p-1">
                Mark all as read
              </button>
            }
          </div>

          <!-- Notification List -->
          <div class="max-h-[480px] overflow-y-auto custom-scrollbar">
            @if (notificationService.loading()) {
              <div class="p-8 flex flex-col items-center justify-center text-center">
                 <div class="w-8 h-8 border-2 border-google-blue border-t-transparent rounded-full animate-spin mb-3"></div>
                 <p class="text-sm text-google-gray-500">Loading notifications...</p>
              </div>
            } @else if (notificationService.notifications().length === 0) {
              <div class="p-12 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 rounded-full bg-google-gray-50 dark:bg-white/5 flex items-center justify-center mb-4">
                  <mat-icon class="text-3xl text-google-gray-300">notifications_off</mat-icon>
                </div>
                <h4 class="text-base font-medium text-google-gray-900 dark:text-white mb-1">No notifications yet</h4>
                <p class="text-sm text-google-gray-500 max-w-[200px]">When you receive updates, they'll show up here.</p>
              </div>
            } @else {
              <div class="divide-y divide-google-gray-50 dark:divide-white/5">
                @for (item of notificationService.notifications(); track item.id) {
                  <div 
                    class="p-4 px-5 hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group relative"
                    [class.bg-google-blue/5]="item.status === 'UNREAD'"
                    (click)="onNotificationClick(item)"
                  >
                    <div class="flex gap-4">
                      <!-- Status Dot -->
                      @if (item.status === 'UNREAD') {
                        <div class="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-google-blue"></div>
                      }

                      <!-- Icon based on type -->
                      <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm" [ngClass]="getIconBg(item.type)">
                        <mat-icon class="text-white text-xl">{{ getIcon(item.type) }}</mat-icon>
                      </div>

                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-0.5">
                          <span class="text-sm font-medium text-google-gray-900 dark:text-white truncate pr-2">
                             {{ item.title }}
                          </span>
                          <span class="text-[11px] text-google-gray-400 whitespace-nowrap">
                             {{ formatTime(item.createdAt) }}
                          </span>
                        </div>
                        <p class="text-sm text-google-gray-500 dark:text-google-gray-400 line-clamp-2 leading-snug">
                          {{ item.message }}
                        </p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="p-3 border-t border-google-gray-100 dark:border-white/10 text-center">
            <a routerLink="/notifications" (click)="close()" class="text-sm font-medium text-google-blue hover:text-google-blue/80 transition-colors">
              See all notifications
            </a>
          </div>
        </zrd-card>
      </div>
    }
  `,
  styles: [`
    :host { position: relative; display: inline-block; }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
  `]
})
export class NotificationMenuComponent implements OnInit {
  notificationService = inject(NotificationService);
  private elRef = inject(ElementRef);

  isOpen = signal(false);

  ngOnInit() {
    this.notificationService.getUnreadCount().subscribe();
  }

  toggle() { 
    this.isOpen.update(v => !v); 
    if (this.isOpen()) {
      this.notificationService.getNotifications().subscribe();
    }
  }

  close()  { this.isOpen.set(false); }

  getIcon(type: NotificationType): string {
    switch (type) {
      case NotificationType.APPOINTMENT_BOOKED: return 'event_available';
      case NotificationType.APPOINTMENT_CANCELLED: return 'event_busy';
      case NotificationType.APPOINTMENT_REMINDER: return 'alarm';
      case NotificationType.PRESCRIPTION_ADDED: return 'description';
      case NotificationType.LAB_REPORT_READY: return 'biotech';
      case NotificationType.PAYMENT_SUCCESS: return 'payments';
      case NotificationType.SYSTEM_ALERT: return 'warning';
      default: return 'notifications';
    }
  }

  getIconBg(type: NotificationType): string {
    switch (type) {
      case NotificationType.APPOINTMENT_BOOKED: return 'bg-google-emerald';
      case NotificationType.APPOINTMENT_CANCELLED: return 'bg-google-red';
      case NotificationType.APPOINTMENT_REMINDER: return 'bg-google-blue';
      case NotificationType.PRESCRIPTION_ADDED: return 'bg-google-blue';
      case NotificationType.LAB_REPORT_READY: return 'bg-google-emerald';
      case NotificationType.PAYMENT_SUCCESS: return 'bg-google-emerald';
      case NotificationType.SYSTEM_ALERT: return 'bg-google-red';
      default: return 'bg-google-gray-400';
    }
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // minutes

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date.toLocaleDateString();
  }

  onNotificationClick(item: Notification) {
    if (item.status === 'UNREAD') {
      this.notificationService.markAsRead(item.id).subscribe();
    }
    // Optionally redirect based on type
    this.close();
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() { this.close(); }
}
