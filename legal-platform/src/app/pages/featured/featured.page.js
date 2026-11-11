/**
 * "My Favorite Provisions" (مفضلتي القضائية) Page
 * Displays only the legal charges and judicial descriptions favorited by the prosecutor/judge.
 * Synchronized with localStorage ('favorite_topics').
 */

import { DataService } from '../../core/data.service.js';
import { StorageService } from '../../core/storage.service.js';
import { ToastService } from '../../core/toast.service.js';
import { LegalCardComponent } from '../../shared/legal-card.component.js';

export class FeaturedPage {
  constructor({ onNavigate }) {
    this.onNavigate = onNavigate;
  }

  render() {
    const pageEl = document.createElement('main');
    pageEl.className = 'judicial-page-favorites legal-container';

    const headerBar = document.createElement('div');
    headerBar.className = 'favorites-hero-bar';
    headerBar.innerHTML = `
      <div class="favorites-hero-bar__inner">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#B89047" stroke="#B89047" stroke-width="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <h2 class="legal-h2" style="margin:0; border:none; padding:0; color:#0A352B;">مفضلتي القضائية (نماذج القيد والوصف المحفوظة)</h2>
          </div>
          <p style="margin:0; color:#475569; font-size:0.95rem;">
            القيود والأوصاف المحددة للرجوع السريع أثناء التحقيق وإعداد مذكرات الإحالة للمحكمة الاقتصادية. محفوظة بذاكرة المتصفح.
          </p>
        </div>
        <div class="favorites-actions">
          <button class="btn btn--outline btn--sm" id="copy-all-favs-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>نسخ كافة المحفوظات للمذكرة</span>
          </button>
          <button class="btn btn--primary btn--sm" id="back-to-all-btn">
            <span>تصفح كافة القيود ➔</span>
          </button>
        </div>
      </div>
    `;

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'favorites-cards-container';
    cardsContainer.id = 'favorites-cards-container';

    pageEl.appendChild(headerBar);
    pageEl.appendChild(cardsContainer);

    // Initial render
    setTimeout(() => {
      this.renderFavoritesList(cardsContainer);
      this.attachPageEvents(pageEl);
    }, 0);

    return pageEl;
  }

  renderFavoritesList(container) {
    container.innerHTML = '';
    const favoriteIds = StorageService.getFavorites();

    if (favoriteIds.length === 0) {
      container.innerHTML = `
        <div class="judicial-empty-box" style="padding: 48px 20px;">
          <div style="width:72px; height:72px; border-radius:50%; background:#FDF9F0; border:1px solid #DFC794; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#B89047" stroke-width="1.8">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3 style="color:#0A352B; font-weight:700; margin-bottom:8px;">لا توجد قيود مضافة للمفضلة حتى الآن</h3>
          <p style="color:#64748B; max-width:500px; margin:0 auto 20px; line-height:1.7;">
            يمكنك تمييز أي قيد ووصف بنجمة (★) من الصفحة الرئيسية لحفظه هنا للوصول الفوري، وستبقى محفوظة تلقائياً حتى بعد إغلاق المتصفح.
          </p>
          <button class="btn btn--primary btn--sm" id="empty-state-browse-btn">
            الانتقال لكافة القيود والأوصاف
          </button>
        </div>
      `;

      const browseBtn = container.querySelector('#empty-state-browse-btn');
      if (browseBtn && this.onNavigate) {
        browseBtn.addEventListener('click', () => this.onNavigate('home'));
      }
      return;
    }

    // Render each favorited topic
    favoriteIds.forEach(id => {
      const topic = DataService.getTopicById(id);
      if (topic) {
        const cardComp = new LegalCardComponent(topic, (topicId, isFav) => {
          // If unfavorited from this page, re-render the list immediately
          if (!isFav) {
            this.renderFavoritesList(container);
          }
        });
        container.appendChild(cardComp.render());
      }
    });
  }

  attachPageEvents(pageEl) {
    const backBtn = pageEl.querySelector('#back-to-all-btn');
    if (backBtn && this.onNavigate) {
      backBtn.addEventListener('click', () => this.onNavigate('home'));
    }

    const copyAllBtn = pageEl.querySelector('#copy-all-favs-btn');
    if (copyAllBtn) {
      copyAllBtn.addEventListener('click', async () => {
        const favoriteIds = StorageService.getFavorites();
        if (favoriteIds.length === 0) {
          ToastService.show('لا توجد نماذج في المفضلة لنسخها', 'warning');
          return;
        }

        const favTopics = favoriteIds.map(id => DataService.getTopicById(id)).filter(Boolean);
        const combinedText = `[ملف القيود والأوصاف المفضلة - النيابة العامة المصرية]
[محكمة القاهرة الاقتصادية - وفقاً للكتاب الدوري رقم 1404 لسنة 2024]
============================================================\n\n` +
        favTopics.map((t, idx) => `[${idx + 1}] ${t.title} (${t.charge_type})
مواد القيد: ${t.referral_formula}
بوصف أن المتهم:
${t.charge_clauses.map(c => `• ${c}`).join('\n')}
------------------------------------------------------------`).join('\n\n');

        try {
          await navigator.clipboard.writeText(combinedText);
          ToastService.show(`تم نسخ عدد (${favTopics.length}) نموذج من المفضلة إلى الحافظة بنجاح`, 'success');
        } catch (e) {
          ToastService.show('تعذر النسخ التلقائي للحافظة', 'warning');
        }
      });
    }
  }
}

