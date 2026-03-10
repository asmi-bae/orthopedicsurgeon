import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '@core/pipes/translate.pipe';
import { PublicApiService } from '@core/services/public-api.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatDividerModule, MatChipsModule, TranslatePipe],
  template: `
    <div class="bg-white min-h-screen" *ngIf="post()">
      <!-- Hero -->
      <section class="relative h-[60vh] bg-secondary-900 overflow-hidden">
        <img [src]="post()?.image || 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1600'" class="w-full h-full object-cover opacity-40 grayscale" />
        <div class="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/60 to-transparent"></div>
        
        <div class="absolute bottom-0 left-0 w-full pb-20">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <mat-chip class="premium-badge mb-8">{{ post()?.category }}</mat-chip>
            <h1 class="text-6xl font-black text-white tracking-tighter uppercase leading-none mb-10">
              {{ post()?.title }}
            </h1>
            
            <div class="flex items-center gap-8 text-white">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 overflow-hidden">
                  <img [src]="post()?.authorAvatar || 'https://i.pravatar.cc/150?u=drrahman'" class="w-full h-full object-cover" />
                </div>
                <div>
                  <p class="text-[10px] font-black uppercase tracking-widest">{{ post()?.authorName || 'Dr. Ab Rahman' }}</p>
                  <p class="text-[8px] font-bold text-primary uppercase tracking-[0.2em]">{{ 'BLOG.DETAIL.AUTHOR_CERT' | translate }}</p>
                </div>
              </div>
              <div class="h-8 w-[1px] bg-white/10"></div>
              <div class="text-white/40">
                <p class="text-[10px] font-black uppercase tracking-widest">{{ 'BLOG.DETAIL.RELEASED' | translate }}</p>
                <p class="text-[10px] font-bold uppercase tracking-tight">{{ post()?.createdAt | date:'mediumDate' }}</p>
              </div>
              <div class="h-8 w-[1px] bg-white/10"></div>
              <div class="text-white/40">
                <p class="text-[10px] font-black uppercase tracking-widest">{{ 'BLOG.DETAIL.PROTOCOL' | translate }}</p>
                <p class="text-[10px] font-bold uppercase tracking-tight">{{ post()?.readTime || '8' }} {{ 'BLOG.DETAIL.READ_TIME' | translate }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="py-24">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="prose prose-xl prose-secondary max-w-none">
            <div [innerHTML]="post()?.content"></div>
          </div>

          <mat-divider class="my-20 opacity-50"></mat-divider>

          <!-- Author Bio -->
          <div class="flex flex-col md:flex-row gap-10 items-center bg-secondary-900 p-12 rounded-[40px] text-white text-center md:text-left">
            <div class="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-primary/20">
              <img [src]="post()?.authorAvatar || 'https://i.pravatar.cc/300?u=drrahman'" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1">
              <h4 class="text-2xl font-black uppercase tracking-tight mb-2">{{ post()?.authorName || 'Dr. Ab Rahman' }}</h4>
              <p class="text-primary font-black uppercase tracking-widest text-xs mb-4">{{ 'BLOG.DETAIL.AUTHOR_CERT' | translate }}</p>
              <p class="text-white/60 text-sm leading-relaxed font-medium">{{ 'BLOG.DETAIL.AUTHOR_BIO' | translate }}</p>
            </div>
            <button mat-flat-button color="primary" [routerLink]="['/appointment']" class="h-16 px-12 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20">
              {{ 'BLOG.DETAIL.BOOK' | translate }}
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
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(PublicApiService);

  post = signal<any>(null);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.api.getBlogBySlug(slug).subscribe({
        next: (res) => this.post.set(res.data),
        error: () => {
          // Fallback or handle error
        }
      });
    }
  }
}
