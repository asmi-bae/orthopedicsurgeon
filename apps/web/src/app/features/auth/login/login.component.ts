import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { 
  Validators, 
  FormsModule, 
  ReactiveFormsModule, 
  FormBuilder,
  FormGroup 
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="w-full max-w-[450px] mx-auto bg-slate-50">
      <div class="flex flex-col items-center pt-10 pb-6">
          <div class="w-16 h-16 rounded-full bg-primary-50/20 flex items-center justify-center mb-6">
            <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">account_circle</mat-icon>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">Welcome to Portal</h1>
          <p class="mt-3 text-sm text-slate-500 text-center max-w-[300px] leading-relaxed">
            Please sign in to access your details
          </p>
      </div>

      <div class="px-6 pb-6 mt-4">
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
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
              <div class="flex justify-end pr-1">
                <a routerLink="/auth/forgot-password" class="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors no-underline">Forgot Password?</a>
              </div>
            </div>

            <button mat-flat-button color="primary" 
                    [disabled]="loading() || loginForm.invalid"
                    class="w-full py-4 mt-2 h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20">
              @if (!loading()) {
                <span>Continue</span>
              } @else {
                <mat-spinner diameter="24" class="inline-block"></mat-spinner>
              }
            </button>

            <div class="relative flex items-center gap-4 py-2">
                <div class="flex-grow border-t border-slate-200"></div>
                <span class="flex-shrink text-xs text-slate-400 font-bold uppercase tracking-widest">or continue with</span>
                <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <button type="button" mat-stroked-button class="w-full h-12 rounded-xl border-2 font-bold hover:bg-slate-50 transition-all">
                <div class="flex items-center justify-center gap-3">
                    <img src="/assets/images/google-icon.svg" alt="Google" class="w-5 h-5 translate-y-[-1px]">
                    <span class="text-slate-700">Sign in with Google</span>
                </div>
            </button>
            
            <div class="text-center mt-6 p-4 rounded-2xl bg-slate-100 border border-slate-200">
              <p class="text-xs font-bold text-slate-500 mb-2 tracking-tight">Don't have an account?</p>
              <a routerLink="/auth/register" class="text-sm font-bold text-primary-600 hover:text-primary-700 no-underline">Create an Account</a>
            </div>
        </form>
        </div>

      <div class="py-4 text-center">
          <span class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Patient Portal &copy; 2026</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    ::ng-deep .success-snackbar { --mdc-snackbar-container-color: #059669; --mdc-snackbar-supporting-text-color: white; }
    ::ng-deep .error-snackbar { --mdc-snackbar-container-color: #dc2626; --mdc-snackbar-supporting-text-color: white; }
  `]
})
export class LoginComponent implements OnInit {
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

  ngOnInit() {
    // Initialization logic if needed
  }

  onSubmit() {
    if (this.loginForm.invalid || this.loading()) return;

    this.loading.set(true);

    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open('Logged in successfully', 'Close', { 
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/portal/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBar.open(err.error?.message || 'Login failed. Please check your credentials.', 'Close', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
