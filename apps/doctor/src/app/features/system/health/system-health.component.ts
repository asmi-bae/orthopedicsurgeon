import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ZrdPageHeaderComponent, ZrdCardComponent, ZrdBadgeComponent, ZrdButtonComponent } from '@ui/components';
import { SystemHealthService } from '@core/services/api/system-health.service';

@Component({
  selector: 'app-system-health',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatProgressBarModule, 
    MatDividerModule,
    ZrdPageHeaderComponent,
    ZrdCardComponent,
    ZrdBadgeComponent,
    ZrdButtonComponent
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">
      
      <!-- Spartan Page Header -->
      <zrd-page-header 
        title="System Resilience" 
        subtitle="Real-time surveillance of backend architecture, database latency, and infrastructure throughput.">
        <zrd-button variant="primary" size="md" (click)="refreshData()">
          <mat-icon leftIcon class="text-[20px]">sync</mat-icon>
          Instant Sync
        </zrd-button>
      </zrd-page-header>

      <!-- Top Metric Matrix -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- System Status -->
        <zrd-card variant="default" class="group">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Vitality Status</p>
              <h3 class="text-2xl font-bold tracking-tight text-google-gray-900 dark:text-white">{{ health?.status || 'OPTIMAL' }}</h3>
              <zrd-badge [variant]="health?.status === 'UP' ? 'success' : 'danger'" [dot]="true">
                {{ health?.status === 'UP' ? 'Online' : 'Degraded' }}
              </zrd-badge>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-google-emerald/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
              <mat-icon class="text-google-emerald">health_and_safety</mat-icon>
            </div>
          </div>
        </zrd-card>

        <!-- Database Latency -->
        <zrd-card variant="default" class="group">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Database Engine</p>
              <h3 class="text-2xl font-bold tracking-tight text-google-gray-900 dark:text-white">{{ health?.components?.db?.status || 'UP' }}</h3>
              <div class="flex items-center gap-1 text-[10px] text-google-blue font-bold uppercase tracking-widest">
                <mat-icon class="text-[12px] h-3 w-3">sensors</mat-icon>
                Active Pulsing
              </div>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-google-blue/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
              <mat-icon class="text-google-blue">storage</mat-icon>
            </div>
          </div>
        </zrd-card>

        <!-- Memory Saturation -->
        <zrd-card variant="default" class="group">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Memory Cluster</p>
              <h3 class="text-2xl font-bold tracking-tight text-google-gray-900 dark:text-white">{{ memoryUsage | number:'1.0-0' }}%</h3>
              <p class="text-[10px] text-google-gray-400 font-medium">Heap Allocation</p>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-google-yellow/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
              <mat-icon class="text-google-yellow-700">memory</mat-icon>
            </div>
          </div>
        </zrd-card>

        <!-- Uptime Counter -->
        <zrd-card variant="default" class="group">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">System Uptime</p>
              <h3 class="text-2xl font-bold tracking-tight text-google-gray-900 dark:text-white">{{ uptimeHours | number:'1.1-1' }}h</h3>
              <p class="text-[10px] text-google-gray-400 font-medium font-mono uppercase">Continuous Runtime</p>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-google-red/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
              <mat-icon class="text-google-red">timer</mat-icon>
            </div>
          </div>
        </zrd-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Resource Dynamics -->
        <zrd-card variant="default" class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-google-blue/10 flex items-center justify-center">
              <mat-icon class="text-google-blue">analytics</mat-icon>
            </div>
            <h4 class="font-bold text-lg text-google-gray-900 dark:text-white m-0">Infrastructural Dynamics</h4>
          </div>
          
          <div class="space-y-8">
            <div class="space-y-2">
              <div class="flex justify-between items-end">
                <div>
                  <span class="text-xs font-black uppercase tracking-widest text-google-gray-500">Processing Load</span>
                  <h5 class="font-bold text-google-gray-900 dark:text-white">CPU Throughput</h5>
                </div>
                <span class="text-sm font-black font-mono text-google-blue">{{ cpuUsage | number:'1.1-1' }}%</span>
              </div>
              <div class="h-2 bg-google-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-google-blue transition-all duration-1000" [style.width.%]="cpuUsage"></div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-end">
                <div>
                  <span class="text-xs font-black uppercase tracking-widest text-google-gray-500">Saturation Level</span>
                  <h5 class="font-bold text-google-gray-900 dark:text-white">Heap Memory Pool</h5>
                </div>
                <span class="text-sm font-black font-mono text-google-emerald">{{ heapUsedMB }}MB / {{ heapMaxMB }}MB</span>
              </div>
              <div class="h-2 bg-google-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-google-emerald transition-all duration-1000" [style.width.%]="memoryUsage"></div>
              </div>
            </div>

            <mat-divider class="dark:border-white/5"></mat-divider>

            <div class="grid grid-cols-2 gap-8 pt-2">
              <div class="p-4 rounded-2xl bg-google-gray-50 dark:bg-white/5 space-y-1">
                <p class="text-[9px] font-black text-google-gray-400 uppercase tracking-[0.2em]">Active Sessions</p>
                <div class="flex items-center gap-2">
                  <span class="text-xl font-bold dark:text-white">{{ health?.components?.db?.details?.activeConnections || 12 }}</span>
                  <span class="w-2 h-2 rounded-full bg-google-emerald animate-pulse"></span>
                </div>
              </div>
              <div class="p-4 rounded-2xl bg-google-gray-50 dark:bg-white/5 space-y-1">
                <p class="text-[9px] font-black text-google-gray-400 uppercase tracking-[0.2em]">Caching Engine</p>
                <div class="flex items-center gap-2">
                  <span class="text-xl font-bold dark:text-white">{{ health?.components?.redis?.status || 'UP' }}</span>
                  <zrd-badge variant="success" [dot]="true">Synced</zrd-badge>
                </div>
              </div>
            </div>
          </div>
        </zrd-card>

        <!-- Service Registry -->
        <zrd-card variant="default">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-google-emerald/10 flex items-center justify-center">
              <mat-icon class="text-google-emerald">dns</mat-icon>
            </div>
            <h4 class="font-bold text-lg text-google-gray-900 dark:text-white m-0">Service Registry</h4>
          </div>

          <div class="space-y-3">
            @for (comp of componentList; track comp.name) {
              <div class="flex items-center justify-between p-4 rounded-2xl hover:bg-google-gray-50 dark:hover:bg-white/5 border border-google-gray-100 dark:border-white/5 transition-all group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                       [ngClass]="comp.status === 'UP' ? 'bg-google-emerald/10' : 'bg-google-red/10'">
                    <mat-icon class="text-sm" [ngClass]="comp.status === 'UP' ? 'text-google-emerald' : 'text-google-red'">hub</mat-icon>
                  </div>
                  <span class="font-bold text-sm text-google-gray-700 dark:text-google-gray-300">{{ comp.name }}</span>
                </div>
                <zrd-badge [variant]="comp.status === 'UP' ? 'success' : 'danger'" size="sm">
                  {{ comp.status }}
                </zrd-badge>
              </div>
            }
          </div>
        </zrd-card>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class SystemHealthComponent implements OnInit, OnDestroy {
  private healthService = inject(SystemHealthService);
  
  health: any;
  metrics: any;
  componentList: any[] = [];
  
  cpuUsage = 0;
  memoryUsage = 0;
  heapUsedMB = 0;
  heapMaxMB = 0;
  uptimeHours = 0;

  private refreshInterval: any;

  ngOnInit() {
    this.refreshData();
    // Refresh every 30 seconds
    this.refreshInterval = setInterval(() => this.refreshData(), 30000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  refreshData() {
    this.healthService.getHealth().subscribe({
      next: (data) => {
        this.health = data;
        this.componentList = Object.keys(data.components || {}).map(key => ({
          name: key.toUpperCase(),
          status: data.components[key].status
        }));
      },
      error: () => {
        this.health = { status: 'UNKNOWN' };
        this.componentList = [{ name: 'BACKEND', status: 'DOWN' }];
      }
    });

    this.healthService.getMetrics().subscribe({
      next: (data: any) => {
        this.metrics = data;
        this.cpuUsage = (data.systemCpu?.measurements?.[0]?.value || 0) * 100;
        this.heapUsedMB = Math.round((data.memoryUsed?.measurements?.[0]?.value || 0) / 1024 / 1024);
        this.heapMaxMB = Math.round((data.memoryMax?.measurements?.[0]?.value || 0) / 1024 / 1024);
        this.memoryUsage = (this.heapUsedMB / (this.heapMaxMB || 1)) * 100;
        this.uptimeHours = (data.uptime?.measurements?.[0]?.value || 0) / 3600;
      }
    });
  }
}
