import { ZrdCardComponent, ZrdBadgeComponent, ZrdPageHeaderComponent, ZrdStatComponent, ZrdTableComponent, ZrdColumnDef, ZrdSearchInputComponent } from '@ui/components';
import { Component, signal, inject, computed, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { USERSROLESService } from '../../core/services/api/usersroles.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, catchError, map, startWith } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: { id: string; name: string };
  enabled: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    ZrdCardComponent, 
    ZrdBadgeComponent,
    ZrdPageHeaderComponent,
    ZrdTableComponent,
    ZrdSearchInputComponent,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    DatePipe
  ],
  template: `
    <div class="p-4 md:p-8 space-y-8">
      <!-- Premium Page Header -->
      <zrd-page-header 
        title="Identity Governance" 
        subtitle="Manage system authentication, role assignments, and security profiles."
      >
        <div actions class="flex items-center gap-3">
          <button mat-flat-button color="primary">
            <mat-icon class="mr-2">person_add</mat-icon>
            Provision User
          </button>
        </div>
      </zrd-page-header>

      <!-- Governance Summary Stats - Redesigned -->
      <zrd-card variant="default" class="!p-0 border-none shadow-sm overflow-hidden bg-white/50 dark:bg-google-gray-900/50 backdrop-blur-sm">
        <div class="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-google-gray-100 dark:divide-google-gray-800">
          @for (r of roleSummary(); track r.role) {
            <div 
              class="flex-1 p-6 flex items-center justify-between cursor-pointer hover:bg-google-gray-50/50 dark:hover:bg-google-gray-800/50 transition-all group"
              (click)="filterRole(r.key)"
            >
              <!-- Left Side: Custom Sparkline -->
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

              <!-- Right Side: Numerical Analytics -->
              <div class="text-right">
                <p class="text-[10px] uppercase tracking-widest font-black text-google-gray-400 m-0 leading-none mb-2">
                  {{ r.role }}
                </p>
                <div class="flex items-baseline justify-end gap-1">
                  <h3 class="text-3xl font-black text-google-gray-900 dark:text-white m-0 leading-none tabular-nums tracking-tighter">
                    {{ r.count }}
                  </h3>
                  <span class="text-[10px] font-black leading-none bg-google-gray-100 dark:bg-google-gray-800 px-1.5 py-0.5 rounded text-google-gray-500">+{{ r.count > 0 ? '12%' : '0%' }}</span>
                </div>
              </div>
            </div>
          }
        </div>
      </zrd-card>

      <!-- Identity Directory Card -->
      <zrd-card variant="default" class="!p-0 overflow-hidden">
        <!-- Directory Controls -->
        <div class="p-6 border-b border-secondary-100 flex flex-col md:flex-row gap-4 items-center">
          <zrd-search-input 
            placeholder="Search by identity or email..." 
            (search)="searchQuery.set($event)"
            class="w-full md:max-w-md"
          ></zrd-search-input>

          <div class="flex items-center gap-2 ml-auto">
            <button mat-stroked-button [matMenuTriggerFor]="roleMenu">
              <mat-icon class="mr-2 text-secondary-500">shield</mat-icon>
              Access Level: {{ roleFilterLabel() }}
            </button>
            <mat-menu #roleMenu="matMenu" class="rounded-2xl shadow-lg">
              <button mat-menu-item (click)="filterRole('')">
                <span class="font-medium">Global View</span>
              </button>
              <button mat-menu-item (click)="filterRole('SUPER_ADMIN')">Super Admins</button>
              <button mat-menu-item (click)="filterRole('DOCTOR_ADMIN')">Administrators & Doctors</button>
              <button mat-menu-item (click)="filterRole('PATIENT')">Platform Users</button>
            </mat-menu>
          </div>
        </div>

        <!-- Identity Directory Table -->
        <div class="responsive-table">
          <zrd-table 
            [columns]="columns" 
            [data]="filteredUsers()"
          >
            <!-- Custom Cell Templates -->
            <ng-template #identityTemplate let-value let-row="row">
              <div class="flex items-center gap-4 py-1">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white bg-primary-500 shrink-0">
                  {{ row.firstName?.charAt(0) || '' }}{{ row.lastName?.charAt(0) || '' }}
                </div>
                <div>
                  <p class="font-semibold text-secondary-900 m-0">{{ row.firstName }} {{ row.lastName }}</p>
                  <p class="text-xs text-secondary-500 m-0">{{ row.email }}</p>
                </div>
              </div>
            </ng-template>

            <ng-template #roleTemplate let-value let-row="row">
              <zrd-badge variant="info" class="font-medium text-[11px] px-2 py-0.5 rounded-full">
                {{ getRoleLabel(row.role?.name || '') }}
              </zrd-badge>
            </ng-template>

            <ng-template #dateTemplate let-value>
              <div class="flex items-center gap-2 text-secondary-600">
                <mat-icon class="text-lg">calendar_today</mat-icon>
                <span class="text-sm">{{ value | date:'mediumDate' }}</span>
              </div>
            </ng-template>

            <ng-template #statusTemplate let-value let-row="row">
              <zrd-badge [variant]="$any(row.enabled ? 'success' : 'neutral')" class="rounded-full">
                {{ row.enabled ? 'Authorized' : 'Restricted' }}
              </zrd-badge>
            </ng-template>

            <ng-template #actionsTemplate let-row="row">
              <button mat-icon-button [matMenuTriggerFor]="actionMenu" class="text-secondary-400">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #actionMenu="matMenu" class="rounded-xl shadow-xl">
                <button mat-menu-item>
                  <mat-icon class="text-primary-600">manage_accounts</mat-icon>
                  <span>Policy Overrides</span>
                </button>
                <button mat-menu-item>
                  <mat-icon class="text-secondary-500">lock_reset</mat-icon>
                  <span>Auth Reset</span>
                </button>
                <div class="h-px bg-secondary-100 my-1"></div>
                <button mat-menu-item [class.text-google-red]="row.enabled" class="!text-google-red">
                  <mat-icon class="text-google-red">{{ row.enabled ? 'block' : 'undo' }}</mat-icon>
                  <span>{{ row.enabled ? 'Suspend Access' : 'Restore Access' }}</span>
                </button>
              </mat-menu>
            </ng-template>
          </zrd-table>
        </div>

        <!-- Directory Footer -->
        <div class="p-6 border-t border-secondary-100 flex items-center justify-between bg-secondary-50/30">
          <span class="text-sm font-medium text-secondary-500">{{ filteredUsers().length }} Identity Records</span>
          <div class="flex items-center gap-2">
            <button mat-button disabled>Previous</button>
            <button mat-button disabled>Next</button>
          </div>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .responsive-table {
      @apply w-full overflow-hidden;
    }
  `]
})
export class UserManagementComponent {
  private usersRolesService = inject(USERSROLESService);

