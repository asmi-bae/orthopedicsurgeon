import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  template: `
    <div class="min-h-screen bg-gray-50 pt-32 pb-20">
      <!-- Header -->
      <section class="relative py-24 bg-white overflow-hidden border-b border-gray-100">
        <div class="app-container relative z-10">
            <div class="max-w-4xl">
                <h3 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-6">MY SPECIALTY</h3>
                <h4 class="text-5xl font-black text-secondary-900 uppercase tracking-tight mb-8">Specialized Orthopedic <br/>Services</h4>
                <p class="text-lg text-secondary-600 font-medium leading-relaxed max-w-2xl">
                  Providing cutting-edge musculoskeletal care with a focus on precision, technology, and patient recovery.
                </p>
            </div>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="py-24 bg-white">
        <div class="app-container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <mat-card *ngFor="let service of services" class="p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div class="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <mat-icon>{{service.icon}}</mat-icon>
              </div>
              <h5 class="text-xl font-black text-secondary-900 uppercase tracking-tight mb-4">{{service.name}}</h5>
              <p class="text-secondary-600 text-sm font-medium leading-relaxed mb-8">
                {{service.description}}
              </p>
              <div class="mt-auto">
                <mat-divider class="mb-6 opacity-30"></mat-divider>
                <a mat-button color="primary" class="font-bold px-0 uppercase tracking-widest text-xs">Learn More <mat-icon class="ml-2">east</mat-icon></a>
              </div>
            </mat-card>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ServicesComponent {
  private translation = inject(TranslationService);

  services = [
    { name: 'Knee Replacement', description: 'Advanced minimally invasive knee replacement using robotic precision for faster recovery.', icon: 'rebase_edit' },
    { name: 'Hip Replacement', description: 'Specialized hip revision and primary replacement techniques for life-long mobility.', icon: 'accessibility_new' },
    { name: 'Sports Medicine', description: 'Comprehensive care for athletes including ACL reconstruction and meniscus repairs.', icon: 'sports_scores' },
    { name: 'Spine Surgery', description: 'Precision spinal procedures for disc issues, scoliosis, and chronic back pain management.', icon: 'accessibility' },
    { name: 'Trauma Care', description: 'Fracture management and complex trauma reconstruction with expert surgical care.', icon: 'healing' },
    { name: 'Pediatric Ortho', description: 'Gentle and specialized orthopedic care tailored for children and adolescents.', icon: 'child_care' }
  ];
}
