-- Site Settings
INSERT INTO site_settings (key, value, category, is_public) VALUES
('hospital_name', 'OrthoSync Medical Center', 'general', true),
('hospital_tagline',
    'Advanced Orthopedic Care for a Better Life',
    'general', true),
('hospital_phone', '+1 (555) 234-5678', 'contact', true),
('hospital_emergency_phone', '+1 (555) 234-9999',
    'contact', true),
('hospital_email', 'info@orthosync.com', 'contact', true),
('hospital_address',
    '123 Medical Center Blvd, Suite 400', 'contact', true),
('hospital_city', 'New York', 'contact', true),
('hospital_state', 'NY', 'contact', true),
('hospital_zip', '10001', 'contact', true),
('hospital_country', 'United States', 'contact', true),
('hospital_map_lat', '40.7128', 'location', true),
('hospital_map_lng', '-74.0060', 'location', true),
('working_hours_mon', '08:00-18:00', 'hours', true),
('working_hours_tue', '08:00-18:00', 'hours', true),
('working_hours_wed', '08:00-18:00', 'hours', true),
('working_hours_thu', '08:00-18:00', 'hours', true),
('working_hours_fri', '08:00-17:00', 'hours', true),
('working_hours_sat', '09:00-14:00', 'hours', true),
('working_hours_sun', 'closed', 'hours', true),
('social_facebook',
    'https://facebook.com/orthosync', 'social', true),
('social_twitter',
    'https://twitter.com/orthosync', 'social', true),
('social_instagram',
    'https://instagram.com/orthosync', 'social', true),
('social_linkedin',
    'https://linkedin.com/company/orthosync', 'social', true),
('years_experience', '25', 'stats', true),
('success_rate', '98.5', 'stats', true),
('hospital_established_year', '1999', 'general', true),
('hospital_mission',
    'To provide world-class orthopedic care with compassion,
     innovation, and excellence.',
    'about', true),
('hospital_vision',
    'To be the leading orthopedic center in the region,
     restoring mobility and improving quality of life.',
    'about', true);

-- Hero Slides
INSERT INTO hero_slides
    (title, subtitle, description, image_url,
     button_text, button_link, display_order, is_active)
VALUES
('Expert Orthopedic Care',
 'Restoring Mobility, Transforming Lives',
 'Our world-class orthopedic specialists use cutting-edge
  techniques to help you recover faster and live pain-free.',
 '/images/hero/hero-1.jpg',
 'Book Appointment', '/book', 1, true),

('Advanced Joint Replacement',
 'State-of-the-Art Surgery with Rapid Recovery',
 'Minimally invasive joint replacement procedures
  with 95% patient satisfaction rate.',
 '/images/hero/hero-2.jpg',
 'Meet Our Doctors', '/doctors', 2, true),

('Sports Injury Treatment',
 'Get Back in the Game Faster',
 'Specialized sports medicine and rehabilitation
  programs designed for athletes of all levels.',
 '/images/hero/hero-3.jpg',
 'Our Services', '/services', 3, true),

('Pediatric Orthopedics',
 'Specialized Care for Growing Bodies',
 'Gentle, expert care for children with bone,
  joint, and muscle conditions.',
 '/images/hero/hero-4.jpg',
 'Learn More', '/services#pediatric', 4, true),

('Spine & Back Care',
 'Relief from Chronic Back Pain',
 'Comprehensive spine care from diagnosis to
  treatment and rehabilitation.',
 '/images/hero/hero-5.jpg',
 'Get Started', '/book', 5, true);

-- FAQs (orthopedic-specific)
INSERT INTO faqs (question, answer, category, display_order)
VALUES
('What conditions do orthopedic surgeons treat?',
 'Orthopedic surgeons treat conditions affecting the
  musculoskeletal system including fractures, arthritis,
  sports injuries, spine disorders, joint pain,
  carpal tunnel syndrome, and congenital deformities.',
 'general', 1),

('How do I know if I need orthopedic surgery?',
 'Surgery is typically recommended when conservative
  treatments (physical therapy, medications, injections)
  have not provided relief. Your orthopedic specialist
  will evaluate your condition and recommend the most
  appropriate treatment plan.',
 'general', 2),

