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
    NewsletterComponent
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
    { label: 'HOME.HERO.DOCTOR.EXP', value: '15+', description: 'HOME.STATS.DATA.DESC1', icon: 'history' },
    { label: 'HOME.STATS.SUCCESSFUL_TREATMENTS', value: '5000+', description: 'HOME.STATS.DATA.DESC3', icon: 'task_alt' },
    { label: 'HOME.STATS.SPECIALIZATION', value: 'Knee, Hip, & Spine', description: 'HOME.STATS.DATA.DESC4', icon: 'accessibility_new' },
    { label: 'HOME.STATS.PRECISION', value: '98%', description: 'HOME.STATS.DATA.DESC4', icon: 'biotech' },
  ];

  services = [
    { title: 'HOME.SERVICES.KNEE', description: 'HOME.SERVICES.KNEE_DESC', icon: 'rebase_edit', image: 'assets/images/treatments/knee.png' },
    { title: 'HOME.SERVICES.HIP', description: 'HOME.SERVICES.HIP_DESC', icon: 'accessibility_new', image: 'assets/images/treatments/hip.png' },
    { title: 'HOME.SERVICES.FRACTURE', description: 'HOME.SERVICES.FRACTURE_DESC', icon: 'healing', image: 'assets/images/treatments/fracture.png' },
    { title: 'HOME.SERVICES.ARTHROSCOPY', description: 'HOME.SERVICES.ARTHROSCOPY_DESC', icon: 'visibility', image: 'assets/images/treatments/arthroscopy.png' },
    { title: 'HOME.SERVICES.SPINE', description: 'HOME.SERVICES.SPINE_DESC', icon: 'accessibility', image: 'assets/images/treatments/spine.png' },
    { title: 'HOME.SERVICES.SPORTS', description: 'HOME.SERVICES.SPORTS_DESC', icon: 'sports_scores', image: 'assets/images/treatments/sports.png' },
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
