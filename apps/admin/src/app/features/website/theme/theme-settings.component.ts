import { ZrdCardComponent, ZrdInputComponent } from '@ui/components';
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { WEBSITECONTROLService } from '../../../core/services/api/websitecontrol.service';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ZrdCardComponent, 
    ZrdInputComponent,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Theme Identity Control</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage global brand colors, hospital logo, and SEO metadata.</p>
        </div>
      </div>

      @if (loading()) {
        <div class="relative h-1 mb-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Main Form Section -->
        <div class="lg:col-span-2 space-y-8">
          
          <zrd-card variant="default" class="p-6">
            <h2 class="text-xl font-bold text-google-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <mat-icon class="text-google-blue">palette</mat-icon>
               Brand Identity
            </h2>
            
            <form [formGroup]="themeForm" class="space-y-6">
              
              <!-- Logo Upload -->
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1 flex justify-between">
                  Hospital Logo
                  @if (themeForm.get('hospital_logo')?.value) {
                     <button type="button" class="text-google-red hover:underline normal-case tracking-normal" (click)="themeForm.get('hospital_logo')?.setValue('')">Remove Image</button>
                  }
                </label>
                
                <div class="relative w-full h-[140px] rounded-[16px] border-2 border-dashed border-google-gray-300 dark:border-white/10 hover:border-google-blue/50 transition-colors bg-google-gray-50 dark:bg-google-gray-900 overflow-hidden flex flex-col items-center justify-center group cursor-pointer"
                     (click)="fileInput.click()">
                  
                  <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
                  
                  @if (themeForm.get('hospital_logo')?.value) {
                    <img [src]="themeForm.get('hospital_logo')?.value" class="h-20 object-contain absolute z-0 m-auto inset-0">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <div class="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                        <mat-icon>upload</mat-icon> Replace Logo
                      </div>
                    </div>
                  } @else {
                    <div class="w-10 h-10 rounded-full bg-google-gray-200 dark:bg-white/5 flex items-center justify-center mb-2">
                      <mat-icon class="text-google-gray-500 dark:text-google-gray-400">add_photo_alternate</mat-icon>
                    </div>
                    <span class="text-sm font-medium text-google-gray-700 dark:text-google-gray-300">Upload Logo</span>
                  }
                </div>
              </div>

              <!-- Brand Color -->
              <div class="space-y-2 pt-4">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Primary Brand Color (Hex)</label>
                 <div class="flex gap-4 items-center">
                    <input type="color" formControlName="primary_brand_color" class="w-14 h-14 rounded-[12px] cursor-pointer border-0 p-0 shadow-sm">
                    <div class="flex-1">
                      <zrd-input placeholder="e.g. #1a73e8" formControlName="primary_brand_color"></zrd-input>
                    </div>
                 </div>
              </div>
            </form>
          </zrd-card>

          <zrd-card variant="default" class="p-6">
            <h2 class="text-xl font-bold text-google-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <mat-icon class="text-google-blue">search</mat-icon>
               SEO Metadata
            </h2>
            
            <form [formGroup]="themeForm" class="space-y-6">
              <div class="space-y-2">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Site Title</label>
                 <zrd-input placeholder="e.g. Dr. Ab Rahman - Orthopedic Surgeon" formControlName="seo_title"></zrd-input>
              </div>

              <div class="space-y-2">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Meta Description</label>
                 <textarea 
                    class="w-full h-24 px-5 py-3 rounded-[16px] bg-transparent border border-google-gray-300 dark:border-white/10 hover:border-google-gray-400 focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all resize-none font-medium text-google-gray-900 dark:text-white outline-none"
                    placeholder="Brief description of the clinic..."
                    formControlName="seo_description"
                 ></textarea>
              </div>
              
              <div class="space-y-2">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Meta Keywords</label>
                 <zrd-input placeholder="comma separated keywords..." formControlName="seo_keywords"></zrd-input>
              </div>
            </form>
          </zrd-card>
          
        </div>

        <!-- Sidebar Actions Section -->
        <div class="space-y-6">
          <zrd-card variant="default" class="p-6 sticky top-6">
             <h3 class="text-lg font-bold text-google-gray-900 dark:text-white mb-4">Publish Changes</h3>
             <p class="text-sm text-google-gray-500 mb-6">These settings affect the global appearance of the public website.</p>
             
             <button type="button" class="w-full bg-google-blue hover:bg-google-blue/90 text-white font-bold h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50" (click)="saveSettings()" [disabled]="saving()">
                 @if (saving()) { <mat-icon class="animate-spin text-sm mr-2 w-4 h-4 leading-4 flex-shrink-0">sync</mat-icon> }
                 {{ saving() ? 'Saving Configuration...' : 'Save All Settings' }}
             </button>
             
             <button type="button" class="w-full mt-3 bg-transparent border border-google-gray-300 dark:border-white/20 hover:bg-google-gray-50 dark:hover:bg-white/5 text-google-gray-700 dark:text-white font-bold h-12 rounded-full transition-all" (click)="loadSettings()">
                Revert to Saved
             </button>
          </zrd-card>
        </div>
        
      </div>

    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ThemeSettingsComponent implements OnInit {
  private websiteService = inject(WEBSITECONTROLService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  loading = signal(false);
  saving = signal(false);

  themeForm: FormGroup = this.fb.group({
    primary_brand_color: ['#1a73e8'],
    hospital_logo: [''],
    seo_title: [''],
    seo_description: [''],
    seo_keywords: ['']
  });

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.loading.set(true);
    this.websiteService.getAdminWebsiteSettings().subscribe({
      next: (res: any) => {
        const settings = res || [];
        const patchData: any = {};
        
        // Convert [{key: '...', value: '...'}] to object
        settings.forEach((s: any) => {
          if (this.themeForm.controls[s.key]) {
            patchData[s.key] = s.value;
          }
        });
        
        this.themeForm.patchValue(patchData);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.themeForm.patchValue({ hospital_logo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  saveSettings() {
    this.saving.set(true);
    const formVals = this.themeForm.value;
    
    // Convert object back to array of {key, value}
    const payload = Object.keys(formVals).map(key => ({
      key: key,
      value: formVals[key] || ''
    }));

    this.websiteService.putAdminWebsiteSettings(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.snackBar.open('Theme Identity Configuration Saved.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-emerald', 'text-white']
        });
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Failed to save configuration.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-red', 'text-white']
        });
      }
    });
  }
}
