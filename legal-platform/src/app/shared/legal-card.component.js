/**
 * Reusable Legal Card Component
 * Renders individual Charge & Description entries with:
 * - Color-coded Statutory Badges
 * - Formatted Charge Formulation Text Box
 * - Single-Click "Copy for Memorandum" with Toast Confirmation
 * - LocalStorage Star/Favorite Persistence
 */

import { StorageService } from '../core/storage.service.js';
import { ToastService } from '../core/toast.service.js';

export class LegalCardComponent {
  /**
   * @param {object} topic - Topic data from topics.json
   * @param {function} [onFavoriteToggled] - Optional callback
   */
  constructor(topic, onFavoriteToggled = null) {
    this.topic = topic;
    this.onFavoriteToggled = onFavoriteToggled;
    this.isFav = StorageService.isFavorite(topic.id);
  }

  render() {
    const card = document.createElement('article');
    card.className = `legal-card ${this.topic.conditional_addition ? 'legal-card--gilded' : ''}`;
    card.id = `card-${this.topic.id}`;
    card.setAttribute('data-id', this.topic.id);
    card.setAttribute('data-category', this.topic.category_id);

    // Build legal articles badges HTML
    const articlesBadgesHtml = this.topic.legal_articles.map(art => {
      let badgeClass = 'badge--law';
      if (art.law.includes('الاتصالات')) badgeClass = 'badge--telecom';
      else if (art.law.includes('تقنية المعلومات')) badgeClass = 'badge--cyber';
      else if (art.law.includes('التمويل')) badgeClass = 'badge--finance';

      return `
        <span class="badge ${badgeClass}" title="${art.summary}">
          <strong>${art.law}</strong>: ${art.article}
        </span>
      `;
    }).join('');

    // Build charge clauses HTML
    const clausesHtml = this.topic.charge_clauses.map(clause => `
      <div class="charge-clause-item">${clause}</div>
    `).join('');

    // Build conditional notes / alerts HTML if present
    let conditionalAlertHtml = '';
    if (this.topic.conditional_addition) {
      conditionalAlertHtml = `
        <div class="legal-card__section legal-card__section--warning">
          <div class="legal-card__section-title">
            <span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:text-bottom; margin-left:4px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              ملاحظة تشريعية وظرف مشدد
            </span>
          </div>
          <div style="font-size:0.9rem; line-height:1.6; color:#92400E;">
            ${this.topic.conditional_addition}
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <!-- Card Header -->
      <header class="legal-card__header">
        <div class="legal-card__title-wrap">
          <div class="legal-card__meta">
            <span class="badge badge--charge-type">${this.topic.charge_type}</span>
            <span class="badge badge--page">صـ ${this.topic.page_in_document} بالملف الرسمي</span>
          </div>
          <h2 class="legal-card__title">${this.topic.title}</h2>
        </div>

        <!-- Star / Favorite Toggle Button -->
        <button 
          class="btn-favorite ${this.isFav ? 'is-favorite' : ''}" 
          id="fav-btn-${this.topic.id}" 
          title="${this.isFav ? 'إزالة من المفضلة القضائية' : 'إضافة إلى مفضلتي القضائية'}"
          aria-label="المفضلة القضائية"
        >
          <svg class="star-icon" width="22" height="22" viewBox="0 0 24 24" fill="${this.isFav ? '#B89047' : 'none'}" stroke="#B89047" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
      </header>

      <!-- Card Body -->
      <div class="legal-card__body">
        
        <!-- Statutory Basis (مواد القيد) -->
        <div>
          <div class="legal-label">مواد القيد والإسناد القانوني:</div>
          <div class="legal-formula-text">
            ${this.topic.referral_formula}
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:6px;">
            ${articlesBadgesHtml}
          </div>
        </div>

        <!-- Charge Formulation Box (الوصف الجنائي) -->
        <div>
          <div class="charge-copy-box">
            <div class="charge-copy-box__toolbar">
              <span class="charge-copy-box__label">صيغة الوصف المقررة للتقرير والإحالة (بوصف أن المتهم):</span>
              <span class="badge badge--gold">صيغة معتمدة 1404/2024</span>
            </div>
            <div class="charge-copy-box__content">
              ${clausesHtml}
            </div>
          </div>
        </div>

        <!-- Legislative conditional alerts -->
        ${conditionalAlertHtml}

      </div>

      <!-- Card Footer Actions -->
      <footer class="legal-card__footer">
        <div style="font-size:0.8rem; color:#64748B;">
          الجهة: نيابة استئناف القاهرة ➔ محكمة القاهرة الاقتصادية
        </div>
        <div class="legal-card__actions">
          <button class="btn btn--copy btn--sm copy-charge-btn" id="copy-btn-${this.topic.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>نسخ كامل القيد والوصف للمذكرة</span>
          </button>
          
          <button class="btn btn--outline btn--sm print-btn" title="طباعة بطاقة القيد والوصف" id="print-btn-${this.topic.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            <span>طباعة</span>
          </button>
        </div>
      </footer>
    `;

    this.attachEvents(card);
    return card;
  }

  attachEvents(card) {
    const favBtn = card.querySelector(`#fav-btn-${this.topic.id}`);
    const copyBtn = card.querySelector(`#copy-btn-${this.topic.id}`);
    const printBtn = card.querySelector(`#print-btn-${this.topic.id}`);

    // Favorite toggle event
    if (favBtn) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newState = StorageService.toggleFavorite(this.topic.id);
        this.isFav = newState;
        
        // Update button visual
        favBtn.classList.toggle('is-favorite', newState);
        const star = favBtn.querySelector('.star-icon');
        if (star) {
          star.setAttribute('fill', newState ? '#B89047' : 'none');
        }
        favBtn.title = newState ? 'إزالة من المفضلة القضائية' : 'إضافة إلى مفضلتي القضائية';

        // Toast feedback
        if (newState) {
          ToastService.show(`تمت إضافة "${this.topic.title}" إلى مفضلتك القضائية بنجاح`, 'gold');
        } else {
          ToastService.show(`تمت إزالة "${this.topic.title}" من المفضلة القضائية`, 'info');
        }

        if (this.onFavoriteToggled) {
          this.onFavoriteToggled(this.topic.id, newState);
        }
      });
    }

    // Copy full legal memorandum text
    if (copyBtn) {
      copyBtn.addEventListener('click', async (e) => {
        e.stopPropagation();

        // Construct official legal memorandum text block
        const formattedMemorandumText = `[النيابة العامة المصرية - نيابة استئناف القاهرة الكلية]
[إحالة إلى محكمة القاهرة الاقتصادية - جنح اقتصادية وفقاً للكتاب الدوري 1404 لسنة 2024]

▪ موضوع الجنحة: ${this.topic.title}
▪ مواد القيد: ${this.topic.referral_formula}

▪ بوصف أن المتهم:
${this.topic.charge_clauses.map(c => `• ${c}`).join('\n')}
${this.topic.conditional_addition ? `\n[تنبيه تشريعي]: ${this.topic.conditional_addition}` : ''}`;

        try {
          await navigator.clipboard.writeText(formattedMemorandumText);
          
          copyBtn.classList.add('copied');
          const originalText = copyBtn.querySelector('span').textContent;
          copyBtn.querySelector('span').textContent = 'تم النسخ للحافظة ✓';

          ToastService.show(`تم نسخ صيغة الإحالة والوصف لـ "${this.topic.title}" بنجاح لاستخدامها في مذكرة النيابة`, 'success');

          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.querySelector('span').textContent = originalText;
          }, 2400);

        } catch (err) {
          console.error('Clipboard copy failed:', err);
          ToastService.show('تعذر النسخ التلقائي، يُرجى تحديد النص يدوياً', 'warning');
        }
      });
    }

    // Print single card
    if (printBtn) {
      printBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.print();
      });
    }
  }
}

