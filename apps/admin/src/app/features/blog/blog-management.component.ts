import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  template: `
    <div class="space-y-10 animate-fade-in pb-24 px-2">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-amber-600/20 rounded-2xl flex items-center justify-center border border-amber-500/30 shadow-2xl shadow-amber-500/10">
            <mat-icon class="text-amber-400 scale-[1.5]">broadcast_on_home</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Dispatch Matrix</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Broadcast health intelligence and orthopedic protocols to the public nodes</p>
            </div>
          </div>
        </div>
        <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
           Transmit New Intel
        </button>
      </div>

      <mat-card class="bg-white/[0.01] border border-white/5 rounded-3xl glass overflow-hidden animate-slide-up">
        <mat-progress-bar *ngIf="loading()" mode="query" color="primary" class="h-1"></mat-progress-bar>
        
        <div class="overflow-x-auto p-2">
          <table mat-table [dataSource]="posts()" class="w-full bg-transparent">
             <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10">Intel Packet / Title</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-5">
                    <div class="w-20 h-14 rounded-2xl bg-secondary-900 overflow-hidden shrink-0 border border-white/5 group-hover:border-primary-500/30 transition-all shadow-inner relative">
                      <img *ngIf="row.featuredImageUrl" [src]="row.featuredImageUrl" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div *ngIf="!row.featuredImageUrl" class="w-full h-full flex items-center justify-center">
                        <mat-icon class="text-white/5 scale-75">image</mat-icon>
                      </div>
                    </div>
                    <div class="flex flex-col max-w-md">
                      <span class="text-lg font-black text-white tracking-tight uppercase italic group-hover:text-primary-400 transition-colors truncate">{{row.title}}</span>
                      <span class="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 truncate italic">Protocol Path: /{{row.slug}}</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Domain Sector</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <span class="text-[9px] font-black text-primary-400 bg-primary-500/10 px-5 py-2.5 rounded-xl border border-primary-500/20 uppercase tracking-[0.2em] backdrop-blur-sm shadow-xl">
                    {{row.categoryName || 'GENERAL_INTEL'}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="stats">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Reception Data</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-6 text-white/20">
                     <div class="flex items-center gap-2 group/stat">
                       <mat-icon class="text-[14px] scale-75 m-0 group-hover/stat:text-primary-400 transition-colors">visibility</mat-icon>
                       <span class="text-[10px] font-black tracking-widest group-hover/stat:text-white transition-colors">{{row.viewCount || 0}}</span>
                     </div>
                     <div class="flex items-center gap-2 group/stat">
                       <mat-icon class="text-[14px] scale-75 m-0 group-hover/stat:text-primary-400 transition-colors">chat_bubble</mat-icon>
                       <span class="text-[10px] font-black tracking-widest group-hover/stat:text-white transition-colors">{{row.commentCount || 0}}</span>
                     </div>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Visibility Mode</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <span [class]="row.published ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'" 
                        class="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border backdrop-blur-sm">
                    {{row.published ? 'LIVE BROADCAST' : 'DRAFT ENCRYPTED'}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10 text-right">Orchestration</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03] text-right">
                   <div class="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                      <button mat-icon-button matTooltip="Modify Intel" class="w-10 h-10 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">edit_note</mat-icon>
                      </button>
                      <button mat-icon-button (click)="deletePost(row.id)" matTooltip="Purge Intel" class="w-10 h-10 bg-white/5 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">delete_forever</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-white/[0.02]"></tr>
             <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="group hover:bg-white/[0.02] transition-all cursor-pointer border-white/5"></tr>
          </table>

          <div *ngIf="posts().length === 0 && !loading()" class="py-32 text-center bg-white/[0.01]">
             <mat-icon class="text-white/5 scale-[4] mb-12 animate-pulse">podcasts</mat-icon>
             <p class="text-white/20 font-black uppercase tracking-[0.5em] text-[10px]">Intel matrix is currently static</p>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .glass { backdrop-filter: blur(40px); }
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
    if (confirm('Decommission intel packet from public nodes?')) {
      this.api.deleteBlogPost(id).subscribe(() => this.loadPosts());
    }
  }
}
