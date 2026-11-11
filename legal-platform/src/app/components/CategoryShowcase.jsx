import React from 'react';
import { 
  ArrowLeft, 
  Check, 
  Gavel, 
  CreditCard, 
  ShieldCheck, 
  FileSignature, 
  BookOpen 
} from 'lucide-react';

// Custom Rich Vector Illustration Banners for each category with 3D-Style Accents
function DefamationBanner() {
  return (
    <svg className="category-card-visual__svg" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="defamBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B4034" />
          <stop offset="100%" stopColor="#04201A" />
        </linearGradient>
        <linearGradient id="defamGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#926714" />
        </linearGradient>
        <linearGradient id="bubble3d" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1B7A65" />
          <stop offset="100%" stopColor="#0D4B3D" />
        </linearGradient>
        <filter id="shadow3d1" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>
      <rect width="320" height="140" rx="12" fill="url(#defamBg)" />
      {/* Background waveform circles */}
      <circle cx="260" cy="70" r="50" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.15" />
      <circle cx="260" cy="70" r="35" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="260" cy="70" r="20" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.25" />
      
      {/* Chat bubble 1 with 3D Shadow */}
      <g filter="url(#shadow3d1)">
        <rect x="30" y="28" width="130" height="42" rx="10" fill="url(#bubble3d)" stroke="#239882" strokeWidth="1.5" />
        <path d="M45 70 L40 80 L55 70 Z" fill="#0D4B3D" />
        <rect x="45" y="42" width="70" height="4" rx="2" fill="#E2E8F0" fillOpacity="0.7" />
        <rect x="45" y="52" width="45" height="4" rx="2" fill="url(#defamGold)" />
      </g>
      
      {/* Chat bubble 2 (response) */}
      <g filter="url(#shadow3d1)">
        <rect x="85" y="65" width="125" height="40" rx="10" fill="#144C3F" stroke="#256B5A" strokeWidth="1.5" />
        <path d="M195 105 L205 115 L190 105 Z" fill="#144C3F" />
        <rect x="100" y="78" width="65" height="4" rx="2" fill="#E2E8F0" fillOpacity="0.5" />
        <rect x="100" y="88" width="40" height="4" rx="2" fill="#E2E8F0" fillOpacity="0.3" />
      </g>

      {/* Privacy Speech Lock Centerpiece (3D Isometric Bevel) */}
      <g transform="translate(235, 45)" filter="url(#shadow3d1)">
        <circle cx="25" cy="25" r="26" fill="#082A22" stroke="url(#defamGold)" strokeWidth="2.2" />
        <rect x="16" y="21" width="18" height="15" rx="3" fill="url(#defamGold)" />
        <path d="M19 21 V16 C19 12.8 21.5 10.5 25 10.5 C28.5 10.5 31 12.8 31 16 V21" stroke="url(#defamGold)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="25" cy="27" r="2" fill="#04201A" />
      </g>
    </svg>
  );
}

function BankingBanner() {
  return (
    <svg className="category-card-visual__svg" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bankBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B374A" />
          <stop offset="100%" stopColor="#051C26" />
        </linearGradient>
        <linearGradient id="cardGrad3d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#256275" />
          <stop offset="60%" stopColor="#144453" />
          <stop offset="100%" stopColor="#0A252E" />
        </linearGradient>
        <linearGradient id="goldChip3d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="40%" stopColor="#E5C158" />
          <stop offset="100%" stopColor="#8C6510" />
        </linearGradient>
        <filter id="shadow3d2" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
      <rect width="320" height="140" rx="12" fill="url(#bankBg)" />
      {/* Decorative Vault Ring */}
      <circle cx="250" cy="70" r="46" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.35" />
      <circle cx="250" cy="70" r="28" fill="#07222F" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
      
      {/* 3D Tilted Credit Card */}
      <g transform="translate(28, 22) rotate(-3)" filter="url(#shadow3d2)">
        <rect width="172" height="96" rx="11" fill="url(#cardGrad3d)" stroke="#4E99B0" strokeWidth="1.5" />
        {/* Card Gold EMV Chip with 3D Bevel */}
        <rect x="20" y="22" width="28" height="22" rx="3.5" fill="url(#goldChip3d)" stroke="#FDE68A" strokeWidth="0.8" />
        <path d="M20 33 H48 M34 22 V44" stroke="#684705" strokeWidth="0.8" />
        {/* Contactless Waves */}
        <path d="M56 26 Q60 33 56 40 M61 22 Q67 33 61 44" stroke="#F5D77F" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Card Details */}
        <circle cx="24" cy="60" r="2.2" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="32" cy="60" r="2.2" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="40" cy="60" r="2.2" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="48" cy="60" r="2.2" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="62" y="58" width="34" height="4.5" rx="2" fill="#FFFFFF" fillOpacity="0.75" />
        <rect x="20" y="74" width="48" height="4.5" rx="2" fill="#D4AF37" fillOpacity="0.9" />
      </g>

      {/* 3D Vault Security Shield */}
      <g transform="translate(234, 54)" filter="url(#shadow3d2)">
        <circle cx="16" cy="16" r="16" fill="#0D3B4C" stroke="#D4AF37" strokeWidth="1.8" />
        <path d="M16 7 L23 10.5 V17.5 C23 22 16 25.5 16 25.5 C16 25.5 9 22 9 17.5 V10.5 L16 7 Z" fill="#D4AF37" />
      </g>
    </svg>
  );
}

