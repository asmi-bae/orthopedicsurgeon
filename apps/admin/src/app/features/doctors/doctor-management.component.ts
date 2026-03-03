import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
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
    TranslateModule,
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
    <div class="space-y-6 animate-fade-in pb-12">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center border border-primary-200 dark:border-primary-800">
            <mat-icon class="text-primary-600 dark:text-primary-400">medical_services</mat-icon>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">{{ 'DOCTORS.TITLE' | translate }}</h1>
            <p class="text-white/40 text-xs">{{ 'DOCTORS.SUBTITLE' | translate }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <mat-form-field appearance="outline" class="w-full md:w-64 dense-form-field">
            <mat-icon matPrefix class="mr-2">search</mat-icon>
            <input matInput (keyup)="applyFilter($event)" [placeholder]="'DOCTORS.FILTER_PLACEHOLDER' | translate">
          </mat-form-field>
          <button mat-flat-button color="primary" class="h-12 px-6 font-bold uppercase tracking-tight">
             {{ 'DOCTORS.ENLIST_BUTTON' | translate }}
          </button>
        </div>
      </div>

      <mat-card class="border rounded-xl overflow-hidden animate-slide-up">
        @if (loading()) {
          <mat-progress-bar mode="query" color="primary"></mat-progress-bar>
        }
        
        <div class="overflow-x-auto">
          <table mat-table [dataSource]="doctors()" class="w-full">
             <!-- Name Column -->
             <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef class="px-6">{{ 'DOCTORS.COLUMNS.NAME' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center text-primary-400 font-bold border border-white/10">
                      {{row.firstName[0]}}
                    </div>
                    <div class="flex flex-col">
                      <span class="text-sm font-bold text-white">{{row.firstName}} {{row.lastName}}</span>
                      <span class="text-[10px] text-white/20 uppercase tracking-wider">ID: {{row.id.split('-')[0]}}</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <!-- Specialization Column -->
             <ng-container matColumnDef="specialization">
                <th mat-header-cell *matHeaderCellDef>{{ 'DOCTORS.COLUMNS.SPECIALIZATION' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <mat-chip-set>
                    <mat-chip class="text-[10px] font-bold uppercase">{{row.specialization}}</mat-chip>
                  </mat-chip-set>
                </td>
             </ng-container>

             <!-- Hospital Column -->
             <ng-container matColumnDef="hospital">
                <th mat-header-cell *matHeaderCellDef>{{ 'DOCTORS.COLUMNS.HOSPITAL' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-white/20 scale-75">corporate_fare</mat-icon>
                    <span class="text-xs text-white/60">{{row.hospitalName || 'N/A'}}</span>
                  </div>
                </td>
             </ng-container>

             <!-- Status Column -->
             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>{{ 'DOCTORS.COLUMNS.STATUS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <span [class]="row.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-white/30 border-white/10'" 
                        class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border">
                    {{row.status}}
                  </span>
                </td>
             </ng-container>

             <!-- Actions Column -->
             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="px-6 text-right">{{ 'DOCTORS.COLUMNS.ACTIONS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4 text-right">
                   <div class="flex justify-end gap-1">
                      <button mat-icon-button class="text-white/40 hover:text-primary-400 transition-all">
                        <mat-icon class="scale-90">edit</mat-icon>
                      </button>
                      <button mat-icon-button class="text-white/40 hover:text-red-500 transition-all">
                        <mat-icon class="scale-90">delete</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-white/5"></tr>
             <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-white/[0.02] transition-colors cursor-pointer"></tr>
          </table>

          @if (doctors().length === 0 && !loading()) {
            <div class="py-24 text-center">
               <mat-icon class="text-white/5 scale-[3] mb-8">person_off</mat-icon>
               <p class="text-white/20 font-bold uppercase tracking-widest text-xs">{{ 'DOCTORS.NO_DATA' | translate }}</p>
            </div>
          }
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    :host { display: block; }
    ::ng-deep .mat-mdc-table { background: transparent !important; }
    ::ng-deep .dense-form-field .mat-mdc-form-field-subscript-wrapper { display: none; }
    ::ng-deep .dense-form-field .mat-mdc-text-field-wrapper { height: 48px !important; padding-top: 0 !important; padding-bottom: 0 !important; }
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
