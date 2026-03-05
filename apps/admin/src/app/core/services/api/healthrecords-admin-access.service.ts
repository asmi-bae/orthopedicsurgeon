import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HEALTHRECORDSAdminAccessService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/health-records/vitals/{patientId}
   * ID: AR-01
Auth: DOCTOR (own), ADMIN
   */
  getAdminHealthrecordsVitalsPatientId(patientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/health-records/vitals/${patientId}`);
  }

  /**
   * POST /admin/health-records/vitals/{patientId}
   * ID: AR-02
Auth: DOCTOR, STAFF, ADMIN
   */
  postAdminHealthrecordsVitalsPatientId(patientId: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/health-records/vitals/${patientId}`, payload);
  }

  /**
   * GET /admin/health-records/documents/{patientId}
   * ID: AR-03
Auth: DOCTOR (own), ADMIN
   */
  getAdminHealthrecordsDocumentsPatientId(patientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/health-records/documents/${patientId}`);
  }

  /**
   * POST /admin/health-records/documents/{patientId}
   * ID: AR-04
Auth: LAB_TECH, DOCTOR, ADMIN
   */
  postAdminHealthrecordsDocumentsPatientId(patientId: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/health-records/documents/${patientId}`, payload);
  }

  /**
   * POST /admin/health-records/treatment/{patientId}
   * ID: AR-05
Auth: DOCTOR, ADMIN
   */
  postAdminHealthrecordsTreatmentPatientId(patientId: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/health-records/treatment/${patientId}`, payload);
  }

}
