import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorAuthService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl || 'http://localhost:8080/api/v1'}/doctor/auth`;

  login(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }

  verifyMfa(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/mfa`, payload);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
  }

  refresh(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh`, payload);
  }

  logout(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, payload);
  }

  forgotPassword(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, payload);
  }

  resetPassword(token: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password/${token}`, payload);
  }

  logoutAllSessions(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout/all-sessions`, {});
  }

  verifySession(): Observable<any> {
    return this.http.get(`${this.baseUrl}/session/verify`);
  }

  sessionHeartbeat(): Observable<any> {
    return this.http.post(`${this.baseUrl}/session/heartbeat`, {});
  }

  setup2faBegin(): Observable<any> {
    return this.http.post(`${this.baseUrl}/2fa/setup/begin`, {});
  }

  setup2faVerify(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/2fa/setup/verify`, payload);
  }

  regenerateBackupCodes(): Observable<any> {
    return this.http.post(`${this.baseUrl}/2fa/backup-codes/regenerate`, {});
  }

  passkeyRegisterBegin(): Observable<any> {
    return this.http.post(`${this.baseUrl}/passkey/register/begin`, {});
  }

  passkeyRegisterComplete(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/passkey/register/complete`, payload);
  }

  getSsoProviders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sso/providers`);
  }

  updateSsoProvider(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/sso/providers/${id}`, payload);
  }
}