function CybercrimeBanner() {
  return (
    <svg className="category-card-visual__svg" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyberBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#111B38" />
          <stop offset="100%" stopColor="#070B18" />
        </linearGradient>
        <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="goldCyber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#C5A059" />
        </linearGradient>
        <filter id="shadow3d3" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0284C7" floodOpacity="0.3" />
        </filter>
      </defs>
      <rect width="320" height="140" rx="12" fill="url(#cyberBg)" />
      {/* Circuit Grid Lines */}
      <path d="M10 70 H90 L110 40 H160 M120 70 H180 L200 100 H260" stroke="#0284C7" strokeWidth="1.2" strokeOpacity="0.35" fill="none" />
      <circle cx="90" cy="70" r="3.5" fill="#38BDF8" fillOpacity="0.8" />
      <circle cx="160" cy="40" r="3.5" fill="#38BDF8" fillOpacity="0.8" />
      <circle cx="200" cy="100" r="3.5" fill="#38BDF8" fillOpacity="0.8" />
      
      {/* 3D Cyber Shield with Keyhole & Fingerprint scan */}
      <g transform="translate(188, 16)" filter="url(#shadow3d3)">
        <path d="M48 8 L90 24 V62 C90 88 48 110 48 110 C48 110 6 88 6 62 V24 L48 8 Z" fill="#15264F" stroke="#38BDF8" strokeWidth="2.2" />
        {/* Inner Shield */}
        <path d="M48 18 L80 31 V60 C80 80 48 97 48 97 C48 97 16 80 16 60 V31 L48 18 Z" fill="#0C152B" stroke="url(#goldCyber)" strokeWidth="1.8" />
        {/* Fingerprint / Privacy Nodes */}
        <circle cx="48" cy="52" r="11" stroke="#38BDF8" strokeWidth="1.8" strokeDasharray="3 3" fill="none" />
        <circle cx="48" cy="52" r="5.5" fill="url(#goldCyber)" />
        <path d="M48 58 V70 M43 70 H53" stroke="url(#goldCyber)" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      
      {/* Data packet tags with 3D Depth */}
      <g filter="url(#shadow3d3)">
        <rect x="28" y="34" width="84" height="25" rx="6" fill="#15264F" stroke="#1E3A75" strokeWidth="1.2" />
        <text x="36" y="51" fill="#38BDF8" fontSize="11" fontFamily="monospace" fontWeight="700">IP://SECURE</text>
        <rect x="48" y="80" width="96" height="25" rx="6" fill="#15264F" stroke="#1E3A75" strokeWidth="1.2" />
        <text x="56" y="97" fill="#F5D77F" fontSize="11" fontFamily="monospace" fontWeight="700">ENCRYPT:AES</text>
      </g>
    </svg>
  );
}

