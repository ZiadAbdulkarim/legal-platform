/**
 * Judicial Categories & Circular Directives Page
 */

import { DataService } from '../../core/data.service.js';
import { GuidelineCardComponent } from '../../shared/guideline-card.component.js';

export class CategoriesPage {
  constructor({ onNavigate }) {
    this.onNavigate = onNavigate;
  }

  render() {
    const pageEl = document.createElement('main');
    pageEl.className = 'judicial-page-categories legal-container';

    const circular = DataService.getCircularInfo();
    const categories = DataService.getCategories();
    const notes = DataService.getImportantNotes();

    pageEl.innerHTML = `
      <!-- Circular 1404 Spotlight Banner -->
      <div class="circular-full-panel">
        <div class="circular-full-panel__header">
          <span class="badge badge--gold">منشور قضائي رقمي</span>
          <h2 style="margin:8px 0; color:#0A352B; font-weight:800;">${circular ? circular.title : 'الكتاب الدوري رقم 1404 لسنة 2024'}</h2>
          <div style="font-size:0.95rem; color:#475569;">
            جهة الإصدار: <strong>${circular ? circular.issued_by : 'السيد المستشار النائب العام'}</strong>
          </div>
        </div>
        <div class="circular-full-panel__body">
          <p style="margin:0 0 12px; font-family:'Tajawal',serif; font-size:1.05rem; line-height:1.8;">
            بشأن تنظيم قيد وإحالة الجنح الاقتصادية من النيابات الكلية بدائرة استئناف القاهرة إلى محكمة القاهرة الاقتصادية؛ توحيداً للتطبيق القضائي وضماناً لصحة مواد القيد والأوصاف في جرائم تقنية المعلومات، تنظيم الاتصالات، التعدي على القيم الأسرية، وعقود التمويل.
          </p>
        </div>
      </div>

      <!-- Mandatory Guidelines Full List -->
      <div style="margin-top:32px;">
        <h3 class="legal-h3" style="border-right: 4px solid #B89047; padding-right:8px; margin-bottom:16px;">
          التعليمات والضوابط الخمسة الملزمة الواردة بنهاية الكتاب الدوري
        </h3>
        <div class="guidelines-grid" id="full-guidelines-container">
          <!-- Populated below -->
        </div>
      </div>
    `;

    setTimeout(() => {
      const container = pageEl.querySelector('#full-guidelines-container');
      if (container) {
        notes.forEach(note => {
          const comp = new GuidelineCardComponent(note);
          container.appendChild(comp.render());
        });
      }
    }, 0);

    return pageEl;
  }
}

