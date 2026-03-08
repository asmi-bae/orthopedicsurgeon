export enum NotificationType {
  APPOINTMENT_BOOKED = 'APPOINTMENT_BOOKED',
  APPOINTMENT_CANCELLED = 'APPOINTMENT_CANCELLED',
  APPOINTMENT_REMINDER = 'APPOINTMENT_REMINDER',
  PRESCRIPTION_ADDED = 'PRESCRIPTION_ADDED',
  LAB_REPORT_READY = 'LAB_REPORT_READY',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  SYSTEM_ALERT = 'SYSTEM_ALERT'
}

export enum NotificationChannel {
  IN_APP = 'IN_APP',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH'
}

export enum NotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  ARCHIVED = 'ARCHIVED'
}

export enum NotificationLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  channel: NotificationChannel;
  status: NotificationStatus;
  isRead: boolean;
  isGlobal: boolean;
  severity: NotificationLevel;
  createdAt: string;
}

export interface NotificationListResponse {
  notifications: import('./api.models').PageResponse<Notification>;
  unreadCount: number;
}
