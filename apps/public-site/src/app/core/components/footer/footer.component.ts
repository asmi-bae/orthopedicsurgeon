import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-secondary-900 pt-20 pb-10 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 mb-6">
              <div class="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <span class="text-white font-bold text-xl">O</span>
              </div>
              <span class="text-xl font-bold tracking-tight">ORTHO<span class="text-primary-400">SYNC</span></span>
            </div>
            <p class="text-secondary-400 text-sm leading-relaxed">
              Leading the way in orthopedic excellence. We provide comprehensive bone and joint care with state-of-the-art technology.
            </p>
          </div>

          <div>
            <h4 class="font-bold mb-6 text-white uppercase text-xs tracking-widest">Platform</h4>
            <ul class="space-y-4 text-sm text-secondary-400">
              <li><a href="#" class="hover:text-primary-400 transition-colors">Find Doctors</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Hospital Network</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Telemedicine</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Book Appointment</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-6 text-white uppercase text-xs tracking-widest">Support</h4>
            <ul class="space-y-4 text-sm text-secondary-400">
              <li><a href="#" class="hover:text-primary-400 transition-colors">Patient Help</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-6 text-white uppercase text-xs tracking-widest">Newsletter</h4>
            <p class="text-xs text-secondary-400 mb-4">Stay updated with latest health tips and orthopedic news.</p>
            <div class="flex gap-2">
              <input type="email" placeholder="Email address" class="bg-secondary-800 border-none rounded-lg text-sm px-4 py-2 w-full focus:ring-1 focus:ring-primary-500" />
              <button class="bg-primary-600 p-2 rounded-lg hover:bg-primary-700 transition-colors">
                 <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-secondary-500">© 2024 OrthoSync Platform. All rights reserved.</p>
          <div class="flex gap-6">
             <i class="pi pi-twitter text-secondary-500 hover:text-white cursor-pointer transition-colors"></i>
             <i class="pi pi-facebook text-secondary-500 hover:text-white cursor-pointer transition-colors"></i>
             <i class="pi pi-linkedin text-secondary-500 hover:text-white cursor-pointer transition-colors"></i>
             <i class="pi pi-instagram text-secondary-500 hover:text-white cursor-pointer transition-colors"></i>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
