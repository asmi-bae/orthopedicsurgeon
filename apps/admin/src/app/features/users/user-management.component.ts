import { ZrdCardComponent, ZrdBadgeComponent, ZrdButtonComponent, ZrdInputComponent, ZrdTableComponent, ZrdColumnDef } from '@ui/components';
import { Component, signal, inject, computed, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { USERSROLESService } from '../../core/services/api/usersroles.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, catchError, map, startWith, tap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-management',
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
    DatePipe
  ],
  template: `
    <div class="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight text-gradient bg-clip-text">Identity Governance</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1 text-sm font-medium tracking-tight">Manage system authentication, role assignments, and security profiles.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">person_add</mat-icon>
          Provision New Identity
        </zrd-button>
      </div>

      <!-- Governance Summary Stats -->
      <zrd-card variant="default" class="!p-0 border-none shadow-google overflow-hidden bg-white/70 dark:bg-google-gray-900/70 backdrop-blur-xl transition-all">
        <div class="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-google-gray-100 dark:divide-google-gray-800">
          @for (r of roleSummary(); track r.role) {
            <div 
              class="flex-1 p-6 flex items-center justify-between cursor-pointer hover:bg-google-gray-50/50 dark:hover:bg-google-gray-800/50 transition-all group"
              (click)="filterRole(r.key)"
            >
              <div class="w-24 h-8 flex items-center opacity-40 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 100 30" class="w-full h-full overflow-visible">
                  <path 
                    [attr.d]="getSparkline(r.role)" 
                    fill="none" 
                    [attr.stroke]="getSparklineColor(r.role)" 
                    stroke-width="2.5" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div class="text-right">
                <p class="text-[10px] uppercase tracking-widest font-black text-google-gray-400 m-0 leading-none mb-2">{{ r.role }}</p>
                <div class="flex items-baseline justify-end gap-1">
                  <h3 class="text-3xl font-black text-google-gray-900 dark:text-white m-0 leading-none tabular-nums tracking-tighter">{{ r.count }}</h3>
                  <span class="text-[10px] font-black leading-none bg-google-gray-100 dark:bg-google-gray-800 px-1.5 py-0.5 rounded text-google-gray-500 tracking-tight">+{{ r.count > 0 ? '12%' : '0%' }}</span>
                </div>
              </div>
            </div>
          }
        </div>
      </zrd-card>

      <!-- Identity Directory -->
      <zrd-card variant="default" class="!p-0 shadow-google border-google-gray-100 dark:border-white/5 bg-white dark:bg-sidebar-dark rounded-2xl overflow-hidden">
        <!-- Control Strip -->
        <div class="p-6 border-b border-google-gray-100 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center bg-google-gray-50/30 dark:bg-white/5">
          <div class="w-full md:max-w-sm">
            <zrd-input 
              placeholder="Filter identities..." 
              [hasPrefix]="true"
              (keyup)="onSearch($event)"
              class="w-full"
            >
              <mat-icon prefix class="text-google-gray-400">search</mat-icon>
            </zrd-input>
          </div>

          <div class="flex items-center gap-2 ml-auto">
            <button zrdButton variant="outline" size="sm" [matMenuTriggerFor]="roleMenu">
              <mat-icon leftIcon class="text-google-blue">shield</mat-icon>
              Access Level: {{ roleFilterLabel() }}
            </button>
            <mat-menu #roleMenu="matMenu" class="rounded-2xl border-none shadow-google">
              <button mat-menu-item (click)="filterRole('')">
                <span class="font-bold text-sm">Global View</span>
              </button>
              <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
              <button mat-menu-item (click)="filterRole('DOCTOR_ADMIN')">
                <mat-icon class="text-google-emerald">medical_services</mat-icon>
                <span class="font-bold text-sm">Administrators</span>
              </button>
              <button mat-menu-item (click)="filterRole('PATIENT')">
                <mat-icon class="text-google-amber">person</mat-icon>
                <span class="font-bold text-sm">Platform Users</span>
              </button>
            </mat-menu>
          </div>
        </div>

        @if (loading()) {
          <div class="h-1 -mt-px w-full overflow-hidden">
            <mat-progress-bar mode="indeterminate" class="h-1"></mat-progress-bar>
          </div>
        }

        <!-- Technical Data Table -->
        <div class="p-4 min-h-[400px]">
          <!-- Templates moved outside for reliability -->
          <ng-template #identityTemplate let-row="row">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-google-blue/10 flex items-center justify-center shrink-0 border border-google-blue/20 shadow-sm">
                <span class="text-[11px] font-black text-google-blue uppercase">
                  {{ (row.firstName?.charAt(0) || '') }}{{ (row.lastName?.charAt(0) || '') }}
                </span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-sm font-bold text-google-gray-900 dark:text-white tracking-tight truncate">
                  {{ row.firstName }} {{ row.lastName }}
                </span>
                <span class="text-[10px] text-google-gray-400 font-medium truncate opacity-70">
                  {{ row.email }}
                </span>
              </div>
            </div>
          </ng-template>

          <ng-template #roleTemplate let-value>
            <zrd-badge variant="info" class="font-black text-[9px] px-2 py-0.5 rounded-md border border-google-blue/10 uppercase tracking-tighter">
              {{ getRoleLabel(value || '') }}
            </zrd-badge>
          </ng-template>

          <ng-template #statusTemplate let-row="row">
            <div class="flex items-center gap-2">
              <div [class]="row.enabled ? 'bg-google-emerald/50' : 'bg-google-gray-300'" class="w-1.5 h-1.5 rounded-full shadow-sm"></div>
              <zrd-badge [variant]="$any(row.enabled ? 'success' : 'neutral')" class="font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-tighter">
                {{ row.enabled ? 'Authorized' : 'Restricted' }}
              </zrd-badge>
            </div>
          </ng-template>

          <ng-template #dateTemplate let-value>
            <span class="text-[11px] font-medium text-google-gray-500 tabular-nums tracking-tighter">
              {{ value | date:'MMM d, yyyy' }}
            </span>
          </ng-template>

          <ng-template #actionsTemplate let-row="row">
            <button [matMenuTriggerFor]="actionMenu" [matMenuTriggerData]="{ row: row }" class="h-8 w-8 rounded-md flex items-center justify-center hover:bg-google-gray-100 dark:hover:bg-white/5 text-google-gray-400 transition-all active:scale-95 border border-transparent hover:border-google-gray-200 dark:hover:border-white/10">
              <mat-icon class="text-[18px]">more_horiz</mat-icon>
            </button>
          </ng-template>

          <zrd-table 
            [columns]="columns" 
            [data]="filteredUsers()"
            [loading]="loading()"
            [sortKey]="sortKey()"
            [sortDirection]="sortDirection()"
            (sortChange)="onSortChange($event)"
          ></zrd-table>
        </div>

        <!-- Shared Action Menu (Single instance for performance and accuracy) -->
        <mat-menu #actionMenu="matMenu" class="rounded-xl border-none shadow-google">
          <ng-template matMenuContent let-row="row">
            <button mat-menu-item class="group">
              <mat-icon class="text-google-blue group-hover:scale-110 transition-transform">visibility</mat-icon>
              <span class="font-bold text-sm">Policy Profile</span>
            </button>
            <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
            <button mat-menu-item class="group">
              <mat-icon class="text-google-gray-600 dark:text-google-gray-400 group-hover:scale-110 transition-transform">edit</mat-icon>
              <span class="font-bold text-sm">Edit Identity</span>
            </button>
            <button mat-menu-item [class.text-google-red]="row.enabled" class="!text-google-red" (click)="toggleEnabled(row)">
              <mat-icon class="text-google-red">{{ row.enabled ? 'block' : 'undo' }}</mat-icon>
              <span class="font-bold text-sm">{{ row.enabled ? 'Suspend' : 'Restore' }}</span>
            </button>
            <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
            <button mat-menu-item class="group text-google-red">
              <mat-icon class="text-google-red group-hover:scale-110 transition-transform">delete_outline</mat-icon>
              <span class="font-bold text-sm">Terminate Identity</span>
            </button>
          </ng-template>
        </mat-menu>

        <!-- Directory Footer -->
        <div class="p-6 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between bg-google-gray-50/20 dark:bg-white/5">
          <span class="text-xs font-black text-google-gray-400 uppercase tracking-widest">{{ filteredUsers().length }} Managed Identities</span>
          <div class="flex items-center gap-3">
            <zrd-button variant="ghost" size="sm" [disabled]="true">Previous</zrd-button>
            <zrd-button variant="ghost" size="sm" [disabled]="true">Next</zrd-button>
          </div>
        </div>
      </zrd-card>
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
  `]
})
export class UserManagementComponent implements OnInit {
  private usersRolesService = inject(USERSROLESService);

