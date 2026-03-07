import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent, ZrdBadgeComponent } from '@ui/components';
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminApiService } from '@core/services/admin-api.service';
import { Hospital } from '@repo/types';

@Component({
  selector: 'app-hospital-management',
  standalone: true,
  imports: [
    CommonModule,
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Facility Network</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage partner hospitals and clinical infrastructure.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">add_business</mat-icon>
          Register Facility
        </zrd-button>
      </div>

      <!-- Network Inventory Card -->
      <zrd-card variant="default">
        <!-- Search & Control -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex-1 max-w-sm">
            <zrd-input 
              placeholder="Locate hospital by name or city..." 
              [hasPrefix]="true"
            >
              <mat-icon prefix class="text-google-gray-400">domain_verification</mat-icon>
            </zrd-input>
          </div>
          <div class="flex items-center gap-2 ml-auto">
             <zrd-button variant="outline" size="sm">
               <mat-icon leftIcon>map</mat-icon>
               View Network Map
             </zrd-button>
          </div>
        </div>

        @if (loading()) {
          <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
             <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
          </div>
        }

        <!-- Spartan Facility Table -->
        <div class="overflow-x-auto -mx-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-google-gray-100 dark:border-white/5 bg-google-gray-50/50 dark:bg-white/5">
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest pl-10">Facility Name</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Regional Hub</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Communication</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Operating Status</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-google-gray-100 dark:divide-white/5">
              @for (row of hospitals(); track row.id) {
                <tr class="hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                  <td class="px-6 py-5 pl-10">
                    <div class="flex items-center gap-4">
                      <div class="w-11 h-11 rounded-2xl bg-google-emerald/10 flex items-center justify-center text-google-emerald shrink-0">
                        <mat-icon class="text-[20px]">corporate_fare</mat-icon>
                      </div>
                      <div>
                        <p class="font-bold text-sm text-google-gray-900 dark:text-white m-0 tracking-tight">{{ row.name }}</p>
                        <p class="text-[10px] uppercase font-black tracking-widest text-google-gray-400 m-0">LICENSE: {{ row.licenseNumber }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-2 text-google-gray-600 dark:text-google-gray-400">
                      <mat-icon class="text-[18px]">location_on</mat-icon>
                      <span class="text-sm font-bold">{{ row.city }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex flex-col">
                       <span class="text-sm font-bold text-google-gray-900 dark:text-white">{{ row.phone }}</span>
                       <span class="text-[10px] text-google-gray-400 uppercase font-black tracking-tighter">Verified Contact</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <zrd-badge [variant]="$any(row.status === 'ACTIVE' ? 'success' : 'neutral')">
                      {{ row.status === 'ACTIVE' ? 'Operational' : 'Maintenance' }}
                    </zrd-badge>
                  </td>
                  <td class="px-6 py-5 text-right pr-10">
                    <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                      <button mat-menu-item>
                        <mat-icon class="text-google-blue">settings</mat-icon>
                        <span class="font-bold text-sm">Service Config</span>
                      </button>
                      <button mat-menu-item>
                        <mat-icon class="text-google-gray-600">bar_chart</mat-icon>
                        <span class="font-bold text-sm">Usage Analytics</span>
                      </button>
                      <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                      <button mat-menu-item class="text-google-red">
                        <mat-icon class="text-google-red">emergency_home</mat-icon>
                        <span class="font-bold text-sm">Force Deactivate</span>
                      </button>
                    </mat-menu>
                  </td>
                </tr>
              }
            </tbody>
          </table>

          @if (hospitals().length === 0 && !loading()) {
            <div class="py-24 text-center">
              <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <mat-icon class="text-google-gray-400 text-3xl">domain_disabled</mat-icon>
              </div>
              <h3 class="font-bold text-google-gray-900 dark:text-white">No Facilities Registered</h3>
              <p class="text-sm text-google-gray-500 max-w-xs mx-auto mt-2">Platform network is currently empty. Start by adding a new hospital.</p>
            </div>
          }
        </div>

        <!-- Inventory Footer -->
        <div class="px-6 py-4 mt-6 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">{{ hospitals().length }} Network Hub(s)</span>
          <div class="flex items-center gap-2">
            <zrd-button variant="ghost" size="sm" [disabled]="true">Previous</zrd-button>
            <zrd-button variant="ghost" size="sm" [disabled]="true">Next</zrd-button>
          </div>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class HospitalManagementComponent implements OnInit {
  private api = inject(AdminApiService);
  hospitals = signal<Hospital[]>([]);
  loading = signal(false);
  displayedColumns = ['name', 'city', 'phone', 'status', 'actions'];

  ngOnInit() { this.loadHospitals(); }

  loadHospitals() {
    this.loading.set(true);
    this.api.getHospitals().subscribe({
      next: (res) => { this.hospitals.set(res.data.content); this.loading.set(false); },
      error: () => { this.loading.set(false); }
    });
  }
}
