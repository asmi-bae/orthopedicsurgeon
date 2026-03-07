import { ChangeDetectionStrategy, Component, Input, forwardRef, booleanAttribute, signal, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface ZrdSelectItem {
  label: string;
  value: any;
}

@Component({
  selector: 'zrd-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-1.5 w-full relative">
      <label *ngIf="label" [for]="id" class="text-sm font-medium text-google-gray-700 dark:text-google-gray-300 px-1">
        {{ label }}
        <span *ngIf="required" class="text-google-red">*</span>
      </label>
      
      <div class="relative">
        <button
          #selectButton
          type="button"
          [id]="id"
          [disabled]="disabled"
          (click)="toggleDropdown()"
          (blur)="onBlur()"
          [class]="selectButtonClasses"
        >
          <span [class.text-google-gray-400]="!selectedValueLabel">
            {{ selectedValueLabel || placeholder }}
          </span>
          
          <div class="absolute right-4 pointer-events-none text-google-gray-400 transition-transform duration-300"
               [class.rotate-180]="isOpen()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>

        <!-- Custom Dropdown Menu -->
        <div *ngIf="isOpen()" 
             class="absolute z-50 w-full mt-2 py-2 bg-white dark:bg-google-gray-800 rounded-2xl shadow-xl border border-google-gray-200 dark:border-white/10 shadow-google-gray-200/50 dark:shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div *ngFor="let item of options" 
               (click)="selectItem(item)"
               class="px-5 py-3 text-sm cursor-pointer transition-colors hover:bg-google-gray-50 dark:hover:bg-white/5"
               [class.bg-google-blue/10]="value === item.value"
               [class.text-google-blue-600]="value === item.value"
               [class.font-medium]="value === item.value"
               [class.text-google-gray-700]="value !== item.value"
               [class.dark:text-google-gray-200]="value !== item.value">
            {{ item.label }}
          </div>
          <div *ngIf="options.length === 0" class="px-5 py-3 text-sm text-google-gray-400 italic">
            No options available
          </div>
        </div>
      </div>

      <p *ngIf="hint && !error" class="text-xs text-google-gray-500 dark:text-google-gray-400 px-1 font-normal">{{ hint }}</p>
      <p *ngIf="error" class="text-xs text-google-red-600 px-1 font-medium">{{ error }}</p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZrdSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdSelectComponent implements ControlValueAccessor {
  private elementRef = inject(ElementRef);
  
  @Input() id = `zrd-select-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label?: string;
  @Input() placeholder = 'Select option';
  @Input() options: ZrdSelectItem[] = [];
  @Input() hint?: string;
  @Input() error?: string;
  @Input({ transform: booleanAttribute }) required = false;

  @Input() value: any = '';
  @Input({ transform: booleanAttribute }) disabled = false;

  isOpen = signal(false);

  onChange: any = () => {};
  onTouched: any = () => {};

  get selectButtonClasses(): string {
    const base = 'w-full flex items-center justify-between rounded-full border border-google-gray-300 dark:border-white/10 bg-white dark:bg-white/5 px-6 py-3.5 text-sm text-left text-google-gray-900 dark:text-white transition-all duration-300 hover:border-google-gray-400 dark:hover:border-white/20 outline-none disabled:bg-google-gray-50 disabled:text-google-gray-400 disabled:cursor-not-allowed';
    const focus = this.isOpen() ? 'border-google-blue-600 ring-4 ring-google-blue/10' : 'focus:border-google-blue-600 focus:ring-4 focus:ring-google-blue/10';
    const errorClass = this.error ? 'border-google-red-600 focus:border-google-red-600 ring-google-red/10' : '';
    
    return `${base} ${focus} ${errorClass}`;
  }

  get selectedValueLabel(): string {
    const selected = this.options.find(opt => opt.value === this.value);
    return selected ? selected.label : '';
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isOpen.update(v => !v);
    }
  }

  selectItem(item: ZrdSelectItem) {
    this.value = item.value;
    this.onChange(item.value);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
