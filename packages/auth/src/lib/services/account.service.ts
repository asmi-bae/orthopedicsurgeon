import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '@repo/types';
import { AuthService, AUTH_API_URL } from './auth.service';

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: string;
  imageUrl?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = inject(AUTH_API_URL).replace('/auth', '/account');

  updateProfile(request: UpdateProfileRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, request).pipe(
      tap(res => {
        if (res.data) {
          this.authService.updateCurrentUser(res.data);
        }
      })
    );
  }

  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/password`, request);
  }

  // Session Management
  getSessions(): Observable<any[]> {
    return this.http.get<any[]>(`/api/v1/auth/sessions`);
  }

  revokeSession(sessionId: string): Observable<void> {
    return this.http.delete<void>(`/api/v1/auth/sessions/${sessionId}`);
  }

  revokeOtherSessions(): Observable<void> {
    return this.http.delete<void>(`/api/v1/auth/sessions/other`);
  }

  // 2FA Management
  setup2fa(): Observable<any> {
    return this.http.post<any>(`/api/v1/auth/2fa/setup`, {});
  }

  confirm2fa(code: string): Observable<void> {
    return this.http.post<void>(`/api/v1/auth/2fa/confirm-setup`, { code });
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`/api/v1/admin/auth/me`);
  }
}
