/**
 * Judicial Home Page Component (HomeView)
 * Overhauled Minimalist Layout:
 * - Minimalist Hero Header with Title, Live Search, and Category Filter Pills
 * - Clean 2-Column Card Grid (24px gap, border-radius: 12px)
 * - Narrow sidebar permanently removed
 */

import { DataService } from '../../core/data.service.js';
import { LegalCardComponent } from '../../shared/legal-card.component.js';
import { GuidelineCardComponent } from '../../shared/guideline-card.component.js';

export class HomePage {
  constructor({ onNavigate }) {
    this.onNavigate = onNavigate;
    this.currentQuery = '';
    this.currentCategory = 'all';
    this.cardsGridEl = null;
    this.countPillEl = null;
  }

  render() {
    const pageEl = document.createElement('main');
    pageEl.className = 'judicial-page-home legal-container';

    // 1. Clean Minimalist Hero Header
    const heroHeaderEl = document.createElement('div');
    heroHeaderEl.className = 'minimalist-hero-header';
    heroHeaderEl.innerHTML = `
      <div class="minimalist-hero-header__tag">
        <span>❖ منشور قضائي ملزم – الكتاب الدوري رقم 1404 لسنة 2024</span>
      </div>
      <h2 class="minimalist-hero-header__title">
        قيود وأوصاف الجنح الاقتصادية
      </h2>
      <p class="minimalist-hero-header__desc">
        النماذج الرسمية المعتمدة للإحالة من النيابات الكلية بدائرة استئناف القاهرة إلى محكمة القاهرة الاقتصادية (جرائم الاتصالات، تقنية المعلومات، السب والقذف والتهديد، وعقود التمويل).
      </p>

      <!-- Instant Live Search Bar in Hero Header -->
      <div class="hero-search-wrap">
        <div class="search-input-field">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#114B3E" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            class="judicial-search-input" 
            id="hero-live-search" 
            placeholder="بحث فوري برقم المادة (مثل: 166 مكرر، 25، 336)، أو موضوع الجنحة، أو نصوص الوصف الجنائي..." 
            value="${this.currentQuery}"
            autocomplete="off"
            aria-label="محرك البحث القضائي الفوري"
          />
          <button class="search-clear-btn" id="hero-search-clear" title="مسح البحث" style="display:${this.currentQuery ? 'flex' : 'none'};">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Category Filter Buttons ("Filter Pills") -->
      <div class="hero-filter-pills" id="hero-filter-pills">
        <button class="btn btn--filter ${this.currentCategory === 'all' ? 'active' : ''}" data-category="all">
          كافة القيود (14 نموذجاً)
        </button>
        <button class="btn btn--filter ${this.currentCategory === 'defamation-harassment' ? 'active' : ''}" data-category="defamation-harassment">
          <span>السب والقذف والإزعاج</span>
        </button>
        <button class="btn btn--filter ${this.currentCategory === 'fraud-banking-crimes' ? 'active' : ''}" data-category="fraud-banking-crimes">
          <span>النصب والبطاقات المصرفية</span>
        </button>
        <button class="btn btn--filter ${this.currentCategory === 'cybercrimes-privacy' ? 'active' : ''}" data-category="cybercrimes-privacy">
          <span>تقنية المعلومات والخصوصية</span>
        </button>
        <button class="btn btn--filter ${this.currentCategory === 'financing-crimes' ? 'active' : ''}" data-category="financing-crimes">
          <span>عقود التمويل</span>
        </button>
        <button class="btn btn--filter ${this.currentCategory === 'judicial-notes-circulars' ? 'active' : ''}" data-category="judicial-notes-circulars">
          <span>التعليمات والكتب الدورية (5 ضوابط)</span>
        </button>
      </div>
    `;

    // 2. Cards View Section Bar
    const viewHeaderEl = document.createElement('div');
    viewHeaderEl.className = 'cards-view-header';
    viewHeaderEl.innerHTML = `
      <div class="grid-title-wrap">
        <h3 class="grid-title">نماذج القيود والأوصاف المعتمدة</h3>
        <span class="count-pill" id="grid-count-pill">14 نموذجاً</span>
      </div>
      <div style="font-size:0.85rem; color:#64748B;">
        عرض ثنائي الأعمدة مع هوامش مريحة للعين • جاهزة للنسخ المباشر
      </div>
    `;

    // 3. Modern 2-Column Card Grid (24px gap)
    const gridEl = document.createElement('div');
    gridEl.className = 'judicial-cards-grid-2col';
    gridEl.id = 'judicial-cards-grid-2col';

    pageEl.appendChild(heroHeaderEl);
    pageEl.appendChild(viewHeaderEl);
    pageEl.appendChild(gridEl);

    this.cardsGridEl = gridEl;
    this.countPillEl = viewHeaderEl.querySelector('#grid-count-pill');

    this.attachHeroEvents(heroHeaderEl);
    this.populateCards(DataService.getTopics());

    return pageEl;
  }

  attachHeroEvents(headerEl) {
    const searchInput = headerEl.querySelector('#hero-live-search');
    const clearBtn = headerEl.querySelector('#hero-search-clear');
    const filterPills = headerEl.querySelectorAll('.hero-filter-pills .btn--filter');

    searchInput.addEventListener('input', () => {
      this.currentQuery = searchInput.value;
      clearBtn.style.display = this.currentQuery ? 'flex' : 'none';
      this.updateCardsGrid();
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      this.currentQuery = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      this.updateCardsGrid();
    });

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCategory = pill.getAttribute('data-category');
        this.updateCardsGrid();
      });
    });
  }

  populateCards(topics) {
    if (!this.cardsGridEl) return;
    this.cardsGridEl.innerHTML = '';

    if (topics.length === 0) {
      this.cardsGridEl.style.display = 'block';
      this.cardsGridEl.innerHTML = `
        <div class="judicial-empty-box">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h4 style="margin:12px 0 6px; font-weight:700; color:inherit;">لا توجد قيود مطابقة لبحثك</h4>
          <p style="color:#64748B; margin:0;">تحقق من رقم المادة أو الكلمة المفتاحية (مثال: "سب"، "نصب"، "166 مكرر").</p>
        </div>
      `;
      return;
    }

    this.cardsGridEl.style.display = 'grid';
    topics.forEach(topic => {
      const card = new LegalCardComponent(topic);
      this.cardsGridEl.appendChild(card.render());
    });
  }

  updateCardsGrid() {
    if (!this.cardsGridEl) return;

    if (this.currentCategory === 'judicial-notes-circulars') {
      this.cardsGridEl.style.display = 'grid';
      this.cardsGridEl.innerHTML = '';
      const notes = DataService.getImportantNotes();
      notes.forEach(note => {
        const card = new GuidelineCardComponent(note);
        this.cardsGridEl.appendChild(card.render());
      });
      if (this.countPillEl) this.countPillEl.textContent = '5 ضوابط ملزمة';
      return;
    }

    const filtered = DataService.searchTopics({
      query: this.currentQuery,
      categoryId: this.currentCategory
    });

    if (this.countPillEl) {
      this.countPillEl.textContent = `${filtered.length} نموذج`;
    }

    this.populateCards(filtered);
  }
}
