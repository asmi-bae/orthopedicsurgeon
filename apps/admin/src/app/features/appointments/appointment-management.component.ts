import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-appointment-management',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatTooltipModule
  ],
  template: `
    <div class="space-y-10 animate-fade-in pb-24 px-2">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center border border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
            <mat-icon class="text-emerald-400 scale-[1.5]">event_available</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Timeline Synchronization</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Oversee system-wide scheduling and doctor availability matrix</p>
            </div>
          </div>
        </div>
        <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
           Initialize New Session
        </button>
      </div>

      <mat-card class="bg-white/[0.01] border border-white/5 rounded-[40px] glass overflow-hidden animate-slide-up shadow-2xl">
        <div class="overflow-x-auto p-4">
          <table mat-table [dataSource]="appointments()" class="w-full bg-transparent">
             <ng-container matColumnDef="patient">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10">Subject Node</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-5">
                    <div class="w-12 h-12 rounded-xl bg-secondary-900 flex items-center justify-center border border-white/5 group-hover:border-primary-500/30 transition-all font-black text-white/40 text-sm shadow-inner">
                      {{row.patient.charAt(0)}}
                    </div>
                    <div class="flex flex-col">
                      <span class="text-base font-black text-white tracking-tight uppercase italic group-hover:text-primary-400 transition-colors">{{row.patient}}</span>
                      <span class="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 italic leading-none">Status: Nominal</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="doctor">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Medical Authority</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                       <mat-icon class="text-primary-400 scale-75">medical_services</mat-icon>
                    </div>
                    <span class="text-sm font-black text-white uppercase italic tracking-tighter">{{row.doctor}}</span>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="timestamp">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Temporal Coordinate</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <div class="flex flex-col">
                    <span class="text-xs font-black text-white italic tracking-tighter uppercase">{{row.date}}</span>
                    <span class="text-[9px] font-black text-primary-400 mt-1.5 bg-primary-500/10 px-3 py-1 rounded-lg border border-primary-500/20 w-fit tracking-widest">{{row.time}}</span>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Sync Status</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                   <span [class]="row.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'" 
                         class="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border backdrop-blur-sm">
                    {{row.status === 'CONFIRMED' ? 'SYNCED' : 'AWAITING_SYNC'}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10 text-right">Orchestration</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03] text-right">
                   <div class="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                      <button mat-icon-button matTooltip="Modify Session" class="w-10 h-10 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">edit_calendar</mat-icon>
                      </button>
                      <button mat-icon-button matTooltip="Terminate Session" class="w-10 h-10 bg-white/5 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">cancel_schedule_send</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="columns" class="bg-white/[0.02]"></tr>
             <tr mat-row *matRowDef="let row; columns: columns;" class="group hover:bg-white/[0.02] transition-all cursor-pointer border-white/5"></tr>
          </table>
          
          <div *ngIf="appointments().length === 0" class="py-48 text-center bg-white/[0.01]">
             <mat-icon class="text-white/5 scale-[5] mb-14 animate-pulse">event_busy</mat-icon>
             <p class="text-white/20 font-black uppercase tracking-[0.6em] text-[10px]">No active sessions in timeline</p>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .glass { backdrop-filter: blur(40px); }
    ::ng-deep .mat-mdc-table { background: transparent !important; }
  `]
})
export class AppointmentManagementComponent {
  appointments = signal([
    { patient: 'John Doe', doctor: 'Dr. Sarah', date: '2024-10-24', time: '10:00 AM', status: 'CONFIRMED' },
    { patient: 'Jane Smith', doctor: 'Dr. Mike', date: '2024-10-24', time: '11:00 AM', status: 'PENDING' },
    { patient: 'Robert Wilson', doctor: 'Dr. Sarah', date: '2024-10-25', time: '02:30 PM', status: 'CONFIRMED' },
    { patient: 'Sarah Parker', doctor: 'Dr. Mike', date: '2024-10-25', time: '09:15 AM', status: 'CONFIRMED' }
  ]);
  
  columns = ['patient', 'doctor', 'timestamp', 'status', 'actions'];
}
