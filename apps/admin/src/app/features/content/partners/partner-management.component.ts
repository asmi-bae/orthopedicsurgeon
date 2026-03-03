import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminApiService } from '@core/services/admin-api.service';

@Component({
  selector: 'app-partner-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  template: `
    <div class="space-y-10 animate-fade-in pb-24 px-2">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-cyan-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
            <mat-icon class="text-cyan-400 scale-[1.5]">handshake</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Affiliation Matrix</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Manage partner logos, corporate affiliations, and brand clusters</p>
            </div>
          </div>
        </div>
        <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
           Onboard Partner
        </button>
      </div>

      <mat-progress-bar *ngIf="loading()" mode="query" color="primary" class="h-1 rounded-full"></mat-progress-bar>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 animate-slide-up">
        <mat-card *ngFor="let partner of partners()" class="bg-white/[0.01] border border-white/5 rounded-[32px] glass overflow-hidden group hover:border-primary-500/30 transition-all duration-500 shadow-xl">
           <div class="h-40 flex items-center justify-center p-8 bg-white/[0.02] relative overflow-hidden">
              <div class="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 transition-colors duration-500"></div>
              <img [src]="partner.logoUrl" class="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 relative z-10" />
              
              <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0 z-20">
                 <button mat-icon-button (click)="deletePartner(partner.id)" class="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all rounded-xl">
                   <mat-icon class="scale-75">delete</mat-icon>
                 </button>
              </div>
           </div>
           
           <div class="p-6 border-t border-white/[0.03]">
              <p class="text-[10px] font-black text-white hover:text-primary-400 transition-colors uppercase tracking-widest mb-3 truncate italic">{{ partner.name }}</p>
              <div class="flex items-center justify-between">
                 <div class="flex items-center gap-2">
                    <span class="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Index Vector:</span>
                    <span class="text-[9px] font-black text-white italic">{{ partner.displayOrder }}</span>
                 </div>
                 <div class="flex items-center gap-2">
                    <span class="text-[7px] font-black text-white/20 uppercase tracking-[0.1em]">{{ partner.isActive ? 'ACTIVE' : 'OFFLINE' }}</span>
                    <div [class]="partner.isActive ? 'bg-green-500 shadow-green-500/50' : 'bg-white/10'" class="w-2 h-2 rounded-full shadow-lg"></div>
                 </div>
              </div>
           </div>
        </mat-card>
        
        <div *ngIf="partners().length === 0 && !loading()" class="col-span-full py-48 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-[40px] animate-pulse">
           <mat-icon class="text-white/5 scale-[5] mb-14">handshake</mat-icon>
           <p class="text-white/20 font-black uppercase tracking-[0.6em] text-[10px]">No affiliations detected in matrix</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .glass { backdrop-filter: blur(40px); }
  `]
})
export class PartnerManagementComponent implements OnInit {
  private api = inject(AdminApiService);
  
  partners = signal<any[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadPartners();
  }

  loadPartners() {
    this.loading.set(true);
    this.api.getPartners().subscribe({
      next: (res) => {
        this.partners.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load partners', err);
        this.loading.set(false);
      }
    });
  }

  deletePartner(id: string) {
    if (confirm('Disconnect partner affiliation?')) {
      this.api.deletePartner(id).subscribe(() => this.loadPartners());
    }
  }
}
