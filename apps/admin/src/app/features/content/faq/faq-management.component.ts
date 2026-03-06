import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdInputComponent
} from '@repo/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WEBSITECONTROLService } from '../../../core/services/api/websitecontrol.service';

@Component({
  selector: 'app-faq-management',
  standalone: true,
  imports: [
    CommonModule, 
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Knowledge Base</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage frequently asked questions to empower patients with self-service insights.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">add_comment</mat-icon>
          Register FAQ
        </zrd-button>
      </div>

      <!-- FAQ Registry Card -->
      <zrd-card variant="default">
        <!-- Control Strip -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex-1 max-w-sm">
            <zrd-input 
              placeholder="Search knowledge entries..." 
              [hasPrefix]="true"
              (keyup)="applyFilter($event)"
            >
              <mat-icon prefix class="text-google-gray-400">help_center</mat-icon>
            </zrd-input>
          </div>
          <div class="flex items-center gap-2 ml-auto">
             <zrd-button variant="outline" size="sm">
               <mat-icon leftIcon>sort</mat-icon>
               Organic Reorder
             </zrd-button>
          </div>
        </div>

        @if (loading()) {
          <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
             <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
          </div>
        }

        <!-- Spartan FAQ Stream -->
        <div class="space-y-6">
          @for (faq of faqs(); track faq.id; let i = $index) {
            <div class="p-6 rounded-3xl bg-google-gray-50/50 dark:bg-white/5 border border-google-gray-100 dark:border-white/5 hover:border-google-blue/30 transition-all group">
              <div class="flex items-start gap-6">
                <!-- Ordinal Index -->
                <span class="w-10 h-10 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-xs font-black text-google-blue shadow-sm border border-google-gray-100 dark:border-white/10 shrink-0 uppercase tracking-tighter">
                  #{{ i + 1 }}
                </span>

                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-base text-google-gray-900 dark:text-white m-0 tracking-tight group-hover:text-google-blue transition-colors">{{ faq.question }}</h3>
                  <p class="text-sm text-google-gray-600 dark:text-google-gray-400 m-0 mt-3 leading-relaxed">{{ faq.answer }}</p>
                </div>

                <!-- Registry Controls -->
                <div class="shrink-0">
                  <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                    <button mat-menu-item>
                      <mat-icon class="text-google-blue">edit_note</mat-icon>
                      <span class="font-bold text-sm">Update Entry</span>
                    </button>
                    <button mat-menu-item>
                      <mat-icon class="text-google-gray-600">low_priority</mat-icon>
                      <span class="font-bold text-sm">Shift Priority</span>
                    </button>
                    <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                    <button mat-menu-item class="text-google-red">
                      <mat-icon class="text-google-red">delete_forever</mat-icon>
                      <span class="font-bold text-sm">Purge Record</span>
                    </button>
                  </mat-menu>
                </div>
              </div>
            </div>
          }
        </div>

        @if (faqs().length === 0 && !loading()) {
          <div class="py-24 text-center">
            <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
               <mat-icon class="text-google-gray-400 text-3xl">question_answer</mat-icon>
            </div>
            <h3 class="font-bold text-google-gray-900 dark:text-white">Knowledge Base Empty</h3>
            <p class="text-sm text-google-gray-500 mt-2">Start registering frequent queries to assist your users.</p>
          </div>
        }

        <!-- Stream Footer -->
        <div class="px-6 py-4 mt-8 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">{{ faqs().length }} Knowledge Artifact(s)</span>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class FaqManagementComponent implements OnInit {
  private websiteService = inject(WEBSITECONTROLService);

  faqs = signal<any[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadFaqs();
  }

  loadFaqs() {
    this.loading.set(true);
    this.websiteService.getAdminWebsiteFaqs().subscribe({
      next: (res: any) => {
        const data = res?.data || [];
        this.faqs.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  applyFilter(event: Event) {
    // filter logic
  }
}

