/**
 * Dedicated Judicial Search Page Component
 * Allows deep search across specific laws (Penal Code, Telecom Law, IT Law, Finance Law)
 */

import { DataService } from '../../core/data.service.js';
import { LegalCardComponent } from '../../shared/legal-card.component.js';
import { SearchBarComponent } from '../../shared/search-bar.component.js';

export class SearchPage {
  constructor({ onNavigate }) {
    this.onNavigate = onNavigate;
    this.query = '';
    this.category = 'all';
  }

  render() {
    const pageEl = document.createElement('main');
    pageEl.className = 'judicial-page-search legal-container';

    const header = document.createElement('div');
    header.className = 'search-page-header';
    header.innerHTML = `
      <div style="margin-bottom:16px;">
        <h2 class="legal-h2" style="border-right-color:#B89047;">محرك البحث القضائي المتقدم في نصوص ومواد الإحالة</h2>
        <p style="color:#475569; font-size:0.95rem; margin-top:4px;">
          ابحث بدقة في أرقام المواد، فقرات التجريم، شروط العقاب، أو نصوص الأوصاف الجنائية الواردة بالكتاب الدوري رقم 1404 لسنة 2024.
        </p>
      </div>
    `;

    const searchBar = new SearchBarComponent({
      initialCategory: this.category,
      initialQuery: this.query,
      onSearchChange: ({ query, category }) => {
        this.query = query;
        this.category = category;
        this.runSearch();
      }
    });

    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results-list';
    resultsContainer.id = 'search-results-list';

    pageEl.appendChild(header);
    pageEl.appendChild(searchBar.render());
    pageEl.appendChild(resultsContainer);

    setTimeout(() => {
      this.runSearch();
    }, 0);

    return pageEl;
  }

  runSearch() {
    const container = document.getElementById('search-results-list');
    if (!container) return;

    container.innerHTML = '';
    const results = DataService.searchTopics({
      query: this.query,
      categoryId: this.category
    });

    if (results.length === 0) {
      container.innerHTML = `
        <div class="judicial-empty-box">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h4 style="margin:12px 0 6px; font-weight:700; color:#1E293B;">لم يتم العثور على أي قيد أو وصف يطابق هذا البحث</h4>
          <p style="color:#64748B; margin:0;">جرّب استخدام كلمات أخرى أو أرقام مواد محددة (مثل: مادة 76، أو مادة 25، أو 327 عقوبات).</p>
        </div>
      `;
      return;
    }

    results.forEach(topic => {
      const card = new LegalCardComponent(topic);
      container.appendChild(card.render());
    });
  }
}

