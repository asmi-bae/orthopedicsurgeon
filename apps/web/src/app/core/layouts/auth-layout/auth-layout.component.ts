import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, MatIconModule, MatButtonModule],
  template: `
    <div class="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      <!-- Left Side: Image/Branding -->
      <div class="hidden lg:flex flex-1 relative bg-slate-100">
        <img src="assets/images/login-bg.png" alt="Precision Orthopedics" class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-primary-900/10 backdrop-blur-[10px]"></div>
        <div class="absolute inset-0 flex flex-col justify-center items-end p-10 lg:p-40 text-right text-white z-10 transition-all duration-500">
          <h1 class="text-7xl lg:text-[11rem] font-black mb-8 tracking-tighter leading-[0.8]  drop-shadow-2xl select-none">
            Patient<br/><span class="text-primary-400">Portal</span>
          </h1>
          <p class="text-2xl lg:text-5xl opacity-90 max-w-4xl leading-tight font-extralight drop-shadow-xl">
            Your journey to recovery starts here. Secure access to your health records.
          </p>
        </div>
      </div>

      <!-- Right Side: Form Content -->
      <div class="w-full lg:w-[450px] flex items-center justify-center p-6 bg-slate-50 min-h-screen relative">
        <div class="absolute top-8 left-8 lg:left-12">
            <a routerLink="/" class="flex items-center gap-2 text-slate-400 hover:text-primary-600 transition-colors font-bold text-xs uppercase tracking-widest no-underline">
                <mat-icon class="!text-lg">arrow_back</mat-icon>
                Back to Website
            </a>
        </div>
        <div class="w-full max-w-md">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AuthLayoutComponent {}
