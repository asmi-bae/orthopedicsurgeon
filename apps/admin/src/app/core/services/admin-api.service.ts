import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse, Doctor, Hospital } from '@repo/types';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/admin';

  // Hero Slides
  getHeroSlides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/website/hero`);
  }
  createHeroSlide(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/website/hero`, data);
  }
  updateHeroSlide(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/website/hero/${id}`, data);
  }
  deleteHeroSlide(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/website/hero/${id}`);
  }

  // FAQs
  getFaqs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/website/faq`);
  }
  createFaq(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/website/faq`, data);
  }
  updateFaq(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/website/faq/${id}`, data);
  }
  deleteFaq(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/website/faq/${id}`);
  }

  // Partners
  getPartners(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/website/partner`);
  }
  createPartner(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/website/partner`, data);
  }
  updatePartner(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/website/partner/${id}`, data);
  }
  deletePartner(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/website/partner/${id}`);
  }

  // Doctors
  getDoctors(params?: any): Observable<ApiResponse<PageResponse<any>>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get<ApiResponse<PageResponse<any>>>(`${this.apiUrl}/doctors`, { params: httpParams });
  }

  // Hospitals
  getHospitals(params?: any): Observable<ApiResponse<PageResponse<Hospital>>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get<ApiResponse<PageResponse<Hospital>>>(`${this.apiUrl}/hospitals`, { params: httpParams });
  }

  // Blog
  getBlogPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blog/posts`);
  }
  createBlogPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/blog/posts`, data);
  }
  deleteBlogPost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/blog/posts/${id}`);
  }
}
