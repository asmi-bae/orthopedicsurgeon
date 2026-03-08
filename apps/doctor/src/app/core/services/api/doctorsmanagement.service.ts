import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DOCTORSMANAGEMENTService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/doctors
   * ID: AG-01
Auth: ADMIN, SUPER_ADMIN
   */
  getAdminDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/doctors`);
  }

  /**
   * GET /admin/doctors/{id}
   * ID: AG-02
Returns: DoctorAdmin (full)
   */
  getAdminDoctorsId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/doctors/${id}`);
  }

  /**
   * POST /admin/doctors
   * ID: AG-03
Auth: ADMIN, SUPER_ADMIN
   */
  postAdminDoctors(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/doctors`, payload);
  }

  /**
   * PUT /admin/doctors/{id}
   * ID: AG-04
Auth: DOCTOR (own), ADMIN, SUPER_ADMIN
   */
  putAdminDoctorsId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/doctors/${id}`, payload);
  }

  /**
   * PUT /admin/doctors/{id}/availability
   * ID: AG-05
Auth: DOCTOR (own), ADMIN
   */
  putAdminDoctorsIdAvailability(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/doctors/${id}/availability`, payload);
  }

  /**
   * PUT /admin/doctors/{id}/status
   * ID: AG-06
Auth: ADMIN, SUPER_ADMIN
   */
  putAdminDoctorsIdStatus(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/doctors/${id}/status`, payload);
  }

  /**
   * PUT /admin/doctors/{id}/website-visibility
   * ID: AG-07
Auth: ADMIN, SUPER_ADMIN
   */
  putAdminDoctorsIdWebsitevisibility(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/doctors/${id}/website-visibility`, payload);
  }

  /**
   * GET /admin/doctors/{id}/appointments
   * ID: AG-08
Returns: Page<Appointment>
   */
  getAdminDoctorsIdAppointments(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/doctors/${id}/appointments`);
  }

  /**
   * GET /admin/doctors/{id}/reviews
   * ID: AG-09
Returns: Page<Review>
   */
  getAdminDoctorsIdReviews(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/doctors/${id}/reviews`);
  }

  /**
   * GET /admin/doctors/{id}/stats
   * ID: AG-10
Returns: DoctorStats
   */
  getAdminDoctorsIdStats(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/doctors/${id}/stats`);
  }

}
