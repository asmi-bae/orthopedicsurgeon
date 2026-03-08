import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent, ZrdBadgeComponent, ZrdToggleComponent, ZrdPageHeaderComponent } from '@ui/components';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SUPERADMINAPICONTROLService } from '@core/services/api/superadminapicontrol.service';

@Component({
  selector: 'app-api-control',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    ZrdPageHeaderComponent,
    ZrdToggleComponent,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">
      
      <!-- Spartan Page Header -->
      <zrd-page-header 
        title="API Command Center" 
        subtitle="Manage system governance, traffic routing, and security thresholds.">
        <zrd-button variant="primary" size="md" (click)="loadData()">
          <mat-icon leftIcon class="text-[20px]">sync</mat-icon>
          Sync Configuration
        </zrd-button>
      </zrd-page-header>

      <mat-tab-group class="premium-tabs" animationDuration="0ms">
        <!-- Maintenance & Security -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="mr-2">security</mat-icon> Governance
          </ng-template>
          
          <div class="py-8 space-y-8">
            <!-- Maintenance Toggle -->
            <zrd-card variant="default">
              <div class="flex items-center justify-between p-2">
                <div>
                  <h3 class="text-xl font-bold text-google-gray-900 dark:text-white tracking-tight">System Lockdown Mode</h3>
                  <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Restrict all traffic to authorized IP addresses during critical updates.</p>
                </div>
                <zrd-toggle 
                  [(ngModel)]="maintenanceEnabled"
                  (ngModelChange)="toggleLockdown($event)"
                ></zrd-toggle>
              </div>
            </zrd-card>

            <!-- IP Control Columns -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Allowed IPs -->
              <zrd-card variant="default">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 rounded-xl bg-google-blue/10 flex items-center justify-center">
                    <mat-icon class="text-google-blue">vpn_key</mat-icon>
                  </div>
                  <h4 class="font-bold text-lg text-google-gray-900 dark:text-white m-0">Authorized Safe-List</h4>
                </div>

                <div class="flex gap-3 mb-6">
                  <zrd-input 
                    placeholder="Enter trusted IP..." 
                    class="flex-1"
                    [(ngModel)]="newAllowedIp"
                    (keyup.enter)="addAllowedIp()"
                  ></zrd-input>
                  <zrd-button variant="primary" size="sm" (click)="addAllowedIp()">Add</zrd-button>
                </div>

                <div class="flex flex-wrap gap-2">
                  @for (ip of allowedIps; track ip) {
                    <zrd-badge variant="info" class="pl-3 pr-1 py-1 flex items-center gap-2 group">
                      <span class="font-bold tracking-tight">{{ ip }}</span>
                      <button (click)="removeAllowedIp(ip)" class="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                        <mat-icon class="text-sm h-4 w-4">close</mat-icon>
                      </button>
                    </zrd-badge>
                  }
                  @if (allowedIps.length === 0) {
                    <p class="text-sm text-google-gray-400 italic">No IPs currently authorized.</p>
                  }
                </div>
              </zrd-card>

              <!-- Blocked IPs -->
              <zrd-card variant="default">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 rounded-xl bg-google-red/10 flex items-center justify-center">
                    <mat-icon class="text-google-red">block</mat-icon>
                  </div>
                  <h4 class="font-bold text-lg text-google-gray-900 dark:text-white m-0">Intrusion Blacklist</h4>
                </div>

                <div class="flex gap-3 mb-6">
                  <zrd-input 
                    placeholder="Enter offender IP..." 
                    class="flex-1"
                    [(ngModel)]="newBlockedIp"
                    (keyup.enter)="blockIp()"
                  ></zrd-input>
                  <zrd-button variant="danger" size="sm" (click)="blockIp()">Ban IP</zrd-button>
                </div>

                <div class="flex flex-wrap gap-2">
                  @for (ip of blockedIps; track ip) {
                    <zrd-badge variant="danger" class="pl-3 pr-1 py-1 flex items-center gap-2 group">
                      <span class="font-bold tracking-tight">{{ ip }}</span>
                      <button (click)="unblockIp(ip)" class="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                        <mat-icon class="text-sm h-4 w-4">close</mat-icon>
                      </button>
                    </zrd-badge>
                  }
                  @if (blockedIps.length === 0) {
                    <p class="text-sm text-google-gray-400 italic">No IPs currently blacklisted.</p>
                  }
                </div>
              </zrd-card>
            </div>
          </div>
        </mat-tab>

        <!-- Gateway Controls -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="mr-2">router</mat-icon> Gateway
          </ng-template>

          <div class="py-8">
            <zrd-card variant="default">
              <div class="flex flex-col sm:flex-row gap-4 mb-8">
                <div class="flex-1 max-w-sm">
                  <zrd-input 
                    placeholder="Search active circuit breakers..." 
                    [hasPrefix]="true"
                  >
                    <mat-icon prefix class="text-google-gray-400">search</mat-icon>
                  </zrd-input>
                </div>
              </div>

              @if (isLoading) {
                <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
                   <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
                </div>
              }

              <!-- Spartan Endpoint Directory -->
              <div class="space-y-4">
                @for (entry of disabledEndpoints; track entry.path) {
                  <div class="flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-3xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all group border border-google-gray-100 dark:border-white/5 cursor-pointer">
                    <!-- Method Icon -->
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110" 
                         [ngClass]="getMethodIconBg(entry.method)">
                      <mat-icon [ngClass]="getMethodIconColor(entry.method)">api</mat-icon>
                    </div>

                    <!-- Path Info -->
                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-base text-google-gray-900 dark:text-white m-0 tracking-tight group-hover:text-google-blue transition-colors">{{ entry.path }}</h3>
                      <div class="flex items-center gap-x-2 text-[10px] font-black uppercase tracking-widest text-google-gray-400 mt-1">
                         <span [ngClass]="getMethodIconColor(entry.method)">{{ entry.method }}</span>
                         <span class="w-1 h-1 rounded-full bg-google-gray-300"></span>
                         <span>{{ entry.reason }}</span>
                      </div>
                    </div>

                    <!-- Status & Actions -->
                    <div class="flex items-center gap-4 shrink-0">
                      <zrd-badge variant="danger" class="font-black uppercase tracking-widest">
                        DISABLED
                      </zrd-badge>

                      <zrd-button variant="danger" size="sm" (click)="enableEndpoint(entry)">
                        Re-enable
                      </zrd-button>
                    </div>
                  </div>
                }

                @if (disabledEndpoints.length === 0 && !isLoading) {
                  <div class="py-24 text-center">
                    <div class="w-16 h-16 bg-google-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                       <mat-icon class="text-google-emerald text-3xl">task_alt</mat-icon>
                    </div>
                    <h3 class="font-bold text-google-gray-900 dark:text-white">All Gateways Healthy</h3>
                    <p class="text-sm text-google-gray-500 mt-2">No endpoints are currently disabled or under circuit-breaking.</p>
                  </div>
                }
              </div>
            </zrd-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    :host { display: block; }

    :host ::ng-deep {
      .premium-tabs {
        .mat-mdc-tab-header {
           border-bottom: 1px solid rgba(0,0,0,0.05) !important;
        }
        .dark .mat-mdc-tab-header {
           border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .mat-mdc-tab-labels {
           padding: 0 4px !important;
        }
        .mat-mdc-tab {
           height: 48px !important;
           padding: 0 24px !important;
           opacity: 0.6;
           
           &.mdc-tab--active {
             opacity: 1;
             .mdc-tab__text-label {
               color: var(--google-blue-600) !important;
               font-weight: 700 !important;
             }
           }
        }
        .mdc-tab__text-label {
           font-family: 'Inter', sans-serif !important;
           font-size: 13px !important;
           font-weight: 600 !important;
           text-transform: uppercase !important;
           letter-spacing: 0.05em !important;
        }
        .mat-mdc-tab-group-active-indicator-container {
           height: 3px !important;
           .mdc-tab-indicator__content--underline {
             border-color: var(--google-blue-600) !important;
             border-top-left-radius: 4px !important;
             border-top-right-radius: 4px !important;
           }
        }
      }
    }
  `]
})
export class ApiControlComponent implements OnInit {
  private apiControlService = inject(SUPERADMINAPICONTROLService);
  private snackBar = inject(MatSnackBar);

  maintenanceEnabled = false;
  isLoading = false;
  allowedIps: string[] = [];
  blockedIps: string[] = [];
  disabledEndpoints: any[] = [];
  
  newAllowedIp = '';
  newBlockedIp = '';
  
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    
    const obs = [
      this.apiControlService.getAdminApicontrolMaintenancemode(),
      this.apiControlService.getAdminApicontrolAllowedIps(),
      this.apiControlService.getAdminApicontrolBlockedips(),
      this.apiControlService.getAdminApicontrolDisabledEndpoints()
    ];

    forkJoin(obs).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(([maintenance, allowed, blocked, disabled]) => {
      this.maintenanceEnabled = maintenance?.enabled ?? false;
      this.allowedIps = Array.isArray(allowed) ? allowed : [];
      this.blockedIps = Array.isArray(blocked) ? blocked : [];
      
      if (disabled && typeof disabled === 'object') {
        this.disabledEndpoints = Object.keys(disabled).map(key => ({
          method: key.split(' ')[0] || 'UNKNOWN',
          path: key.split(' ')[1] || '',
          reason: disabled[key]
        }));
      } else {
        this.disabledEndpoints = [];
      }
    });
  }

  toggleLockdown(enabled: boolean) {
    this.apiControlService.postAdminApicontrolMaintenancemode(enabled).subscribe({
      next: () => {
        this.maintenanceEnabled = enabled;
        this.snackBar.open(`Lockdown mode ${enabled ? 'activated' : 'deactivated'}`, 'OK', { duration: 3000 });
      },
      error: () => {
        // Revert UI if API fails
        this.maintenanceEnabled = !enabled;
        this.snackBar.open('Error toggling lockdown mode', 'Close', { duration: 3000 });
      }
    });
  }

  addAllowedIp() {
    if (!this.newAllowedIp) return;
    this.apiControlService.postAdminApicontrolAllowedIp(this.newAllowedIp).subscribe(() => {
      this.allowedIps.push(this.newAllowedIp);
      this.newAllowedIp = '';
      this.snackBar.open('IP added to allowlist', 'Close', { duration: 3000 });
    });
  }

  removeAllowedIp(ip: string) {
    this.apiControlService.deleteAdminApicontrolAllowedIp(ip).subscribe(() => {
      this.allowedIps = this.allowedIps.filter(i => i !== ip);
    });
  }

  blockIp() {
    if (!this.newBlockedIp) return;
    this.apiControlService.postAdminApicontrolBlockedip(this.newBlockedIp).subscribe(() => {
      this.blockedIps.push(this.newBlockedIp);
      this.newBlockedIp = '';
      this.snackBar.open('IP blocked', 'Close', { duration: 3000 });
    });
  }

  unblockIp(ip: string) {
    this.apiControlService.deleteAdminApicontrolBlockedipsIp(ip).subscribe(() => {
      this.blockedIps = this.blockedIps.filter(i => i !== ip);
    });
  }

  enableEndpoint(element: any) {
    this.apiControlService.deleteAdminApicontrolEnableEndpoint(element.method, element.path).subscribe(() => {
      this.loadData();
    });
  }

  getMethodIconBg(method: string): string {
    const m = method?.toUpperCase();
    if (m === 'GET') return 'bg-google-emerald/10';
    if (m === 'POST') return 'bg-google-blue/10';
    if (m === 'PUT') return 'bg-google-yellow/10';
    if (m === 'DELETE') return 'bg-google-red/10';
    return 'bg-google-gray-100';
  }

  getMethodIconColor(method: string): string {
    const m = method?.toUpperCase();
    if (m === 'GET') return 'text-google-emerald';
    if (m === 'POST') return 'text-google-blue';
    if (m === 'PUT') return 'text-google-yellow-700';
    if (m === 'DELETE') return 'text-google-red';
    return 'text-google-gray-400';
  }

  getMethodClass(method: string) {
    if (!method) return 'bg-google-gray-100';
    switch (method.toUpperCase()) {
      case 'GET': return 'bg-google-emerald/10 text-google-emerald';
      case 'POST': return 'bg-google-blue/10 text-google-blue';
      case 'PUT': return 'bg-google-yellow/10 text-google-yellow-700';
      case 'DELETE': return 'bg-google-red/10 text-google-red';
      default: return 'bg-google-gray-100 text-google-gray-600';
    }
  }
}
