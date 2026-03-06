import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdInputComponent,
  ZrdBadgeComponent 
} from '@repo/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PATIENTSMANAGEMENTService } from '../../core/services/api/patientsmanagement.service';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Patient Registry</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Unified management system for all platform patients.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">person_add</mat-icon>
          Register New Patient
        </zrd-button>
      </div>

      <!-- Main Content Card -->
      <zrd-card variant="default">
        <!-- Search & Filter Area -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex-1 max-w-md">
            <zrd-input 
              placeholder="Search by name, ID, or phone..." 
              [hasPrefix]="true"
              (keyup)="applyFilter($event)"
            >
              <mat-icon prefix class="text-google-gray-400">search</mat-icon>
            </zrd-input>
          </div>
          <div class="flex items-center gap-2">
            <zrd-button variant="outline" size="sm">
              <mat-icon leftIcon>filter_list</mat-icon>
              Filters
            </zrd-button>
            <zrd-button variant="outline" size="sm">
              <mat-icon leftIcon>sort</mat-icon>
              Recent
            </zrd-button>
          </div>
        </div>

        @if (loading()) {
          <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
             <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
          </div>
        }

        <!-- Spartan Table -->
        <div class="overflow-x-auto -mx-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-google-gray-100 dark:border-white/5 bg-google-gray-50/50 dark:bg-white/5">
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest pl-10">Patient Record</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Demographics</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Blood Group</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Status</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-google-gray-100 dark:divide-white/5">
              @for (row of patients(); track row.id) {
                <tr class="hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                  <td class="px-6 py-5 pl-10">
                    <div class="flex items-center gap-4">
                      <div class="w-11 h-11 rounded-full bg-google-blue/10 flex items-center justify-center text-sm font-black text-google-blue shrink-0">
                        {{ row.user?.firstName?.charAt(0) || 'P' }}
                      </div>
                      <div>
                        <p class="font-bold text-sm text-google-gray-900 dark:text-white m-0 tracking-tight">
                          {{ row.user?.firstName }} {{ row.user?.lastName }}
                        </p>
                        <p class="text-[10px] uppercase font-black tracking-widest text-google-gray-400 m-0">
                          ID: {{ row.id.split('-')[0].toUpperCase() }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-2">
                      <zrd-badge variant="neutral">{{ row.gender || 'N/A' }}</zrd-badge>
                      <zrd-badge variant="info">{{ row.age || 0 }} years</zrd-badge>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-2 text-google-gray-600 dark:text-google-gray-400">
                      <mat-icon class="text-sm">water_drop</mat-icon>
                      <span class="text-sm font-bold">{{ row.bloodGroup || 'Not set' }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <zrd-badge [variant]="$any(row.status === 'ACTIVE' ? 'success' : 'neutral')">
                      {{ row.status === 'ACTIVE' ? 'Verified' : 'Pending' }}
                    </zrd-badge>
                  </td>
                  <td class="px-6 py-5 text-right pr-10">
                    <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                      <button mat-menu-item [routerLink]="['/patients', row.id, 'health']">
                        <mat-icon class="text-google-blue">clinical_notes</mat-icon> 
                        <span class="font-bold text-sm">Health Records</span>
                      </button>
                      <button mat-menu-item>
                        <mat-icon class="text-google-gray-600">event</mat-icon> 
                        <span class="font-bold text-sm">Schedule Appointment</span>
                      </button>
                      <button mat-menu-item>
                        <mat-icon class="text-google-gray-600">edit</mat-icon> 
                        <span class="font-bold text-sm">Update Profile</span>
                      </button>
                      <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                      <button mat-menu-item class="text-google-red">
                        <mat-icon class="text-google-red">block</mat-icon> 
                        <span class="font-bold text-sm">Restrict Access</span>
                      </button>
                    </mat-menu>
                  </td>
                </tr>
              }
            </tbody>
          </table>

          @if (patients().length === 0 && !loading()) {
            <div class="py-24 text-center">
              <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <mat-icon class="text-google-gray-400 text-3xl">person_search</mat-icon>
              </div>
              <h3 class="font-bold text-google-gray-900 dark:text-white">No Results Found</h3>
              <p class="text-sm text-google-gray-500 max-w-xs mx-auto mt-2">Try adjusting your search filters or check back later.</p>
            </div>
          }
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 mt-4 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">Displaying {{ patients().length }} patient(s)</span>
          <div class="flex items-center gap-2">
            <zrd-button variant="ghost" size="sm" [disabled]="true">Prev</zrd-button>
            <zrd-button variant="ghost" size="sm" [disabled]="true">Next</zrd-button>
          </div>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class PatientManagementComponent implements OnInit {
  private patientService = inject(PATIENTSMANAGEMENTService);

  patients = signal<any[]>([]);
  loading = signal(false);
  columns = ['name', 'biometrics', 'bloodGroup', 'status', 'actions'];

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.loading.set(true);
    this.patientService.getAdminPatients().subscribe({
      next: (res) => {
        // Assuming API returns ApiResponse<PageResponse<PatientResponse>>
        const data = res?.data?.content || res?.data || [];
        this.patients.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load patients', err);
        this.loading.set(false);
      }
    });
  }

  applyFilter(event: Event) {
    // filtering logic can be added here
  }
}

