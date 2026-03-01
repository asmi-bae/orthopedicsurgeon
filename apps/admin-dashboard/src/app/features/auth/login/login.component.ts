import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, selectIsLoading, selectAuthError } from '@repo/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>Admin Login</h2>
        <div class="form-group">
          <label>Email</label>
          <input type="email" formControlName="email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" formControlName="password" />
        </div>
        <button type="submit" [disabled]="isLoading$ | async">
          {{ (isLoading$ | async) ? 'Logging in...' : 'Login' }}
        </button>
        <div *ngIf="error$ | async" class="error">{{ error$ | async }}</div>
      </form>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; height: 100vh; }
    form { padding: 2rem; border: 1px solid #ccc; border-radius: 8px; width: 300px; }
    .form-group { margin-bottom: 1rem; }
    input { width: 100%; padding: 0.5rem; }
    .error { color: red; margin-top: 1rem; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading$ = this.store.select(selectIsLoading);
  error$ = this.store.select(selectAuthError);

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(login({ credentials: this.loginForm.value }));
    }
  }
}
