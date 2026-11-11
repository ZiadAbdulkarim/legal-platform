import React from 'react';
import { Scale, ArrowUp, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="judicial-footer-rich">
      <div className="legal-container">
        
        {/* Top Section */}
        <div className="judicial-footer-rich__top">
          <div className="judicial-footer-rich__brand">
            <div className="judicial-footer-rich__logo-box">
              <Scale size={24} />
            </div>
            <div>
              <div className="judicial-footer-rich__brand-title">
                منصة القيود والأوصاف القضائية – المحكمة الاقتصادية
              </div>
              <div className="judicial-footer-rich__brand-sub">
                المنظومة المعتمدة طبقاً للكتاب الدوري رقم 1404 لسنة 2024 الصادر عن معالي المستشار النائب العام
              </div>
            </div>
          </div>

          <button 
            type="button" 
            className="judicial-footer-rich__scroll-top"
            onClick={scrollToTop}
            title="العودة لأعلى الصفحة"
          >
            <span>العودة للأعلى</span>
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Official Credits Highlight Card */}
        <div className="judicial-credits-banner">
          <div className="judicial-credits-banner__col">
            <div className="judicial-credit-role">إعداد النص والمحتوى القانوني:</div>
            <div className="judicial-credit-name">
              السيد الأستاذ / هشام أيمن عيسى – وكيل النائب العام
            </div>
          </div>

          <div className="judicial-credits-banner__divider" />

          {/* Developer Dedication Section with 3D Gift & Portfolio Link */}
          <div className="judicial-credits-banner__col judicial-credits-banner__col--dev">
            <div className="judicial-credit-role">
              إهداء وتطوير:
            </div>
            <div className="judicial-credit-name">
              <a 
                href="https://ziadabdulkarim.github.io/Portfolio/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="judicial-dev-link"
                title="المعرض الشخصي للمهندس زياد عبد الكريم"
              >
                <span>المهندس / زياد عبد الكريم</span>
                <span className="judicial-dev-gift-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="giftBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDE68A" />
                        <stop offset="50%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#926714" />
                      </linearGradient>
                      <linearGradient id="giftRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#E2E8F0" />
                      </linearGradient>
                    </defs>
                    <path d="M20 12v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9" stroke="url(#giftBoxGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="3" y="7" width="18" height="5" rx="1.5" fill="rgba(212, 175, 55, 0.2)" stroke="url(#giftBoxGrad)" strokeWidth="1.8" />
                    <line x1="12" y1="7" x2="12" y2="22" stroke="url(#giftBoxGrad)" strokeWidth="1.8" />
                    <path d="M12 7H8a2 2 0 0 1 0-4c2.5 0 4 4 4 4z" stroke="url(#giftRibbon)" strokeWidth="1.6" fill="rgba(255,255,255,0.2)" />
                    <path d="M12 7h4a2 2 0 0 0 0-4c-2.5 0-4 4-4 4z" stroke="url(#giftRibbon)" strokeWidth="1.6" fill="rgba(255,255,255,0.2)" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers */}
        <div className="judicial-footer-rich__bottom">
          <div className="judicial-footer-rich__copy">
            جميع الحقوق محفوظة © {new Date().getFullYear()} • النيابة العامة المصرية • دائرة استئناف القاهرة
          </div>
          <div className="judicial-footer-rich__security">
            <ShieldCheck size={16} className="text-gold" />
            <span>نظام إلكتروني مهيأ للعمل المكتبي الكامل دون الحاجة للاتصال بالإنترنت</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
