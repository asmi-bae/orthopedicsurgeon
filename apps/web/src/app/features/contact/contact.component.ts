import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, TranslatePipe],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Header -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="app-container relative z-10">
          <h1 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-4">{{ 'CONTACT.HERO.SUBTITLE' | translate }}</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase leading-none mb-8">
            {{ 'CONTACT.HERO.TITLE' | translate | slice:0:6 }} <br/><span class="text-primary tracking-normal">{{ 'CONTACT.HERO.TITLE' | translate | slice:6 }}</span>
          </h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            {{ 'CONTACT.HERO.DESCRIPTION' | translate }}
          </p>
        </div>
      </section>

      <section class="py-32">
        <div class="app-container">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <!-- Form -->
            <div class="animate-in fade-in slide-in-from-left duration-1000">
               <h3 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-8">{{ 'CONTACT.FORM.TITLE' | translate }}</h3>
               <form class="space-y-6">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <mat-form-field appearance="outline" class="w-full premium-field">
                     <mat-label class="uppercase font-black text-[10px] tracking-widest">{{ 'CONTACT.FORM.NAME' | translate }}</mat-label>
                     <input matInput [placeholder]="'CONTACT.FORM.NAME_PLACEHOLDER' | translate" class="uppercase font-bold">
                   </mat-form-field>
                   <mat-form-field appearance="outline" class="w-full premium-field">
                     <mat-label class="uppercase font-black text-[10px] tracking-widest">{{ 'CONTACT.FORM.EMAIL' | translate }}</mat-label>
                     <input matInput [placeholder]="'CONTACT.FORM.EMAIL_PLACEHOLDER' | translate" class="uppercase font-bold">
                   </mat-form-field>
                 </div>
                 
                 <mat-form-field appearance="outline" class="w-full premium-field">
                   <mat-label class="uppercase font-black text-[10px] tracking-widest">{{ 'CONTACT.FORM.SUBJECT' | translate }}</mat-label>
                   <input matInput [placeholder]="'CONTACT.FORM.SUBJECT_PLACEHOLDER' | translate" class="uppercase font-bold">
                 </mat-form-field>

                 <mat-form-field appearance="outline" class="w-full premium-field">
                   <mat-label class="uppercase font-black text-[10px] tracking-widest">{{ 'CONTACT.FORM.MESSAGE' | translate }}</mat-label>
                   <textarea matInput rows="6" [placeholder]="'CONTACT.FORM.MESSAGE_PLACEHOLDER' | translate" class="uppercase font-bold"></textarea>
                 </mat-form-field>

                 <button mat-flat-button color="primary" class="h-16 px-12 rounded-2xl font-bold uppercase text-lg shadow-2xl shadow-primary/30 w-full md:w-auto">
                   {{ 'CONTACT.FORM.SUBMIT' | translate }}
                 </button>
               </form>
            </div>

            <!-- Info -->
            <div class="space-y-12 animate-in fade-in slide-in-from-right duration-1000">
               @for (item of contactInfo; track item.labelKey) {
                 <div class="flex gap-8 group">
                    <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                      <mat-icon>{{item.icon}}</mat-icon>
                    </div>
                    <div>
                      <h4 class="text-[10px] font-black text-secondary-400 uppercase tracking-widest mb-2">{{ item.labelKey | translate }}</h4>
                      <p class="text-2xl font-black text-secondary-900 uppercase tracking-tight">{{item.value}}</p>
                    </div>
                 </div>
               }
               
               <div class="p-10 rounded-[40px] bg-secondary-900 text-white relative overflow-hidden">
                  <h4 class="text-xl font-black uppercase tracking-tight mb-4">{{ 'CONTACT.INFO.EMERGENCY' | translate }}</h4>
                  <p class="text-4xl font-black text-primary tracking-tighter mb-6">+880 1711 000000</p>
                  <p class="text-white/40 text-xs font-bold uppercase tracking-widest">{{ 'CONTACT.INFO.EMERGENCY_DESC' | translate }}</p>
                  <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-field ::ng-deep .mat-mdc-text-field-wrapper { background: #f8fafc !important; border-radius: 12px !important; }
  `]
})
export class ContactComponent {
  contactInfo = [
    { labelKey: 'CONTACT.INFO.HUB', value: 'DR. AB RAHMAN CLINIC, SECTOR 12, UTTARA, DHAKA', icon: 'location_on' },
    { labelKey: 'CONTACT.INFO.EMAIL', value: 'DR@ABRAHMAN.MED', icon: 'mail' },
    { labelKey: 'CONTACT.INFO.HOURS', value: 'SAT - THU: 4 PM - 9 PM', icon: 'schedule' },
  ];
}
