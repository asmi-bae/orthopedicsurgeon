import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
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
    TranslateModule,
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-6 animate-fade-in pb-12">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
            <mat-icon class="text-indigo-600 dark:text-indigo-400">apartment</mat-icon>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">{{ 'HOSPITALS.TITLE' | translate }}</h1>
            <p class="text-white/40 text-xs">{{ 'HOSPITALS.SUBTITLE' | translate }}</p>
          </div>
        </div>
        <button mat-flat-button color="primary" class="h-12 px-6 font-bold uppercase tracking-tight">
           {{ 'HOSPITALS.ADD_BUTTON' | translate }}
        </button>
      </div>

      <mat-card class="border rounded-xl overflow-hidden animate-slide-up">
        @if (loading()) {
          <mat-progress-bar mode="query" color="primary"></mat-progress-bar>
        }
        
        <div class="overflow-x-auto">
          <table mat-table [dataSource]="hospitals()" class="w-full">
             <!-- Name Column -->
             <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef class="px-6">{{ 'HOSPITALS.COLUMNS.NAME' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center text-primary-400 border border-white/5">
                      <mat-icon class="scale-75">corporate_fare</mat-icon>
                    </div>
                    <div class="flex flex-col">
                      <span class="text-sm font-bold text-white">{{row.name}}</span>
                      <span class="text-[10px] text-white/20 uppercase tracking-wider">License: {{row.licenseNumber}}</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <!-- City Column -->
             <ng-container matColumnDef="city">
                <th mat-header-cell *matHeaderCellDef>{{ 'HOSPITALS.COLUMNS.CITY' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                    <span class="text-xs text-white/60">{{row.city}}</span>
                  </div>
                </td>
             </ng-container>

             <!-- Phone Column -->
             <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef>{{ 'HOSPITALS.COLUMNS.PHONE' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <span class="text-xs text-white/40">{{row.phone}}</span>
                </td>
             </ng-container>

             <!-- Status Column -->
             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>{{ 'HOSPITALS.COLUMNS.STATUS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <span [class]="row.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-white/30 border-white/10'" 
                        class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border">
                    {{row.status}}
                  </span>
                </td>
             </ng-container>

             <!-- Actions Column -->
             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="px-6 text-right">{{ 'HOSPITALS.COLUMNS.ACTIONS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4 text-right">
                   <div class="flex justify-end gap-1">
                      <button mat-icon-button class="text-white/40 hover:text-primary-400 transition-all">
                        <mat-icon class="scale-90">settings_applications</mat-icon>
                      </button>
                      <button mat-icon-button class="text-white/40 hover:text-red-500 transition-all">
                        <mat-icon class="scale-90">power_settings_new</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-white/5"></tr>
             <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-white/[0.02] transition-colors cursor-pointer"></tr>
          </table>
          
          @if (hospitals().length === 0 && !loading()) {
            <div class="py-24 text-center">
               <mat-icon class="text-white/5 scale-[3] mb-8">domain_disabled</mat-icon>
               <p class="text-white/20 font-bold uppercase tracking-widest text-xs">{{ 'HOSPITALS.NO_DATA' | translate }}</p>
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
