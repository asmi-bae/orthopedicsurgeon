import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-doctor-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card class="w-full max-w-[450px] mx-auto bg-slate-50 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex flex-col items-center pt-10 pb-6">
          <div class="w-16 h-16 rounded-full bg-primary-50/20 flex items-center justify-center mb-6">
            <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">lock_reset</mat-icon>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">Forgot Password?</h1>
          <p class="mt-3 text-sm text-slate-500 text-center max-w-[300px] leading-relaxed">
            Enter your email to receive recovery instructions
          </p>
      </div>

      <mat-card-content class="px-6 pb-6">
        @if (!submitted()) {
          <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email Address</mat-label>
              <input matInput type="email" formControlName="email">
              @if (forgotForm.get('email')?.hasError('required')) {
                <mat-error>Email is required</mat-error>
              }
              @if (forgotForm.get('email')?.hasError('email')) {
                <mat-error>Invalid email format</mat-error>
              }
            </mat-form-field>

            <button mat-flat-button color="primary" [disabled]="loading() || forgotForm.invalid" class="w-full py-2 mt-2">
              @if (!loading()) {
                <span>Send Instructions</span>
              } @else {
                <mat-spinner diameter="24" class="inline-block"></mat-spinner>
              }
            </button>
          </form>
        } @else {
          <div class="text-center py-6">
              <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">mail</mat-icon>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Check your inbox</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">
              If an account exists for <strong>{{forgotForm.get('email')?.value}}</strong>, you will receive reset instructions shortly.
            </p>
            <button mat-stroked-button class="w-full" (click)="submitted.set(false)">
              Try another email
            </button>
          </div>
        }
        
        <button mat-button routerLink="/login" class="w-full mt-4">
          Back to Login
        </button>
      </mat-card-content>

      <mat-card-footer class="py-4 text-center">
        <span class="text-xs text-slate-500">All Rights Reserved by Doctor Portal &copy; 2026</span>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class DoctorForgotPasswordComponent {
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
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBar.open(err.error?.message || 'Error processing request.', 'Close', { duration: 5000 });
      }
    });
  }
}
