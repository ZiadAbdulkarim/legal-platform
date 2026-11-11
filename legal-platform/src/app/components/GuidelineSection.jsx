import React, { useState } from 'react';
import { 
  BookOpen, 
  AlertCircle, 
  PhoneOutgoing, 
  ShieldAlert, 
  FileWarning, 
  Scale, 
  Copy, 
  Check, 
  Printer, 
  FileText 
} from 'lucide-react';

export default function GuidelineSection({ 
  guidelines, 
  circularInfo,
  onCopyText 
}) {
  const [copiedId, setCopiedId] = useState(null);

  const getGuidelineIcon = (index) => {
    switch (index) {
      case 0:
        return <PhoneOutgoing size={22} />;
      case 1:
        return <ShieldAlert size={22} />;
      case 2:
        return <FileWarning size={22} />;
      case 3:
        return <Scale size={22} />;
      default:
        return <AlertCircle size={22} />;
    }
  };

  const handleCopyNote = (note) => {
    const text = `【تنبيه قضائي: ${note.title}】\n[النص]: ${note.text}\n[السند والغاية القانونية]: ${note.legal_rationale}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(note.id);
      onCopyText(`تم نسخ التنبيه: "${note.title}"`);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section className="judicial-guidelines-section">
      <div className="legal-container">
        
        {/* Circular Directive Highlight Banner */}
        <div className="circular-official-banner">
          <div className="circular-official-banner__icon">
            <BookOpen size={36} />
          </div>
          <div className="circular-official-banner__content">
            <div className="circular-official-banner__tag">
              الكتاب الدوري رقم {circularInfo.year ? `${circularInfo.title}` : '1404 لسنة 2024'}
            </div>
            <h2 className="circular-official-banner__title">
              {circularInfo.subject}
            </h2>
            <div className="circular-official-banner__meta">
              <span><strong>الجهة المصدرة:</strong> {circularInfo.issued_by}</span>
              <span>•</span>
              <span><strong>الجهات المخاطبة:</strong> {circularInfo.target_authorities}</span>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="judicial-section-head">
          <div className="judicial-section-head__badge">تنبيهات وضوابط التحقيق والإحالة</div>
          <h2 className="judicial-section-head__title">
            التعليمات والضوابط القضائية الواجب مراعاتها بدقة
          </h2>
          <p className="judicial-section-head__desc">
            تنبيهات تشريعية صادرة عن معالي النائب العام تلزم أعضاء النيابة العامة بمراعاتها منعاً لبطلان الإحالة أو عدم قبول الدعوى
          </p>
        </div>

        {/* 5 Guidelines Cards Grid */}
        <div className="judicial-guidelines-grid">
          {guidelines.map((note, index) => {
            const isCopied = copiedId === note.id;

            return (
              <div key={note.id} className="judicial-guideline-card">
                
                {/* Header */}
                <div className="judicial-guideline-card__header">
                  <div className="judicial-guideline-card__icon-box">
                    {getGuidelineIcon(index)}
                  </div>
                  <div className="judicial-guideline-card__titles">
                    <div className="judicial-guideline-card__meta">
                      <span className="judicial-guideline-card__num">تنبيه رقم {note.number}</span>
                      <span className="judicial-guideline-card__page">صفحة {note.page} بالكتاب الدوري</span>
                    </div>
                    <h3 className="judicial-guideline-card__title">{note.title}</h3>
                  </div>
                </div>

                {/* Directive Mandatory Instruction Box */}
                <div className="judicial-guideline-card__instruction">
                  <div className="judicial-guideline-card__instruction-label">
                    مضمون التكليف القضائي:
                  </div>
                  <p className="judicial-guideline-card__instruction-text">
                    {note.text}
                  </p>
                </div>

                {/* Legal Rationale */}
                <div className="judicial-guideline-card__rationale">
                  <strong className="judicial-guideline-card__rationale-label">
                    العلة والسند القانوني:
                  </strong>
                  <p className="judicial-guideline-card__rationale-text">
                    {note.legal_rationale}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="judicial-guideline-card__footer">
                  <span className="judicial-guideline-card__category-badge">
                    {note.category}
                  </span>
                  <button
                    type="button"
                    className="judicial-guideline-card__copy-btn"
                    onClick={() => handleCopyNote(note)}
                  >
                    {isCopied ? <Check size={15} /> : <Copy size={15} />}
                    <span>{isCopied ? 'تم النسخ' : 'نسخ التنبيه'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

