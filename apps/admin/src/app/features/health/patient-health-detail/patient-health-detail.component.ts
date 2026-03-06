import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HEALTHRECORDSAdminAccessService } from '../../../core/services/api/healthrecords-admin-access.service';
import { RecordVitalsDialogComponent } from '@features/health/components/record-vitals-dialog/record-vitals-dialog.component';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdBadgeComponent 
} from '@repo/ui';

@Component({
  selector: 'app-patient-health-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ZrdCardComponent,
    ZrdButtonComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    DecimalPipe,
    DatePipe
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">
      
      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <nav class="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-google-gray-400">
            <a routerLink="/patients" class="hover:text-google-blue transition-colors">Directory</a>
            <mat-icon class="text-[12px] w-auto h-auto">chevron_right</mat-icon>
            <span class="text-google-gray-600">Clinical Governance</span>
          </nav>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Patient Health Dossier</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1" *ngIf="patientId()">Unified diagnostic history for subject identity: {{ patientId() }}</p>
        </div>
        <zrd-button variant="primary" (click)="openRecordVitals()">
          <mat-icon leftIcon>monitor_heart</mat-icon>
          Update Clinical Vitals
        </zrd-button>
      </div>

      @if (loading()) {
        <div class="relative h-1 -mx-4 overflow-hidden rounded-full">
           <mat-progress-bar mode="query" color="primary"></mat-progress-bar>
        </div>
      }

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Clinical Analytics Column -->
        <div class="lg:col-span-1 space-y-8">
          <zrd-card variant="default">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-lg font-black text-google-gray-900 dark:text-white tracking-tight m-0">Biological Indicators</h2>
              <mat-icon class="text-google-blue">analytics</mat-icon>
            </div>
            
            @if (vitals(); as v) {
              <div class="space-y-6">
                <div class="flex items-center justify-between p-4 rounded-2xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-100 dark:border-white/5 group hover:border-google-blue/30 transition-all">
                  <div class="flex flex-col">
                    <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Blood Pressure</span>
                    <span class="text-lg font-black text-google-gray-900 dark:text-white mt-1">{{ v.systolic }}/{{ v.diastolic }} <span class="text-[10px] text-google-gray-400 font-bold ml-1 uppercase">mmHg</span></span>
                  </div>
                  <mat-icon class="text-google-gray-400 group-hover:text-google-blue transition-colors">favorite</mat-icon>
                </div>

                <div class="flex items-center justify-between p-4 rounded-2xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-100 dark:border-white/5 group hover:border-google-blue/30 transition-all">
                  <div class="flex flex-col">
                    <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Resting Heart Rate</span>
                    <span class="text-lg font-black text-google-gray-900 dark:text-white mt-1">{{ v.heartRate }} <span class="text-[10px] text-google-gray-400 font-bold ml-1 uppercase">bpm</span></span>
                  </div>
                  <mat-icon class="text-google-gray-400 group-hover:text-google-blue transition-colors">pulse_alert</mat-icon>
                </div>

                <div class="flex items-center justify-between p-4 rounded-2xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-100 dark:border-white/5 group hover:border-google-blue/30 transition-all">
                  <div class="flex flex-col">
                    <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Surface Temp</span>
                    <span class="text-lg font-black text-google-gray-900 dark:text-white mt-1">{{ v.temperature }} <span class="text-[10px] text-google-gray-400 font-bold ml-1 uppercase">°C</span></span>
                  </div>
                  <mat-icon class="text-google-gray-400 group-hover:text-google-blue transition-colors">thermostat</mat-icon>
                </div>

                <div class="flex items-center justify-between p-4 rounded-2xl bg-google-blue/5 border border-google-blue/10">
                  <div class="flex flex-col">
                    <span class="text-[10px] font-black uppercase tracking-widest text-google-blue/60">Oxygen Saturation</span>
                    <span class="text-lg font-black text-google-blue mt-1">{{ v.oxygenSaturation }}%</span>
                  </div>
                  <mat-icon class="text-google-blue">air</mat-icon>
                </div>

                <div class="pt-6 mt-6 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">Body Mass Index</span>
                    <span class="text-sm font-bold text-google-gray-900 dark:text-white mt-1">{{ v.bmi | number:'1.1-1' }} <span class="text-[10px] text-google-gray-400 ml-1">SCORE</span></span>
                  </div>
                  <zrd-badge [variant]="getBmiStatus(v.bmi)">{{ getBmiLabel(v.bmi) }}</zrd-badge>
                </div>
                
                <p class="text-[10px] text-google-gray-400 mt-4 italic text-center font-bold tracking-widest uppercase" *ngIf="v.recordedAt">Verified At: {{ v.recordedAt | date:'medium' }}</p>
              </div>
            } @else {
              <div class="py-16 text-center">
                <div class="w-16 h-16 bg-google-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <mat-icon class="text-google-gray-300 text-3xl">history</mat-icon>
                </div>
                <h3 class="font-bold text-google-gray-900 dark:text-white">Telemetry Void</h3>
                <p class="text-sm text-google-gray-500 mt-2 px-6">No historical biological data has been indexed for this profile.</p>
              </div>
            }
          </zrd-card>

          <zrd-card variant="default">
             <div class="grid grid-cols-2 gap-6">
                <div class="bg-google-blue/5 p-5 rounded-3xl border border-google-blue/10 flex flex-col items-center text-center">
                   <span class="text-[10px] font-black uppercase tracking-widest text-google-blue/60">Active Scripts</span>
                   <span class="text-3xl font-black text-google-blue mt-1">{{ dashboard()?.activePrescriptions || 0 }}</span>
                </div>
                <div class="bg-google-red/5 p-5 rounded-3xl border border-google-red/10 flex flex-col items-center text-center">
                   <span class="text-[10px] font-black uppercase tracking-widest text-google-red/60">Open Payments</span>
                   <span class="text-3xl font-black text-google-red mt-1">{{ dashboard()?.pendingPayments || 0 }}</span>
                </div>
             </div>
          </zrd-card>
        </div>

        <!-- Clinical Timeline Stream -->
        <div class="lg:col-span-2">
          <zrd-card variant="default" class="h-full flex flex-col">
            <div class="flex items-center justify-between mb-10">
              <h2 class="text-lg font-black text-google-gray-900 dark:text-white tracking-tight m-0">Clinical Journey Stream</h2>
              <zrd-button variant="ghost" size="sm">Audit Complete Log</zrd-button>
            </div>
            
            <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              @if (timeline().length > 0) {
                <div class="relative pl-12 space-y-10 before:content-[''] before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-google-gray-100 dark:before:bg-white/5 before:rounded-full">
                  @for (event of timeline(); track event.id) {
                    <div class="relative group">
                      <div class="absolute -left-[45px] top-1 w-10 h-10 rounded-2xl bg-white dark:bg-google-gray-900 border-2 border-google-gray-100 dark:border-white/10 z-10 flex items-center justify-center transition-all group-hover:border-google-blue group-hover:scale-110 shadow-sm">
                        <mat-icon class="text-[20px] text-google-gray-400 group-hover:text-google-blue transition-colors">{{ getEventIcon(event.eventType) }}</mat-icon>
                      </div>
                      <div class="flex flex-col">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-black text-google-gray-400 uppercase tracking-widest">{{ event.eventDate | date:'mediumDate' }} • {{ event.eventDate | date:'shortTime' }}</span>
                          <zrd-badge variant="neutral" class="text-[8px] px-2 py-0 font-black">SYSTEM_LOG</zrd-badge>
                        </div>
                        <h4 class="font-black text-base text-google-gray-900 dark:text-white mt-2 mb-1 tracking-tight group-hover:text-google-blue transition-colors">{{ event.eventType?.replace('_', ' ') }}</h4>
                        <p class="text-sm text-google-gray-600 dark:text-google-gray-400 leading-relaxed font-medium mt-1">{{ event.description }}</p>
                      </div>
                    </div>
                  }
                </div>
              } @else {
                <div class="py-32 text-center">
                  <div class="w-16 h-16 bg-google-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <mat-icon class="text-google-gray-300 text-3xl">history_toggle_off</mat-icon>
                  </div>
                  <h3 class="font-bold text-google-gray-900 dark:text-white">Stream Sync Pending</h3>
                  <p class="text-sm text-google-gray-500 mt-2">No clinical events have been broadcast for this entity.</p>
                </div>
              }
            </div>
          </zrd-card>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class PatientHealthDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private healthService = inject(HEALTHRECORDSAdminAccessService);
  private dialog = inject(MatDialog);
 
  patientId = signal<string>('');
  vitals = signal<any | null>(null);
  dashboard = signal<any | null>(null);
  timeline = signal<any[]>([]);
  loading = signal(false);
 
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientId.set(id);
      this.loadData();
    }
  }
 
  loadData(): void {
    const id = this.patientId();
    this.loading.set(true);

    this.healthService.getAdminHealthrecordsVitalsPatientId(id).subscribe({
      next: (res: any) => {
        this.vitals.set(res?.data || null);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });

    // Note: getPatientDashboard and getPatientTimelineForAdmin might need to be resolved 
    // if they are not in HEALTHRECORDSAdminAccessService. For now, we connect what we can.
  }
 
  openRecordVitals(): void {
    const dialogRef = this.dialog.open(RecordVitalsDialogComponent, {
      width: '600px',
      data: { patientId: this.patientId() }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
 
  getEventIcon(type: string): string {
    switch (type) {
      case 'APPOINTMENT': return 'event';
      case 'PRESCRIPTION': return 'history_edu';
      case 'LAB_REPORT': return 'biotech';
      case 'VITAL_SIGNS': return 'monitor_heart';
      case 'PAYMENT': return 'payments';
      default: return 'radio_button_checked';
    }
  }
 
  getBmiStatus(bmi: number): any {
    if (bmi < 18.5) return 'warning';
    if (bmi < 25) return 'success';
    return 'danger';
  }

  getBmiLabel(bmi: number): string {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Healthy Range';
    return 'Health Risk';
  }
}