function FinancingBanner() {
  return (
    <svg className="category-card-visual__svg" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="finBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A2F" />
          <stop offset="100%" stopColor="#0B1A14" />
        </linearGradient>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="goldWax3d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6510" />
        </linearGradient>
        <filter id="shadow3d4" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>
      <rect width="320" height="140" rx="12" fill="url(#finBg)" />
      
      {/* 3D Legal Contract Document */}
      <g transform="translate(42, 12)" filter="url(#shadow3d4)">
        <rect width="94" height="114" rx="7" fill="url(#docGrad)" stroke="#C5A059" strokeWidth="1.6" />
        {/* Document Header lines */}
        <rect x="15" y="15" width="64" height="6.5" rx="2" fill="#0A3E32" />
        <rect x="15" y="28" width="52" height="3" rx="1.5" fill="#64748B" />
        <rect x="15" y="36" width="58" height="3" rx="1.5" fill="#64748B" />
        <rect x="15" y="44" width="46" height="3" rx="1.5" fill="#64748B" />
        {/* Signature flourish */}
        <path d="M15 76 Q26 66 36 76 T58 72" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="15" y1="84" x2="68" y2="84" stroke="#94A3B8" strokeWidth="1.2" />
        {/* Gold Legal Stamp / Wax Seal 3D */}
        <circle cx="70" cy="90" r="15" fill="url(#goldWax3d)" stroke="#78530B" strokeWidth="1.2" />
        <circle cx="70" cy="90" r="11" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
      </g>

      {/* Financial Currency / Balance symbol */}
      <g transform="translate(195, 30)" filter="url(#shadow3d4)">
        <circle cx="45" cy="40" r="38" fill="#143126" stroke="#C5A059" strokeWidth="1.8" strokeDasharray="4 2" />
        {/* 3D Scales / Coin Stack */}
        <rect x="25" y="52" width="40" height="7" rx="2" fill="url(#goldWax3d)" />
        <rect x="30" y="44" width="30" height="7" rx="2" fill="url(#goldWax3d)" fillOpacity="0.85" />
        <rect x="35" y="36" width="20" height="7" rx="2" fill="url(#goldWax3d)" fillOpacity="0.7" />
        <path d="M45 18 V34" stroke="#FDE68A" strokeWidth="2.2" />
      </g>
    </svg>
  );
}

