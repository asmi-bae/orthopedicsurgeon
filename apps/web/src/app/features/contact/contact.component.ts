import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatCardModule, 
    TranslatePipe
  ],
  template: `
    <div class="bg-white min-h-screen pt-24">
      <!-- Header Section -->
      <section class="relative py-32 bg-secondary-900 overflow-hidden text-white -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12">
        <div class="app-container relative z-10">
          <div class="max-w-4xl">
            <h1 class="text-[10px] font-black text-primary uppercase tracking-[0.6em] mb-6 animate-in fade-in slide-in-from-bottom duration-700">{{ 'CONTACT.HERO.SUBTITLE' | translate }}</h1>
            <h2 class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom duration-1000">
              {{ 'CONTACT.HERO.TITLE' | translate }}
            </h2>
            <p class="text-xl text-white/50 max-w-2xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
              {{ 'CONTACT.HERO.DESCRIPTION' | translate }}
            </p>
          </div>
        </div>
        
        <!-- Decoration -->
        <div class="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div class="absolute -left-20 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
      </section>

      <!-- Contact Content Section -->
      <section class="py-32 relative z-20 -mt-20">
        <div class="app-container">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <!-- Information Panel (4 cols) -->
            <div class="lg:col-span-4 space-y-12 animate-in fade-in slide-in-from-left duration-1000">
               <div class="space-y-16">
                 @for (item of contactInfo; track item.labelKey) {
                   <div class="flex gap-8 group">
                      <div class="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                        <mat-icon class="scale-150">{{item.icon}}</mat-icon>
                      </div>
                      <div class="flex flex-col justify-center">
                        <h4 class="text-[10px] font-black text-secondary-400 uppercase tracking-[0.2em] mb-3">{{ item.labelKey | translate }}</h4>
                        <p class="text-xl font-black text-secondary-900 uppercase tracking-tight leading-tight">{{item.value}}</p>
                      </div>
                   </div>
                 }
               </div>

               <!-- Emergency Card -->
               <div class="p-12 rounded-[50px] bg-secondary-900 text-white relative overflow-hidden shadow-2xl">
                  <div class="relative z-10">
                    <h4 class="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6">{{ 'CONTACT.INFO.EMERGENCY' | translate }}</h4>
                    <p class="text-4xl font-black tracking-tighter mb-4 leading-none">+880 1711 123456</p>
                    <p class="text-white/40 text-[10px] font-bold uppercase tracking-widest">{{ 'CONTACT.INFO.EMERGENCY_DESC' | translate }}</p>
                  </div>
                  <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
               </div>

               <!-- Social Links -->
               <div class="pt-8">
                  <h4 class="text-[10px] font-black text-secondary-400 uppercase tracking-[0.4em] mb-8">Professional Networks</h4>
                  <div class="flex gap-4">
                     <a *ngFor="let social of socials" [href]="social.link" target="_blank" class="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-secondary-600 hover:bg-primary hover:text-white transition-all duration-300">
                        <mat-icon>{{social.icon}}</mat-icon>
                     </a>
                  </div>
               </div>
            </div>

            <!-- Form & Map Panel (8 cols) -->
            <div class="lg:col-span-8 space-y-16 animate-in fade-in slide-in-from-right duration-1000">
               
               <!-- Contact Form Card -->
               <div class="bg-white p-12 md:p-16 rounded-[60px] shadow-2xl border border-gray-100">
                  <h3 class="text-3xl font-black text-secondary-900 uppercase tracking-tighter mb-12">{{ 'CONTACT.FORM.TITLE' | translate }}</h3>
                  
                  <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-8 text-secondary-900">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-widest ml-4">{{ 'CONTACT.FORM.NAME' | translate }}</label>
                        <input formControlName="name" class="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" [placeholder]="'CONTACT.FORM.NAME_PLACEHOLDER' | translate">
                      </div>
                      <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-widest ml-4">{{ 'CONTACT.FORM.EMAIL' | translate }}</label>
                        <input formControlName="email" type="email" class="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" [placeholder]="'CONTACT.FORM.EMAIL_PLACEHOLDER' | translate">
                      </div>
                    </div>
                    
                    <div class="space-y-2">
                      <label class="text-[10px] font-black uppercase tracking-widest ml-4">{{ 'CONTACT.FORM.SUBJECT' | translate }}</label>
                      <input formControlName="subject" class="w-full h-16 px-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" [placeholder]="'CONTACT.FORM.SUBJECT_PLACEHOLDER' | translate">
                    </div>

                    <div class="space-y-2">
                      <label class="text-[10px] font-black uppercase tracking-widest ml-4">{{ 'CONTACT.FORM.MESSAGE' | translate }}</label>
                      <textarea formControlName="message" rows="6" class="w-full p-8 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" [placeholder]="'CONTACT.FORM.MESSAGE_PLACEHOLDER' | translate"></textarea>
                    </div>

                    <button type="submit" [disabled]="contactForm.invalid || submitting" mat-flat-button color="primary" class="h-20 px-16 rounded-[28px] font-black uppercase tracking-widest shadow-2xl shadow-primary/40 group relative overflow-hidden">
                      <span class="relative z-10">{{ 'CONTACT.FORM.SUBMIT' | translate }}</span>
                      <mat-icon class="ml-4 relative z-10 group-hover:translate-x-2 transition-transform">send</mat-icon>
                      <div class="absolute inset-0 bg-secondary-900 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </button>
                  </form>
               </div>

               <!-- Interactive Map Placeholder -->
               <div class="relative rounded-[60px] overflow-hidden group shadow-2xl h-[500px]">
                  <div class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                     <div class="text-center">
                        <mat-icon class="scale-[4] text-gray-400 mb-8">map</mat-icon>
                        <p class="text-gray-500 font-black uppercase tracking-widest">{{ 'CONTACT.INFO.MAP_TITLE' | translate }}</p>
                     </div>
                  </div>
                  <!-- Map Overlay UI -->
                  <div class="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent p-12 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                     <div class="max-w-md">
                        <h4 class="text-2xl font-black text-white uppercase tracking-tighter mb-4">{{ 'CONTACT.INFO.HUB' | translate }}</h4>
                        <p class="text-white/70 font-medium mb-8">Sector 12, Uttara, Dhaka-1230, Bangladesh</p>
                        <a mat-flat-button color="primary" class="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs" href="https://maps.google.com" target="_blank">
                          {{ 'CONTACT.INFO.GET_DIRECTIONS' | translate }}
                        </a>
                     </div>
                  </div>
               </div>

            </div>
          </div>
        </div>
      </section>

      <!-- Success Overlay -->
      <div *ngIf="submitted" class="fixed inset-0 z-[100] flex items-center justify-center bg-secondary-900/90 backdrop-blur-md animate-in fade-in duration-500">
         <div class="bg-white rounded-[50px] p-16 max-w-lg w-full text-center shadow-2xl animate-in zoom-in-95 duration-500">
            <div class="w-24 h-24 bg-primary/10 text-primary rounded-[32px] flex items-center justify-center mx-auto mb-8">
               <mat-icon class="scale-[3]">check_circle</mat-icon>
            </div>
            <h2 class="text-4xl font-black text-secondary-900 uppercase tracking-tighter mb-4">Message Sent!</h2>
            <p class="text-secondary-500 text-lg font-medium mb-12">Thank you for reaching out. We will get back to you shortly.</p>
            <button mat-flat-button color="primary" class="w-full h-16 rounded-[24px] uppercase font-black tracking-widest text-sm" (click)="submitted = false">Close</button>
         </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  
  submitting = false;
  submitted = false;

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  contactInfo = [
    { labelKey: 'CONTACT.INFO.HUB', value: 'SECTOR 12, UTTARA, DHAKA', icon: 'location_on' },
    { labelKey: 'CONTACT.INFO.DETAILS', value: 'DR@ABRAHMAN.MED', icon: 'mail' },
    { labelKey: 'CONTACT.INFO.HOURS', value: 'SAT - THU: 4 PM - 9 PM', icon: 'schedule' },
  ];

  socials = [
    { icon: 'facebook', link: '#' },
    { icon: 'linkedin', link: '#' },
    { icon: 'share', link: '#' }
  ];

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitting = true;
      // Simulate API call
      setTimeout(() => {
        this.submitting = false;
        this.submitted = true;
        this.contactForm.reset();
      }, 1500);
    }
  }
}
