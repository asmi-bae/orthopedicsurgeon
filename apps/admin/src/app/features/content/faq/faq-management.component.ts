import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminApiService } from '@core/services/admin-api.service';

@Component({
  selector: 'app-faq-management',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-10 animate-fade-in pb-24 px-2">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-500/30 shadow-2xl shadow-purple-500/10">
            <mat-icon class="text-purple-400 scale-[1.5]">psychology_alt</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Intelligence Nodes</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Manage frequently asked question nodes and category clusters</p>
            </div>
          </div>
        </div>
        <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
           Inject New Query
        </button>
      </div>

      <mat-progress-bar *ngIf="loading()" mode="query" color="primary" class="h-1 rounded-full"></mat-progress-bar>

      <div class="space-y-6 animate-slide-up">
        <mat-accordion multi class="premium-accordion space-y-4">
          <mat-expansion-panel *ngFor="let faq of faqs()" class="bg-white/[0.01] border border-white/5 rounded-[32px] glass overflow-hidden group hover:border-primary-500/30 transition-all shadow-xl">
            <mat-expansion-panel-header class="h-24 px-10">
              <mat-panel-title class="flex items-center gap-8">
                <span class="text-[9px] font-black text-primary-400 bg-primary-500/10 px-4 py-2 rounded-xl border border-primary-500/20 uppercase tracking-[0.2em] backdrop-blur-sm">
                  {{ faq.category }}
                </span>
                <span class="text-lg font-black text-white tracking-tight uppercase italic group-hover:text-primary-400 transition-colors">{{ faq.question }}</span>
              </mat-panel-title>
              <mat-panel-description class="justify-end items-center gap-6 hidden xl:flex">
                 <span [class]="faq.isActive ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-white/30 border-white/10'" 
                       class="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border backdrop-blur-sm">
                   {{ faq.isActive ? 'ACTIVE_NODE' : 'OFFLINE_NODE' }}
                 </span>
              </mat-panel-description>
            </mat-expansion-panel-header>

            <div class="py-10 px-6 border-t border-white/[0.03] mt-2">
               <div class="flex gap-6 mb-10">
                  <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                    <mat-icon class="text-white/20">rebase_edit</mat-icon>
                  </div>
                  <p class="text-sm text-white/40 leading-relaxed font-medium group-hover:text-white/60 transition-colors">{{ faq.answer }}</p>
               </div>
               
               <div class="flex items-center justify-between bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                  <div class="flex items-center gap-6">
                     <div class="flex flex-col">
                        <span class="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Matrix Sequence</span>
                        <span class="text-xs font-black text-white italic tracking-tighter uppercase">Slot Index: {{ faq.displayOrder }}</span>
                     </div>
                  </div>
                  
                  <div class="flex gap-3">
                    <button mat-button class="h-11 px-6 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-all border border-white/5 text-[10px] font-black uppercase tracking-widest">
                       <mat-icon class="scale-75 mr-2">edit</mat-icon> Modify Node
                    </button>
                    <button mat-button (click)="deleteFaq(faq.id)" class="h-11 px-6 bg-white/5 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5 text-[10px] font-black uppercase tracking-widest">
                       <mat-icon class="scale-75 mr-2">delete_forever</mat-icon> Purge Matrix
                    </button>
                  </div>
               </div>
            </div>
          </mat-expansion-panel>
        </mat-accordion>

        <div *ngIf="faqs().length === 0 && !loading()" class="py-48 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-[40px] animate-pulse">
           <mat-icon class="text-white/5 scale-[5] mb-14">quiz</mat-icon>
           <p class="text-white/20 font-black uppercase tracking-[0.6em] text-[10px]">Inquiry matrix is currently void</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .glass { backdrop-filter: blur(40px); }
    .premium-accordion ::ng-deep .mat-expansion-panel-body { padding: 0 24px 24px !important; }
    ::ng-deep .mat-expansion-panel { background: transparent !important; }
    ::ng-deep .mat-expansion-indicator::after { border-color: rgba(255,255,255,0.2) !important; border-width: 0 3px 3px 0 !important; }
  `]
})
export class FaqManagementComponent implements OnInit {
  private api = inject(AdminApiService);
  
  faqs = signal<any[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadFaqs();
  }

  loadFaqs() {
    this.loading.set(true);
    this.api.getFaqs().subscribe({
      next: (res) => {
        this.faqs.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load FAQs', err);
        this.loading.set(false);
      }
    });
  }

  deleteFaq(id: string) {
    if (confirm('Initiate inquiry node purge?')) {
      this.api.deleteFaq(id).subscribe(() => this.loadFaqs());
    }
  }
}
