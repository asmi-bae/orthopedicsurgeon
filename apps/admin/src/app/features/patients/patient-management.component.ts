import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
          <div class="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-2xl shadow-blue-500/10">
            <mat-icon class="text-blue-400 scale-[1.5]">personal_injury</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Subject Biometrics</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Comprehensive patient registry and medical protocol history</p>
            </div>
          </div>
        </div>
        <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
           Register New Subject
        </button>
      </div>

      <mat-card class="bg-white/[0.01] border border-white/5 rounded-[40px] glass overflow-hidden animate-slide-up shadow-2xl">
        <div class="overflow-x-auto p-4">
          <table mat-table [dataSource]="patients()" class="w-full bg-transparent">
             <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10">Subject Identity</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-5">
                    <div class="w-14 h-14 rounded-2xl bg-secondary-900 flex items-center justify-center border border-white/5 group-hover:border-primary-500/30 transition-all font-black text-primary-400 text-lg shadow-inner">
                      {{row.name.charAt(0)}}
                    </div>
                    <div class="flex flex-col">
                      <span class="text-lg font-black text-white tracking-tight uppercase italic group-hover:text-primary-400 transition-colors">{{row.name}}</span>
                      <span class="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 italic">UID: PT-{{row.age}}{{row.name.length}}X</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="biometrics">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Biometrics</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-3">
                    <span class="text-[10px] font-black text-white/40 bg-white/5 px-4 py-2 rounded-xl border border-white/10 uppercase tracking-widest italic">{{row.gender}}</span>
                    <span class="text-[10px] font-black text-primary-400 bg-primary-500/10 px-4 py-2 rounded-xl border border-primary-500/20 uppercase tracking-widest italic">{{row.age}}Y</span>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="lastVisit">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Last Op Check</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <div class="flex flex-col">
                    <span class="text-xs font-black text-white italic tracking-tighter truncate uppercase">{{row.lastVisit}}</span>
                    <span class="text-[8px] font-bold text-white/20 uppercase tracking-[0.1em] mt-1">Status Nominal</span>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Registry Status</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                   <span [class]="row.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-white/30 border-white/10'" 
                         class="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border backdrop-blur-sm">
                    {{row.status}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10 text-right">Orchestration</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03] text-right">
                   <div class="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                      <button mat-icon-button matTooltip="Medical Records" class="w-10 h-10 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">history_edu</mat-icon>
                      </button>
                      <button mat-icon-button matTooltip="Modify Subject" class="w-10 h-10 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">edit_square</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="columns" class="bg-white/[0.02]"></tr>
             <tr mat-row *matRowDef="let row; columns: columns;" class="group hover:bg-white/[0.02] transition-all cursor-pointer border-white/5"></tr>
          </table>
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
export class PatientManagementComponent {
  patients = signal([
    { name: 'John Doe', age: 45, gender: 'MALE', lastVisit: '2024-10-15', status: 'ACTIVE' },
    { name: 'Jane Smith', age: 32, gender: 'FEMALE', lastVisit: '2024-10-20', status: 'ACTIVE' },
    { name: 'Robert Wilson', age: 58, gender: 'MALE', lastVisit: '2024-10-18', status: 'ACTIVE' },
    { name: 'Sarah Parker', age: 29, gender: 'FEMALE', lastVisit: '2024-10-22', status: 'ACTIVE' }
  ]);
  
  columns = ['name', 'biometrics', 'lastVisit', 'status', 'actions'];
}
