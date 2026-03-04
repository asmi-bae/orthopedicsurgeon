import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZrdInputComponent, ZrdButtonComponent, ZrdCardComponent, ZrdAvatarComponent, ZrdSelectComponent } from '@repo/ui';
import { AuthService } from '@repo/auth';
import { PublicApiService } from '../../../core/services/public-api.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ZrdInputComponent, ZrdButtonComponent, ZrdCardComponent, ZrdAvatarComponent, ZrdSelectComponent],
  template: `
    <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex items-center gap-6" *ngIf="patientData">
         <div class="relative group">
            <zrd-avatar [name]="patientData.user.firstName + ' ' + patientData.user.lastName" size="xl" border></zrd-avatar>
            <button class="absolute -bottom-2 -right-2 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors">
               <i class="pi pi-camera"></i>
            </button>
         </div>
         <div>
            <h1 class="text-2xl font-black text-secondary-900">{{ patientData.user.firstName }} {{ patientData.user.lastName }}</h1>
            <p class="text-secondary-500">Patient ID: #PAT-{{ patientData.id.substring(0,8).toUpperCase() }}</p>
         </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <zrd-card>
            <h3 slot="header" class="text-sm font-bold text-secondary-900 uppercase tracking-widest">Personal Information</h3>
            <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" class="space-y-4">
               <div class="grid grid-cols-2 gap-4">
                  <zrd-input label="First Name" formControlName="firstName"></zrd-input>
                  <zrd-input label="Last Name" formControlName="lastName"></zrd-input>
               </div>
               <zrd-input label="Email Address" formControlName="email" type="email" [disabled]="true"></zrd-input>
               <zrd-input label="Phone Number" formControlName="phone"></zrd-input>
               
               <div class="flex justify-end pt-4">
                  <button zrdButton variant="primary" type="submit" [disabled]="loading">Save Changes</button>
               </div>
            </form>
         </zrd-card>

         <zrd-card>
            <h3 slot="header" class="text-sm font-bold text-secondary-900 uppercase tracking-widest">Medical Details</h3>
            <form [formGroup]="medicalForm" (ngSubmit)="saveProfile()" class="space-y-4">
               <div class="grid grid-cols-2 gap-4">
                  <zrd-select label="Blood Group" [options]="bloodGroups" formControlName="bloodGroup"></zrd-select>
                  <zrd-input label="Date of Birth" formControlName="dob" type="date"></zrd-input>
               </div>
               <div class="grid grid-cols-2 gap-4">
                  <zrd-input label="Emergency Name" formControlName="emergencyContactName"></zrd-input>
                  <zrd-input label="Emergency Phone" formControlName="emergencyContactPhone"></zrd-input>
               </div>
               <zrd-input label="City" formControlName="city"></zrd-input>
               
               <div class="flex justify-end pt-4">
                  <button zrdButton variant="primary" type="submit" [disabled]="loading">Update Records</button>
               </div>
            </form>
         </zrd-card>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  auth = inject(AuthService);
  fb = inject(FormBuilder);
  private apiService = inject(PublicApiService);
  private toast = inject(ToastService);

  patientData: any;
  loading = false;

  profileForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [{ value: '', disabled: true }],
    phone: ['', Validators.required]
  });

  medicalForm: FormGroup = this.fb.group({
    bloodGroup: [''],
    dob: ['', Validators.required],
    emergencyContactName: [''],
    emergencyContactPhone: [''],
    city: ['']
  });

  bloodGroups = [
    { label: 'A Positive (A+)', value: 'A_POSITIVE' },
    { label: 'A Negative (A-)', value: 'A_NEGATIVE' },
    { label: 'B Positive (B+)', value: 'B_POSITIVE' },
    { label: 'B Negative (B-)', value: 'B_NEGATIVE' },
    { label: 'O Positive (O+)', value: 'O_POSITIVE' },
    { label: 'O Negative (O-)', value: 'O_NEGATIVE' },
    { label: 'AB Positive (AB+)', value: 'AB_POSITIVE' },
    { label: 'AB Negative (AB-)', value: 'AB_NEGATIVE' }
  ];

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.apiService.getMyProfile().subscribe({
      next: (res) => {
        this.patientData = res.data;
        this.profileForm.patchValue({
          firstName: this.patientData.user.firstName,
          lastName: this.patientData.user.lastName,
          email: this.patientData.user.email,
          phone: this.patientData.user.phone
        });
        this.medicalForm.patchValue({
          bloodGroup: this.patientData.bloodGroup,
          dob: this.patientData.dateOfBirth,
          emergencyContactName: this.patientData.emergencyContactName,
          emergencyContactPhone: this.patientData.emergencyContactPhone,
          city: this.patientData.city
        });
      }
    });
  }

  saveProfile() {
    if (this.profileForm.invalid || this.medicalForm.invalid) return;

    this.loading = true;
    const request = {
      ...this.profileForm.value,
      ...this.medicalForm.value
    };

    this.apiService.updateMyProfile(request).subscribe({
      next: () => {
        this.toast.success('Profile updated successfully');
        this.loading = false;
        this.loadProfile();
      },
      error: () => {
        this.toast.error('Failed to update profile');
        this.loading = false;
      }
    });
  }
}
