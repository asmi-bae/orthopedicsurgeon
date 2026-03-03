import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminApiService } from '@core/services/admin-api.service';
import { DoctorSummary } from '@repo/types';

@Component({
  selector: 'app-doctor-management',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-10 animate-fade-in pb-24 px-2">
      <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-2xl shadow-blue-500/10">
            <mat-icon class="text-blue-400 scale-[1.5]">medical_services</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Medical Staff Registry</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Initialize and monitor specialist nodes across the facility matrix</p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <div class="flex items-center bg-white/[0.03] px-6 py-3 rounded-2xl border border-white/5 w-full max-w-sm group focus-within:border-primary-500/50 focus-within:bg-white/[0.05] transition-all">
             <mat-icon class="text-white/20 mr-4 group-focus-within:text-primary-400 transition-colors">search</mat-icon>
             <input type="text" placeholder="Filter specialist index..." (keyup)="applyFilter($event)" class="bg-transparent border-none text-xs outline-none w-full text-white placeholder-white/10 font-bold tracking-wide" />
          </div>
          <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
             Enlist Specialist
          </button>
        </div>
      </div>

      <mat-card class="bg-white/[0.01] border border-white/5 rounded-3xl glass overflow-hidden animate-slide-up">
        <mat-progress-bar *ngIf="loading()" mode="query" color="primary" class="h-1"></mat-progress-bar>
        
        <div class="overflow-x-auto p-2">
          <table mat-table [dataSource]="doctors()" class="w-full bg-transparent">
             <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10">Operational Personnel</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-5">
                    <div class="w-12 h-12 rounded-2xl bg-secondary-900 border border-white/5 flex items-center justify-center text-primary-400 font-black italic shadow-inner relative group-hover:border-primary-500/30 transition-all">
                      {{row.firstName[0]}}
                      <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-secondary-950 shadow-lg"></div>
                    </div>
                    <div class="flex flex-col">
                      <span class="text-lg font-black text-white tracking-tight uppercase italic group-hover:text-primary-400 transition-colors">{{row.firstName}} {{row.lastName}}</span>
                      <span class="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 italic">Node Trace: {{row.id.split('-')[0]}}</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="specialization">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Domain Expertise</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <span class="text-[9px] font-black text-primary-400 bg-primary-500/10 px-5 py-2.5 rounded-xl border border-primary-500/20 uppercase tracking-[0.2em] backdrop-blur-sm shadow-xl">
                    {{row.specialization}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="hospital">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Matrix Allocation</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-3">
                    <mat-icon class="text-white/10 scale-75">corporate_fare</mat-icon>
                    <span class="text-xs font-black text-white/40 uppercase tracking-tighter group-hover:text-white/60 transition-colors italic leading-none">{{row.hospitalName || 'NOT_ALLOCATED'}}</span>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Status Vector</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <span [class]="row.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-white/30 border-white/10'" 
                        class="px-4 py-2Rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border backdrop-blur-sm">
                    {{row.status}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10 text-right">Directives</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03] text-right">
                   <div class="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                      <button mat-icon-button class="w-10 h-10 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">edit_square</mat-icon>
                      </button>
                      <button mat-icon-button class="w-10 h-10 bg-white/5 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">delete</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-white/[0.02]"></tr>
             <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-white/[0.02] transition-all cursor-pointer group"></tr>
          </table>

          <div *ngIf="doctors().length === 0 && !loading()" class="py-32 text-center bg-white/[0.01]">
             <mat-icon class="text-white/5 scale-[4] mb-12 animate-pulse">person_off</mat-icon>
             <p class="text-white/20 font-black uppercase tracking-[0.5em] text-[10px]">No operational nodes detected in current sector</p>
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
export class DoctorManagementComponent implements OnInit {
  private api = inject(AdminApiService);
  
  doctors = signal<DoctorSummary[]>([]);
  loading = signal(false);
  
  displayedColumns = ['name', 'specialization', 'hospital', 'status', 'actions'];

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading.set(true);
    this.api.getDoctors().subscribe({
      next: (res) => {
        this.doctors.set(res.data.content);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load doctors', err);
        this.loading.set(false);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Server side filtering can be implemented here
  }
}
