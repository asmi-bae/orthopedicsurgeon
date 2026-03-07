import { ZrdCardComponent, ZrdInputComponent, ZrdBadgeComponent } from '@ui/components';
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { WEBSITECONTROLService } from '../../../core/services/api/websitecontrol.service';

@Component({
  selector: 'app-review-management',
  standalone: true,
  imports: [
    CommonModule, 
    ZrdCardComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Patient Reviews</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Moderate testimonials and feature the best stories on your homepage.</p>
        </div>
      </div>

      @if (loading()) {
        <div class="relative h-1 mb-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      <zrd-card variant="default">
        <div class="flex flex-col sm:flex-row gap-4 mb-4 p-6 border-b border-google-gray-100 dark:border-white/5">
          <div class="flex-1 max-w-sm">
            <zrd-input 
              placeholder="Search reviewer name or contents..." 
              [hasPrefix]="true"
            >
              <mat-icon prefix class="text-google-gray-400">search</mat-icon>
            </zrd-input>
          </div>
        </div>

        <div class="overflow-x-auto min-h-[400px]">
          <table mat-table [dataSource]="reviews()" class="w-full bg-transparent">
            
            <ng-container matColumnDef="patient">
              <th mat-header-cell *matHeaderCellDef class="font-bold text-xs uppercase tracking-widest text-google-gray-500 py-4 px-6 border-b border-google-gray-200 dark:border-white/10">Patient Details</th>
              <td mat-cell *matCellDef="let element" class="py-4 px-6 border-b border-google-gray-100 dark:border-white/5">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-google-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <mat-icon class="text-google-gray-400">person</mat-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-google-gray-900 dark:text-white text-sm m-0">{{ element.patientName || element.name }}</h4>
                    <span class="text-xs text-google-gray-400 block">{{ element.createdAt | date:'mediumDate' }}</span>
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="rating">
              <th mat-header-cell *matHeaderCellDef class="font-bold text-xs uppercase tracking-widest text-google-gray-500 py-4 px-6 border-b border-google-gray-200 dark:border-white/10">Rating</th>
              <td mat-cell *matCellDef="let element" class="py-4 px-6 border-b border-google-gray-100 dark:border-white/5 whitespace-nowrap">
                 <div class="flex items-center text-google-yellow">
                    @for (star of [1,2,3,4,5]; track star) {
                      <mat-icon class="text-[18px] leading-tight w-[18px] h-[18px]">
                        {{ star <= (element.rating || 5) ? 'star' : 'star_border' }}
                      </mat-icon>
                    }
                 </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="review">
              <th mat-header-cell *matHeaderCellDef class="font-bold text-xs uppercase tracking-widest text-google-gray-500 py-4 px-6 border-b border-google-gray-200 dark:border-white/10">Review Content</th>
              <td mat-cell *matCellDef="let element" class="py-4 px-6 border-b border-google-gray-100 dark:border-white/5">
                 <p class="text-sm text-google-gray-600 dark:text-google-gray-400 m-0 line-clamp-2 max-w-sm" [title]="element.content || element.message">
                   "{{ element.content || element.message }}"
                 </p>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef class="font-bold text-xs uppercase tracking-widest text-google-gray-500 py-4 px-6 border-b border-google-gray-200 dark:border-white/10">Status</th>
              <td mat-cell *matCellDef="let element" class="py-4 px-6 border-b border-google-gray-100 dark:border-white/5 whitespace-nowrap">
                 <div class="flex flex-col gap-2">
                   @if (element.isVerified || element.approved) {
                     <zrd-badge variant="success" class="font-black text-[10px]"><mat-icon class="text-[12px] h-[12px] w-[12px] mr-1">check_circle</mat-icon> Verified</zrd-badge>
                   } @else {
                     <zrd-badge variant="warning" class="font-black text-[10px]">Pending</zrd-badge>
                   }
                   @if (element.isFeatured) {
                     <zrd-badge variant="info" class="font-black text-[10px] bg-google-blue/10 text-google-blue border-google-blue/20"><mat-icon class="text-[12px] h-[12px] w-[12px] mr-1">campaign</mat-icon> Featured</zrd-badge>
                   }
                 </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="text-right font-bold text-xs uppercase tracking-widest text-google-gray-500 py-4 px-6 border-b border-google-gray-200 dark:border-white/10">Actions</th>
              <td mat-cell *matCellDef="let element" class="text-right py-4 px-6 border-b border-google-gray-100 dark:border-white/5">
                <div class="flex items-center justify-end">
                  <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                    @if (!element.isVerified && !element.approved) {
                      <button mat-menu-item (click)="verifyReview(element.id, true)">
                        <mat-icon class="text-google-emerald">verified</mat-icon>
                        <span class="font-bold text-sm">Approve & Verify</span>
                      </button>
                    } @else {
                      <button mat-menu-item (click)="verifyReview(element.id, false)">
                        <mat-icon class="text-google-gray-400">unpublished</mat-icon>
                        <span class="font-bold text-sm">Revoke Approval</span>
                      </button>
                    }
                    
                    @if (!element.isFeatured) {
                      <button mat-menu-item (click)="featureReview(element.id, true)">
                        <mat-icon class="text-google-blue">star</mat-icon>
                        <span class="font-bold text-sm">Feature on Homepage</span>
                      </button>
                    } @else {
                      <button mat-menu-item (click)="featureReview(element.id, false)">
                        <mat-icon class="text-google-gray-400">star_border</mat-icon>
                        <span class="font-bold text-sm">Remove from Homepage</span>
                      </button>
                    }
                    
                    <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                    <button mat-menu-item class="text-google-red" (click)="deleteReview(element.id)">
                      <mat-icon class="text-google-red">delete</mat-icon>
                      <span class="font-bold text-sm text-google-red">Delete Permanently</span>
                    </button>
                  </mat-menu>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-google-gray-50 dark:hover:bg-white/[0.02] transition-colors"></tr>
            
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell text-center py-20" colspan="5">
                <mat-icon class="text-google-gray-300 text-5xl mb-4">forum</mat-icon>
                <p class="text-google-gray-500 font-medium">No reviews found.</p>
              </td>
            </tr>
          </table>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ReviewManagementComponent implements OnInit {
  private websiteService = inject(WEBSITECONTROLService);
  private snackBar = inject(MatSnackBar);

  reviews = signal<any[]>([]);
  loading = signal(false);
  displayedColumns = ['patient', 'rating', 'review', 'status', 'actions'];

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading.set(true);
    this.websiteService.getAdminWebsiteTestimonials().subscribe({
      next: (res: any) => {
        let content = res?.data?.content || res?.data || [];
        if (Array.isArray(res)) content = res;
        this.reviews.set(content);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  verifyReview(id: string, isVerified: boolean) {
    this.loading.set(true);
    // Usually a payload with verification state is passed, but API signature states 'payload: any'
    this.websiteService.putAdminWebsiteTestimonialsIdVerify(id, { verified: isVerified }).subscribe({
      next: () => {
        this.snackBar.open(isVerified ? 'Review approved for display.' : 'Approval revoked.', 'Close', { 
          duration: 3000,
          panelClass: [isVerified ? 'bg-google-emerald' : 'bg-google-gray-600', 'text-white']
        });
        this.loadReviews();
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Error updating verification status.', 'Close', { duration: 3000 });
      }
    });
  }

  featureReview(id: string, isFeatured: boolean) {
    this.loading.set(true);
    this.websiteService.putAdminWebsiteTestimonialsIdFeature(id, { featured: isFeatured }).subscribe({
      next: () => {
        this.snackBar.open(isFeatured ? 'Review featured on Homepage.' : 'Review removed from Homepage.', 'Close', { 
          duration: 3000,
          panelClass: ['bg-google-blue', 'text-white']
        });
        this.loadReviews();
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Error updating feature status.', 'Close', { duration: 3000 });
      }
    });
  }

  deleteReview(id: string) {
    if (confirm('Are you confirm you want to permanently delete this patient review?')) {
      this.loading.set(true);
      this.websiteService.deleteAdminWebsiteTestimonialsId(id).subscribe({
        next: () => {
          this.snackBar.open('Review permanently deleted.', 'Close', { duration: 3000 });
          this.loadReviews();
        },
        error: () => {
          this.loading.set(false);
          this.snackBar.open('Error deleting review.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
