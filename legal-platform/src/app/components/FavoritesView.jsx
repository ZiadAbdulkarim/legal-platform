import React from 'react';
import { Bookmark, Star, Printer, ArrowRight, Scale } from 'lucide-react';
import LegalCard from './LegalCard';

export default function FavoritesView({
  favoriteTopics,
  onToggleFavorite,
  onCopyText,
  onPrintCard,
  onPrintAll,
  onGoToAll
}) {
  if (favoriteTopics.length === 0) {
    return (
      <section className="judicial-favorites-section">
        <div className="legal-container">
          <div className="judicial-empty-favorites">
            <div className="judicial-empty-favorites__icon-wrap">
              <svg className="judicial-empty-favorites__svg" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="80" r="60" fill="#0E5848" fillOpacity="0.1" />
                <circle cx="100" cy="80" r="40" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="5 3" />
                <path d="M85 55 H115 V110 L100 95 L85 110 V55 Z" fill="#C5A059" fillOpacity="0.8" stroke="#04201A" strokeWidth="2" />
                <circle cx="100" cy="72" r="6" fill="#FFFFFF" />
              </svg>
            </div>
            <h2 className="judicial-empty-favorites__title">
              لم يتم حفظ أي قيود في المفضلة بعد
            </h2>
            <p className="judicial-empty-favorites__desc">
              يمكنك النقر على أيقونة النجمة (★) الموجودة في أعلى بطاقة أي قيد ووصف لإضافتها إلى قائمتك المفضلة والوصول السريع إليها في أي وقت دون اتصال بالإنترنت.
            </p>
            <button
              type="button"
              className="judicial-primary-action-btn"
              onClick={onGoToAll}
            >
              <Scale size={18} />
              <span>استعراض كافة القيود والأوصاف النموذجية</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="judicial-favorites-section">
      <div className="legal-container">
        
        {/* Section Header */}
        <div className="judicial-favorites-head">
          <div>
            <div className="judicial-section-head__badge">قائمتي المختارة</div>
            <h2 className="judicial-section-head__title">
              القيود والأوصاف المحفوظة في المفضلة ({favoriteTopics.length})
            </h2>
            <p className="judicial-section-head__desc">
              تصفح أو اطبع النماذج القضائية التي قمت بتحديدها للرجوع السريع إليها أثناء إعداد مذكرات الإحالة
            </p>
          </div>

          <button
            type="button"
            className="judicial-primary-action-btn judicial-primary-action-btn--gold"
            onClick={onPrintAll}
          >
            <Printer size={18} />
            <span>طباعة كافة المفضلة معاً</span>
          </button>
        </div>

        {/* Fluid Cards Grid */}
        <div className="judicial-cards-grid-fluid">
          {favoriteTopics.map((topic) => (
            <LegalCard
              key={topic.id}
              topic={topic}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onCopyText={onCopyText}
              onPrintCard={onPrintCard}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

