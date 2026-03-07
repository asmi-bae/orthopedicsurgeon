import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent, ZrdBadgeComponent } from '@ui/components';
import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
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
    MatProgressBarModule,
    MatSnackBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Hero Slider Block</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Configure the primary gateway experience on the public homepage.</p>
        </div>
        <div class="flex items-center gap-3">
          @if (!editing()) {
            <zrd-button variant="primary" size="md" (click)="startEditing()">
              <mat-icon leftIcon class="text-[20px]">add_photo_alternate</mat-icon>
              New Gateway
            </zrd-button>
          }
        </div>
      </div>

      @if (loading()) {
        <div class="relative h-1 mb-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      <!-- Slide Navigation Strip -->
      <div class="flex items-center gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
        @for (h of heros(); track h.id) {
          <div 
            (click)="selectHero(h.id)"
            class="min-w-[200px] h-24 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group"
            [ngClass]="selectedHeroId() === h.id ? 'border-google-blue bg-google-blue/5' : 'border-google-gray-100 dark:border-white/5 bg-white dark:bg-white/5 hover:border-google-gray-300'"
          >
            @if (h.imageUrl) {
              <img [src]="h.imageUrl" class="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity">
            }
            <div class="absolute inset-0 p-4 flex flex-col justify-between">
              <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400 group-hover:text-google-blue">Slide #{{ h.displayOrder }}</span>
              <h4 class="text-xs font-bold truncate text-google-gray-900 dark:text-white">{{ h.title }}</h4>
            </div>
            @if (!h.isActive) {
              <div class="absolute top-2 right-2 w-2 h-2 rounded-full bg-google-gray-400"></div>
            } @else {
              <div class="absolute top-2 right-2 w-2 h-2 rounded-full bg-google-emerald animate-pulse"></div>
            }
          </div>
        }
      </div>

      <!-- Gateway Preview / Editor Card -->
      <zrd-card variant="default">
        @if (!editing()) {
          <!-- High-Fidelity Preview Interface -->
          @if (selectedHero()) {
            <div class="relative rounded-[24px] overflow-hidden bg-google-gray-900 dark:bg-google-gray-900 min-h-[400px] border border-google-gray-800 flex items-center">
               
               <!-- Background Image -->
               @if (selectedHero()?.imageUrl) {
                 <div class="absolute inset-0">
                    <img [src]="selectedHero()?.imageUrl" alt="Hero Background" class="w-full h-full object-cover opacity-40">
                 </div>
               } @else {
                 <!-- Fallback Background Texture -->
                 <div class="absolute inset-0 opacity-10 pointer-events-none">
                    <div class="absolute inset-0 bg-gradient-to-tr from-google-blue to-google-emerald opacity-20"></div>
                 </div>
               }

               <!-- Gradient Overlay for Text Readability -->
               <div class="absolute inset-0 bg-gradient-to-r from-google-gray-900/90 via-google-gray-900/50 to-transparent"></div>

               <div class="relative z-10 max-w-2xl p-12">
                  @if(selectedHero()?.subtitle) {
                    <zrd-badge variant="info" class="font-black text-[10px] bg-google-blue/20 text-google-blue border-google-blue/30 px-3">
                       {{ selectedHero()?.subtitle }}
                    </zrd-badge>
                  }
                  
                  <h2 class="text-5xl font-black text-white mt-6 leading-[1.1] tracking-tighter">
                     {{ selectedHero()?.title }}
                  </h2>
                  
                  <p class="text-lg text-google-gray-300 mt-6 leading-relaxed font-medium">
                     {{ selectedHero()?.description }}
                  </p>
                  
                  <div class="flex items-center gap-4 mt-10">
                     <button class="bg-google-blue hover:bg-google-blue/90 text-white font-bold py-3 px-8 rounded-full shadow-xl shadow-google-blue/20 transition-all">
                        {{ selectedHero()?.buttonText || 'Learn More' }}
                     </button>
                  </div>
               </div>

               <!-- Preview Status -->
               <div class="absolute top-6 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <div class="w-2 h-2 rounded-full" [ngClass]="selectedHero()?.isActive ? 'bg-google-emerald animate-pulse' : 'bg-google-gray-400'"></div>
                  <span class="text-[10px] font-black uppercase tracking-widest" [ngClass]="selectedHero()?.isActive ? 'text-google-emerald' : 'text-google-gray-400'">
                    {{ selectedHero()?.isActive ? 'Active Deployment' : 'Draft' }}
                  </span>
               </div>
            </div>

            <div class="flex items-center justify-between mt-8 px-2">
               <div class="flex items-center gap-8">
                  <div class="flex flex-col">
                    <span class="text-xs font-black uppercase tracking-widest text-google-gray-400">Order Priority</span>
                    <div class="flex items-center gap-2 mt-1">
                       <span class="text-sm font-bold text-google-gray-900 dark:text-white uppercase">{{ selectedHero()?.displayOrder }}</span>
                       <div class="flex items-center gap-1 ml-2">
                          <button (click)="moveHero(selectedHero(), 'up')" class="p-1 hover:bg-google-gray-100 dark:hover:bg-white/10 rounded">
                            <mat-icon class="text-sm scale-75">arrow_upward</mat-icon>
                          </button>
                          <button (click)="moveHero(selectedHero(), 'down')" class="p-1 hover:bg-google-gray-100 dark:hover:bg-white/10 rounded">
                            <mat-icon class="text-sm scale-75">arrow_downward</mat-icon>
                          </button>
                       </div>
                    </div>
                  </div>
               </div>
               <div class="flex items-center gap-3">
                  <zrd-button variant="outline" size="sm" (click)="startEditing(selectedHero())">Configuration</zrd-button>
                  <zrd-button variant="ghost" size="sm" class="text-google-red" (click)="deleteHero(selectedHero().id)">Purge</zrd-button>
               </div>
            </div>
          } @else if (!loading()) {
            <div class="py-24 text-center">
              <mat-icon class="text-google-gray-400 text-5xl mb-4">image</mat-icon>
              <h3 class="font-bold text-google-gray-900 dark:text-white">No Hero Slide Configured</h3>
              <p class="text-sm text-google-gray-500 mt-2">Initialize your gateway experience to start.</p>
              <zrd-button variant="primary" size="md" class="mt-6" (click)="startEditing()">Initialize Gateway</zrd-button>
            </div>
          }
        } @else {
          <!-- Configuration Interface -->
          <div class="max-w-4xl mx-auto py-4">
            <h2 class="text-xl font-black text-google-gray-900 dark:text-white mb-8 flex items-center gap-2 tracking-tight">
               <mat-icon class="text-google-blue">tune</mat-icon>
               Gateway Configuration Parameters
            </h2>
            
            <form [formGroup]="heroForm" class="space-y-6">
              
              <!-- Image Uploader Section -->
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1 flex justify-between">
                  Hero Background Image
                  @if (heroForm.get('imageUrl')?.value) {
                     <button type="button" class="text-google-red hover:underline normal-case tracking-normal" (click)="heroForm.get('imageUrl')?.setValue('')">Remove Image</button>
                  }
                </label>
                
                <div class="relative w-full h-[200px] rounded-[16px] border-2 border-dashed border-google-gray-300 dark:border-white/10 hover:border-google-blue/50 dark:hover:border-google-blue/50 transition-colors bg-google-gray-50 dark:bg-google-gray-900 overflow-hidden flex flex-col items-center justify-center group cursor-pointer"
                     (click)="fileInput.click()">
                  
                  <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
                  
                  @if (heroForm.get('imageUrl')?.value) {
                    <img [src]="heroForm.get('imageUrl')?.value" class="absolute inset-0 w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div class="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                        <mat-icon>upload</mat-icon> Change Image
                      </div>
                    </div>
                  } @else {
                    <div class="w-12 h-12 rounded-full bg-google-gray-200 dark:bg-white/5 flex items-center justify-center mb-3">
                      <mat-icon class="text-google-gray-500 dark:text-google-gray-400">add_photo_alternate</mat-icon>
                    </div>
                    <span class="text-sm font-medium text-google-gray-700 dark:text-google-gray-300">Click to upload background image</span>
                    <span class="text-xs text-google-gray-400 mt-1">Recommended size: 1920x1080px</span>
                  }
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Main Headline / Title</label>
                    <zrd-input placeholder="e.g. Expert Orthopedic Care" formControlName="title"></zrd-input>
                 </div>
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Subtitle / Badge text</label>
                    <zrd-input placeholder="e.g. Dr. Ab Rahman" formControlName="subtitle"></zrd-input>
                 </div>
              </div>

              <div class="space-y-2">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Description / Narrative</label>
                 <textarea 
                    class="w-full h-24 px-5 py-3 rounded-[16px] bg-transparent border border-google-gray-300 dark:border-white/10 hover:border-google-gray-400 focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all resize-none font-medium text-google-gray-900 dark:text-white outline-none"
                    placeholder="Provide depth for your main headline..."
                    formControlName="description"
                 ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Call to Action (Button) Text</label>
                    <zrd-input placeholder="e.g. Book Appointment" formControlName="buttonText"></zrd-input>
                 </div>
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Button Redirect Link</label>
                    <zrd-input placeholder="e.g. /book or https://..." formControlName="buttonLink"></zrd-input>
                 </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Display Order</label>
                    <input type="number" formControlName="displayOrder" class="w-full h-[48px] px-4 rounded-full bg-transparent border border-google-gray-300 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue text-google-gray-900 dark:text-white outline-none">
                 </div>
                 <div class="space-y-2 flex flex-col justify-center">
                    <label class="flex items-center gap-3 cursor-pointer mt-4">
                      <div class="relative">
                        <input type="checkbox" formControlName="isActive" class="sr-only">
                        <div class="block w-10 h-6 rounded-full transition-colors" [ngClass]="heroForm.get('isActive')?.value ? 'bg-google-blue' : 'bg-google-gray-300 dark:bg-google-gray-600'"></div>
                        <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" [ngClass]="heroForm.get('isActive')?.value ? 'translate-x-4' : 'translate-x-0'"></div>
                      </div>
                      <span class="text-sm font-bold text-google-gray-700 dark:text-gray-300">Set Active on Website</span>
                    </label>
                 </div>
              </div>

              <div class="flex items-center gap-3 pt-6 mt-6 border-t border-google-gray-200 dark:border-white/5">
                <button type="button" class="bg-google-blue hover:bg-google-blue/90 text-white font-bold h-10 px-6 rounded-full flex items-center justify-center transition-all disabled:opacity-50" (click)="saveHero()" [disabled]="saving() || heroForm.invalid">
                   @if (saving()) { <mat-icon class="animate-spin text-sm mr-2 w-4 h-4 leading-4 flex-shrink-0">sync</mat-icon> }
                   {{ saving() ? 'Committing...' : 'Commit Deployment' }}
                </button>
                <button type="button" class="bg-transparent border border-google-gray-300 dark:border-white/20 hover:bg-google-gray-50 dark:hover:bg-white/5 text-google-gray-700 dark:text-white font-bold h-10 px-6 rounded-full transition-all" (click)="cancelEdit()">Discard Changes</button>
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
  private snackBar = inject(MatSnackBar);

  heros = signal<any[]>([]);
  selectedHeroId = signal<string | null>(null);
  editing = signal(false);
  loading = signal(false);
  saving = signal(false);

  heroForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    subtitle: [''],
    description: ['', Validators.required],
    imageUrl: [''],
    buttonText: ['', Validators.required],
    buttonLink: [''],
    displayOrder: [0],
    isActive: [true]
  });

  selectedHero = computed(() => {
    const id = this.selectedHeroId();
    const list = this.heros();
    return list.find(h => h.id === id) || (list.length > 0 ? list[0] : null);
  });

  ngOnInit() {
    this.loadHeros();
  }

  loadHeros() {
    this.loading.set(true);
    this.websiteService.getAdminWebsiteHeroslides().subscribe({
      next: (res: any) => {
        const slides = (res?.data || res || []).sort((a: any, b: any) => a.displayOrder - b.displayOrder);
        this.heros.set(slides);
        if (slides.length > 0 && !this.selectedHeroId()) {
          this.selectedHeroId.set(slides[0].id);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  selectHero(id: string) {
    this.selectedHeroId.set(id);
    if (!this.editing()) {
      // Logic handled by computed signal
    }
  }

  startEditing(hero?: any) {
    const h = hero || this.selectedHero();
    if (h) {
      this.heroForm.patchValue({
        id: h.id,
        title: h.title,
        subtitle: h.subtitle,
        description: h.description,
        imageUrl: h.imageUrl,
        buttonText: h.buttonText,
        buttonLink: h.buttonLink,
        displayOrder: h.displayOrder,
        isActive: h.isActive
      });
    } else {
      this.heroForm.reset({ displayOrder: this.heros().length, isActive: true });
    }
    this.editing.set(true);
  }

  cancelEdit() {
    this.editing.set(false);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.heroForm.patchValue({ imageUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  saveHero() {
    if (this.heroForm.valid) {
      this.saving.set(true);
      const payload = this.heroForm.value;
      const id = payload.id;
      
      const obs = id 
        ? this.websiteService.putAdminWebsiteHeroslidesId(id as string, payload)
        : this.websiteService.postAdminWebsiteHeroslides(payload);

      obs.subscribe({
        next: (res: any) => {
          this.saving.set(false);
          this.editing.set(false);
          this.loadHeros();
          this.snackBar.open('Hero slide saved successfully.', 'Close', {
            duration: 3000,
            panelClass: ['bg-google-emerald', 'text-white']
          });
        },
        error: () => {
          this.saving.set(false);
          this.snackBar.open('Failed to save hero slide.', 'Close', {
            duration: 5000,
            panelClass: ['bg-google-red', 'text-white']
          });
        }
      });
    }
  }

  deleteHero(id: string) {
    if (confirm('Are you sure you want to delete this hero slide?')) {
      this.loading.set(true);
      this.websiteService.deleteAdminWebsiteHeroslidesId(id).subscribe({
        next: () => {
          this.selectedHeroId.set(null);
          this.loadHeros();
          this.snackBar.open('Hero slide deleted.', 'Close', { duration: 3000 });
        },
        error: () => this.loading.set(false)
      });
    }
  }

  moveHero(hero: any, direction: 'up' | 'down') {
    const list = [...this.heros()];
    const index = list.findIndex(h => h.id === hero.id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= list.length) return;

    // Swap displayOrder
    const targetHero = list[newIndex];
    const tempOrder = hero.displayOrder;
    hero.displayOrder = targetHero.displayOrder || newIndex;
    targetHero.displayOrder = tempOrder || index;

    // Batch update orders (in a real app, you might want a reorder endpoint)
    this.websiteService.putAdminWebsiteHeroslidesId(hero.id, hero).subscribe(() => {
      this.websiteService.putAdminWebsiteHeroslidesId(targetHero.id, targetHero).subscribe(() => {
        this.loadHeros();
      });
    });
  }
}
