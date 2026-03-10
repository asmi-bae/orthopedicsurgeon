import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ZrdCardComponent, ZrdButtonComponent } from '@ui/components';

@Component({
  selector: 'app-feature-placeholder',
  standalone: true,
  imports: [CommonModule, MatIconModule, ZrdCardComponent, ZrdButtonComponent],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">{{ title }}</h1>
          <p class="text-google-gray-600 dark:text-google-gray-400 mt-1">This module is part of the Dr. Rahman Portal and is currently being updated.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">refresh</mat-icon>
          Update Status
        </zrd-button>
      </div>

      <zrd-card variant="elevated" class="p-12 text-center">
        <div class="w-20 h-20 bg-google-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <mat-icon class="text-google-blue !text-4xl w-10 h-10 flex items-center justify-center">construction</mat-icon>
        </div>
        <h2 class="text-2xl font-bold text-google-gray-900 dark:text-white">Module Under Implementation</h2>
        <p class="text-google-gray-600 dark:text-google-gray-400 mt-2 max-w-md mx-auto">
          We are working hard to bring the full functionality of the <span class="text-google-blue font-bold">{{ title }}</span> module to your portal. Please check back later.
        </p>
        <div class="mt-8">
          <zrd-button variant="outline" (click)="goBack()">Go Back</zrd-button>
        </div>
      </zrd-card>
    </div>
  `
})
export class FeaturePlaceholderComponent {
  private route = inject(ActivatedRoute);
  title = '';

  constructor() {
    this.title = this.route.snapshot.data['breadcrumb'] || 'Feature';
  }

  goBack() {
    window.history.back();
  }
}
