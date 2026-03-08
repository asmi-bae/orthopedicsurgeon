import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@core/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'services',
        loadComponent: () => import('@features/services/services.component').then(m => m.ServicesComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('@features/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('@features/contact/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'appointment',
        loadComponent: () => import('@features/appointment/appointment.component').then(m => m.AppointmentComponent)
      },
      {
        path: 'blog',
        loadComponent: () => import('@features/blog/blog-list/blog-list.component').then(m => m.BlogListComponent)
      },
      {
        path: 'blog/:slug',
        loadComponent: () => import('@features/blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent)
      },
      {
        path: 'gallery',
        loadComponent: () => import('@features/gallery/gallery.component').then(m => m.GalleryComponent)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('@features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'portal',
    loadChildren: () => import('@features/portal/portal.routes').then(m => m.PORTAL_ROUTES)
  }
];
