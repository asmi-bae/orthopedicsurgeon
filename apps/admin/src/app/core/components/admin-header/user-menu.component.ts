import {
  Component,
  inject,
  signal,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { AuthService } from '@repo/auth';
import { ZrdButtonComponent, ZrdCardComponent, ZrdBadgeComponent } from '@repo/ui';

@Component({
  selector: 'app-admin-user-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatRippleModule,
    ZrdButtonComponent,
    ZrdCardComponent,
    ZrdBadgeComponent
  ],
  template: `
    @if (auth.currentUser(); as user) {
      <!-- Spartan Avatar Trigger -->
      <button class="relative group outline-none" (click)="toggle()">
        <div class="w-10 h-10 rounded-2xl overflow-hidden border-2 border-google-gray-100 dark:border-white/10 group-hover:border-google-blue transition-all group-hover:scale-105 shadow-sm">
           <img [src]="avatarUrl(user)" [alt]="user.firstName" class="w-full h-full object-cover" />
        </div>
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-google-emerald border-2 border-white dark:border-google-gray-900 rounded-full animate-pulse"></div>
      </button>

      <!-- Spartan Identity Panel -->
      @if (isOpen()) {
        <div class="fixed inset-0 z-[998]" (click)="close()"></div>
        <div class="absolute top-[calc(100%+12px)] right-0 w-[360px] z-[999] animate-in fade-in zoom-in-95 duration-200">
          <zrd-card variant="default" class="p-0 border-none shadow-google-xl overflow-hidden !rounded-[32px]">
            
            <!-- Panel High-Header -->
            <div class="bg-google-gray-900 p-8 relative overflow-hidden">
               <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#4285F4_0%,_transparent_70%)]"></div>
               
               <div class="relative z-10 flex flex-col items-center text-center">
                  <div class="w-20 h-20 rounded-[32px] border-4 border-white/10 overflow-hidden mb-4 shadow-2xl">
                     <img [src]="avatarUrl(user)" [alt]="user.firstName" class="w-full h-full object-cover" />
                  </div>
                  <h3 class="text-xl font-black text-white m-0 tracking-tight">Hi, {{ user.firstName }}!</h3>
                  <p class="text-xs font-bold text-google-gray-400 mt-1">{{ user.email }}</p>
                  
                  <div class="mt-6 flex items-center gap-2">
                     <zrd-badge variant="info" class="bg-white/10 text-white border-none font-black text-[9px] px-3">
                        {{ getRoleLabel(user.roles) }}
                     </zrd-badge>
                     <zrd-badge variant="success" class="bg-google-emerald/10 text-google-emerald border-none font-black text-[9px] px-3">
                        ACTIVE SESSION
                     </zrd-badge>
                  </div>
               </div>
            </div>

            <!-- Panel Navigation -->
            <div class="p-6 space-y-2">
               <a routerLink="/settings" (click)="close()" class="flex items-center gap-4 p-4 rounded-2xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all group">
                  <div class="w-10 h-10 rounded-xl bg-google-gray-100 dark:bg-white/10 flex items-center justify-center text-google-gray-400 group-hover:text-google-blue transition-colors">
                     <mat-icon>manage_accounts</mat-icon>
                  </div>
                  <div class="flex flex-col">
                     <span class="text-sm font-black text-google-gray-900 dark:text-white tracking-tight">Account Parameters</span>
                     <span class="text-[10px] font-bold text-google-gray-400 mt-0.5">Profile, preferences & identity</span>
                  </div>
               </a>

               <a routerLink="/settings/security" (click)="close()" class="flex items-center gap-4 p-4 rounded-2xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all group">
                  <div class="w-10 h-10 rounded-xl bg-google-gray-100 dark:bg-white/10 flex items-center justify-center text-google-gray-400 group-hover:text-google-emerald transition-colors">
                     <mat-icon>security</mat-icon>
                  </div>
                  <div class="flex flex-col">
                     <span class="text-sm font-black text-google-gray-900 dark:text-white tracking-tight">Governance & Security</span>
                     <span class="text-[10px] font-bold text-google-gray-400 mt-0.5">MFA, activity logs & keys</span>
                  </div>
               </a>

               <div (click)="onHelp()" class="flex items-center gap-4 p-4 rounded-2xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all group cursor-pointer">
                  <div class="w-10 h-10 rounded-xl bg-google-gray-100 dark:bg-white/10 flex items-center justify-center text-google-gray-400 group-hover:text-google-blue transition-colors">
                     <mat-icon>support_agent</mat-icon>
                  </div>
                  <div class="flex flex-col">
                     <span class="text-sm font-black text-google-gray-900 dark:text-white tracking-tight">Platform Intelligence</span>
                     <span class="text-[10px] font-bold text-google-gray-400 mt-0.5">Help artifacts & clinical support</span>
                  </div>
               </div>
            </div>

            <!-- Panel Exit Actions -->
            <div class="p-6 pt-0 flex flex-col gap-3">
               <zrd-button variant="primary" size="md" class="w-full !rounded-2xl" routerLink="/settings" (click)="close()">
                  Manage Console Entry
               </zrd-button>
               <zrd-button variant="ghost" size="md" class="w-full !rounded-2xl !text-google-red hover:!bg-google-red/10" (click)="onLogout()">
                  <mat-icon leftIcon>logout</mat-icon>
                  Terminate Session
               </zrd-button>
            </div>

            <div class="px-6 py-4 bg-google-gray-50 dark:bg-white/5 border-t border-google-gray-100 dark:border-white/5 text-center">
               <span class="text-[9px] font-black uppercase tracking-widest text-google-gray-400 italic">Security Token Refreshed: Oct 2024</span>
            </div>
          </zrd-card>
        </div>
      }
    }
  `,
  styles: [`
    :host { position: relative; display: inline-block; }
  `]
})
export class AdminUserMenuComponent {
  auth = inject(AuthService);
  private elRef = inject(ElementRef);

  isOpen = signal(false);
  toggle() { this.isOpen.update(v => !v); }
  close()  { this.isOpen.set(false); }

  avatarUrl(user: any): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=4285F4&color=fff&bold=true&size=128`;
  }

  getRoleLabel(roles: string[]): string {
    if (!roles || roles.length === 0) return 'OPERATOR';
    const map: Record<string, string> = {
      SUPER_ADMIN: 'SYSTEM_ARCHITECT',
      ADMIN: 'GOVERNANCE_ADMIN',
      STAFF: 'CLINICAL_STAFF',
      DOCTOR: 'MEDICAL_PRACTITIONER',
      PATIENT: 'CARE_RECIPIENT',
    };
    return map[roles[0]] ?? roles[0];
  }

  onLogout() { this.close(); this.auth.logout(); }
  onHelp()   { this.close(); window.open('mailto:support@orthosync.com', '_blank'); }

  @HostListener('document:keydown.escape')
  onEscape() { this.close(); }
}
