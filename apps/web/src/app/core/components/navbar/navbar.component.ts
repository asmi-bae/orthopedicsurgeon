import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@repo/auth';
import { ScrollService } from '@core/services/scroll.service';
import { EmergencyBarComponent } from './emergency-bar/emergency-bar.component';
import { MainHeaderComponent } from './main-header/main-header.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    EmergencyBarComponent,
    MainHeaderComponent
  ],
  template: `
    <app-emergency-bar [isHidden]="isHidden()"></app-emergency-bar>
    <app-main-header 
      [isHidden]="isHidden()" 
      [user]="auth.currentUser()"
      (portalClick)="navigateToPortal()">
    </app-main-header>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NavbarComponent {
  auth = inject(AuthService);
  private scrollService = inject(ScrollService);

  isHidden = computed(() => this.scrollService.scrollDirection() === 'up');

  navigateToPortal() {
    window.location.href = 'http://localhost:4201';
  }
}
