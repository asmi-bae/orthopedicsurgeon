import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zrd-paginator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between px-6 py-4 bg-white border border-secondary-200 border-t-0 rounded-b-xl">
      <div class="flex items-center gap-4 text-sm text-secondary-500">
        <div class="flex items-center gap-2">
          <span>Show</span>
          <select 
            [value]="pageSize" 
            (change)="onPageSizeChange($event)"
            class="bg-transparent border-none focus:ring-0 cursor-pointer font-medium text-secondary-900"
          >
            <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</option>
          </select>
          <span>entries</span>
        </div>
        <div class="border-l border-secondary-200 h-4 mx-2"></div>
        <span>Showing <span class="font-medium text-secondary-900">{{ startRange }}-{{ endRange }}</span> of <span class="font-medium text-secondary-900">{{ totalElements }}</span></span>
      </div>

      <div class="flex items-center gap-1">
        <button 
          (click)="onPageChange(pageNumber - 1)" 
          [disabled]="pageNumber === 0"
          class="p-2 rounded-lg hover:bg-secondary-100 disabled:opacity-30 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <ng-container *ngFor="let page of visiblePages">
          <button 
            *ngIf="page !== -1; else dots"
            (click)="onPageChange(page)"
            [class]="page === pageNumber ? 'bg-primary-600 text-white' : 'text-secondary-600 hover:bg-secondary-100'"
            class="w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200"
          >
            {{ page + 1 }}
          </button>
          <ng-template #dots>
            <span class="w-10 h-10 flex items-center justify-center text-secondary-400">...</span>
          </ng-template>
        </ng-container>

        <button 
          (click)="onPageChange(pageNumber + 1)" 
          [disabled]="pageNumber >= totalPages - 1"
          class="p-2 rounded-lg hover:bg-secondary-100 disabled:opacity-30 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdPaginatorComponent {
  @Input() pageNumber = 0;
  @Input() pageSize = 10;
  @Input() totalElements = 0;
  @Input() totalPages = 0;
  @Input() pageSizeOptions = [5, 10, 25, 50, 100];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get startRange(): number {
    return this.totalElements === 0 ? 0 : this.pageNumber * this.pageSize + 1;
  }

  get endRange(): number {
    return Math.min((this.pageNumber + 1) * this.pageSize, this.totalElements);
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (this.totalPages <= maxVisible) {
      for (let i = 0; i < this.totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      
      let start = Math.max(1, this.pageNumber - 1);
      let end = Math.min(this.totalPages - 2, this.pageNumber + 1);
      
      if (this.pageNumber <= 2) end = 3;
      if (this.pageNumber >= this.totalPages - 3) start = this.totalPages - 4;
      
      if (start > 1) pages.push(-1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < this.totalPages - 2) pages.push(-1);
      
      pages.push(this.totalPages - 1);
    }
    
    return pages;
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  onPageSizeChange(event: any) {
    this.pageSizeChange.emit(Number(event.target.value));
  }
}
