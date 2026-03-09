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
      <div class="hidden lg:flex lg:w-1/2 relative bg-slate-100">
        <img src="assets/images/auth-bg.png" alt="Precision Orthopedics" class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-primary-900/10 backdrop-blur-[1px]"></div>
        <!-- Blurry End Transition -->
        <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-white pointer-events-none"></div>
        <div class="absolute inset-0 flex flex-col justify-end p-16 text-white bg-gradient-to-t from-slate-900/60 to-transparent">
          <h1 class="text-5xl font-bold mb-4 tracking-tight">Doctor Portal</h1>
          <p class="text-xl opacity-90 max-w-lg leading-relaxed font-light">
            Advanced Management Interface for Orthopedic Surgeons & Clinical Excellence.
          </p>
        </div>
      </div>

      <!-- Right Side: Form Content -->
      <div class="flex-1 flex items-center justify-center p-8 sm:p-16 bg-white overflow-y-auto">
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
