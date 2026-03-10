import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Validators, 
  FormsModule, 
  ReactiveFormsModule, 
  FormBuilder,
  FormGroup 
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-reset-password',
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
    <div class="w-full max-w-[450px] mx-auto bg-slate-50 border border-slate-100 ">
      <div class="flex flex-col items-center pt-10 pb-6">
          <div class="w-16 h-16 rounded-full bg-primary-50/20 flex items-center justify-center mb-6">
            <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">lock_reset</mat-icon>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">Set New Password</h1>
          <p class="mt-3 text-sm text-slate-500 text-center max-w-[300px] leading-relaxed">
            Please enter your new secure password below to regain access.
          </p>
      </div>

      <div class="px-6 pb-6 mt-4">
        <form [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-6">
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Email Address</mat-label>
            <input matInput type="email" formControlName="email">
            <mat-error>Correct email is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>New Password</mat-label>
            <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="newPassword">
            <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button">
              <mat-icon>{{hidePassword() ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error>Minimum 8 characters required</mat-error>
          </mat-form-field>

          <button mat-flat-button color="primary" 
                  [disabled]="loading() || resetForm.invalid"
                  class="w-full py-4 mt-2 h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20">
            @if (!loading()) {
              <span>Update Password</span>
            } @else {
              <mat-spinner diameter="24" class="inline-block"></mat-spinner>
            }
          </button>

          <div class="text-center mt-4">
            <a routerLink="/auth/login" class="text-sm font-bold text-primary-600 hover:text-primary-700 no-underline">
              Return to Login
            </a>
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
export class ResetPasswordComponent implements OnInit {
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
      this.snackBar.open('Invalid or missing reset token.', 'Close', { 
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      this.router.navigate(['/auth/login']);
    }
  }

  onSubmit() {
    if (this.resetForm.invalid || this.loading()) return;
    this.loading.set(true);
    
    this.auth.resetPassword(this.resetForm.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open('Password updated successfully!', 'Close', { 
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBar.open(err.error?.message || 'Failed to reset password.', 'Close', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
