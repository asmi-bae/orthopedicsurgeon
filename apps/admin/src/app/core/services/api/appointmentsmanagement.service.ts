import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class APPOINTMENTSMANAGEMENTService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/appointments
   * ID: AE-01
Auth: STAFF, DOCTOR, ADMIN, SUPER_ADMIN
   */
  getAdminAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/appointments`);
  }

  /**
   * GET /admin/appointments/stats
   * ID: AE-14
   */
  getAdminAppointmentsStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/appointments/stats`);
  }

  /**
   * GET /admin/appointments/{id}
   * ID: AE-02
Auth: relevant roles
   */
  getAdminAppointmentsId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/appointments/${id}`);
  }

  /**
   * POST /admin/appointments
   * ID: AE-03
Auth: STAFF, ADMIN, SUPER_ADMIN
   */
  postAdminAppointments(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/appointments`, payload);
  }

  /**
   * PUT /admin/appointments/{id}/confirm
   * ID: AE-04
Auth: STAFF, ADMIN, SUPER_ADMIN
   */
  putAdminAppointmentsIdConfirm(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/appointments/${id}/confirm`, payload);
  }

  /**
   * PUT /admin/appointments/{id}/start
   * ID: AE-05
Auth: DOCTOR (own), STAFF, ADMIN
   */
  putAdminAppointmentsIdStart(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/appointments/${id}/start`, payload);
  }

  /**
   * PUT /admin/appointments/{id}/complete
   * ID: AE-06
Auth: DOCTOR (own), ADMIN
   */
  putAdminAppointmentsIdComplete(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/appointments/${id}/complete`, payload);
  }

  /**
   * PUT /admin/appointments/{id}/cancel
   * ID: AE-07
Auth: STAFF, ADMIN, SUPER_ADMIN
   */
  putAdminAppointmentsIdCancel(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/appointments/${id}/cancel`, payload);
  }

  /**
   * PUT /admin/appointments/{id}/no-show
   * ID: AE-08
Auth: STAFF, ADMIN
   */
  putAdminAppointmentsIdNoshow(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/appointments/${id}/no-show`, payload);
  }

  /**
   * POST /admin/appointments/{id}/reschedule
   * ID: AE-09
Auth: STAFF, ADMIN
   */
  postAdminAppointmentsIdReschedule(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/appointments/${id}/reschedule`, payload);
  }

  /**
   * GET /admin/appointments/calendar
   * ID: AE-10
Query: doctorId?, dateFrom, dateTo
   */
  getAdminAppointmentsCalendar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/appointments/calendar`);
  }

  /**
   * GET /admin/appointments/today
   * ID: AE-11
Query: doctorId?
   */
  getAdminAppointmentsToday(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/appointments/today`);
  }

  /**
   * GET /admin/appointments/upcoming
   * ID: AE-12
Query: days (default 7), doctorId?
   */
  getAdminAppointmentsUpcoming(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/appointments/upcoming`);
  }

  /**
   * POST /admin/appointments/bulk-confirm
   * ID: AE-13
Auth: ADMIN, SUPER_ADMIN
   */
  postAdminAppointmentsBulkconfirm(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/appointments/bulk-confirm`, payload);
  }

}
