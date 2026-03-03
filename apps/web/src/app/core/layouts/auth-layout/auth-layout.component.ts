import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatChipsModule],
  template: `
    <div class="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      <!-- Left: Form Container (50%) -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-10">
        <div class="w-full max-w-md">
           <!-- Logo -->
           <div class="flex items-center gap-4 mb-16 cursor-pointer group" routerLink="/">
              <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/20 transform group-hover:rotate-6 transition-transform">
                <span class="text-white font-black text-2xl">O</span>
              </div>
              <div class="flex flex-col">
                <span class="text-2xl font-black text-secondary-900 tracking-tighter uppercase">OrthoSync</span>
                <span class="text-[9px] font-bold text-primary uppercase tracking-[0.3em] leading-none mt-1">Strategic Hub</span>
              </div>
           </div>
           
           <div class="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <router-outlet></router-outlet>
           </div>

           <!-- Footer -->
           <div class="mt-20 pt-8 border-t border-gray-100 flex items-center justify-between">
              <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                © 2026 OrthoSync Precision
              </p>
              <div class="flex gap-4">
                 <a href="#" class="text-[9px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Privacy</a>
                 <a href="#" class="text-[9px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Terms</a>
              </div>
           </div>
        </div>
      </div>

      <!-- Right: Content/Image (50%) -->
      <div class="hidden lg:block w-1/2 relative bg-secondary-900 overflow-hidden">
        <img class="absolute inset-0 h-full w-full object-cover grayscale opacity-40 mix-blend-luminosity scale-110 hover:scale-100 transition-transform duration-[30s] ease-linear" 
             src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600" alt="Clinical Engineering">
        
        <div class="absolute inset-0 bg-gradient-to-br from-secondary-900/80 via-transparent to-primary/20"></div>
        
        <div class="absolute inset-0 flex items-center justify-center p-24 z-10 text-center lg:text-left">
           <div class="max-w-xl">
              <mat-chip class="premium-badge mb-10">Node ID: OS-GLOBAL-01</mat-chip>
              <h2 class="text-6xl font-black text-white mb-10 leading-[0.9] tracking-tighter uppercase">
                Better <span class="text-primary italic">Infrastructure</span> <br/>for Clinical Precision.
              </h2>
              <div class="h-1 w-20 bg-primary mb-10"></div>
              <p class="text-xl text-white/50 leading-relaxed font-medium mb-12">
                Log in to synchronize with our global network of orthopedic specialists and real-time biometric analysis hubs.
              </p>
              
              <div class="flex items-center gap-12 border-t border-white/10 pt-12">
                 <div>
                    <h4 class="text-3xl font-black text-white mb-2 tracking-tighter">99.9%</h4>
                    <p class="text-[10px] font-black text-primary uppercase tracking-widest">Uptime Precision</p>
                 </div>
                 <div>
                    <h4 class="text-3xl font-black text-white mb-2 tracking-tighter">SECURE</h4>
                    <p class="text-[10px] font-black text-primary uppercase tracking-widest">Encrypted Protocols</p>
                 </div>
              </div>
           </div>
        </div>
        
        <!-- Decorative Grid -->
        <div class="absolute inset-0 opacity-10 pointer-events-none" 
             style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 40px 40px;"></div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-badge { background: rgba(59, 130, 246, 0.2) !important; color: #60a5fa !important; border: 1px solid rgba(59, 130, 246, 0.3) !important; font-size: 10px !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.2em !important; height: 32px !important; padding: 0 16px !important; border-radius: 8px !important; display: inline-flex !important; align-items: center !important; }
  `]
})
export class AuthLayoutComponent {}
