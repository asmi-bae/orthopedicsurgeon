import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class WEBSITECONTROLService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/website/hero-slides
   * ID: AK-01
AK-02  POST /admin/website/hero-slides
   */
  getAdminWebsiteHeroslides(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/hero-slides`);
  }

  /**
   * POST /admin/website/hero-slides
   * ID: AK-02
AK-03  PUT  /admin/website/hero-slides/{id}
   */
  postAdminWebsiteHeroslides(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/website/hero-slides`, payload);
  }

  /**
   * PUT /admin/website/hero-slides/{id}
   * ID: AK-03
AK-04  DELETE /admin/website/hero-slides/{id}
   */
  putAdminWebsiteHeroslidesId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/hero-slides/${id}`, payload);
  }

  /**
   * DELETE /admin/website/hero-slides/{id}
   * ID: AK-04
AK-05  PUT  /admin/website/hero-slides/reorder
   */
  deleteAdminWebsiteHeroslidesId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/website/hero-slides/${id}`);
  }

  /**
   * PUT /admin/website/hero-slides/reorder
   * ID: AK-05
Body: { ids: [] (ordered) }
   */
  putAdminWebsiteHeroslidesReorder(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/hero-slides/reorder`, payload);
  }

  /**
   * GET /admin/website/testimonials
   * ID: AK-06
AK-07  POST /admin/website/testimonials
   */
  getAdminWebsiteTestimonials(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/testimonials`);
  }

  /**
   * POST /admin/website/testimonials
   * ID: AK-07
AK-08  PUT  /admin/website/testimonials/{id}
   */
  postAdminWebsiteTestimonials(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/website/testimonials`, payload);
  }

  /**
   * PUT /admin/website/testimonials/{id}
   * ID: AK-08
AK-09  DELETE /admin/website/testimonials/{id}
   */
  putAdminWebsiteTestimonialsId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/testimonials/${id}`, payload);
  }

  /**
   * DELETE /admin/website/testimonials/{id}
   * ID: AK-09
AK-10  PUT  /admin/website/testimonials/{id}/verify
   */
  deleteAdminWebsiteTestimonialsId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/website/testimonials/${id}`);
  }

  /**
   * PUT /admin/website/testimonials/{id}/verify
   * ID: AK-10
AK-11  PUT  /admin/website/testimonials/{id}/feature
   */
  putAdminWebsiteTestimonialsIdVerify(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/testimonials/${id}/verify`, payload);
  }

  /**
   * PUT /admin/website/testimonials/{id}/feature
   * ID: AK-11

   */
  putAdminWebsiteTestimonialsIdFeature(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/testimonials/${id}/feature`, payload);
  }

  /**
   * GET /admin/website/faqs
   * ID: AK-12
AK-13  POST /admin/website/faqs
   */
  getAdminWebsiteFaqs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/faqs`);
  }

  /**
   * POST /admin/website/faqs
   * ID: AK-13
AK-14  PUT  /admin/website/faqs/{id}
   */
  postAdminWebsiteFaqs(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/website/faqs`, payload);
  }

  /**
   * PUT /admin/website/faqs/{id}
   * ID: AK-14
AK-15  DELETE /admin/website/faqs/{id}
   */
  putAdminWebsiteFaqsId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/faqs/${id}`, payload);
  }

  /**
   * DELETE /admin/website/faqs/{id}
   * ID: AK-15
AK-16  PUT  /admin/website/faqs/reorder
   */
  deleteAdminWebsiteFaqsId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/website/faqs/${id}`);
  }

  /**
   * PUT /admin/website/faqs/reorder
   * ID: AK-16
Body: { ids: [] }
   */
  putAdminWebsiteFaqsReorder(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/faqs/reorder`, payload);
  }

  /**
   * GET /admin/website/settings
   * ID: AK-17
Returns: ALL site_settings (public + private)
   */
  getAdminWebsiteSettings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/settings`);
  }

  /**
   * PUT /admin/website/settings
   * ID: AK-18
Body: { key, value }[] (bulk update)
   */
  putAdminWebsiteSettings(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/settings`, payload);
  }

  /**
   * PUT /admin/website/settings/{key}
   * ID: AK-19
Body: { value }
   */
  putAdminWebsiteSettingsKey(key: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/settings/${key}`, payload);
  }

  /**
   * GET /admin/website/gallery
   * ID: AK-20
AK-21  POST /admin/website/gallery
   */
  getAdminWebsiteGallery(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/gallery`);
  }

  /**
   * POST /admin/website/gallery
   * ID: AK-21
Body: multipart/form-data
   */
  postAdminWebsiteGallery(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/website/gallery`, payload);
  }

  /**
   * PUT /admin/website/gallery/{id}
   * ID: AK-22
AK-23  DELETE /admin/website/gallery/{id}
   */
  putAdminWebsiteGalleryId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/gallery/${id}`, payload);
  }

  /**
   * DELETE /admin/website/gallery/{id}
   * ID: AK-23

   */
  deleteAdminWebsiteGalleryId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/website/gallery/${id}`);
  }

  /**
   * GET /admin/website/team
   * ID: AK-24
AK-25  POST /admin/website/team
   */
  getAdminWebsiteTeam(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/team`);
  }

  /**
   * POST /admin/website/team
   * ID: AK-25
AK-26  PUT  /admin/website/team/{id}
   */
  postAdminWebsiteTeam(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/website/team`, payload);
  }

  /**
   * PUT /admin/website/team/{id}
   * ID: AK-26
AK-27  DELETE /admin/website/team/{id}
   */
  putAdminWebsiteTeamId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/team/${id}`, payload);
  }

  /**
   * DELETE /admin/website/team/{id}
   * ID: AK-27
AK-28  PUT  /admin/website/team/reorder
   */
  deleteAdminWebsiteTeamId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/website/team/${id}`);
  }

  /**
   * PUT /admin/website/team/reorder
   * ID: AK-28

   */
  putAdminWebsiteTeamReorder(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/team/reorder`, payload);
  }

  /**
   * GET /admin/website/awards
   * ID: AK-29
AK-30  POST /admin/website/awards
   */
  getAdminWebsiteAwards(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/awards`);
  }

  /**
   * POST /admin/website/awards
   * ID: AK-30
AK-31  PUT  /admin/website/awards/{id}
   */
  postAdminWebsiteAwards(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/website/awards`, payload);
  }

  /**
   * PUT /admin/website/awards/{id}
   * ID: AK-31
AK-32  DELETE /admin/website/awards/{id}
   */
  putAdminWebsiteAwardsId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/awards/${id}`, payload);
  }

  /**
   * DELETE /admin/website/awards/{id}
   * ID: AK-32

   */
  deleteAdminWebsiteAwardsId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/website/awards/${id}`);
  }

  /**
   * GET /admin/website/partners
   * ID: AK-33
AK-34  POST /admin/website/partners
   */
  getAdminWebsitePartners(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/partners`);
  }

  /**
   * POST /admin/website/partners
   * ID: AK-34
AK-35  PUT  /admin/website/partners/{id}
   */
  postAdminWebsitePartners(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/website/partners`, payload);
  }

  /**
   * PUT /admin/website/partners/{id}
   * ID: AK-35
AK-36  DELETE /admin/website/partners/{id}
   */
  putAdminWebsitePartnersId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/partners/${id}`, payload);
  }

  /**
   * DELETE /admin/website/partners/{id}
   * ID: AK-36
AK-37  PUT  /admin/website/partners/reorder
   */
  deleteAdminWebsitePartnersId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/website/partners/${id}`);
  }

  /**
   * PUT /admin/website/partners/reorder
   * ID: AK-37

   */
  putAdminWebsitePartnersReorder(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/partners/reorder`, payload);
  }

  /**
   * GET /admin/website/announcement
   * ID: AK-38
AK-39  PUT  /admin/website/announcement
   */
  getAdminWebsiteAnnouncement(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/announcement`);
  }

  /**
   * PUT /admin/website/announcement
   * ID: AK-39
Body: { message, type, active,
   */
  putAdminWebsiteAnnouncement(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/announcement`, payload);
  }

  /**
   * GET /admin/website/services-display
   * ID: AK-40
Returns: Service[] with displayOrder + showOnWebsite
   */
  getAdminWebsiteServicesdisplay(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/services-display`);
  }

  /**
   * PUT /admin/website/services-display/{id}
   * ID: AK-41
Body: { showOnWebsite, displayOrder, isFeatured }
   */
  putAdminWebsiteServicesdisplayId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/services-display/${id}`, payload);
  }

  /**
   * PUT /admin/website/doctors-display/{id}
   * ID: AK-42
Body: { showOnWebsite, displayOrder,
   */
  putAdminWebsiteDoctorsdisplayId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/website/doctors-display/${id}`, payload);
  }

  /**
   * GET /admin/website/preview
   * ID: AK-43
Returns: live snapshot of all public-facing
   */
  getAdminWebsitePreview(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/website/preview`);
  }

}
