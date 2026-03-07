import { ZrdCardComponent, ZrdInputComponent } from '@ui/components';
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { WEBSITECONTROLService } from '../../../core/services/api/websitecontrol.service';

@Component({
  selector: 'app-about-editor',
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
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Biography & Identity</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage the Doctor's public profile, professional overview, and key statistics.</p>
        </div>
      </div>

      @if (loading()) {
        <div class="relative h-1 mb-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Editor Form Section -->
        <div class="lg:col-span-2 space-y-8">
          
          <zrd-card variant="default" class="p-8">
            <h2 class="text-xl font-bold text-google-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <mat-icon class="text-google-blue">account_circle</mat-icon>
               Doctor Persona
            </h2>
            
            <form [formGroup]="aboutForm" class="space-y-6">
              
              <!-- Profile Photo -->
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1 flex justify-between">
                  Primary Profile Portrait
                  @if (aboutForm.get('about_doctor_photo')?.value) {
                     <button type="button" class="text-google-red hover:underline normal-case tracking-normal" (click)="aboutForm.get('about_doctor_photo')?.setValue('')">Remove Image</button>
                  }
                </label>
                
                <div class="relative w-[200px] h-[250px] rounded-[24px] border-2 border-dashed border-google-gray-300 dark:border-white/10 hover:border-google-blue/50 transition-colors bg-google-gray-50 dark:bg-google-gray-900 overflow-hidden flex flex-col items-center justify-center group cursor-pointer"
                     (click)="fileInput.click()">
                  
                  <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
                  
                  @if (aboutForm.get('about_doctor_photo')?.value) {
                    <img [src]="aboutForm.get('about_doctor_photo')?.value" class="w-full h-full object-cover absolute z-0 inset-0">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <div class="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 text-sm shadow-xl shadow-black/20">
                        <mat-icon>upload</mat-icon> Replace
                      </div>
                    </div>
                  } @else {
                    <div class="w-14 h-14 rounded-full bg-google-gray-200 dark:bg-white/5 flex items-center justify-center mb-3 text-google-gray-400">
                      <mat-icon class="text-[28px] leading-7 w-7 h-7">face</mat-icon>
                    </div>
                    <span class="text-sm font-medium text-google-gray-700 dark:text-google-gray-300">Upload Portrait</span>
                  }
                </div>
              </div>

              <div class="space-y-2 pt-2">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Display Name & Credentials</label>
                 <zrd-input placeholder="e.g. Dr. Ab Rahman, MBBS, FCPS" formControlName="about_doctor_name"></zrd-input>
              </div>

              <!-- Content Editor (Rich Text placeholder) -->
              <div class="space-y-2 pt-2">
                 <div class="flex items-center justify-between mb-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Biography / About Me</label>
                    <div class="flex items-center gap-1 text-google-gray-400">
                       <button type="button" class="w-8 h-8 rounded shrink-0 hover:bg-google-gray-100 dark:hover:bg-white/5 flex items-center justify-center"><mat-icon class="text-[18px]">format_bold</mat-icon></button>
                       <button type="button" class="w-8 h-8 rounded shrink-0 hover:bg-google-gray-100 dark:hover:bg-white/5 flex items-center justify-center"><mat-icon class="text-[18px]">format_italic</mat-icon></button>
                       <button type="button" class="w-8 h-8 rounded shrink-0 hover:bg-google-gray-100 dark:hover:bg-white/5 flex items-center justify-center"><mat-icon class="text-[18px]">format_list_bulleted</mat-icon></button>
                    </div>
                 </div>
                 <textarea 
                    class="w-full h-48 px-5 py-4 rounded-[20px] bg-white dark:bg-transparent border border-google-gray-300 dark:border-white/10 hover:border-google-gray-400 focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all resize-y font-medium text-google-gray-900 dark:text-white outline-none shadow-sm shadow-black/5 leading-relaxed"
                    placeholder="Write a compelling biography covering education, sub-specialties, and patient care philosophy..."
                    formControlName="about_doctor_bio"
                 ></textarea>
              </div>
            </form>
          </zrd-card>

          <!-- Key Statistics Grid -->
          <zrd-card variant="default" class="p-8">
            <h2 class="text-xl font-bold text-google-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <mat-icon class="text-google-blue">bar_chart</mat-icon>
               Key Statistics Showcase
            </h2>
            
            <form [formGroup]="aboutForm" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1 flex items-center gap-2">
                    <mat-icon class="text-[16px]">verified</mat-icon>
                    Successful Operations
                  </label>
                  <zrd-input placeholder="e.g. 1000+" formControlName="about_successful_operations"></zrd-input>
               </div>
               
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1 flex items-center gap-2">
                    <mat-icon class="text-[16px]">work_history</mat-icon>
                    Years of Experience
                  </label>
                  <zrd-input placeholder="e.g. 15+" formControlName="about_experience_years"></zrd-input>
               </div>
               
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1 flex items-center gap-2">
                    <mat-icon class="text-[16px]">mood</mat-icon>
                    Happy Patients
                  </label>
                  <zrd-input placeholder="e.g. 5000+" formControlName="about_happy_patients"></zrd-input>
               </div>
            </form>
          </zrd-card>
          
        </div>

        <!-- Sidebar Actions Section -->
        <div class="space-y-6">
          <zrd-card variant="default" class="p-6 sticky top-6">
             <h3 class="text-lg font-bold text-google-gray-900 dark:text-white mb-4">Publish Profile</h3>
             <p class="text-sm text-google-gray-500 mb-6">Updates to the bio and statistics will reflect immediately on the patient-facing platform.</p>
             
             <button type="button" class="w-full bg-google-blue hover:bg-google-blue/90 text-white font-bold h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50 shadow-md shadow-google-blue/20" (click)="saveProfile()" [disabled]="saving()">
                 @if (saving()) { <mat-icon class="animate-spin text-sm mr-2 w-4 h-4 leading-4 flex-shrink-0">sync</mat-icon> }
                 {{ saving() ? 'Publishing...' : 'Publish Profile Updates' }}
             </button>
             
             <button type="button" class="w-full mt-3 bg-transparent border border-google-gray-300 dark:border-white/20 hover:bg-google-gray-50 dark:hover:bg-white/5 text-google-gray-700 dark:text-white font-bold h-12 rounded-full transition-all" (click)="loadProfile()">
                Discard Changes
             </button>
          </zrd-card>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class AboutEditorComponent implements OnInit {
  private websiteService = inject(WEBSITECONTROLService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  loading = signal(false);
  saving = signal(false);

  aboutForm: FormGroup = this.fb.group({
    about_doctor_photo: [''],
    about_doctor_name: [''],
    about_doctor_bio: [''],
    about_successful_operations: [''],
    about_experience_years: [''],
    about_happy_patients: ['']
  });

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading.set(true);
    this.websiteService.getAdminWebsiteSettings().subscribe({
      next: (res: any) => {
        const settings = res || [];
        const patchData: any = {};
        
        settings.forEach((s: any) => {
          if (this.aboutForm.controls[s.key]) {
            patchData[s.key] = s.value;
          }
        });
        
        this.aboutForm.patchValue(patchData);
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
        this.aboutForm.patchValue({ about_doctor_photo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    this.saving.set(true);
    const formVals = this.aboutForm.value;
    
    // Convert object back to array of {key, value}
    const payload = Object.keys(formVals).map(key => ({
      key: key,
      value: formVals[key] || ''
    }));

    this.websiteService.putAdminWebsiteSettings(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.snackBar.open('Doctor Profile and Statistics updated successfully.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-emerald', 'text-white']
        });
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Failed to update Doctor Profile.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-red', 'text-white']
        });
      }
    });
  }
}
