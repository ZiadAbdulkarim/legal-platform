import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import SearchBar from './components/SearchBar';
import LegalCard from './components/LegalCard';
import GuidelineSection from './components/GuidelineSection';
import FavoritesView from './components/FavoritesView';
import Footer from './components/Footer';
import Toast from './components/Toast';

import { 
  categories, 
  topics, 
  importantGuidelines, 
  circularInfo 
} from './data/legalData';

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('judicial_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  // Navigation & Filter State
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'favorites' | 'guidelines'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Favorites State with LocalStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorite_topics');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Toast Notification State
  const [toast, setToast] = useState(null);

  // Sync theme with HTML document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    try {
      localStorage.setItem('judicial_theme', darkMode ? 'dark' : 'light');
    } catch (e) {}
  }, [darkMode]);

  // Sync favorites with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('favorite_topics', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const toggleFavorite = (topicId) => {
    setFavorites(prev => {
      const exists = prev.includes(topicId);
      if (exists) {
        showToast('تمت إزالة القيد من المفضلة');
        return prev.filter(id => id !== topicId);
      } else {
        showToast('تمت إضافة القيد بنجاح إلى المفضلة');
        return [...prev, topicId];
      }
    });
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('all');
    // Smooth scroll down to search section
    const el = document.getElementById('search-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToGuidelines = () => {
    setActiveTab('guidelines');
    const el = document.getElementById('main-content-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrintCard = (topicId) => {
    // Add print class to isolate the card or trigger print
    window.print();
  };

  const handlePrintAll = () => {
    window.print();
  };

  // Filter topics based on category and search query
  const filteredTopics = useMemo(() => {
    return topics.filter(topic => {
      // Category filter
      if (selectedCategory !== 'all' && topic.category_id !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.trim().toLowerCase();
        const matchesTitle = topic.title.toLowerCase().includes(query);
        const matchesFormula = topic.referral_formula.toLowerCase().includes(query);
        const matchesDesc = topic.full_charge_description.toLowerCase().includes(query);
        const matchesKeywords = topic.keywords && topic.keywords.some(k => k.toLowerCase().includes(query));
        const matchesArticles = topic.legal_articles && topic.legal_articles.some(a => 
          a.law.toLowerCase().includes(query) || 
          a.article.toLowerCase().includes(query) || 
          a.summary.toLowerCase().includes(query)
        );

        if (!matchesTitle && !matchesFormula && !matchesDesc && !matchesKeywords && !matchesArticles) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Favorited topics list
  const favoriteTopics = useMemo(() => {
    return topics.filter(t => favorites.includes(t.id));
  }, [favorites]);

  return (
    <div className="judicial-app-root">
      
      {/* Official Master Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        topicsCount={topics.length}
        guidelinesCount={importantGuidelines.length}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        onPrintAll={handlePrintAll}
      />

      {/* Rich Visual Hero Section with Layered SVG Graphics */}
      <Hero
        totalTopics={topics.length}
        totalCategories={categories.length}
        totalGuidelines={importantGuidelines.length}
      />

      {/* Featured Category Showcase Cards */}
      <CategoryShowcase
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onGoToGuidelines={handleGoToGuidelines}
        activeTab={activeTab}
      />

      <div id="main-content-anchor" />

      {/* Active View Router */}
      <main className="judicial-main-viewport">
        {activeTab === 'all' && (
          <>
            {/* Search Bar & Dynamic Category Pills */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={categories}
              totalResults={filteredTopics.length}
              totalTopics={topics.length}
            />

            {/* Legal Cards Grid */}
            <section className="judicial-cards-section">
              <div className="legal-container">
                {filteredTopics.length > 0 ? (
                  <div className="judicial-cards-grid-fluid">
                    {filteredTopics.map((topic) => (
                      <LegalCard
                        key={topic.id}
                        topic={topic}
                        isFavorite={favorites.includes(topic.id)}
                        onToggleFavorite={toggleFavorite}
                        onCopyText={showToast}
                        onPrintCard={handlePrintCard}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="judicial-empty-box">
                    <div className="judicial-empty-box__icon">
                      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="8" y1="11" x2="14" y2="11" strokeDasharray="2 2" />
                      </svg>
                    </div>
                    <h3 className="judicial-empty-box__title">لا توجد قيود تطابق معايير البحث</h3>
                    <p className="judicial-empty-box__desc">
                      لم يتم العثور على أي قيد أو وصف يطابق كلمة البحث: "{searchQuery}". يمكنك البحث برقم مادة أخرى أو مراجعة التصنيفات الرئيسية.
                    </p>
                    <button
                      type="button"
                      className="judicial-primary-action-btn"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                    >
                      إعادة عرض كافة القيود والأوصاف
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favoriteTopics={favoriteTopics}
            onToggleFavorite={toggleFavorite}
            onCopyText={showToast}
            onPrintCard={handlePrintCard}
            onPrintAll={handlePrintAll}
            onGoToAll={() => setActiveTab('all')}
          />
        )}

        {activeTab === 'guidelines' && (
          <GuidelineSection
            guidelines={importantGuidelines}
            circularInfo={circularInfo}
            onCopyText={showToast}
          />
        )}
      </main>

      {/* Official Master Footer */}
      <Footer />

      {/* Interactive Toast Notification */}
      <Toast message={toast} />

    </div>
  );
}