('What is the recovery time after joint replacement?',
 'Most patients can walk with assistance within 24 hours
  of hip or knee replacement surgery. Full recovery
  typically takes 3-6 months, though many patients
  return to light activities within 6 weeks.',
 'surgery', 3),

('Do you offer minimally invasive procedures?',
 'Yes, we specialize in minimally invasive techniques
  including arthroscopic surgery, which involves smaller
  incisions, less pain, faster recovery, and reduced
  risk of complications compared to traditional surgery.',
 'surgery', 4),

('How should I prepare for my first appointment?',
 'Bring your insurance card, photo ID, list of current
  medications, any previous X-rays or MRI scans,
  and a description of your symptoms including when
  they started and what makes them better or worse.',
 'appointments', 5),

('Does insurance cover orthopedic treatment?',
 'Most major insurance plans cover medically necessary
  orthopedic treatments. Our billing team will verify
  your coverage before your appointment and provide
  a clear breakdown of any out-of-pocket costs.',
 'billing', 6),

('What is physical therapy and do I need it?',
 'Physical therapy uses exercises and techniques to
  restore strength, flexibility, and function.
  It is recommended after most orthopedic procedures
  and for many non-surgical conditions to maximize
  recovery outcomes.',
 'treatment', 7),

('Can I book an online consultation?',
 'Yes, we offer telemedicine consultations for initial
  evaluations, follow-up appointments, and second
  opinions. Online consultations are available
  Monday-Friday 9 AM-5 PM.',
 'appointments', 8),

('How long do artificial joints last?',
 'Modern joint implants typically last 15-25 years
  depending on activity level, weight, and implant
  type. Advances in materials and techniques continue
  to improve implant longevity.',
 'surgery', 9),

('What should I do immediately after a sports injury?',
 'Follow the RICE protocol: Rest the injured area,
  apply Ice for 20 minutes every 2-3 hours, use
  Compression with a bandage, and Elevate the limb.
  Seek immediate medical attention if you suspect
  a fracture or severe ligament damage.',
 'treatment', 10);

-- Blog Categories
INSERT INTO blog_categories
    (name, slug, description, display_order, is_active)
VALUES
('Joint Health', 'joint-health',
 'Tips and information about maintaining healthy joints
  and managing arthritis and joint pain.',
 1, true),

('Sports Medicine', 'sports-medicine',
 'Expert advice on preventing and recovering from
  sports injuries for athletes of all levels.',
 2, true),

('Spine Care', 'spine-care',
 'Guidance on preventing and treating back pain,
  herniated discs, and other spine conditions.',
 3, true),

('Recovery & Rehabilitation', 'recovery-rehabilitation',
 'Post-surgery recovery tips and rehabilitation
  exercises to help you heal faster.',
 4, true),

('Patient Stories', 'patient-stories',
 'Inspiring stories from our patients about their
  orthopedic journeys and successful recoveries.',
 5, true);

-- Testimonials
INSERT INTO testimonials
    (patient_name, content, rating,
     is_verified, is_featured)
VALUES
('Sarah M.',
 'After years of debilitating knee pain, Dr. Johnson
  performed my total knee replacement and I was walking
  without pain within weeks. The entire team was
  compassionate and professional. I highly recommend
  OrthoSync to anyone suffering from joint pain.',
 5, true, true),

('Robert K.',
 'I tore my ACL playing basketball and was devastated.
  The sports medicine team not only repaired my knee
  but designed a rehabilitation program that got me
  back on the court in record time. Exceptional care!',
 5, true, true),

('Linda T.',
 'I had been living with chronic back pain for over
  a decade. After just one consultation, the team
  identified the issue and recommended a minimally
  invasive procedure. Six weeks later I am completely
  pain-free. Life-changing!',
 5, true, true),

('James W.',
 'The staff is incredibly attentive and the facility
  is state-of-the-art. My shoulder surgery went
  perfectly and the physical therapy team helped me
  regain full range of motion. Cannot thank them enough.',
 5, true, true),

('Maria G.',
 'As someone who was nervous about surgery, the doctors
  took time to explain every step of my hip replacement.
  The recovery was smoother than I expected.
  Outstanding experience from start to finish.',
 4, true, true),

