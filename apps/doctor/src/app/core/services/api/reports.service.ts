import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class REPORTSService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/reports/appointments
   * ID: AQ-01
Auth: ADMIN, SUPER_ADMIN
   */
  getAdminReportsAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/reports/appointments`);
  }

  /**
   * GET /admin/reports/financial
   * ID: AQ-02
Auth: ACCOUNTANT, ADMIN, SUPER_ADMIN
   */
  getAdminReportsFinancial(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/reports/financial`);
  }

  /**
   * GET /admin/reports/doctors
   * ID: AQ-03
Auth: ADMIN, SUPER_ADMIN
   */
  getAdminReportsDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/reports/doctors`);
  }

  /**
   * GET /admin/reports/patients
   * ID: AQ-04
Auth: ADMIN, SUPER_ADMIN
   */
  getAdminReportsPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/reports/patients`);
  }

  /**
   * GET /admin/reports/export/{type}
   * ID: AQ-05
Auth: ADMIN, SUPER_ADMIN
   */
  getAdminReportsExportType(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/reports/export/${type}`);
  }

}
