import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
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
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    TranslatePipe
  ],
  template: `
    <div>
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-slate-900 mb-1 tracking-tight ">{{ 'AUTH.REGISTER.TITLE' | translate }}</h2>
        <p class="text-sm text-slate-500 font-medium tracking-tight">{{ 'AUTH.REGISTER.SUBTITLE' | translate }}</p>
      </div>

      <mat-card class="!shadow-none !border-none !bg-transparent !p-0">
          <mat-card-content class="!p-0">
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <mat-form-field appearance="outline">
                   <mat-label>{{ 'AUTH.REGISTER.FIRST_NAME' | translate }}</mat-label>
                   <input matInput formControlName="firstName" [errorStateMatcher]="matcher">
                   <mat-error>{{ 'AUTH.REGISTER.ERRORS.REQ' | translate }}</mat-error>
                 </mat-form-field>
                 <mat-form-field appearance="outline">
                   <mat-label>{{ 'AUTH.REGISTER.LAST_NAME' | translate }}</mat-label>
                   <input matInput formControlName="lastName" [errorStateMatcher]="matcher">
                   <mat-error>{{ 'AUTH.REGISTER.ERRORS.REQ' | translate }}</mat-error>
                 </mat-form-field>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>{{ 'AUTH.REGISTER.EMAIL' | translate }}</mat-label>
                <input matInput type="email" formControlName="email" [errorStateMatcher]="matcher">
                <mat-error>{{ 'AUTH.REGISTER.ERRORS.EMAIL_INVALID' | translate }}</mat-error>
              </mat-form-field>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <mat-form-field appearance="outline">
                   <mat-label>{{ 'AUTH.REGISTER.GENDER' | translate }}</mat-label>
                    <mat-select formControlName="gender">
                      @for (opt of translatedGenderOptions(); track opt.value) {
                        <mat-option [value]="opt.value">{{opt.label()}}</mat-option>
                      }
                    </mat-select>
                 </mat-form-field>
                 <mat-form-field appearance="outline">
                   <mat-label>{{ 'AUTH.REGISTER.PHONE' | translate }}</mat-label>
                   <input matInput formControlName="phone" [errorStateMatcher]="matcher">
                   <mat-error>{{ 'AUTH.REGISTER.ERRORS.PHONE_REQ' | translate }}</mat-error>
                 </mat-form-field>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>{{ 'AUTH.REGISTER.PASSWORD' | translate }}</mat-label>
                <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="password" [errorStateMatcher]="matcher">
                <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button" class="!w-10 !h-10">
                  <mat-icon class="text-slate-400">{{hidePassword() ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error>{{ 'AUTH.REGISTER.ERRORS.PASS_MIN' | translate }}</mat-error>
              </mat-form-field>

              <mat-checkbox formControlName="terms">
                <span class="text-[10px] font-bold text-slate-400 tracking-tight leading-tight ">{{ 'AUTH.REGISTER.TERMS' | translate }}</span>
              </mat-checkbox>

              <button mat-flat-button color="primary" class="h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20 mt-2" 
                      type="submit" [disabled]="loading() || registerForm.invalid">
                @if (!loading()) {
                  <span>{{ 'AUTH.REGISTER.ACTION' | translate }}</span>
                } @else {
                  <mat-spinner diameter="24" class="inline-block"></mat-spinner>
                }
              </button>
            </form>
          </mat-card-content>
      </mat-card>

      <div class="mt-12 text-center text-balance">
        <p class="text-[10px] font-bold text-slate-400 tracking-tight mb-4 ">{{ 'AUTH.REGISTER.LOGIN_PROMPT' | translate }}</p>
        <button mat-stroked-button color="primary" routerLink="/auth/login" class="h-10 px-8 rounded-lg font-bold border-2 w-full hover:bg-slate-50 transition-colors">
          {{ 'AUTH.REGISTER.LOGIN_ACTION' | translate }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    mat-form-field { width: 100%; }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private ts = inject(TranslationService);

  registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['MALE'],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, Validators.requiredTrue]
  });

  translatedGenderOptions = computed(() => [
    { label: this.ts.translate('AUTH.REGISTER.GENDER_OPTIONS.MALE'), value: 'MALE' },
    { label: this.ts.translate('AUTH.REGISTER.GENDER_OPTIONS.FEMALE'), value: 'FEMALE' },
    { label: this.ts.translate('AUTH.REGISTER.GENDER_OPTIONS.OTHER'), value: 'OTHER' }
  ]);

  loading = signal(false);
  hidePassword = signal(true);
  matcher = new MyErrorStateMatcher();

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading.set(true);
    
    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.success(this.ts.translate('AUTH.REGISTER.ERRORS.SUCCESS')());
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err.error?.message || this.ts.translate('AUTH.REGISTER.ERRORS.FAILED')());
      }
    });
  }
}
