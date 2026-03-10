import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorWebsiteService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/doctor/website`;

  getSettings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/settings`);
  }

  updateSettings(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/settings`, payload);
  }

  getTranslations(lang: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/settings?lang=${lang}`);
  }

  updateTranslation(key: string, lang: string, value: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/settings/key/${key}/${lang}`, { value });
  }
}
