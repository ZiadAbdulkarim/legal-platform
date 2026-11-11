import React from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Gavel, 
  CreditCard, 
  ShieldCheck, 
  FileSignature, 
  Layers 
} from 'lucide-react';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  totalResults,
  totalTopics
}) {
  const getFilterIcon = (id) => {
    switch (id) {
      case 'defamation-harassment':
        return <Gavel size={16} />;
      case 'fraud-banking-crimes':
        return <CreditCard size={16} />;
      case 'cybercrimes-privacy':
        return <ShieldCheck size={16} />;
      case 'financing-crimes':
        return <FileSignature size={16} />;
      default:
        return <Layers size={16} />;
    }
  };

  return (
    <div className="judicial-search-wrapper" id="search-section">
      <div className="legal-container">
        
        {/* Main Search Input Box */}
        <div className="judicial-search-box">
          <div className="judicial-search-box__icon">
            <Search size={22} className="text-gold" />
          </div>

          <input
            type="text"
            className="judicial-search-box__input"
            placeholder="ابحث برقم المادة (مثل: 166 مكرراً، 336)، اسم الجريمة (مثل: سب، نصب، اختراق)، أو أي كلمة في نص القيد..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          {searchQuery && (
            <button 
              type="button" 
              className="judicial-search-box__clear"
              onClick={() => onSearchChange('')}
              title="مسح البحث"
            >
              <X size={18} />
            </button>
          )}

          <div className="judicial-search-box__badge">
            <SlidersHorizontal size={14} />
            <span>بحث فوري</span>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="judicial-filter-bar">
          <div className="judicial-filter-bar__pills">
            
            {/* "All" button */}
            <button
              type="button"
              className={`judicial-filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => onSelectCategory('all')}
            >
              <Layers size={16} />
              <span>كافة القيود والأوصاف</span>
              <span className="judicial-filter-pill__count">{totalTopics}</span>
            </button>

            {/* Individual Category Pills */}
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`judicial-filter-pill ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectCategory(cat.id)}
                >
                  {getFilterIcon(cat.id)}
                  <span>{cat.title}</span>
                  <span className="judicial-filter-pill__count">{cat.topics_count}</span>
                </button>
              );
            })}

          </div>
        </div>

        {/* Results Counter & Active Filter Notification */}
        <div className="judicial-search-meta">
          <div className="judicial-search-meta__count">
            عرض <strong>{totalResults}</strong> نموذجاً من إجمالي <strong>{totalTopics}</strong> قيداً ووصفاً معتمداً
          </div>
          {(selectedCategory !== 'all' || searchQuery.trim() !== '') && (
            <button 
              type="button" 
              className="judicial-search-meta__reset"
              onClick={() => {
                onSelectCategory('all');
                onSearchChange('');
              }}
            >
              <X size={14} />
              <span>إعادة ضبط التصفية والبحث</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