  @ViewChild('identityTemplate', { static: true }) identityTemplate!: TemplateRef<any>;
  @ViewChild('roleTemplate', { static: true }) roleTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate', { static: true }) dateTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate', { static: true }) actionsTemplate!: TemplateRef<any>;

  columns: ZrdColumnDef<any>[] = [];

  searchQuery = signal('');
  roleFilter = signal('');
  loading = signal(false);
  sortKey = signal<string>('createdAt');
  sortDirection = signal<'ASC' | 'DESC'>('DESC');

  private triggerReload = new BehaviorSubject<void>(undefined);

  private filters$ = toObservable(computed(() => ({ 
    search: this.searchQuery(), 
    role: this.roleFilter() 
  })));

  private users$ = this.filters$.pipe(
    switchMap(filters => {
      this.loading.set(true);
      return this.usersRolesService.getAdminUsers(filters.role || filters.search ? filters : {}).pipe(
        map((res: any) => {
          this.loading.set(false);
          const data = res?.data?.content ?? res?.data ?? res?.content ?? (Array.isArray(res) ? res : []);
          return Array.isArray(data) ? data : [];
        }),
        catchError((err) => {
          console.error('Failed to fetch users', err);
          this.loading.set(false);
          return of([]);
        })
      );
    }),
    startWith([])
  );

  allUsers = toSignal(this.users$, { initialValue: [] });

  filteredUsers = computed(() => {
    let users = [...(this.allUsers() || [])];
    const q = this.searchQuery().toLowerCase();
    const role = this.roleFilter();
    const sk = this.sortKey();
    const sd = this.sortDirection();
    
    // Filtering
    if (role) {
      users = users.filter((u: any) => u.role?.name === role);
    }
    if (q) {
      users = users.filter((u: any) =>
        (u.firstName + ' ' + u.lastName).toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.role?.name?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sk) {
      users.sort((a, b) => {
        const valA = this.getNestedValue(a, sk);
        const valB = this.getNestedValue(b, sk);
        
        let comparison = 0;
        if (valA > valB) comparison = 1;
        if (valA < valB) comparison = -1;
        
        return sd === 'ASC' ? comparison : -comparison;
      });
    }

    return users;
  });

  private summary$ = this.triggerReload.pipe(
    switchMap(() => this.usersRolesService.getAdminUsersRolessummary().pipe(
      map((res: any) => res?.data || res || []),
      catchError((err) => {
        console.error('Failed to fetch role summary', err);
        return of([]);
      })
    ))
  );

  roleSummaryData = toSignal(this.summary$, { initialValue: [] });

  ngOnInit() {
    this.columns = [
      { key: 'firstName', header: 'Identity Profile', sortable: true, cellTemplate: this.identityTemplate, width: '300px' },
      { key: 'role.name', header: 'Access Level', sortable: true, cellTemplate: this.roleTemplate, width: '150px' },
      { key: 'enabled', header: 'Governance Status', sortable: true, cellTemplate: this.statusTemplate, width: '150px' },
      { key: 'createdAt', header: 'Enrollment Date', sortable: true, cellTemplate: this.dateTemplate, width: '150px' },
      { key: 'actions', header: '', align: 'right', cellTemplate: this.actionsTemplate, width: '60px' }
    ];
  }

  roleSummary = computed(() => {
    const apiData = this.roleSummaryData();
    const base = [
      { role: 'Administrators', key: 'DOCTOR_ADMIN', icon: 'medical_services', iconColor: 'text-google-emerald' },
      { role: 'Platform Users', key: 'PATIENT', icon: 'person', iconColor: 'text-google-amber' },
    ];
    
    return base.map(b => ({
      ...b,
      count: (Array.isArray(apiData) && apiData.find((a: any) => a.role === b.key)?.count) || 0
    }));
  });

  roleFilterLabel = computed(() => {
    const role = this.roleFilter();
    if (!role) return 'Global';
    return this.getRoleLabel(role);
  });

  getRoleLabel(role: string): string {
    const map: Record<string, string> = {
      DOCTOR_ADMIN: 'Administrator',
      PATIENT: 'Platform User',
      VISITOR: 'Visitor',
    };
    return map[role] ?? role;
  }

  filterRole(role: string) {
    this.roleFilter.set(role);
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onSortChange(event: { key: string, direction: 'ASC' | 'DESC' }) {
    this.sortKey.set(event.key);
    this.sortDirection.set(event.direction);
  }

  toggleEnabled(user: any) {
    console.log('Toggling user status:', user);
  }

  getSparkline(role: string): string {
    const seed = role.length * 10;
    const points = [];
    for (let i = 0; i <= 100; i += 20) {
      const y = 15 + Math.sin((i + seed) / 10) * 10;
      points.push(`${i},${y}`);
    }
    return `M ${points.join(' L ')}`;
  }

  getSparklineColor(role: string): string {
    const map: Record<string, string> = {
      'Administrators': '#34A853',
      'Platform Users': '#FBBC05'
    };
    return map[role] ?? '#9aa0a6';
  }

  private getNestedValue(obj: any, path: string): any {
    if (!path || !obj) return '';
    try {
      const val = path.split('.').reduce((acc: any, part: string) => acc && acc[part], obj);
      return typeof val === 'string' ? val.toLowerCase() : val;
    } catch (e) {
      return '';
    }
  }
}
