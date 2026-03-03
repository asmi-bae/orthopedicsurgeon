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
        path: 'doctors',
        loadComponent: () => import('@features/doctors/doctor-list/doctor-list.component').then(m => m.DoctorListComponent)
      },
      {
        path: 'doctors/:id',
        loadComponent: () => import('@features/doctors/doctor-detail/doctor-detail.component').then(m => m.DoctorDetailComponent)
      },
      {
        path: 'doctors/:id/book',
        loadComponent: () => import('@features/doctors/booking/booking.component').then(m => m.BookingComponent)
      },
      {
        path: 'hospitals',
        loadComponent: () => import('@features/hospitals/hospital-list/hospital-list.component').then(m => m.HospitalListComponent)
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
        path: 'departments',
        loadComponent: () => import('@features/departments/departments.component').then(m => m.DepartmentsComponent)
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
        path: 'careers',
        loadComponent: () => import('@features/careers/careers.component').then(m => m.CareersComponent)
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