function GuidelinesBanner() {
  return (
    <svg className="category-card-visual__svg" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="guideBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E1C07" />
          <stop offset="100%" stopColor="#150D03" />
        </linearGradient>
        <linearGradient id="goldPure" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B4821E" />
        </linearGradient>
        <filter id="shadow3d5" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.55" />
        </filter>
      </defs>
      <rect width="320" height="140" rx="12" fill="url(#guideBg)" />
      
      {/* Laurel Wreath / Scales Emblem with 3D Depth */}
      <g transform="translate(160, 70)" filter="url(#shadow3d5)">
        <circle cx="0" cy="0" r="52" stroke="url(#goldPure)" strokeWidth="1.8" strokeDasharray="5 3" strokeOpacity="0.45" />
        <circle cx="0" cy="0" r="38" fill="#201303" stroke="url(#goldPure)" strokeWidth="2.2" />
        {/* Classical Scales of Justice with 3D Accents */}
        <path d="M0 -24 V18 M-14 18 H14 M-22 -10 H22 M-22 -10 L-28 6 Q-18 13 -8 6 L-14 -10 M22 -10 L28 6 Q18 13 8 6 L14 -10" stroke="url(#goldPure)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="0" cy="-24" r="3.5" fill="url(#goldPure)" />
      </g>

      {/* Official Circular Scroll Banner */}
      <g transform="translate(28, 42)" filter="url(#shadow3d5)">
        <rect width="90" height="54" rx="7" fill="#3D280B" stroke="url(#goldPure)" strokeWidth="1.5" />
        <text x="14" y="25" fill="#FDE68A" fontSize="11" fontWeight="800" fontFamily="sans-serif">الكتاب الدوري</text>
        <text x="16" y="42" fill="#E2E8F0" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">1404 لسنة 2024</text>
      </g>
    </svg>
  );
}

export default function CategoryShowcase({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  onGoToGuidelines,
  activeTab
}) {
  const getBanner = (id) => {
    switch (id) {
      case 'defamation-harassment':
        return <DefamationBanner />;
      case 'fraud-banking-crimes':
        return <BankingBanner />;
      case 'cybercrimes-privacy':
        return <CybercrimeBanner />;
      case 'financing-crimes':
        return <FinancingBanner />;
      default:
        return <DefamationBanner />;
    }
  };

  const getLucideIcon = (id) => {
    switch (id) {
      case 'defamation-harassment':
        return <Gavel size={20} />;
      case 'fraud-banking-crimes':
        return <CreditCard size={20} />;
      case 'cybercrimes-privacy':
        return <ShieldCheck size={20} />;
      case 'financing-crimes':
        return <FileSignature size={20} />;
      default:
        return <BookOpen size={20} />;
    }
  };

  return (
    <section className="judicial-category-showcase">
      <div className="legal-container">
        
        {/* Section Header with Decorative Micro-Graphic Accent */}
        <div className="judicial-section-head">
          <div className="judicial-section-head__badge">
            <span className="judicial-head-badge-dot" />
            <span>التصنيفات القضائية المعتمدة</span>
          </div>
          <h2 className="judicial-section-head__title">
            القطاعات والدوائر النوعية للجنح الاقتصادية
          </h2>
          <p className="judicial-section-head__desc">
            اختر أحد الأقسام التخصصية لاستعراض الصيغ النموذجية المعتمدة لمذكرات الإحالة وتقرير القيد والوصف
          </p>
        </div>

        {/* 5 Rich Visual Cards Grid */}
        <div className="judicial-category-grid">
          {categories.map((cat) => {
            const isSelected = activeTab === 'all' && selectedCategory === cat.id;

            return (
              <div 
                key={cat.id}
                className={`category-rich-card ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
                role="button"
                tabIndex={0}
              >
                {/* Visual Thumbnail Banner */}
                <div className="category-rich-card__visual">
                  {getBanner(cat.id)}
                  <div className="category-rich-card__code-badge">{cat.code}</div>
                  <div className="category-rich-card__count-pill">
                    {cat.topics_count} قضايا نموذجية
                  </div>
                </div>

                {/* Card Body */}
                <div className="category-rich-card__body">
                  <div className="category-rich-card__icon-header">
                    <div className="category-rich-card__icon-circle">
                      {getLucideIcon(cat.id)}
                    </div>
                    <span className="category-rich-card__sub-en">{cat.title_en}</span>
                  </div>

                  <h3 className="category-rich-card__title">{cat.title}</h3>
                  <p className="category-rich-card__desc">{cat.description}</p>

                  {/* Laws referenced tags */}
                  <div className="category-rich-card__laws">
                    {cat.laws_referenced.slice(0, 2).map((law, idx) => (
                      <span key={idx} className="category-rich-card__law-tag">
                        {law}
                      </span>
                    ))}
                    {cat.laws_referenced.length > 2 && (
                      <span className="category-rich-card__law-tag category-rich-card__law-tag--more">
                        +{cat.laws_referenced.length - 2} قوانين أخرى
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="category-rich-card__footer">
                  <span className="category-rich-card__action-text">
                    {isSelected ? 'القسم معروض حالياً' : 'تصفح قيود وأوصاف هذا القسم'}
                  </span>
                  <div className="category-rich-card__arrow">
                    {isSelected ? <Check size={16} /> : <ArrowLeft size={16} />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 5th Card: Guidelines & Circular Directives */}
          <div 
            className={`category-rich-card category-rich-card--guidelines ${activeTab === 'guidelines' ? 'active' : ''}`}
            onClick={onGoToGuidelines}
            role="button"
            tabIndex={0}
          >
            <div className="category-rich-card__visual">
              <GuidelinesBanner />
              <div className="category-rich-card__code-badge">DOC-1404</div>
              <div className="category-rich-card__count-pill">5 تعليمات وضوابط</div>
            </div>

            <div className="category-rich-card__body">
              <div className="category-rich-card__icon-header">
                <div className="category-rich-card__icon-circle">
                  <BookOpen size={20} />
                </div>
                <span className="category-rich-card__sub-en">Judicial Circular & Directives</span>
              </div>

              <h3 className="category-rich-card__title">
                التعليمات والكتب الدورية والتنبيهات القضائية
              </h3>
              <p className="category-rich-card__desc">
                ضوابط التحقيق والإحالة، والتمييز بين النصوص التشريعية المتداخلة، وتطبيق أحكام الكتاب الدوري 1404 لسنة 2024.
              </p>

              <div className="category-rich-card__laws">
                <span className="category-rich-card__law-tag">الكتاب الدوري 1404/2024</span>
                <span className="category-rich-card__law-tag">ضوابط المادة 18 و 24 و 25</span>
              </div>
            </div>

            <div className="category-rich-card__footer">
              <span className="category-rich-card__action-text">
                {activeTab === 'guidelines' ? 'القسم معروض حالياً' : 'استعراض التعليمات والكتب الدورية'}
              </span>
              <div className="category-rich-card__arrow">
                {activeTab === 'guidelines' ? <Check size={16} /> : <ArrowLeft size={16} />}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
