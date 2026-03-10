import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Validators, 
  FormsModule, 
  ReactiveFormsModule, 
  FormBuilder,
  FormGroup 
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="w-full max-w-[450px] mx-auto bg-slate-50">
      <div class="flex flex-col items-center pt-10 pb-6">
          <div class="w-16 h-16 rounded-full bg-primary-50/20 flex items-center justify-center mb-6">
            <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">lock_open</mat-icon>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">Forgot Password?</h1>
          <p class="mt-3 text-sm text-slate-500 text-center max-w-[300px] leading-relaxed">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
      </div>

      <div class="px-6 pb-6 mt-4">
        @if (!submitted()) {
          <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-6">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email Address</mat-label>
              <input matInput type="email" formControlName="email">
              <mat-error>
                @if (forgotForm.get('email')?.hasError('required')) { Email is required }
                @else if (forgotForm.get('email')?.hasError('email')) { Invalid email format }
              </mat-error>
            </mat-form-field>

            <button mat-flat-button color="primary" 
                    [disabled]="loading() || forgotForm.invalid"
                    class="w-full py-4 mt-2 h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20">
              @if (!loading()) {
                <span>Send Reset Link</span>
              } @else {
                <mat-spinner diameter="24" class="inline-block"></mat-spinner>
              }
            </button>
            
            <div class="text-center mt-4">
              <a routerLink="/auth/login" class="text-sm font-bold text-primary-600 hover:text-primary-700 no-underline flex items-center justify-center gap-2">
                <mat-icon class="!text-sm">arrow_back</mat-icon>
                Return to Login
              </a>
            </div>
          </form>
        } @else {
          <div class="text-center p-6 bg-slate-100 rounded-3xl border border-slate-200 animate-in zoom-in duration-300">
            <div class="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-600/30">
              <mat-icon class="!w-10 !h-10 !text-[40px] leading-none">check_circle</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Check Your Email</h3>
            <p class="text-slate-500 text-sm mb-8 leading-relaxed">
              We've sent password reset instructions to:<br>
              <span class="font-bold text-slate-900">{{forgotForm.get('email')?.value}}</span>
            </p>
            <button mat-stroked-button class="w-full h-12 rounded-xl border-2 font-bold hover:bg-white transition-all" (click)="submitted.set(false)">
              Try Another Email
            </button>
          </div>
        }
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
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  loading = signal(false);
  submitted = signal(false);

  onSubmit() {
    if (this.forgotForm.invalid || this.loading()) return;
    this.loading.set(true);
    
    this.auth.forgotPassword(this.forgotForm.value.email).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
        this.snackBar.open('Reset instructions sent', 'Close', { 
          duration: 4000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBar.open(err.error?.message || 'Failed to send reset link.', 'Close', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
