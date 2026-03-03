import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero -->
      <section class="relative py-24 bg-secondary-900 overflow-hidden text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 class="text-xs font-black uppercase tracking-[0.5em] mb-4 text-primary">Intelligence Stream</h1>
          <h2 class="text-6xl font-black tracking-tighter uppercase mb-8">Medical Insights <br/>& Health Protocols</h2>
          <p class="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            Stay updated with the latest advancements in orthopedic surgery, recovery techniques, and clinical research.
          </p>
        </div>
        <div class="absolute inset-0 bg-primary/5 blur-[120px]"></div>
      </section>

      <!-- Featured Posts -->
      <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            @for (post of blogPosts; track post.slug) {
              <mat-card class="rounded-[40px] border border-gray-100 shadow-none overflow-hidden group hover:shadow-2xl transition-all duration-700 bg-white">
              <div class="h-64 relative overflow-hidden">
                <img [src]="post.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div class="absolute inset-0 bg-secondary-900/20"></div>
                <div class="absolute top-6 left-6">
                  <mat-chip class="premium-badge">{{post.category}}</mat-chip>
                </div>
              </div>

              <div class="p-10">
                <div class="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-4">
                  <mat-icon class="scale-50">calendar_today</mat-icon>
                  <span>{{post.date}}</span>
                </div>
                
                <h3 class="text-2xl font-black text-secondary-900 uppercase tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight">
                  <a [routerLink]="['/blog', post.slug]">{{post.title}}</a>
                </h3>
                
                <p class="text-secondary-600 text-sm leading-relaxed mb-10 font-medium">{{post.excerpt}}</p>
                
                <mat-divider class="mb-8 opacity-50"></mat-divider>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                      <img [src]="'https://i.pravatar.cc/80?u=' + post.author" class="w-full h-full object-cover" />
                    </div>
                    <span class="text-[10px] font-black text-secondary-400 uppercase tracking-widest">{{post.author}}</span>
                  </div>
                  <a mat-button [routerLink]="['/blog', post.slug]" class="font-black uppercase text-[10px] p-0">
                    Read Protocol <mat-icon class="scale-50 ml-1">arrow_forward</mat-icon>
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
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 class="text-3xl font-black text-secondary-900 tracking-tighter uppercase mb-8">Establish Intelligence Link</h3>
          <p class="text-secondary-500 mb-10 max-w-lg mx-auto font-medium">Receive clinical updates and health protocols directly to your encrypted channel.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
             <button mat-flat-button color="primary" class="h-16 px-12 rounded-2xl text-lg font-bold uppercase shadow-xl shadow-primary/20">
               Subscribe Now
             </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
   `]
})
export class BlogListComponent {
  blogPosts = [
    {
      title: 'Innovations in Robotic-Assisted Hip Replacement',
      slug: 'robotic-hip-replacement-innovations',
      excerpt: 'How precision engineering is reducing recovery times and improving long-term outcomes for patients.',
      date: 'MAY 24, 2026',
      category: 'Research',
      author: 'Dr. James Wilson',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Post-Surgery Recovery: The Biometric Protocol',
      slug: 'post-surgery-recovery-biometrics',
      excerpt: 'Leveraging wearable tech to monitor musculoskeletal restoration and prevent secondary injuries.',
      date: 'MAY 20, 2026',
      category: 'Protocols',
      author: 'Dr. Maria Garcia',
      image: 'https://images.unsplash.com/photo-1571019623518-e71de96e28da?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'The Future of Regenerative Bone Therapy',
      slug: 'future-regenerative-bone-therapy',
      excerpt: 'Exploring the boundary between biology and engineering in modern orthopedic medicine.',
      date: 'MAY 15, 2026',
      category: 'Vision',
      author: 'Dr. Robert Chen',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
    }
  ];
}
