import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-warning',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Session Expiring Soon</h2>
        <p class="text-gray-600 mb-6">
          You have been inactive for a while. Your session will expire in 2 minutes.
          Would you like to stay logged in?
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            (click)="logout.emit()"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
            Logout
          </button>
          <button 
            (click)="extend.emit()"
            class="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors">
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  `
})
export class SessionExpirationModalComponent {
  @Output() logout = new EventEmitter<void>();
  @Output() extend = new EventEmitter<void>();
}
