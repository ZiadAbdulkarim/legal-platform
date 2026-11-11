/**
 * Judicial Storage Service
 * Manages client-side persistence for Favorites (localStorage: 'favorite_topics')
 * and Prosecutor Profile data across sessions.
 */

const STORAGE_KEYS = {
  FAVORITES: 'favorite_topics',
  USER_PROFILE: 'prosecutor_profile',
  SEARCH_HISTORY: 'judicial_search_history'
};

const DEFAULT_PROFILE = {
  title: 'السيد الأستاذ',
  name: 'وكيل النائب العام',
  department: 'نيابة استئناف القاهرة الكلية',
  court: 'محكمة القاهرة الاقتصادية'
};

export class StorageService {
  /**
   * Retrieves all favorited topic IDs from localStorage.
   * @returns {string[]}
   */
  static getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading favorites from localStorage:', e);
      return [];
    }
  }

  /**
   * Checks if a topic is marked as favorite.
   * @param {string} topicId 
   * @returns {boolean}
   */
  static isFavorite(topicId) {
    const favorites = this.getFavorites();
    return favorites.includes(topicId);
  }

  /**
   * Toggles favorite status for a topic and persists to localStorage.
   * @param {string} topicId 
   * @returns {boolean} New favorite state (true if added, false if removed)
   */
  static toggleFavorite(topicId) {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(topicId);
    let isNowFavorite = false;

    if (index > -1) {
      favorites.splice(index, 1);
      isNowFavorite = false;
    } else {
      favorites.push(topicId);
      isNowFavorite = true;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      // Dispatch custom event so all active cards, counters, and navigation pills update immediately
      window.dispatchEvent(new CustomEvent('favorites-updated', {
        detail: { topicId, isFavorite: isNowFavorite, count: favorites.length }
      }));
    } catch (e) {
      console.error('Error saving favorites to localStorage:', e);
    }

    return isNowFavorite;
  }

  /**
   * Returns current count of favorited items.
   * @returns {number}
   */
  static getFavoritesCount() {
    return this.getFavorites().length;
  }

  /**
   * Retrieves the current official user identification card data.
   * @returns {object}
   */
  static getUserProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  }

  /**
   * Updates and saves the prosecutor identification data.
   * @param {object} profile 
   */
  static saveUserProfile(profile) {
    try {
      const updated = { ...this.getUserProfile(), ...profile };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('user-profile-updated', { detail: updated }));
    } catch (e) {
      console.error('Error saving profile to localStorage:', e);
    }
  }
}

