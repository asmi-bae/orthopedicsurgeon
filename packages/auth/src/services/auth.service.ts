import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginResponse, TokenResponse, User } from '../models/auth.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/v1/auth/login', credentials).pipe(
      tap((res: LoginResponse) => {
        if (res.accessToken) {
          this.tokenService.storeToken(res.accessToken);
        }
      })
    );
  }

  logout(): void {
    const refreshToken = ''; // Get from cookie/storage
    this.http.post('/api/v1/auth/logout', { refreshToken }).subscribe();
    this.tokenService.clearToken();
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<TokenResponse> {
    const refreshToken = ''; // Get from cookie
    return this.http.post<TokenResponse>('/api/v1/auth/refresh', refreshToken).pipe(
      tap((res: TokenResponse) => this.tokenService.storeToken(res.accessToken))
    );
  }

  get isAuthenticated(): boolean {
    const token = this.tokenService.getAccessToken();
    return !!token && !this.tokenService.isTokenExpired(token);
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.roles.includes(role);
  }
}
