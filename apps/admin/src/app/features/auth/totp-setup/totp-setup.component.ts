import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
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
            Enable two-factor authentication for your account
          </p>
      </div>

      <mat-card-content class="px-6 pb-6">
        @if (setupData()) {
          <div class="flex flex-col gap-5">
            <div class="bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center">
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">1. Scan QR Code</p>
              <img [src]="setupData()?.qrCodeUrl" alt="QR Code" class="w-48 h-48 rounded-lg border border-slate-100 shadow-sm p-2 bg-white mb-2">
              <p class="text-[10px] text-slate-400 text-center px-4 leading-normal italic">
                Scan this with Google Authenticator or any TOTP app
              </p>
            </div>

            <div class="bg-slate-100/50 p-4 rounded-xl border border-slate-100">
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">2. Manual Secret</p>
              <code class="block text-sm text-primary-600 text-center tracking-widest font-mono font-bold select-all">
                {{ setupData()?.secretKey }}
              </code>
            </div>

            <div class="flex flex-col gap-3">
              <p class="text-sm font-semibold text-slate-700 text-center">3. Confirm Setup</p>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Verification Code</mat-label>
                <input matInput type="text" 
                        [ngModel]="verificationCode()" 
                        (ngModelChange)="verificationCode.set($event)"
                        name="verificationCode" maxlength="6" 
                        inputmode="numeric"
                        pattern="[0-9]*"
                        placeholder="000000"
                        class="text-center text-2xl tracking-[0.5em] font-bold">
              </mat-form-field>

              @if (setupData()?.backupCodes) {
                <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div class="flex items-center gap-2 mb-2 text-amber-800">
                    <mat-icon class="text-sm !w-4 !h-4 !text-[16px]">warning</mat-icon>
                    <p class="text-xs font-bold uppercase tracking-tight">Save Backup Codes</p>
                  </div>
                  <ul class="grid grid-cols-2 gap-2">
                    @for (code of setupData()?.backupCodes; track code) {
                      <li class="font-mono text-xs text-slate-700 bg-white/50 px-2 py-1 rounded border border-amber-100 text-center">{{ code }}</li>
                    }
                  </ul>
                  <p class="mt-2 text-[10px] text-amber-700 leading-tight italic">
                    Keep these codes in a safe place. They are the ONLY way to access your account if you lose your phone.
                  </p>
                </div>
              }

              <button mat-flat-button color="primary" 
                      [disabled]="loading() || verificationCode().length !== 6"
                      (click)="verify()" class="w-full py-2 mt-2">
                @if (loading()) {
                  <mat-spinner diameter="24" class="inline-block"></mat-spinner>
                } @else {
                  <span>Verify & Enable 2FA</span>
                }
              </button>
            </div>
          </div>
        }

        @if (error()) {
          <p class="text-red-600 text-sm mt-4 text-center font-medium">{{ error() }}</p>
        }

        @if (success()) {
          <div class="text-center py-6 animate-in fade-in zoom-in duration-300">
            <div class="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <mat-icon class="text-green-600 !w-10 !h-10 !text-[40px]">check_circle</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Setup Successful!</h3>
            <p class="text-slate-500 text-sm mb-6">Two-factor authentication is now active on your account.</p>
            <button mat-flat-button color="primary" routerLink="/dashboard" class="w-full">
              Go to Dashboard
            </button>
          </div>
        }
        
        @if (!success()) {
          <button mat-button routerLink="/login" class="w-full mt-4">
            Cancel & Back
          </button>
        }
      </mat-card-content>

      <mat-card-footer class="py-4 text-center">
        <span class="text-xs text-slate-500">Admin Console &copy; 2026</span>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [`:host { display: block; }`]
})
export class TotpSetupComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  setupData = signal<any>(null);
  verificationCode = signal('');
  error = signal<string | null>(null);
  success = signal(false);
  loading = signal(false);

  ngOnInit() {
    this.loadSetupData();
  }

  loadSetupData() {
    this.loading.set(true);
    this.auth.setup2fa().subscribe({
      next: (res: any) => {
        this.loading.set(false);
        this.setupData.set(res);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to load 2FA setup data.');
      }
    });
  }

  verify() {
    if (this.verificationCode().length !== 6 || this.loading()) return;
    this.loading.set(true);
    this.error.set(null);

    this.auth.confirm2faSetup(this.verificationCode()).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        this.snackBar.open('2FA enabled successfully!', 'Close', { 
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (err: any) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Invalid code. Verification failed.');
      }
    });
  }
}
