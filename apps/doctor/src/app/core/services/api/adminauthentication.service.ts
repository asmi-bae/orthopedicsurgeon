import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ADMINAUTHENTICATIONService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * POST /admin/auth/login
   * ID: AA-01
Body: { email, password, deviceFingerprint,
   */
  postAdminAuthLogin(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/login`, payload);
  }

  /**
   * POST /admin/auth/login/mfa
   * ID: AA-02
Body: { sessionToken, totpCode OR backupCode,
   */
  postAdminAuthLoginMfa(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/login/mfa`, payload);
  }

  /**
   * POST /admin/auth/login/sso/google
   * ID: AA-03
Initiates Google Workspace SSO
   */
  postAdminAuthLoginSsoGoogle(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/login/sso/google`, payload);
  }

  /**
   * GET /admin/auth/login/sso/google/callback
   * ID: AA-04
Handles SSO callback
   */
  getAdminAuthLoginSsoGoogleCallback(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/auth/login/sso/google/callback`);
  }

  /**
   * POST /admin/auth/login/sso/saml/initiate
   * ID: AA-05
SAML 2.0 SP-initiated SSO
   */
  postAdminAuthLoginSsoSamlInitiate(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/login/sso/saml/initiate`, payload);
  }

  /**
   * POST /admin/auth/login/sso/saml/callback
   * ID: AA-06
Handles SAML assertion
   */
  postAdminAuthLoginSsoSamlCallback(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/login/sso/saml/callback`, payload);
  }

  /**
   * POST /admin/auth/login/passkey/begin
   * ID: AA-07
Body: { email }
   */
  postAdminAuthLoginPasskeyBegin(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/login/passkey/begin`, payload);
  }

  /**
   * POST /admin/auth/login/passkey/complete
   * ID: AA-08
Body: { email, credentialResponse }
   */
  postAdminAuthLoginPasskeyComplete(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/login/passkey/complete`, payload);
  }

  /**
   * POST /admin/auth/refresh
   * ID: AA-09
Cookie: refreshToken
   */
  postAdminAuthRefresh(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/refresh`, payload);
  }

  /**
   * POST /admin/auth/logout
   * ID: AA-10
Header: Authorization Bearer
   */
  postAdminAuthLogout(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/logout`, payload);
  }

  /**
   * POST /admin/auth/logout/all-sessions
   * ID: AA-11
Auth: any admin [JWT]
   */
  postAdminAuthLogoutAllsessions(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/logout/all-sessions`, payload);
  }

  /**
   * GET /admin/auth/session/verify
   * ID: AA-12
Header: Authorization Bearer
   */
  getAdminAuthSessionVerify(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/auth/session/verify`);
  }

  /**
   * POST /admin/auth/session/heartbeat
   * ID: AA-13
Header: Authorization Bearer
   */
  postAdminAuthSessionHeartbeat(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/session/heartbeat`, payload);
  }

  /**
   * POST /admin/auth/2fa/setup/begin
   * ID: AA-14
Auth: any admin [JWT]
   */
  postAdminAuth2faSetupBegin(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/2fa/setup/begin`, payload);
  }

  /**
   * POST /admin/auth/2fa/setup/verify
   * ID: AA-15
Auth: any admin [JWT]
   */
  postAdminAuth2faSetupVerify(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/2fa/setup/verify`, payload);
  }

  /**
   * POST /admin/auth/2fa/backup-codes/regenerate
   * ID: AA-16
Auth: any admin [JWT]
   */
  postAdminAuth2faBackupcodesRegenerate(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/2fa/backup-codes/regenerate`, payload);
  }

  /**
   * POST /admin/auth/passkey/register/begin
   * ID: AA-17
Auth: any admin [JWT]
   */
  postAdminAuthPasskeyRegisterBegin(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/passkey/register/begin`, payload);
  }

  /**
   * POST /admin/auth/passkey/register/complete
   * ID: AA-18
Auth: any admin [JWT]
   */
  postAdminAuthPasskeyRegisterComplete(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/auth/passkey/register/complete`, payload);
  }

  /**
   * GET /admin/auth/sso/providers
   * ID: AA-19
Auth: SUPER_ADMIN [JWT]
   */
  getAdminAuthSsoProviders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/auth/sso/providers`);
  }

  /**
   * PUT /admin/auth/sso/providers/{id}
   * ID: AA-20
Auth: SUPER_ADMIN [JWT]
   */
  putAdminAuthSsoProvidersId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/auth/sso/providers/${id}`, payload);
  }

  /**
   * GET /admin/auth/me
   * Get current authenticated admin profile
   */
  getAdminAuthMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/auth/me`);
  }

}
