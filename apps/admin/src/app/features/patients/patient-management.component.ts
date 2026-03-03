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
  selector: 'app-patient-management',
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
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-800">
            <mat-icon class="text-blue-600 dark:text-blue-400">personal_injury</mat-icon>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">{{ 'PATIENTS.TITLE' | translate }}</h1>
            <p class="text-white/40 text-xs">{{ 'PATIENTS.SUBTITLE' | translate }}</p>
          </div>
        </div>
        <button mat-flat-button color="primary" class="h-12 px-6 font-bold uppercase tracking-tight">
           {{ 'PATIENTS.REGISTER_BUTTON' | translate }}
        </button>
      </div>

      <mat-card class="border rounded-xl overflow-hidden animate-slide-up shadow-lg">
        <div class="overflow-x-auto">
          <table mat-table [dataSource]="patients()" class="w-full">
             <!-- Name Column -->
             <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef class="px-6">{{ 'PATIENTS.COLUMNS.NAME' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center border border-white/5 font-bold text-primary-400">
                      {{row.name.charAt(0)}}
                    </div>
                    <div class="flex flex-col">
                      <span class="text-sm font-bold text-white">{{row.name}}</span>
                      <span class="text-[10px] text-white/20 uppercase tracking-wider">UID: PT-{{row.age}}{{row.name.length}}X</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <!-- Biometrics Column -->
             <ng-container matColumnDef="biometrics">
                <th mat-header-cell *matHeaderCellDef>{{ 'PATIENTS.COLUMNS.BIOMETRICS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-bold text-white/40 bg-white/5 px-3 py-1 rounded-md border border-white/10 uppercase tracking-widest">{{row.gender}}</span>
                    <span class="text-[10px] font-bold text-primary-400 bg-primary-500/10 px-3 py-1 rounded-md border border-primary-500/20 uppercase tracking-widest">{{row.age}}Y</span>
                  </div>
                </td>
             </ng-container>

             <!-- Last Visit Column -->
             <ng-container matColumnDef="lastVisit">
                <th mat-header-cell *matHeaderCellDef>{{ 'PATIENTS.COLUMNS.LAST_VISIT' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4 text-xs text-white/60">
                  {{row.lastVisit}}
                </td>
             </ng-container>

             <!-- Status Column -->
             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>{{ 'PATIENTS.COLUMNS.STATUS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                   <span [class]="row.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-white/30 border-white/10'" 
                         class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border">
                    {{row.status}}
                  </span>
                </td>
             </ng-container>

             <!-- Actions Column -->
             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="px-6 text-right">{{ 'PATIENTS.COLUMNS.ACTIONS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4 text-right">
                   <div class="flex justify-end gap-1">
                      <button mat-icon-button [matTooltip]="'Records'" class="text-white/40 hover:text-primary-400 transition-all">
                        <mat-icon class="scale-90">history_edu</mat-icon>
                      </button>
                      <button mat-icon-button [matTooltip]="'Edit'" class="text-white/40 hover:text-primary-400 transition-all">
                        <mat-icon class="scale-90">edit</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="columns" class="bg-white/5"></tr>
             <tr mat-row *matRowDef="let row; columns: columns;" class="hover:bg-white/[0.02] transition-colors cursor-pointer"></tr>
          </table>
          
          @if (patients().length === 0) {
            <div class="py-24 text-center">
               <mat-icon class="text-white/5 scale-[3] mb-8">person_off</mat-icon>
               <p class="text-white/20 font-bold uppercase tracking-widest text-xs">No patients found</p>
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
export class PatientManagementComponent {
  patients = signal([
    { name: 'John Doe', age: 45, gender: 'MALE', lastVisit: '2024-10-15', status: 'ACTIVE' },
    { name: 'Jane Smith', age: 32, gender: 'FEMALE', lastVisit: '2024-10-20', status: 'ACTIVE' },
    { name: 'Robert Wilson', age: 58, gender: 'MALE', lastVisit: '2024-10-18', status: 'ACTIVE' },
    { name: 'Sarah Parker', age: 29, gender: 'FEMALE', lastVisit: '2024-10-22', status: 'ACTIVE' }
  ]);
  
  columns = ['name', 'biometrics', 'lastVisit', 'status', 'actions'];
}
