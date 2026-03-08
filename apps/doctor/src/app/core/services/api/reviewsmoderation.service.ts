import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class REVIEWSMODERATIONService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/reviews/pending
   * ID: AN-01
Returns: Page<Review>
   */
  getAdminReviewsPending(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/reviews/pending`);
  }

  /**
   * GET /admin/reviews
   * ID: AN-02
Query: isPublished, doctorId, page, size
   */
  getAdminReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/reviews`);
  }

  /**
   * PUT /admin/reviews/{id}/approve
   * ID: AN-03
Side effect: evict doctor review cache
   */
  putAdminReviewsIdApprove(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/reviews/${id}/approve`, payload);
  }

  /**
   * DELETE /admin/reviews/{id}
   * ID: AN-04
Returns: { success }
   */
  deleteAdminReviewsId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/reviews/${id}`);
  }

}
