import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent } from '@ui/components';
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WEBSITECONTROLService } from '../../../core/services/api/websitecontrol.service';

@Component({
  selector: 'app-faq-management',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
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
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Knowledge Base</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage frequently asked questions to empower patients with self-service insights.</p>
        </div>
        @if (!showEditor()) {
          <zrd-button variant="primary" size="md" (click)="openEditor()">
            <mat-icon leftIcon class="text-[20px]">add_comment</mat-icon>
            Register FAQ
          </zrd-button>
        } @else {
          <button class="text-google-gray-500 hover:text-google-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 font-bold" (click)="closeEditor()">
            <mat-icon>arrow_back</mat-icon> Back to FAQs
          </button>
        }
      </div>

      @if (loading() && !showEditor()) {
        <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      @if (!showEditor()) {
        <!-- FAQ Registry Card -->
        <zrd-card variant="default">
          <!-- Control Strip -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <div class="flex-1 max-w-sm">
              <zrd-input 
                placeholder="Search knowledge entries..." 
                [hasPrefix]="true"
                (keyup)="applyFilter($event)"
              >
                <mat-icon prefix class="text-google-gray-400">help_center</mat-icon>
              </zrd-input>
            </div>
          </div>

          <!-- Spartan FAQ Stream -->
          <div class="space-y-6">
            @for (faq of faqs(); track faq.id; let i = $index) {
              <div class="p-6 rounded-3xl bg-google-gray-50/50 dark:bg-white/5 border border-google-gray-100 dark:border-white/5 hover:border-google-blue/30 transition-all group">
                <div class="flex items-start gap-6">
                  <!-- Ordinal Index -->
                  <span class="w-10 h-10 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-xs font-black text-google-blue shadow-sm border border-google-gray-100 dark:border-white/10 shrink-0 uppercase tracking-tighter">
                    #{{ i + 1 }}
                  </span>

                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-base text-google-gray-900 dark:text-white m-0 tracking-tight group-hover:text-google-blue transition-colors cursor-pointer" (click)="openEditor(faq)">{{ faq.question }}</h3>
                    <p class="text-sm text-google-gray-600 dark:text-google-gray-400 m-0 mt-3 leading-relaxed">{{ faq.answer }}</p>
                  </div>

                  <!-- Registry Controls -->
                  <div class="shrink-0 flex items-center gap-3">
                    <zrd-button size="sm" variant="ghost" (click)="openEditor(faq)">Edit</zrd-button>
                    <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                      <button mat-menu-item (click)="openEditor(faq)">
                        <mat-icon class="text-google-blue">edit_note</mat-icon>
                        <span class="font-bold text-sm">Update Entry</span>
                      </button>
                      <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                      <button mat-menu-item class="text-google-red" (click)="deleteFaq(faq.id)">
                        <mat-icon class="text-google-red">delete_forever</mat-icon>
                        <span class="font-bold text-sm">Purge Record</span>
                      </button>
                    </mat-menu>
                  </div>
                </div>
              </div>
            }
          </div>

          @if (faqs().length === 0 && !loading()) {
            <div class="py-24 text-center">
              <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                 <mat-icon class="text-google-gray-400 text-3xl">question_answer</mat-icon>
              </div>
              <h3 class="font-bold text-google-gray-900 dark:text-white">Knowledge Base Empty</h3>
              <p class="text-sm text-google-gray-500 mt-2">Start registering frequent queries to assist your users.</p>
            </div>
          }

          <!-- Stream Footer -->
          <div class="px-6 py-4 mt-8 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
            <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">{{ faqs().length }} Knowledge Artifact(s)</span>
          </div>
        </zrd-card>
      } @else {
        <zrd-card variant="default" class="max-w-2xl mx-auto p-8 border-t-4 border-t-google-blue">
           <div class="flex items-center gap-3 mb-6">
             <div class="w-10 h-10 rounded-full bg-google-blue/10 flex items-center justify-center">
                <mat-icon class="text-google-blue">help</mat-icon>
             </div>
             <h2 class="text-xl font-bold text-google-gray-900 dark:text-white">{{ editingId() ? 'Update FAQ' : 'Create New FAQ' }}</h2>
           </div>

           <form [formGroup]="faqForm" class="space-y-6">
              <div class="space-y-2">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Patient Question</label>
                 <zrd-input placeholder="e.g. What insurance do you accept?" formControlName="question"></zrd-input>
              </div>

              <div class="space-y-2">
                 <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Official Response</label>
                 <textarea formControlName="answer" 
                    class="w-full h-32 px-5 py-4 rounded-[20px] bg-transparent border border-google-gray-300 dark:border-white/10 hover:border-google-gray-400 focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all resize-none font-medium text-google-gray-900 dark:text-white outline-none block"
                    placeholder="Provide a clear, helpful answer..."
                 ></textarea>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-google-gray-200 dark:border-white/10">
                 <div>
                   @if (saving()) {
                     <div class="flex items-center gap-3 text-google-blue font-bold text-sm">
                       <mat-icon class="animate-spin text-[18px]">sync</mat-icon> Saving Entry...
                     </div>
                   }
                 </div>
                 <div class="flex items-center gap-3">
                   <button type="button" class="bg-transparent text-google-gray-600 dark:text-gray-400 hover:bg-google-gray-100 dark:hover:bg-white/10 font-bold h-10 px-6 rounded-full transition-all" (click)="closeEditor()">Cancel</button>
                   <button type="button" class="bg-google-blue hover:bg-google-blue/90 text-white font-bold h-10 px-8 rounded-full flex items-center justify-center transition-all disabled:opacity-50 shadow-md shadow-google-blue/20" (click)="saveFaq()" [disabled]="saving() || faqForm.invalid">
                      {{ editingId() ? 'Update Entry' : 'Register FAQ' }}
                   </button>
                 </div>
              </div>
           </form>
        </zrd-card>
      }

    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class FaqManagementComponent implements OnInit {
  private websiteService = inject(WEBSITECONTROLService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  faqs = signal<any[]>([]);
  loading = signal(false);
  saving = signal(false);
  showEditor = signal(false);
  editingId = signal<string | null>(null);

  faqForm: FormGroup = this.fb.group({
    question: ['', Validators.required],
    answer: ['', Validators.required]
  });

  ngOnInit() {
    this.loadFaqs();
  }

  loadFaqs() {
    this.loading.set(true);
    this.websiteService.getAdminWebsiteFaqs().subscribe({
      next: (res: any) => {
        const data = res?.data || res || [];
        this.faqs.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openEditor(faq?: any) {
    if (faq) {
      this.editingId.set(faq.id);
      this.faqForm.patchValue({
        question: faq.question,
        answer: faq.answer
      });
    } else {
      this.editingId.set(null);
      this.faqForm.reset();
    }
    this.showEditor.set(true);
  }

  closeEditor() {
    this.showEditor.set(false);
  }

  saveFaq() {
    if (this.faqForm.invalid) return;
    this.saving.set(true);
    
    const formVals = this.faqForm.value;
    const id = this.editingId();
    
    const obs = id 
      ? this.websiteService.putAdminWebsiteFaqsId(id, formVals)
      : this.websiteService.postAdminWebsiteFaqs(formVals);

    obs.subscribe({
      next: () => {
        this.snackBar.open(id ? 'FAQ updated.' : 'FAQ registered.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-emerald', 'text-white']
        });
        this.saving.set(false);
        this.closeEditor();
        this.loadFaqs();
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Error saving FAQ.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-red', 'text-white']
        });
      }
    });
  }

  deleteFaq(id: string) {
    if(confirm('Are you sure you want to permanently purge this FAQ?')) {
      this.loading.set(true);
      this.websiteService.deleteAdminWebsiteFaqsId(id).subscribe({
        next: () => {
          this.snackBar.open('FAQ purged.', 'Close', { duration: 3000 });
          this.loadFaqs();
        },
        error: () => this.loading.set(false)
      });
    }
  }

  applyFilter(event: Event) {
    // Basic frontend filtering could go here if needed
  }
}

