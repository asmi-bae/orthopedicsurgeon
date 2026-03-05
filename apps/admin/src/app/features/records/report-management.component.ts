import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdInputComponent,
  ZrdBadgeComponent 
} from '@repo/ui';

@Component({
  selector: 'app-report-management',
  standalone: true,
  imports: [
    CommonModule, 
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
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
          <span leftIcon class="material-symbols-outlined text-[20px] leading-none">upload_file</span>
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
            >
              <span prefix class="material-symbols-outlined text-google-gray-400 text-[20px] leading-none">search</span>
            </zrd-input>
          </div>
          <div class="flex items-center gap-2 ml-auto">
             <zrd-button variant="outline" size="sm">
               <span leftIcon class="material-symbols-outlined text-[18px] leading-none">biotech</span>
               Lab Integration
             </zrd-button>
          </div>
        </div>

        <!-- Spartan Diagnostic Stream -->
        <div class="space-y-4">
          @for (r of reports(); track r.id) {
            <div class="flex items-center gap-6 p-6 rounded-3xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all group border border-google-gray-100 dark:border-white/5 cursor-pointer">
              <!-- Diagnostic Identifier -->
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:bg-opacity-80"
                   [class]="r.type === 'X-Ray' ? 'bg-google-blue/10 text-google-blue' : r.type === 'MRI' ? 'bg-google-emerald/10 text-google-emerald' : 'bg-google-red/10 text-google-red'">
                <span class="material-symbols-outlined text-[24px] leading-none">radiology</span>
              </div>

              <!-- Identity & Context -->
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-base text-google-gray-900 dark:text-white m-0 tracking-tight group-hover:text-google-blue transition-colors">{{ r.patient }}</h3>
                <div class="flex items-center gap-x-2 text-[10px] font-black uppercase tracking-widest text-google-gray-400 mt-1">
                   <span>{{ r.type }} Study</span>
                   <span class="w-1 h-1 rounded-full bg-google-gray-300"></span>
                   <span>Dr. {{ r.doctor }}</span>
                </div>
              </div>

              <!-- Report Status -->
              <div class="flex items-center gap-4 shrink-0 px-4 py-2 bg-google-gray-50/50 dark:bg-white/5 rounded-2xl group-hover:bg-white dark:group-hover:bg-white/10 transition-colors">
                <div class="flex flex-col items-end mr-2">
                   <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Recorded</span>
                   <span class="text-xs font-bold text-google-gray-900 dark:text-white leading-none mt-1">{{ r.date }}</span>
                </div>
                <zrd-badge [variant]="r.type === 'X-Ray' ? 'info' : r.type === 'MRI' ? 'success' : 'warning'" class="font-black">
                   {{ r.type }}
                </zrd-badge>
              </div>

              <!-- Record Control -->
              <div class="shrink-0 relative" (click)="$event.stopPropagation()">
                <button 
                  (click)="toggleMenu(r.id)"
                  class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                  <span class="material-symbols-outlined text-[20px] leading-none">more_horiz</span>
                </button>
                @if (openMenuId() === r.id) {
                  <div class="absolute right-0 top-full mt-1 z-50 min-w-[180px] bg-white dark:bg-google-gray-900 rounded-2xl shadow-google border border-google-gray-100 dark:border-white/10 py-2 overflow-hidden">
                    <button (click)="closeMenu()" class="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors text-left">
                      <span class="material-symbols-outlined text-google-blue text-[20px] leading-none">visibility</span>
                      <span class="font-bold">View Digital Study</span>
                    </button>
                    <button (click)="closeMenu()" class="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors text-left">
                      <span class="material-symbols-outlined text-google-emerald text-[20px] leading-none">file_download</span>
                      <span class="font-bold">Download Archive</span>
                    </button>
                    <button (click)="closeMenu()" class="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors text-left">
                      <span class="material-symbols-outlined text-google-blue text-[20px] leading-none">share</span>
                      <span class="font-bold">Secure Share</span>
                    </button>
                    <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                    <button (click)="closeMenu()" class="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors text-left text-google-red">
                      <span class="material-symbols-outlined text-google-red text-[20px] leading-none">delete_forever</span>
                      <span class="font-bold">Purge Record</span>
                    </button>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        @if (reports().length === 0) {
          <div class="py-24 text-center">
            <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
               <span class="material-symbols-outlined text-google-gray-400 text-3xl leading-none">fact_check</span>
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
export class ReportManagementComponent {
  reports = signal([
    { id: 1, patient: 'John Doe',      type: 'X-Ray', doctor: 'Sarah Johnson', date: 'Oct 15, 2024' },
    { id: 2, patient: 'Jane Smith',    type: 'MRI',   doctor: 'Mike Ross',     date: 'Oct 16, 2024' },
    { id: 3, patient: 'Robert Wilson', type: 'CT',    doctor: 'David King',    date: 'Oct 18, 2024' },
    { id: 4, patient: 'Sarah Parker',  type: 'X-Ray', doctor: 'Lisa Chen',     date: 'Oct 22, 2024' },
  ]);

  openMenuId = signal<number | null>(null);

  toggleMenu(id: number) {
    this.openMenuId.update(current => current === id ? null : id);
  }

  closeMenu() {
    this.openMenuId.set(null);
  }
}
