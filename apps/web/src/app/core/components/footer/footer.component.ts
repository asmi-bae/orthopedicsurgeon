import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '@core/components/logo/logo.component';
import { TranslatePipe } from '@core/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LogoComponent, MatButtonModule, TranslatePipe],
  template: `
    <footer class="bg-secondary-900 text-white py-24 font-sans border-t border-white/5">
      <div class="app-container px-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div class="col-span-1 md:col-span-1">
            <div class="mb-8">
              <app-logo [height]="40" textColor="white" [showText]="true" routerLink="/"></app-logo>
            </div>
            <p class="text-white/40 text-sm leading-relaxed font-medium">
              {{ 'FOOTER.DESCRIPTION' | translate }}
            </p>
          </div>

          <div>
            <h4 class="text-[10px] font-black mb-8 text-primary uppercase tracking-[0.3em]">{{ 'FOOTER.SERVICES.TITLE' | translate }}</h4>
            <ul class="space-y-4 text-sm font-bold text-white/60">
              <li><a href="#" class="hover:text-primary transition-all tracking-tight">{{ 'FOOTER.SERVICES.FIND' | translate }}</a></li>
              <li><a href="#" class="hover:text-primary transition-all tracking-tight">{{ 'FOOTER.SERVICES.HOSPITALS' | translate }}</a></li>
              <li><a href="#" class="hover:text-primary transition-all tracking-tight">{{ 'FOOTER.SERVICES.CONSULT' | translate }}</a></li>
              <li><a href="#" class="hover:text-primary transition-all tracking-tight">{{ 'FOOTER.SERVICES.EMERGENCY' | translate }}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[10px] font-black mb-8 text-primary uppercase tracking-[0.3em]">{{ 'FOOTER.QUICK_LINKS.TITLE' | translate }}</h4>
            <ul class="space-y-4 text-sm font-bold text-white/60">
              <li><a href="#" class="hover:text-primary transition-all tracking-tight">{{ 'FOOTER.QUICK_LINKS.ABOUT' | translate }}</a></li>
              <li><a href="#" class="hover:text-primary transition-all tracking-tight">{{ 'FOOTER.QUICK_LINKS.RIGHTS' | translate }}</a></li>
              <li><a href="#" class="hover:text-primary transition-all tracking-tight">{{ 'FOOTER.QUICK_LINKS.PRIVACY' | translate }}</a></li>
              <li><a href="#" class="hover:text-primary transition-all tracking-tight">{{ 'FOOTER.QUICK_LINKS.CONTACT' | translate }}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[10px] font-black mb-8 text-primary uppercase tracking-[0.3em]">{{ 'FOOTER.NEWSLETTER.TITLE' | translate }}</h4>
            <div class="flex flex-col gap-4">
              <input type="email" [placeholder]="'FOOTER.NEWSLETTER.PLACEHOLDER' | translate" class="bg-white/5 border border-white/10 rounded-xl text-xs font-medium px-6 py-4 w-full focus:border-primary/50 outline-none transition-all" />
              <button mat-flat-button color="primary" class="rounded-xl h-12 w-full font-bold">{{ 'FOOTER.NEWSLETTER.ACTION' | translate }}</button>
            </div>
          </div>
        </div>

        <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p class="text-[10px] font-bold text-white/40">{{ 'FOOTER.RIGHTS' | translate }}</p>
          <div class="flex gap-8">
             <i class="pi pi-twitter text-white/20 hover:text-primary cursor-pointer transition-all text-xl"></i>
             <i class="pi pi-facebook text-white/20 hover:text-primary cursor-pointer transition-all text-xl"></i>
             <i class="pi pi-linkedin text-white/20 hover:text-primary cursor-pointer transition-all text-xl"></i>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
