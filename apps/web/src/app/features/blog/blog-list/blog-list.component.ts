import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@core/pipes/translate.pipe';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule, TranslatePipe],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="app-container relative z-10">
          <h1 class="text-xs font-black uppercase tracking-[0.5em] mb-4 text-primary">{{ 'BLOG.LIST.HERO.SUBTITLE' | translate }}</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase mb-8">{{ 'BLOG.LIST.HERO.TITLE_PART1' | translate }} <br/>{{ 'BLOG.LIST.HERO.TITLE_PART2' | translate }}</h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            {{ 'BLOG.LIST.HERO.DESCRIPTION' | translate }}
          </p>
        </div>
        <div class="absolute inset-0 bg-primary/5 blur-[120px]"></div>
      </section>

      <!-- Featured Posts -->
      <section class="py-32 bg-white">
        <div class="app-container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            @for (post of blogPosts; track post.slug) {
              <mat-card class="rounded-[40px] border border-gray-100 shadow-none overflow-hidden group hover:shadow-2xl transition-all duration-700 bg-white">
              <div class="h-64 relative overflow-hidden">
                <img [src]="post.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div class="absolute inset-0 bg-secondary-900/20"></div>
                <div class="absolute top-6 left-6">
                  <mat-chip class="premium-badge">{{ post.categoryKey | translate }}</mat-chip>
                </div>
              </div>

              <div class="p-10">
                <div class="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-4">
                  <mat-icon class="scale-50">calendar_today</mat-icon>
                  <span>{{ post.dateKey | translate }}</span>
                </div>
                
                <h3 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight">
                  <a [routerLink]="['/blog', post.slug]">{{ post.titleKey | translate }}</a>
                </h3>
                
                <p class="text-secondary-600 text-sm leading-relaxed mb-10 font-medium">{{ post.excerptKey | translate }}</p>
                
                <mat-divider class="mb-8 opacity-50"></mat-divider>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                      <img [src]="'https://i.pravatar.cc/80?u=' + post.author" class="w-full h-full object-cover" />
                    </div>
                    <span class="text-[10px] font-black text-secondary-400 uppercase tracking-widest">{{ post.author }}</span>
                  </div>
                  <a mat-button [routerLink]="['/blog', post.slug]" class="font-black uppercase text-[10px] p-0">
                    {{ 'BLOG.LIST.CARD.READ_PROTOCOL' | translate }} <mat-icon class="scale-50 ml-1">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>
            </mat-card>
          }
        </div>
        </div>
      </section>

      <!-- Newsletter Banner -->
      <section class="py-24 bg-gray-50 border-y border-gray-100">
        <div class="app-container text-center">
          <h3 class="text-3xl font-black text-secondary-900 tracking-tighter uppercase mb-8">{{ 'BLOG.LIST.NEWSLETTER.TITLE' | translate }}</h3>
          <p class="text-secondary-500 mb-10 max-w-lg mx-auto font-medium">{{ 'BLOG.LIST.NEWSLETTER.DESCRIPTION' | translate }}</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
             <button mat-flat-button color="primary" class="h-16 px-12 rounded-2xl text-lg font-bold uppercase shadow-xl shadow-primary/20">
               {{ 'BLOG.LIST.NEWSLETTER.SUBSCRIBE' | translate }}
             </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-badge { background: #3b82f6 !important; color: white !important; font-size: 10px !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; height: 32px !important; border: none !important; }
   `]
})
export class BlogListComponent {
  blogPosts = [
    {
      titleKey: 'BLOG.POSTS.HIP_REPLACEMENT.TITLE',
      slug: 'modern-innovations-hip-replacement',
      excerptKey: 'BLOG.POSTS.HIP_REPLACEMENT.EXCERPT',
      dateKey: 'BLOG.NEWS1.DATE',
      categoryKey: 'BLOG.POSTS.HIP_REPLACEMENT.CATEGORY',
      author: 'Dr. Rahman',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
    },
    {
      titleKey: 'BLOG.POSTS.RECOVERY.TITLE',
      slug: 'essential-post-surgery-recovery-tips',
      excerptKey: 'BLOG.POSTS.RECOVERY.EXCERPT',
      dateKey: 'BLOG.NEWS2.DATE',
      categoryKey: 'BLOG.POSTS.RECOVERY.CATEGORY',
      author: 'Dr. Rahman',
      image: 'https://images.unsplash.com/photo-1571019623518-e71de96e28da?auto=format&fit=crop&q=80&w=800'
    },
    {
      titleKey: 'BLOG.POSTS.REGENERATIVE.TITLE',
      slug: 'future-regenerative-bone-therapy',
      excerptKey: 'BLOG.POSTS.REGENERATIVE.EXCERPT',
      dateKey: 'BLOG.NEWS3.DATE',
      categoryKey: 'BLOG.POSTS.REGENERATIVE.CATEGORY',
      author: 'Dr. Rahman',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
    }
  ];
}
