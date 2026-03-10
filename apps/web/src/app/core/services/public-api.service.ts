import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, PageResponse, ApiResponse, HospitalSummary } from '@repo/types';

@Injectable({ providedIn: 'root' })
export class PublicApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1';

  getDoctors(params?: any): Observable<ApiResponse<PageResponse<Doctor>>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get<ApiResponse<PageResponse<Doctor>>>(`${this.apiUrl}/doctors`, { params: httpParams });
  }

  getDoctorById(id: string): Observable<ApiResponse<Doctor>> {
    return this.http.get<ApiResponse<Doctor>>(`${this.apiUrl}/doctors/${id}`);
  }

  getHospitals(): Observable<ApiResponse<HospitalSummary[]>> {
    return this.http.get<ApiResponse<HospitalSummary[]>>(`${this.apiUrl}/hospitals/summary`);
  }

  bookAppointment(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/appointments/book`, data);
  }

  getMyAppointments(): Observable<ApiResponse<PageResponse<any>>> {
    return this.http.get<ApiResponse<PageResponse<any>>>(`${this.apiUrl}/patient/appointments`);
  }

  getMyPrescriptions(): Observable<ApiResponse<PageResponse<any>>> {
    return this.http.get<ApiResponse<PageResponse<any>>>(`${this.apiUrl}/patient/prescriptions`);
  }

  getMyReports(): Observable<ApiResponse<PageResponse<any>>> {
    return this.http.get<ApiResponse<PageResponse<any>>>(`${this.apiUrl}/patient/lab-reports`);
  }

  getMyProfile(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/patient/profile`);
  }

  getPatientPayments(patientId: string): Observable<ApiResponse<PageResponse<any>>> {
    return this.http.get<ApiResponse<PageResponse<any>>>(`${this.apiUrl}/payments/patient/${patientId}`);
  }

  getPatientDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/dashboard`);
  }

  getMyInvoices(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/patient/invoices`);
  }

  getInvoiceById(id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/patient/invoices/${id}`);
  }

  updateMyProfile(data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/patient/profile`, data);
  }

  subscribeNewsletter(email: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/content/newsletter/subscribe`, { email });
  }

  getBlogBySlug(slug: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/content/blog/${slug}`);
  }

  getBlogPosts(params?: any): Observable<ApiResponse<PageResponse<any>>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get<ApiResponse<PageResponse<any>>>(`${this.apiUrl}/content/blog`, { params: httpParams });
  }

  getBlogCategories(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/content/blog/categories`);
  }

  getBlogTags(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/content/blog/tags`);
  }

  getServices(params?: any): Observable<ApiResponse<PageResponse<any>>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get<ApiResponse<PageResponse<any>>>(`${this.apiUrl}/hospitals/services`, { params: httpParams });
  }

  getServiceById(id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/hospitals/services/${id}`);
  }

  getStats(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/content/stats`);
  }

  getTestimonials(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/content/testimonials`);
  }

  downloadReport(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/patient/lab-reports/${id}/download`, { responseType: 'blob' });
  }

  downloadPrescription(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/patient/prescriptions/${id}/download`, { responseType: 'blob' });
  }
}


