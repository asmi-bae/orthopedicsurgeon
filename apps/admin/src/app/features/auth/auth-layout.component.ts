import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div class="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">
      <!-- Left Side: Image -->
      <div class="hidden lg:flex flex-1 relative bg-slate-100">
        <img src="assets/images/auth-bg.png" alt="Precision Orthopedics" class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-primary-900/20 backdrop-blur-[1px]"></div>
        <div class="absolute inset-0 flex flex-col justify-center items-end p-10 lg:p-40 text-right text-white z-10 transition-all duration-500">
          <h1 class="text-7xl lg:text-[11rem] font-black mb-8 tracking-tighter leading-[0.8] uppercase drop-shadow-2xl select-none">
            Admin<br/><span class="text-primary-400">Portal</span>
          </h1>
          <p class="text-2xl lg:text-5xl opacity-90 max-w-4xl leading-tight font-extralight italic drop-shadow-xl">
            Advanced Management Interface for Orthopedic Surgeons & Clinical Excellence.
          </p>
        </div>
      </div>

      <!-- Right Side: Form Content -->
      <div class="w-full lg:w-[450px] flex items-center justify-center p-6 bg-slate-50 min-h-screen">
        <div class="w-full">
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
