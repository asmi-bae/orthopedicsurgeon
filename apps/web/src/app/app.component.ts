import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@repo/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  protected readonly title = signal('web');
  private auth = inject(AuthService);

  ngOnInit() {
    this.auth.checkAuth().subscribe();
  }
}
