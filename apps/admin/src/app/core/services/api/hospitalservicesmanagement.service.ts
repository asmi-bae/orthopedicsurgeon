import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HOSPITALSERVICESMANAGEMENTService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/hospital
   * ID: AS-01
AS-02  PUT  /admin/hospital
   */
  getAdminHospital(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/hospital`);
  }

  /**
   * PUT /admin/hospital
   * ID: AS-02
Auth: ADMIN, SUPER_ADMIN
   */
  putAdminHospital(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/hospital`, payload);
  }

  /**
   * GET /admin/hospital/services
   * ID: AS-03
AS-04  POST /admin/hospital/services
   */
  getAdminHospitalServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/hospital/services`);
  }

  /**
   * POST /admin/hospital/services
   * ID: AS-04
AS-05  PUT  /admin/hospital/services/{id}
   */
  postAdminHospitalServices(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/hospital/services`, payload);
  }

  /**
   * PUT /admin/hospital/services/{id}
   * ID: AS-05
AS-06  DELETE /admin/hospital/services/{id}
   */
  putAdminHospitalServicesId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/hospital/services/${id}`, payload);
  }

  /**
   * DELETE /admin/hospital/services/{id}
   * ID: AS-06
AS-07  PUT  /admin/hospital/services/{id}/status
   */
  deleteAdminHospitalServicesId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/hospital/services/${id}`);
  }

  /**
   * PUT /admin/hospital/services/{id}/status
   * ID: AS-07
Body: { isActive }
   */
  putAdminHospitalServicesIdStatus(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/hospital/services/${id}/status`, payload);
  }

}
