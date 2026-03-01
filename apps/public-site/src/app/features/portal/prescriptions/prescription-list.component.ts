import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZrdTableComponent, ZrdBadgeComponent, ZrdButtonComponent, ZrdPageHeaderComponent, ZrdColumnDef } from '@repo/ui';

@Component({
  selector: 'app-prescription-list',
  standalone: true,
  imports: [CommonModule, ZrdTableComponent, ZrdBadgeComponent, ZrdButtonComponent, ZrdPageHeaderComponent],
  template: `
    <zrd-page-header title="Prescriptions" subtitle="A digital record of all medications prescribed to you."></zrd-page-header>

    <div class="space-y-6">
       <zrd-table [columns]="columns" [data]="prescriptions()" [loading]="loading()">
          <ng-template #actionTemplate let-row>
             <button zrdButton variant="outline" size="sm">
                <i class="pi pi-download mr-1"></i> PDF
             </button>
          </ng-template>
       </zrd-table>
    </div>
  `
})
export class PrescriptionListComponent {
  loading = signal(false);
  
  prescriptions = signal([
    { id: '1', doctor: 'Dr. Sarah Johnson', date: '2024-10-10', diagnosis: 'Knee Osteoarthritis', medicines: 'Ibuprofen, Glucosamine', status: 'ACTIVE' },
    { id: '2', doctor: 'Dr. Mike Ross', date: '2024-09-25', diagnosis: 'Ligament Strain', medicines: 'RICE Therapy, Pain Relief', status: 'COMPLETED' },
    { id: '3', doctor: 'Dr. David King', date: '2024-08-15', diagnosis: 'Post-Surgery recovery', medicines: 'Antibiotics, Pain killers', status: 'COMPLETED' },
  ]);

  columns: ZrdColumnDef[] = [
    { key: 'date', header: 'Date', width: '120px' },
    { key: 'doctor', header: 'Doctor' },
    { key: 'diagnosis', header: 'Diagnosis' },
    { key: 'medicines', header: 'Medicines' },
    { key: 'actions', header: 'Download', cellTemplate: 'actionTemplate', width: '120px' }
  ];
}
