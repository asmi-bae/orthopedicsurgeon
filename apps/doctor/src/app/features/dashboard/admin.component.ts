import { ZrdCardComponent, ZrdButtonComponent, ZrdBadgeComponent } from '@ui/components';
import { Component, inject, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@repo/auth';
import { ADMINDASHBOARDService } from '../../core/services/api/admindashboard.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'neutral';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ZrdCardComponent,
    ZrdButtonComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [CurrencyPipe],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p class="text-google-gray-600 dark:text-google-gray-400 mt-1">Real-time health platform monitoring and analytics.</p>
        </div>
        <div class="flex items-center gap-3">
          <zrd-button variant="outline" size="md">
            <mat-icon leftIcon class="text-[20px]">file_download</mat-icon>
            Analytics Report
          </zrd-button>
          <zrd-button variant="primary" size="md">
            <mat-icon leftIcon class="text-[20px]">add_circle</mat-icon>
            New Entry
          </zrd-button>
        </div>
      </div>

      <!-- Google Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        @for (stat of stats(); track stat.label) {
          <zrd-card variant="elevated">
            <div class="flex items-start justify-between">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors"
                   [class]="stat.iconBg">
                <mat-icon class="text-[26px]" [class]="stat.iconColor">{{ stat.icon }}</mat-icon>
              </div>
              <zrd-badge [variant]="stat.trendVariant">
                {{ stat.trend }}
              </zrd-badge>
            </div>
            <div class="mt-5">
              <p class="text-sm font-medium text-google-gray-600 dark:text-google-gray-400">{{ stat.label }}</p>
              <h3 class="text-3xl font-bold text-google-gray-900 dark:text-white mt-1">{{ stat.value }}</h3>
              <div class="flex items-center gap-1.5 mt-2">
                <div class="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse"></div>
                <p class="text-xs text-google-gray-500 leading-none">{{ stat.description }}</p>
              </div>
            </div>
          </zrd-card>
        }
      </div>

      <!-- Content Area -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <!-- Spartan Live Monitor Table -->
        <zrd-card variant="default" [hasHeader]="true" class="xl:col-span-2">
          <div header class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-google-blue/10 rounded-lg">
                <mat-icon class="text-google-blue">sensors</mat-icon>
              </div>
              <h2 class="text-lg font-bold text-google-gray-900 dark:text-white">Live Appointments</h2>
            </div>
            <zrd-button variant="ghost" size="sm" routerLink="/appointments">Manage All</zrd-button>
          </div>

          <div class="overflow-x-auto -mx-6">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-google-gray-100 dark:border-white/5 bg-google-gray-50/50 dark:bg-white/5">
                  <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-wider">Patient Info</th>
                  <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-wider">Specialist</th>
                  <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-wider">Scheduled</th>
                  <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-google-gray-100 dark:divide-white/5">
                @for (row of liveAppointments(); track row.id) {
                  <tr class="hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-google-blue/10 flex items-center justify-center text-sm font-bold text-google-blue">
                          {{ row.patientName[0] }}
                        </div>
                        <span class="font-bold text-google-gray-900 dark:text-white text-sm">{{ row.patientName }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-google-gray-600 dark:text-google-gray-400 font-medium">{{ row.doctorName }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="text-sm text-google-gray-900 dark:text-white font-bold">{{ row.time }}</span>
                        <span class="text-[10px] text-google-gray-400 uppercase font-bold tracking-widest">Scheduled</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <zrd-badge [variant]="getStatusVariant(row.status)">
                         {{ row.status }}
                      </zrd-badge>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </zrd-card>

        <!-- Top Facilities -->
        <zrd-card variant="default" [hasHeader]="true">
          <div header class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-google-gray-900 dark:text-white">Regional Performance</h2>
            <mat-icon class="text-google-gray-400">more_vert</mat-icon>
          </div>

          <div class="space-y-1">
            @for (h of topHospitals(); track h.id; let i = $index) {
              <div class="flex items-center gap-4 p-4 hover:bg-google-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all cursor-pointer group">
                <div class="w-9 h-9 rounded-xl bg-google-gray-100 dark:bg-white/10 flex items-center justify-center text-sm font-black text-google-gray-400 group-hover:bg-google-blue group-hover:text-white transition-all shrink-0">
                  {{ i + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-sm text-google-gray-900 dark:text-white truncate m-0">{{ h.name }}</p>
                  <p class="text-xs text-google-gray-600 m-0">{{ h.city }}</p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-sm font-black text-google-gray-900 dark:text-white m-0">{{ h.revenue }}</p>
                  <div class="flex items-center justify-end gap-1">
                    <mat-icon class="text-[14px] text-google-green">trending_up</mat-icon>
                    <p class="text-[10px] text-google-green font-black m-0">{{ h.growth }}</p>
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="mt-6">
            <zrd-button variant="outline" class="w-full">Download Data</zrd-button>
          </div>
        </zrd-card>
      </div>

      <!-- Bottom Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        @for (q of quickStats(); track q.label) {
          <zrd-card variant="default" class="text-center transition-colors">
            <div class="w-10 h-10 mx-auto rounded-full bg-google-gray-100 dark:bg-white/10 flex items-center justify-center mb-3 text-google-gray-400">
               <mat-icon>{{ q.icon }}</mat-icon>
            </div>
            <p class="text-2xl font-black text-google-gray-900 dark:text-white m-0 tracking-tight">{{ q.value }}</p>
            <p class="text-xs font-bold text-google-gray-600 m-0 mt-1 uppercase tracking-widest">{{ q.label }}</p>
          </zrd-card>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AdminComponent {
  auth = inject(AuthService);
  dashboardService = inject(ADMINDASHBOARDService);
  currencyPipe = inject(CurrencyPipe);

  // Use toSignal to handle API data reactively
  dashboardData = toSignal(
    this.dashboardService.getAdminDashboard().pipe(
      map(res => res?.data)
    )
  );

  stats = computed(() => {
    const d = this.dashboardData();
    const s = d?.stats;
    return [
      {
        label: 'Total Revenue', 
        value: this.currencyPipe.transform(s?.totalRevenue || 0, 'USD', 'symbol', '1.0-0') || '$0',
        description: 'Net earnings this month',
        icon: 'payments', iconBg: 'bg-google-blue/10', iconColor: 'text-google-blue',
        trend: s?.revenueTrend || '0%', trendVariant: (s?.revenueTrend?.startsWith('-') ? 'danger' : 'success') as BadgeVariant
      },
      {
        label: 'Medical Staff', 
        value: (s?.medicalStaffCount || 0).toLocaleString(),
        description: 'Certified specialists',
        icon: 'medical_services', iconBg: 'bg-google-indigo/10', iconColor: 'text-google-indigo',
        trend: s?.staffTrend || 'Stable', trendVariant: 'neutral' as BadgeVariant
      },
      {
        label: 'New Patients', 
        value: (s?.newPatientsCount || 0).toLocaleString(),
        description: 'Registered this month',
        icon: 'person_add', iconBg: 'bg-google-emerald/10', iconColor: 'text-google-emerald',
        trend: s?.patientTrend || '+0', trendVariant: 'success' as BadgeVariant
      },
      {
        label: 'System Status', 
        value: s?.systemStatus || 'Active',
        description: 'All systems operational',
        icon: 'shield', iconBg: 'bg-google-green/10', iconColor: 'text-google-green',
        trend: 'Secure', trendVariant: 'success' as BadgeVariant
      },
    ];
  });

  liveAppointments = computed(() => this.dashboardData()?.liveAppointments || []);
  topHospitals = computed(() => this.dashboardData()?.topHospitals || []);
  
  quickStats = computed(() => {
    const q = this.dashboardData()?.quickStats;
    return [
      { label: 'Appointments Today',   value: String(q?.appointmentsToday || 0),  icon: 'event_available' },
      { label: 'Pending Prescriptions', value: String(q?.pendingPrescriptions || 0),  icon: 'description' },
      { label: 'Active Hospitals',      value: String(q?.activeHospitals || 0),   icon: 'corporate_fare' },
      { label: 'Open Invoices',         value: q?.openInvoicesAmount || '$0', icon: 'receipt_long' },
    ];
  });

  getStatusVariant(status: string): BadgeVariant {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED': return 'success';
      case 'WAITING': return 'warning';
      case 'CANCELLED': return 'danger';
      default: return 'info';
    }
  }
}

