import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CONTACTCOMMUNICATIONService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/contact/messages
   * ID: AM-01
Query: status, page, size
   */
  getAdminContactMessages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/contact/messages`);
  }

  /**
   * GET /admin/contact/messages/{id}
   * ID: AM-02
Side effect: mark as READ
   */
  getAdminContactMessagesId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/contact/messages/${id}`);
  }

  /**
   * PUT /admin/contact/messages/{id}/reply
   * ID: AM-03
Body: { replyMessage }
   */
  putAdminContactMessagesIdReply(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/contact/messages/${id}/reply`, payload);
  }

  /**
   * PUT /admin/contact/messages/{id}/archive
   * ID: AM-04
Returns: ContactMessage
   */
  putAdminContactMessagesIdArchive(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/contact/messages/${id}/archive`, payload);
  }

  /**
   * GET /admin/contact/newsletter/subscribers
   * ID: AM-05
Query: isActive, page, size
   */
  getAdminContactNewsletterSubscribers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/contact/newsletter/subscribers`);
  }

  /**
   * DELETE /admin/contact/newsletter/{id}
   * ID: AM-06
Returns: { success }
   */
  deleteAdminContactNewsletterId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/contact/newsletter/${id}`);
  }

  /**
   * POST /admin/contact/newsletter/send
   * ID: AM-07
Auth: ADMIN, SUPER_ADMIN
   */
  postAdminContactNewsletterSend(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/contact/newsletter/send`, payload);
  }

}
