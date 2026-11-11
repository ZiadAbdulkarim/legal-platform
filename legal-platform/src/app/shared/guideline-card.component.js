/**
 * Reusable Judicial Guideline Card Component
 * Renders the 5 Public Prosecutor Mandatory Circular Instructions
 */

export class GuidelineCardComponent {
  /**
   * @param {object} note - Note data from important_judicial_notes
   */
  constructor(note) {
    this.note = note;
  }

  render() {
    const el = document.createElement('div');
    el.className = 'guideline-card';
    el.id = `guideline-${this.note.id}`;

    let badgeClass = 'badge--warning';
    if (this.note.importance.includes('إلزامي')) badgeClass = 'badge--law';
    else if (this.note.importance.includes('حظر')) badgeClass = 'badge--danger';
    else if (this.note.importance.includes('اختصاص')) badgeClass = 'badge--circular';

    el.innerHTML = `
      <div class="guideline-card__header">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="guideline-card__number">${this.note.number}</span>
          <h3 class="guideline-card__title">${this.note.title}</h3>
        </div>
        <span class="badge ${badgeClass}">${this.note.importance}</span>
      </div>

      <div class="guideline-card__text">
        ${this.note.text}
      </div>

      <div style="margin-top:8px;">
        <span style="font-size:0.78rem; font-weight:700; color:#0A352B; margin-left:4px;">الأساس القضائي والتطبيقي:</span>
        <p class="guideline-card__rationale">${this.note.legal_rationale}</p>
      </div>

      <div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#64748B; border-top:1px dashed #E2E8F0; padding-top:6px;">
        <span>صـ ${this.note.page} من ملف قيود وأوصاف الكتاب الدوري 1404 لسنة 2024</span>
        <span class="badge badge--gold" style="font-size:0.7rem;">تعليمات النيابة العامة الفنية</span>
      </div>
    `;

    return el;
  }
}

