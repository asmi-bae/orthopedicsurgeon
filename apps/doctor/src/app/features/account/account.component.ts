import { ZrdButtonComponent, ZrdInputComponent, ZrdSelectComponent, ZrdSelectItem } from '@ui/components';
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '@repo/auth';
import { DoctorAuthService } from '../../core/services/api/doctor-auth.service';
import { DoctorAccountService } from '../../core/services/api/doctor-account.service';
import { DoctorSessionService } from '../../core/services/api/doctor-session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    ZrdInputComponent,
    ZrdSelectComponent
  ],
  template: `
    <div class="w-full space-y-6 pb-12">
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 px-8">
        <div class="space-y-1">
          <h1 class="text-2xl font-semibold text-google-gray-900 dark:text-white">Account Settings</h1>
          <p class="text-sm text-google-gray-500 dark:text-google-gray-400">Manage your personal information, security preferences, and active sessions.</p>
        </div>
      </div>

      @if (loading()) {
        <div class="px-8 -mt-4">
          <mat-progress-bar mode="query" color="primary" class="rounded-full h-1"></mat-progress-bar>
        </div>
      }

      <!-- Main Account Area -->
      <div class="bg-transparent overflow-hidden no-animation">
        <mat-tab-group 
          class="profile-tabs" 
          [selectedIndex]="activeTab()" 
          (selectedIndexChange)="onTabChange($event)"
          headerPosition="above"
          animationDuration="0ms"
        >
          <!-- Personal Info Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <div class="flex items-center gap-2 py-3">
                <mat-icon class="!w-5 !h-5 !text-[20px]">person</mat-icon>
                <span>Personal info</span>
              </div>
            </ng-template>

            <div class="p-8 space-y-8 max-w-5xl">
              <!-- Avatar Section -->
              <div class="flex flex-col md:flex-row items-start gap-8">
                <div class="relative group">
                  <div class="w-32 h-32 rounded-full bg-google-gray-100 dark:bg-google-gray-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-google-gray-700 shadow-sm transition-all group-hover:shadow-md">
                    @if (auth.currentUser()?.imageUrl; as url) {
                      <img [src]="url" alt="Avatar" class="w-full h-full object-cover" />
                    } @else {
                      <span class="text-4xl font-light text-google-gray-400">{{ getInitials() }}</span>
                    }
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer">
                      <mat-icon>camera_alt</mat-icon>
                      <span class="text-[10px] font-bold mt-1">Change</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex-1 space-y-1.5 pt-2">
                  <h3 class="text-lg font-medium text-google-gray-900 dark:text-white">Profile Picture</h3>
                  <p class="text-sm text-google-gray-500 dark:text-google-gray-400">
                    A picture helps people recognize you and lets you know when you're signed in to your account.
                  </p>
                  <div class="flex items-center gap-3 pt-4">
                    <button mat-button class="!rounded-full !bg-google-blue !text-white !px-6">
                      Upload new
                    </button>
                    <button class="text-xs text-google-red hover:underline font-medium ml-2">Remove</button>
                  </div>
                </div>
              </div>

              <div class="h-px bg-google-gray-100 dark:bg-white/5"></div>

              <!-- Basic Info Form -->
              <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <zrd-input label="First name" formControlName="firstName" [error]="firstNameError()"></zrd-input>
                  <zrd-input label="Last name" formControlName="lastName" [error]="lastNameError()"></zrd-input>
                </div>
                <div class="space-y-4">
                  <zrd-input label="Email address" type="email" [value]="auth.currentUser()?.email || ''" [disabled]="true"></zrd-input>
                  <zrd-select 
                    label="Gender" 
                    formControlName="gender" 
                    [options]="genderOptions"
                    placeholder="Select gender">
                  </zrd-select>
                  <zrd-input label="Phone number" type="tel" formControlName="phone" placeholder="+1 (555) 000-0000"></zrd-input>
                </div>
                
                <div class="col-span-1 md:col-span-2 flex justify-end pt-4">
                  <button type="submit" mat-flat-button color="primary" [disabled]="loading() || profileForm.pristine">
                    {{ loading() ? 'Saving...' : 'Save changes' }}
                  </button>
                </div>
              </form>
            </div>
          </mat-tab>

          <!-- Security Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <div class="flex items-center gap-2 py-3">
                <mat-icon class="!w-5 !h-5 !text-[20px]">security</mat-icon>
                <span>Security</span>
              </div>
            </ng-template>

            <div class="p-8 space-y-12 max-w-5xl">
              <!-- Password Section -->
              <div class="space-y-6">
                 <div class="flex flex-col space-y-4">
                    <h3 class="text-lg font-medium text-google-gray-900 dark:text-white">Password</h3>
                    <p class="text-sm text-google-gray-500 dark:text-google-gray-400">
                      Change your password regularly to keep your account secure.
                    </p>
                    
                    <form [formGroup]="passwordForm" (ngSubmit)="changePassword()" class="space-y-4 max-w-md pt-2">
                       <zrd-input label="Current password" type="password" formControlName="oldPassword"></zrd-input>
                       <zrd-input label="New password" type="password" formControlName="newPassword"></zrd-input>
                       <div class="flex justify-end pt-2">
                          <button type="submit" mat-stroked-button [disabled]="loading() || passwordForm.invalid">
                            {{ loading() ? 'Changing...' : 'Change password' }}
                          </button>
                       </div>
                    </form>
                 </div>
              </div>

              <div class="h-px bg-google-gray-100 dark:bg-white/5"></div>

              <!-- 2FA Section -->
              <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                       <h3 class="text-lg font-medium text-google-gray-900 dark:text-white">2-Step Verification</h3>
                       <p class="text-sm text-google-gray-500 dark:text-google-gray-400">
                         Add an extra layer of security to your account by using your phone as a second factor.
                       </p>
                    </div>
                    @if (auth.currentUser()?.isTwoFactorEnabled) {
                       <span class="px-3 py-1 rounded-full bg-google-emerald/10 text-google-emerald text-sm font-bold tracking-wider">Enabled</span>
                    } @else {
                       <span class="px-3 py-1 rounded-full bg-google-gray-100 dark:bg-white/5 text-google-gray-500 text-sm font-bold tracking-wider">Disabled</span>
                    }
                 </div>

                 @if (!auth.currentUser()?.isTwoFactorEnabled && !show2faSetup()) {
                   <button (click)="init2faSetup()" mat-flat-button color="primary">
                      Set up 2-Step Verification
                   </button>
                 }

                 @if (show2faSetup()) {
                   <div class="p-6 rounded-2xl border border-google-blue/20 bg-google-blue/5 space-y-6">
                      <div class="flex items-center justify-between">
                         <h4 class="font-medium text-google-blue">Set up authenticator app</h4>
                         <button (click)="show2faSetup.set(false)" class="text-google-gray-400 hover:text-google-blue">
                           <mat-icon>close</mat-icon>
                         </button>
                      </div>
                      <div class="flex flex-col md:flex-row gap-8 items-center">
                         <div class="bg-white p-4 rounded-xl shadow-sm">
                            <div class="w-40 h-40 bg-google-gray-100 flex items-center justify-center border-2 border-dashed border-google-gray-200 overflow-hidden">
                               @if (tfaSetupData()?.qrCodeUrl) {
                                  <img [src]="tfaSetupData()?.qrCodeUrl" alt="QR Code" class="w-full h-full object-contain" />
                               } @else {
                                  <mat-icon class="text-google-gray-300 !text-4xl">qr_code_2</mat-icon>
                               }
                            </div>
                         </div>
                         <div class="flex-1 space-y-4 w-full">
                            <ol class="text-sm text-google-gray-600 dark:text-google-gray-400 space-y-2 list-decimal list-inside">
                               <li>Install an authenticator app like Google Authenticator or Authy.</li>
                               <li>Scan the QR code or enter the secret key: <code class="bg-google-gray-100 dark:bg-white/10 px-2 py-0.5 rounded font-mono">{{ tfaSetupData()?.secretKey }}</code></li>
                               <li>Enter the 6-digit code shown in your app to confirm.</li>
                            </ol>
                            <div class="flex items-end gap-3 max-w-sm">
                               <zrd-input label="Verification code" placeholder="000000" class="flex-1" [(ngModel)]="tfaCode" [ngModelOptions]="{standalone: true}"></zrd-input>
                               <button (click)="confirm2fa()" mat-flat-button color="primary" [disabled]="loading() || !tfaCode()">
                                 Confirm
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                 }
              </div>

              <div class="h-px bg-google-gray-100 dark:bg-white/5"></div>

              <!-- Sessions Section -->
              <div class="space-y-6">
                 <div class="flex items-center justify-between">
                    <div class="space-y-1">
                       <h3 class="text-lg font-medium text-google-gray-900 dark:text-white">Active Sessions</h3>
                       <p class="text-sm text-google-gray-500 dark:text-google-gray-400">Manage and sign out of your active sessions on all devices.</p>
                    </div>
                    <button (click)="revokeOtherSessions()" mat-button color="warn">
                       Sign out of all other sessions
                    </button>
                 </div>
                 
                 <div class="space-y-0 divide-y divide-google-gray-100 dark:divide-white/5 border border-google-gray-100 dark:border-white/10 rounded-2xl overflow-hidden">
                    @for (session of sessions(); track session.sessionId) {
                      <div class="flex items-center justify-between p-5 hover:bg-google-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                         <div class="flex items-center gap-5">
                            <div class="w-12 h-12 rounded-full bg-google-gray-100 dark:bg-google-gray-800 flex items-center justify-center text-google-gray-500">
                               <mat-icon>{{ session.deviceType === 'MOBILE' ? 'smartphone' : 'laptop' }}</mat-icon>
                            </div>
                            <div class="flex flex-col">
                               <div class="flex items-center gap-2">
                                  <span class="text-sm font-medium text-google-gray-900 dark:text-white">
                                    {{ session.os }} • {{ session.browser }}
                                  </span>
                                  @if (session.isCurrentSession) {
                                    <span class="text-xs font-bold text-google-blue bg-google-blue/10 px-2 py-0.5 rounded-full tracking-tight">Active</span>
                                  }
                               </div>
                               <span class="text-xs text-google-gray-500 dark:text-google-gray-400">
                                  {{ session.ipAddress }} • {{ session.location || 'Unknown location' }} • Last active {{ session.lastActivity | date:'medium' }}
                                </span>
                            </div>
                         </div>
                         @if (!session.isCurrentSession) {
                           <button (click)="revokeSession(session.sessionId)" class="h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-red/10 text-google-gray-400 hover:text-google-red transition-all">
                             <mat-icon class="!text-[20px]">logout</mat-icon>
                           </button>
                         }
                      </div>
                    }
                 </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `
})
export class AccountComponent implements OnInit {
  auth = inject(AuthService);
  doctorAuthService = inject(DoctorAuthService);
  doctorAccountService = inject(DoctorAccountService);
  securityService = inject(DoctorSessionService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  activeTab = signal(Number(inject(ActivatedRoute).snapshot.queryParams['tab'] || 0));
  loading = signal(false);
  sessions = signal<any[]>([]);
  
  show2faSetup = signal(false);
  tfaSetupData = signal<any>(null);
  tfaCode = signal('');

  genderOptions: ZrdSelectItem[] = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' }
  ];

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
    gender: [''],
    imageUrl: ['']
  });

  passwordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  firstNameError = signal<string | undefined>(undefined);
  lastNameError = signal<string | undefined>(undefined);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab'] !== undefined) {
        const tab = Number(params['tab']);
        if (this.activeTab() !== tab) {
          this.activeTab.set(tab);
          if (tab === 1) this.loadSessions();
        }
      }
    });

    // Populate form from existing user signal to avoid redundant /me call
    const user = this.auth.currentUser();
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        gender: user.gender || 'MALE'
      });
    }

    if (this.activeTab() === 1) this.loadSessions();
  }



  onTabChange(index: number) {
    this.activeTab.set(index);
    if (index === 1) this.loadSessions();
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: index },
      queryParamsHandling: 'merge'
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) return;
    
    this.loading.set(true);
    this.doctorAccountService.updateProfile(this.profileForm.value)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
          this.auth.checkAuth().subscribe();
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Failed to update profile', 'Close', { duration: 3000 });
        }
      });
  }

  changePassword() {
    if (this.passwordForm.invalid) return;
    
    this.loading.set(true);
    this.doctorAccountService.changePassword(this.passwordForm.value)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Password changed successfully', 'Close', { duration: 3000 });
          this.passwordForm.reset();
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Failed to change password', 'Close', { duration: 3000 });
        }
      });
  }

  loadSessions() {
    this.securityService.getMySessions().subscribe({
      next: (res: any) => this.sessions.set(res?.data || []),
      error: () => this.sessions.set([])
    });
  }

  revokeSession(id: string) {
    this.securityService.revokeSession(id).subscribe(() => {
      this.loadSessions();
      this.snackBar.open('Session revoked', 'Close', { duration: 3000 });
    });
  }

  revokeOtherSessions() {
    this.securityService.revokeAllOtherSessions().subscribe(() => {
      this.loadSessions();
      this.snackBar.open('All other sessions signed out', 'Close', { duration: 3000 });
    });
  }

  init2faSetup() {
    this.loading.set(true);
    this.doctorAuthService.setup2faBegin()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.tfaSetupData.set(res?.data);
          this.show2faSetup.set(true);
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Failed to initialize 2FA setup', 'Close', { duration: 3000 });
        }
      });
  }

  confirm2fa() {
    if (!this.tfaCode()) return;
    
    this.loading.set(true);
    this.doctorAuthService.setup2faVerify({ code: this.tfaCode() })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.snackBar.open('2-Step Verification enabled successfully', 'Close', { duration: 3000 });
          this.show2faSetup.set(false);
          this.auth.checkAuth().subscribe();
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Failed to confirm 2FA', 'Close', { duration: 3000 });
        }
      });
  }

  getInitials(): string {
    const user = this.auth.currentUser();
    if (!user) return '?';
    return ((user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')).toUpperCase();
  }
}
