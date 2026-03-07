import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, booleanAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zrd-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="group relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer"
      [class]="dragOver() ? 'border-primary-500 bg-primary-50/50' : 'border-secondary-200 hover:border-primary-400 hover:bg-secondary-50/50'"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave()"
      (drop)="onDrop($event)"
      (click)="fileInput.click()"
    >
      <input 
        #fileInput 
        type="file" 
        class="hidden" 
        [accept]="accept" 
        [multiple]="multiple"
        (change)="onFileSelected($event)"
      />

      <div class="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>

      <div class="space-y-1">
        <p class="text-sm font-semibold text-secondary-900">
          Click to upload or drag and drop
        </p>
        <p class="text-xs text-secondary-500">
          {{ hint || 'Maximum file size 10MB' }}
        </p>
      </div>

      <!-- Selected Files List -->
      <div *ngIf="selectedFiles().length > 0" class="mt-6 w-full space-y-2" (click)="$event.stopPropagation()">
        <div *ngFor="let file of selectedFiles(); let i = index" class="flex items-center justify-between p-3 bg-white border border-secondary-100 rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <div class="flex items-center gap-3">
             <div class="p-2 bg-secondary-50 rounded-lg text-secondary-500">
               <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
             </div>
             <div class="text-left">
               <p class="text-xs font-bold text-secondary-900 truncate max-w-[150px]">{{ file.name }}</p>
               <p class="text-[10px] text-secondary-400">{{ formatSize(file.size) }}</p>
             </div>
          </div>
          <button (click)="removeFile(i)" class="p-1.5 text-secondary-400 hover:text-red-500 transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdFileUploadComponent {
  @Input() accept = '*/*';
  @Input() hint?: string;
  @Input({ transform: booleanAttribute }) multiple = false;
  
  @Output() filesSelected = new EventEmitter<File[]>();

  dragOver = signal(false);
  selectedFiles = signal<File[]>([]);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(true);
  }

  onDragLeave() {
    this.dragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files) this.handleFiles(files);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) this.handleFiles(files);
  }

  private handleFiles(fileList: FileList) {
    const files = Array.from(fileList);
    if (this.multiple) {
      this.selectedFiles.update(current => [...current, ...files]);
    } else {
      this.selectedFiles.set([files[0]]);
    }
    this.filesSelected.emit(this.selectedFiles());
  }

  removeFile(index: number) {
    this.selectedFiles.update(current => current.filter((_, i) => i !== index));
    this.filesSelected.emit(this.selectedFiles());
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
