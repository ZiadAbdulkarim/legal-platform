import React, { useState } from 'react';
import { 
  Star, 
  Copy, 
  Check, 
  Printer, 
  AlertTriangle, 
  FileText, 
  Gavel, 
  CreditCard, 
  ShieldCheck, 
  FileSignature, 
  Bookmark, 
  Share2 
} from 'lucide-react';

export default function LegalCard({
  topic,
  isFavorite,
  onToggleFavorite,
  onCopyText,
  onPrintCard
}) {
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);

  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'defamation-harassment':
        return <Gavel size={17} />;
      case 'fraud-banking-crimes':
        return <CreditCard size={17} />;
      case 'cybercrimes-privacy':
        return <ShieldCheck size={17} />;
      case 'financing-crimes':
        return <FileSignature size={17} />;
      default:
        return <FileText size={17} />;
    }
  };

  const getLawBadgeClass = (lawName) => {
    if (lawName.includes('العقوبات')) return 'law-badge--penal';
    if (lawName.includes('الاتصالات')) return 'law-badge--telecom';
    if (lawName.includes('تقنية المعلومات')) return 'law-badge--cyber';
    if (lawName.includes('التمويل')) return 'law-badge--finance';
    return 'law-badge--default';
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(topic.referral_formula).then(() => {
      setCopiedReferral(true);
      onCopyText('تم نسخ مواد القيد والإحالة بنجاح إلى الحافظة');
      setTimeout(() => setCopiedReferral(false), 2000);
    });
  };

  const handleCopyFull = () => {
    const fullText = `【${topic.title} - ${topic.charge_type}】\n\n[مواد القيد والإحالة]:\n${topic.referral_formula}\n\n[تقرير الوصف]:\n${topic.charge_description_heading}\n${topic.full_charge_description}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedFull(true);
      onCopyText(`تم نسخ نص مذكرة "${topic.title}" بالكامل`);
      setTimeout(() => setCopiedFull(false), 2000);
    });
  };

  return (
    <article className="legal-rich-card" id={`card-${topic.id}`}>
      
      {/* Official Print Header (Visible strictly in @media print) */}
      <div className="legal-rich-card__print-head">
        <div className="print-head-title">النيابة العامة المصرية • دائرة استئناف القاهرة</div>
        <div className="print-head-sub">مذكرة إحالة وتقرير قيد ووصف جنحة اقتصادية (الكتاب الدوري رقم 1404 لسنة 2024)</div>
      </div>

      {/* Card Header */}
      <div className="legal-rich-card__header">
        <div className="legal-rich-card__meta-row">
          
          {/* Category Badge */}
          <div className="legal-rich-card__category-badge">
            {getCategoryIcon(topic.category_id)}
            <span>{topic.charge_type}</span>
          </div>

          <div className="legal-rich-card__page-tag">
            <span>صفحة {topic.page_in_document} بالكتاب الدوري</span>
          </div>

          {/* Favorite Star Action */}
          <button
            type="button"
            className={`legal-rich-card__fav-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(topic.id)}
            title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            aria-label="Toggle Favorite"
          >
            <Star 
              size={19} 
              className={isFavorite ? 'fill-gold text-gold' : 'text-muted'} 
            />
          </button>
        </div>

        {/* Card Title */}
        <h3 className="legal-rich-card__title">
          {topic.title}
        </h3>
      </div>

      {/* Legal Articles Tag Cloud */}
      <div className="legal-rich-card__articles">
        <div className="legal-rich-card__section-label">المواد القانونية المطبقة:</div>
        <div className="legal-rich-card__badges-wrap">
          {topic.legal_articles.map((art, idx) => (
            <span 
              key={idx} 
              className={`law-badge ${getLawBadgeClass(art.law)}`}
              title={art.summary}
            >
              <strong>{art.law}:</strong> م. {art.article}
            </span>
          ))}
        </div>
      </div>

      {/* Referral Formula Box (مواد القيد والإحالة) */}
      <div className="legal-rich-card__referral-box">
        <div className="legal-rich-card__box-head">
          <span className="legal-rich-card__box-title">
            صيغة القيد والإحالة المعتمدة:
          </span>
          <button
            type="button"
            className="legal-rich-card__mini-copy"
            onClick={handleCopyReferral}
            title="نسخ صيغة القيد والإحالة"
          >
            {copiedReferral ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            <span>{copiedReferral ? 'تم النسخ' : 'نسخ القيد'}</span>
          </button>
        </div>
        <p className="legal-rich-card__referral-text">
          {topic.referral_formula}
        </p>
      </div>

      {/* Charge Description Clauses (تقرير الوصف) */}
      <div className="legal-rich-card__description-box">
        <div className="legal-rich-card__box-head">
          <span className="legal-rich-card__box-title">
            {topic.charge_description_heading}
          </span>
        </div>
        <ol className="legal-rich-card__clauses-list">
          {topic.charge_clauses.map((clause, idx) => (
            <li key={idx} className="legal-rich-card__clause-item">
              <span className="legal-rich-card__clause-num">{idx + 1}</span>
              <span className="legal-rich-card__clause-text">{clause}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Legislative Alert Notes (if any) */}
      {topic.legislative_notes && topic.legislative_notes.length > 0 && (
        <div className="legal-rich-card__alert-box">
          <div className="legal-rich-card__alert-icon">
            <AlertTriangle size={18} />
          </div>
          <div className="legal-rich-card__alert-content">
            <strong className="legal-rich-card__alert-title">تنبيه تشريعي وقضائي هام:</strong>
            <ul className="legal-rich-card__alert-list">
              {topic.legislative_notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Card Action Footer */}
      <div className="legal-rich-card__actions-footer">
        
        {/* Main Copy Full Text Button */}
        <button
          type="button"
          className="judicial-primary-action-btn"
          onClick={handleCopyFull}
        >
          {copiedFull ? <Check size={17} /> : <Copy size={17} />}
          <span>{copiedFull ? 'تم نسخ المذكرة بالكامل' : 'نسخ النص بالكامل للمذكرة'}</span>
        </button>

        {/* Print Single Card Button */}
        <button
          type="button"
          className="judicial-secondary-action-btn"
          onClick={() => onPrintCard(topic.id)}
          title="طباعة نموذج القيد والوصف منفرداً"
        >
          <Printer size={17} />
          <span className="d-none-mobile">طباعة القيد</span>
        </button>

      </div>

    </article>
  );
}

