/**
 * Topic Details & Printable Slip Page
 */

import { DataService } from '../../core/data.service.js';
import { LegalCardComponent } from '../../shared/legal-card.component.js';

export class TopicDetailsPage {
  constructor({ topicId, onNavigate }) {
    this.topicId = topicId;
    this.onNavigate = onNavigate;
  }

  render() {
    const pageEl = document.createElement('main');
    pageEl.className = 'judicial-page-details legal-container';

    const topic = DataService.getTopicById(this.topicId) || DataService.getTopics()[0];

    pageEl.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn btn--outline btn--sm" id="details-back-btn">
          ➔ العودة للرئيسية
        </button>
      </div>
      <div id="details-card-wrap"></div>
    `;

    setTimeout(() => {
      const wrap = pageEl.querySelector('#details-card-wrap');
      if (wrap && topic) {
        const card = new LegalCardComponent(topic);
        wrap.appendChild(card.render());
      }
      const backBtn = pageEl.querySelector('#details-back-btn');
      if (backBtn && this.onNavigate) {
        backBtn.addEventListener('click', () => this.onNavigate('home'));
      }
    }, 0);

    return pageEl;
  }
}

