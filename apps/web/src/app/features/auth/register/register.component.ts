import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <div class="animate-in fade-in slide-in-from-left duration-700 pb-10">
      <h2 class="text-4xl font-black text-secondary-900 mb-2 uppercase tracking-tighter">Personnel Registry</h2>
      <p class="text-sm text-secondary-500 mb-10 font-medium">Initialize your profile within the OrthoSync deployment grid.</p>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
           <mat-form-field appearance="outline">
             <mat-label>First Name</mat-label>
             <input matInput formControlName="firstName" placeholder="John">
           </mat-form-field>
           <mat-form-field appearance="outline">
             <mat-label>Last Name</mat-label>
             <input matInput formControlName="lastName" placeholder="Doe">
           </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Primary Email Address</mat-label>
          <input matInput type="email" formControlName="email" placeholder="john.doe@orthosync.med">
          <mat-icon matSuffix>alternate_email</mat-icon>
        </mat-form-field>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
           <mat-form-field appearance="outline">
             <mat-label>Biological Cipher</mat-label>
              <mat-select formControlName="gender">
                @for (opt of genderOptions; track opt.value) {
                  <mat-option [value]="opt.value">{{opt.label}}</mat-option>
                }
              </mat-select>
           </mat-form-field>
           <mat-form-field appearance="outline">
             <mat-label>Contact Frequency</mat-label>
             <input matInput formControlName="phone" placeholder="+880 1XXX-XXXXXX">
             <mat-icon matSuffix>phone</mat-icon>
           </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Security Passphrase</mat-label>
          <input matInput type="password" formControlName="password" placeholder="Min. 8 characters">
          <mat-icon matSuffix>lock_outline</mat-icon>
        </mat-form-field>

        <mat-checkbox formControlName="terms">
          <span class="text-[10px] font-black text-secondary-400 uppercase tracking-widest leading-tight">Accept operational protocols & privacy encryption</span>
        </mat-checkbox>

        @if (error()) {
          <div class="p-4 bg-red-50 border border-red-100 rounded-2xl text-[10px] font-black text-red-600 uppercase tracking-widest animate-shake">
             <mat-icon class="scale-75 align-middle mr-1">warning</mat-icon> {{ error() }}
          </div>
        }

        <button mat-flat-button color="primary" class="h-16 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/30 mt-4" 
                type="submit" [disabled]="loading()">
          @if (!loading()) {
            <span>Get Started</span>
          } @else {
            <span>Registering Profile...</span>
          }
        </button>
      </form>

      <div class="mt-12 text-center text-balance">
        <p class="text-[10px] font-black text-secondary-400 uppercase tracking-[0.2em] mb-4">Already deployed?</p>
        <button mat-stroked-button color="primary" routerLink="/auth/login" class="h-14 px-10 rounded-xl font-bold uppercase border-2 w-full">
          Access Secure Portal
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    mat-form-field { width: 100%; }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['MALE'],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, Validators.requiredTrue]
  });

  genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' }
  ];

  loading = signal(false);
  error = signal<string | null>(null);

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading.set(true);
    
    // Simulations registration for now
    setTimeout(() => {
      this.loading.set(false);
      this.router.navigate(['/auth/login']);
    }, 1500);
  }
}
