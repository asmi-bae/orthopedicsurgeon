import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminApiService } from '@core/services/admin-api.service';
import { Hospital } from '@repo/types';

@Component({
  selector: 'app-hospital-management',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-10 animate-fade-in pb-24 px-2">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center border border-indigo-500/30 shadow-2xl shadow-indigo-500/10">
            <mat-icon class="text-indigo-400 scale-[1.5]">apartment</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Infrastructure Management</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Manage hospital network, clinics, and service categories</p>
            </div>
          </div>
        </div>
        <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
           Initialize New Facility
        </button>
      </div>

      <mat-card class="bg-white/[0.01] border border-white/5 rounded-3xl glass overflow-hidden animate-slide-up">
        <mat-progress-bar *ngIf="loading()" mode="query" color="primary" class="h-1"></mat-progress-bar>
        
        <div class="overflow-x-auto p-2">
          <table mat-table [dataSource]="hospitals()" class="w-full bg-transparent">
             <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10">Facility Name</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-5">
                    <div class="w-12 h-12 rounded-2xl bg-secondary-900 border border-white/5 flex items-center justify-center text-primary-400 shadow-inner group-hover:border-primary-500/30 transition-all">
                      <mat-icon class="scale-90">corporate_fare</mat-icon>
                    </div>
                    <div class="flex flex-col">
                      <span class="text-lg font-black text-white tracking-tight uppercase italic group-hover:text-primary-400 transition-colors">{{row.name}}</span>
                      <span class="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 italic">License: {{row.licenseNumber}}</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="city">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Sector Localization</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-1 rounded-full bg-primary-500"></span>
                    <span class="text-xs font-black text-white/50 uppercase italic tracking-tight">{{row.city}} Sector Matrix</span>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Comm Frequency</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <span class="text-[9px] font-black text-white/40 bg-white/5 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-sm">
                    {{row.phone}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Status</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <span [class]="row.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-white/30 border-white/10'" 
                        class="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border backdrop-blur-sm">
                    {{row.status}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10 text-right">Directives</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03] text-right">
                   <div class="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                      <button mat-icon-button class="w-10 h-10 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">settings_applications</mat-icon>
                      </button>
                      <button mat-icon-button class="w-10 h-10 bg-white/5 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">power_settings_new</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-white/[0.02]"></tr>
             <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-white/[0.02] transition-all cursor-pointer group"></tr>
          </table>
          
          <div *ngIf="hospitals().length === 0 && !loading()" class="py-32 text-center bg-white/[0.01]">
             <mat-icon class="text-white/5 scale-[4] mb-12 animate-pulse">domain_disabled</mat-icon>
             <p class="text-white/20 font-black uppercase tracking-[0.5em] text-[10px]">No operational facilities detected in matrix</p>
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
export class HospitalManagementComponent implements OnInit {
  private api = inject(AdminApiService);
  
  hospitals = signal<Hospital[]>([]);
  loading = signal(false);
  
  displayedColumns = ['name', 'city', 'phone', 'status', 'actions'];

  ngOnInit() {
    this.loadHospitals();
  }

  loadHospitals() {
    this.loading.set(true);
    this.api.getHospitals().subscribe({
      next: (res) => {
        this.hospitals.set(res.data.content);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load hospitals', err);
        this.loading.set(false);
      }
    });
  }
}
