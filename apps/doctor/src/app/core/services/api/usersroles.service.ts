import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class USERSROLESService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/users
   * ID: AO-01
Query: role, status, search, page, size
   */
  getAdminUsers(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return this.http.get(`${this.baseUrl}/admin/users`, { params: httpParams });
  }

  /**
   * GET /admin/users/{id}
   * ID: AO-02
Returns: AdminUser (full)
   */
  getAdminUsersId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/users/${id}`);
  }

  /**
   * POST /admin/users/invite
   * ID: AO-03
Body: { email, firstName, lastName, roles[] }
   */
  postAdminUsersInvite(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/users/invite`, payload);
  }

  /**
   * PUT /admin/users/{id}
   * ID: AO-04
Body: AdminUserUpdate
   */
  putAdminUsersId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/users/${id}`, payload);
  }

  /**
   * PUT /admin/users/{id}/roles
   * ID: AO-05
Body: { roles: string[] }
   */
  putAdminUsersIdRoles(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/users/${id}/roles`, payload);
  }

  /**
   * PUT /admin/users/{id}/suspend
   * ID: AO-06
Body: { reason }
   */
  putAdminUsersIdSuspend(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/users/${id}/suspend`, payload);
  }

  /**
   * PUT /admin/users/{id}/activate
   * ID: AO-07
Returns: AdminUser
   */
  putAdminUsersIdActivate(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/users/${id}/activate`, payload);
  }

  /**
   * DELETE /admin/users/{id}
   * ID: AO-08
Body: { reason }
   */
  deleteAdminUsersId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/users/${id}`);
  }

  /**
   * POST /admin/users/{id}/reset-2fa
   * ID: AO-09
Action: invalidate existing 2FA
   */
  postAdminUsersIdReset2fa(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/users/${id}/reset-2fa`, payload);
  }

  /**
   * POST /admin/users/{id}/force-password-reset
   * ID: AO-10
Action: invalidate password
   */
  postAdminUsersIdForcepasswordreset(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/users/${id}/force-password-reset`, payload);
  }

  /**
   * GET /admin/users/{id}/audit-log
   * ID: AO-11
Returns: Page<AuditLog> (actions by this user)
   */
  getAdminUsersIdAuditlog(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/users/${id}/audit-log`);
  }

  /**
   * GET /admin/users/roles-summary
   * ID: AO-12
Returns: { role, count }[]
   */
  getAdminUsersRolessummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/users/roles-summary`);
  }

}
