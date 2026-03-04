import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div class="p-6">
      <h2 mat-dialog-title class="!text-xl !font-bold !mb-2 !p-0">Sign out?</h2>
      <mat-dialog-content class="!p-0 !text-slate-500 !mb-6 text-sm font-medium">
        Are you sure you want to sign out of your OrthoSync account?
      </mat-dialog-content>
      <mat-dialog-actions align="end" class="!p-0 !min-h-0 gap-3">
        <button mat-button (click)="dialogRef.close(false)" class="!rounded-lg font-bold">Cancel</button>
        <button mat-flat-button color="primary" (click)="dialogRef.close(true)" class="!rounded-lg font-bold">Sign Out</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    :host { display: block; border-radius: 24px; overflow: hidden; }
    h2 { margin: 0; }
  `]
})
export class LogoutDialogComponent {
  constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>) {}
}
