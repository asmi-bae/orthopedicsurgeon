import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule
  ],
  template: `
    <div class="min-h-screen bg-secondary-950 flex items-center justify-center p-6 relative overflow-hidden backdrop-brightness-50">
       <!-- Cinematic Background Elements -->
       <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] animate-pulse"></div>
       <div class="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s"></div>
       
       <div class="w-full max-w-md animate-fade-in relative z-10">
          <div class="flex flex-col items-center gap-4 mb-14">
             <div class="w-20 h-20 rounded-[28px] bg-primary-600/20 flex items-center justify-center border border-primary-500/30 shadow-2xl shadow-primary-500/20 animate-slide-up">
                <mat-icon class="text-primary-400 scale-[2]">terminal</mat-icon>
             </div>
             <div class="text-center animate-slide-up" style="animation-delay: 0.1s">
                <h1 class="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">Precision Console</h1>
                <div class="flex items-center justify-center gap-2 mt-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                  <p class="text-primary-400 font-black text-[10px] uppercase tracking-[0.4em]">Administrative Access Gate</p>
                </div>
             </div>
          </div>

          <mat-card class="bg-white/[0.01] border border-white/5 rounded-[40px] p-10 glass shadow-2xl animate-slide-up" style="animation-delay: 0.2s">
              <div class="mb-10">
                <h2 class="text-xl font-black text-white tracking-tight uppercase italic mb-1">Identity Verification</h2>
                <p class="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-relaxed">Transmit credentials to initialize secure workplace session</p>
              </div>

              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-8">
                 <div class="space-y-2">
                    <label class="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Universal Identifier</label>
                    <div class="relative">
                       <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 scale-75">alternate_email</mat-icon>
                       <input type="email" formControlName="email" placeholder="ADMIN_UID@PROTO.CORE" 
                              class="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-black text-white placeholder:text-white/5 focus:outline-none focus:border-primary-500/30 focus:bg-white/10 transition-all tracking-wider">
                    </div>
                 </div>

                 <div class="space-y-2">
                    <label class="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Access Cipher</label>
                    <div class="relative">
                       <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 scale-75">security</mat-icon>
                       <input type="password" formControlName="password" placeholder="••••••••" 
                              class="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-black text-white placeholder:text-white/5 focus:outline-none focus:border-primary-500/30 focus:bg-white/10 transition-all">
                    </div>
                 </div>

                 <div *ngIf="error()" class="p-5 bg-red-500/5 border border-red-500/20 rounded-2xl text-[10px] font-black text-red-500 uppercase tracking-widest leading-relaxed">
                    <div class="flex items-center gap-3">
                       <mat-icon class="scale-75">error_outline</mat-icon>
                       <span>{{ error() }}</span>
                    </div>
                 </div>

                 <button mat-flat-button color="primary" 
                         [disabled]="loading()"
                         class="w-full h-16 rounded-2xl font-black uppercase tracking-tighter italic text-lg shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all">
                    <span *ngIf="!loading()">Initialize Session</span>
                    <div *ngIf="loading()" class="flex items-center gap-3 justify-center">
                       <span class="w-2 h-2 rounded-full bg-white animate-bounce"></span>
                       <span class="w-2 h-2 rounded-full bg-white animate-bounce" style="animation-delay: 0.2s"></span>
                       <span class="w-2 h-2 rounded-full bg-white animate-bounce" style="animation-delay: 0.4s"></span>
                    </div>
                 </button>
              </form>
          </mat-card>

          <div class="mt-12 text-center animate-slide-up" style="animation-delay: 0.3s">
             <p class="text-white/10 text-[9px] uppercase tracking-[0.5em] font-black italic">
               Authorized Terminal Node // 2026.PROTO.CORE
             </p>
          </div>
       </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .glass { backdrop-filter: blur(40px); }
    input:focus { box-shadow: 0 0 20px rgba(var(--primary-500-rgb), 0.1); }
  `]
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = signal(false);
  error = signal<string | null>(null);

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    
    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Access Denied: Terminal mismatch or invalid cipher.');
      }
    });
  }
}
