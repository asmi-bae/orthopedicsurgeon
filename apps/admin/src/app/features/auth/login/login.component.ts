import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@repo/auth';
import { environment } from '@env/environment';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

declare var google: any;

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <mat-card class="w-full max-w-[450px] mx-auto bg-slate-50 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      @if (step() === 'login') {
        <div class="flex flex-col items-center pt-10 pb-6">
            <div class="w-16 h-16 rounded-full bg-primary-50/20 flex items-center justify-center mb-6">
              <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">admin_panel_settings</mat-icon>
            </div>
            <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">Welcome Back</h1>
            <p class="mt-3 text-sm text-slate-500 text-center max-w-[300px] leading-relaxed">
              Sign in to your secure administrative console
            </p>
        </div>

        <mat-card-content class="px-6 pb-6">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Email Address</mat-label>
                <input matInput type="email" formControlName="email">
                <mat-error>
                    @if (loginForm.get('email')?.hasError('required')) { Email is required }
                    @else if (loginForm.get('email')?.hasError('email')) { Invalid email format }
                </mat-error>
              </mat-form-field>

              <div class="flex flex-col gap-1">
                <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Password</mat-label>
                    <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="password">
                    <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button">
                      <mat-icon>{{hidePassword() ? 'visibility_off' : 'visibility'}}</mat-icon>
                    </button>
                    @if (loginForm.get('password')?.hasError('required')) {
                      <mat-error>Password is required</mat-error>
                    }
                </mat-form-field>
              </div>

              <button mat-flat-button color="primary" 
                      [disabled]="loading() || loginForm.invalid"
                      class="w-full py-2 mt-2">
                @if (!loading()) {
                  <span>Continue</span>
                } @else {
                  <mat-spinner diameter="24" class="inline-block"></mat-spinner>
                }
              </button>
              
              <div class="text-center mt-2">
                <a routerLink="/forgot-password" class="text-xs text-primary-600 hover:underline">Forgot password?</a>
              </div>
          </form>
        </mat-card-content>
      } @else if (step() === 'mfa') {
        <div class="flex flex-col items-center pt-10 pb-6">
            <div class="w-16 h-16 rounded-full bg-primary-50/20 flex items-center justify-center mb-6">
              <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">mark_email_read</mat-icon>
            </div>
            <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">Two-Factor Auth</h1>
            <p class="mt-3 text-sm text-slate-500 text-center max-w-[300px] leading-relaxed">
              Enter the 6-digit verification code sent to your email
            </p>
        </div>

        <mat-card-content class="px-6 pb-6">
          <form (ngSubmit)="onMfaSubmit()" class="flex flex-col gap-4">
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
                  <p class="text-xs text-center text-slate-500 mb-3">Time remaining:</p>
                  <div class="text-3xl font-mono font-bold text-center text-primary-600 tracking-widest">
                    {{ formatTime(timer()) }}
                  </div>
              </div>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Verification Code</mat-label>
                <input matInput type="text" 
                        [ngModel]="otpCode()" 
                        (ngModelChange)="otpCode.set($event)"
                        name="otpCode" maxlength="6" 
                        inputmode="numeric"
                        pattern="[0-9]*"
                        [disabled]="timer() <= 0"
                        placeholder="000000"
                        class="text-center text-2xl tracking-[0.5em] font-bold">
              </mat-form-field>

              @if (timer() <= 0) {
                <div class="text-center p-3 mb-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                    The verification code has expired.
                </div>
              }

              <button mat-flat-button color="primary" 
                      [disabled]="loading() || otpCode().length !== 6 || timer() <= 0"
                      class="w-full py-2 mt-2">
                @if (!loading()) {
                  <span>Verify & Access</span>
                } @else {
                  <mat-spinner diameter="24" class="inline-block"></mat-spinner>
                }
              </button>
              
              <div class="flex flex-col items-center gap-2 mt-4">
                <button type="button" mat-button color="primary" 
                        [disabled]="loading() || (timer() > 240)"
                        (click)="onSubmit()">
                    Resend Code {{ timer() > 240 ? '(' + (timer() - 240) + 's)' : '' }}
                </button>
                <button mat-button (click)="cancelMfa()" type="button">
                    Back to Login
                </button>
              </div>
          </form>
        </mat-card-content>
      }

      <mat-card-footer class="py-4 text-center">
          <span class="text-xs text-slate-500">Admin Console &copy; 2026</span>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [`
    :host { display: block; }
    ::ng-deep .success-snackbar { --mdc-snackbar-container-color: #059669; --mdc-snackbar-supporting-text-color: white; }
    ::ng-deep .error-snackbar { --mdc-snackbar-container-color: #dc2626; --mdc-snackbar-supporting-text-color: white; }
  `]
})
export class AdminLoginComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = signal(false);
  hidePassword = signal(true);
  step = signal<'login' | 'mfa'>('login');
  sessionToken = signal<string | null>(null);
  otpCode = signal('');
  timer = signal(300); // 5 minutes in seconds
  private timerSub?: Subscription;

  ngOnDestroy() {
    this.stopTimer();
  }

  onSubmit() {
    if (this.loginForm.invalid || this.loading()) return;
    this.loading.set(true);
    
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        if (res.requiresMfa) {
          this.enterMfaStep(res.sessionToken);
        } else {
          this.showSuccessAndNavigate();
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.showError(err.error?.message || 'Invalid email or password.');
      }
    });
  }

  private enterMfaStep(token: string) {
    this.sessionToken.set(token);
    this.otpCode.set('');
    this.step.set('mfa');
    this.startTimer();
    this.snackBar.open('Verification code sent to your email.', 'Close', { duration: 4000 });
  }

  onMfaSubmit() {
    const token = this.sessionToken();
    if (!token || this.otpCode().length !== 6 || this.loading()) return;
    this.loading.set(true);
    
    this.auth.verify2fa({ 
      sessionToken: token, 
      code: this.otpCode(),
      deviceFingerprint: this.getDeviceFingerprint()
    }).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        this.stopTimer();
        this.showSuccessAndNavigate();
      },
      error: (err: any) => {
        this.loading.set(false);
        this.showError(err.error?.message || 'Invalid verification code.');
      }
    });
  }

  cancelMfa() {
    this.stopTimer();
    this.step.set('login');
    this.sessionToken.set(null);
  }

  private startTimer() {
    this.stopTimer();
    this.timer.set(300);
    this.timerSub = interval(1000)
      .pipe(takeWhile(() => this.timer() > 0))
      .subscribe(() => {
        this.timer.set(this.timer() - 1);
      });
  }

  private stopTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = undefined;
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  private getDeviceFingerprint(): string {
    return 'browser-' + window.innerWidth + 'x' + window.innerHeight;
  }

  private showSuccessAndNavigate() {
    this.snackBar.open('Access Granted: Welcome to Admin Console', 'Close', { 
      duration: 3000,
      panelClass: ['success-snackbar']
    });
    this.router.navigate(['/dashboard']);
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', { 
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
