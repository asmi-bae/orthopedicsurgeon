import { ZrdButtonComponent, ZrdCardComponent, ZrdSelectComponent, ZrdInputComponent, ZrdBadgeComponent, ZrdStepperComponent, ZrdStep, ZrdDatePickerComponent, ZrdTextareaComponent } from '@ui/components';
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslatePipe } from '@core/pipes/translate.pipe';
import { ReplacePipe } from '@core/pipes/replace.pipe';
import { TranslationService } from '@core/services/translation.service';
import { MatIconModule } from '@angular/material/icon';
import { PublicApiService } from '@core/services/public-api.service';
import { Doctor, ApiResponse, PageResponse } from '@repo/types';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    ZrdButtonComponent, ZrdCardComponent, ZrdStepperComponent,
    ZrdDatePickerComponent, ZrdSelectComponent, ZrdInputComponent,
    ZrdBadgeComponent, ZrdTextareaComponent, TranslatePipe, ReplacePipe,
    MatIconModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 pt-32 pb-20">
      <div class="app-container">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left: Booking Card (8 cols) -->
          <div class="lg:col-span-8 animate-in fade-in slide-in-from-left duration-700">
            <zrd-card class="overflow-visible !rounded-[40px] shadow-2xl border-none">
              <div header class="p-8 pb-4">
                <div class="flex items-center gap-6">
                   <button (click)="cancel()" class="w-12 h-12 bg-gray-50 hover:bg-primary/10 hover:text-primary rounded-2xl transition-all duration-300 flex items-center justify-center">
                     <mat-icon class="scale-110">arrow_back</mat-icon>
                   </button>
                   <div>
                     <h1 class="text-3xl font-black text-secondary-900 uppercase tracking-[-0.05em]">{{ 'BOOKING.TITLE' | translate }}</h1>
                     <p class="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-1">{{ 'BOOKING.STEP_OF' | translate }} {{ currentStep() + 1 }} {{ 'BOOKING.OF' | translate }} 4</p>
                   </div>
                </div>
              </div>

              <!-- Stepper -->
              <div class="px-8 pt-6 pb-10 border-b border-gray-100 bg-gray-50/50">
                <zrd-stepper [steps]="bookingSteps$()" [currentStep]="currentStep()"></zrd-stepper>
              </div>

              <!-- Step Content -->
              <div class="p-10 min-h-[400px]">
                 <form [formGroup]="bookingForm">
                   
                   <!-- Step 1: Select Type & Date -->
                   <div *ngIf="currentStep() === 0" class="space-y-8 animate-in fade-in duration-500">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <zrd-select 
                           [label]="'BOOKING.FORM.TYPE' | translate" 
                           [options]="appointmentTypes()" 
                           formControlName="type"
                           [required]="true"
                         ></zrd-select>
                         <zrd-datepicker 
                           [label]="'BOOKING.FORM.DATE' | translate" 
                           formControlName="date"
                           [min]="todayStr"
                           [required]="true"
                         ></zrd-datepicker>
                      </div>
                      <div class="p-6 bg-primary/5 rounded-[32px] border border-primary/10 flex gap-6 items-center">
                         <div class="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                            <mat-icon>info</mat-icon>
                         </div>
                         <p class="text-sm font-medium text-secondary-600 leading-relaxed">{{ 'BOOKING.INFO.SLOTS' | translate }}</p>
                      </div>
                   </div>

                   <!-- Step 2: Select Time Slot -->
                   <div *ngIf="currentStep() === 1" class="space-y-8 animate-in fade-in duration-500 text-center">
                      <h3 class="text-xs font-black text-secondary-400 uppercase tracking-[0.4em] mb-8">{{ 'BOOKING.SLOTS_TITLE' | translate }}</h3>
                      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                         <button 
                           *ngFor="let slot of availableSlots"
                           type="button"
                           (click)="bookingForm.patchValue({ timeSlot: slot })"
                           class="h-16 rounded-2xl border-2 text-sm font-black transition-all duration-300 uppercase tracking-widest"
                           [class]="bookingForm.get('timeSlot')?.value === slot 
                              ? 'border-primary bg-primary text-white shadow-xl shadow-primary/30 scale-105' 
                              : 'border-gray-100 hover:border-primary/30 text-secondary-500 hover:bg-gray-50'"
                         >
                           {{ slot }}
                         </button>
                      </div>
                   </div>

                   <!-- Step 3: Patient Information -->
                   <div *ngIf="currentStep() === 2" class="space-y-8 animate-in fade-in duration-500">
                      <div class="space-y-6">
                         <zrd-textarea 
                           [label]="'BOOKING.FORM.REASON' | translate" 
                           [placeholder]="'BOOKING.FORM.REASON_PLACEHOLDER' | translate"
                           formControlName="reason"
                           [rows]="6"
                           [required]="true"
                         ></zrd-textarea>
                         <zrd-input 
                           [label]="'BOOKING.FORM.NOTES' | translate" 
                           formControlName="notes"
                           [placeholder]="'Special requests or additional info...'"
                         ></zrd-input>
                      </div>
                   </div>

                   <!-- Step 4: Confirmation -->
                   <div *ngIf="currentStep() === 3" class="space-y-8 animate-in fade-in duration-500">
                      <div class="bg-gray-50 rounded-[40px] p-10 border border-gray-100 space-y-6 relative overflow-hidden">
                         <div class="flex justify-between items-center pb-6 border-b border-gray-200">
                            <span class="text-secondary-400 text-[10px] font-black uppercase tracking-widest">{{ 'BOOKING.CONFIRM.CONSULTATION' | translate }}</span>
                            <span class="font-black text-secondary-900 uppercase">Dr. {{ doctor()?.user?.firstName }} {{ doctor()?.user?.lastName }}</span>
                         </div>
                         <div class="flex justify-between items-center pb-6 border-b border-gray-200">
                            <span class="text-secondary-400 text-[10px] font-black uppercase tracking-widest">{{ 'BOOKING.CONFIRM.TYPE' | translate }}</span>
                            <zrd-badge variant="info" class="font-black">{{ bookingForm.get('type')?.value }}</zrd-badge>
                         </div>
                         <div class="flex justify-between items-center pb-6 border-b border-gray-200">
                            <span class="text-secondary-400 text-[10px] font-black uppercase tracking-widest">{{ 'BOOKING.CONFIRM.DATE_TIME' | translate }}</span>
                            <span class="font-black text-secondary-900 uppercase tracking-tight">{{ bookingForm.get('date')?.value }} @ {{ bookingForm.get('timeSlot')?.value }}</span>
                         </div>
                         <div class="flex justify-between items-center pt-2">
                            <span class="text-secondary-400 text-[10px] font-black uppercase tracking-widest">{{ 'BOOKING.CONFIRM.TOTAL_FEE' | translate }}</span>
                            <span class="text-3xl font-black text-primary">$\{{ doctor()?.consultationFee }}</span>
                         </div>
                         <!-- Design Element -->
                         <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                      </div>
                   </div>

                 </form>
              </div>

              <!-- Footer Actions -->
              <div footer class="flex flex-col sm:flex-row justify-between items-center p-10 bg-gray-50/50 gap-6 rounded-b-[40px]">
                 <button zrdButton variant="ghost" (click)="prevStep()" [disabled]="currentStep() === 0" class="uppercase font-black tracking-widest text-xs h-14 px-8">
                   <mat-icon class="mr-2">west</mat-icon>
                   {{ 'BOOKING.BUTTONS.PREVIOUS' | translate }}
                 </button>
                 
                 <div class="flex flex-wrap justify-center gap-4">
                    <button zrdButton variant="outline" (click)="cancel()" class="uppercase font-black tracking-widest text-xs h-14 px-10 rounded-2xl">{{ 'BOOKING.BUTTONS.CANCEL' | translate }}</button>
                    <button 
                      *ngIf="currentStep() < 3"
                      zrdButton 
                      [disabled]="!isStepValid()"
                      (click)="nextStep()"
                      class="uppercase font-black tracking-widest text-xs h-14 px-12 rounded-2xl shadow-xl shadow-primary/20"
                    >
                      {{ 'BOOKING.BUTTONS.CONTINUE' | translate }}
                      <mat-icon class="ml-2">east</mat-icon>
                    </button>
                    <button 
                      *ngIf="currentStep() === 3"
                      zrdButton 
                      variant="primary"
                      [loading]="submitting()"
                      (click)="submit()"
                      class="uppercase font-black tracking-widest text-xs h-14 px-14 rounded-2xl shadow-2xl shadow-primary/40 group"
                    >
                      {{ 'BOOKING.BUTTONS.CONFIRM' | translate }}
                      <mat-icon class="ml-2 group-hover:translate-x-1 transition-transform">check_circle</mat-icon>
                    </button>
                 </div>
              </div>
            </zrd-card>
          </div>

          <!-- Right: Sidebar (4 cols) -->
          <div class="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right duration-700">
            <!-- Instructions Card -->
            <zrd-card class="!rounded-[40px] border-none shadow-xl bg-secondary-900 text-white p-10 relative overflow-hidden">
               <div class="relative z-10">
                  <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary mb-8 border border-white/10">
                    <mat-icon class="scale-125">assignment</mat-icon>
                  </div>
                  <h3 class="text-2xl font-black uppercase tracking-tighter mb-8">{{ 'BOOKING.INSTRUCTIONS.TITLE' | translate }}</h3>
                  <ul class="space-y-6">
                    <li *ngFor="let item of 'BOOKING.INSTRUCTIONS.ITEMS' | translate" class="flex gap-4">
                       <div class="w-5 h-5 rounded-full bg-primary flex-shrink-0 mt-1"></div>
                       <p class="text-sm font-medium text-white/70 leading-relaxed">{{item}}</p>
                    </li>
                  </ul>
               </div>
               <!-- Abstract background -->
               <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
            </zrd-card>

            <!-- WhatsApp Card -->
            <zrd-card class="!rounded-[40px] border-none shadow-xl bg-[#25D366]/5 p-8 border-2 border-[#25D366]/10 group hover:bg-[#25D366]/10 transition-colors duration-500">
               <div class="text-center">
                  <div class="w-20 h-20 bg-[#25D366] text-white rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#25D366]/30 group-hover:scale-110 transition-transform duration-500">
                    <mat-icon class="scale-[2]">chat</mat-icon>
                  </div>
                  <h4 class="text-lg font-black text-secondary-900 uppercase tracking-tighter mb-2">{{ 'BOOKING.INSTRUCTIONS.WHATSAPP' | translate }}</h4>
                  <p class="text-xs text-secondary-400 font-bold uppercase tracking-widest mb-8">+880 1711-123456</p>
                  <a mat-flat-button class="w-full h-14 rounded-2xl !bg-[#25D366] !text-white font-black uppercase tracking-widest text-xs" href="https://wa.me/8801711123456" target="_blank">
                    Message Now
                  </a>
               </div>
            </zrd-card>
          </div>

        </div>
      </div>
    </div>

    <!-- Success Feedback Overlay -->
    <div *ngIf="success()" class="fixed inset-0 z-[100] flex items-center justify-center bg-secondary-900/90 backdrop-blur-md animate-in fade-in duration-500">
       <div class="bg-white rounded-[50px] p-12 max-w-lg w-full text-center shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500 relative overflow-hidden">
          <div class="relative z-10">
            <div class="w-24 h-24 bg-green-50 text-green-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner">
               <mat-icon class="scale-[3]">task_alt</mat-icon>
            </div>
            <h2 class="text-4xl font-black text-secondary-900 uppercase tracking-tighter mb-4">{{ 'BOOKING.SUCCESS.TITLE' | translate }}</h2>
            <p class="text-secondary-500 text-lg font-medium mb-10 leading-relaxed">{{ 'BOOKING.SUCCESS.TEXT' | translate | replace:'{{name}}':(doctor()?.user?.firstName || 'Ab Rahman') }}</p>
            <button zrdButton class="w-full h-16 rounded-[24px] uppercase font-black tracking-widest text-sm shadow-2xl shadow-primary/40" (click)="finish()">{{ 'BOOKING.SUCCESS.PORTAL' | translate }}</button>
          </div>
          <!-- Decorative circle -->
          <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
       </div>
    </div>
  `
})
export class AppointmentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private api = inject(PublicApiService);
  private translation = inject(TranslationService);

  doctor = signal<Doctor | null>(null);
  currentStep = signal(0);
  submitting = signal(false);
  success = signal(false);

  todayStr = new Date().toISOString().split('T')[0];

  bookingForm: FormGroup = this.fb.group({
    type: ['', Validators.required],
    date: ['', Validators.required],
    timeSlot: ['', Validators.required],
    reason: ['', Validators.required],
    notes: ['']
  });

  appointmentTypes = computed(() => [
    { label: this.translation.translate('BOOKING.TYPES.FIRST_CONSULTATION')(), value: 'FIRST_CONSULTATION' },
    { label: this.translation.translate('BOOKING.TYPES.FOLLOW_UP')(), value: 'FOLLOW_UP' },
    { label: this.translation.translate('BOOKING.TYPES.SURGERY_CONSULTATION')(), value: 'SURGERY_CONSULTATION' },
    { label: this.translation.translate('BOOKING.TYPES.EMERGENCY')(), value: 'EMERGENCY' }
  ]);

  availableSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getDoctorById(id).subscribe((res: ApiResponse<Doctor>) => this.doctor.set(res.data));
    } else {
      // Fetch default doctor for the platform
      this.api.getDoctors({ size: 1 }).subscribe((res: ApiResponse<PageResponse<Doctor>>) => {
        if (res.data.content.length > 0) {
          this.doctor.set(res.data.content[0]);
        }
      });
    }
  }

  bookingSteps$ = computed<ZrdStep[]>(() => [
    { label: this.translation.translate('BOOKING.SCHEDULE.TITLE')(), description: this.translation.translate('BOOKING.SCHEDULE.DESC')() },
    { label: this.translation.translate('BOOKING.TIME.TITLE')(), description: this.translation.translate('BOOKING.TIME.DESC')() },
    { label: this.translation.translate('BOOKING.REASON.TITLE')(), description: this.translation.translate('BOOKING.REASON.DESC')() },
    { label: this.translation.translate('BOOKING.FINISH.TITLE')(), description: this.translation.translate('BOOKING.FINISH.DESC')() }
  ]);

  isStepValid(): boolean {
    const s = this.currentStep();
    if (s === 0) return !!this.bookingForm.get('type')?.value && !!this.bookingForm.get('date')?.value;
    if (s === 1) return !!this.bookingForm.get('timeSlot')?.value;
    if (s === 2) return !!this.bookingForm.get('reason')?.value;
    return true;
  }

  nextStep() {
    this.currentStep.update(s => s + 1);
  }

  prevStep() {
    this.currentStep.update(s => s - 1);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  submit() {
    this.submitting.set(true);
    const data = {
      doctorId: this.doctor()?.id,
      ...this.bookingForm.value
    };

    this.api.bookAppointment(data).subscribe({
      next: () => {
        this.submitting.set(false);
        this.success.set(true);
      },
      error: () => this.submitting.set(false)
    });
  }

  finish() {
    this.router.navigate(['/']);
  }
}
