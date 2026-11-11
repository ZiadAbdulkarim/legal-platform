/**
 * Judicial Toast Service
 * Displays polished, non-intrusive notifications for judicial actions (e.g. Copying charges, favoriting).
 */

export class ToastService {
  static container = null;

  static init() {
    if (!this.container) {
      this.container = document.getElementById('judicial-toast-container');
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'judicial-toast-container';
        this.container.style.cssText = `
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          direction: rtl;
        `;
        document.body.appendChild(this.container);
      }
    }
  }

  /**
   * Shows a formal judicial notification toast.
   * @param {string} message - Message text
   * @param {'success'|'info'|'warning'|'gold'} type - Visual styling type
   * @param {number} duration - Display time in ms (default 3200ms)
   */
  static show(message, type = 'success', duration = 3200) {
    this.init();

    const toast = document.createElement('div');
    toast.className = `judicial-toast judicial-toast--${type}`;
    
    // Icon based on type
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#065F46" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'gold') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="#B89047" stroke="#B89047" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B45309" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E40AF" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.style.cssText = `
      background-color: #FFFFFF;
      color: #1E293B;
      border: 1px solid #CBD5E1;
      border-right: 4px solid ${type === 'gold' ? '#B89047' : type === 'warning' ? '#B45309' : '#114B3E'};
      border-radius: 6px;
      padding: 12px 18px;
      box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.15), 0 4px 6px -2px rgba(15, 23, 42, 0.05);
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Cairo', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      pointer-events: auto;
      transform: translateX(-30px);
      opacity: 0;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
      min-width: 280px;
      max-width: 440px;
    `;

    toast.innerHTML = `
      <div style="display:flex; align-items:center; flex-shrink:0;">${iconSvg}</div>
      <div style="flex:1; line-height: 1.45;">${message}</div>
    `;

    this.container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });

    // Dismiss
    setTimeout(() => {
      toast.style.transform = 'translateX(-30px)';
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
}

