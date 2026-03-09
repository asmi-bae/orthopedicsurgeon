import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorAppointmentService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl || 'http://localhost:8080/api/v1'}/doctor/appointments`;

  getMyAppointments(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get(this.baseUrl, { params });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  confirm(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/confirm`, {});
  }

  start(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/start`, {});
  }

  complete(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/complete`, {});
  }

  cancel(id: string, reason: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/cancel`, null, {
      params: new HttpParams().set('reason', reason)
    });
  }

  reschedule(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/reschedule`, payload);
  }
}
