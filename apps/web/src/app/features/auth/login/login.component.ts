import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatIconModule
  ],
  template: `
    <div class="animate-in fade-in slide-in-from-right duration-700">
      <h2 class="text-2xl font-black text-secondary-900 mb-2 tracking-tighter">Login</h2>
      <p class="text-sm text-secondary-500 mb-8 font-medium">Please enter your credentials to login.</p>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Email Address</mat-label>
          <input matInput type="email" formControlName="email" placeholder="name@orthosync.med">
        </mat-form-field>

        <div class="space-y-2">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" placeholder="••••••••">
          </mat-form-field>
          <div class="flex justify-end">
            <a routerLink="/auth/forgot-password" class="text-[10px] font-bold text-primary hover:underline underline-offset-4 tracking-tight">Forgot your password?</a>
          </div>
        </div>

        <mat-checkbox formControlName="rememberMe">
          <span class="text-[10px] font-bold text-secondary-400 tracking-tight">Remember me for 30 days</span>
        </mat-checkbox>

        @if (error()) {
          <div class="p-4 bg-red-50 border border-red-100 rounded-2xl text-[10px] font-bold text-red-600 tracking-tight animate-shake">
             <mat-icon class="scale-75 align-middle mr-1">report_problem</mat-icon> {{ error() }}
          </div>
        }

        <button mat-flat-button color="primary" class="h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20" 
                type="submit" [disabled]="loading()">
          @if (!loading()) {
            <span>Sign In</span>
          } @else {
            <span>Validating...</span>
          }
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-[10px] font-bold text-secondary-400 tracking-tight mb-4">Don't have an account?</p>
        <button mat-stroked-button color="primary" routerLink="/auth/register" class="h-10 px-8 rounded-lg font-bold border-2 w-full">
          Create Account
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
    mat-form-field { width: 100%; }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false]
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
        this.router.navigate(['/portal/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Access Denied: Invalid Credentials');
      }
    });
  }
}
