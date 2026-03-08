import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent, ZrdBadgeComponent, ZrdTableComponent, ZrdColumnDef } from '@ui/components';
import { Component, OnInit, inject, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AUDITLOGSService } from '@core/services/api/auditlogs.service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [
    CommonModule, 
    ZrdCardComponent, 
    ZrdBadgeComponent,
    ZrdButtonComponent,
    ZrdInputComponent,
    ZrdTableComponent,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatPaginatorModule,
    DatePipe,
    JsonPipe
  ],
  template: `
    <div class="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      
      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight text-gradient bg-clip-text">System Audit Surveillance</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1 text-sm font-medium tracking-tight">Review comprehensive logs of all administrative actions and security events.</p>
        </div>
        <button zrdButton variant="outline" size="md" (click)="loadData()">
          <mat-icon leftIcon class="text-[20px]">sync_alt</mat-icon>
          Refresh Feed
        </button>
      </div>

      <!-- Inventory Card -->
      <zrd-card variant="default" class="!p-0 overflow-hidden shadow-google border-google-gray-100 dark:border-white/5 bg-white dark:bg-sidebar-dark rounded-2xl">
        <!-- Search & Control Strip -->
        <div class="p-6 border-b border-google-gray-100 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center bg-google-gray-50/30 dark:bg-white/5">
          <div class="w-full md:max-w-sm">
            <zrd-input 
              placeholder="Search by identity or event..." 
              [hasPrefix]="true"
            >
              <mat-icon prefix class="text-google-gray-400">search</mat-icon>
            </zrd-input>
          </div>
          <div class="flex items-center gap-2 ml-auto">
             <button zrdButton variant="ghost" size="sm">
               <mat-icon leftIcon>filter_list</mat-icon>
               Governance Filters
             </button>
             <button zrdButton variant="primary" size="sm">
               <mat-icon leftIcon>download</mat-icon>
               Export Registry
             </button>
          </div>
        </div>

        @if (isLoadingResults) {
          <div class="h-1 -mt-px w-full overflow-hidden">
            <mat-progress-bar mode="indeterminate" class="h-1"></mat-progress-bar>
          </div>
        }

        <!-- Shadcn-inspired Audit Table -->
        <div class="p-4">
          <!-- Column Templates -->
          <ng-template #identityTemplate let-value>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-google-blue/10 flex items-center justify-center shrink-0 border border-google-blue/20">
                <mat-icon class="text-google-blue text-[18px]">person_outline</mat-icon>
              </div>
              <span class="text-sm font-bold text-google-gray-900 dark:text-white tracking-tight truncate max-w-[120px]">
                {{ value }}
              </span>
            </div>
          </ng-template>

          <ng-template #actionTemplate let-value>
            <div class="flex flex-col">
              <span class="text-[12px] font-bold text-google-gray-700 dark:text-google-gray-200">
                {{ value }}
              </span>
              <span class="text-[10px] text-google-gray-400 font-medium uppercase tracking-widest leading-none mt-1">
                Security Event
              </span>
            </div>
          </ng-template>

          <ng-template #statusTemplate let-row="row">
            <zrd-badge [variant]="getLogStatusVariant(row.action)" class="font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-tighter">
              {{ row.action }}
            </zrd-badge>
          </ng-template>

          <ng-template #dateTemplate let-value>
            <div class="flex flex-col">
              <span class="text-[11px] font-bold text-google-gray-900 dark:text-white tabular-nums tracking-tighter">
                {{ value | date:'MMM d, yyyy' }}
              </span>
              <span class="text-[10px] text-google-gray-400 font-medium tabular-nums leading-none mt-0.5">
                {{ value | date:'HH:mm:ss' }}
              </span>
            </div>
          </ng-template>

          <ng-template #actionsTemplate let-row="row">
            <button [matMenuTriggerFor]="menu" [matMenuTriggerData]="{ row: row }" class="h-8 w-8 rounded-md flex items-center justify-center hover:bg-google-gray-100 dark:hover:bg-white/5 text-google-gray-400 transition-all">
              <mat-icon class="text-[18px]">visibility</mat-icon>
            </button>
          </ng-template>

          <zrd-table 
            [columns]="columns" 
            [data]="data"
            [loading]="isLoadingResults"
          ></zrd-table>
        </div>

        <!-- Shared Menu Instance -->
        <mat-menu #menu="matMenu" class="rounded-xl border-none shadow-google">
          <ng-template matMenuContent let-row="row">
            <button mat-menu-item (click)="viewDetails(row)">
              <mat-icon class="text-google-blue">terminal</mat-icon>
              <span class="font-bold text-sm">View JSON Payload</span>
            </button>
            <button mat-menu-item>
              <mat-icon class="text-google-emerald">file_download</mat-icon>
              <span class="font-bold text-sm">Export Event</span>
            </button>
          </ng-template>
        </mat-menu>

        <!-- Paginator Strip -->
        <div class="px-6 py-4 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between bg-google-gray-50/20 dark:bg-white/5">
          <span class="text-xs font-black text-google-gray-400 uppercase tracking-widest">{{ resultsLength }} Surveillance Records</span>
          <div class="flex items-center gap-2">
            <mat-paginator [length]="resultsLength" [pageSize]="10" [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page" class="!bg-transparent !text-xs !font-black uppercase tracking-widest"></mat-paginator>
          </div>
        </div>
      </zrd-card>

      <!-- Details Modal -->
      @if (selectedLog) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-google-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <zrd-card class="w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col bg-white dark:bg-google-gray-900 shadow-2xl border-none rounded-[2rem]">
            <div class="p-8 border-b dark:border-white/5 flex justify-between items-center bg-google-gray-50/50 dark:bg-white/5">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-2 h-2 rounded-full bg-google-blue shadow-google"></div>
                  <h3 class="font-black text-xl dark:text-white tracking-tight italic uppercase">Event Metadata</h3>
                </div>
                <p class="text-[11px] text-google-gray-400 font-bold uppercase tracking-widest">Registry ID: {{ selectedLog.id }}</p>
              </div>
              <button (click)="selectedLog = null" class="h-10 w-10 rounded-full flex items-center justify-center hover:bg-google-gray-100 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                <mat-icon>close</mat-icon>
              </button>
            </div>
            <div class="p-8 overflow-y-auto custom-scrollbar">
              <div class="bg-google-gray-900 rounded-3xl p-6 shadow-inner border border-white/5">
                <pre class="text-[13px] font-mono text-google-emerald/90 leading-relaxed overflow-x-auto">{{ selectedLog | json }}</pre>
              </div>
            </div>
            <div class="p-6 border-t dark:border-white/5 flex justify-end bg-google-gray-50/30 dark:bg-white/5">
               <button zrdButton variant="outline" size="sm" (click)="selectedLog = null">Acknowledge Registry</button>
            </div>
          </zrd-card>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .text-gradient {
      background-image: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%);
    }
    @media (prefers-color-scheme: dark) {
      .text-gradient {
        background-image: linear-gradient(135deg, #ffffff 0%, #e8eaed 100%);
      }
    }
    :host ::ng-deep {
      .mat-mdc-paginator-container {
        justify-content: flex-end;
        padding: 0 !important;
      }
      .mat-mdc-paginator { 
        background: transparent !important; 
        min-height: auto !important;
      }
      .mat-mdc-paginator-range-label {
        margin: 0 16px !important;
      }
    }
  `]
})
export class AuditLogsComponent implements OnInit, AfterViewInit {
  private auditService = inject(AUDITLOGSService);

