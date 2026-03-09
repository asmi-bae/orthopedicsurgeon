import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test-import',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: '<button mat-button><mat-icon>check</mat-icon> Test</button>'
})
export class TestImportComponent {}
