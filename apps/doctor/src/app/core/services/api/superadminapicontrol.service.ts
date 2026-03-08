import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SUPERADMINAPICONTROLService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';
  private apiControlUrl = `${this.baseUrl}/admin/api-controls`;

  /**
   * --- Maintenance Mode ---
   */
  getAdminApicontrolMaintenancemode(): Observable<any> {
    return this.http.get(`${this.apiControlUrl}/maintenance`);
  }

  postAdminApicontrolMaintenancemode(enabled: boolean): Observable<any> {
    return this.http.post(`${this.apiControlUrl}/maintenance`, { enabled });
  }

  getAdminApicontrolAllowedIps(): Observable<any> {
    return this.http.get(`${this.apiControlUrl}/maintenance/allowed-ips`);
  }

  postAdminApicontrolAllowedIp(ip: string): Observable<any> {
    return this.http.post(`${this.apiControlUrl}/maintenance/allowed-ips`, { ip });
  }

  deleteAdminApicontrolAllowedIp(ip: string): Observable<any> {
    return this.http.delete(`${this.apiControlUrl}/maintenance/allowed-ips/${ip}`);
  }

  /**
   * --- Blocked IPs ---
   */
  getAdminApicontrolBlockedips(): Observable<any> {
    return this.http.get(`${this.apiControlUrl}/blocked-ips`);
  }

  postAdminApicontrolBlockedip(ip: string): Observable<any> {
    return this.http.post(`${this.apiControlUrl}/blocked-ips`, { ip });
  }

  deleteAdminApicontrolBlockedipsIp(ip: string): Observable<any> {
    return this.http.delete(`${this.apiControlUrl}/blocked-ips/${ip}`);
  }

  /**
   * --- Disabled Endpoints ---
   */
  getAdminApicontrolDisabledEndpoints(): Observable<any> {
    return this.http.get(`${this.apiControlUrl}/disabled-endpoints`);
  }

  postAdminApicontrolDisableEndpoint(method: string, path: string, reason: string): Observable<any> {
    return this.http.post(`${this.apiControlUrl}/disabled-endpoints`, { method, path, reason });
  }

  deleteAdminApicontrolEnableEndpoint(method: string, path: string): Observable<any> {
    const params = new HttpParams().set('method', method).set('path', path);
    return this.http.delete(`${this.apiControlUrl}/disabled-endpoints`, { params });
  }

  /**
   * --- Legacy / Remaining Endpoints (If any still exist on backend) ---
   */
  getAdminApicontrolEndpoints(): Observable<any> {
    return this.http.get(`${this.apiControlUrl}/endpoints`);
  }
}
