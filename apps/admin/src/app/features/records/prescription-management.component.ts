import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdInputComponent,
  ZrdBadgeComponent 
} from '@repo/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PRESCRIPTIONSService } from '../../core/services/api/prescriptions.service';

@Component({
  selector: 'app-prescription-management',
  standalone: true,
  imports: [
    CommonModule, 
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    DatePipe
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Clinical Prescriptions</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Review, authorize, and track all medication mandates issued by practitioners.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">medication</mat-icon>
          Draft New Mandate
        </zrd-button>
      </div>

      <!-- Inventory Card -->
      <zrd-card variant="default">
        <!-- Search & Control Strip -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex-1 max-w-sm">
            <zrd-input 
              placeholder="Search by patient, doctor or medication..." 
              [hasPrefix]="true"
              (keyup)="applyFilter($event)"
            >
              <mat-icon prefix class="text-google-gray-400">search</mat-icon>
            </zrd-input>
          </div>
          <div class="flex items-center gap-2 ml-auto">
             <zrd-button variant="outline" size="sm">
               <mat-icon leftIcon>history</mat-icon>
               Archive Records
             </zrd-button>
          </div>
        </div>

        @if (loading()) {
          <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
             <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
          </div>
        }

        <!-- Spartan Prescription Directory -->
        <div class="space-y-4">
          @for (p of prescriptions(); track p.id) {
            <div class="flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-3xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all group border border-google-gray-100 dark:border-white/5 cursor-pointer">
              <!-- Identity Ring -->
              <div class="w-12 h-12 rounded-2xl bg-google-blue/10 flex items-center justify-center shrink-0 transition-all group-hover:scale-110">
                <mat-icon class="text-google-blue text-[24px]">description</mat-icon>
              </div>

              <!-- Primary Info -->
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-base text-google-gray-900 dark:text-white m-0 tracking-tight group-hover:text-google-blue transition-colors">{{ p.patientName }}</h3>
                <div class="flex items-center gap-x-2 text-[10px] font-black uppercase tracking-widest text-google-gray-400 mt-1">
                   <span>Dr. {{ p.doctorName }}</span>
                   <span class="w-1 h-1 rounded-full bg-google-gray-300"></span>
                   <span>{{ p.prescribedAt | date:'mediumDate' }}</span>
                </div>
              </div>

              <!-- Medication Details -->
              <div class="flex flex-col sm:items-center text-left sm:text-center min-w-[200px]">
                <span class="text-sm font-bold text-google-gray-900 dark:text-white tracking-tight truncate max-w-[200px]">{{ p.notes || 'Routine Medication' }}</span>
                <span class="text-[10px] font-black uppercase tracking-widest text-google-blue mt-1 bg-google-blue/5 px-2 py-0.5 rounded-full">{{ p.status }}</span>
              </div>

              <!-- Governance Status -->
              <div class="flex items-center gap-4 shrink-0">
                <zrd-badge [variant]="getStatusVariant(p.status)" class="font-black">
                  {{ p.status }}
                </zrd-badge>

                <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                  <button mat-menu-item>
                    <mat-icon class="text-google-blue">visibility</mat-icon>
                    <span class="font-bold text-sm">Review Full Details</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon class="text-google-emerald">print</mat-icon>
                    <span class="font-bold text-sm">Print Script</span>
                  </button>
                  <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                  <button mat-menu-item class="text-google-red">
                    <mat-icon class="text-google-red">cancel</mat-icon>
                    <span class="font-bold text-sm">Void Prescription</span>
                  </button>
                </mat-menu>
              </div>
            </div>
          }
        </div>

        @if (prescriptions().length === 0 && !loading()) {
          <div class="py-24 text-center">
            <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
               <mat-icon class="text-google-gray-400 text-3xl">medication_liquid</mat-icon>
            </div>
            <h3 class="font-bold text-google-gray-900 dark:text-white">No Prescriptions Found</h3>
            <p class="text-sm text-google-gray-500 mt-2">Adjust your filters or search criteria to locate specific records.</p>
          </div>
        }

        <!-- Paginator Strip -->
        <div class="px-6 py-4 mt-8 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">{{ prescriptions().length }} Mandate(s) Logged</span>
          <div class="flex items-center gap-2">
            <zrd-button variant="ghost" size="sm" [disabled]="true">Previous</zrd-button>
            <zrd-button variant="ghost" size="sm" [disabled]="true">Next</zrd-button>
          </div>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class PrescriptionManagementComponent implements OnInit {
  private prescriptionService = inject(PRESCRIPTIONSService);

  prescriptions = signal<any[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadPrescriptions();
  }

  loadPrescriptions() {
    this.loading.set(true);
    this.prescriptionService.getAdminPrescriptions().subscribe({
      next: (res: any) => {
        const data = res?.data?.content || res?.data || [];
        this.prescriptions.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  applyFilter(event: Event) {
    // filter logic
  }

  getStatusVariant(status: string): any {
    const s = status?.toUpperCase();
    if (s === 'ACTIVE') return 'success';
    if (s === 'DISPENSED') return 'info';
    if (s === 'EXPIRED') return 'neutral';
    if (s === 'CANCELLED' || s === 'VOID') return 'error';
    return 'neutral';
  }
}

