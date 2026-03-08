import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ZrdColumnDef<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  cellTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'zrd-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full overflow-x-auto rounded-xl border border-google-gray-200 dark:border-google-gray-800 bg-white dark:bg-sidebar-dark transition-colors duration-300 shadow-sm">
      <table class="w-full caption-bottom text-sm border-collapse">
        <thead class="bg-google-gray-50/50 dark:bg-white/5 border-b border-google-gray-200 dark:border-google-gray-800">
          <tr>
            <th *ngFor="let col of columns" 
                scope="col" 
                class="h-12 px-4 text-left align-middle font-black text-google-gray-500 dark:text-google-gray-400 uppercase tracking-widest text-[10px] whitespace-nowrap"
                [style.width]="col.width"
                [class.text-center]="col.align === 'center'"
                [class.text-right]="col.align === 'right'"
                [class.cursor-pointer]="col.sortable"
                (click)="toggleSort(col)"
            >
              <div class="flex items-center gap-2" [class.justify-center]="col.align === 'center'" [class.justify-end]="col.align === 'right'">
                {{ col.header }}
                @if (col.sortable) {
                  <span class="transition-all duration-200" [class.text-google-blue]="sortKey === col.key" [class.opacity-30]="sortKey !== col.key">
                    <svg *ngIf="sortKey !== col.key" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    <svg *ngIf="sortKey === col.key && sortDirection === 'ASC'" class="w-3.5 h-3.5 animate-in zoom-in-50 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
                    </svg>
                    <svg *ngIf="sortKey === col.key && sortDirection === 'DESC'" class="w-3.5 h-3.5 animate-in zoom-in-50 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                }
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-google-gray-100 dark:divide-google-gray-800">
          <!-- Loading State -->
          @if (loading) {
            @for (i of [1,2,3,4,5]; track i) {
              <tr class="bg-white dark:bg-transparent">
                @for (col of columns; track col.key) {
                  <td class="p-4 align-middle">
                    <div class="h-3 bg-google-gray-100 dark:bg-google-gray-800 rounded-lg animate-pulse w-full"></div>
                  </td>
                }
              </tr>
            }
          }

          <!-- Empty State -->
          @if (!loading && data.length === 0) {
            <tr class="bg-white dark:bg-transparent">
              <td [attr.colspan]="columns.length" class="p-4 align-middle text-center py-32 animate-in fade-in zoom-in duration-500">
                <div class="flex flex-col items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-google-gray-100 dark:bg-google-gray-800 flex items-center justify-center mb-2">
                    <svg class="w-6 h-6 text-google-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span class="text-sm font-black text-google-gray-500 dark:text-google-gray-400 tracking-tight uppercase">Registry is currently empty</span>
                  <p class="text-xs text-google-gray-400 dark:text-google-gray-500 font-medium tracking-tight">No resulting records match your current constraints.</p>
                </div>
              </td>
            </tr>
          }

          <!-- Data -->
          @if (!loading) {
            @for (item of data; track item) {
              <tr class="transition-colors hover:bg-google-gray-50/50 dark:hover:bg-white/5 group bg-white dark:bg-transparent border-none">
                <td *ngFor="let col of columns" class="p-4 align-middle text-google-gray-900 dark:text-google-gray-100 font-medium tracking-tight"
                    [class.text-center]="col.align === 'center'"
                    [class.text-right]="col.align === 'right'"
                >
                  <ng-container *ngIf="col.cellTemplate; else defaultValue">
                    <ng-container *ngTemplateOutlet="col.cellTemplate; context: { $implicit: getCellValue(item, col.key), row: item }"></ng-container>
                  </ng-container>
                  <ng-template #defaultValue>
                    <span class="tabular-nums transition-colors group-hover:text-google-blue">{{ getCellValue(item, col.key) || '—' }}</span>
                  </ng-template>
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdTableComponent<T> {
  @Input() columns: ZrdColumnDef<T>[] = [];
  @Input() data: T[] = [];
  @Input({ transform: booleanAttribute }) loading = false;
  
  @Input() sortKey?: string;
  @Input() sortDirection?: 'ASC' | 'DESC';
  
  @Output() sortChange = new EventEmitter<{ key: string, direction: 'ASC' | 'DESC' }>();

  toggleSort(col: ZrdColumnDef<T>) {
    if (!col.sortable) return;
    
    let direction: 'ASC' | 'DESC' = 'ASC';
    if (this.sortKey === col.key) {
      direction = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    }
    
    this.sortChange.emit({ key: col.key as string, direction });
  }

  getCellValue(item: any, key: any): any {
    if (!key || !item) return '';
    try {
      return key.toString().split('.').reduce((acc: any, part: string) => {
        return acc && acc[part] != null ? acc[part] : null;
      }, item);
    } catch (e) {
      return '';
    }
  }
}
