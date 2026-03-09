import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-home-contact-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <section class="py-24 bg-soft-blue relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">
      <div class="app-container relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Contact Info -->
          <div class="animate-in fade-in slide-in-from-left duration-700">
            <div class="inline-flex items-center gap-3 mb-6">
              <div class="w-12 h-[1px] bg-primary"></div>
              <span class="text-[10px] font-black text-primary tracking-[0.4em] uppercase">{{ 'HOME.CONTACT.TITLE' | translate }}</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-secondary-900 tracking-tighter uppercase mb-6">
              {{ 'HOME.CONTACT.DETAILS' | translate }}
            </h2>
            
            <div class="space-y-8 mt-12">
              <div class="flex items-start gap-6">
                <div class="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                  <mat-icon>location_on</mat-icon>
                </div>
                <div>
                  <h4 class="text-xs font-black text-secondary-400 uppercase tracking-widest mb-1">{{ 'HOME.CONTACT.DETAILS' | translate }}</h4>
                  <p class="text-lg font-bold text-secondary-900 leading-tight">Popular Diagnostic Center (Unit 02),<br/>House 15, Road 07, Sector 04,<br/>Uttara, Dhaka</p>
                </div>
              </div>

              <div class="flex items-start gap-6">
                <div class="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                  <mat-icon>schedule</mat-icon>
                </div>
                <div>
                  <h4 class="text-xs font-black text-secondary-400 uppercase tracking-widest mb-1">{{ 'NAV.DROPDOWN.CONTACT.HOURS' | translate }}</h4>
                  <p class="text-lg font-bold text-secondary-900 leading-tight">Everyday: 5:00 PM – 9:00 PM</p>
                </div>
              </div>

              <div class="flex items-start gap-6">
                <div class="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                  <mat-icon>phone</mat-icon>
                </div>
                <div>
                   <h4 class="text-xs font-black text-secondary-400 uppercase tracking-widest mb-1">CALL NOW</h4>
                   <p class="text-lg font-bold text-secondary-900 leading-tight">+880 1711-123456</p>
                </div>
              </div>
            </div>

            <div class="mt-12 flex flex-wrap gap-4">
               <a mat-flat-button color="primary" href="https://goo.gl/maps/placeholder" target="_blank" class="h-16 px-10 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/30">
                  GET DIRECTIONS
                  <mat-icon class="ml-2">directions</mat-icon>
               </a>
            </div>
          </div>

          <!-- Map Placeholder / Embed -->
          <div class="animate-in fade-in slide-in-from-right duration-700">
             <div class="aspect-square lg:aspect-video rounded-[40px] overflow-hidden bg-white border-8 border-white shadow-2xl relative group">
                <!-- Replace with actual Google Maps Iframe if needed -->
                <div class="absolute inset-0 bg-slate-100 flex items-center justify-center">
                   <div class="text-center">
                      <mat-icon class="text-6xl text-secondary-200 mb-4">map</mat-icon>
                      <p class="text-xs font-bold text-secondary-400 uppercase tracking-[0.3em]">Interactive Map Placeholder</p>
                   </div>
                </div>
                <!-- Glass Overlay -->
                <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
             </div>
          </div>
        </div>
      </div>
      
      <!-- Design Elements -->
      <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ContactPreviewComponent {}
