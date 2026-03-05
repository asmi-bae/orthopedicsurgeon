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
import { MatTooltipModule } from '@angular/material/tooltip';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  status: string;
  joined: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Identity Governance</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage system authentication, role assignments, and security profiles.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">person_add</mat-icon>
          Provision User
        </zrd-button>
      </div>

      <!-- Governance Summary Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        @for (r of roleSummary; track r.role) {
          <zrd-card variant="default" class="group hover:scale-[1.02] transition-transform cursor-pointer">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-google-gray-50 dark:bg-white/5 transition-colors group-hover:bg-google-blue/10">
                <mat-icon class="text-[24px]" [class]="r.iconColor">{{ r.icon }}</mat-icon>
              </div>
              <div class="flex flex-col">
                <span class="text-2xl font-black text-google-gray-900 dark:text-white leading-none">{{ r.count }}</span>
                <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400 mt-1">{{ r.role }}</span>
              </div>
            </div>
          </zrd-card>
        }
      </div>

      <!-- Identity Directory Card -->
      <zrd-card variant="default">
        <!-- Directory Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex-1 max-w-sm">
            <zrd-input 
              placeholder="Search by identity or email..." 
              [hasPrefix]="true"
              (input)="filterSearch($event)"
            >
              <mat-icon prefix class="text-google-gray-400">admin_panel_settings</mat-icon>
            </zrd-input>
          </div>

          <div class="flex items-center gap-2 ml-auto">
            <zrd-button variant="outline" size="sm" [matMenuTriggerFor]="roleMenu">
              <mat-icon leftIcon>shield</mat-icon>
              Access Level: {{ roleFilter() || 'Global' }}
            </zrd-button>
            <mat-menu #roleMenu="matMenu" class="rounded-2xl border-none shadow-google">
              <button mat-menu-item (click)="filterRole('')">
                <span class="font-bold">Global View</span>
              </button>
              <button mat-menu-item (click)="filterRole('SUPER_ADMIN')">Super Admins</button>
              <button mat-menu-item (click)="filterRole('ADMIN')">Administrators</button>
              <button mat-menu-item (click)="filterRole('DOCTOR')">Medical Practitioners</button>
              <button mat-menu-item (click)="filterRole('PATIENT')">Platform Users</button>
            </mat-menu>
          </div>
        </div>

        <!-- Identity Directory Table -->
        <div class="overflow-x-auto -mx-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-google-gray-100 dark:border-white/5 bg-google-gray-50/50 dark:bg-white/5">
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest pl-10">Identity Details</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Access Privileges</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Enrollment Date</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Governance Status</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest text-right pr-10">Management</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-google-gray-100 dark:divide-white/5">
              @for (row of filteredUsers(); track row.id) {
                <tr class="hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                  <td class="px-6 py-5 pl-10">
                    <div class="flex items-center gap-4">
                      <div class="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black text-white bg-google-gray-400 shrink-0 uppercase tracking-tighter">
                        {{ row.firstName.charAt(0) }}{{ row.lastName.charAt(0) }}
                      </div>
                      <div>
                        <p class="font-bold text-sm text-google-gray-900 dark:text-white m-0 tracking-tight">{{ row.firstName }} {{ row.lastName }}</p>
                        <p class="text-[10px] font-black uppercase tracking-widest text-google-gray-400 m-0">{{ row.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex flex-wrap gap-2">
                      @for (role of row.roles; track role) {
                        <zrd-badge variant="info" class="font-black text-[10px]">{{ getRoleLabel(role) }}</zrd-badge>
                      }
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-2 text-google-gray-600 dark:text-google-gray-400">
                      <mat-icon class="text-[18px]">verified_user</mat-icon>
                      <span class="text-sm font-bold tracking-tight">{{ row.joined }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <zrd-badge [variant]="$any(row.status === 'ACTIVE' ? 'success' : 'neutral')">
                      {{ row.status === 'ACTIVE' ? 'Authorized' : 'Restricted' }}
                    </zrd-badge>
                  </td>
                  <td class="px-6 py-5 text-right pr-10">
                    <button [matMenuTriggerFor]="actionMenu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                      <mat-icon>tune</mat-icon>
                    </button>
                    <mat-menu #actionMenu="matMenu" class="rounded-2xl border-none shadow-google">
                      <button mat-menu-item>
                        <mat-icon class="text-google-blue">manage_accounts</mat-icon>
                        <span class="font-bold text-sm">Policy Overrides</span>
                      </button>
                      <button mat-menu-item>
                        <mat-icon class="text-google-gray-600">lock_reset</mat-icon>
                        <span class="font-bold text-sm">Auth Reset</span>
                      </button>
                      <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                      <button mat-menu-item [class.text-google-red]="row.status === 'ACTIVE'" class="!text-google-red">
                        <mat-icon class="text-google-red">{{ row.status === 'ACTIVE' ? 'block' : 'undo' }}</mat-icon>
                        <span class="font-bold text-sm">{{ row.status === 'ACTIVE' ? 'Suspend Access' : 'Restore Access' }}</span>
                      </button>
                    </mat-menu>
                  </td>
                </tr>
              }
            </tbody>
          </table>

          @if (filteredUsers().length === 0) {
            <div class="py-24 text-center">
              <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <mat-icon class="text-google-gray-400 text-3xl">no_accounts</mat-icon>
              </div>
              <h3 class="font-bold text-google-gray-900 dark:text-white">Identity Not Found</h3>
              <p class="text-sm text-google-gray-500 max-w-xs mx-auto mt-2">No user profiles match your specified governance parameters.</p>
            </div>
          }
        </div>

        <!-- Identity Directory Footer -->
        <div class="px-6 py-4 mt-6 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">{{ filteredUsers().length }} Identity Records</span>
          <div class="flex items-center gap-2">
            <zrd-button variant="ghost" size="sm" [disabled]="true">Previous</zrd-button>
            <zrd-button variant="ghost" size="sm" [disabled]="true">Next</zrd-button>
          </div>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class UserManagementComponent {
  searchQuery = signal('');
  roleFilter = signal('');

  allUsers = signal<User[]>([
    { id: '1', firstName: 'Admin',   lastName: 'User',       email: 'admin@orthosync.com',      roles: ['SUPER_ADMIN', 'ADMIN'], status: 'ACTIVE',   joined: 'Jan 1, 2024' },
    { id: '2', firstName: 'Sarah',   lastName: 'Johnson',    email: 'sarah.j@orthosync.com',    roles: ['ADMIN'],                status: 'ACTIVE',   joined: 'Feb 14, 2024' },
    { id: '3', firstName: 'Dr. Mike', lastName: 'Ross',      email: 'mike.ross@hospital.com',   roles: ['DOCTOR'],               status: 'ACTIVE',   joined: 'Mar 3, 2024' },
    { id: '4', firstName: 'John',    lastName: 'Doe',         email: 'john.doe@gmail.com',       roles: ['PATIENT'],              status: 'ACTIVE',   joined: 'Apr 10, 2024' },
    { id: '5', firstName: 'Mike',    lastName: 'Reception',  email: 'mike.r@hospital.com',      roles: ['STAFF'],                status: 'INACTIVE', joined: 'May 5, 2024' },
    { id: '6', firstName: 'Lisa',    lastName: 'Chen',       email: 'lisa.chen@orthosync.com',  roles: ['DOCTOR'],               status: 'ACTIVE',   joined: 'Jun 20, 2024' },
  ]);

  filteredUsers = () => {
    let users = this.allUsers();
    const q = this.searchQuery().toLowerCase();
    const role = this.roleFilter();
    if (q) users = users.filter((u: User) =>
      (u.firstName + ' ' + u.lastName).toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.roles.some((r: string) => r.toLowerCase().includes(q))
    );
    if (role) users = users.filter((u: User) => u.roles.includes(role));
    return users;
  };

  roleSummary = [
    { role: 'Super Admins', count: 1, icon: 'shield',           iconBg: 'bg-google-indigo/10', iconColor: 'text-google-indigo' },
    { role: 'Admins',       count: 2, icon: 'admin_panel_settings', iconBg: 'bg-google-blue/10',   iconColor: 'text-google-blue'   },
    { role: 'Doctors',      count: 2, icon: 'medical_services', iconBg: 'bg-google-emerald/10', iconColor: 'text-google-emerald' },
    { role: 'Patients',     count: 1, icon: 'person',           iconBg: 'bg-google-amber/10',  iconColor: 'text-google-amber'  },
  ];

  getRoleLabel(role: string): string {
    const map: Record<string, string> = {
      SUPER_ADMIN: 'Super Admin',
      ADMIN: 'Admin',
      DOCTOR: 'Doctor',
      PATIENT: 'Patient',
      STAFF: 'Staff',
    };
    return map[role] ?? role;
  }

  filterSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  filterRole(role: string) {
    this.roleFilter.set(role);
  }
}
