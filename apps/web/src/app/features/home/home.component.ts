import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Sub-components
import { HeroComponent } from './components/hero/hero.component';
import { StatsComponent, Stat } from './components/stats/stats.component';
import { ServicesComponent, Service } from './components/services/services.component';
import { SuccessfulSurgeriesComponent } from './components/successful-surgeries/successful-surgeries.component';
import { VirtualTourComponent } from './components/virtual-tour/virtual-tour.component';
import { BlogComponent, NewsItem } from './components/blog/blog.component';
import { TestimonialsComponent, Testimonial } from './components/testimonials/testimonials.component';
import { FaqComponent, FAQ } from './components/faq/faq.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { GalleryPreviewComponent } from './components/gallery-preview/gallery-preview.component';
import { ContactPreviewComponent } from './components/contact-preview/contact-preview.component';
import { QuickAppointmentComponent } from './components/quick-appointment/quick-appointment.component';
import { PartnersComponent, Hospital } from './components/partners/partners.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    StatsComponent,
    ServicesComponent,
    GalleryPreviewComponent,
    SuccessfulSurgeriesComponent,
    VirtualTourComponent,
    BlogComponent,
    TestimonialsComponent,
    FaqComponent,
    QuickAppointmentComponent,
    ContactPreviewComponent,
    NewsletterComponent,
    PartnersComponent
  ],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Hero Section -->
      <app-home-hero></app-home-hero>

      <!-- Stats Section -->
      <app-home-stats id="discover" [stats]="stats"></app-home-stats>

      <!-- Services Section -->
      <app-home-services [services]="services"></app-home-services>

      <!-- Gallery Preview -->
      <app-home-gallery-preview></app-home-gallery-preview>

      <!-- Successful Surgeries Section -->
      <app-home-surgeries></app-home-surgeries>

      <!-- Virtual Tour Banner -->
      <app-home-virtual-tour></app-home-virtual-tour>

      <!-- Latest Intelligence (Blog) -->
      <app-home-blog [newsStream]="newsStream"></app-home-blog>

      <!-- Quick Appointment Section -->
      <app-home-quick-appointment></app-home-quick-appointment>

      <!-- Testimonials -->
      <app-home-testimonials [testimonials]="testimonials"></app-home-testimonials>

      <!-- FAQ Section -->
      <app-home-faq [faqs]="faqs"></app-home-faq>

    <!-- Partners Section -->
      <app-home-partners [hospitals]="hospitals"></app-home-partners>

      <!-- Contact / Location -->
      <app-home-contact-preview></app-home-contact-preview>

      <!-- Newsletter -->
      <app-home-newsletter></app-home-newsletter>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .no-subscript-wrapper ::ng-deep .mat-mdc-form-field-subscript-wrapper { display: none; }
  `]
})
export class HomeComponent {
  stats = [
    { label: 'HOME.STATS.EXPERIENCE', value: 'HOME.STATS.DATA.VAL1', description: 'HOME.STATS.DATA.DESC1', icon: 'history' },
    { label: 'HOME.STATS.SUCCESSFUL_TREATMENTS', value: 'HOME.STATS.DATA.VAL2', description: 'HOME.STATS.DATA.DESC3', icon: 'task_alt' },
    { label: 'HOME.STATS.SPECIALIZATION', value: 'HOME.STATS.DATA.VAL3', description: 'HOME.STATS.DATA.DESC4', icon: 'accessibility_new' },
    { label: 'HOME.STATS.PRECISION', value: 'HOME.STATS.DATA.VAL4', description: 'HOME.STATS.DATA.DESC1', icon: 'biotech' },
  ];

  services = [
    { title: 'HOME.SERVICES.KNEE', description: 'HOME.SERVICES.KNEE_DESC', icon: 'rebase_edit', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118' },
    { title: 'HOME.SERVICES.HIP', description: 'HOME.SERVICES.HIP_DESC', icon: 'accessibility_new', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514' },
    { title: 'HOME.SERVICES.FRACTURE', description: 'HOME.SERVICES.FRACTURE_DESC', icon: 'healing', image: 'https://images.unsplash.com/photo-1581056323862-99bd07728491' },
    { title: 'HOME.SERVICES.ARTHROSCOPY', description: 'HOME.SERVICES.ARTHROSCOPY_DESC', icon: 'visibility', image: 'https://images.unsplash.com/photo-1576091160550-2173be9997ad' },
    { title: 'HOME.SERVICES.SPINE', description: 'HOME.SERVICES.SPINE_DESC', icon: 'accessibility', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc' },
    { title: 'HOME.SERVICES.SPORTS', description: 'HOME.SERVICES.SPORTS_DESC', icon: 'sports_scores', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8' },
  ];

  hospitals: Hospital[] = [
    { name: 'HOME.PARTNERS.CI1.NAME', city: 'HOME.PARTNERS.CI1.CITY', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d' },
    { name: 'HOME.PARTNERS.CI2.NAME', city: 'HOME.PARTNERS.CI2.CITY', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3' },
    { name: 'HOME.PARTNERS.CI3.NAME', city: 'HOME.PARTNERS.CI3.CITY', image: 'https://images.unsplash.com/photo-1504439468489-c8920d766a28' },
    { name: 'HOME.PARTNERS.CI4.NAME', city: 'HOME.PARTNERS.CI4.CITY', image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6' }
  ];

  testimonials = [
    { name: 'HOME.TESTIMONIALS.SARAH_NAME', role: 'HOME.TESTIMONIALS.SARAH_ROLE', content: 'HOME.TESTIMONIALS.SARAH_CONTENT', avatar: 'https://i.pravatar.cc/150?img=32' },
    { name: 'HOME.TESTIMONIALS.MICHAEL_NAME', role: 'HOME.TESTIMONIALS.MICHAEL_ROLE', content: 'HOME.TESTIMONIALS.MICHAEL_CONTENT', avatar: 'https://i.pravatar.cc/150?img=52' },
    { name: 'HOME.TESTIMONIALS.EMMA_NAME', role: 'HOME.TESTIMONIALS.EMMA_ROLE', content: 'HOME.TESTIMONIALS.EMMA_CONTENT', avatar: 'https://i.pravatar.cc/150?img=45' },
  ];

   faqs = [
     { qKey: 'HOME.FAQ.Q1', aKey: 'HOME.FAQ.A1' },
     { qKey: 'HOME.FAQ.Q2', aKey: 'HOME.FAQ.A2' },
     { qKey: 'HOME.FAQ.Q3', aKey: 'HOME.FAQ.A3' },
   ];
 
   newsStream = [
     { title: 'HOME.BLOG.NEWS1.TITLE', date: 'HOME.BLOG.NEWS1.DATE', slug: 'robotic-hip-replacement-innovations', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561' },
     { title: 'HOME.BLOG.NEWS2.TITLE', date: 'HOME.BLOG.NEWS2.DATE', slug: 'post-surgery-recovery-biometrics', image: 'https://images.unsplash.com/photo-1571019623518-e71de96e28da' },
     { title: 'HOME.BLOG.NEWS3.TITLE', date: 'HOME.BLOG.NEWS3.DATE', slug: 'future-regenerative-bone-therapy', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514' },
   ];
}
