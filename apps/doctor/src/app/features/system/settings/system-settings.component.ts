import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ZrdPageHeaderComponent, ZrdCardComponent, ZrdInputComponent, ZrdButtonComponent, ZrdSelectComponent, ZrdBadgeComponent, ZrdSelectItem } from '@ui/components';
import { DoctorWebsiteService } from '@core/services/api/doctor-website.service';

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, 
    MatDividerModule,
    MatSnackBarModule,
    ZrdPageHeaderComponent,
    ZrdCardComponent,
    ZrdInputComponent,
    ZrdButtonComponent,
    ZrdSelectComponent,
    ZrdBadgeComponent
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500 pb-20">
      
      <!-- Spartan Page Header -->
      <zrd-page-header 
        title="Administrative Registry" 
        subtitle="Global configuration of platform identity, cryptographic standards, and search engine resonance.">
        <div class="flex items-center gap-3">
           <zrd-badge *ngIf="settingsForm.dirty" variant="warning" size="md" class="animate-pulse">Pending Changes</zrd-badge>
           <zrd-button variant="primary" size="md" [disabled]="!settingsForm.dirty" (click)="saveSettings()">
             <mat-icon leftIcon class="text-[20px]">verified</mat-icon>
             Commit Registry
           </zrd-button>
        </div>
      </zrd-page-header>

      <form [formGroup]="settingsForm" class="space-y-8 max-w-5xl">
        
        <!-- Identity & Localization -->
        <zrd-card variant="default">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-google-blue/10 flex items-center justify-center">
              <mat-icon class="text-google-blue">fingerprint</mat-icon>
            </div>
            <div>
              <h4 class="font-bold text-lg text-google-gray-900 dark:text-white m-0">Platform Identity</h4>
              <p class="text-xs text-google-gray-500 uppercase tracking-widest font-bold mt-1">Core Branding & Regional Anchors</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <zrd-input 
              label="Application Nomenclature"
              formControlName="site_name"
              placeholder="e.g. Orthopedic Surgeon Hub"
              hint="The primary title identifier across the ecosystem"
            ></zrd-input>

            <zrd-input 
              label="Point of Contact"
              formControlName="contact_email"
              placeholder="support@example.com"
              hint="Global administrative email for system alerts"
            ></zrd-input>

            <zrd-select 
              label="Temporal Anchor (Timezone)"
              formControlName="timezone"
              [options]="timezoneOptions"
              hint="Standardizing event logs across regions"
            ></zrd-select>

            <zrd-select 
              label="Chronological Format"
              formControlName="date_format"
              [options]="dateFormatOptions"
            ></zrd-select>
          </div>
        </zrd-card>

        <!-- SEO Resonance -->
        <zrd-card variant="default">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-google-emerald/10 flex items-center justify-center">
              <mat-icon class="text-google-emerald">travel_explore</mat-icon>
            </div>
            <div>
              <h4 class="font-bold text-lg text-google-gray-900 dark:text-white m-0">Search Engine Resonance</h4>
              <p class="text-xs text-google-gray-500 uppercase tracking-widest font-bold mt-1">Global SEO Indices & Meta-Tags</p>
            </div>
          </div>

          <div class="space-y-8">
            <zrd-input 
              label="Global Narrative Summary"
              formControlName="meta_description"
              placeholder="Recommended: 150-160 characters"
              hint="Compelling summary for search engine results"
            ></zrd-input>
            
            <zrd-input 
              label="Semantic Key-Vectors"
              formControlName="meta_keywords"
              placeholder="orthopedic, surgeon, specialist, appointment"
              hint="Comma-separated tokens for algorithmic discovery"
            ></zrd-input>
          </div>
        </zrd-card>

        <!-- SMTP Relay Node -->
        <zrd-card variant="default">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-google-yellow/10 flex items-center justify-center">
                <mat-icon class="text-google-yellow-700">shuttle_dispatch</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-lg text-google-gray-900 dark:text-white m-0">Communication Relay</h4>
                <p class="text-xs text-google-gray-500 uppercase tracking-widest font-bold mt-1">SMTP Node & Dispatch Identity</p>
              </div>
            </div>
            <zrd-badge variant="success" [dot]="true">Relay Active</zrd-badge>
          </div>

          <div class="p-6 bg-google-gray-50 dark:bg-white/5 rounded-3xl border border-google-gray-100 dark:border-white/5 space-y-6">
            <div class="flex items-start gap-4">
               <div class="p-2 rounded-xl bg-google-blue/10 shrink-0">
                 <mat-icon class="text-google-blue text-sm">info</mat-icon>
               </div>
               <p class="text-xs text-google-gray-600 dark:text-google-gray-400 font-medium leading-relaxed">
                 SMTP cluster coordinates are currently immutable via UI and must be redefined in the persistent environment manifest for security compliance. Only the dispatch nickname is mutable below.
               </p>
            </div>

            <zrd-input 
              label="Dispatch Nickname"
              formControlName="mail_from_name"
              placeholder="Dr. Shoaib's Clinic"
              hint="The 'From' identity perceived by recipients"
            ></zrd-input>
          </div>
        </zrd-card>

        <!-- Threat Awareness -->
        <div class="p-8 rounded-3xl border border-google-yellow-100 bg-google-yellow-50/50 flex items-start gap-4">
          <mat-icon class="text-google-yellow-700">security_update_warning</mat-icon>
          <div>
            <h4 class="font-bold text-google-yellow-900 m-0">Governance Protocol Warning</h4>
            <p class="text-sm text-google-yellow-800/80 mt-1 leading-relaxed">
              Modifying registry values can impact cross-module synchronization. High-level security thresholds and system-level circuit breakers are exclusively governed within the <strong>API Command Center</strong>.
            </p>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class SystemSettingsComponent implements OnInit {
  private websiteControlService = inject(DoctorWebsiteService);
  private snackBar = inject(MatSnackBar);

  settingsForm = new UntypedFormGroup({
    site_name: new UntypedFormControl('', [Validators.required]),
    contact_email: new UntypedFormControl('', [Validators.required, Validators.email]),
    timezone: new UntypedFormControl('Asia/Dhaka'),
    date_format: new UntypedFormControl('DD/MM/YYYY'),
    meta_description: new UntypedFormControl(''),
    meta_keywords: new UntypedFormControl(''),
    mail_from_name: new UntypedFormControl('')
  });

  timezoneOptions: ZrdSelectItem[] = [
    { label: 'UTC (Greenwich Mean Time)', value: 'UTC' },
    { label: 'GMT+06:00 (Bangladesh)', value: 'Asia/Dhaka' },
    { label: 'GMT-05:00 (New York)', value: 'America/New_York' }
  ];

  dateFormatOptions: ZrdSelectItem[] = [
    { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
  ];

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.websiteControlService.getSettings().subscribe({
      next: (settings: any[]) => {
        const formValues: any = {};
        settings.forEach(s => {
          if (this.settingsForm.contains(s.key)) {
            formValues[s.key] = s.value;
          }
        });
        this.settingsForm.patchValue(formValues);
        this.settingsForm.markAsPristine();
      },
      error: () => {
        this.snackBar.open('Error loading settings', 'Close', { duration: 3000 });
      }
    });
  }

  saveSettings() {
    if (this.settingsForm.invalid) return;

    const payload = Object.keys(this.settingsForm.value).map(key => ({
      key,
      value: this.settingsForm.value[key]
    }));

    this.websiteControlService.updateSettings(payload).subscribe({
      next: () => {
        this.snackBar.open('Registry updated successfully', 'OK', { duration: 3000 });
        this.settingsForm.markAsPristine();
      },
      error: () => {
        this.snackBar.open('Error committing registry changes', 'Dismiss', { duration: 3000 });
      }
    });
  }
}
