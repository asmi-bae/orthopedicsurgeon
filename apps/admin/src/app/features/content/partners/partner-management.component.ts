import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WEBSITECONTROLService } from '../../../core/services/api/websitecontrol.service';
import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent, ZrdBadgeComponent } from '@ui/components';

@Component({
  selector: 'app-partner-management',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Alliance Network</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage institutional partners, hospital groups, and medical research foundations.</p>
        </div>
        @if (!showEditor()) {
          <zrd-button variant="primary" size="md" (click)="openEditor()">
            <mat-icon leftIcon class="text-[20px]">handshake</mat-icon>
            Onboard Alliance
          </zrd-button>
        } @else {
          <button class="text-google-gray-500 hover:text-google-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 font-bold" (click)="closeEditor()">
            <mat-icon>arrow_back</mat-icon> Back to Registry
          </button>
        }
      </div>

      @if (loading() && !showEditor()) {
        <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      @if (!showEditor()) {
        <!-- Control Strip -->
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1 max-w-sm">
            <zrd-input 
              placeholder="Search alliance partners..." 
              [hasPrefix]="true"
              (keyup)="applyFilter($event)"
            >
              <mat-icon prefix class="text-google-gray-400">hub</mat-icon>
            </zrd-input>
          </div>
        </div>

        <!-- Spartan Alliance Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (partner of partners(); track partner.id) {
            <zrd-card variant="default" class="group relative hover:scale-[1.02] transition-all cursor-pointer">
              <div class="flex items-start justify-between gap-4 mb-6">
                <!-- Entity Identifier / Logo -->
                <div class="w-14 h-14 rounded-2xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-100 dark:border-white/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-google-blue/5 overflow-hidden">
                  @if (partner.logoUrl) {
                    <img [src]="partner.logoUrl" [alt]="partner.name" class="w-full h-full object-contain p-2">
                  } @else {
                    <mat-icon class="text-google-gray-400 text-[28px] group-hover:text-google-blue transition-colors">corporate_fare</mat-icon>
                  }
                </div>

                <div class="flex items-center gap-2">
                  <zrd-badge [variant]="partner.active ? 'success' : 'neutral'" class="font-black text-[10px]">
                    {{ partner.active ? 'Active' : 'Dormant' }}
                  </zrd-badge>
                  
                  <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-100 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                    <button mat-menu-item (click)="openEditor(partner)">
                      <mat-icon class="text-google-blue">edit</mat-icon>
                      <span class="font-bold text-sm">Update Profile</span>
                    </button>
                    <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                    <button mat-menu-item class="text-google-red" (click)="deletePartner(partner.id)">
                      <mat-icon class="text-google-red">link_off</mat-icon>
                      <span class="font-bold text-sm">Dissolve Alliance</span>
                    </button>
                  </mat-menu>
                </div>
              </div>

              <div (click)="openEditor(partner)">
                <h3 class="font-black text-lg text-google-gray-900 dark:text-white m-0 tracking-tight group-hover:text-google-blue transition-colors">{{ partner.name }}</h3>
                <p class="text-[10px] font-black uppercase tracking-widest text-google-gray-400 mt-1">Registry Priority: {{ partner.displayOrder }}</p>
                <div class="flex items-center gap-2 mt-4 text-xs font-bold text-google-blue">
                   <mat-icon class="text-[14px]">link</mat-icon>
                   <span class="truncate">{{ partner.websiteUrl || 'No domain registered' }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between mt-8 pt-4 border-t border-google-gray-100 dark:border-white/5">
                 <div class="flex items-center gap-1.5 text-google-gray-500">
                    <mat-icon class="text-[14px]">verified</mat-icon>
                    <span class="text-xs font-bold tracking-tight">Alliance Verified</span>
                 </div>
                 <zrd-button variant="ghost" size="sm" class="px-2" (click)="openEditor(partner)">Manage</zrd-button>
              </div>
            </zrd-card>
          }
        </div>

        @if (partners().length === 0 && !loading()) {
          <div class="py-24 text-center">
            <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
               <mat-icon class="text-google-gray-400 text-3xl">handshake</mat-icon>
            </div>
            <h3 class="font-bold text-google-gray-900 dark:text-white">Alliance Directory Empty</h3>
            <p class="text-sm text-google-gray-500 mt-2">No organizations were found matching your current filter set.</p>
            <zrd-button variant="primary" class="mt-6" (click)="openEditor()">Onboard Alliance</zrd-button>
          </div>
        }
      } @else {
        <!-- Alliance Editor Interface -->
        <zrd-card variant="default" class="max-w-2xl mx-auto p-8 border-t-4 border-t-google-blue">
           <div class="flex items-center gap-3 mb-8">
             <div class="w-12 h-12 rounded-2xl bg-google-blue/10 flex items-center justify-center">
                <mat-icon class="text-google-blue text-[28px]">on_device_training</mat-icon>
             </div>
             <div>
               <h2 class="text-xl font-bold text-google-gray-900 dark:text-white tracking-tight">{{ editingId() ? 'Update Alliance Identity' : 'Onboard New Alliance' }}</h2>
               <p class="text-xs text-google-gray-500 font-medium">Configure institutional partnership credentials and appearance.</p>
             </div>
           </div>

           <form [formGroup]="partnerForm" class="space-y-6">
              <!-- Brandmark Upload -->
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Alliance Brandmark (Logo)</label>
                <div class="relative w-32 h-32 rounded-3xl border-2 border-dashed border-google-gray-200 dark:border-white/10 hover:border-google-blue flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all bg-google-gray-50/50 dark:bg-white/5 group" (click)="logoInput.click()">
                  <input #logoInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
                  @if (partnerForm.get('logoUrl')?.value) {
                    <img [src]="partnerForm.get('logoUrl')?.value" class="w-full h-full object-contain p-4 group-hover:opacity-30 transition-opacity">
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <mat-icon class="text-google-blue">cloud_upload</mat-icon>
                    </div>
                  } @else {
                    <mat-icon class="text-google-gray-400">add_photo_alternate</mat-icon>
                    <span class="text-[10px] font-bold text-google-gray-400 mt-2">PNG/SVG</span>
                  }
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Entity Name</label>
                    <zrd-input placeholder="e.g. City General Hospital" formControlName="name"></zrd-input>
                 </div>
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Website URL</label>
                    <zrd-input placeholder="https://organization.org" formControlName="websiteUrl"></zrd-input>
                 </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Sequence Order</label>
                    <input type="number" formControlName="displayOrder" class="w-full h-12 px-4 rounded-full bg-transparent border border-google-gray-300 dark:border-white/10 outline-none focus:border-google-blue transition-all">
                 </div>
                 <div class="flex items-center pt-6">
                    <label class="flex items-center gap-3 cursor-pointer">
                      <div class="relative">
                        <input type="checkbox" formControlName="isActive" class="sr-only">
                        <div class="block w-10 h-6 rounded-full transition-colors" [ngClass]="partnerForm.get('isActive')?.value ? 'bg-google-blue' : 'bg-google-gray-300 dark:bg-google-gray-600'"></div>
                        <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" [ngClass]="partnerForm.get('isActive')?.value ? 'translate-x-4' : 'translate-x-0'"></div>
                      </div>
                      <span class="text-sm font-bold text-google-gray-700 dark:text-gray-300">Active Membership</span>
                    </label>
                 </div>
              </div>

              <div class="flex items-center justify-end gap-3 pt-8 border-t border-google-gray-100 dark:border-white/5">
                 <button type="button" class="px-6 py-2.5 rounded-full font-bold text-google-gray-600 dark:text-gray-400 hover:bg-google-gray-100 dark:hover:bg-white/10 transition-all" (click)="closeEditor()">Abort</button>
                 <zrd-button variant="primary" (click)="savePartner()" [disabled]="saving() || partnerForm.invalid">
                    {{ saving() ? 'Establishing...' : 'Commit Membership' }}
                 </zrd-button>
              </div>
           </form>
        </zrd-card>
      }
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class PartnerManagementComponent implements OnInit {
  private websiteService = inject(WEBSITECONTROLService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  partners = signal<any[]>([]);
  loading = signal(false);
  saving = signal(false);
  showEditor = signal(false);
  editingId = signal<string | null>(null);

  partnerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    logoUrl: ['', Validators.required],
    websiteUrl: [''],
    displayOrder: [0],
    isActive: [true]
  });

  ngOnInit() {
    this.loadPartners();
  }

  loadPartners() {
    this.loading.set(true);
    this.websiteService.getAdminWebsitePartners().subscribe({
      next: (res: any) => {
        const data = res?.data || res || [];
        this.partners.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openEditor(partner?: any) {
    if (partner) {
      this.editingId.set(partner.id);
      this.partnerForm.patchValue({
        name: partner.name,
        logoUrl: partner.logoUrl,
        websiteUrl: partner.websiteUrl,
        displayOrder: partner.displayOrder,
        isActive: partner.isActive || partner.active
      });
    } else {
      this.editingId.set(null);
      this.partnerForm.reset({ displayOrder: this.partners().length, isActive: true });
    }
    this.showEditor.set(true);
  }

  closeEditor() {
    this.showEditor.set(false);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.partnerForm.patchValue({ logoUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  savePartner() {
    if (this.partnerForm.invalid) return;
    this.saving.set(true);
    
    const payload = this.partnerForm.value;
    const id = this.editingId();
    
    const obs = id 
      ? this.websiteService.putAdminWebsitePartnersId(id, payload)
      : this.websiteService.postAdminWebsitePartners(payload);

    obs.subscribe({
      next: () => {
        this.snackBar.open(id ? 'Alliance updated.' : 'Alliance onboarded.', 'Close', {
          duration: 3000,
          panelClass: ['bg-google-emerald', 'text-white']
        });
        this.saving.set(false);
        this.closeEditor();
        this.loadPartners();
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Registry failed.', 'Close', {
          duration: 3000,
          panelClass: ['bg-google-red', 'text-white']
        });
      }
    });
  }

  deletePartner(id: string) {
    if (confirm('Are you sure you want to dissolve this alliance?')) {
      this.loading.set(true);
      this.websiteService.deleteAdminWebsitePartnersId(id).subscribe({
        next: () => {
          this.snackBar.open('Alliance dissolved.', 'Close', { duration: 3000 });
          this.loadPartners();
        },
        error: () => this.loading.set(false)
      });
    }
  }

  applyFilter(event: Event) {
    // filter logic
  }
}