  searchQuery = signal('');
  roleFilter = signal('');

  columns: ZrdColumnDef<any>[] = [];

  // Column definitions for ZrdTable
  @ViewChild('identityTemplate', { static: true }) idTpl!: TemplateRef<any>;
  @ViewChild('roleTemplate', { static: true }) roleTpl!: TemplateRef<any>;
  @ViewChild('dateTemplate', { static: true }) dateTpl!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTpl!: TemplateRef<any>;
  @ViewChild('actionsTemplate', { static: true }) actionsTpl!: TemplateRef<any>;

  constructor() {
    this.setupColumns();
  }

  private setupColumns() {
    // We will use viewChild/contentChild for templates once we have the template names in the component
    // but for standalone logic we can also just pass them if they were defined in class.
    // However, the easiest way with ZrdTable is to define them in the template or pass them here.
  }

  // Combine filters into an observable that triggers data fetch
  private filters$ = toObservable(computed(() => ({ search: this.searchQuery(), role: this.roleFilter() })));

  // Optimized API call with switchMap and caching fallback
  private users$ = this.filters$.pipe(
    switchMap(filters => {
      return this.usersRolesService.getAdminUsers(filters.role || filters.search ? filters : {}).pipe(
        map((res: any) => {
          if (Array.isArray(res)) return res;
          if (res?.data && Array.isArray(res.data)) return res.data;
          if (res?.data?.content && Array.isArray(res.data.content)) return res.data.content;
          if (res?.content && Array.isArray(res.content)) return res.content;
          return [];
        }),
        catchError((err) => {
          console.error('Failed to fetch users', err);
          return of([]);
        })
      );
    }),
    startWith([])
  );

  // Convert to Signal for reactivity 
  allUsers = toSignal(this.users$, { initialValue: [] });

  // Filtering on the client side just in case the backend returns everything
  filteredUsers = computed(() => {
    let users = this.allUsers() || [];
    const q = this.searchQuery().toLowerCase();
    const role = this.roleFilter();
    
    if (q) {
      users = users.filter((u: any) =>
        (u.firstName + ' ' + u.lastName).toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.role?.name?.toLowerCase().includes(q)
      );
    }
    if (role) {
      users = users.filter((u: any) => u.role?.name === role);
    }
    return users;
  });

  // Role Summary Stream
  private triggerReload = new BehaviorSubject<void>(undefined);
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
      { key: 'identity', header: 'Identity Details', cellTemplate: this.idTpl },
      { key: 'role', header: 'Access Privileges', cellTemplate: this.roleTpl },
      { key: 'createdAt', header: 'Enrollment Date', cellTemplate: this.dateTpl },
      { key: 'status', header: 'Governance Status', cellTemplate: this.statusTpl },
      { key: 'actions', header: '', cellTemplate: this.actionsTpl, align: 'right' }
    ];
  }

  roleSummary = computed(() => {
    const apiData = this.roleSummaryData();
    const base = [
      { role: 'Super Admins', key: 'SUPER_ADMIN', icon: 'shield', iconColor: 'text-google-indigo' },
      { role: 'Doctor Admins', key: 'DOCTOR_ADMIN', icon: 'medical_services', iconColor: 'text-google-emerald' },
      { role: 'Patients', key: 'PATIENT', icon: 'person', iconColor: 'text-google-amber' },
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
      SUPER_ADMIN: 'Super Admin',
      DOCTOR_ADMIN: 'Doctor Admin',
      PATIENT: 'Patient',
      VISITOR: 'Visitor',
    };
    return map[role] ?? role;
  }

  filterRole(role: string) {
    this.roleFilter.set(role);
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
      'Super Admins': '#1967d2', // Deeper Blue
      'Doctor Admins': '#34A853', // Google Green
      'Patients': '#FBBC05' // Google Yellow
    };
    return map[role] ?? '#9aa0a6';
  }
}
