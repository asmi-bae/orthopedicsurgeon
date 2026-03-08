import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@core/pipes/translate.pipe';

export interface NewsItem {
  title: string;
  date: string;
  slug: string;
  image: string;
}

@Component({
  selector: 'app-home-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <section class="py-32 bg-white relative overflow-hidden -mx-6 sm:-mx-10 lg:-mx-12">
        <div class="app-container relative z-10">
        <div class="flex justify-between items-end mb-20 text-balance">
          <div>
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">{{ 'HOME.BLOG.SUBTITLE' | translate }}</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">{{ 'HOME.BLOG.TITLE' | translate }}</h3>
          </div>
          <a mat-button color="primary" class="font-black uppercase tracking-widest text-[11px]" routerLink="/blog">{{ 'HOME.BLOG.VIEW_ALL' | translate }} <mat-icon class="ml-2">arrow_forward</mat-icon></a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (news of newsStream(); track news.slug) {
            <mat-card class="rounded-[32px] border border-gray-100 shadow-none overflow-hidden hover:shadow-lg transition-all">
              <div class="h-48 overflow-hidden">
                <img [src]="news.image" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div class="p-8">
                <p class="text-[9px] font-black text-primary uppercase tracking-widest mb-3">{{ news.date | translate }}</p>
                <h4 class="text-lg font-black text-secondary-900 uppercase tracking-tight mb-4 transition-colors">{{ news.title | translate }}</h4>
                <a mat-button color="primary" class="font-black uppercase text-[10px] p-0" [routerLink]="['/blog', news.slug]">{{ 'HOME.BLOG.ACCESS' | translate }}</a>
              </div>
            </mat-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class BlogComponent {
  newsStream = input.required<NewsItem[]>();
}
