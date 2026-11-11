import React from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Layers, 
  FileCheck2, 
  BookMarked 
} from 'lucide-react';

export default function Hero({ totalTopics, totalCategories, totalGuidelines }) {
  return (
    <section className="judicial-hero-rich">
      {/* Visual Rich SVG Background (Judicial Court Hall & Islamic Arabesque Geometry) */}
      <div className="judicial-hero-rich__bg-layer" aria-hidden="true">
        <svg 
          className="judicial-hero-rich__svg"
          viewBox="0 0 1440 480" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Rich Radial Gradient */}
            <radialGradient id="heroGlow" cx="50%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#0E5848" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#073B30" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#04201A" stopOpacity="1" />
            </radialGradient>

            {/* Subtle Luxury Arabesque Pattern */}
            <pattern id="arabesqueGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path 
                d="M30 0 L60 30 L30 60 L0 30 Z" 
                fill="none" 
                stroke="#C5A059" 
                strokeWidth="0.8" 
                strokeOpacity="0.12" 
              />
              <circle cx="30" cy="30" r="10" fill="none" stroke="#C5A059" strokeWidth="0.6" strokeOpacity="0.1" />
              <path d="M0 0 L60 60 M60 0 L0 60" stroke="#C5A059" strokeWidth="0.4" strokeOpacity="0.08" />
            </pattern>

            {/* Glowing Accent Gradient */}
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D77F" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#C5A059" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#073B30" stopOpacity="0" />
            </linearGradient>

            {/* 3D Soft Shadow Filter */}
            <filter id="heroShadow3d" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Base Color Fill */}
          <rect width="1440" height="480" fill="url(#heroGlow)" />
          {/* Geometric Pattern Overlay */}
          <rect width="1440" height="480" fill="url(#arabesqueGrid)" />

          {/* Abstract Modern Judicial Emblems & Beams */}
          <circle cx="720" cy="180" r="280" fill="url(#goldAccent)" filter="blur(40px)" />
          
          {/* Subtle Judicial Scales Watermark Outline in the Center Background */}
          <g opacity="0.08" transform="translate(620, 50) scale(1.7)" stroke="#FFFFFF" strokeWidth="2" fill="none">
            <path d="M50 10 L50 90 M20 90 L80 90 M10 30 L90 30 M10 30 L0 65 Q25 80 50 65 L40 30 M90 30 L100 65 Q75 80 50 65 L60 30" />
            <circle cx="50" cy="10" r="6" fill="#C5A059" />
          </g>

          {/* Left Decorative Micro-Graphics: Isometric Shield & Legal Nodes */}
          <g opacity="0.18" transform="translate(100, 120)">
            <circle cx="50" cy="50" r="60" stroke="#C5A059" strokeWidth="1" strokeDasharray="6 4" />
            <path d="M50 20 L80 35 V65 C80 85 50 100 50 100 C50 100 20 85 20 65 V35 L50 20 Z" stroke="#F5D77F" strokeWidth="1.8" fill="rgba(197, 160, 89, 0.05)" />
            <circle cx="50" cy="55" r="8" fill="#C5A059" />
          </g>

          {/* Right Decorative Micro-Graphics: Judicial Decree & Geometry */}
          <g opacity="0.18" transform="translate(1220, 130)">
            <circle cx="50" cy="50" r="60" stroke="#C5A059" strokeWidth="1" strokeDasharray="4 4" />
            <rect x="25" y="20" width="50" height="65" rx="6" stroke="#F5D77F" strokeWidth="1.8" fill="rgba(197, 160, 89, 0.05)" />
            <line x1="35" y1="35" x2="65" y2="35" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="35" y1="47" x2="60" y2="47" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="35" y1="59" x2="52" y2="59" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="62" cy="65" r="7" fill="#C5A059" />
          </g>

          {/* Subtle Ambient Curved Waves */}
          <path 
            d="M0 420 C360 370 720 460 1080 390 C1260 355 1380 430 1440 450 L1440 480 L0 480 Z" 
            fill="#06221B" 
            fillOpacity="0.5" 
          />
        </svg>
      </div>

      <div className="legal-container judicial-hero-rich__content">
        
        {/* Official Judicial Badge */}
        <div className="judicial-hero-rich__pill">
          <ShieldCheck size={16} className="text-gold" />
          <span>النيابة العامة المصرية • استئناف القاهرة • محكمة القاهرة الاقتصادية</span>
        </div>

        {/* Hero Title */}
        <h1 className="judicial-hero-rich__title">
          دليل القيود والأوصاف النموذجية للجنح الاقتصادية
        </h1>

        {/* Subtitle with Circular Reference */}
        <p className="judicial-hero-rich__subtitle">
          المنظومة القضائية المعتمدة لتيسير مراجعة وتدقيق قيود وأوصاف الجنح المحالة من النيابات الكلية، 
          طبقاً لأحكام <strong className="text-gold-light">الكتاب الدوري رقم 1404 لسنة 2024</strong> الصادر عن معالي المستشار النائب العام.
        </p>

        {/* Quick Highlights Grid */}
        <div className="judicial-hero-rich__stats">
          <div className="judicial-hero-stat">
            <div className="judicial-hero-stat__icon">
              <Scale size={22} />
            </div>
            <div className="judicial-hero-stat__info">
              <div className="judicial-hero-stat__value">{totalTopics} نموذجاً</div>
              <div className="judicial-hero-stat__label">قيود وأوصاف معتمدة</div>
            </div>
          </div>

          <div className="judicial-hero-stat">
            <div className="judicial-hero-stat__icon">
              <Layers size={22} />
            </div>
            <div className="judicial-hero-stat__info">
              <div className="judicial-hero-stat__value">{totalCategories} أقسام تخصصية</div>
              <div className="judicial-hero-stat__label">تصنيفات نوعية شاملة</div>
            </div>
          </div>

          <div className="judicial-hero-stat">
            <div className="judicial-hero-stat__icon">
              <BookMarked size={22} />
            </div>
            <div className="judicial-hero-stat__info">
              <div className="judicial-hero-stat__value">{totalGuidelines} تعليمات دورية</div>
              <div className="judicial-hero-stat__label">ضوابط وتحذيرات قانونية</div>
            </div>
          </div>

          <div className="judicial-hero-stat">
            <div className="judicial-hero-stat__icon">
              <FileCheck2 size={22} />
            </div>
            <div className="judicial-hero-stat__info">
              <div className="judicial-hero-stat__value">100% دقة تشريعية</div>
              <div className="judicial-hero-stat__label">جاهزة للنسخ والإحالة</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
