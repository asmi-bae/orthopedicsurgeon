import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class LABREPORTSService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/lab-reports
   * ID: AI-01
Auth: LAB_TECH, DOCTOR, ADMIN, SUPER_ADMIN
   */
  getAdminLabreports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/lab-reports`);
  }

  /**
   * GET /admin/lab-reports/{id}
   * ID: AI-02
Returns: LabReport + presigned URL
   */
  getAdminLabreportsId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/lab-reports/${id}`);
  }

  /**
   * POST /admin/lab-reports
   * ID: AI-03
Auth: LAB_TECH, ADMIN
   */
  postAdminLabreports(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/lab-reports`, payload);
  }

  /**
   * PUT /admin/lab-reports/{id}/status
   * ID: AI-04
Auth: LAB_TECH, DOCTOR, ADMIN
   */
  putAdminLabreportsIdStatus(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/lab-reports/${id}/status`, payload);
  }

  /**
   * DELETE /admin/lab-reports/{id}
   * ID: AI-05
Auth: ADMIN, SUPER_ADMIN
   */
  deleteAdminLabreportsId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/lab-reports/${id}`);
  }

}
