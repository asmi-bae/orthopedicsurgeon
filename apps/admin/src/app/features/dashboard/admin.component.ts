import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  template: `
    <div class="space-y-8 animate-fade-in pb-12">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center border border-primary-200 dark:border-primary-800">
            <mat-icon class="text-primary-600 dark:text-primary-400">analytics</mat-icon>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">{{ 'DASHBOARD.TITLE' | translate }}</h1>
            <p class="text-white/40 text-xs">{{ 'DASHBOARD.SUBTITLE' | translate }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
           <button mat-stroked-button color="primary">
             <mat-icon class="mr-2">download</mat-icon> Export Matrix
           </button>
           <button mat-flat-button color="primary">
             Initialize Sync
           </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (stat of stats; track stat.labelKey; let i = $index) {
          <mat-card class="border rounded-xl p-6 relative overflow-hidden animate-slide-up"
                    [style.animation-delay]="i * 100 + 'ms'">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                <mat-icon>{{ stat.icon }}</mat-icon>
              </div>
              <span [class]="stat.trendClass" class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 border border-white/5">
                {{ stat.trend }}
              </span>
            </div>
            <h3 class="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">{{ stat.labelKey | translate }}</h3>
            <p class="text-2xl font-bold text-white tracking-tight mb-2">{{ stat.value }}</p>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                 <div class="h-full bg-primary-500/60 rounded-full" [style.width]="'70%'"></div>
              </div>
              <span class="text-[8px] text-white/20 uppercase font-bold">{{ stat.description }}</span>
            </div>
          </mat-card>
        }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Live Feed Table -->
        <mat-card class="lg:col-span-2 border rounded-xl overflow-hidden animate-slide-up [animation-delay:400ms]">
           <div class="px-6 py-4 border-b flex items-center justify-between bg-white/5">
              <div class="flex items-center gap-3">
                <mat-icon class="text-primary-400 scale-90">sensors</mat-icon>
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-white uppercase tracking-wider">{{ 'DASHBOARD.LIVE_FEED.TITLE' | translate }}</span>
                </div>
              </div>
              <span class="text-[9px] font-bold uppercase tracking-widest text-primary-500 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                Secure Link
              </span>
           </div>
           
           <div class="overflow-x-auto">
             <table mat-table [dataSource]="liveAppointments" class="w-full">
                <ng-container matColumnDef="patient">
                  <th mat-header-cell *matHeaderCellDef class="px-6">{{ 'DASHBOARD.LIVE_FEED.COLUMNS.PATIENT' | translate }}</th>
                  <td mat-cell *matCellDef="let row" class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center text-[10px] font-bold text-white border border-white/5">{{row.patient[0]}}</div>
                      <span class="text-sm text-white font-medium">{{row.patient}}</span>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="doctor">
                  <th mat-header-cell *matHeaderCellDef>{{ 'DASHBOARD.LIVE_FEED.COLUMNS.DOCTOR' | translate }}</th>
                  <td mat-cell *matCellDef="let row" class="py-4">
                    <span class="text-xs text-white/60">{{row.doctor}}</span>
                  </td>
                </ng-container>

                <ng-container matColumnDef="time">
                  <th mat-header-cell *matHeaderCellDef>{{ 'DASHBOARD.LIVE_FEED.COLUMNS.TIME' | translate }}</th>
                  <td mat-cell *matCellDef="let row" class="py-4">
                    <span class="text-xs font-bold text-primary-400">{{row.time}}</span>
                  </td>
                </ng-container>

                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef class="px-6 text-right">{{ 'DASHBOARD.LIVE_FEED.COLUMNS.STATUS' | translate }}</th>
                  <td mat-cell *matCellDef="let row" class="px-6 py-4 text-right">
                    <span [class]="row.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-primary-500/10 text-primary-400 border-primary-500/20'"
                          class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border">
                      {{row.status}}
                    </span>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-white/5"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-white/[0.02] transition-colors"></tr>
             </table>
           </div>
        </mat-card>

        <!-- Logistics Card -->
        <mat-card class="border rounded-xl p-8 animate-slide-up [animation-delay:600ms]">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-3">
                <mat-icon class="text-blue-400">apartment</mat-icon>
                <h3 class="text-xs font-bold text-white uppercase tracking-wider">{{ 'DASHBOARD.LOGISTICS.TITLE' | translate }}</h3>
              </div>
            </div>

           <div class="space-y-6">
              @for (h of topHospitals; track h.name) {
                <div class="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer">
                   <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/20">
                         <mat-icon class="scale-90">corporate_fare</mat-icon>
                      </div>
                      <div>
                         <p class="text-xs font-bold text-white leading-tight mb-0.5">{{ h.name }}</p>
                         <p class="text-[9px] text-white/20 uppercase tracking-widest font-bold">{{ h.city }}</p>
                      </div>
                   </div>
                   <div class="text-right">
                      <p class="text-xs font-bold text-white">{{ h.revenue }}</p>
                      <p class="text-[8px] text-green-500 font-bold uppercase tracking-widest">{{ h.growth }}</p>
                   </div>
                </div>
              }
           </div>

           <button mat-stroked-button class="w-full mt-8 font-bold uppercase tracking-widest text-[9px]">
             {{ 'DASHBOARD.LOGISTICS.REPORT_BUTTON' | translate }}
           </button>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    ::ng-deep .mat-mdc-table { background: transparent !important; }
  `]
})
export class AdminComponent {
  auth = inject(AuthService);

  displayedColumns: string[] = ['patient', 'doctor', 'time', 'status'];
  
  stats = [
    { labelKey: 'DASHBOARD.STATS.REVENUE', value: '$45,280', description: 'Net earnings', icon: 'payments', trend: '+12%', trendClass: 'text-green-500' },
    { labelKey: 'DASHBOARD.STATS.SPECIALISTS', value: '124', description: 'Certified staff', icon: 'medical_services', trend: 'Stable', trendClass: 'text-blue-500' },
    { labelKey: 'DASHBOARD.STATS.PATIENTS', value: '1,450', description: 'New registrations', icon: 'person_add', trend: '+45', trendClass: 'text-purple-500' },
    { labelKey: 'DASHBOARD.STATS.SECURITY', value: 'Active', description: 'System online', icon: 'shield', trend: 'LOCKED', trendClass: 'text-amber-500' },
  ];

  liveAppointments = [
    { patient: 'John Doe', doctor: 'Dr. Sarah Johnson', time: '10:30 AM', status: 'CONFIRMED' },
    { patient: 'Jane Smith', doctor: 'Dr. Mike Ross', time: '11:00 AM', status: 'WAITING' },
    { patient: 'Robert Brown', doctor: 'Dr. David King', time: '11:15 AM', status: 'CONFIRMED' },
    { patient: 'Emily Davis', doctor: 'Dr. Sarah Johnson', time: '11:45 AM', status: 'WAITING' },
  ];

  topHospitals = [
    { name: 'City Orthopedic', city: 'Dhaka', revenue: '$12,450', growth: '+15%' },
    { name: 'Bone Health Center', city: 'Chittagong', revenue: '$8,200', growth: '+8%' },
    { name: 'Metro General', city: 'Sylhet', revenue: '$5,900', growth: '+12%' },
    { name: 'Nightingale Clinic', city: 'Rajshahi', revenue: '$3,100', growth: '+5%' }
  ];
}
