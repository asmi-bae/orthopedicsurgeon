import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdInputComponent,
  ZrdBadgeComponent 
} from '@repo/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { WEBSITECONTROLService } from '../../../core/services/api/websitecontrol.service';

@Component({
  selector: 'app-hero-management',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Main Identity Block</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Configure the primary gateway experience and brand messaging.</p>
        </div>
        @if (!editing() && hero()) {
          <zrd-button variant="primary" size="md" (click)="startEditing()">
            <mat-icon leftIcon class="text-[20px]">edit_square</mat-icon>
            Modify Gateway
          </zrd-button>
        }
      </div>

      @if (loading()) {
        <div class="relative h-1 mb-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      <!-- Gateway Preview / Editor Card -->
      <zrd-card variant="default">
        @if (!editing()) {
          <!-- High-Fidelity Preview Interface -->
          @if (hero()) {
            <div class="relative rounded-3xl overflow-hidden bg-google-gray-900 dark:bg-google-gray-900 p-12 border border-google-gray-800">
               <!-- Background Texture -->
               <div class="absolute inset-0 opacity-10 pointer-events-none">
                  <div class="absolute inset-0 bg-gradient-to-tr from-google-blue to-google-emerald opacity-20"></div>
                  <div class="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
               </div>

               <div class="relative z-10 max-w-2xl">
                  <zrd-badge variant="info" class="font-black text-[10px] bg-white/10 text-white border-white/20 px-3">
                     {{ hero()?.badge || 'Identity Block' }}
                  </zrd-badge>
                  
                  <h2 class="text-5xl font-black text-white mt-6 leading-[1.1] tracking-tighter">
                     {{ hero()?.headline }}
                  </h2>
                  
                  <p class="text-lg text-google-gray-300 mt-6 leading-relaxed font-medium">
                     {{ hero()?.subheadline }}
                  </p>
                  
                  <div class="flex items-center gap-4 mt-10">
                     <zrd-button variant="primary" size="lg" class="rounded-full px-8 shadow-xl shadow-google-blue/20">
                        {{ hero()?.ctaText }}
                     </zrd-button>
                     <zrd-button variant="outline" size="lg" class="rounded-full px-8 border-white/20 text-white hover:bg-white/10">
                        Platform Overview
                     </zrd-button>
                  </div>
               </div>

               <!-- Preview Status -->
               <div class="absolute top-6 right-6 flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-google-emerald animate-pulse"></div>
                  <span class="text-[10px] font-black uppercase tracking-widest text-google-emerald">Active Deployment</span>
               </div>
            </div>

            <div class="flex items-center justify-between mt-8 px-2">
               <div class="flex flex-col">
                  <span class="text-xs font-black uppercase tracking-widest text-google-gray-400">Governance Level</span>
                  <span class="text-sm font-bold text-google-gray-900 dark:text-white mt-1 uppercase">Production Grade Artifact</span>
               </div>
               <div class="flex items-center gap-4">
                  <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400 italic">Sync Verified: Oct 20, 2024</span>
                  <zrd-button variant="outline" size="sm" (click)="startEditing()">Full Configuration</zrd-button>
               </div>
            </div>
          } @else if (!loading()) {
            <div class="py-24 text-center">
              <mat-icon class="text-google-gray-400 text-5xl mb-4">settings_input_component</mat-icon>
              <h3 class="font-bold text-google-gray-900 dark:text-white">No Identity Block Configured</h3>
              <p class="text-sm text-google-gray-500 mt-2">Initialize your gateway experience to start.</p>
              <zrd-button variant="primary" size="md" class="mt-6" (click)="startEditing()">Initialize Gateway</zrd-button>
            </div>
          }
        } @else {
          <!-- Configuration Interface -->
          <div class="max-w-3xl mx-auto py-4">
            <h2 class="text-xl font-black text-google-gray-900 dark:text-white mb-8 flex items-center gap-2 tracking-tight">
               <mat-icon class="text-google-blue">tune</mat-icon>
               Gateway Configuration Parameters
            </h2>
            
            <form [formGroup]="heroForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Label / Badge</label>
                    <zrd-input placeholder="e.g. Performance Hub" formControlName="badge"></zrd-input>
                 </div>
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Primary Call to Action</label>
                    <zrd-input placeholder="e.g. Start Trial" formControlName="ctaText"></zrd-input>
                 </div>
              </div>

              <div class="space-y-2">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Main Headline</label>
                 <zrd-input placeholder="Catchy main title..." formControlName="headline"></zrd-input>
              </div>

              <div class="space-y-2">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Sub-context Narrative</label>
                 <textarea 
                    class="w-full h-32 px-5 py-4 rounded-3xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-200 dark:border-white/10 focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue transition-all resize-none font-medium text-google-gray-700 dark:text-google-gray-300"
                    placeholder="Provide depth for your main headline..."
                    formControlName="subheadline"
                 ></textarea>
              </div>

              <div class="flex items-center gap-3 pt-6 border-t border-google-gray-100 dark:border-white/5">
                <zrd-button variant="primary" size="md" (click)="saveHero()" [disabled]="saving()">
                   @if (saving()) { <mat-icon class="animate-spin text-sm mr-1">sync</mat-icon> }
                   {{ saving() ? 'Committing...' : 'Commit Deployment' }}
                </zrd-button>
                <zrd-button variant="outline" size="md" (click)="editing.set(false)">Discard Changes</zrd-button>
              </div>
            </form>
          </div>
        }
      </zrd-card>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class HeroManagementComponent implements OnInit {
  private websiteService = inject(WEBSITECONTROLService);
  private fb = inject(FormBuilder);

  hero = signal<any>(null);
  editing = signal(false);
  loading = signal(false);
  saving = signal(false);

  heroForm = this.fb.group({
    id: [''],
    badge: ['', Validators.required],
    headline: ['', Validators.required],
    subheadline: ['', Validators.required],
    ctaText: ['', Validators.required],
  });

  ngOnInit() {
    this.loadHero();
  }

  loadHero() {
    this.loading.set(true);
    this.websiteService.getAdminWebsiteHeroslides().subscribe({
      next: (res: any) => {
        const slides = res?.data || [];
        if (slides.length > 0) {
          this.hero.set(slides[0]);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  startEditing() {
    const h = this.hero();
    if (h) {
      this.heroForm.patchValue({
        id: h.id,
        badge: h.badge,
        headline: h.headline,
        subheadline: h.subheadline,
        ctaText: h.ctaText
      });
    }
    this.editing.set(true);
  }

  saveHero() {
    if (this.heroForm.valid) {
      this.saving.set(true);
      const payload = this.heroForm.value;
      const id = payload.id;
      
      const obs = id 
        ? this.websiteService.putAdminWebsiteHeroslidesId(id, payload)
        : this.websiteService.postAdminWebsiteHeroslides(payload);

      obs.subscribe({
        next: (res: any) => {
          this.hero.set(res?.data);
          this.saving.set(false);
          this.editing.set(false);
        },
        error: () => this.saving.set(false)
      });
    }
  }
}
