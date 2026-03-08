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
   * GET /audit
   * Fetch all system audit logs with pagination
   */
  getAdminAuditLogs(page: number = 0, size: number = 10, sort?: string, direction: string = 'DESC'): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('direction', direction);
    
    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get(`${this.baseUrl}/audit`, { params });
  }

  /**
   * GET /audit/entity/{name}/{id}
   * Get audit logs for a specific entity instance
   */
  getAdminAuditLogsId(name: string, id: string, page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get(`${this.baseUrl}/audit/entity/${name}/${id}`, { params });
  }

  /**
   * GET /audit/export (Placeholder)
   */
  getAdminAuditLogsExport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/audit/export`);
  }

  /**
   * GET /audit/stats (Placeholder)
   */
  getAdminAuditStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/audit/stats`);
  }
}
