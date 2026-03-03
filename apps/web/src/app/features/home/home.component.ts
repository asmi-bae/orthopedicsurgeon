import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  template: `
    <div class="flex flex-col bg-white">
      <!-- Hero Section -->
      <section class="relative pt-20 pb-32 overflow-hidden bg-secondary-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="animate-in fade-in slide-in-from-left duration-1000">
               <mat-chip-set class="mb-8 font-typography">
                 <mat-chip class="premium-chip">Orthopedic Excellence</mat-chip>
               </mat-chip-set>
               
               <h1 class="text-6xl md:text-7xl font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase transition-all">
                 Modern Care for Your <br/><span class="text-primary tracking-normal">Bones & Joints</span>
               </h1>
               
               <p class="text-xl text-white/60 mb-10 max-w-lg leading-relaxed font-medium">
                 Connect with top orthopedic surgeons, book appointments online, and manage your recovery plan with our state-of-the-art platform.
               </p>
               
               <div class="flex flex-wrap gap-5">
                 <a mat-flat-button color="primary" routerLink="/auth/register" 
                         class="h-16 px-10 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                   Get Started
                 </a>
                 <a mat-tonal-button color="primary" routerLink="/about"
                         class="h-16 px-10 rounded-2xl text-lg font-bold uppercase transition-all">
                   How it Works
                 </a>
               </div>

               <div class="mt-16 flex items-center gap-10">
                 <div class="flex -space-x-4">
                    @for (i of [1,2,3,4,5]; track i) {
                      <img class="w-12 h-12 rounded-full border-4 border-secondary-900 shadow-lg" [src]="'https://i.pravatar.cc/150?img=' + (i+10)" />
                    }
                 </div>
                 <div class="flex flex-col">
                   <p class="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">
                     10,000+ Operations
                   </p>
                   <p class="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Verified Success Stories</p>
                 </div>
               </div>
            </div>

            <div class="relative animate-in fade-in slide-in-from-right duration-1000">
               <div class="relative z-10 rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-[12px] border-white/5">
                  <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" alt="Surgeon" class="w-full h-full object-cover grayscale transition-all duration-1000 brightness-75" />
               </div>
               <mat-card class="absolute -bottom-12 -left-12 z-20 w-80 p-6 rounded-[30px] shadow-2xl border-none bg-white/90 backdrop-blur-xl animate-bounce-subtle">
                  <div class="flex items-center gap-5">
                     <div class="w-14 h-14 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center">
                       <mat-icon class="scale-125">verified_user</mat-icon>
                     </div>
                     <div>
                       <p class="text-[10px] text-secondary-400 font-black uppercase tracking-widest mb-1">Availability Node</p>
                       <p class="text-lg font-black text-secondary-900 tracking-tight leading-none uppercase">Slot: Today, 4:30 PM</p>
                     </div>
                  </div>
               </mat-card>
               <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="bg-white py-32 relative overflow-hidden">
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
               @for (stat of stats; track stat.label) {
                 <div class="flex flex-col group items-center">
                    <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-primary mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                      <mat-icon>{{stat.icon}}</mat-icon>
                    </div>
                    <h3 class="text-4xl font-black text-secondary-900 tracking-tighter uppercase mb-2">{{stat.value}}</h3>
                    <p class="text-xs font-black text-primary uppercase tracking-[0.3em] mb-2">{{stat.label}}</p>
                    <p class="text-sm text-secondary-400 font-medium leading-relaxed">{{stat.description}}</p>
                 </div>
               }
            </div>
         </div>
      </section>

      <!-- Services Section -->
      <section class="py-32 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-20 text-balance">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Our Specializations</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">Clinical Medical <br/>Centres</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (service of services; track service.title) {
              <mat-card class="p-8 rounded-[32px] border border-gray-100 shadow-none hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white">
                <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                  <mat-icon class="scale-125">{{service.icon}}</mat-icon>
                </div>
                <h4 class="text-xl font-black text-secondary-900 uppercase tracking-tight mb-4">{{service.title}}</h4>
                <p class="text-secondary-600 text-sm leading-relaxed mb-6 font-medium">{{service.description}}</p>
                <a mat-button color="primary" class="font-black uppercase tracking-widest text-[10px] p-0" routerLink="/departments">Learn More <mat-icon class="text-sm ml-1">arrow_forward</mat-icon></a>
              </mat-card>
            }
          </div>
        </div>
      </section>

      <!-- Partner Hospitals Section -->
      <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-20">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Strategic Network</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase mb-6">Partner Hospitals</h3>
            <p class="text-lg text-secondary-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore our network of state-of-the-art medical facilities dedicated to musculoskeletal excellence.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            @for (h of hospitals; track h.name) {
              <mat-card class="rounded-[32px] border border-gray-100 shadow-none overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div class="h-48 relative overflow-hidden">
                   <img [src]="h.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div class="p-6">
                   <h4 class="text-sm font-black text-secondary-900 uppercase tracking-tight mb-2">{{h.name}}</h4>
                   <div class="flex items-center gap-2 text-[9px] font-bold text-primary uppercase tracking-widest">
                      <mat-icon class="scale-50">location_on</mat-icon>
                      <span>{{h.city}}</span>
                   </div>
                </div>
              </mat-card>
            }
          </div>
          
          <div class="mt-20 text-center">
             <a mat-tonal-button color="primary" routerLink="/hospitals" class="h-14 px-10 rounded-xl font-bold uppercase tracking-widest text-[11px]">
                Explore All Facilities
             </a>
          </div>
        </div>
      </section>

      <!-- Virtual Tour Banner -->
      <section class="py-32 bg-secondary-900 relative overflow-hidden group text-center">
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.5em] mb-6">Facility Scan</h2>
            <h3 class="text-5xl font-black text-white tracking-tighter uppercase mb-10">Experience Our Clinical <br/>Architecture</h3>
            <a mat-flat-button color="primary" routerLink="/gallery" class="h-16 px-12 rounded-2xl text-lg font-bold uppercase shadow-2xl shadow-primary/30">
              Initialize Virtual Tour
            </a>
         </div>
         <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
         <div class="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
      </section>

      <!-- Latest Intelligence (Blog) -->
      <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-end mb-20 text-balance">
            <div>
              <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Latest Insights</h2>
              <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">Medical Protocol <br/>Stream</h3>
            </div>
            <a mat-button color="primary" class="font-black uppercase tracking-widest text-[11px]" routerLink="/blog">View All Intelligence <mat-icon class="ml-2">arrow_forward</mat-icon></a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (news of newsStream; track news.slug) {
              <mat-card class="rounded-[32px] border border-gray-100 shadow-none overflow-hidden hover:shadow-lg transition-all">
                <div class="h-48 overflow-hidden">
                  <img [src]="news.image" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div class="p-8">
                  <p class="text-[9px] font-black text-primary uppercase tracking-widest mb-3">{{news.date}}</p>
                  <h4 class="text-lg font-black text-secondary-900 uppercase tracking-tight mb-4 transition-colors">{{news.title}}</h4>
                  <a mat-button color="primary" class="font-black uppercase text-[10px] p-0" [routerLink]="['/blog', news.slug]">Access Protocol</a>
                </div>
              </mat-card>
            }
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-32 bg-gray-50 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-20">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Success Stories</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">Restoring Lives, <br/>One Patient at a Time</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (t of testimonials; track t.name) {
              <mat-card class="p-8 rounded-[32px] bg-white border border-gray-100 shadow-none">
                <div class="flex items-center gap-4 mb-8">
                  <img [src]="t.avatar" class="w-12 h-12 rounded-full border-2 border-primary/30" />
                  <div>
                    <p class="text-sm font-black text-secondary-900 uppercase tracking-tight">{{t.name}}</p>
                    <p class="text-[10px] font-bold text-primary uppercase tracking-widest">{{t.role}}</p>
                  </div>
                </div>
                <p class="text-secondary-600 text-sm leading-relaxed font-medium">"{{t.content}}"</p>
                <div class="mt-8 flex gap-1 text-primary">
                  @for (i of [1,2,3,4,5]; track i) {
                    <mat-icon class="text-sm">star</mat-icon>
                  }
                </div>
              </mat-card>
            }
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-32 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-20">
            <h2 class="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Knowledge Base</h2>
            <h3 class="text-5xl font-black text-secondary-900 tracking-tighter uppercase">Frequently Asked <br/>Questions</h3>
          </div>

          <mat-accordion class="premium-accordion">
            @for (faq of faqs; track faq.question) {
              <mat-expansion-panel class="mb-4 rounded-2xl border-none shadow-none bg-gray-50">
                <mat-expansion-panel-header class="h-20 px-8">
                  <mat-panel-title class="text-sm font-black text-secondary-900 uppercase tracking-tight">
                    {{faq.question}}
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <div class="px-8 pb-8">
                  <p class="text-secondary-600 text-sm leading-relaxed font-medium">{{faq.answer}}</p>
                </div>
              </mat-expansion-panel>
            }
          </mat-accordion>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-32 bg-primary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-xs font-black uppercase tracking-[0.4em] mb-4 text-white/60">Newsletter Subscription</h2>
            <h3 class="text-5xl font-black tracking-tighter uppercase mb-10">Stay Informed on <br/>Medical Precision</h3>
            
            <form class="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <mat-form-field appearance="outline" class="w-full sm:w-96 premium-form-field no-subscript-wrapper">
                <mat-label class="hidden">Email Address</mat-label>
                <input matInput placeholder="SECURE EMAIL CHANNEL" class="uppercase tracking-widest font-black text-[10px]">
                <mat-icon matSuffix class="text-white/40">mail</mat-icon>
              </mat-form-field>
              <button mat-flat-button class="h-[56px] px-10 rounded-xl bg-white text-primary font-bold uppercase text-lg shadow-2xl">
                Establish Link
              </button>
            </form>
            <p class="mt-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Encrypted transmission secured</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .premium-chip { background: #3b82f6 !important; color: white !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; font-size: 10px !important; border: none !important; padding: 4px 12px !important; }
    @keyframes bounce-subtle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
    
    .premium-accordion ::ng-deep .mat-expansion-panel { border-radius: 20px !important; overflow: hidden; margin-bottom: 16px; border: 1px solid #f1f5f9; }
    .premium-accordion ::ng-deep .mat-expansion-panel-header { background: transparent !important; }
    .premium-accordion ::ng-deep .mat-content { align-items: center; }

    .premium-form-field ::ng-deep .mat-mdc-text-field-wrapper { background: rgba(255,255,255,0.1) !important; border-radius: 12px !important; }
    .premium-form-field ::ng-deep .mdc-notched-outline__leading,
    .premium-form-field ::ng-deep .mdc-notched-outline__notch,
    .premium-form-field ::ng-deep .mdc-notched-outline__trailing { border-color: rgba(255,255,255,0.2) !important; }
    .premium-form-field ::ng-deep input { color: white !important; }
    .no-subscript-wrapper ::ng-deep .mat-mdc-form-field-subscript-wrapper { display: none; }
  `]
})
export class HomeComponent {
  stats = [
    { label: 'Specialists', value: '150+', description: 'Board-certified specialists', icon: 'groups' },
    { label: 'Facilities', value: '25', description: 'Modern hubs across sectors', icon: 'apartment' },
    { label: 'Satisfaction', value: '4.9/5', description: 'Based on verified reviews', icon: 'auto_awesome' },
    { label: 'Precision', value: '98%', description: 'Success rate in surgery', icon: 'biotech' },
  ];

