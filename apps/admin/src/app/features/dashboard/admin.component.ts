import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdBadgeComponent 
} from '@repo/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@repo/auth';

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
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Real-time health platform monitoring and analytics.</p>
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
        @for (stat of stats; track stat.label) {
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
              <p class="text-sm font-medium text-google-gray-500 dark:text-google-gray-400">{{ stat.label }}</p>
              <h3 class="text-3xl font-bold text-google-gray-900 dark:text-white mt-1">{{ stat.value }}</h3>
              <div class="flex items-center gap-1.5 mt-2">
                <div class="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse"></div>
                <p class="text-xs text-google-gray-400 leading-none">{{ stat.description }}</p>
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
            <zrd-button variant="ghost" size="sm">Manage All</zrd-button>
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
                @for (row of liveAppointments; track row.patient) {
                  <tr class="hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-google-blue/10 flex items-center justify-center text-sm font-bold text-google-blue">
                          {{ row.patient[0] }}
                        </div>
                        <span class="font-bold text-google-gray-900 dark:text-white text-sm">{{ row.patient }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-google-gray-600 dark:text-google-gray-400 font-medium">{{ row.doctor }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="text-sm text-google-gray-900 dark:text-white font-bold">{{ row.time }}</span>
                        <span class="text-[10px] text-google-gray-400 uppercase font-bold tracking-widest">Today</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <zrd-badge [variant]="row.status === 'CONFIRMED' ? 'success' : 'warning'">
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
            @for (h of topHospitals; track h.name; let i = $index) {
              <div class="flex items-center gap-4 p-4 hover:bg-google-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all cursor-pointer group">
                <div class="w-9 h-9 rounded-xl bg-google-gray-100 dark:bg-white/10 flex items-center justify-center text-sm font-black text-google-gray-400 group-hover:bg-google-blue group-hover:text-white transition-all shrink-0">
                  {{ i + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-sm text-google-gray-900 dark:text-white truncate m-0">{{ h.name }}</p>
                  <p class="text-xs text-google-gray-500 m-0">{{ h.city }}</p>
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
        @for (q of quickStats; track q.label) {
          <zrd-card variant="default" class="text-center transition-colors">
            <div class="w-10 h-10 mx-auto rounded-full bg-google-gray-100 dark:bg-white/10 flex items-center justify-center mb-3 text-google-gray-400">
               <mat-icon>{{ q.icon }}</mat-icon>
            </div>
            <p class="text-2xl font-black text-google-gray-900 dark:text-white m-0 tracking-tight">{{ q.value }}</p>
            <p class="text-xs font-bold text-google-gray-500 m-0 mt-1 uppercase tracking-widest">{{ q.label }}</p>
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

  displayedColumns = ['patient', 'doctor', 'time', 'status'];

  stats: { label: string; value: string; description: string; icon: string; iconBg: string; iconColor: string; trend: string; trendVariant: BadgeVariant }[] = [
    {
      label: 'Total Revenue', value: '$45,280', description: 'Net earnings this month',
      icon: 'stat_1', iconBg: 'bg-google-blue/10', iconColor: 'text-google-blue',
      trend: '+12%', trendVariant: 'success'
    },
    {
      label: 'Medical Staff', value: '124', description: 'Certified specialists',
      icon: 'medical_services', iconBg: 'bg-google-indigo/10', iconColor: 'text-google-indigo',
      trend: 'Stable', trendVariant: 'neutral'
    },
    {
      label: 'New Patients', value: '1,450', description: 'Registered this month',
      icon: 'person_add', iconBg: 'bg-google-emerald/10', iconColor: 'text-google-emerald',
      trend: '+45', trendVariant: 'success'
    },
    {
      label: 'System Status', value: 'Active', description: 'All systems operational',
      icon: 'shield', iconBg: 'bg-google-green/10', iconColor: 'text-google-green',
      trend: 'Secure', trendVariant: 'success'
    },
  ];

  liveAppointments = [
    { patient: 'John Doe',       doctor: 'Dr. Sarah Johnson', time: '10:30 AM', status: 'CONFIRMED' },
    { patient: 'Jane Smith',     doctor: 'Dr. Mike Ross',     time: '11:00 AM', status: 'WAITING' },
    { patient: 'Robert Brown',   doctor: 'Dr. David King',    time: '11:15 AM', status: 'CONFIRMED' },
    { patient: 'Emily Davis',    doctor: 'Dr. Sarah Johnson', time: '11:45 AM', status: 'WAITING' },
    { patient: 'Michael Wilson', doctor: 'Dr. Lisa Chen',     time: '12:00 PM', status: 'CONFIRMED' },
  ];

  topHospitals = [
    { name: 'City Orthopedic',    city: 'Dhaka',      revenue: '$12,450', growth: '+15%' },
    { name: 'Bone Health Center', city: 'Chittagong', revenue: '$8,200',  growth: '+8%'  },
    { name: 'Metro General',      city: 'Sylhet',     revenue: '$5,900',  growth: '+12%' },
    { name: 'Nightingale Clinic', city: 'Rajshahi',   revenue: '$3,100',  growth: '+5%'  },
  ];

  quickStats = [
    { label: 'Appointments Today',   value: '48',  icon: 'event_available' },
    { label: 'Pending Prescriptions', value: '12',  icon: 'description' },
    { label: 'Active Hospitals',      value: '8',   icon: 'corporate_fare' },
    { label: 'Open Invoices',         value: '$3.2k', icon: 'receipt_long' },
  ];
}
