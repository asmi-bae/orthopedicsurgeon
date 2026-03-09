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
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="absolute inset-0 flex flex-col justify-end p-16 text-white">
          <h1 class="text-5xl font-bold mb-4 tracking-tight">Doctor Portal</h1>
          <p class="text-xl opacity-90 max-w-lg leading-relaxed font-light">
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
