import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorDashboardService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl || 'http://localhost:8080/api/v1'}/doctor/dashboard`;

  getDashboardData(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  getLiveAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/live-appointments`);
  }

  getTopHospitals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top-hospitals`);
  }

  getQuickStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/quick-stats`);
  }
}
