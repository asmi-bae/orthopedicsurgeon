import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdInputComponent,
  ZrdBadgeComponent 
} from '@repo/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-partner-management',
  standalone: true,
  imports: [
    CommonModule, 
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Alliance Network</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage institutional partners, hospital groups, and medical research foundations.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">handshake</mat-icon>
          Onboard Alliance
        </zrd-button>
      </div>

      <!-- Control Strip -->
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1 max-w-sm">
          <zrd-input 
            placeholder="Search alliance partners..." 
            [hasPrefix]="true"
          >
            <mat-icon prefix class="text-google-gray-400">hub</mat-icon>
          </zrd-input>
        </div>
        <div class="flex items-center gap-2 ml-auto">
           <zrd-button variant="outline" size="sm">
             <mat-icon leftIcon>category</mat-icon>
             Category Filter
           </zrd-button>
        </div>
      </div>

      <!-- Spartan Alliance Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (partner of partners(); track partner.id) {
          <zrd-card variant="default" class="group relative hover:scale-[1.02] transition-all cursor-pointer">
            <div class="flex items-start justify-between gap-4 mb-6">
              <!-- Entity Identifier -->
              <div class="w-14 h-14 rounded-2xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-100 dark:border-white/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-google-blue/5">
                <mat-icon class="text-google-gray-400 text-[28px] group-hover:text-google-blue transition-colors">corporate_fare</mat-icon>
              </div>

              <div class="flex items-center gap-2">
                <zrd-badge [variant]="partner.active ? 'success' : 'neutral'" class="font-black text-[10px]">
                  {{ partner.active ? 'Active' : 'Dormant' }}
                </zrd-badge>
                
                <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-100 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                  <button mat-menu-item>
                    <mat-icon class="text-google-blue">edit</mat-icon>
                    <span class="font-bold text-sm">Update Profile</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon class="text-google-emerald">upload</mat-icon>
                    <span class="font-bold text-sm">Replace Brandmark</span>
                  </button>
                  <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                  <button mat-menu-item class="text-google-red">
                    <mat-icon class="text-google-red">link_off</mat-icon>
                    <span class="font-bold text-sm">Dissolve Alliance</span>
                  </button>
                </mat-menu>
              </div>
            </div>

            <div>
              <h3 class="font-black text-lg text-google-gray-900 dark:text-white m-0 tracking-tight group-hover:text-google-blue transition-colors">{{ partner.name }}</h3>
              <p class="text-[10px] font-black uppercase tracking-widest text-google-gray-400 mt-1">{{ partner.category }}</p>
            </div>

            <div class="flex items-center justify-between mt-8 pt-4 border-t border-google-gray-100 dark:border-white/5">
               <div class="flex items-center gap-1.5 text-google-gray-500">
                  <mat-icon class="text-[14px]">calendar_today</mat-icon>
                  <span class="text-xs font-bold tracking-tight">Active since {{ partner.since }}</span>
               </div>
               <zrd-button variant="ghost" size="sm" class="px-2">History</zrd-button>
            </div>
          </zrd-card>
        }
      </div>

      @if (partners().length === 0) {
        <div class="py-24 text-center">
          <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
             <mat-icon class="text-google-gray-400 text-3xl">handshake</mat-icon>
          </div>
          <h3 class="font-bold text-google-gray-900 dark:text-white">Alliance Directory Empty</h3>
          <p class="text-sm text-google-gray-500 mt-2">No organizations were found matching your current filter set.</p>
        </div>
      }
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class PartnerManagementComponent {
  partners = signal([
    { id: 1, name: 'Metro Health Group',    category: 'Hospital Network',     active: true,  since: '2022' },
    { id: 2, name: 'PhysioFirst',           category: 'Rehabilitation Center', active: true,  since: '2023' },
    { id: 3, name: 'BioMed Innovations',    category: 'Medical Technology',    active: true,  since: '2021' },
    { id: 4, name: 'Global Health Fund',    category: 'Healthcare Foundation', active: false, since: '2023' },
    { id: 5, name: 'SurgeTech Labs',        category: 'Research & Development', active: true, since: '2024' },
    { id: 6, name: 'CareBridge Insurance',  category: 'Insurance Provider',    active: true,  since: '2022' },
  ]);
}
