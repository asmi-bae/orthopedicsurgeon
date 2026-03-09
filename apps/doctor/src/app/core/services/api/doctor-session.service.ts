import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorSessionService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl || 'http://localhost:8080/api/v1'}/doctor/auth/session`;
  private securityBaseUrl = `${environment.apiUrl || 'http://localhost:8080/api/v1'}/doctor/security`; // Adjusting based on general pattern

  getMySessions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify`); // Using a common endpoint, but session management might be elsewhere
  }

  // Adding methods derived from legacy service but with doctor prefix
  revokeSession(sessionId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${sessionId}`); 
  }

  revokeAllOtherSessions(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout-all`, {});
  }
}
