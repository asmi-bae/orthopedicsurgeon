import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent, ZrdBadgeComponent } from '@ui/components';
import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { APPOINTMENTSMANAGEMENTService } from '../../core/services/api/appointmentsmanagement.service';

@Component({
  selector: 'app-appointment-management',
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
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Appointments</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage and track all patient clinical sessions.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">add_task</mat-icon>
          Schedule Session
        </zrd-button>
      </div>

      <!-- Summary Layer -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        @for (s of summary(); track s.label) {
          <zrd-card variant="default" class="group hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all">
            <p class="text-2xl font-black text-google-gray-900 dark:text-white m-0 tracking-tight">{{ s.value }}</p>
            <p class="text-xs font-bold text-google-gray-500 m-0 mt-1 uppercase tracking-widest">{{ s.label }}</p>
          </zrd-card>
        }
      </div>

      <!-- Main Directory Card -->
      <zrd-card variant="default">
        <!-- Control Strip -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex-1 max-w-sm">
            <zrd-input 
              placeholder="Search appointments..." 
              [hasPrefix]="true"
              (keyup)="applyFilter($event)"
            >
              <mat-icon prefix class="text-google-gray-400">search</mat-icon>
            </zrd-input>
          </div>
          <div class="flex items-center gap-2 ml-auto">
             <zrd-button variant="outline" size="sm">
               <mat-icon leftIcon>calendar_view_day</mat-icon>
               Schedule View
             </zrd-button>
          </div>
        </div>

        @if (loading()) {
          <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
             <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
          </div>
        }

        <!-- Spartan Appointment Table -->
        <div class="overflow-x-auto -mx-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-google-gray-100 dark:border-white/5 bg-google-gray-50/50 dark:bg-white/5">
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest pl-10">Patient Information</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Medical Specialist</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Date & Time</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Session Status</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-google-gray-100 dark:divide-white/5">
              @for (row of appointments(); track row.id) {
                <tr class="hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                  <td class="px-6 py-5 pl-10">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 rounded-full bg-google-blue/10 flex items-center justify-center text-sm font-black text-google-blue shrink-0">
                        {{ row.patient?.fullName?.charAt(0) || 'A' }}
                      </div>
                      <span class="font-bold text-sm text-google-gray-900 dark:text-white tracking-tight">{{ row.patient?.fullName }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-2 text-google-gray-600 dark:text-google-gray-400">
                      <mat-icon class="text-[18px]">medical_services</mat-icon>
                      <span class="text-sm font-bold">{{ row.doctor?.fullName }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex flex-col">
                       <span class="text-sm font-bold text-google-gray-900 dark:text-white">{{ row.appointmentDate }}</span>
                       <span class="text-[10px] text-google-gray-400 uppercase font-black tracking-widest">{{ row.startTime }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <zrd-badge [variant]="getStatusVariant(row.status)">
                      {{ row.status }}
                    </zrd-badge>
                  </td>
                  <td class="px-6 py-5 text-right pr-10">
                    <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                      <button mat-menu-item>
                        <mat-icon class="text-google-blue">edit_calendar</mat-icon>
                        <span class="font-bold text-sm">Reschedule Session</span>
                      </button>
                      <button mat-menu-item>
                        <mat-icon class="text-google-emerald">check_circle</mat-icon>
                        <span class="font-bold text-sm">Confirm Arrival</span>
                      </button>
                      <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                      <button mat-menu-item class="text-google-red">
                        <mat-icon class="text-google-red">cancel</mat-icon>
                        <span class="font-bold text-sm">Cancel Booking</span>
                      </button>
                    </mat-menu>
                  </td>
                </tr>
              }
            </tbody>
          </table>
          
          @if (appointments().length === 0 && !loading()) {
            <div class="py-24 text-center">
              <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <mat-icon class="text-google-gray-400 text-3xl">event_busy</mat-icon>
              </div>
              <h3 class="font-bold text-google-gray-900 dark:text-white">No Appointments</h3>
              <p class="text-sm text-google-gray-500 max-w-xs mx-auto mt-2">No clinical sessions found for the selected period.</p>
            </div>
          }
        </div>

        <div class="px-6 py-4 mt-6 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">{{ appointments().length }} Appointment(s) logged</span>
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
export class AppointmentManagementComponent implements OnInit {
  private appointmentService = inject(APPOINTMENTSMANAGEMENTService);

  appointments = signal<any[]>([]);
  stats = signal<any>(null);
  loading = signal(false);

  summary = computed(() => {
    const s = this.stats();
    return [
      { label: 'Total Today',  value: String(s?.totalAppointments || 0) },
      { label: 'Confirmed',    value: String(s?.confirmedAppointments || 0) },
      { label: 'Pending',      value: String(s?.pendingAppointments || 0) },
      { label: 'Cancelled',    value: String(s?.cancelledAppointments || 0) },
    ];
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    // Load list
    this.appointmentService.getAdminAppointments().subscribe({
      next: (res) => {
        const data = res?.data?.content || res?.data || [];
        this.appointments.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });

    // Load stats
    this.appointmentService.getAdminAppointmentsStats().subscribe({
      next: (res) => {
        this.stats.set(res?.data);
      }
    });
  }

  applyFilter(event: Event) {
    // filter logic can be added here
  }

  getStatusVariant(status: string): any {
    const m: Record<string, string> = {
      CONFIRMED: 'success',
      PENDING:   'warning',
      CANCELLED: 'danger',
      COMPLETED: 'info',
      WAITING: 'warning'
    };
    return m[status?.toUpperCase()] ?? 'neutral';
  }
}

