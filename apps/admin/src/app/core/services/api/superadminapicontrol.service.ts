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

  /**
   * GET /admin/api-control/endpoints
   * ID: AC-01
Returns: ApiEndpoint[]
   */
  getAdminApicontrolEndpoints(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/api-control/endpoints`);
  }

  /**
   * PUT /admin/api-control/endpoints/{id}/disable
   * ID: AC-02
Body: { reason, disableUntil? (null=permanent) }
   */
  putAdminApicontrolEndpointsIdDisable(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/api-control/endpoints/${id}/disable`, payload);
  }

  /**
   * PUT /admin/api-control/endpoints/{id}/enable
   * ID: AC-03
Body: { reason }
   */
  putAdminApicontrolEndpointsIdEnable(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/api-control/endpoints/${id}/enable`, payload);
  }

  /**
   * PUT /admin/api-control/endpoints/bulk-disable
   * ID: AC-04
Body: { ids: [], reason }
   */
  putAdminApicontrolEndpointsBulkdisable(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/api-control/endpoints/bulk-disable`, payload);
  }

  /**
   * PUT /admin/api-control/endpoints/bulk-enable
   * ID: AC-05
Body: { ids: [] }
   */
  putAdminApicontrolEndpointsBulkenable(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/api-control/endpoints/bulk-enable`, payload);
  }

  /**
   * GET /admin/api-control/groups
   * ID: AC-06
Returns: ApiGroup[]
   */
  getAdminApicontrolGroups(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/api-control/groups`);
  }

  /**
   * PUT /admin/api-control/groups/{group}/disable
   * ID: AC-07
Body: { reason }
   */
  putAdminApicontrolGroupsGroupDisable(group: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/api-control/groups/${group}/disable`, payload);
  }

  /**
   * PUT /admin/api-control/groups/{group}/enable
   * ID: AC-08
Returns: { enabled: count }
   */
  putAdminApicontrolGroupsGroupEnable(group: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/api-control/groups/${group}/enable`, payload);
  }

  /**
   * POST /admin/api-control/maintenance-mode
   * ID: AC-09
Body: { enabled, message, allowedIps: [] }
   */
  postAdminApicontrolMaintenancemode(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/api-control/maintenance-mode`, payload);
  }

  /**
   * GET /admin/api-control/maintenance-mode
   * ID: AC-10
Returns: MaintenanceStatus
   */
  getAdminApicontrolMaintenancemode(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/api-control/maintenance-mode`);
  }

  /**
   * GET /admin/api-control/rate-limits
   * ID: AC-11
Returns: RateLimitConfig[]
   */
  getAdminApicontrolRatelimits(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/api-control/rate-limits`);
  }

  /**
   * PUT /admin/api-control/rate-limits/{endpoint}
   * ID: AC-12
Body: { limit, windowSeconds }
   */
  putAdminApicontrolRatelimitsEndpoint(endpoint: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/api-control/rate-limits/${endpoint}`, payload);
  }

  /**
   * POST /admin/api-control/rate-limits/reset/{ip}
   * ID: AC-13
Body: { reason }
   */
  postAdminApicontrolRatelimitsResetIp(ip: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/api-control/rate-limits/reset/${ip}`, payload);
  }

  /**
   * GET /admin/api-control/blocked-ips
   * ID: AC-14
Returns: BlockedIp[]
   */
  getAdminApicontrolBlockedips(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/api-control/blocked-ips`);
  }

  /**
   * POST /admin/api-control/blocked-ips
   * ID: AC-15
Body: { ip, reason, expiresAt? }
   */
  postAdminApicontrolBlockedips(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/api-control/blocked-ips`, payload);
  }

  /**
   * DELETE /admin/api-control/blocked-ips/{ip}
   * ID: AC-16
Returns: { success }
   */
  deleteAdminApicontrolBlockedipsIp(ip: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/api-control/blocked-ips/${ip}`);
  }

  /**
   * GET /admin/api-control/metrics
   * ID: AC-17
Returns: ApiMetrics
   */
  getAdminApicontrolMetrics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/api-control/metrics`);
  }

  /**
   * POST /admin/api-control/circuit-breaker/{group}
   * ID: AC-18
Body: { action: OPEN/CLOSE/HALF_OPEN }
   */
  postAdminApicontrolCircuitbreakerGroup(group: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/api-control/circuit-breaker/${group}`, payload);
  }

  /**
   * GET /admin/api-control/circuit-breakers
   * ID: AC-19
Returns: CircuitBreakerStatus[]
   */
  getAdminApicontrolCircuitbreakers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/api-control/circuit-breakers`);
  }

  /**
   * POST /admin/api-control/cache/flush
   * ID: AC-20
Body: { cacheNames: [] OR "all" }
   */
  postAdminApicontrolCacheFlush(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/api-control/cache/flush`, payload);
  }

}
