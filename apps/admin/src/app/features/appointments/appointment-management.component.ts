import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
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
    TranslateModule,
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatTooltipModule
  ],
  template: `
    <div class="space-y-6 animate-fade-in pb-12">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            <mat-icon class="text-emerald-600 dark:text-emerald-400">event_available</mat-icon>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">{{ 'APPOINTMENTS.TITLE' | translate }}</h1>
            <p class="text-white/40 text-xs">{{ 'APPOINTMENTS.SUBTITLE' | translate }}</p>
          </div>
        </div>
        <button mat-flat-button color="primary" class="h-12 px-6 font-bold uppercase tracking-tight">
           {{ 'APPOINTMENTS.NEW_SESSION' | translate }}
        </button>
      </div>

      <mat-card class="border rounded-xl overflow-hidden animate-slide-up shadow-lg">
        <div class="overflow-x-auto">
          <table mat-table [dataSource]="appointments()" class="w-full">
             <!-- Patient Column -->
             <ng-container matColumnDef="patient">
                <th mat-header-cell *matHeaderCellDef class="px-6">{{ 'APPOINTMENTS.COLUMNS.PATIENT' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center border border-white/5 font-bold text-white/40 text-sm">
                      {{row.patient.charAt(0)}}
                    </div>
                    <div class="flex flex-col">
                      <span class="text-sm font-bold text-white uppercase">{{row.patient}}</span>
                      <span class="text-[10px] text-white/20 uppercase tracking-wider">Status: Nominal</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <!-- Doctor Column -->
             <ng-container matColumnDef="doctor">
                <th mat-header-cell *matHeaderCellDef>{{ 'APPOINTMENTS.COLUMNS.DOCTOR' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-primary-400 scale-75">medical_services</mat-icon>
                    <span class="text-sm text-white/60 font-medium">{{row.doctor}}</span>
                  </div>
                </td>
             </ng-container>

             <!-- Time Column -->
             <ng-container matColumnDef="timestamp">
                <th mat-header-cell *matHeaderCellDef>{{ 'APPOINTMENTS.COLUMNS.TIMESTAMP' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-white">{{row.date}}</span>
                    <span class="text-[10px] text-primary-400 font-bold">{{row.time}}</span>
                  </div>
                </td>
             </ng-container>

             <!-- Status Column -->
             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>{{ 'APPOINTMENTS.COLUMNS.STATUS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                   <span [class]="row.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'" 
                         class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border">
                    {{row.status}}
                  </span>
                </td>
             </ng-container>

             <!-- Actions Column -->
             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="px-6 text-right">{{ 'APPOINTMENTS.COLUMNS.ACTIONS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4 text-right">
                   <div class="flex justify-end gap-1">
                      <button mat-icon-button [matTooltip]="'Edit'" class="text-white/40 hover:text-primary-400 transition-all">
                        <mat-icon class="scale-90">edit_calendar</mat-icon>
                      </button>
                      <button mat-icon-button [matTooltip]="'Cancel'" class="text-white/40 hover:text-red-500 transition-all">
                        <mat-icon class="scale-90">cancel</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="columns" class="bg-white/5"></tr>
             <tr mat-row *matRowDef="let row; columns: columns;" class="hover:bg-white/[0.02] transition-colors cursor-pointer"></tr>
          </table>
          
          @if (appointments().length === 0) {
            <div class="py-24 text-center">
               <mat-icon class="text-white/5 scale-[3] mb-8">event_busy</mat-icon>
               <p class="text-white/20 font-bold uppercase tracking-widest text-xs">No active sessions</p>
            </div>
          }
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    :host { display: block; }
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
