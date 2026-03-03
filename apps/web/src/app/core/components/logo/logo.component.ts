import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-3 group cursor-pointer" [style.height.px]="height">
      <svg [attr.width]="height" [attr.height]="height" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Background Circle/Orb (Maroon) -->
        <circle cx="50" cy="50" r="45" fill="#4a0000" fill-opacity="0.1"/>
        
        <!-- Spinal Column / Core Structure (Maroon) -->
        <rect x="45" y="15" width="10" height="70" rx="5" fill="#4a0000"/>
        <rect x="35" y="25" width="30" height="6" rx="3" fill="#4a0000"/>
        <rect x="32" y="38" width="36" height="6" rx="3" fill="#4a0000"/>
        <rect x="30" y="51" width="40" height="6" rx="3" fill="#4a0000"/>
        <rect x="32" y="64" width="36" height="6" rx="3" fill="#4a0000"/>
        <rect x="35" y="77" width="30" height="6" rx="3" fill="#4a0000"/>

        <!-- Accent Stripe (Bright Red) -->
        <path d="M20 80 L80 20" stroke="#e63946" stroke-width="8" stroke-linecap="round" class="opacity-90"/>
        
        <!-- Precision Triangle (Bright Red) -->
        <path d="M75 75 L85 85 L65 85 Z" fill="#e63946"/>
      </svg>
      
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
