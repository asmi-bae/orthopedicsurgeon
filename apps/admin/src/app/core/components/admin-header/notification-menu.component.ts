import {
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationService } from '@core/services/api/notifications.service';
import { Notification as NotificationModel, NotificationType, NotificationLevel } from '@repo/types';

@Component({
  selector: 'app-admin-notification-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatMenuModule,
    MatBadgeModule,
  ],
  template: `
    <!-- Trigger Button wrapped with MatMenu -->
    <button 
      [matMenuTriggerFor]="menu"
      class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-google-gray-100 dark:hover:bg-white/5 text-google-gray-600 dark:text-google-gray-400 transition-all relative outline-none focus:ring-2 focus:ring-google-blue/30"
      matTooltip="Notifications"
    >
      <mat-icon 
        [matBadge]="notificationService.unreadCount()" 
        [matBadgeHidden]="notificationService.unreadCount() === 0"
        matBadgeColor="warn"
        matBadgeSize="small"
        aria-hidden="false"
      >notifications_none</mat-icon>
    </button>

    <mat-menu #menu="matMenu" xPosition="before" class="notification-menu-panel !rounded-[24px] !p-0 overflow-hidden shadow-2xl">
      <div class="w-[calc(100vw-32px)] sm:w-[420px] max-w-[420px] bg-white dark:bg-google-gray-900 border border-google-gray-200 dark:border-white/10" (click)="$event.stopPropagation()">
          <!-- Header -->
          <div class="p-5 pb-3 border-b border-google-gray-100 dark:border-white/10 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-google-gray-900 dark:text-white m-0">Notifications</h3>
            @if (notificationService.unreadCount() > 0) {
              <button (click)="markAllAsRead()" class="text-xs font-medium text-google-blue hover:text-google-blue-700 bg-transparent border-none cursor-pointer p-1 transition-colors">
                Mark all as read
              </button>
            }
          </div>

          <!-- Notification List -->
          <div class="max-h-[480px] overflow-y-auto custom-scrollbar">
            @if (notificationService.loading()) {
              <div class="p-12 flex flex-col items-center justify-center text-center">
                 <div class="w-8 h-8 border-2 border-google-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p class="text-sm text-google-gray-500">Loading notifications...</p>
              </div>
            } @else if (notificationService.notifications().length === 0) {
              <div class="p-16 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 rounded-full bg-google-gray-50 dark:bg-white/5 flex items-center justify-center mb-4">
                  <mat-icon class="text-4xl text-google-gray-300 dark:text-google-gray-700">notifications_off</mat-icon>
                </div>
                <h4 class="text-base font-semibold text-google-gray-900 dark:text-white mb-1">No notifications yet</h4>
                <p class="text-sm text-google-gray-500 dark:text-google-gray-400 max-w-[220px] mx-auto">When you receive updates, they'll show up here.</p>
              </div>
            } @else {
              <div class="divide-y divide-google-gray-50 dark:divide-white/5">
                @for (item of notificationService.notifications(); track item.id) {
                  <div 
                    class="p-4 px-5 hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all cursor-pointer group relative"
                    [class.bg-google-blue/5]="!item.isRead"
                    (click)="onNotificationClick(item)"
                  >
                    <div class="flex gap-4">
                      <!-- Status Dot -->
                      @if (!item.isRead) {
                        <div class="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-google-blue shadow-[0_0_0_2px_rgba(255,255,255,1)] dark:shadow-[0_0_0_2px_#1a1b1c]"></div>
                      }

                      <!-- Icon based on severity & type -->
                      <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105" [ngClass]="getIconBg(item)">
                        <mat-icon class="text-white text-xl">{{ getIcon(item.type) }}</mat-icon>
                      </div>

                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-0.5">
                          <span class="text-sm font-medium text-google-gray-900 dark:text-white truncate pr-2" [class.font-bold]="!item.isRead">
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
                      
                      <!-- Delete Action -->
                      <div class="flex items-center">
                        <button 
                          (click)="onDelete($event, item.id)"
                          class="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-google-red/10 dark:hover:bg-google-red/20 rounded-full transition-all text-google-gray-400 hover:text-google-red"
                          matTooltip="Delete"
                        >
                          <mat-icon class="text-base">delete_outline</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-google-gray-100 dark:border-white/10 text-center bg-google-gray-50/30 dark:bg-white/2">
            <a routerLink="/notifications" class="text-sm font-semibold text-google-blue hover:text-google-blue-700 transition-colors inline-flex items-center gap-1">
              See all notifications
              <mat-icon class="text-sm">chevron_right</mat-icon>
            </a>
          </div>
      </div>
    </mat-menu>
  `,
  styles: [`
    :host { display: inline-block; }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
    ::ng-deep .notification-menu-panel { background: transparent !important; box-shadow: none !important; margin-top: 12px !important; max-width: none !important; }
  `]
})
export class NotificationMenuComponent implements OnInit {
  notificationService = inject(NotificationService);

  ngOnInit() {
    this.notificationService.getNotifications().subscribe();
  }

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

  getIconBg(item: NotificationModel): string {
    if (item.severity === NotificationLevel.ERROR) return 'bg-google-red';
    if (item.severity === NotificationLevel.WARNING) return 'bg-orange-500';
    if (item.severity === NotificationLevel.SUCCESS) return 'bg-google-emerald';
    
    switch (item.type) {
      case NotificationType.APPOINTMENT_CANCELLED: return 'bg-google-red';
      case NotificationType.SYSTEM_ALERT: return 'bg-google-red';
      case NotificationType.PAYMENT_SUCCESS: return 'bg-google-emerald';
      default: return 'bg-google-blue';
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

  onNotificationClick(item: NotificationModel) {
    if (!item.isRead) {
      this.notificationService.markAsRead(item.id).subscribe();
    }
  }

  onDelete(event: Event, id: string) {
    event.stopPropagation();
    this.notificationService.deleteNotification(id).subscribe();
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe();
  }
}
