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
import { LABREPORTSService } from '../../core/services/api/labreports.service';

@Component({
  selector: 'app-report-management',
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
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Diagnostic Reports</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Access radiological studies, pathology results, and clinical evaluations.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">upload_file</mat-icon>
          Ingest New Report
        </zrd-button>
      </div>

      <!-- Inventory Registry Card -->
      <zrd-card variant="default">
        <!-- Explorer Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex-1 max-w-sm">
            <zrd-input 
              placeholder="Search reports by patient or type..." 
              [hasPrefix]="true"
              (keyup)="applyFilter($event)"
            >
              <mat-icon prefix class="text-google-gray-400">search</mat-icon>
            </zrd-input>
          </div>
          <div class="flex items-center gap-2 ml-auto">
             <zrd-button variant="outline" size="sm">
               <mat-icon leftIcon>biotech</mat-icon>
               Lab Integration
             </zrd-button>
          </div>
        </div>

        @if (loading()) {
          <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
             <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
          </div>
        }

        <!-- Spartan Diagnostic Stream -->
        <div class="space-y-4">
          @for (r of reports(); track r.id) {
            <div class="flex items-center gap-6 p-6 rounded-3xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all group border border-google-gray-100 dark:border-white/5 cursor-pointer">
              <!-- Diagnostic Identifier -->
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:bg-opacity-80"
                   [class]="getIconClass(r.reportType)">
                <mat-icon class="text-[24px]">radiology</mat-icon>
              </div>

              <!-- Identity & Context -->
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-base text-google-gray-900 dark:text-white m-0 tracking-tight group-hover:text-google-blue transition-colors">{{ r.patientName }}</h3>
                <div class="flex items-center gap-x-2 text-[10px] font-black uppercase tracking-widest text-google-gray-400 mt-1">
                   <span>{{ r.reportType }} Study</span>
                   <span class="w-1 h-1 rounded-full bg-google-gray-300"></span>
                   <span>Dr. {{ r.doctorName }}</span>
                </div>
              </div>

              <!-- Report Status -->
              <div class="flex items-center gap-4 shrink-0 px-4 py-2 bg-google-gray-50/50 dark:bg-white/5 rounded-2xl group-hover:bg-white dark:group-hover:bg-white/10 transition-colors">
                <div class="flex flex-col items-end mr-2 text-right">
                   <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Recorded</span>
                   <span class="text-xs font-bold text-google-gray-900 dark:text-white leading-none mt-1">{{ r.uploadedAt | date:'mediumDate' }}</span>
                </div>
                <zrd-badge [variant]="getStatusVariant(r.status)" class="font-black">
                   {{ r.status }}
                </zrd-badge>
              </div>

              <!-- Record Control -->
              <div class="shrink-0 relative">
                <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                  <mat-icon>more_horiz</mat-icon>
                </button>
                <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                  <button mat-menu-item>
                    <mat-icon class="text-google-blue">visibility</mat-icon>
                    <span class="font-bold text-sm">View Digital Study</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon class="text-google-emerald">file_download</mat-icon>
                    <span class="font-bold text-sm">Download Archive</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon class="text-google-blue">share</mat-icon>
                    <span class="font-bold text-sm">Secure Share</span>
                  </button>
                  <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                  <button mat-menu-item class="text-google-red">
                    <mat-icon class="text-google-red">delete_forever</mat-icon>
                    <span class="font-bold text-sm">Purge Record</span>
                  </button>
                </mat-menu>
              </div>
            </div>
          }
        </div>

        @if (reports().length === 0 && !loading()) {
          <div class="py-24 text-center">
            <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
               <mat-icon class="text-google-gray-400 text-3xl">fact_check</mat-icon>
            </div>
            <h3 class="font-bold text-google-gray-900 dark:text-white">Registry Cleared</h3>
            <p class="text-sm text-google-gray-500 mt-2">No diagnostic artifacts were retrieved for this query.</p>
          </div>
        }

        <!-- Registry Footer -->
        <div class="px-6 py-4 mt-8 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">{{ reports().length }} Artifact(s) Indexed</span>
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
export class ReportManagementComponent implements OnInit {
  private labreportsService = inject(LABREPORTSService);

  reports = signal<any[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.loading.set(true);
    this.labreportsService.getAdminLabreports().subscribe({
      next: (res: any) => {
        const data = res?.data?.content || res?.data || [];
        this.reports.set(Array.isArray(data) ? data : []);
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
    if (s === 'COMPLETED' || s === 'FINAL') return 'success';
    if (s === 'PENDING') return 'warning';
    if (s === 'CANCELLED') return 'neutral';
    return 'info';
  }

  getIconClass(type: string): string {
    const t = type?.toUpperCase();
    if (t?.includes('X-RAY')) return 'bg-google-blue/10 text-google-blue';
    if (t?.includes('MRI')) return 'bg-google-emerald/10 text-google-emerald';
    return 'bg-google-red/10 text-google-red';
  }
}

