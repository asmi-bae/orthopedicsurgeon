import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormControl, 
  FormGroupDirective, 
  NgForm, 
  Validators, 
  FormsModule, 
  ReactiveFormsModule, 
  FormBuilder,
  FormGroup 
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '@repo/auth';
import { ToastService } from '../../../core/services/toast.service';
import { TranslatePipe } from '@core/pipes/translate.pipe';
import { TranslationService } from '@core/services/translation.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TranslatePipe
  ],
  template: `
    <div class="h-full flex flex-col justify-center relative z-10">
      <div class="mb-8">
        <button mat-icon-button routerLink="/auth/login" class="mb-4 -ml-2">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">{{ 'AUTH.FORGOT.TITLE' | translate }}</h1>
        <p class="text-slate-500 font-medium text-sm">{{ 'AUTH.FORGOT.SUBTITLE' | translate }}</p>
      </div>

      @if (!submitted()) {
        <mat-card class="!shadow-none !border-none !bg-transparent !p-0">
          <mat-card-content class="!p-0">
            <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-6">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>{{ 'AUTH.FORGOT.EMAIL' | translate }}</mat-label>
                <input matInput type="email" formControlName="email" [errorStateMatcher]="matcher">
                <mat-error>
                  @if (forgotForm.get('email')?.hasError('required')) { {{ 'AUTH.FORGOT.ERRORS.EMAIL_REQ' | translate }} }
                  @else if (forgotForm.get('email')?.hasError('email')) { {{ 'AUTH.FORGOT.ERRORS.EMAIL_INVALID' | translate }} }
                </mat-error>
              </mat-form-field>

              <button mat-flat-button color="primary" 
                      [disabled]="loading() || forgotForm.invalid"
                      class="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary-500/20">
                @if (!loading()) {
                  <span>{{ 'AUTH.FORGOT.ACTION' | translate }}</span>
                } @else {
                  <mat-spinner diameter="24" class="inline-block"></mat-spinner>
                }
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      } @else {
        <div class="text-center bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <mat-icon class="text-3xl">email</mat-icon>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ 'AUTH.FORGOT.SUCCESS_TITLE' | translate }}</h3>
          <p class="text-slate-500 text-sm mb-8 leading-relaxed">
            {{ 'AUTH.FORGOT.SUCCESS_DESC' | translate }} <br>
            <span class="font-bold text-slate-900">{{forgotForm.get('email')?.value}}</span>
          </p>
          <button mat-stroked-button class="w-full h-12 rounded-xl border-slate-200" (click)="submitted.set(false)">
            {{ 'AUTH.FORGOT.RETRY' | translate }}
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private ts = inject(TranslationService);

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  loading = signal(false);
  submitted = signal(false);
  matcher = new MyErrorStateMatcher();

  onSubmit() {
    if (this.forgotForm.invalid) return;
    this.loading.set(true);
    
    this.auth.forgotPassword(this.forgotForm.value.email).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
        this.toast.success(this.ts.translate('AUTH.FORGOT.ERRORS.SUCCESS_TOAST')());
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err.error?.message || this.ts.translate('AUTH.FORGOT.ERRORS.FAILED_TOAST')());
      }
    });
  }
}
