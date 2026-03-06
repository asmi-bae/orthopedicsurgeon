import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@repo/auth';
import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent } from '@repo/ui';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    ZrdInputComponent
  ],
  template: `
    <div class="w-full space-y-6">
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 px-8">
        <div class="space-y-1">
          <h1 class="text-2xl font-semibold text-google-gray-900 dark:text-white">Profile Settings</h1>
          <p class="text-sm text-google-gray-500 dark:text-google-gray-400">Manage your personal information and security preferences.</p>
        </div>
      </div>

      <!-- Main Profile Area -->
      <div class="bg-transparent overflow-hidden">
        <mat-tab-group 
          class="profile-tabs" 
          [selectedIndex]="activeTab()" 
          (selectedIndexChange)="onTabChange($event)"
          headerPosition="above"
        >
          <!-- Personal Info Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <div class="flex items-center gap-2 py-3">
                <mat-icon class="!w-5 !h-5 !text-[20px]">person</mat-icon>
                <span>Personal info</span>
              </div>
            </ng-template>

            <div class="p-8 space-y-8">
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
                      <span class="text-[10px] uppercase font-bold mt-1">Change</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex-1 space-y-1.5 pt-2">
                  <h3 class="text-lg font-medium text-google-gray-900 dark:text-white">Profile Picture</h3>
                  <p class="text-sm text-google-gray-500 dark:text-google-gray-400">
                    A picture helps people recognize you and lets you know when you're signed in to your account.
                  </p>
                  <div class="flex items-center gap-3 pt-4">
                    <button mat-stroked-button class="!rounded-full !px-5 !border-google-gray-300 dark:!border-white/10 !text-google-gray-700 dark:!text-google-gray-200">
                      Upload new
                    </button>
                    <button class="text-xs text-google-red hover:underline font-medium ml-2">Remove</button>
                  </div>
                </div>
              </div>

              <div class="h-px bg-google-gray-100 dark:bg-white/5"></div>

              <!-- Basic Info Form -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <zrd-input label="First name" [value]="auth.currentUser()?.firstName || ''"></zrd-input>
                  <zrd-input label="Last name" [value]="auth.currentUser()?.lastName || ''"></zrd-input>
                </div>
                <div class="space-y-4">
                  <zrd-input label="Email address" type="email" [value]="auth.currentUser()?.email || ''" [disabled]="true"></zrd-input>
                  <zrd-input label="Phone number" type="tel" placeholder="+1 (555) 000-0000"></zrd-input>
                </div>
              </div>

              <div class="flex justify-end pt-4">
                <button mat-flat-button color="primary" class="!px-8 !py-6 !rounded-full !text-sm !font-medium">
                  Save changes
                </button>
              </div>
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

            <div class="p-8 space-y-8">
              <!-- Password Section -->
              <div class="space-y-4">
                 <div class="flex items-start gap-4 p-6 rounded-2xl border border-google-gray-100 dark:border-white/5 bg-google-gray-50/50 dark:bg-white/[0.02]">
                    <div class="w-12 h-12 rounded-full bg-google-blue/10 flex items-center justify-center text-google-blue shrink-0">
                       <mat-icon>lock</mat-icon>
                    </div>
                    <div class="flex-1 space-y-1">
                       <h3 class="text-lg font-medium text-google-gray-900 dark:text-white">Password</h3>
                       <p class="text-sm text-google-gray-500 dark:text-google-gray-400">
                         Create a strong password to help keep your account secure.
                       </p>
                       <div class="pt-4">
                          <button mat-stroked-button class="!rounded-full !px-5 !border-google-gray-300 dark:!border-white/10 !text-google-gray-700 dark:!text-google-gray-200">
                            Change password
                          </button>
                       </div>
                    </div>
                 </div>

                 <!-- 2FA Section -->
                 <div class="flex items-start gap-4 p-6 rounded-2xl border border-google-gray-100 dark:border-white/5 bg-google-gray-50/50 dark:bg-white/[0.02]">
                    <div class="w-12 h-12 rounded-full bg-google-emerald/10 flex items-center justify-center text-google-emerald shrink-0">
                       <mat-icon>phonelink_lock</mat-icon>
                    </div>
                    <div class="flex-1 space-y-1">
                       <div class="flex items-center justify-between">
                          <h3 class="text-lg font-medium text-google-gray-900 dark:text-white">2-Step Verification</h3>
                          <span class="px-2.5 py-1 rounded-full bg-google-emerald/10 text-google-emerald text-[10px] font-bold uppercase tracking-wider">Active</span>
                       </div>
                       <p class="text-sm text-google-gray-500 dark:text-google-gray-400">
                         Add an extra layer of security to your account by using your phone as a second factor.
                       </p>
                       <div class="pt-4">
                          <button mat-stroked-button class="!rounded-full !px-5 !border-google-gray-300 dark:!border-white/10 !text-google-gray-700 dark:!text-google-gray-200">
                            Manage settings
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              <div class="h-px bg-google-gray-100 dark:bg-white/5"></div>

              <!-- Login History -->
              <div class="space-y-4">
                 <h3 class="text-lg font-medium text-google-gray-900 dark:text-white">Your devices</h3>
                 <p class="text-sm text-google-gray-500 dark:text-google-gray-400">You're currently signed in to your account on these devices.</p>
                 
                 <div class="space-y-2 pt-2">
                    <div class="flex items-center justify-between p-4 rounded-xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors">
                       <div class="flex items-center gap-4">
                          <mat-icon class="text-google-gray-400">laptop</mat-icon>
                          <div class="flex flex-col">
                             <span class="text-sm font-medium text-google-gray-900 dark:text-white">Mac OS • Chrome</span>
                             <span class="text-xs text-google-gray-500">Dhaka, Bangladesh • Just now</span>
                          </div>
                       </div>
                       <span class="text-[10px] font-bold text-google-blue uppercase tracking-tighter">This device</span>
                    </div>
                 </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; padding-bottom: 2rem; }
    ::ng-deep .profile-tabs .mat-mdc-tab-header {
      border-bottom: 1px solid rgba(0,0,0,0.05);
      padding: 0 1.5rem;
    }
    ::ng-deep .profile-tabs .mat-mdc-tab-labels { gap: 1rem; }
    ::ng-deep .dark .profile-tabs .mat-mdc-tab-header { border-bottom-color: rgba(255,255,255,0.05); }
    ::ng-deep .profile-tabs .mat-mdc-tab-label-container { height: 64px; }
  `]
})
export class ProfileComponent implements OnInit {
  auth = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  activeTab = signal(0);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab'] !== undefined) {
        const tab = Number(params['tab']);
        if (this.activeTab() !== tab) {
          this.activeTab.set(tab);
        }
      }
    });
  }

  onTabChange(index: number) {
    this.activeTab.set(index);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: index },
      queryParamsHandling: 'merge'
    });
  }

  getInitials(): string {
    const user = this.auth.currentUser();
    if (!user) return '?';
    return ((user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')).toUpperCase();
  }
}
