/**
 * Main Application Orchestrator & Router
 * Coordinates:
 * - DataService Initialization
 * - Header & Navbar Component with live profile & favorites badge
 * - Dynamic Page Routing ('home', 'favorites', 'instructions', 'search', 'details')
 */

import { DataService } from './core/data.service.js';
import { HeaderComponent } from './layout/header.component.js';
import { HomePage } from './pages/home/home.page.js';
import { FeaturedPage } from './pages/featured/featured.page.js';
import { SearchPage } from './pages/search/search.page.js';
import { CategoriesPage } from './pages/categories/categories.page.js';
import { TopicDetailsPage } from './pages/topic-details/topic-details.page.js';

class App {
  constructor() {
    this.currentRoute = 'home';
    this.routeParams = {};
    this.header = null;
    this.headerContainer = document.getElementById('app-header');
    this.mainContainer = document.getElementById('app-main');
  }

  async init() {
    // 1. Initialize data layer
    await DataService.init();

    // 2. Setup router listener for hash changes
    window.addEventListener('hashchange', () => this.handleHashChange());

    // 3. Mount Header
    this.renderHeader();

    // 4. Initial Route
    this.handleHashChange();
  }

  renderHeader() {
    if (!this.headerContainer) return;
    this.headerContainer.innerHTML = '';
    this.header = new HeaderComponent({
      currentRoute: this.currentRoute,
      onNavigate: (route, params = {}) => this.navigate(route, params)
    });
    this.headerContainer.appendChild(this.header.render());
  }

  navigate(route, params = {}) {
    this.currentRoute = route;
    this.routeParams = params;
    window.location.hash = route + (params.id ? `?id=${params.id}` : '');
  }

  handleHashChange() {
    const rawHash = window.location.hash.replace('#', '') || 'home';
    const [route, queryString] = rawHash.split('?');
    const urlParams = new URLSearchParams(queryString || '');
    const id = urlParams.get('id');

    this.currentRoute = route || 'home';
    this.routeParams = { id };

    this.renderActivePage();
  }

  renderActivePage() {
    if (!this.mainContainer) return;
    this.mainContainer.innerHTML = '';

    // Update active nav button in header if mounted
    const navLinks = document.querySelectorAll('.judicial-nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('data-route') === this.currentRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    let pageInstance = null;

    switch (this.currentRoute) {
      case 'favorites':
      case 'featured':
        pageInstance = new FeaturedPage({
          onNavigate: (route, params) => this.navigate(route, params)
        });
        break;

      case 'search':
        pageInstance = new SearchPage({
          onNavigate: (route, params) => this.navigate(route, params)
        });
        break;

      case 'instructions':
      case 'categories':
        pageInstance = new CategoriesPage({
          onNavigate: (route, params) => this.navigate(route, params)
        });
        break;

      case 'details':
        pageInstance = new TopicDetailsPage({
          topicId: this.routeParams.id,
          onNavigate: (route, params) => this.navigate(route, params)
        });
        break;

      case 'home':
      default:
        pageInstance = new HomePage({
          onNavigate: (route, params) => this.navigate(route, params)
        });
        break;
    }

    if (pageInstance) {
      this.mainContainer.appendChild(pageInstance.render());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// Bootstrap application on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init().catch(err => console.error('App init failed:', err));
});

