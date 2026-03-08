import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PRESCRIPTIONSService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/prescriptions
   * ID: AH-01
Auth: DOCTOR, PHARMACY, ADMIN, SUPER_ADMIN
   */
  getAdminPrescriptions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/prescriptions`);
  }

  /**
   * GET /admin/prescriptions/{id}
   * ID: AH-02
Returns: Prescription (with medicines)
   */
  getAdminPrescriptionsId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/prescriptions/${id}`);
  }

  /**
   * POST /admin/prescriptions
   * ID: AH-03
Auth: DOCTOR, ADMIN
   */
  postAdminPrescriptions(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/prescriptions`, payload);
  }

  /**
   * PUT /admin/prescriptions/{id}
   * ID: AH-04
Auth: DOCTOR (own, ACTIVE status only)
   */
  putAdminPrescriptionsId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/prescriptions/${id}`, payload);
  }

  /**
   * PUT /admin/prescriptions/{id}/dispense
   * ID: AH-05
Auth: PHARMACY only
   */
  putAdminPrescriptionsIdDispense(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/prescriptions/${id}/dispense`, payload);
  }

  /**
   * DELETE /admin/prescriptions/{id}
   * ID: AH-06
Auth: ADMIN, SUPER_ADMIN
   */
  deleteAdminPrescriptionsId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/prescriptions/${id}`);
  }

}
