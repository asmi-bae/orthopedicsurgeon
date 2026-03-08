import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, startWith } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-admin-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <div class="flex items-center gap-1 text-sm">
      <span class="text-google-gray-400">Admin</span>
      
      @for (breadcrumb of breadcrumbs; track breadcrumb.url; let last = $last) {
        <mat-icon class="!w-4 !h-4 !text-[16px] text-google-gray-500 flex items-center justify-center">chevron_right</mat-icon>
        <a 
          [routerLink]="breadcrumb.url"
          class="transition-colors hover:text-google-blue"
          [class.font-medium]="last"
          [class.text-google-gray-900]="last"
          [class.dark:text-white]="last"
          [class.text-google-gray-400]="!last"
          [class.pointer-events-none]="last"
        >
          {{ breadcrumb.label }}
        </a>
      }
    </div>
  `
})
export class AdminBreadcrumbComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  breadcrumbs: Breadcrumb[] = [];

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
