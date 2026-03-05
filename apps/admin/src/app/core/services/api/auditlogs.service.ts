import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AUDITLOGSService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/audit/logs
   * ID: AP-01
Auth: SUPER_ADMIN, ADMIN
   */
  getAdminAuditLogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/audit/logs`);
  }

  /**
   * GET /admin/audit/logs/{id}
   * ID: AP-02
Returns: AuditLog (with JSON diff old→new)
   */
  getAdminAuditLogsId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/audit/logs/${id}`);
  }

  /**
   * GET /admin/audit/logs/export
   * ID: AP-03
Auth: SUPER_ADMIN only
   */
  getAdminAuditLogsExport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/audit/logs/export`);
  }

  /**
   * GET /admin/audit/stats
   * ID: AP-04
Returns: { totalToday, byAction, byEntity,
   */
  getAdminAuditStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/audit/stats`);
  }

}
