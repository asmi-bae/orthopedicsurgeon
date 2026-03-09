import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-doctor-two-factor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card class="w-full max-w-[450px] mx-auto bg-slate-50 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex flex-col items-center pt-10 pb-6">
        <div class="w-16 h-16 rounded-full bg-primary-50/20 flex items-center justify-center mb-6">
          <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">lock</mat-icon>
        </div>
        <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">2FA Verification</h1>
        <p class="mt-3 text-sm text-slate-500 text-center max-w-[300px] leading-relaxed">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <mat-card-content class="px-6 pb-6">
        <form [formGroup]="twoFactorForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Verification Code</mat-label>
            <input matInput type="text" formControlName="totpCode" maxlength="6"
                    inputmode="numeric" pattern="[0-9]*"
                    class="text-center tracking-[0.5em] text-lg font-bold">
            @if (twoFactorForm.get('totpCode')?.hasError('pattern')) {
              <mat-error>Must be a 6-digit number</mat-error>
            }
          </mat-form-field>

          @if (error) {
            <p class="text-red-600 text-sm -mt-2 text-center">{{ error }}</p>
          }

          <button mat-flat-button color="primary" type="submit"
                  [disabled]="twoFactorForm.invalid || loading"
                  class="w-full py-2 mt-2">
            @if (loading) {
              <mat-spinner diameter="24" class="inline-block"></mat-spinner>
            } @else {
              Verify & Access
            }
          </button>
          
          <button mat-button routerLink="/login" class="w-full mt-4">
            Back to Login
          </button>
        </form>
      </mat-card-content>

      <mat-card-footer class="py-4 text-center">
        <span class="text-xs text-slate-500">All Rights Reserved by Doctor Portal &copy; 2026</span>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [`:host { display: block; }`]
})
export class DoctorTwoFactorComponent {
  twoFactorForm: FormGroup;
  error: string | null = null;
  tempToken: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.twoFactorForm = this.fb.group({
      totpCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
    this.tempToken = this.route.snapshot.queryParamMap.get('tempToken');
  }

  onSubmit() {
    if (this.twoFactorForm.valid && this.tempToken && !this.loading) {
      this.loading = true;
      this.auth.verifyTotp2fa({
        tempToken: this.tempToken,
        totpCode: this.twoFactorForm.value.totpCode
      }).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.error?.message || 'Invalid code. Please try again.';
        }
      });
    }
  }
}
