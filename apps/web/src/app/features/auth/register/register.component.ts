import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { 
  Validators, 
  FormsModule, 
  ReactiveFormsModule, 
  FormBuilder,
  FormGroup 
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="w-full max-w-[450px] mx-auto bg-slate-50">
      <div class="flex flex-col items-center pt-8 pb-4">
          <div class="w-14 h-14 rounded-full bg-primary-50/20 flex items-center justify-center mb-4">
            <mat-icon class="text-primary-600 !w-7 !h-7 !text-[28px] leading-none">person_add</mat-icon>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 m-0 text-center tracking-tight">Create Patient Account</h1>
          <p class="mt-2 text-xs text-slate-500 text-center max-w-[300px] leading-relaxed">
            Join our platform for complete medical coordination
          </p>
      </div>

      <div class="px-6 pb-6 mt-4">
        <form [formGroup]="registerForm" (ngSubmit)="$event.preventDefault(); onSubmit()" class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName">
                <mat-error>Required</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName">
                <mat-error>Required</mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email Address</mat-label>
              <input matInput type="email" formControlName="email">
              <mat-error>Invalid email format</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Phone Number</mat-label>
              <input matInput formControlName="phone">
              <mat-error>Required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button">
                <mat-icon>{{hidePassword() ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error>Min 8 characters required</mat-error>
            </mat-form-field>

            <div class="p-4 bg-slate-100/50 rounded-xl border border-slate-200/50">
              <mat-checkbox formControlName="terms" color="primary">
                <span class="text-[10px] font-bold text-slate-500 leading-tight">
                  I agree to the 
                  <a href="#" class="text-primary-600 hover:underline">Terms & Conditions</a> 
                  and 
                  <a href="#" class="text-primary-600 hover:underline">Privacy Policy</a>
                </span>
              </mat-checkbox>
            </div>

            <button mat-flat-button color="primary" 
                    [disabled]="loading() || registerForm.invalid"
                    class="w-full py-4 mt-2 h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20">
              @if (!loading()) {
                <span>Register Account</span>
              } @else {
                <mat-spinner diameter="24" class="inline-block"></mat-spinner>
              }
            </button>

            <div class="relative flex items-center gap-4 py-2">
                <div class="flex-grow border-t border-slate-200"></div>
                <span class="flex-shrink text-xs text-slate-400 font-bold uppercase tracking-widest">or</span>
                <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <button type="button" mat-stroked-button class="w-full h-12 rounded-xl border-2 font-bold hover:bg-slate-50 transition-all">
                <div class="flex items-center justify-center gap-3">
                    <img src="/assets/images/google-icon.svg" alt="Google" class="w-5 h-5 translate-y-[-1px]">
                    <span class="text-slate-700">Sign up with Google</span>
                </div>
            </button>
            
            <div class="text-center mt-4">
              <p class="text-xs font-bold text-slate-500 mb-2">Already have an account?</p>
              <a routerLink="/auth/login" class="text-sm font-bold text-primary-600 hover:text-primary-700 no-underline">Sign In</a>
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
    ::ng-deep .mat-mdc-checkbox .mdc-form-field { color: inherit; }
    ::ng-deep .success-snackbar { --mdc-snackbar-container-color: #059669; --mdc-snackbar-supporting-text-color: white; }
    ::ng-deep .error-snackbar { --mdc-snackbar-container-color: #dc2626; --mdc-snackbar-supporting-text-color: white; }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, Validators.requiredTrue]
  });

  loading = signal(false);
  hidePassword = signal(true);

  onSubmit() {
    if (this.registerForm.invalid || this.loading()) return;
    this.loading.set(true);
    
    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open('Registration successful! Please log in.', 'Close', { 
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBar.open(err.error?.message || 'Registration failed. Please try again.', 'Close', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
