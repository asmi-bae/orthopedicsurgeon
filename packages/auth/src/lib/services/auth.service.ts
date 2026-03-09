import { Injectable, signal, inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of, map, finalize, switchMap, shareReplay } from 'rxjs';
import { User, Role } from '@repo/types';

export const AUTH_API_URL = new InjectionToken<string>('AUTH_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080/api/v1/auth'
});

export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  requiresMfa?: boolean;
  sessionToken?: string;
  userId?: string;
  expiresIn?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = inject(AUTH_API_URL);

  currentUser = signal<User | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  showSessionWarning = signal(false);

  private refreshTimer?: any;
  private inactivityTimer?: any;
  private warningTimer?: any;
  private lastActivity = Date.now();
  private authChannel = new BroadcastChannel('auth_channel');

  constructor() {
    this.setupBroadcastChannel();
    this.handleUserActivity();
    if (this.isLoggedIn()) {
      this.startInactivityTimer();
    }
  }

  private setupBroadcastChannel() {
    this.authChannel.onmessage = (event) => {
      if (event.data.type === 'LOGOUT') {
        this.clearLocalSession();
      }
    };
  }

  private handleUserActivity() {
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      window.addEventListener(event, () => {
        this.lastActivity = Date.now();
        if (this.isLoggedIn()) {
          this.resetInactivityTimer();
        }
      });
    });
  }

  login(credentials: any): Observable<AuthResponse> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      switchMap((res: AuthResponse) => this.handleSuccess(res)),
      catchError(err => {
        this.error.set(err.error?.message || 'Login failed. Please check your credentials.');
        throw err;
      }),
      finalize(() => this.loading.set(false))
    );
  }

  googleLogin(idToken: string): Observable<AuthResponse> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/google`, { idToken }).pipe(
      switchMap((res: AuthResponse) => this.handleSuccess(res)),
      catchError(err => {
        this.error.set(err.error?.message || 'Google login failed.');
        throw err;
      }),
      finalize(() => this.loading.set(false))
    );
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    // Fire and forget logout to backend
    this.http.post(`${this.apiUrl}/logout`, { refreshToken }).subscribe();

    this.clearLocalSession();
    this.authChannel.postMessage({ type: 'LOGOUT' });
  }

  private clearLocalSession() {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.warningTimer) clearTimeout(this.warningTimer);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.currentUser.set(null);
    this.showSessionWarning.set(false);
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return of({});

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(res => {
        if (res.accessToken) localStorage.setItem('token', res.accessToken);
        if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
      }),
      catchError(err => {
        this.logout();
        throw err;
      })
    );
  }

  verify2fa(data: { sessionToken: string; code: string; deviceFingerprint?: string }): Observable<AuthResponse> {
    this.loading.set(true);
    // Standardize to use /login/mfa for both admin and doctor portals
    const endpoint = `${this.apiUrl}/login/mfa`;
    return this.http.post<AuthResponse>(endpoint, data).pipe(
      switchMap((res: AuthResponse) => {
        if (res.accessToken) {
          return this.handleSuccess(res);
        }
        return of(res);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  // Generic 2FA TOTP Verify (for accounts already logged in or with temp token)
  verifyTotp2fa(data: { tempToken: string; totpCode: string }): Observable<AuthResponse> {
    this.loading.set(true);
    return this.http.post<AuthResponse>(`${this.apiUrl}/2fa/verify`, data).pipe(
      switchMap((res: AuthResponse) => this.handleSuccess(res)),
      finalize(() => this.loading.set(false))
    );
  }

  setup2fa(): Observable<any> {
    // Correct paths for backend: setup/begin and setup/verify
    return this.http.post(`${this.apiUrl}/2fa/setup/begin`, {});
  }

  confirm2faSetup(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/2fa/setup/verify`, { code });
  }

  register(userData: any): Observable<AuthResponse> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      finalize(() => this.loading.set(false))
    );
  }

  forgotPassword(email: string): Observable<any> {
    this.loading.set(true);
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }).pipe(
      finalize(() => this.loading.set(false))
    );
  }

  resetPassword(data: any): Observable<any> {
    this.loading.set(true);
    return this.http.post(`${this.apiUrl}/reset-password`, data).pipe(
      finalize(() => this.loading.set(false))
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(role: Role): boolean {
    return this.currentUser()?.roles.includes(role) || false;
  }

  updateCurrentUser(user: User) {
    this.currentUser.set(user);
  }

  private checkAuthRequest$: Observable<boolean> | null = null;

  checkAuth(): Observable<boolean> {
    if (!this.isLoggedIn()) return of(false);
    
    if (this.checkAuthRequest$) {
      return this.checkAuthRequest$;
    }

    this.checkAuthRequest$ = this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        this.currentUser.set(user);
        this.scheduleTokenRefresh(900);
        this.startInactivityTimer();
      }),
      map(() => true),
      catchError(err => {
        if (err.status === 401) {
          this.logout();
          return of(false);
        }
        return of(true);
      }),
      finalize(() => {
        this.checkAuthRequest$ = null;
      }),
      shareReplay(1)
    );
    
    return this.checkAuthRequest$;
  }

  private scheduleTokenRefresh(expiresIn: number) {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    
    // Refresh 1 minute before expiry (or 10% before)
    const refreshDelay = (expiresIn - 60) * 1000;
    if (refreshDelay <= 0) return;

    this.refreshTimer = setTimeout(() => {
      // Only refresh if user was active in last 15 mins
      if (Date.now() - this.lastActivity < 15 * 60 * 1000) {
        this.refreshToken().subscribe();
      } else {
        console.warn('User inactive, skipping auto-refresh');
      }
    }, refreshDelay);
  }

  private startInactivityTimer() {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.warningTimer) clearTimeout(this.warningTimer);

    // 30 minutes of inactivity -> Show Warning
    this.inactivityTimer = setTimeout(() => {
      this.showSessionWarning.set(true);
      
      // 2 more minutes -> Force Logout
      this.warningTimer = setTimeout(() => {
        if (this.showSessionWarning()) {
          this.logout();
        }
      }, 2 * 60 * 1000);

    }, 30 * 60 * 1000);
  }

  private resetInactivityTimer() {
    if (this.showSessionWarning()) {
      this.showSessionWarning.set(false);
    }
    this.startInactivityTimer();
  }

  token(): string | null {
    return localStorage.getItem('token');
  }

  private handleSuccess(res: AuthResponse): Observable<AuthResponse> {
    if (res.accessToken) localStorage.setItem('token', res.accessToken);
    if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
    
    if (res.expiresIn) {
      this.scheduleTokenRefresh(res.expiresIn);
    }

    if (res.user) {
      this.currentUser.set(res.user);
      return of(res);
    } else if (res.accessToken) {
      return this.http.get<User>(`${this.apiUrl}/me`).pipe(
        tap(user => {
          this.currentUser.set(user);
          res.user = user;
        }),
        map(() => res),
        catchError(() => of(res))
      );
    }
    
    return of(res);
  }
}