  services = [
    { title: 'Joint Replacement', description: 'State-of-the-art hip, knee, and shoulder replacement surgeries with minimally invasive techniques.', icon: 'rebase_edit' },
    { title: 'Sports Medicine', description: 'Comprehensive care for athletes, from diagnostic imaging to advanced arthroscopic surgery.', icon: 'sports_scores' },
    { title: 'Spine Care', description: 'Expert treatment for spinal conditions, including herniated discs and spinal stenosis.', icon: 'accessibility' },
    { title: 'Pediatric Orthopedics', description: 'Specialized care for children with congenital, developmental, and traumatic bone issues.', icon: 'child_care' },
    { title: 'Trauma & Fractures', description: '24/7 emergency care for complex bone breaks and musculoskeletal trauma.', icon: 'healing' },
    { title: 'Physical Therapy', description: 'Tailored rehabilitation programs to restore mobility and strength after surgery.', icon: 'fitness_center' },
  ];

  testimonials = [
    { name: 'Sarah Johnson', role: 'Knee Replacement', content: 'The care I received was exceptional. I was back on my feet much sooner than I expected.', avatar: 'https://i.pravatar.cc/150?img=32' },
    { name: 'Michael Chen', role: 'Professional Athlete', content: 'OrthoSync saved my career. Their sports medicine specialists are world-class.', avatar: 'https://i.pravatar.cc/150?img=52' },
    { name: 'Emma Williams', role: 'Spine Surgery', content: 'I lived with back pain for years. I finally have my life back.', avatar: 'https://i.pravatar.cc/150?img=45' },
  ];

