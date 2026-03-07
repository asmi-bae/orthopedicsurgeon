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
  selector: 'app-gallery-management',
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

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Media Gallery</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Manage clinic photos, operational success images, and visual artifacts.</p>
        </div>
        @if (!showUploader()) {
          <zrd-button variant="primary" size="md" (click)="openUploader()">
            <mat-icon leftIcon class="text-[20px]">add_photo_alternate</mat-icon>
            Upload Media
          </zrd-button>
        } @else {
          <button class="text-google-gray-500 hover:text-google-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 font-bold" (click)="closeUploader()">
            <mat-icon>arrow_back</mat-icon> Back to Gallery
          </button>
        }
      </div>

      @if (loading() && !showUploader()) {
        <div class="relative h-1 mb-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      @if (!showUploader()) {
        <!-- Minimal Empty State or Grid -->
        @if (gallery().length > 0) {
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            @for (item of gallery(); track item.id) {
              <div class="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-google-gray-100 dark:bg-google-gray-800 shadow-sm hover:shadow-xl transition-all border border-google-gray-200 dark:border-white/10 cursor-pointer">
                
                <img [src]="item.imageUrl || item.url" [alt]="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                
                <div class="absolute inset-0 bg-gradient-to-t from-google-gray-900/90 via-google-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                   <h3 class="text-white font-bold text-sm tracking-tight m-0 line-clamp-1">{{ item.title || 'Untitled Image' }}</h3>
                   <p class="text-google-gray-300 text-xs mt-1">{{ item.category || 'General' }}</p>
                   
                   <div class="absolute top-4 right-4 flex gap-2">
                     <button class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-google-blue hover:text-white transition-colors" (click)="$event.stopPropagation(); openUploader(item)">
                       <mat-icon class="text-[18px]">edit</mat-icon>
                     </button>
                     <button class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-google-red hover:text-white transition-colors" (click)="$event.stopPropagation(); deleteImage(item.id)">
                       <mat-icon class="text-[18px]">delete_sweep</mat-icon>
                     </button>
                   </div>
                </div>
              </div>
            }
          </div>
        } @else if (!loading()) {
          <zrd-card variant="default" class="py-24 text-center">
            <div class="w-20 h-20 bg-google-blue/5 rounded-full flex items-center justify-center mx-auto mb-6">
               <mat-icon class="text-google-blue text-4xl">collections text-google-gray-400</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-google-gray-900 dark:text-white">Your Gallery is Empty</h3>
            <p class="text-google-gray-500 mt-2 max-w-sm mx-auto">Upload images of your clinic, equipment, and success stories to build trust with patients.</p>
            <zrd-button variant="primary" size="md" class="mt-8" (click)="openUploader()">
              <mat-icon leftIcon>cloud_upload</mat-icon> Upload First Image
            </zrd-button>
          </zrd-card>
        }
      } @else {
        <!-- Upload Form -->
        <zrd-card variant="default" class="max-w-3xl mx-auto p-8 border-t-4 border-t-google-blue">
          <form [formGroup]="uploadForm" class="space-y-8">
            
            <!-- Drag & Drop Area -->
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Media File</label>
              
              <div class="relative w-full h-[300px] rounded-[24px] border-2 border-dashed transition-all flex flex-col items-center justify-center group cursor-pointer overflow-hidden"
                   [ngClass]="dragOver() ? 'border-google-blue bg-google-blue/5' : 'border-google-gray-300 dark:border-white/10 bg-google-gray-50 dark:bg-google-gray-900 hover:border-google-blue hover:bg-google-gray-100 dark:hover:bg-white/5'"
                   (dragover)="onDragOver($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)"
                   (click)="fileInput.click()">
                
                <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
                
                @if (uploadForm.get('imageUrl')?.value) {
                  <img [src]="uploadForm.get('imageUrl')?.value" class="absolute inset-0 w-full h-full object-contain p-4 z-0">
                  <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10 text-white">
                     <mat-icon class="text-4xl mb-2">swap_horiz</mat-icon>
                     <span class="font-bold text-sm">Click or drop to replace</span>
                  </div>
                } @else {
                  <div class="w-20 h-20 rounded-full bg-google-gray-200 dark:bg-white/5 flex items-center justify-center mb-6 text-google-gray-400 group-hover:text-google-blue group-hover:scale-110 transition-all">
                    <mat-icon class="text-[40px] leading-10 w-10 h-10">cloud_upload</mat-icon>
                  </div>
                  <h3 class="text-lg font-bold text-google-gray-900 dark:text-white">Select a file or drag and drop here</h3>
                  <p class="text-sm text-google-gray-500 mt-2">JPG, PNG, WebP up to 10MB</p>
                }
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Descriptive Title</label>
                  <zrd-input placeholder="e.g. Modern Operating Theater" formControlName="title"></zrd-input>
               </div>
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Category / Album</label>
                  <zrd-input placeholder="e.g. Clinic, Surgeries, Activities..." formControlName="category"></zrd-input>
               </div>
            </div>

            <div class="space-y-2">
               <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Caption / Details</label>
               <textarea formControlName="description" 
                  class="w-full h-24 px-5 py-4 rounded-[20px] bg-transparent border border-google-gray-300 dark:border-white/10 hover:border-google-gray-400 focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all resize-none font-medium text-google-gray-900 dark:text-white outline-none block"
                  placeholder="Optional text displayed under the image..."
               ></textarea>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-google-gray-200 dark:border-white/10">
               <div>
                 @if (saving()) {
                   <div class="flex items-center gap-3 text-google-blue font-bold text-sm">
                     <mat-icon class="animate-spin text-[18px]">sync</mat-icon> Processing Upload...
                   </div>
                 }
               </div>
               <div class="flex items-center gap-3">
                 <button type="button" class="bg-transparent text-google-gray-600 dark:text-gray-400 hover:bg-google-gray-100 dark:hover:bg-white/10 font-bold h-10 px-6 rounded-full transition-all" (click)="closeUploader()">Cancel</button>
                 <button type="button" class="bg-google-blue hover:bg-google-blue/90 text-white font-bold h-10 px-8 rounded-full flex items-center justify-center transition-all disabled:opacity-50 shadow-md shadow-google-blue/20" (click)="saveImage()" [disabled]="saving() || uploadForm.invalid">
                    {{ editingId() ? 'Update Metadata' : 'Upload to Gallery' }}
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
export class GalleryManagementComponent implements OnInit {
  private websiteService = inject(WEBSITECONTROLService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  gallery = signal<any[]>([]);
  loading = signal(false);
  saving = signal(false);
  showUploader = signal(false);
  dragOver = signal(false);
  editingId = signal<string | null>(null);

  uploadForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    category: [''],
    imageUrl: ['', Validators.required]
  });

  ngOnInit() {
    this.loadGallery();
  }

  loadGallery() {
    this.loading.set(true);
    this.websiteService.getAdminWebsiteGallery().subscribe({
      next: (res: any) => {
        let content = res?.data?.content || res?.data || [];
        if (Array.isArray(res)) content = res;
        this.gallery.set(content);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openUploader(item?: any) {
    if (item) {
      this.editingId.set(item.id);
      this.uploadForm.patchValue({
        title: item.title || '',
        description: item.description || '',
        category: item.category || '',
        imageUrl: item.imageUrl || item.url || ''
      });
    } else {
      this.editingId.set(null);
      this.uploadForm.reset({
        category: 'General'
      });
    }
    this.showUploader.set(true);
  }

  closeUploader() {
    this.showUploader.set(false);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  private handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadForm.patchValue({ imageUrl: e.target.result });
      
      // Auto-fill title if empty
      if (!this.uploadForm.get('title')?.value) {
        let name = file.name.split('.')[0];
        name = name.replace(/[-_]/g, ' ');
        name = name.replace(/\b\w/g, l => l.toUpperCase());
        this.uploadForm.patchValue({ title: name });
      }
    };
    reader.readAsDataURL(file);
  }

  saveImage() {
    if (this.uploadForm.invalid) return;
    this.saving.set(true);
    
    // For pure base64 integration, falling back to basic payload
    // If AdminGalleryController was strictly multipart, we'd use FormData.
    const formVals = this.uploadForm.value;
    const id = this.editingId();
    
    // Attempt standard JSON payload (compatible with the WebsiteControlService interface logic)
    const obs = id 
      ? this.websiteService.putAdminWebsiteGalleryId(id, formVals)
      : this.websiteService.postAdminWebsiteGallery(formVals);

    obs.subscribe({
      next: () => {
        this.snackBar.open(id ? 'Media updated.' : 'Uploaded to Gallery.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-emerald', 'text-white']
        });
        this.saving.set(false);
        this.closeUploader();
        this.loadGallery();
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Upload failed. The backend API might require active multipart handling implementation.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-red', 'text-white']
        });
      }
    });
  }

  deleteImage(id: string) {
    if(confirm('Permanently delete this media from the gallery?')) {
      this.loading.set(true);
      this.websiteService.deleteAdminWebsiteGalleryId(id).subscribe({
        next: () => {
          this.snackBar.open('Media deleted.', 'Close', { duration: 3000 });
          this.loadGallery();
        },
        error: () => this.loading.set(false)
      });
    }
  }
}
