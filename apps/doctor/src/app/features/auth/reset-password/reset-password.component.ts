import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-doctor-reset-password',
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
            <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">lock_open</mat-icon>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">Create New Password</h1>
          <p class="mt-3 text-sm text-slate-500 text-center max-w-[300px] leading-relaxed">
            Set a strong, secure password for your portal
          </p>
      </div>

      <mat-card-content class="px-6 pb-6">
        <form [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Email Address (Confirm)</mat-label>
            <input matInput type="email" formControlName="email">
            <mat-error>Correct email is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>New Password</mat-label>
            <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="newPassword">
            <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button">
              <mat-icon>{{hidePassword() ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error>Password must be at least 8 characters</mat-error>
          </mat-form-field>

          <button mat-flat-button color="primary"
                  [disabled]="loading() || resetForm.invalid"
                  class="w-full py-2">
            @if (!loading()) {
              <span>Reset Password</span>
            } @else {
              <mat-spinner diameter="24" class="inline-block"></mat-spinner>
            }
          </button>
        </form>
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
export class DoctorResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  resetForm: FormGroup = this.fb.group({
    token: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  loading = signal(false);
  hidePassword = signal(true);

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.resetForm.patchValue({ token });
    } else {
      this.snackBar.open('Invalid reset link.', 'Close', { duration: 5000 });
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.resetForm.invalid || this.loading()) return;
    this.loading.set(true);
    
    this.auth.resetPassword(this.resetForm.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open('Password reset successfully. Please log in.', 'Close', { 
            duration: 5000,
            panelClass: ['success-snackbar']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBar.open(err.error?.message || 'Error resetting password.', 'Close', { duration: 5000 });
      }
    });
  }
}
