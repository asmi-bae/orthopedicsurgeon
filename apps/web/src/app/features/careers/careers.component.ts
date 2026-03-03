import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatDividerModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatChipsModule
  ],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 class="text-xs font-black uppercase tracking-[0.5em] mb-4 text-white/60">Join the Collective</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase mb-8">Engineer the Future <br/>Of Orthopedic Care</h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            We are looking for visionary medical professionals, technologists, and clinical staff to assist in our mission of musculoskeletal excellence.
          </p>
        </div>
      </section>

      <!-- Openings -->
      <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-20 text-balance">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Current Vacancies</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">Clinical & Operational <br/>Positions</h3>
          </div>

          <div class="space-y-6">
            @for (job of vacancies; track job.title) {
              <mat-card class="p-8 rounded-[32px] border border-gray-100 shadow-none hover:shadow-2xl transition-all duration-500 bg-gray-50/30 group">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div class="flex-1">
                    <div class="flex items-center gap-4 mb-4">
                      <mat-chip class="premium-badge">{{job.department}}</mat-chip>
                      <span class="text-[10px] font-black text-secondary-400 uppercase tracking-widest">{{job.type}}</span>
                    </div>
                    <h4 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{{job.title}}</h4>
                    <div class="flex items-center gap-4 text-xs font-bold text-secondary-500 uppercase tracking-tight">
                      <div class="flex items-center gap-1">
                        <mat-icon class="scale-50">location_on</mat-icon>
                        <span>{{job.location}}</span>
                      </div>
                      <div class="w-1 h-1 rounded-full bg-gray-300"></div>
                      <span>Competitive Package</span>
                    </div>
                  </div>
                  <button mat-flat-button color="primary" class="h-14 px-10 rounded-xl font-bold uppercase shadow-xl shadow-primary/20">
                    Transmit Application
                  </button>
                </div>
              </mat-card>
            }
          </div>
        </div>
      </section>

      <!-- Application Form -->
      <section class="py-32 bg-secondary-900 text-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-20">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Express Interest</h2>
            <h3 class="text-5xl font-black tracking-tighter uppercase">General Application</h3>
          </div>

          <mat-card class="p-12 rounded-[40px] bg-white/5 border border-white/10 shadow-none">
            <form class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <mat-form-field appearance="outline" class="w-full white-field">
                <mat-label class="uppercase tracking-widest font-black text-[10px] text-white/40">Full Name</mat-label>
                <input matInput placeholder="JOHN DOE" class="uppercase font-bold text-white">
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full white-field">
                <mat-label class="uppercase tracking-widest font-black text-[10px] text-white/40">Email Protocol</mat-label>
                <input matInput placeholder="JOHN@DOMAIN.COM" class="uppercase font-bold text-white">
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full white-field">
                <mat-label class="uppercase tracking-widest font-black text-[10px] text-white/40">Specialization</mat-label>
                <mat-select class="uppercase font-bold text-white">
                  <mat-option value="medical">Medical / Clinical</mat-option>
                  <mat-option value="nursing">Nursing / Support</mat-option>
                  <mat-option value="admin">Administrative</mat-option>
                  <mat-option value="tech">Technology / Bio-engineering</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full white-field">
                <mat-label class="uppercase tracking-widest font-black text-[10px] text-white/40">Exp. Years</mat-label>
                <input matInput placeholder="E.G. 5" class="uppercase font-bold text-white">
              </mat-form-field>

              <div class="md:col-span-2">
                 <p class="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Brief Bio-Statement</p>
                 <mat-form-field appearance="outline" class="w-full white-field">
                   <textarea matInput rows="4" placeholder="TYPE YOUR MISSION STATEMENT..." class="uppercase font-bold text-white"></textarea>
                 </mat-form-field>
              </div>

              <div class="md:col-span-2 text-center">
                <button mat-flat-button color="primary" class="h-16 px-16 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/40">
                  Verify & Transmit
                </button>
              </div>
            </form>
          </mat-card>
        </div>
        <div class="absolute -right-40 -top-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-badge { background: #dcfce7 !important; color: #166534 !important; font-size: 8px !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; height: 26px !important; border: none !important; }
    .white-field ::ng-deep .mat-mdc-text-field-wrapper { background: rgba(255,255,255,0.05) !important; border-radius: 12px !important; }
  `]
})
export class CareersComponent {
  vacancies = [
    { title: 'Senior Orthopedic Surgeon', department: 'Surgical Dept', location: 'Main Hub', type: 'Full-Time' },
    { title: 'Lead Physical Therapist', department: 'Rehab Engine', location: 'Sector 4', type: 'Full-Time' },
    { title: 'Clinical Systems Engineer', department: 'Technology', location: 'Remote/Hybrid', type: 'Contract' },
    { title: 'Head of Pediatric Care', department: 'Pediatrics', location: 'Ortho City', type: 'Full-Time' },
  ];
}
