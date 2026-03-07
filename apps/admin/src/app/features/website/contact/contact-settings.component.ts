import { ZrdCardComponent } from '@ui/components';
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { WEBSITECONTROLService } from '../../../core/services/api/websitecontrol.service';

@Component({
  selector: 'app-contact-settings',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ZrdCardComponent, 
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Global Contact Configuration</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Update your primary phone, email, hospital location, and operating hours across the entire platform.</p>
        </div>
      </div>

      @if (loading()) {
        <div class="relative h-1 mb-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <zrd-card variant="default" class="p-8">
             <div class="flex items-center gap-3 mb-8 pb-4 border-b border-google-gray-200 dark:border-white/10">
               <div class="w-10 h-10 rounded-full bg-google-blue/10 flex items-center justify-center">
                  <mat-icon class="text-google-blue">contact_phone</mat-icon>
               </div>
               <h2 class="text-xl font-bold text-google-gray-900 dark:text-white">Primary Connect Details</h2>
             </div>

             <form [formGroup]="contactForm" class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div class="space-y-2">
                      <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Emergency Phone</label>
                      <div class="relative">
                         <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-google-gray-400 z-10 pointer-events-none">phone</mat-icon>
                         <input type="text" formControlName="contact_phone" placeholder="+8801885995293" 
                                class="w-full h-12 pl-12 pr-4 rounded-xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-200 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue text-google-gray-900 dark:text-white outline-none transition-all">
                      </div>
                   </div>
                   <div class="space-y-2">
                      <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Support Email</label>
                      <div class="relative">
                         <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-google-gray-400 z-10 pointer-events-none">mail</mat-icon>
                         <input type="email" formControlName="contact_email" placeholder="abrmc49@gmail.com" 
                                class="w-full h-12 pl-12 pr-4 rounded-xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-200 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue text-google-gray-900 dark:text-white outline-none transition-all">
                      </div>
                   </div>
                </div>

                <div class="space-y-2 pt-2">
                   <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Location & Address</label>
                   <div class="relative">
                      <mat-icon class="absolute left-4 top-4 text-google-gray-400 z-10 pointer-events-none">location_on</mat-icon>
                      <textarea formControlName="contact_address" 
                         class="w-full h-24 pl-12 pr-4 py-4 rounded-[20px] bg-google-gray-50 dark:bg-white/5 border border-google-gray-200 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all resize-none font-medium text-google-gray-900 dark:text-white outline-none block"
                         placeholder="Thana Mor, Saleha X-ray Clinic (Second Floor), Mirzapur, Tangail"
                      ></textarea>
                   </div>
                </div>
                
                <div class="space-y-2 pt-2">
                   <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Website URL</label>
                   <div class="relative">
                      <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-google-gray-400 z-10 pointer-events-none">language</mat-icon>
                      <input type="text" formControlName="contact_website" placeholder="www.orthopedicsurgeonrahman.com" 
                             class="w-full h-12 pl-12 pr-4 rounded-xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-200 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue text-google-gray-900 dark:text-white outline-none transition-all">
                   </div>
                </div>
             </form>
          </zrd-card>

          <zrd-card variant="default" class="p-8">
             <div class="flex items-center gap-3 mb-8 pb-4 border-b border-google-gray-200 dark:border-white/10">
               <div class="w-10 h-10 rounded-full bg-google-emerald/10 flex items-center justify-center">
                  <mat-icon class="text-google-emerald">schedule</mat-icon>
               </div>
               <h2 class="text-xl font-bold text-google-gray-900 dark:text-white">Operating Hours</h2>
             </div>
             
             <form [formGroup]="contactForm" class="space-y-6">
                <!-- Friday -->
                <div class="flex items-center gap-6 p-4 rounded-2xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-100 dark:border-white/5">
                   <div class="w-24 shrink-0 font-bold text-google-gray-700 dark:text-google-gray-300">Friday</div>
                   <input type="text" formControlName="hours_friday" placeholder="8:00 AM – 2:00 PM" 
                          class="flex-1 h-10 px-4 rounded-lg bg-white dark:bg-black/20 border border-google-gray-200 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none text-google-gray-900 dark:text-white">
                </div>
                <!-- Monday -->
                <div class="flex items-center gap-6 p-4 rounded-2xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-100 dark:border-white/5">
                   <div class="w-24 shrink-0 font-bold text-google-gray-700 dark:text-google-gray-300">Monday</div>
                   <input type="text" formControlName="hours_monday" placeholder="2:00 PM – 8:00 PM" 
                          class="flex-1 h-10 px-4 rounded-lg bg-white dark:bg-black/20 border border-google-gray-200 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none text-google-gray-900 dark:text-white">
                </div>
                <!-- Wednesday -->
                <div class="flex items-center gap-6 p-4 rounded-2xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-100 dark:border-white/5">
                   <div class="w-24 shrink-0 font-bold text-google-gray-700 dark:text-google-gray-300">Wednesday</div>
                   <input type="text" formControlName="hours_wednesday" placeholder="4:00 PM – 8:00 PM" 
                          class="flex-1 h-10 px-4 rounded-lg bg-white dark:bg-black/20 border border-google-gray-200 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none text-google-gray-900 dark:text-white">
                </div>
                <!-- Tuesday, Thursday -->
                <div class="flex flex-col sm:flex-row gap-6 p-4 rounded-2xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-100 dark:border-white/5 items-center">
                   <div class="w-full sm:w-24 shrink-0 font-bold text-google-gray-700 dark:text-google-gray-300">Other Days</div>
                   <input type="text" formControlName="hours_other" placeholder="Kumudini Hospital (8:00 AM – 2:30 PM)" 
                          class="w-full h-10 px-4 rounded-lg bg-white dark:bg-black/20 border border-google-gray-200 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none text-google-gray-900 dark:text-white">
                </div>
             </form>
          </zrd-card>
        </div>

        <!-- Sidebar Actions -->
        <div class="space-y-6">
          <zrd-card variant="default" class="p-6 sticky top-6">
             <h3 class="text-lg font-bold text-google-gray-900 dark:text-white mb-4">Propagation Status</h3>
             <p class="text-sm text-google-gray-500 mb-6 transition-all">
               Modifying contact records updates the Header, Footer, and Contact sections across the patient-facing web application.
             </p>
             
             <button type="button" class="w-full bg-google-blue hover:bg-google-blue/90 text-white font-bold h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50 shadow-md shadow-google-blue/20" (click)="saveContactSettings()" [disabled]="saving()">
                 @if (saving()) { <mat-icon class="animate-spin text-sm mr-2 w-4 h-4 leading-4 flex-shrink-0">sync</mat-icon> }
                 {{ saving() ? 'Syncing...' : 'Save Operations' }}
             </button>
             
             <button type="button" class="w-full mt-3 bg-transparent border border-google-gray-300 dark:border-white/20 hover:bg-google-gray-50 dark:hover:bg-white/5 text-google-gray-700 dark:text-white font-bold h-12 rounded-full transition-all" (click)="loadSettings()">
                Revert Changes
             </button>
          </zrd-card>
        </div>
      </div>

    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ContactSettingsComponent implements OnInit {
  private websiteService = inject(WEBSITECONTROLService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  loading = signal(false);
  saving = signal(false);

  contactForm: FormGroup = this.fb.group({
    contact_phone: [''],
    contact_email: [''],
    contact_address: [''],
    contact_website: [''],
    hours_friday: [''],
    hours_monday: [''],
    hours_wednesday: [''],
    hours_other: ['']
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
        
        settings.forEach((s: any) => {
          if (this.contactForm.controls[s.key]) {
            patchData[s.key] = s.value;
          }
        });
        
        this.contactForm.patchValue(patchData);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  saveContactSettings() {
    this.saving.set(true);
    const formVals = this.contactForm.value;
    
    // Convert object to {key, value} payload
    const payload = Object.keys(formVals).map(key => ({
      key: key,
      value: formVals[key] || ''
    }));

    this.websiteService.putAdminWebsiteSettings(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.snackBar.open('Contact configuration successfully synced to patient portal.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-emerald', 'text-white']
        });
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Unable to sync changes.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-red', 'text-white']
        });
      }
    });
  }
}
