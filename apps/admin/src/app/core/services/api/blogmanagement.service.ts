import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BLOGMANAGEMENTService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';

  /**
   * GET /admin/blog/posts
   * ID: AL-01
Query: status, categoryId, authorId, page, size
   */
  getAdminBlogPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/blog/posts`);
  }

  /**
   * GET /admin/blog/posts/{id}
   * ID: AL-02
Returns: BlogPostAdmin (full)
   */
  getAdminBlogPostsId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/blog/posts/${id}`);
  }

  /**
   * POST /admin/blog/posts
   * ID: AL-03
Auth: ADMIN, SUPER_ADMIN
   */
  postAdminBlogPosts(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/blog/posts`, payload);
  }

  /**
   * PUT /admin/blog/posts/{id}
   * ID: AL-04
Returns: BlogPostAdmin
   */
  putAdminBlogPostsId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/blog/posts/${id}`, payload);
  }

  /**
   * DELETE /admin/blog/posts/{id}
   * ID: AL-05
Returns: { success } (soft delete)
   */
  deleteAdminBlogPostsId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/blog/posts/${id}`);
  }

  /**
   * PUT /admin/blog/posts/{id}/publish
   * ID: AL-06
Side effect: sets publishedAt + clears cache
   */
  putAdminBlogPostsIdPublish(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/blog/posts/${id}/publish`, payload);
  }

  /**
   * PUT /admin/blog/posts/{id}/unpublish
   * ID: AL-07
Returns: BlogPostAdmin
   */
  putAdminBlogPostsIdUnpublish(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/blog/posts/${id}/unpublish`, payload);
  }

  /**
   * PUT /admin/blog/posts/{id}/archive
   * ID: AL-08
Returns: BlogPostAdmin
   */
  putAdminBlogPostsIdArchive(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/blog/posts/${id}/archive`, payload);
  }

  /**
   * POST /admin/blog/posts/{id}/feature
   * ID: AL-09
Returns: BlogPostAdmin
   */
  postAdminBlogPostsIdFeature(id: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/blog/posts/${id}/feature`, payload);
  }

  /**
   * GET /admin/blog/comments
   * ID: AL-10
Query: approved, postId, page, size
   */
  getAdminBlogComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/blog/comments`);
  }

  /**
   * PUT /admin/blog/comments/{id}/approve
   * ID: AL-11
Side effect: notify commenter (async)
   */
  putAdminBlogCommentsIdApprove(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/blog/comments/${id}/approve`, payload);
  }

  /**
   * DELETE /admin/blog/comments/{id}
   * ID: AL-12
Returns: { success }
   */
  deleteAdminBlogCommentsId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/blog/comments/${id}`);
  }

  /**
   * GET /admin/blog/categories
   * ID: AL-13
AL-14  POST   /admin/blog/categories
   */
  getAdminBlogCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/blog/categories`);
  }

  /**
   * POST /admin/blog/categories
   * ID: AL-14
AL-15  PUT    /admin/blog/categories/{id}
   */
  postAdminBlogCategories(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/blog/categories`, payload);
  }

  /**
   * PUT /admin/blog/categories/{id}
   * ID: AL-15
AL-16  DELETE /admin/blog/categories/{id}
   */
  putAdminBlogCategoriesId(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/blog/categories/${id}`, payload);
  }

  /**
   * DELETE /admin/blog/categories/{id}
   * ID: AL-16

   */
  deleteAdminBlogCategoriesId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/blog/categories/${id}`);
  }

  /**
   * GET /admin/blog/tags
   * ID: AL-17
AL-18  POST   /admin/blog/tags
   */
  getAdminBlogTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/blog/tags`);
  }

  /**
   * POST /admin/blog/tags
   * ID: AL-18
AL-19  DELETE /admin/blog/tags/{id}
   */
  postAdminBlogTags(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/blog/tags`, payload);
  }

  /**
   * DELETE /admin/blog/tags/{id}
   * ID: AL-19

   */
  deleteAdminBlogTagsId(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/blog/tags/${id}`);
  }

}
