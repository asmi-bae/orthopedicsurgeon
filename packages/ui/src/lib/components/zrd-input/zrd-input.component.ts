import { ChangeDetectionStrategy, Component, Input, forwardRef, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'zrd-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-1.5 w-full">
      <label *ngIf="label" [for]="id" class="text-sm font-medium text-google-gray-700 dark:text-google-gray-300 px-1">
        {{ label }}
        <span *ngIf="required" class="text-google-red">*</span>
      </label>
      
      <div class="relative flex items-center">
        <div *ngIf="hasPrefix" class="absolute left-3 text-secondary-400">
          <ng-content select="[prefix]"></ng-content>
        </div>
        
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInputChange($event)"
          (blur)="onBlur()"
          [class]="inputClasses"
        />

        <div *ngIf="type === 'password'" class="absolute right-3 cursor-pointer text-secondary-400" (click)="togglePassword()">
           <!-- Password toggle logic can be added here -->
        </div>

        <div *ngIf="hasSuffix" class="absolute right-3 text-secondary-400">
          <ng-content select="[suffix]"></ng-content>
        </div>
      </div>

      <p *ngIf="hint && !error" class="text-xs text-google-gray-500 dark:text-google-gray-400 px-1">{{ hint }}</p>
      <p *ngIf="error" class="text-xs text-google-red px-1">{{ error }}</p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZrdInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdInputComponent implements ControlValueAccessor {
  @Input() id = `zrd-input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'time' | 'datetime-local' = 'text';
  @Input() hint?: string;
  @Input() error?: string;
  @Input({ transform: booleanAttribute }) required = false;
  @Input({ transform: booleanAttribute }) hasPrefix = false;
  @Input({ transform: booleanAttribute }) hasSuffix = false;

  value: any = '';
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  get inputClasses(): string {
    const base = 'w-full rounded-pill border border-google-gray-300 dark:border-white/10 bg-white dark:bg-white/5 px-6 py-3.5 text-sm text-google-gray-900 dark:text-white placeholder-google-gray-400 transition-all duration-300 focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 outline-none disabled:bg-google-gray-50 disabled:text-google-gray-400';
    const errorClass = this.error ? 'border-google-red focus:border-google-red focus:ring-google-red/10' : '';
    const paddingLeft = this.hasPrefix ? 'pl-12' : '';
    const paddingRight = this.hasSuffix || this.type === 'password' ? 'pr-12' : '';
    
    return `${base} ${errorClass} ${paddingLeft} ${paddingRight}`;
  }

  onInputChange(event: any) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
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

  togglePassword() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }
}
