import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ADMINDASHBOARDService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/dashboard (Summary)
   * ID: AD-00
Auth: ADMIN, SUPER_ADMIN
Aggregated stats, live appointments, top hospitals, and quick stats.
   */
  getAdminDashboard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard`);
  }

  /**
   * GET /admin/dashboard/stats
   * ID: AD-01
Auth: ADMIN, SUPER_ADMIN
   */
  getAdminDashboardStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/stats`);
  }

  /**
   * GET /admin/dashboard/appointments/chart
   * ID: AD-02
Query: period (7d/30d/90d/1y)
   */
  getAdminDashboardAppointmentsChart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/appointments/chart`);
  }

  /**
   * GET /admin/dashboard/revenue/chart
   * ID: AD-03
Query: period, groupBy (day/week/month)
   */
  getAdminDashboardRevenueChart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/revenue/chart`);
  }

  /**
   * GET /admin/dashboard/revenue/summary
   * ID: AD-04
Returns: { todayRevenue, weekRevenue,
   */
  getAdminDashboardRevenueSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/revenue/summary`);
  }

  /**
   * GET /admin/dashboard/recent-appointments
   * ID: AD-05
Query: limit (default 10)
   */
  getAdminDashboardRecentappointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/recent-appointments`);
  }

  /**
   * GET /admin/dashboard/pending-tasks
   * ID: AD-06
Returns: PendingTask[]
   */
  getAdminDashboardPendingtasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/pending-tasks`);
  }

  /**
   * GET /admin/dashboard/doctor/{doctorId}
   * ID: AD-07
Auth: DOCTOR (own only), ADMIN, SUPER_ADMIN
   */
  getAdminDashboardDoctorDoctorId(doctorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/doctor/${doctorId}`);
  }

  /**
   * GET /admin/dashboard/financial
   * ID: AD-08
Auth: ACCOUNTANT, ADMIN, SUPER_ADMIN
   */
  getAdminDashboardFinancial(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/financial`);
  }

  /**
   * GET /admin/dashboard/lab
   * ID: AD-09
Auth: LAB_TECH, ADMIN, SUPER_ADMIN
   */
  getAdminDashboardLab(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/lab`);
  }

  /**
   * GET /admin/dashboard/pharmacy
   * ID: AD-10
Auth: PHARMACY, ADMIN, SUPER_ADMIN
   */
  getAdminDashboardPharmacy(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/dashboard/pharmacy`);
  }

}