  @ViewChild('identityTemplate', { static: true }) identityTemplate!: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate', { static: true }) dateTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate', { static: true }) actionsTemplate!: TemplateRef<any>;

  columns: ZrdColumnDef<any>[] = [];
  data: any[] = [];
  selectedLog: any = null;
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  currentSort = { active: 'createdAt', direction: 'DESC' };

  ngOnInit() {
    this.columns = [
      { key: 'userId', header: 'Registry Identity', sortable: true, cellTemplate: this.identityTemplate, width: '200px' },
      { key: 'entityType', header: 'Entity Manifest', sortable: true, cellTemplate: this.actionTemplate },
      { key: 'action', header: 'Governance Event', sortable: true, cellTemplate: this.statusTemplate },
      { key: 'createdAt', header: 'Timestamp', sortable: true, cellTemplate: this.dateTemplate },
      { key: 'actions', header: '', align: 'right', cellTemplate: this.actionsTemplate, width: '60px' }
    ];
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.auditService.getAdminAuditLogs(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.currentSort.active,
            this.currentSort.direction
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          if (data === null) return [];
          this.resultsLength = data.totalElements;
          return data.content;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  loadData() {
    this.paginator.page.emit();
  }

  getLogStatusVariant(action: string): any {
    const s = action?.toUpperCase();
    if (s === 'CREATE' || s === 'LOGIN') return 'success';
    if (s === 'UPDATE') return 'info';
    if (s === 'DELETE' || s === 'FAIL') return 'danger';
    return 'neutral';
  }

  getActionIcon(action: string): string {
    const s = action?.toUpperCase();
    if (s === 'CREATE') return 'add_circle';
    if (s === 'UPDATE') return 'edit';
    if (s === 'DELETE') return 'delete';
    if (s === 'LOGIN') return 'login';
    if (s === 'LOGOUT') return 'logout';
    return 'description';
  }

  viewDetails(log: any) {
    this.selectedLog = log;
  }
}
