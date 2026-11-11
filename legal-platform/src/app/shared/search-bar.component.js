/**
 * Reusable Judicial Search & Dynamic Filter Component
 * Real-time instant search across laws, articles, numbers, and charge descriptions.
 */

import { DataService } from '../core/data.service.js';

export class SearchBarComponent {
  /**
   * @param {object} options
   * @param {function} options.onSearchChange - Called when search query or category filter changes
   * @param {string} [options.initialCategory='all']
   * @param {string} [options.initialQuery='']
   * @param {boolean} [options.showQuickStats=true]
   */
  constructor({ onSearchChange, initialCategory = 'all', initialQuery = '', showQuickStats = true }) {
    this.onSearchChange = onSearchChange;
    this.currentCategory = initialCategory;
    this.currentQuery = initialQuery;
    this.showQuickStats = showQuickStats;
    this.categories = DataService.getCategories();
  }

  render() {
    const wrap = document.createElement('div');
    wrap.className = 'judicial-search-filter-card';
    wrap.innerHTML = `
      <div class="search-input-row">
        <div class="search-input-field">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#114B3E" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            class="judicial-search-input" 
            id="judicial-live-search" 
            placeholder="بحث فوري برقم المادة (مثال: 166 مكرر، 25، 336)، أو موضوع الجنحة، أو نصوص الوصف الجنائي..." 
            value="${this.currentQuery}"
            autocomplete="off"
            aria-label="محرك البحث القضائي الفوري"
          />
          <button class="search-clear-btn" id="search-clear-btn" title="مسح البحث" style="display:${this.currentQuery ? 'flex' : 'none'};">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Quick Category Filter Pills -->
      <div class="category-filters-row">
        <span class="filter-label">التصنيف القضائي:</span>
        <div class="filter-pills-wrap" id="category-filter-pills">
          <button class="btn btn--filter ${this.currentCategory === 'all' ? 'active' : ''}" data-category="all">
            كافة القيود (الكل)
          </button>
          <button class="btn btn--filter ${this.currentCategory === 'defamation-harassment' ? 'active' : ''}" data-category="defamation-harassment">
            السب والقذف والإزعاج والتهديد
          </button>
          <button class="btn btn--filter ${this.currentCategory === 'fraud-banking-crimes' ? 'active' : ''}" data-category="fraud-banking-crimes">
            النصب والبطاقات المصرفية
          </button>
          <button class="btn btn--filter ${this.currentCategory === 'cybercrimes-privacy' ? 'active' : ''}" data-category="cybercrimes-privacy">
            جرائم تقنية المعلومات والخصوصية
          </button>
          <button class="btn btn--filter ${this.currentCategory === 'financing-crimes' ? 'active' : ''}" data-category="financing-crimes">
            عقود التمويل
          </button>
          <button class="btn btn--filter ${this.currentCategory === 'judicial-notes-circulars' ? 'active' : ''}" data-category="judicial-notes-circulars">
            التعليمات والكتب الدورية
          </button>
        </div>
      </div>
    `;

    this.attachEvents(wrap);
    return wrap;
  }

  attachEvents(wrap) {
    const input = wrap.querySelector('#judicial-live-search');
    const clearBtn = wrap.querySelector('#search-clear-btn');
    const filterPills = wrap.querySelectorAll('.filter-pills-wrap .btn--filter');

    // Live search typing with debounced / instant responsiveness
    input.addEventListener('input', () => {
      this.currentQuery = input.value;
      clearBtn.style.display = this.currentQuery ? 'flex' : 'none';
      this.notifyChange();
    });

    // Clear search
    clearBtn.addEventListener('click', () => {
      input.value = '';
      this.currentQuery = '';
      clearBtn.style.display = 'none';
      input.focus();
      this.notifyChange();
    });

    // Category filter pills
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCategory = pill.getAttribute('data-category');
        this.notifyChange();
      });
    });
  }

  notifyChange() {
    if (this.onSearchChange) {
      this.onSearchChange({
        query: this.currentQuery,
        category: this.currentCategory
      });
    }
  }

  setCategory(catId) {
    this.currentCategory = catId;
    const wrap = document.getElementById('category-filter-pills');
    if (wrap) {
      wrap.querySelectorAll('.btn--filter').forEach(btn => {
        if (btn.getAttribute('data-category') === catId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
    this.notifyChange();
  }
}

