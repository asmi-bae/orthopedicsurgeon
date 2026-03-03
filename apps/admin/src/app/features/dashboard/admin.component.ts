import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  template: `
    <div class="space-y-12 animate-fade-in pb-24 px-2">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center border border-primary-500/30 shadow-2xl shadow-primary-500/10">
            <mat-icon class="text-primary-400 scale-[1.5]">analytics</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Operational Nexus</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">{{ auth.currentUser()?.roles?.[0] }} AUTH_SECURED_ENDPOINT</p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
           <button mat-stroked-button class="border-white/10 text-white/60 hover:text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-[10px] bg-white/[0.02] hover:bg-white/[0.05] transition-all">
             <mat-icon class="mr-3 text-primary-400">download</mat-icon> Matrix Export
           </button>
           <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all">
             Initialize Sync
           </button>
        </div>
      </div>

      <!-- Admin Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <mat-card *ngFor="let stat of stats; let i = index" 
                  class="bg-white/[0.02] border border-white/5 rounded-3xl p-8 glass-hover group relative overflow-hidden animate-slide-up"
                  [style.animation-delay]="i * 100 + 'ms'">
          <div class="absolute -top-12 -right-12 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-all"></div>
          
          <div class="flex items-center justify-between relative z-10 mb-8">
            <div class="w-14 h-14 rounded-2xl bg-secondary-800 flex items-center justify-center text-primary-400 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 shadow-inner border border-white/5">
              <mat-icon class="scale-110">{{ stat.icon }}</mat-icon>
            </div>
            <div [class]="stat.trendClass" class="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
              {{ stat.trend }}
            </div>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] mb-2">{{ stat.label }}</h3>
            <p class="text-4xl font-black text-white tracking-tighter italic leading-none mb-3 truncate">{{ stat.value }}</p>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-primary-500/40 rounded-full group-hover:bg-primary-500 transition-all duration-1000" [style.width]="'75%'"></div>
              </div>
              <span class="text-[8px] font-bold text-white/10 uppercase tracking-widest leading-none">{{ stat.description }}</span>
            </div>
          </div>
        </mat-card>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <!-- Live Appointments Matrix -->
        <mat-card class="xl:col-span-2 bg-white/[0.01] border border-white/5 rounded-3xl glass overflow-hidden animate-slide-up [animation-delay:400ms]">
           <div class="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
                  <mat-icon class="scale-90">sensors</mat-icon>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-black text-white uppercase tracking-[0.3em]">Operational Feed</span>
                  <span class="text-[9px] font-bold text-white/20 uppercase tracking-[0.1em]">Real-time synchronization active</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-ping"></span>
                <span class="text-[8px] font-black uppercase tracking-widest text-primary-400">Secure Link</span>
              </div>
           </div>
           
           <div class="overflow-x-auto p-2">
             <table mat-table [dataSource]="liveAppointments" class="w-full bg-transparent">
                <ng-container matColumnDef="patient">
                  <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-8">Operational Subject</th>
                  <td mat-cell *matCellDef="let row" class="py-8 px-8 border-b border-white/[0.03]">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 rounded-2xl bg-secondary-800 border border-white/5 flex items-center justify-center text-xs font-black text-white uppercase shadow-inner">{{row.patient[0]}}</div>
                      <div class="flex flex-col">
                        <span class="text-sm font-black text-white tracking-tight uppercase italic">{{row.patient}}</span>
                        <span class="text-[8px] font-bold text-white/20 uppercase tracking-[0.1em]">Patient ID: #{{row.patient.substring(0,3).toUpperCase()}}01</span>
                      </div>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="doctor">
                  <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Medical Consultant</th>
                  <td mat-cell *matCellDef="let row" class="py-8 border-b border-white/[0.03]">
                    <div class="flex items-center gap-3">
                      <mat-icon class="text-primary-500/50 scale-75">medical_services</mat-icon>
                      <span class="text-xs font-bold text-white/60 uppercase tracking-tight">{{row.doctor}}</span>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="time">
                  <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Temporal Node</th>
                  <td mat-cell *matCellDef="let row" class="py-8 border-b border-white/[0.03]">
                    <div class="flex flex-col">
                      <span class="text-[10px] font-black text-primary-400 uppercase tracking-[0.05em]">{{row.time}}</span>
                      <span class="text-[7px] font-bold text-white/10 uppercase tracking-widest">Scheduled Slot</span>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-8 text-right">Vector Status</th>
                  <td mat-cell *matCellDef="let row" class="py-8 px-8 border-b border-white/[0.03] text-right">
                    <span [class]="row.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-primary-500/10 text-primary-400 border-primary-500/20'"
                          class="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.25em] border backdrop-blur-sm">
                      {{row.status}}
                    </span>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-white/[0.02]"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-white/[0.02] transition-all cursor-pointer group"></tr>
             </table>
           </div>
        </mat-card>

        <!-- Facility Logistics -->
        <mat-card class="bg-white/[0.01] border border-white/5 rounded-3xl glass p-10 flex flex-col h-full animate-slide-up [animation-delay:600ms]">
            <div class="flex items-center justify-between mb-12">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <mat-icon class="scale-90">apartment</mat-icon>
                </div>
                <h3 class="text-xs font-black text-white uppercase tracking-[0.3em]">Sector Logistics</h3>
              </div>
              <button mat-icon-button class="text-white/20 hover:text-primary-400 transition-colors">
                <mat-icon class="scale-75">more_vert</mat-icon>
              </button>
            </div>

           <div class="space-y-10 flex-1">
              <div *ngFor="let h of topHospitals" class="flex items-center justify-between group cursor-pointer p-4 rounded-2xl hover:bg-white/[0.02] transition-all border border-transparent hover:border-white/5">
                 <div class="flex items-center gap-5">
                    <div class="w-12 h-12 rounded-2xl bg-secondary-800 border border-white/5 flex items-center justify-center text-white/20 group-hover:text-primary-400 group-hover:border-primary-400/30 group-hover:shadow-[0_0_15px_rgba(29,161,255,0.1)] transition-all">
                       <mat-icon class="scale-90">corporate_fare</mat-icon>
                    </div>
                    <div>
                       <p class="text-[11px] font-black text-white uppercase tracking-tight mb-1 group-hover:text-primary-400 transition-colors italic">{{ h.name }}</p>
                       <div class="flex items-center gap-2">
                         <span class="w-1 h-1 rounded-full bg-primary-500"></span>
                         <p class="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">{{ h.city }} Grid</p>
                       </div>
                    </div>
                 </div>
                 <div class="text-right">
                    <p class="text-xs font-black text-white tracking-[0.1em] italic">{{ h.revenue }}</p>
                    <div class="flex items-center justify-end gap-1.5 mt-1.5">
                      <mat-icon class="text-[10px] text-green-500 scale-50 m-0 p-0 h-auto w-auto">north_east</mat-icon>
                      <p class="text-[8px] text-green-500 font-bold uppercase tracking-widest leading-none">{{ h.growth }}</p>
                    </div>
                 </div>
              </div>
           </div>

           <button mat-stroked-button class="w-full mt-12 h-14 border-white/5 bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.05] rounded-2xl font-black uppercase tracking-[0.3em] text-[8px] transition-all">
             Generate Core Logistics Report
           </button>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .glass { backdrop-filter: blur(20px); }
    .status-chip { border-radius: 8px !important; min-height: 24px !important; font-size: 9px !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; }
    ::ng-deep .confirmed-chip { background: #10b981 !important; color: white !important; }
    ::ng-deep .waiting-chip { background: #3b82f6 !important; color: white !important; }
    ::ng-deep .mat-mdc-table { background: transparent !important; }
    ::ng-deep .mat-mdc-paginator { background: transparent !important; }
  `]
})
export class AdminComponent {
  auth = inject(AuthService);

  displayedColumns: string[] = ['patient', 'doctor', 'time', 'status'];
  
  stats = [
    { label: 'Fiscal Revenue', value: '$45,280', description: 'Net earnings from operations', icon: 'payments', trend: '+12%', trendClass: 'text-green-500' },
    { label: 'Active Specialists', value: '124', description: 'Certified surgeons and staff', icon: 'medical_services', trend: 'Stable', trendClass: 'text-blue-500' },
    { label: 'Patient Inflow', value: '1,450', description: 'New clinical registrations', icon: 'person_add', trend: '+45', trendClass: 'text-purple-500' },
    { label: 'Matrix Security', value: 'Operational', description: 'All systems encrypted', icon: 'shield', trend: 'LOCKED', trendClass: 'text-amber-500' },
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
