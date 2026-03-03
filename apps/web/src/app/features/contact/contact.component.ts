import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Header -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-4">Establish Link</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase leading-none mb-8">
            Global <br/><span class="text-primary tracking-normal">Command Center</span>
          </h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            Connect with our support network or emergency coordinator. Our response unit is active 24/7 for critical orthopedic inquiries.
          </p>
        </div>
      </section>

      <section class="py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <!-- Form -->
            <div class="animate-in fade-in slide-in-from-left duration-1000">
               <h3 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-8">Transmission</h3>
               <form class="space-y-6">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <mat-form-field appearance="outline" class="w-full premium-field">
                     <mat-label class="uppercase font-black text-[10px] tracking-widest">Full Name</mat-label>
                     <input matInput placeholder="JOHN DOE" class="uppercase font-bold">
                   </mat-form-field>
                   <mat-form-field appearance="outline" class="w-full premium-field">
                     <mat-label class="uppercase font-black text-[10px] tracking-widest">Email Address</mat-label>
                     <input matInput placeholder="JOHN@DOMAIN.COM" class="uppercase font-bold">
                   </mat-form-field>
                 </div>
                 
                 <mat-form-field appearance="outline" class="w-full premium-field">
                   <mat-label class="uppercase font-black text-[10px] tracking-widest">Subject Protocol</mat-label>
                   <input matInput placeholder="E.G. SURGERY INQUIRY" class="uppercase font-bold">
                 </mat-form-field>

                 <mat-form-field appearance="outline" class="w-full premium-field">
                   <mat-label class="uppercase font-black text-[10px] tracking-widest">Message Segment</mat-label>
                   <textarea matInput rows="6" placeholder="DESCRIBE YOUR CONDITION..." class="uppercase font-bold"></textarea>
                 </mat-form-field>

                 <button mat-flat-button color="primary" class="h-16 px-12 rounded-2xl font-bold uppercase text-lg shadow-2xl shadow-primary/30 w-full md:w-auto">
                   Verify & Transmit
                 </button>
               </form>
            </div>

            <!-- Info -->
            <div class="space-y-12 animate-in fade-in slide-in-from-right duration-1000">
               @for (item of contactInfo; track item.label) {
                 <div class="flex gap-8 group">
                    <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                      <mat-icon>{{item.icon}}</mat-icon>
                    </div>
                    <div>
                      <h4 class="text-[10px] font-black text-secondary-400 uppercase tracking-widest mb-2">{{item.label}}</h4>
                      <p class="text-2xl font-black text-secondary-900 uppercase tracking-tight">{{item.value}}</p>
                    </div>
                 </div>
               }
               
               <div class="p-10 rounded-[40px] bg-secondary-900 text-white relative overflow-hidden">
                  <h4 class="text-xl font-black uppercase tracking-tight mb-4">Emergency Line</h4>
                  <p class="text-4xl font-black text-primary tracking-tighter mb-6">+1 (800) 911-ORTHO</p>
                  <p class="text-white/40 text-xs font-bold uppercase tracking-widest">Direct link to surgical response unit</p>
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
    { label: 'Clinical Hub', value: '42 PRECISION AVE, SECTOR 7, ORTHO CITY', icon: 'location_on' },
    { label: 'Email Channel', value: 'HQ@ORTHOSYNC.MED', icon: 'mail' },
    { label: 'Operation Hours', value: '24/7 CLINICAL AVAILABILITY', icon: 'schedule' },
  ];
}
