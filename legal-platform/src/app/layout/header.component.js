/**
 * Official Judicial Header & Navigation Component
 * Features:
 * - Brand Title & Official Eagle Crest Logo
 * - Interactive Light / Dark Mode Toggle Button (persisted in localStorage)
 * - Quick Navigation Bar with dynamic Favorites Counter badge
 * - "Agent Setup" card permanently removed as requested
 */

import { StorageService } from '../core/storage.service.js';

export class HeaderComponent {
  constructor({ onNavigate, currentRoute = 'home' }) {
    this.onNavigate = onNavigate;
    this.currentRoute = currentRoute;
    this.favoritesCount = StorageService.getFavoritesCount();
    this.theme = localStorage.getItem('judicial_theme_mode') || 'light';

    window.addEventListener('favorites-updated', (e) => {
      this.favoritesCount = e.detail.count;
      this.updateFavoritesBadge();
    });

    window.addEventListener('theme-changed', (e) => {
      this.theme = e.detail.theme;
      this.updateThemeButtonVisual();
    });
  }

  render() {
    const headerEl = document.createElement('header');
    headerEl.className = 'judicial-header-wrapper';
    headerEl.innerHTML = `
      <!-- Top Official Ribbon -->
      <div class="judicial-top-ribbon">
        <div class="legal-container judicial-top-ribbon__inner">
          <div class="judicial-jurisdiction-tag">
            <span class="emblem-dot"></span>
            <span>جمهورية مصر العربية – النيابة العامة – مكتب السيد المستشار النائب العام</span>
            <span class="ribbon-sep">|</span>
            <span class="gold-text">الكتاب الدوري رقم 1404 لسنة 2024</span>
          </div>
          <div class="judicial-system-status">
            <span class="status-indicator"></span>
            <span>النظام القضائي المعتمد لإحالات المحكمة الاقتصادية</span>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <div class="judicial-main-header">
        <div class="legal-container judicial-main-header__inner">
          
          <!-- Brand Identity -->
          <div class="judicial-brand">
            <div class="judicial-brand__emblem-wrap">
              <svg class="judicial-eagle-svg" viewBox="0 0 100 100" width="50" height="50">
                <circle cx="50" cy="50" r="48" fill="#0A352B" stroke="#B89047" stroke-width="2.5"/>
                <line x1="50" y1="20" x2="50" y2="76" stroke="#D8B775" stroke-width="3" stroke-linecap="round"/>
                <line x1="26" y1="34" x2="74" y2="34" stroke="#D8B775" stroke-width="3" stroke-linecap="round"/>
                <circle cx="50" cy="20" r="4" fill="#B89047"/>
                <circle cx="50" cy="77" r="5" fill="#B89047"/>
                <line x1="26" y1="34" x2="20" y2="52" stroke="#EFE3C6" stroke-width="1.2"/>
                <line x1="26" y1="34" x2="32" y2="52" stroke="#EFE3C6" stroke-width="1.2"/>
                <path d="M18 52 C20 58, 32 58, 34 52 Z" fill="#D8B775"/>
                <line x1="74" y1="34" x2="68" y2="52" stroke="#EFE3C6" stroke-width="1.2"/>
                <line x1="74" y1="34" x2="80" y2="52" stroke="#EFE3C6" stroke-width="1.2"/>
                <path d="M66 52 C68 58, 80 58, 82 52 Z" fill="#D8B775"/>
              </svg>
            </div>
            <div class="judicial-brand__titles">
              <h1 class="judicial-brand__title">دليل القيود والأوصاف القضائية</h1>
              <div class="judicial-brand__sub">
                <span class="court-badge">النيابة العامة المصرية</span>
                <span class="sep">❖</span>
                <span>محكمة القاهرة الاقتصادية – دوائر الجنح المستأنفة والابتدائية</span>
              </div>
            </div>
          </div>

          <!-- Header Actions: Dark Mode Switcher -->
          <div class="header-actions-group">
            <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="تبديل الوضع الليلي والنهاري" title="تبديل الوضع الليلي / النهاري">
              <span class="theme-icon" id="theme-icon-container">
                ${this.getThemeIconSvg()}
              </span>
              <span id="theme-label-text">${this.theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Navigation Bar -->
      <nav class="judicial-navbar" aria-label="التنقل القضائي السريع">
        <div class="legal-container judicial-navbar__inner">
          <ul class="judicial-nav-list">
            <li class="judicial-nav-item">
              <button class="judicial-nav-link ${this.currentRoute === 'home' ? 'active' : ''}" data-route="home">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span>الرئيسية (كافة القيود والأوصاف)</span>
              </button>
            </li>
            <li class="judicial-nav-item">
              <button class="judicial-nav-link ${this.currentRoute === 'favorites' ? 'active' : ''}" data-route="favorites">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#B89047" stroke="#B89047" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>مفضلتي القضائية</span>
                <span class="nav-counter-badge" id="nav-fav-badge">${this.favoritesCount}</span>
              </button>
            </li>
            <li class="judicial-nav-item">
              <button class="judicial-nav-link ${this.currentRoute === 'instructions' ? 'active' : ''}" data-route="instructions">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span>التعليمات والكتب الدورية (1404/2024)</span>
              </button>
            </li>
            <li class="judicial-nav-item">
              <button class="judicial-nav-link ${this.currentRoute === 'search' ? 'active' : ''}" data-route="search">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span>محرك البحث المتقدم</span>
              </button>
            </li>
          </ul>

          <div class="judicial-nav-extra">
            <span class="official-seal-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B89047" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              صيغ معتمدة للتحقيق
            </span>
          </div>
        </div>
      </nav>
    `;

    this.attachEvents(headerEl);
    return headerEl;
  }

  getThemeIconSvg() {
    if (this.theme === 'dark') {
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FDE047" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    } else {
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#EFE3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  attachEvents(el) {
    el.querySelectorAll('.judicial-nav-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const route = btn.getAttribute('data-route');
        el.querySelectorAll('.judicial-nav-link').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentRoute = route;
        if (this.onNavigate) this.onNavigate(route);
      });
    });

    const themeBtn = el.querySelector('#theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.theme = nextTheme;
        localStorage.setItem('judicial_theme_mode', nextTheme);
        if (nextTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          document.body.classList.add('dark-mode');
        } else {
          document.documentElement.removeAttribute('data-theme');
          document.body.classList.remove('dark-mode');
        }
        window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: nextTheme } }));
      });
    }
  }

  updateThemeButtonVisual() {
    const iconContainer = document.getElementById('theme-icon-container');
    const labelText = document.getElementById('theme-label-text');
    if (iconContainer) iconContainer.innerHTML = this.getThemeIconSvg();
    if (labelText) labelText.textContent = this.theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي';
  }

  updateFavoritesBadge() {
    const badge = document.getElementById('nav-fav-badge');
    if (badge) {
      badge.textContent = this.favoritesCount;
      badge.classList.remove('pulse');
      void badge.offsetWidth;
      badge.classList.add('pulse');
    }
  }
}
