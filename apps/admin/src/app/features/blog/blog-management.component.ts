import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminApiService } from '@core/services/admin-api.service';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule,
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  template: `
    <div class="space-y-6 animate-fade-in pb-12">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center border border-amber-200 dark:border-amber-800">
            <mat-icon class="text-amber-600 dark:text-amber-400">broadcast_on_home</mat-icon>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">{{ 'BLOG.TITLE' | translate }}</h1>
            <p class="text-white/40 text-xs">{{ 'BLOG.SUBTITLE' | translate }}</p>
          </div>
        </div>
        <button mat-flat-button color="primary" class="h-12 px-6 font-bold uppercase tracking-tight">
           {{ 'BLOG.ADD_BUTTON' | translate }}
        </button>
      </div>

      <mat-card class="border rounded-xl overflow-hidden animate-slide-up shadow-lg">
        @if (loading()) {
          <mat-progress-bar mode="query" color="primary"></mat-progress-bar>
        }
        
        <div class="overflow-x-auto">
          <table mat-table [dataSource]="posts()" class="w-full">
             <!-- Title Column -->
             <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef class="px-6">{{ 'BLOG.COLUMNS.TITLE' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <div class="w-16 h-10 rounded-lg bg-primary-900 overflow-hidden shrink-0 border border-white/5 relative">
                      @if (row.featuredImageUrl) {
                        <img [src]="row.featuredImageUrl" class="w-full h-full object-cover" />
                      } @else {
                        <div class="w-full h-full flex items-center justify-center">
                          <mat-icon class="text-white/5 scale-75">image</mat-icon>
                        </div>
                      }
                    </div>
                    <div class="flex flex-col max-w-md">
                      <span class="text-sm font-bold text-white truncate">{{row.title}}</span>
                      <span class="text-[10px] text-white/20 uppercase tracking-wider truncate">/{{row.slug}}</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <!-- Category Column -->
             <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef>{{ 'BLOG.COLUMNS.CATEGORY' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4 text-xs font-bold text-primary-400">
                  {{row.categoryName || 'GENERAL'}}
                </td>
             </ng-container>

             <!-- Stats Column -->
             <ng-container matColumnDef="stats">
                <th mat-header-cell *matHeaderCellDef>{{ 'BLOG.COLUMNS.STATS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <div class="flex items-center gap-4 text-white/20">
                     <div class="flex items-center gap-1.5">
                       <mat-icon class="text-sm scale-75">visibility</mat-icon>
                       <span class="text-[10px] font-bold">{{row.viewCount || 0}}</span>
                     </div>
                     <div class="flex items-center gap-1.5">
                       <mat-icon class="text-sm scale-75">chat_bubble</mat-icon>
                       <span class="text-[10px] font-bold">{{row.commentCount || 0}}</span>
                     </div>
                  </div>
                </td>
             </ng-container>

             <!-- Status Column -->
             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>{{ 'BLOG.COLUMNS.STATUS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="py-4">
                  <span [class]="row.published ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'" 
                        class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border">
                    {{ (row.published ? 'BLOG.STATUS.PUBLISHED' : 'BLOG.STATUS.DRAFT') | translate }}
                  </span>
                </td>
             </ng-container>

             <!-- Actions Column -->
             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="px-6 text-right">{{ 'BLOG.COLUMNS.ACTIONS' | translate }}</th>
                <td mat-cell *matCellDef="let row" class="px-6 py-4 text-right">
                   <div class="flex justify-end gap-1">
                      <button mat-icon-button [matTooltip]="'Edit'" class="text-white/40 hover:text-primary-400 transition-all">
                        <mat-icon class="scale-90">edit_note</mat-icon>
                      </button>
                      <button mat-icon-button (click)="deletePost(row.id)" [matTooltip]="'Delete'" class="text-white/40 hover:text-red-500 transition-all">
                        <mat-icon class="scale-90">delete</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-white/5"></tr>
             <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-white/[0.02] transition-colors cursor-pointer"></tr>
          </table>

          @if (posts().length === 0 && !loading()) {
            <div class="py-24 text-center">
               <mat-icon class="text-white/5 scale-[3] mb-8">podcasts</mat-icon>
               <p class="text-white/20 font-bold uppercase tracking-widest text-xs">{{ 'BLOG.NO_DATA' | translate }}</p>
            </div>
          }
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    :host { display: block; }
    ::ng-deep .mat-mdc-table { background: transparent !important; }
  `]
})
export class BlogManagementComponent implements OnInit {
  private api = inject(AdminApiService);
  
  posts = signal<any[]>([]);
  loading = signal(false);
  
  displayedColumns = ['title', 'category', 'stats', 'status', 'actions'];

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading.set(true);
    this.api.getBlogPosts().subscribe({
      next: (res) => {
        this.posts.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load blog posts', err);
        this.loading.set(false);
      }
    });
  }

  deletePost(id: string) {
    if (confirm('Delete this article?')) {
      this.api.deleteBlogPost(id).subscribe(() => this.loadPosts());
    }
  }
}
