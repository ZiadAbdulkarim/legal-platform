import React, { useState } from 'react';
import { 
  Scale, 
  Bookmark, 
  BookOpen, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Printer, 
  FileText,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  favoritesCount, 
  topicsCount, 
  guidelinesCount, 
  darkMode, 
  toggleTheme,
  onPrintAll
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <header className="judicial-navbar">
      <div className="legal-container judicial-navbar__container">
        
        {/* Brand & Identity */}
        <div className="judicial-navbar__brand" onClick={() => handleNavClick('all')}>
          <div className="judicial-navbar__logo-box">
            <Scale className="judicial-navbar__logo-icon" size={26} strokeWidth={2.2} />
          </div>
          <div className="judicial-navbar__titles">
            <div className="judicial-navbar__title-main">
              دليل القيود والأوصاف القضائية
            </div>
            <div className="judicial-navbar__title-sub">
              النيابة العامة • المحكمة الاقتصادية
            </div>
          </div>
        </div>

        {/* Circular Badge */}
        <div className="judicial-navbar__badge d-none-mobile">
          <FileText size={15} />
          <span>الكتاب الدوري رقم 1404 لسنة 2024</span>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="judicial-navbar__nav d-none-mobile">
          <button 
            type="button"
            className={`judicial-nav-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleNavClick('all')}
          >
            <Scale size={18} />
            <span>جميع القيود</span>
            <span className="judicial-nav-tab__pill">{topicsCount}</span>
          </button>

          <button 
            type="button"
            className={`judicial-nav-tab ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => handleNavClick('favorites')}
          >
            <Bookmark size={18} />
            <span>المفضلة</span>
            {favoritesCount > 0 && (
              <span className="judicial-nav-tab__pill judicial-nav-tab__pill--gold">
                {favoritesCount}
              </span>
            )}
          </button>

          <button 
            type="button"
            className={`judicial-nav-tab ${activeTab === 'guidelines' ? 'active' : ''}`}
            onClick={() => handleNavClick('guidelines')}
          >
            <BookOpen size={18} />
            <span>الكتب الدورية والتعليمات</span>
            <span className="judicial-nav-tab__pill">{guidelinesCount}</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="judicial-navbar__actions">
          {/* Quick Print Button */}
          <button 
            type="button"
            className="judicial-icon-btn d-none-mobile"
            title="طباعة التقرير / تصدير PDF"
            onClick={onPrintAll}
          >
            <Printer size={19} />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button 
            type="button"
            className="judicial-icon-btn theme-toggle-btn"
            title={darkMode ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={19} className="icon-sun" /> : <Moon size={19} className="icon-moon" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button 
            type="button"
            className="judicial-icon-btn d-lg-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="judicial-mobile-drawer">
          <div className="judicial-mobile-drawer__links">
            <button 
              type="button"
              className={`judicial-mobile-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => handleNavClick('all')}
            >
              <div className="d-flex align-items-center gap-2">
                <Scale size={20} />
                <span>جميع القيود والأوصاف</span>
              </div>
              <span className="judicial-nav-tab__pill">{topicsCount}</span>
            </button>

            <button 
              type="button"
              className={`judicial-mobile-tab ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => handleNavClick('favorites')}
            >
              <div className="d-flex align-items-center gap-2">
                <Bookmark size={20} />
                <span>المفضلة القضائية</span>
              </div>
              <span className="judicial-nav-tab__pill judicial-nav-tab__pill--gold">{favoritesCount}</span>
            </button>

            <button 
              type="button"
              className={`judicial-mobile-tab ${activeTab === 'guidelines' ? 'active' : ''}`}
              onClick={() => handleNavClick('guidelines')}
            >
              <div className="d-flex align-items-center gap-2">
                <BookOpen size={20} />
                <span>الكتب الدورية والتعليمات</span>
              </div>
              <span className="judicial-nav-tab__pill">{guidelinesCount}</span>
            </button>

            <button 
              type="button"
              className="judicial-mobile-tab judicial-mobile-tab--print"
              onClick={() => {
                setMobileMenuOpen(false);
                onPrintAll();
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <Printer size={20} />
                <span>طباعة الصفحة / تصدير PDF</span>
              </div>
            </button>
          </div>
          <div className="judicial-mobile-drawer__footer">
            <ShieldCheck size={16} />
            <span>الكتاب الدوري رقم 1404 لسنة 2024 • النيابة العامة</span>
          </div>
        </div>
      )}
    </header>
  );
}

