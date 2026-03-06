import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '@repo/types';
import { AuthService, AUTH_API_URL } from './auth.service';

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: string;
  imageUrl?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = inject(AUTH_API_URL).replace('/auth', '/account');

  updateProfile(request: UpdateProfileRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, request).pipe(
      tap(res => {
        if (res.data) {
          this.authService.updateCurrentUser(res.data);
        }
      })
    );
  }

  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/password`, request);
  }

  getSessions(): Observable<any> {
    // AB-01 from Postman
    return this.http.get<any>(`http://localhost:8080/api/v1/admin/security/my-sessions`);
  }
}
