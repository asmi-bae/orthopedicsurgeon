import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PublicApiService } from '@core/services/public-api.service';
import { Doctor } from '@repo/types';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-4">The Collective</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase leading-none mb-8">
            Expert <br/><span class="text-primary">Clinical Specialists</span>
          </h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            Our medical board consists of internationally recognized specialists dedicated to precision musculoskeletal restoration and advanced clinical outcomes.
          </p>
        </div>
        <div class="absolute right-0 top-0 w-1/3 h-full bg-primary/5 -skew-x-12"></div>
      </section>

      <!-- Search & Filter Bar -->
      <section class="py-12 bg-white border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div class="flex flex-col md:flex-row gap-6 items-center justify-between">
              <mat-form-field appearance="outline" class="w-full md:w-96 premium-search">
                <mat-label class="uppercase tracking-widest font-black text-[10px]">Search Specialists</mat-label>
                <input matInput placeholder="E.G. DR. WILSON" class="uppercase font-bold">
                <mat-icon matSuffix>search</mat-icon>
              </mat-form-field>

              <div class="flex gap-3">
                 <button mat-stroked-button class="h-12 px-6 rounded-xl border-gray-200 font-bold uppercase text-[10px] tracking-widest">All Specialties</button>
                 <button mat-stroked-button class="h-12 px-6 rounded-xl border-gray-200 font-bold uppercase text-[10px] tracking-widest">Available Today</button>
              </div>
           </div>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          @for (doctor of doctors(); track doctor.id) {
            <mat-card class="rounded-[40px] border border-gray-100 shadow-none overflow-hidden hover:shadow-2xl transition-all duration-700 bg-white group">
              <div class="h-80 relative overflow-hidden bg-gray-200">
                 <img [src]="'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800'" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                 <div class="absolute inset-0 bg-secondary-900/10"></div>
              </div>

              <div class="p-10">
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <h3 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-2">Dr. {{ doctor.user.firstName }} {{ doctor.user.lastName }}</h3>
                    <div class="flex items-center gap-2 text-primary">
                      <mat-icon class="scale-75">workspace_premium</mat-icon>
                      <span class="text-[10px] font-black uppercase tracking-widest">{{ doctor.specialization }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <mat-icon class="text-amber-400 scale-75">star</mat-icon>
                    <span class="text-[10px] font-black">4.9</span>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2 mb-8">
                   <mat-chip class="premium-badge">15+ Yrs Exp</mat-chip>
                   <mat-chip class="premium-badge">Board Certified</mat-chip>
                </div>

                <mat-divider class="mb-8 opacity-50"></mat-divider>

                <div class="flex gap-4">
                  <button mat-flat-button color="primary" class="h-14 px-8 rounded-xl font-bold uppercase w-full shadow-xl shadow-primary/20">
                    Book Consultation
                  </button>
                </div>
              </div>
            </mat-card>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-badge { background: #f1f5f9 !important; color: #475569 !important; font-size: 8px !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; height: 26px !important; border: none !important; }
    .premium-search ::ng-deep .mat-mdc-text-field-wrapper { background: #f8fafc !important; border-radius: 12px !important; }
  `]
})
export class DoctorListComponent {
  private api = inject(PublicApiService);
  doctors = signal<Doctor[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.getDoctors().subscribe({
      next: (res) => {
        this.doctors.set(res.data.content);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
