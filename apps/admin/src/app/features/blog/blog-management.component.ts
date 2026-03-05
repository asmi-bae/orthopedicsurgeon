import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdInputComponent,
  ZrdBadgeComponent 
} from '@repo/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [
    CommonModule, 
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Editorial Hub</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Curate medical insights, patient success stories, and platform news.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">add_circle</mat-icon>
          Draft Article
        </zrd-button>
      </div>

      <!-- Content Management Card -->
      <zrd-card variant="default">
        <!-- Control Strip -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex-1 max-w-sm">
            <zrd-input 
              placeholder="Search articles by title or author..." 
              [hasPrefix]="true"
            >
              <mat-icon prefix class="text-google-gray-400">search</mat-icon>
            </zrd-input>
          </div>
          <div class="flex items-center gap-2 ml-auto">
             <zrd-button variant="outline" size="sm">
               <mat-icon leftIcon>category</mat-icon>
               Manage Categories
             </zrd-button>
          </div>
        </div>

        <!-- Spartan Editorial List -->
        <div class="space-y-4">
          @for (post of posts(); track post.id) {
            <div class="flex items-start gap-6 p-6 rounded-3xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all group border border-google-gray-100 dark:border-white/5">
              <div class="w-12 h-12 rounded-2xl bg-google-blue/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-google-blue/20">
                <mat-icon class="text-google-blue text-[24px]">article</mat-icon>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="font-bold text-base text-google-gray-900 dark:text-white m-0 tracking-tight transition-colors group-hover:text-google-blue">{{ post.title }}</h3>
                    <div class="flex items-center gap-x-2 text-[10px] font-black uppercase tracking-widest text-google-gray-400 mt-1">
                       <span>{{ post.author }}</span>
                       <span class="w-1 h-1 rounded-full bg-google-gray-300"></span>
                       <span>{{ post.date }}</span>
                    </div>
                    <p class="text-sm text-google-gray-600 dark:text-google-gray-400 m-0 mt-3 line-clamp-2 leading-relaxed">{{ post.excerpt }}</p>
                  </div>
                  <div class="flex items-center gap-3 shrink-0">
                    <zrd-badge [variant]="post.status === 'Published' ? 'success' : 'warning'" class="font-black">
                      {{ post.status }}
                    </zrd-badge>
                    <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                      <button mat-menu-item>
                        <mat-icon class="text-google-blue">terminal</mat-icon>
                        <span class="font-bold text-sm">Open Editor</span>
                      </button>
                      <button mat-menu-item>
                        <mat-icon class="text-google-emerald">visibility</mat-icon>
                        <span class="font-bold text-sm">Live Preview</span>
                      </button>
                      <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                      <button mat-menu-item class="text-google-red">
                        <mat-icon class="text-google-red">delete_sweep</mat-icon>
                        <span class="font-bold text-sm">Archive Article</span>
                      </button>
                    </mat-menu>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        @if (posts().length === 0) {
          <div class="py-24 text-center">
            <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
               <mat-icon class="text-google-gray-400 text-3xl">auto_stories</mat-icon>
            </div>
            <h3 class="font-bold text-google-gray-900 dark:text-white">The Hub is Empty</h3>
            <p class="text-sm text-google-gray-500 mt-2">No articles or drafts found matching your search.</p>
          </div>
        }

        <!-- Inventory Footer -->
        <div class="px-6 py-4 mt-8 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">{{ posts().length }} Editorial Piece(s)</span>
          <div class="flex items-center gap-2">
            <zrd-button variant="ghost" size="sm" [disabled]="true">Older Posts</zrd-button>
            <zrd-button variant="ghost" size="sm" [disabled]="true">Next</zrd-button>
          </div>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class BlogManagementComponent {
  posts = signal([
    { id: 1, title: 'Understanding Orthopedic Implants', author: 'Dr. Sarah Johnson', date: 'Oct 15, 2024', excerpt: 'A comprehensive guide to modern orthopedic implant technologies and their applications in joint replacement surgery.', status: 'Published' },
    { id: 2, title: 'Post-Surgery Rehabilitation Tips', author: 'Dr. Mike Ross',     date: 'Oct 18, 2024', excerpt: 'Essential exercises and recovery milestones for patients recovering from orthopedic procedures.', status: 'Published' },
    { id: 3, title: 'Bone Health After 50',              author: 'Dr. Lisa Chen',     date: 'Oct 22, 2024', excerpt: 'Lifestyle and nutritional recommendations to maintain strong bones as you age.', status: 'Draft' },
  ]);
}
