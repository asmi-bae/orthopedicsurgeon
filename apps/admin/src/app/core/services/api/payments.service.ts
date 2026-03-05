import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PAYMENTSService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/payments
   * ID: AJ-01
Auth: ACCOUNTANT, ADMIN, SUPER_ADMIN
   */
  getAdminPayments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/payments`);
  }

  /**
   * GET /admin/payments/{id}
   * ID: AJ-02
Returns: Payment (full)
   */
  getAdminPaymentsId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/payments/${id}`);
  }

  /**
   * POST /admin/payments
   * ID: AJ-03
Auth: ACCOUNTANT, ADMIN
   */
  postAdminPayments(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/payments`, payload);
  }

  /**
   * PUT /admin/payments/{id}/process
   * ID: AJ-04
Auth: ACCOUNTANT, ADMIN
   */
  putAdminPaymentsIdProcess(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/payments/${id}/process`, payload);
  }

  /**
   * POST /admin/payments/{id}/refund
   * ID: AJ-05
Auth: ACCOUNTANT, SUPER_ADMIN
   */
  postAdminPaymentsIdRefund(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/payments/${id}/refund`, payload);
  }

  /**
   * GET /admin/payments/{id}/invoice
   * ID: AJ-06
Returns: PDF blob
   */
  getAdminPaymentsIdInvoice(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/payments/${id}/invoice`);
  }

  /**
   * GET /admin/payments/reports/revenue
   * ID: AJ-07
Query: period, groupBy
   */
  getAdminPaymentsReportsRevenue(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/payments/reports/revenue`);
  }

  /**
   * GET /admin/payments/reports/summary
   * ID: AJ-08
Returns: PaymentSummary
   */
  getAdminPaymentsReportsSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/payments/reports/summary`);
  }

}
