import { Component, inject, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdInputComponent,
  ZrdBadgeComponent 
} from '@repo/ui';
import { MatIconModule } from '@angular/material/icon';
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
    ZrdCardComponent,
    ZrdButtonComponent,
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-google-gray-950">
      
      <!-- Left Cinematic Side -->
      <div class="hidden lg:flex lg:w-[55%] relative group overflow-hidden">
        <!-- Generative Ambient Background -->
        <div class="absolute inset-0 bg-google-gray-900">
           <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#4285F4_0%,_transparent_70%)] animate-pulse-slow"></div>
           <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <!-- Branding Overlay -->
        <div class="absolute inset-0 flex flex-col justify-between p-20 z-10">
           <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg">
                 <mat-icon class="text-google-blue">admin_panel_settings</mat-icon>
              </div>
              <span class="text-xl font-black text-white tracking-tighter uppercase">Precision Admin</span>
           </div>

           <div class="max-w-xl">
              <zrd-badge variant="info" class="bg-white/10 text-white border-white/20 mb-6 font-black text-[10px]">LATEST DEPLOYMENT: v2.4.0</zrd-badge>
              <h1 class="text-6xl font-black text-white leading-[1.05] tracking-tighter mb-6">
                Clinical Excellence <br/>
                <span class="text-google-blue">Architected for Scale.</span>
              </h1>
              <p class="text-lg text-google-gray-300 font-medium leading-relaxed opacity-80">
                Advanced governance tools for the modern orthopedic practitioner. Secure, high-performance, and intuitively designed.
              </p>
           </div>

           <div class="flex items-center gap-6">
              <div class="flex -space-x-3">
                 <div class="w-10 h-10 rounded-full border-2 border-google-gray-900 bg-google-gray-700"></div>
                 <div class="w-10 h-10 rounded-full border-2 border-google-gray-900 bg-google-blue"></div>
                 <div class="w-10 h-10 rounded-full border-2 border-google-gray-900 bg-google-emerald"></div>
              </div>
              <span class="text-xs font-bold text-google-gray-400 tracking-tight">Trusted by 12,000+ medical professionals worldwide.</span>
           </div>
        </div>
      </div>

      <!-- Right Governance Form -->
      <div class="flex-1 flex items-center justify-center p-8 sm:p-24 bg-google-gray-50/50 dark:bg-google-gray-950">
        <div class="w-full max-w-[420px] animate-in slide-in-from-right-12 duration-700">
          
          <zrd-card variant="default" class="p-10 border-none shadow-google-xl relative overflow-hidden">
            <!-- Glass Morphic Accent -->
             <div class="absolute top-0 right-0 w-32 h-32 bg-google-blue/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>

            @if (step() === 'login') {
              <div class="relative z-10">
                <header class="mb-10 text-center">
                  <h2 class="text-3xl font-black text-google-gray-900 dark:text-white tracking-tighter m-0">Identity Gate</h2>
                  <p class="text-sm text-google-gray-500 dark:text-google-gray-400 mt-2 font-medium leading-relaxed">Authorize your session to access the administrative lattice.</p>
                </header>

                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-google-gray-400 ml-1">Administrative Email</label>
                    <zrd-input 
                      placeholder="e.g. admin@precision.md" 
                      formControlName="email"
                      [hasPrefix]="true"
                    >
                      <mat-icon prefix class="text-google-gray-400">alternate_email</mat-icon>
                    </zrd-input>
                    @if (loginForm.get('email')?.touched && loginForm.get('email')?.invalid) {
                       <p class="text-[10px] font-bold text-google-red ml-1 mt-1 uppercase tracking-tight">Invalid identity format</p>
                    }
                  </div>

                  <div class="space-y-2">
                    <div class="flex items-center justify-between ml-1">
                       <label class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Security Key</label>
                       <a routerLink="/auth/forgot-password" class="text-[10px] font-black uppercase tracking-widest text-google-blue hover:underline">Recovery Options</a>
                    </div>
                    <zrd-input 
                      [type]="hidePassword() ? 'password' : 'text'" 
                      formControlName="password"
                      placeholder="••••••••••••"
                      [hasPrefix]="true"
                    >
                      <mat-icon prefix class="text-google-gray-400">lock_open</mat-icon>
                      <button type="button" class="ml-2 text-google-gray-400 hover:text-google-blue transition-colors" (click)="hidePassword.set(!hidePassword())">
                         <mat-icon class="text-[20px]">{{hidePassword() ? 'visibility' : 'visibility_off'}}</mat-icon>
                      </button>
                    </zrd-input>
                  </div>

                  <zrd-button 
                    variant="primary" 
                    size="lg" 
                    class="w-full h-14 rounded-2xl shadow-lg shadow-google-blue/20 mt-4"
                    [disabled]="loading() || loginForm.invalid"
                  >
                    @if (!loading()) {
                      <div class="flex items-center justify-center gap-2">
                        <span class="font-black text-sm uppercase tracking-widest">Verify & Authorize</span>
                        <mat-icon class="text-lg">arrow_forward</mat-icon>
                      </div>
                    } @else {
                      <mat-spinner diameter="24" class="inline-block"></mat-spinner>
                    }
                  </zrd-button>

                  <div class="relative my-8">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-google-gray-100 dark:border-white/5"></div></div>
                    <div class="relative flex justify-center text-[10px] uppercase tracking-widest font-black"><span class="bg-white dark:bg-google-gray-900 px-4 text-google-gray-400">Biometric / Federated</span></div>
                  </div>

                  <zrd-button 
                    type="button" 
                    variant="outline" 
                    size="lg" 
                    class="w-full h-14 rounded-2xl border-google-gray-200 dark:border-white/10 hover:bg-google-gray-50 dark:hover:bg-white/5"
                    (click)="onGoogleLogin()"
                    [disabled]="loading()"
                  >
                    <div class="flex items-center justify-center gap-3">
                      <svg class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span class="font-black text-sm uppercase tracking-widest text-google-gray-700 dark:text-google-gray-300">Google Credentials</span>
                    </div>
                  </zrd-button>
                </form>
              </div>
            } @else if (step() === 'mfa') {
              <div class="relative z-10 animate-in fade-in duration-500">
                <header class="mb-10 text-center">
                  <h2 class="text-3xl font-black text-google-gray-900 dark:text-white tracking-tighter m-0">Multi-Factor Sync</h2>
                  <p class="text-sm text-google-gray-500 dark:text-google-gray-400 mt-2 font-medium leading-relaxed">Enter the high-security ephemeral token dispatched to your endpoint.</p>
                </header>

                <form (ngSubmit)="onMfaSubmit()" class="space-y-8">
                  <div class="p-6 rounded-3xl bg-google-blue/5 border border-google-blue/10 text-center">
                    <span class="text-[10px] font-black uppercase tracking-widest text-google-blue">Entropy Valid For:</span>
                    <div class="text-5xl font-black text-google-blue mt-2 tracking-tighter tabular-nums">
                      {{ formatTime(timer()) }}
                    </div>
                  </div>

                  <div class="space-y-4">
                    <label class="text-[10px] font-black uppercase tracking-widest text-google-gray-400 text-center block">6-Digit Access Token</label>
                    <zrd-input 
                      [ngModel]="otpCode()" 
                      (ngModelChange)="otpCode.set($event)"
                      name="otpCode" 
                      maxlength="6" 
                      [disabled]="timer() <= 0"
                      placeholder="0  0  0  0  0  0"
                      class="text-center text-3xl font-black tracking-[0.4em] dark:bg-white/5"
                    ></zrd-input>
                  </div>

                  @if (timer() <= 0) {
                    <div class="flex items-center gap-3 p-4 bg-google-red/5 text-google-red rounded-2xl border border-google-red/10 animate-shake">
                       <mat-icon class="text-lg">error_outline</mat-icon>
                       <span class="text-xs font-bold uppercase tracking-tight">Token identity expired. Requesting re-issue.</span>
                    </div>
                  }

                  <zrd-button 
                    variant="primary" 
                    size="lg" 
                    class="w-full h-14 rounded-2xl shadow-lg shadow-google-blue/20"
                    [disabled]="loading() || otpCode().length !== 6 || timer() <= 0"
                  >
                    @if (!loading()) {
                      <span class="font-black text-sm uppercase tracking-widest">Authenticate & Access</span>
                    } @else {
                      <mat-spinner diameter="24" class="inline-block"></mat-spinner>
                    }
                  </zrd-button>
                  
                  <div class="flex flex-col gap-4 mt-8">
                     <button type="button" class="text-[10px] font-black uppercase tracking-widest text-google-blue hover:underline p-2 disabled:opacity-50"
                             [disabled]="loading() || (timer() > 240)"
                             (click)="onSubmit()">
                        Resend Temporal Token {{ timer() > 240 ? '(' + (timer() - 240) + 's)' : '' }}
                     </button>
                     <button type="button" class="text-[10px] font-black uppercase tracking-widest text-google-gray-400 hover:text-google-gray-600 transition-colors p-2"
                             (click)="cancelMfa()">
                        Return to Identity Gate
                     </button>
                  </div>
                </form>
              </div>
            }

            <footer class="mt-12 text-center border-t border-google-gray-100 dark:border-white/5 pt-6">
               <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">&copy; 2026 PRECISION CLINICAL CONSOLE • ALL RIGHTS RESERVED</span>
            </footer>
          </zrd-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.35; } }
    @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); } 20%, 40%, 60%, 80% { transform: translateX(2px); } }
    .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
  `]
})
export class AdminLoginComponent implements OnInit, OnDestroy {
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

  ngOnInit() {
    this.initGoogleAuth();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private initGoogleAuth() {
    if (typeof google === 'undefined') {
      setTimeout(() => this.initGoogleAuth(), 500);
      return;
    }
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleGoogleResponse(response)
    });
  }

  private handleGoogleResponse(response: any) {
    if (response.credential) {
      this.loading.set(true);
      this.auth.googleLogin(response.credential).subscribe({
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
          this.showError(err.error?.message || 'Google login failed.');
        }
      });
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
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
    if (!token || this.otpCode().length !== 6) return;
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

  onGoogleLogin() {
    google.accounts.id.prompt();
  }

  private showSuccessAndNavigate() {
    this.snackBar.open('Access Granted: Welcome to Precision Console', 'Close', { 
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
