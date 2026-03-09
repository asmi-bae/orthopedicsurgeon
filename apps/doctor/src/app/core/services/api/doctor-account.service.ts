import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorAccountService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl || 'http://localhost:8080/api/v1'}/doctor/account`;

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  updateProfile(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, payload);
  }

  changePassword(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/password`, payload);
  }
}
