import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ADMINSESSIONDEVICESECURITYService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/security/my-sessions
   * ID: AB-01
Returns: Session[] (own active sessions)
   */
  getAdminSecurityMysessions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/security/my-sessions`);
  }

  /**
   * DELETE /admin/security/sessions/{sessionId}
   * ID: AB-02
Security: own session only (except SUPER_ADMIN)
   */
  deleteAdminSecuritySessionsSessionId(sessionId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/security/sessions/${sessionId}`);
  }

  /**
   * DELETE /admin/security/sessions/all-except-current
   * ID: AB-03
Returns: { terminated: count }
   */
  deleteAdminSecuritySessionsAllexceptcurrent(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/security/sessions/all-except-current`);
  }

  /**
   * GET /admin/security/my-devices
   * ID: AB-04
Returns: TrustedDevice[]
   */
  getAdminSecurityMydevices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/security/my-devices`);
  }

  /**
   * DELETE /admin/security/devices/{deviceId}
   * ID: AB-05
Returns: { success }
   */
  deleteAdminSecurityDevicesDeviceId(deviceId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/security/devices/${deviceId}`);
  }

  /**
   * GET /admin/security/login-history
   * ID: AB-06
Query: page, size
   */
  getAdminSecurityLoginhistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/security/login-history`);
  }

  /**
   * GET /admin/security/active-admin-sessions
   * ID: AB-07
Auth: SUPER_ADMIN only
   */
  getAdminSecurityActiveadminsessions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/security/active-admin-sessions`);
  }

  /**
   * DELETE /admin/security/force-logout/{userId}
   * ID: AB-08
Auth: SUPER_ADMIN only
   */
  deleteAdminSecurityForcelogoutUserId(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/security/force-logout/${userId}`);
  }

  /**
   * POST /admin/security/ip-allowlist
   * ID: AB-09
Auth: SUPER_ADMIN only
   */
  postAdminSecurityIpallowlist(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/security/ip-allowlist`, payload);
  }

  /**
   * GET /admin/security/ip-allowlist/{userId}
   * ID: AB-10
Auth: SUPER_ADMIN only
   */
  getAdminSecurityIpallowlistUserId(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/security/ip-allowlist/${userId}`);
  }

  /**
   * DELETE /admin/security/ip-allowlist/{userId}
   * ID: AB-11
Auth: SUPER_ADMIN only
   */
  deleteAdminSecurityIpallowlistUserId(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/security/ip-allowlist/${userId}`);
  }

  /**
   * GET /admin/security/alerts
   * ID: AB-12
Auth: SUPER_ADMIN, ADMIN
   */
  getAdminSecurityAlerts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/security/alerts`);
  }

  /**
   * PUT /admin/security/alerts/{id}/resolve
   * ID: AB-13
Auth: SUPER_ADMIN, ADMIN
   */
  putAdminSecurityAlertsIdResolve(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/security/alerts/${id}/resolve`, payload);
  }

  /**
   * POST /admin/security/lock-account/{userId}
   * ID: AB-14
Auth: SUPER_ADMIN only
   */
  postAdminSecurityLockaccountUserId(userId: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/security/lock-account/${userId}`, payload);
  }

  /**
   * POST /admin/security/unlock-account/{userId}
   * ID: AB-15
Auth: SUPER_ADMIN only
   */
  postAdminSecurityUnlockaccountUserId(userId: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/security/unlock-account/${userId}`, payload);
  }

  /**
   * GET /admin/security/suspicious-activity
   * ID: AB-16
Auth: SUPER_ADMIN only
   */
  getAdminSecuritySuspiciousactivity(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/security/suspicious-activity`);
  }

  /**
   * POST /admin/security/change-password
   * ID: AB-17
Auth: any admin [JWT]
   */
  postAdminSecurityChangepassword(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/security/change-password`, payload);
  }

}
