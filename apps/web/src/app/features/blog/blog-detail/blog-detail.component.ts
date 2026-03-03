import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatDividerModule, MatChipsModule],
  template: `
    <article class="bg-white min-h-screen">
      <!-- Hero -->
      <section class="relative h-[60vh] bg-secondary-900 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1600" class="w-full h-full object-cover opacity-40 grayscale" />
        <div class="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/60 to-transparent"></div>
        
        <div class="absolute bottom-0 left-0 w-full pb-20">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <mat-chip class="premium-badge mb-8">Clinical Research</mat-chip>
            <h1 class="text-6xl font-black text-white tracking-tighter uppercase leading-none mb-10">
              Innovations in Robotic-Assisted <br/><span class="text-primary tracking-normal">Hip Replacement</span>
            </h1>
            
            <div class="flex items-center gap-8 text-white">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=drwilson" class="w-full h-full object-cover" />
                </div>
                <div>
                  <p class="text-[10px] font-black uppercase tracking-widest">Dr. James Wilson</p>
                  <p class="text-[8px] font-bold text-primary uppercase tracking-[0.2em]">Chief of Surgery</p>
                </div>
              </div>
              <div class="h-8 w-[1px] bg-white/10"></div>
              <div class="text-white/40">
                <p class="text-[10px] font-black uppercase tracking-widest">Released</p>
                <p class="text-[10px] font-bold uppercase tracking-tight">MAY 24, 2026</p>
              </div>
              <div class="h-8 w-[1px] bg-white/10"></div>
              <div class="text-white/40">
                <p class="text-[10px] font-black uppercase tracking-widest">Protocol</p>
                <p class="text-[10px] font-bold uppercase tracking-tight">8 MIN READ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="py-24">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="prose prose-xl prose-secondary max-w-none">
            <p class="text-2xl font-bold text-secondary-900 leading-relaxed mb-12 border-l-4 border-primary pl-10">
              The integration of robotic guidance systems into orthopedic surgery marks a pivotal transition towards absolute precision in musculoskeletal restoration.
            </p>

            <h3 class="text-3xl font-black text-secondary-900 uppercase tracking-tight mt-16 mb-8">The Precision Advantage</h3>
            <p class="text-secondary-600 leading-relaxed mb-8">
              Traditional hip replacement relies heavily on the surgeon's manual experience for alignment and positioning. While highly successful, robotic assistance introduces a layer of sub-millimeter accuracy that was previously unattainable. Using real-time 3D mapping and haptic feedback, surgeons can now execute bone preparation and implant placement with unprecedented control.
            </p>

            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" class="w-full rounded-[40px] my-16 shadow-2xl grayscale" />

            <h3 class="text-3xl font-black text-secondary-900 uppercase tracking-tight mt-16 mb-8">Accelerated Restoration</h3>
            <p class="text-secondary-600 leading-relaxed mb-8">
              One of the most significant benefits documented in recent clinical trials is the reduction in soft tissue trauma. The precision of the robotic arm ensures that incisions are minimal and that healthy surrounding tissue remains preserved. This directly correlates to reduced post-operative pain and significantly faster functional restoration.
            </p>

            <div class="bg-gray-50 rounded-[40px] p-12 my-16 border border-gray-100 flex items-start gap-8">
              <mat-icon class="text-primary scale-150">info</mat-icon>
              <div>
                <h4 class="text-xl font-black text-secondary-900 uppercase tracking-tight mb-4">Protocol Highlight</h4>
                <p class="text-secondary-600 text-sm leading-relaxed font-medium">Patients undergoing robotic-assisted procedures at OrthoSync typically mobilize within 4 hours post-operatively, compared to the 8-12 hour benchmark in traditional methods.</p>
              </div>
            </div>

            <p class="text-secondary-600 leading-relaxed mb-8">
              At OrthoSync, we continue to invest in the latest generations of Mako and ROSA systems, ensuring that our patients receive cares that is not just current, but visionary.
            </p>
          </div>

          <mat-divider class="my-20 opacity-50"></mat-divider>

          <!-- Author Bio -->
          <div class="flex flex-col md:flex-row gap-10 items-center bg-secondary-900 p-12 rounded-[40px] text-white text-center md:text-left">
            <div class="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-primary/20">
              <img src="https://i.pravatar.cc/300?u=drwilson" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1">
              <h4 class="text-2xl font-black uppercase tracking-tight mb-2">Dr. James Wilson</h4>
              <p class="text-primary font-black uppercase tracking-widest text-xs mb-4">Board-Certified Orthopedic Surgeon</p>
              <p class="text-white/60 text-sm leading-relaxed font-medium">Specializing in complex joint reconstruction and pioneers of robotic surgical protocols at OrthoSync.</p>
            </div>
            <button mat-stroked-button color="primary" class="h-14 px-8 rounded-xl font-bold uppercase border-2 text-white">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </article>
  `,
  styles: [`
    :host { display: block; }
    .premium-badge { background: #3b82f6 !important; color: white !important; font-size: 10px !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; height: 32px !important; border: none !important; }
  `]
})
export class BlogDetailComponent {}
