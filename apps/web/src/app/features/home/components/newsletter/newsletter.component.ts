import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-home-newsletter',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe
  ],
  template: `
    <section class="py-32 bg-primary relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">
       <!-- Top/Bottom Soft Transitions -->
       <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10 opacity-20"></div>
       <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 opacity-20"></div>
       
       <div class="app-container text-center text-white relative z-20">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-xs font-black uppercase tracking-[0.4em] mb-4 text-white/60">{{ 'HOME.NEWSLETTER.SUBTITLE' | translate }}</h2>
          <h3 class="text-5xl font-black tracking-tighter uppercase mb-10">{{ 'HOME.NEWSLETTER.TITLE' | translate }}</h3>
          
          <form class="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <mat-form-field appearance="outline" class="w-full sm:w-96 premium-form-field no-subscript-wrapper">
              <mat-label class="hidden">Email Address</mat-label>
              <input matInput [placeholder]="'HOME.NEWSLETTER.PLACEHOLDER' | translate" class="uppercase tracking-widest font-black text-[10px]">
              <mat-icon matSuffix class="text-white/40">mail</mat-icon>
            </mat-form-field>
            <button mat-flat-button class="h-[56px] px-10 rounded-xl bg-white text-primary font-bold uppercase text-lg shadow-2xl">
              {{ 'HOME.NEWSLETTER.ACTION' | translate }}
            </button>
          </form>
          <p class="mt-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{{ 'HOME.NEWSLETTER.SECURED' | translate }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .premium-form-field ::ng-deep .mat-mdc-text-field-wrapper { background: rgba(255,255,255,0.1) !important; border-radius: 12px !important; }
    .premium-form-field ::ng-deep .mdc-notched-outline__leading,
    .premium-form-field ::ng-deep .mdc-notched-outline__notch,
    .premium-form-field ::ng-deep .mdc-notched-outline__trailing { border-color: rgba(255,255,255,0.2) !important; }
    .premium-form-field ::ng-deep input { color: white !important; }
    .no-subscript-wrapper ::ng-deep .mat-mdc-form-field-subscript-wrapper { display: none; }
  `]
})
export class NewsletterComponent {}
