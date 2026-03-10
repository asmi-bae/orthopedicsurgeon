-- Migration to add dynamic i18n content from en.ts and bn.ts to site_settings

-- Cleanup old data for relevant categories
DELETE FROM site_settings WHERE category IN ('HERO', 'CLINIC_INFO', 'SERVICES', 'SUCCESS_STORIES', 'LEGAL', 'DOCTOR_PROFILE');

-- English Content (EN)
INSERT INTO site_settings (id, key, value, category, is_public, lang, created_at, updated_at) VALUES
(gen_random_uuid(), 'HOME.HERO.TITLE_PART1', 'INNOVATIVE CARE,', 'HERO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.HERO.TITLE_PART2', 'DELIVERED WITH HEART', 'HERO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.HERO.SUBTITLE', 'Expert care for bones, joints, and spine health', 'HERO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.HERO.DESCRIPTION', 'Trusted orthopedic care focused on your recovery and pain-free mobility.', 'HERO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'ABOUT.HERO.SUBTITLE', 'MY APPROACH', 'HERO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'ABOUT.HERO.TITLE_PART1', 'Restoring Human', 'HERO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'ABOUT.HERO.TITLE_PART2', 'Mobility through Precision', 'HERO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'ABOUT.HERO.DESCRIPTION', 'Dr. Ab Rahman is a leading orthopedic surgeon dedicated to clinical excellence and technological innovation in musculoskeletal care.', 'HERO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'HOME.CONTACT_INFO.ADDRESS_VALUE', 'Popular Diagnostic Center (Unit 02), House 15, Road 07, Sector 04, Uttara, Dhaka', 'CLINIC_INFO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.CONTACT_INFO.HOURS_VALUE', 'Everyday: 5:00 PM – 9:00 PM', 'CLINIC_INFO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.CONTACT_INFO.PHONE_VALUE', '+880 1711-123456', 'CLINIC_INFO', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'ABOUT.PROFILE.EDUCATION.ITEMS', '["MBBS, Dhaka Medical College","MS (Orthopedic Surgery), NITOR","Fellowship in Joint Replacement","Advanced Training in Arthroscopy"]', 'DOCTOR_PROFILE', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'ABOUT.PROFILE.EXPERIENCE.ITEMS', '["Consultant Orthopedic Surgeon, Popular Diagnostic Center","Former Senior Resident, NITOR","Specialist Surgeon, Joint Care Pavilion","Clinical Lead, Advanced Trauma Unit"]', 'DOCTOR_PROFILE', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'HOME.SERVICES.KNEE_DESC', 'Advanced knee restoration using precision alignment and minimally invasive techniques.', 'SERVICES', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.SERVICES.HIP_DESC', 'Expert hip joint restoration designed for long-term stability and rapid mobilization.', 'SERVICES', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'SUCCESS_STORIES.STORIES.SARAH.QUOTE', 'I never thought I would run again. Dr. Ab Rahman gave me back my career.', 'SUCCESS_STORIES', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'SUCCESS_STORIES.STORIES.JOHN.QUOTE', 'The pain is gone. I can finally walk my dog and enjoy life without constant discomfort.', 'SUCCESS_STORIES', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'LEGAL.PRIVACY.TEXT1', 'We collect personal and medical information necessary to provide orthopedic care and manage your appointments.', 'LEGAL', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'LEGAL.TERMS.TEXT1', 'By using our services, you agree to follow our clinic protocols and appointment cancellation policies.', 'LEGAL', true, 'EN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (key, lang) DO NOTHING;

-- Bengali Content (BN)
INSERT INTO site_settings (id, key, value, category, is_public, lang, created_at, updated_at) VALUES
(gen_random_uuid(), 'HOME.HERO.TITLE_PART1', 'উদ্ভাবনী সেবা,', 'HERO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.HERO.TITLE_PART2', 'হৃদয়ের ছোঁয়ায়', 'HERO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.HERO.SUBTITLE', 'হাড়, জয়েন্ট এবং মেরুদণ্ডের সমস্যার পেশাদার ডায়াগনসিস এবং বিশেষায়িত সার্জিক্যাল চিকিৎসা।', 'HERO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.HERO.DESCRIPTION', 'নির্ভরযোগ্য অর্থোপেডিক সেবা যা আপনার সুস্থতা এবং ব্যথামুক্ত জীবনের জন্য নিবেদিত।', 'HERO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'ABOUT.HERO.SUBTITLE', 'আমার পদ্ধতি', 'HERO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'ABOUT.HERO.TITLE_PART1', 'নিখুঁত চিকিৎসার মাধ্যমে', 'HERO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'ABOUT.HERO.TITLE_PART2', 'গতিশীলতা পুনরুদ্ধার', 'HERO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'ABOUT.HERO.DESCRIPTION', 'ডাঃ এ. বি. রহমান একজন শীর্ষস্থানীয় অর্থোপেডিক সার্জন যিনি ক্লিনিক্যাল উৎকর্ষ এবং মাসকুলোস্কেলিটাল যত্নে প্রযুক্তিগত উদ্ভাবনের জন্য নিবেদিত।', 'HERO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'HOME.CONTACT_INFO.ADDRESS_VALUE', 'পপুলার ডায়াগনস্টিক সেন্টার (ইউনিট ০২), হাউজ ১৫, রোড ০৭, সেক্টর ০৪, উত্তরা, ঢাকা', 'CLINIC_INFO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.CONTACT_INFO.HOURS_VALUE', 'প্রতিদিন: বিকেল ৫:০০ – রাত ৯:০০', 'CLINIC_INFO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.CONTACT_INFO.PHONE_VALUE', '+৮৮০ ১৭১১-১২৩৪৫৬', 'CLINIC_INFO', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'ABOUT.PROFILE.EDUCATION.ITEMS', '["এমবিবিএস, ঢাকা মেডিকেল কলেজ","এমএস (অর্থোপেডিক সার্জারি), নিটোর","ফেলোশিপ ইন জয়েন্ট রিপ্লেসমেন্ট","আর্থ্রোস্কোপি এবং স্পোর্টস মেডিসিনে উন্নত প্রশিক্ষণ"]', 'DOCTOR_PROFILE', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'ABOUT.PROFILE.EXPERIENCE.ITEMS', '["কনসালটেন্ট অর্থোপেডিক সার্জন, পপুলার ডায়াগনস্টিক সেন্টার","প্রাক্তন সিনিয়র রেসিডেন্ট, নিটোর","বিশেষজ্ঞ সার্জন, জয়েন্ট কেয়ার প্যাভিলিয়ন","ক্লিনিক্যাল লিড, অ্যাডভান্সড ট্রমা ইউনিট"]', 'DOCTOR_PROFILE', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'HOME.SERVICES.KNEE_DESC', 'নির্ভরযোগ্য প্রযুক্তি এবং ন্যূনতম আক্রমণাত্মক পদ্ধতির মাধ্যমে উন্নত হাঁটু প্রতিস্থাপন।', 'SERVICES', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'HOME.SERVICES.HIP_DESC', 'দীর্ঘমেয়াদী স্থায়িত্ব এবং দ্রুত চলাফেরার জন্য বিশেষজ্ঞ হিপ জয়েন্ট প্রতিস্থাপন।', 'SERVICES', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'SUCCESS_STORIES.STORIES.SARAH.QUOTE', 'আমি ভাবিনি যে আমি আবার দৌড়াতে পারব। ডাঃ রহমান আমাকে আমার ক্যারিয়ার ফিরিয়ে দিয়েছেন।', 'SUCCESS_STORIES', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'SUCCESS_STORIES.STORIES.JOHN.QUOTE', 'ব্যথা চলে গেছে। আমি অবশেষে আমার কুকুরের সাথে হাঁটতে পারি এবং অবিরাম অস্বস্তি ছাড়াই জীবন উপভোগ করতে পারি।', 'SUCCESS_STORIES', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(gen_random_uuid(), 'LEGAL.PRIVACY.TEXT1', 'আমরা অর্থোপেডিক যত্ন প্রদান এবং আপনার অ্যাপয়েন্টমেন্ট পরিচালনার জন্য প্রয়োজনীয় ব্যক্তিগত এবং চিকিৎসা তথ্য সংগ্রহ করি।', 'LEGAL', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'LEGAL.TERMS.TEXT1', 'আমাদের পরিষেবা ব্যবহার করে, আপনি আমাদের ক্লিনিক প্রোটোকল এবং অ্যাপয়েন্টমেন্ট বাতিলের নীতিগুলো অনুসরণ করতে সম্মত হন।', 'LEGAL', true, 'BN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (key, lang) DO NOTHING;