('David L.',
 'Professional, efficient, and genuinely caring.
  My carpal tunnel surgery was quick and the results
  were immediate. The follow-up care was excellent.
  I would not go anywhere else for orthopedic care.',
 5, true, true),

('Emily R.',
 'My teenage son had a complex fracture from a fall
  and the pediatric orthopedic team was absolutely
  wonderful with him. He healed perfectly and
  is back to his active lifestyle.',
 5, true, true),

('Thomas B.',
 'After two failed surgeries elsewhere, I came to
  OrthoSync as a last resort. The team diagnosed
  a previously missed condition and corrected it.
  I am finally pain-free after years of suffering.',
 5, true, true);

-- Gallery Items
INSERT INTO gallery_items
    (title, description, image_url, category,
     display_order, is_active)
VALUES
('State-of-the-Art Operating Theater',
 'Our minimally invasive surgery suite equipped
  with the latest robotic assistance technology.',
 '/images/gallery/or-suite.jpg', 'facility', 1, true),

('Advanced MRI & Imaging Center',
 'On-site diagnostic imaging for faster diagnosis
  and treatment planning.',
 '/images/gallery/mri-center.jpg', 'facility', 2, true),

('Rehabilitation Gym',
 'Fully equipped physical therapy and rehabilitation
  center to support your recovery journey.',
 '/images/gallery/rehab-gym.jpg', 'facility', 3, true),

('Patient Recovery Suites',
 'Private, comfortable recovery rooms with
  round-the-clock nursing care.',
 '/images/gallery/recovery-suite.jpg', 'rooms', 4, true),

('Consultation Rooms',
 'Modern, private consultation rooms for
  thorough patient evaluations.',
 '/images/gallery/consultation.jpg', 'rooms', 5, true),

('Arthroscopic Surgery',
 'Live procedure demonstration of minimally
  invasive arthroscopic knee surgery.',
 '/images/gallery/arthroscopy.jpg', 'procedures', 6, true),

('Team Meeting',
 'Our multidisciplinary team conducting
  morning case review rounds.',
 '/images/gallery/team-meeting.jpg', 'team', 7, true),

('Community Health Fair',
 'OrthoSync team providing free screenings
  at the annual community health fair.',
 '/images/gallery/health-fair.jpg', 'community', 8, true);

-- Awards
INSERT INTO awards
    (title, description, image_url, awarded_by,
     award_year, display_order, is_active)
VALUES
('Top Orthopedic Hospital 2024',
 'Recognized as the top orthopedic center in
  the tri-state area for patient outcomes
  and surgical excellence.',
 '/images/awards/top-hospital-2024.png',
 'US News & World Report', 2024, 1, true),

('Patient Safety Excellence Award',
 'Awarded for maintaining a zero surgical
  site infection rate for three consecutive years.',
 '/images/awards/safety-award.png',
 'Healthgrades', 2024, 2, true),

('Best Workplace in Healthcare',
 'Recognized for exceptional workplace culture,
  staff satisfaction, and professional development
  programs.',
 '/images/awards/best-workplace.png',
 'Modern Healthcare', 2023, 3, true),

('Innovation in Robotic Surgery',
 'Pioneering the use of AI-assisted robotic
  systems for precision joint replacement surgery.',
 '/images/awards/innovation-award.png',
 'American Academy of Orthopedic Surgeons',
 2023, 4, true);

-- Partners
INSERT INTO partners (name, logo_url, website_url,
    display_order, is_active)
VALUES
('Stryker Corporation',
 '/images/partners/stryker.png',
 'https://www.stryker.com', 1, true),
('Zimmer Biomet',
 '/images/partners/zimmer-biomet.png',
 'https://www.zimmerbiomet.com', 2, true),
('DePuy Synthes',
 '/images/partners/depuy.png',
 'https://www.depuysynthes.com', 3, true),
('Smith & Nephew',
 '/images/partners/smith-nephew.png',
 'https://www.smith-nephew.com', 4, true),
('Arthrex',
 '/images/partners/arthrex.png',
 'https://www.arthrex.com', 5, true);
