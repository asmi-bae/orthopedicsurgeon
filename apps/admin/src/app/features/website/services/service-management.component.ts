import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent, ZrdBadgeComponent } from '@ui/components';
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HOSPITALSERVICESMANAGEMENTService } from '../../../core/services/api/hospitalservicesmanagement.service';
import { WEBSITECONTROLService } from '../../../core/services/api/websitecontrol.service';

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Services Directory</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage treatments, display details, and pricing information.</p>
        </div>
        @if (!showForm()) {
          <zrd-button variant="primary" size="md" (click)="openForm()">
            <mat-icon leftIcon class="text-[20px]">add</mat-icon>
            Add New Service
          </zrd-button>
        }
      </div>

      @if (loading()) {
        <div class="relative h-1 mb-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      <!-- Services Data Table -->
      @if (!showForm()) {
        <zrd-card variant="default">
          <div class="overflow-x-auto">
            <table mat-table [dataSource]="services()" class="w-full bg-transparent">
              
              <!-- Service Column -->
              <ng-container matColumnDef="service">
                <th mat-header-cell *matHeaderCellDef class="font-bold text-xs uppercase tracking-widest text-google-gray-500 py-4 px-6 border-b border-google-gray-200 dark:border-white/10">Service</th>
                <td mat-cell *matCellDef="let element" class="py-4 px-6 border-b border-google-gray-100 dark:border-white/5">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-[12px] bg-google-gray-100 dark:bg-white/5 flex items-center justify-center border border-google-gray-200 dark:border-white/10 shrink-0">
                      @if (element.imageUrl) {
                         <img [src]="element.imageUrl" class="w-full h-full object-cover rounded-[12px]">
                      } @else {
                         <mat-icon class="text-google-gray-400">medical_services</mat-icon>
                      }
                    </div>
                    <div>
                      <h4 class="font-bold text-google-gray-900 dark:text-white text-sm m-0">{{ element.name }}</h4>
                      <p class="text-xs text-google-gray-500 max-w-[200px] truncate">{{ element.description || 'No description provided' }}</p>
                    </div>
                  </div>
                </td>
              </ng-container>

              <!-- Category Column -->
              <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef class="font-bold text-xs uppercase tracking-widest text-google-gray-500 py-4 px-6 border-b border-google-gray-200 dark:border-white/10">Category</th>
                <td mat-cell *matCellDef="let element" class="py-4 px-6 border-b border-google-gray-100 dark:border-white/5">
                   <zrd-badge variant="default" class="bg-google-gray-100 text-google-gray-600 dark:bg-white/5 dark:text-google-gray-300 border-0">{{ element.category }}</zrd-badge>
                </td>
              </ng-container>

              <!-- Stats Column -->
              <ng-container matColumnDef="stats">
                <th mat-header-cell *matHeaderCellDef class="font-bold text-xs uppercase tracking-widest text-google-gray-500 py-4 px-6 border-b border-google-gray-200 dark:border-white/10">Details</th>
                <td mat-cell *matCellDef="let element" class="py-4 px-6 border-b border-google-gray-100 dark:border-white/5 whitespace-nowrap">
                   <div class="text-sm font-medium text-google-gray-700 dark:text-google-gray-300">{{ element.durationMinutes }} mins</div>
                   <div class="text-sm font-bold text-google-emerald"><span class="text-xs text-google-gray-400 font-normal">৳</span> {{ element.price }}</div>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-right font-bold text-xs uppercase tracking-widest text-google-gray-500 py-4 px-6 border-b border-google-gray-200 dark:border-white/10">Actions</th>
                <td mat-cell *matCellDef="let element" class="text-right py-4 px-6 border-b border-google-gray-100 dark:border-white/5">
                  <div class="flex items-center justify-end gap-2">
                    <button class="w-8 h-8 rounded-full bg-google-gray-50 dark:bg-white/5 text-google-gray-500 hover:text-google-blue hover:bg-google-blue/10 flex items-center justify-center transition-colors" (click)="openForm(element)">
                      <mat-icon class="text-[18px]">edit</mat-icon>
                    </button>
                    <button class="w-8 h-8 rounded-full bg-google-gray-50 dark:bg-white/5 text-google-gray-500 hover:text-google-red hover:bg-google-red/10 flex items-center justify-center transition-colors" (click)="deleteService(element.id)">
                      <mat-icon class="text-[18px]">delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-google-gray-50 dark:hover:bg-white/[0.02] transition-colors"></tr>
              
              <!-- Empty state -->
              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell text-center py-12" colspan="4">
                  <mat-icon class="text-google-gray-300 text-5xl mb-4">medical_services</mat-icon>
                  <p class="text-google-gray-500 font-medium">No services found.</p>
                </td>
              </tr>
            </table>
          </div>
        </zrd-card>
      }

      <!-- Add / Edit Form -->
      @if (showForm()) {
        <zrd-card variant="default" class="p-8">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-bold text-google-gray-900 dark:text-white flex items-center gap-2">
               <mat-icon class="text-google-blue">design_services</mat-icon>
               {{ editingServiceId() ? 'Edit Service' : 'Add New Service' }}
            </h2>
            <button class="text-google-gray-400 hover:text-google-gray-900 dark:hover:text-white transition-colors" (click)="closeForm()">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          
          <form [formGroup]="serviceForm" class="space-y-6 max-w-3xl">
            
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1 flex justify-between">
                Service Icon / Image 
                @if (serviceForm.get('imageUrl')?.value) {
                   <button type="button" class="text-google-red normal-case tracking-normal hover:underline" (click)="serviceForm.get('imageUrl')?.setValue('')">Remove Image</button>
                }
              </label>
              
              <div class="relative w-full h-[120px] rounded-[16px] border-2 border-dashed border-google-gray-300 dark:border-white/10 hover:border-google-blue/50 transition-colors bg-google-gray-50 dark:bg-google-gray-900 overflow-hidden flex flex-col items-center justify-center group cursor-pointer"
                   (click)="fileInput.click()">
                
                <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
                
                @if (serviceForm.get('imageUrl')?.value) {
                  <img [src]="serviceForm.get('imageUrl')?.value" class="h-full object-contain absolute z-0 m-auto inset-0 p-2">
                } @else {
                  <div class="w-10 h-10 rounded-full bg-google-gray-200 dark:bg-white/5 flex items-center justify-center mb-2">
                    <mat-icon class="text-google-gray-500 dark:text-google-gray-400">add_photo_alternate</mat-icon>
                  </div>
                  <span class="text-sm font-medium text-google-gray-700 dark:text-google-gray-300">Upload Icon</span>
                }
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Treatment / Service Name</label>
                  <zrd-input placeholder="e.g. Knee Replacement" formControlName="name"></zrd-input>
               </div>
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Category</label>
                  <zrd-input placeholder="e.g. Surgery, Consultation" formControlName="category"></zrd-input>
               </div>
            </div>

            <div class="space-y-2">
               <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Detailed Description</label>
               <textarea 
                  class="w-full h-24 px-5 py-3 rounded-[16px] bg-transparent border border-google-gray-300 dark:border-white/10 hover:border-google-gray-400 focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all resize-none font-medium text-google-gray-900 dark:text-white outline-none"
                  placeholder="Describe the procedure, benefits, etc."
                  formControlName="description"
               ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Duration (Minutes)</label>
                  <input type="number" formControlName="durationMinutes" class="w-full h-[48px] px-4 rounded-[12px] bg-transparent border border-google-gray-300 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue text-google-gray-900 dark:text-white outline-none">
               </div>
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Price / Fee (BDT)</label>
                  <input type="number" formControlName="price" class="w-full h-[48px] px-4 rounded-[12px] bg-transparent border border-google-gray-300 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue text-google-gray-900 dark:text-white outline-none">
               </div>
            </div>

            <div class="flex items-center gap-3 pt-6 border-t border-google-gray-200 dark:border-white/5">
              <button type="button" class="bg-google-blue hover:bg-google-blue/90 text-white font-bold h-10 px-6 rounded-full flex items-center justify-center transition-all disabled:opacity-50" (click)="saveService()" [disabled]="saving() || serviceForm.invalid">
                 @if (saving()) { <mat-icon class="animate-spin text-sm mr-2 w-4 h-4 leading-4 flex-shrink-0">sync</mat-icon> }
                 {{ editingServiceId() ? 'Update Service' : 'Add Service' }}
              </button>
              <button type="button" class="bg-transparent text-google-gray-600 dark:text-gray-400 hover:bg-google-gray-50 dark:hover:bg-white/5 font-bold h-10 px-6 rounded-full transition-all" (click)="closeForm()">Cancel</button>
            </div>
          </form>
        </zrd-card>
      }

    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ServiceManagementComponent implements OnInit {
  private hsService = inject(HOSPITALSERVICESMANAGEMENTService);
  private websiteService = inject(WEBSITECONTROLService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  services = signal<any[]>([]);
  loading = signal(false);
  saving = signal(false);
  showForm = signal(false);
  editingServiceId = signal<string | null>(null);

  displayedColumns = ['service', 'category', 'stats', 'actions'];
  hospitalId = ''; // Requires the hospital ID to create a service

  serviceForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    category: ['', Validators.required],
    durationMinutes: [30, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['']
  });

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.loading.set(true);
    // Fetch hospital details to get the single hospital ID first
    this.hsService.getAdminHospital().subscribe({
      next: (res: any) => {
        if (res && res.data) {
          const content = res.data.content;
          if (content && content.length > 0) {
            this.hospitalId = content[0].id; // We use the first hosted hospital
          } else {
             this.hospitalId = res.data.id; 
          }
        }
        
        // Fetch services
        this.hsService.getAdminHospitalServices().subscribe({
          next: (servRes: any) => {
            let data = servRes?.data;
            if (data?.content) data = data.content;
            this.services.set(data || []);
            this.loading.set(false);
            
            // Optionally merge website presentation layer settings if needed
            // this.websiteService.getAdminWebsiteServicesdisplay()
          },
          error: () => this.loading.set(false)
        });
      },
      error: () => this.loading.set(false)
    });
  }

  openForm(service?: any) {
    if (service) {
      this.editingServiceId.set(service.id);
      this.serviceForm.patchValue({
        name: service.name,
        description: service.description,
        category: service.category,
        durationMinutes: service.durationMinutes,
        price: service.price,
        imageUrl: service.imageUrl || '' // Future-proof for when backend accepts it
      });
    } else {
      this.editingServiceId.set(null);
      this.serviceForm.reset({
        durationMinutes: 30,
        price: 0
      });
    }
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.serviceForm.patchValue({ imageUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  saveService() {
    if (this.serviceForm.invalid || !this.hospitalId) return;
    this.saving.set(true);
    
    const payload = {
      ...this.serviceForm.value,
      hospitalId: this.hospitalId
    };

    const id = this.editingServiceId();
    const obs = id 
      ? this.hsService.putAdminHospitalServicesId(id, payload)
      : this.hsService.postAdminHospitalServices(payload);

    obs.subscribe({
      next: () => {
        this.snackBar.open(id ? 'Service updated successfully.' : 'New service created.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-emerald', 'text-white']
        });
        this.saving.set(false);
        this.closeForm();
        this.loadServices();
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Error saving service.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-red', 'text-white']
        });
      }
    });
  }

  deleteService(id: string) {
    if (confirm('Are you confirm you want to remove this service from the platform?')) {
      this.loading.set(true);
      this.hsService.deleteAdminHospitalServicesId(id).subscribe({
        next: () => {
          this.snackBar.open('Service removed successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['bg-google-emerald', 'text-white']
          });
          this.loadServices();
        },
        error: () => {
          this.loading.set(false);
          this.snackBar.open('Failed to remove service.', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['bg-google-red', 'text-white']
          });
        }
      });
    }
  }
}
