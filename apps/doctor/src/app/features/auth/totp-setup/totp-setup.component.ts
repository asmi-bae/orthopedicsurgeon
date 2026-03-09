import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-totp-setup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card class="w-full max-w-[450px] mx-auto bg-slate-50 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex flex-col items-center pt-10 pb-6">
        <div class="w-16 h-16 rounded-full bg-primary-50/20 flex items-center justify-center mb-6">
          <mat-icon class="text-primary-600 !w-8 !h-8 !text-[32px] leading-none">security</mat-icon>
        </div>
        <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">2FA Setup</h1>
        <p class="mt-3 text-sm text-slate-500 text-center max-w-[300px] leading-relaxed">
          Enable two-factor authentication for your secure account
        </p>
      </div>

      <mat-card-content class="px-6 pb-6">
        @if (setupData) {
          <div class="flex flex-col gap-4">
            <p class="text-sm text-slate-600 text-center">1. Scan this QR code with your authenticator app:</p>
            <div class="flex justify-center">
              <img [src]="setupData.qrCodeUrl" alt="QR Code" class="rounded-lg border border-slate-200 p-2 bg-slate-50">
            </div>
            <p class="text-sm text-slate-600 text-center">2. Or enter this secret key manually:</p>
            <code class="block bg-slate-100 rounded px-3 py-2 text-sm text-slate-800 text-center tracking-widest font-mono">
              {{ setupData.secretKey }}
            </code>
            <p class="text-sm text-slate-600 text-center">3. Enter the 6-digit verification code:</p>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Verification Code</mat-label>
              <input matInput type="text" 
                      [ngModel]="verificationCode()" 
                      (ngModelChange)="verificationCode.set($event)"
                      maxlength="6"
                      inputmode="numeric" pattern="[0-9]*"
                      placeholder="000000"
                      class="text-center tracking-[0.5em] text-2xl font-bold">
            </mat-form-field>

            @if (setupData.backupCodes) {
              <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p class="text-sm font-semibold text-amber-800 mb-2">⚠ Save these backup codes:</p>
                <ul class="grid grid-cols-2 gap-1">
                  @for (code of setupData.backupCodes; track code) {
                    <li class="font-mono text-xs text-slate-700">{{ code }}</li>
                  }
                </ul>
              </div>
            }

            <button mat-flat-button color="primary" (click)="verify()" 
                    [disabled]="loading() || verificationCode().length !== 6"
                    class="w-full py-2 mt-2">
              @if (!loading()) {
                <span>Verify &amp; Enable 2FA</span>
              } @else {
                <mat-spinner diameter="24" class="inline-block"></mat-spinner>
              }
            </button>
          </div>
        }

        @if (error()) {
          <p class="text-red-600 text-sm mt-4 text-center">{{ error() }}</p>
        }
        @if (success()) {
          <div class="text-center py-6">
            <mat-icon class="text-5xl text-green-600 mb-4">check_circle</mat-icon>
            <p class="text-green-700 font-semibold">2FA has been successfully enabled!</p>
            <button mat-flat-button color="primary" routerLink="/dashboard" class="mt-4">
              Go to Dashboard
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
  styles: [`:host { display: block; }`]
})
export class DoctorTotpSetupComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  setupData: any = null;
  verificationCode = signal('');
  error = signal<string | null>(null);
  success = signal(false);
  loading = signal(false);

  ngOnInit() {
    this.auth.setup2fa().subscribe({
      next: (res) => this.setupData = res,
      error: () => this.error.set('Failed to load 2FA setup data.')
    });
  }

  verify() {
    if (this.loading() || this.verificationCode().length !== 6) return;
    this.loading.set(true);
    this.auth.confirm2faSetup(this.verificationCode()).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        this.error.set(null);
        // Automatically redirect to dashboard after a short delay
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Invalid code. Verification failed.');
      }
    });
  }
}