  faqs = [
    { question: 'What should I bring to my first appointment?', answer: 'Please bring your ID, insurance card, any recent imaging (X-rays, MRIs), and a list of current medications.' },
    { question: 'Do you offer virtual consultations?', answer: 'Yes, we offer telehealth appointments for initial consultations and certain follow-up visits.' },
    { question: 'What insurance plans do you accept?', answer: 'We accept most major insurance providers. Please contact our billing office for specific plan verification.' },
  ];

  newsStream = [
    { title: 'Robotic Engineering in Hip Restoration', date: 'MAY 24', slug: 'robotic-hip-replacement-innovations', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561' },
    { title: 'Biometric Recovery Protocols', date: 'MAY 20', slug: 'post-surgery-recovery-biometrics', image: 'https://images.unsplash.com/photo-1571019623518-e71de96e28da' },
    { title: 'Regenerative Bone Biology', date: 'MAY 15', slug: 'future-regenerative-bone-therapy', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514' },
  ];

  hospitals = [
    { name: 'City Ortho Hub', city: 'Downtown', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d' },
    { name: 'Spine Specialty Node', city: 'Sector 4', image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b' },
    { name: 'Joint Care Pavilion', city: 'North Wing', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3' },
    { name: 'Trauma Restoration Center', city: 'Central East', image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6' },
  ];
}
