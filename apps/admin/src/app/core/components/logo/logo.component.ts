import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center group cursor-pointer" [style.height.px]="height">

      <!-- PNG Logo (always shown, left side) -->
      <img
        src="logo-orthopedic.png"
        alt="Orthopedic Logo"
        class="flex-shrink-0 object-contain"
        [style.width.px]="height"
        [style.height.px]="height"
      />

      <!-- Text: only when showText=true (sidebar expanded) -->
      <div class="flex flex-col" *ngIf="showText">
        <span class="font-black tracking-tighter leading-none uppercase"
              [style.color]="textColor"
              [style.fontSize.px]="height * 0.45">
          Orthopedic
        </span>
        <span class="font-bold uppercase tracking-[0.3em] leading-none mt-1"
              [style.color]="accentColor"
              [style.fontSize.px]="height * 0.2">
          Surgeon
        </span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class LogoComponent {
  @Input() height: number = 40;
  @Input() showText: boolean = true;
  @Input() textColor: string = '#1e293b'; // slate-800
  @Input() accentColor: string = '#4a0000'; // maroon
}
