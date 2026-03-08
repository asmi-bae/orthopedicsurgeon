import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@repo/auth';
import { SessionExpirationModalComponent } from './core/components/session-warning.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SessionExpirationModalComponent, CommonModule],
  template: `
    <router-outlet></router-outlet>
    <app-session-warning 
      *ngIf="authService.showSessionWarning()"
      (extend)="extendSession()"
      (logout)="logout()">
    </app-session-warning>
  `
})
export class AppComponent {
  protected readonly title = signal('admin');
  protected authService = inject(AuthService);

  extendSession() {
    this.authService.refreshToken().subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
