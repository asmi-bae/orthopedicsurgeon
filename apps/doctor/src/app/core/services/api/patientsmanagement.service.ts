import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PATIENTSMANAGEMENTService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/patients
   * ID: AF-01
Auth: DOCTOR, STAFF, ADMIN, SUPER_ADMIN
   */
  getAdminPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/patients`);
  }

  /**
   * GET /admin/patients/{id}
   * ID: AF-02
Auth: DOCTOR (own patients), STAFF, ADMIN
   */
  getAdminPatientsId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/patients/${id}`);
  }

  /**
   * GET /admin/patients/{id}/medical-history
   * ID: AF-03
Auth: DOCTOR (own), ADMIN, SUPER_ADMIN
   */
  getAdminPatientsIdMedicalhistory(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/patients/${id}/medical-history`);
  }

  /**
   * PUT /admin/patients/{id}/medical-info
   * ID: AF-04
Auth: DOCTOR, STAFF, ADMIN
   */
  putAdminPatientsIdMedicalinfo(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/patients/${id}/medical-info`, payload);
  }

  /**
   * GET /admin/patients/{id}/appointments
   * ID: AF-05
Returns: Page<Appointment>
   */
  getAdminPatientsIdAppointments(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/patients/${id}/appointments`);
  }

  /**
   * GET /admin/patients/{id}/prescriptions
   * ID: AF-06
Returns: Page<Prescription>
   */
  getAdminPatientsIdPrescriptions(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/patients/${id}/prescriptions`);
  }

  /**
   * GET /admin/patients/{id}/lab-reports
   * ID: AF-07
Returns: Page<LabReport>
   */
  getAdminPatientsIdLabreports(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/patients/${id}/lab-reports`);
  }

  /**
   * GET /admin/patients/{id}/payments
   * ID: AF-08
Returns: Page<Payment>
   */
  getAdminPatientsIdPayments(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/patients/${id}/payments`);
  }

  /**
   * GET /admin/patients/{id}/vitals
   * ID: AF-09
Returns: Page<VitalSigns>
   */
  getAdminPatientsIdVitals(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/patients/${id}/vitals`);
  }

  /**
   * POST /admin/patients/{id}/vitals
   * ID: AF-10
Auth: DOCTOR, STAFF, ADMIN
   */
  postAdminPatientsIdVitals(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/patients/${id}/vitals`, payload);
  }

  /**
   * POST /admin/patients/{id}/allergies
   * ID: AF-11
Auth: DOCTOR, STAFF, ADMIN
   */
  postAdminPatientsIdAllergies(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/patients/${id}/allergies`, payload);
  }

  /**
   * DELETE /admin/patients/{id}/allergies/{allergyId}
   * ID: AF-12
Auth: DOCTOR, ADMIN
   */
  deleteAdminPatientsIdAllergiesAllergyId(id: string, allergyId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/patients/${id}/allergies/${allergyId}`);
  }

  /**
   * POST /admin/patients/{id}/conditions
   * ID: AF-13
Auth: DOCTOR, ADMIN
   */
  postAdminPatientsIdConditions(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/patients/${id}/conditions`, payload);
  }

  /**
   * GET /admin/patients/{id}/timeline
   * ID: AF-14
Returns: Page<PatientTimelineEvent>
   */
  getAdminPatientsIdTimeline(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/patients/${id}/timeline`);
  }

}
