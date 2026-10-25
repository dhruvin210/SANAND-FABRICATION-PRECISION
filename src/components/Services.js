import { servicesData } from '../data/servicesData.js';

export class Services {
  constructor(serviceModal, quoteModal) {
    this.serviceModal = serviceModal;
    this.quoteModal = quoteModal;
    this.servicesElement = null;
    this.activeFilter = 'all';
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'services';
    section.className = 'section-padding services-section';
    section.innerHTML = `
      <div class="container">
        <!-- Section Header -->
        <div class="section-header-block text-center">
          <div class="badge-accent-pill">Comprehensive Manufacturing Capabilities</div>
          <h2 class="section-headline">Precision Manufacturing Services on Demand</h2>
          <p class="section-lead-copy">
            Explore industrial manufacturing technologies built for engineers, product designers, and procurement leaders. Seamlessly transition from high-precision prototyping to production-scale runs.
          </p>

          <!-- Filter Category Tabs -->
          <div class="services-filter-pills" id="services-filter-bar">
            <button type="button" class="filter-pill active" data-filter="all">All Capabilities (5)</button>
            <button type="button" class="filter-pill" data-filter="cnc">CNC Machining</button>
            <button type="button" class="filter-pill" data-filter="additive">3D Printing</button>
            <button type="button" class="filter-pill" data-filter="sheet">Sheet Metal</button>
            <button type="button" class="filter-pill" data-filter="molding">Molding & Tooling</button>
          </div>
        </div>

        <!-- Services Cards Grid -->
        <div class="services-cards-grid" id="services-grid-container">
          ${this.renderCardsHtml(servicesData)}
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.servicesElement = section;
    this.attachEventListeners();
  }

  getServiceCategory(id) {
    if (id === 'cnc-machining') return 'cnc';
    if (id === '3d-printing') return 'additive';
    if (id === 'sheet-metal') return 'sheet';
    if (id === 'injection-molding' || id === 'urethane-casting') return 'molding';
    return 'all';
  }

  getServiceSvg(id) {
    switch (id) {
      case 'cnc-machining':
        return `
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="14" width="48" height="36" rx="4" stroke="#155eef" stroke-width="2.5" fill="#155eef" fill-opacity="0.06"/>
            <circle cx="32" cy="32" r="12" stroke="#155eef" stroke-width="2.5"/>
            <line x1="32" y1="8" x2="32" y2="20" stroke="#155eef" stroke-width="2.5"/>
            <line x1="32" y1="44" x2="32" y2="56" stroke="#155eef" stroke-width="2.5"/>
            <line x1="8" y1="32" x2="20" y2="32" stroke="#155eef" stroke-width="2.5"/>
            <line x1="44" y1="32" x2="56" y2="32" stroke="#155eef" stroke-width="2.5"/>
            <circle cx="32" cy="32" r="4" fill="#155eef"/>
          </svg>
        `;
      case '3d-printing':
        return `
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <polygon points="32 6 56 18 32 30 8 18 32 6" stroke="#155eef" stroke-width="2.5" fill="#155eef" fill-opacity="0.06"/>
            <polyline points="8 28 32 40 56 28" stroke="#155eef" stroke-width="2.5"/>
            <polyline points="8 38 32 50 56 38" stroke="#155eef" stroke-width="2.5"/>
            <polyline points="8 48 32 60 56 48" stroke="#155eef" stroke-width="2.5"/>
          </svg>
        `;
      case 'sheet-metal':
        return `
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <path d="M12 12H52V52H12V12Z" stroke="#155eef" stroke-width="2.5" fill="#155eef" fill-opacity="0.06"/>
            <line x1="12" y1="28" x2="52" y2="28" stroke="#155eef" stroke-width="2.5" stroke-dasharray="4 4"/>
            <circle cx="22" cy="40" r="4" stroke="#155eef" stroke-width="2"/>
            <circle cx="42" cy="40" r="4" stroke="#155eef" stroke-width="2"/>
            <path d="M12 28L28 12" stroke="#155eef" stroke-width="2.5"/>
          </svg>
        `;
      case 'injection-molding':
        return `
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="10" width="22" height="44" rx="3" stroke="#155eef" stroke-width="2.5" fill="#155eef" fill-opacity="0.06"/>
            <rect x="34" y="10" width="22" height="44" rx="3" stroke="#155eef" stroke-width="2.5" fill="#155eef" fill-opacity="0.06"/>
            <path d="M30 24H34M30 32H34M30 40H34" stroke="#155eef" stroke-width="3"/>
            <line x1="19" y1="18" x2="19" y2="46" stroke="#155eef" stroke-width="2" stroke-dasharray="3 3"/>
            <line x1="45" y1="18" x2="45" y2="46" stroke="#155eef" stroke-width="2" stroke-dasharray="3 3"/>
          </svg>
        `;
      case 'urethane-casting':
        return `
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <path d="M16 12C16 12 18 36 24 46C27 51 32 54 38 54C46 54 50 48 50 40C50 28 38 12 38 12" stroke="#155eef" stroke-width="2.5" fill="#155eef" fill-opacity="0.06"/>
            <path d="M16 12L38 12" stroke="#155eef" stroke-width="2.5"/>
            <circle cx="32" cy="38" r="5" stroke="#155eef" stroke-width="2"/>
          </svg>
        `;
      default:
        return ``;
    }
  }

  renderCardsHtml(services) {
    return services.map((service) => {
      const cat = this.getServiceCategory(service.id);
      return `
        <div class="service-card" data-category="${cat}" data-id="${service.id}">
          <div class="service-card-top">
            <div class="service-icon-graphic">
              ${this.getServiceSvg(service.id)}
            </div>
            <span class="service-badge-pill">${service.badge}</span>
          </div>

          <h3 class="service-card-title">${service.name}</h3>
          <p class="service-card-desc">${service.description}</p>

          <div class="service-capabilities-box">
            <div class="cap-title">Key Capabilities:</div>
            <ul class="cap-list">
              ${service.capabilities.slice(0, 3).map(c => `<li>✦ ${c}</li>`).join('')}
            </ul>
          </div>

          <div class="service-apps-summary">
            <span class="apps-label">Typical Applications:</span>
            <span class="apps-text">${service.applications.slice(0, 2).join(', ')}</span>
          </div>

          <div class="service-card-actions">
            <button type="button" class="btn btn-outline btn-sm learn-service-btn" data-id="${service.id}">
              Learn More / View Specs
            </button>
            <button type="button" class="btn btn-primary btn-sm quote-service-btn" data-id="${service.id}">
              Get a Quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  attachEventListeners() {
    // Filter tabs
    const filterPills = this.servicesElement.querySelectorAll('.filter-pill');
    const cards = this.servicesElement.querySelectorAll('.service-card');

    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = pill.getAttribute('data-filter');

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (filterVal === 'all' || cardCat === filterVal) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Delegate Learn More & Quote clicks
    this.servicesElement.addEventListener('click', (e) => {
      const learnBtn = e.target.closest('.learn-service-btn');
      if (learnBtn) {
        const id = learnBtn.getAttribute('data-id');
        if (id && this.serviceModal) {
          this.serviceModal.open(id);
        }
      }

      const quoteBtn = e.target.closest('.quote-service-btn');
      if (quoteBtn) {
        const id = quoteBtn.getAttribute('data-id');
        if (this.quoteModal) {
          this.quoteModal.open({ process: id });
        }
      }
    });
  }
}
