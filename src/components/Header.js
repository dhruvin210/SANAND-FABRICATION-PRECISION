export class Header {
  constructor(quoteModal, contactModal, serviceModal) {
    this.quoteModal = quoteModal;
    this.contactModal = contactModal;
    this.serviceModal = serviceModal;
    this.headerElement = null;
    this.mobileDrawer = null;
    this.init();
  }

  init() {
    this.renderHeader();
    this.setupScrollEffect();
    this.setupDropdownsAndMobile();
  }

  renderHeader() {
    const headerWrapper = document.createElement('div');
    headerWrapper.id = 'header-wrapper';
    headerWrapper.innerHTML = `
      <!-- Top Announcement & Certifications Bar (Xometry Benchmark) -->
      <div class="top-utility-bar">
        <div class="container top-bar-container">
          <div class="top-bar-left">
            <span class="cert-pill">✓ AS9100D & ISO 9001:2015</span>
            <span class="top-bar-text">Digital Manufacturing on Demand • Direct Factory Pricing</span>
          </div>
          <div class="top-bar-right">
            <span class="top-bar-link">📞 Engineering Hotline: +1 (800) 492-7283</span>
            <span class="sep-dot">•</span>
            <button type="button" class="btn-top-consult" id="top-bar-consult-btn">Talk to an Applications Engineer</button>
          </div>
        </div>
      </div>

      <!-- Main Sticky Navigation Bar -->
      <header id="site-header" class="site-header">
        <div class="container header-container">
          <!-- Brand Logo -->
          <a href="#" class="brand-logo" id="logo-home-link" aria-label="Sanand Fabrication Home">
            <div class="logo-mark">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L29.8564 10V26L16 34L2.14359 26V10L16 2Z" stroke="#155EEF" stroke-width="2.5" fill="#0B1324"/>
                <path d="M16 7L24 12V22L16 27L8 22V12L16 7Z" fill="#155EEF" fill-opacity="0.2" stroke="#155EEF" stroke-width="1.8"/>
                <circle cx="16" cy="17" r="3.5" fill="#155EEF"/>
              </svg>
            </div>
            <div class="logo-text-col">
              <span class="logo-main-name">SANAND</span>
              <span class="logo-sub-tag">FABRICATION & PRECISION</span>
            </div>
          </a>

          <!-- Desktop Navigation Bar -->
          <nav class="desktop-nav" aria-label="Main Navigation">
            <!-- Services Dropdown -->
            <div class="nav-item has-dropdown" id="services-nav-item">
              <button type="button" class="nav-link dropdown-toggle" aria-expanded="false" id="services-dropdown-btn">
                Manufacturing Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="dropdown-arrow">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <!-- Mega Menu Flyout -->
              <div class="mega-menu" id="services-mega-menu">
                <div class="mega-menu-inner">
                  <div class="mega-menu-grid">
                    <a href="#services" class="mega-menu-card" data-service="cnc-machining">
                      <div class="menu-icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="menu-card-title">CNC Machining <span class="menu-badge">Popular</span></div>
                        <p class="menu-card-desc">3, 4 & 5-axis milling and turning down to ±0.001" tolerance.</p>
                      </div>
                    </a>

                    <a href="#services" class="mega-menu-card" data-service="3d-printing">
                      <div class="menu-icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 17 12 22 22 17"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div class="menu-card-title">Industrial 3D Printing</div>
                        <p class="menu-card-desc">HP Multi Jet Fusion (MJF), SLS Nylon & DMLS metal additive.</p>
                      </div>
                    </a>

                    <a href="#services" class="mega-menu-card" data-service="sheet-metal">
                      <div class="menu-icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                        </svg>
                      </div>
                      <div>
                        <div class="menu-card-title">Sheet Metal Fabrication</div>
                        <p class="menu-card-desc">Laser cutting, CNC press brake forming, welded assemblies.</p>
                      </div>
                    </a>

                    <a href="#services" class="mega-menu-card" data-service="injection-molding">
                      <div class="menu-icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="menu-card-title">Injection Molding</div>
                        <p class="menu-card-desc">Rapid bridge tooling in 10-15 days & high-volume production molds.</p>
                      </div>
                    </a>

                    <a href="#services" class="mega-menu-card" data-service="urethane-casting">
                      <div class="menu-icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="menu-card-title">Urethane Vacuum Casting</div>
                        <p class="menu-card-desc">Silicone tooling for 10-100+ production-grade polyurethane units.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a href="#materials" class="nav-link">Materials & Finishes</a>
            <a href="#industries" class="nav-link">Industries</a>
            <a href="#quality" class="nav-link">Quality & CMM</a>
            <a href="#resources" class="nav-link">Design Guides</a>
            <a href="#rfq-tracker-section" class="nav-link nav-link-badge">
              Track RFQ
              <span class="pulse-dot"></span>
            </a>
          </nav>

          <!-- Right Action Buttons -->
          <div class="header-actions">
            <button type="button" class="btn btn-secondary btn-sm header-consult-btn" id="header-contact-btn">
              Consultation
            </button>
            <button type="button" class="btn btn-primary btn-sm btn-quote-pulse" id="header-quote-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span>Get an Instant Quote</span>
            </button>

            <!-- Mobile Hamburger Toggle Button -->
            <button type="button" class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle navigation menu">
              <span class="bar-line"></span>
              <span class="bar-line"></span>
              <span class="bar-line"></span>
            </button>
          </div>
        </div>

        <!-- Mobile Full-Screen Navigation Drawer -->
        <div class="mobile-nav-drawer" id="mobile-nav-drawer">
          <div class="mobile-drawer-inner">
            <div class="mobile-nav-group">
              <div class="mobile-nav-label">MANUFACTURING SERVICES</div>
              <a href="#services" class="mobile-nav-link" data-mobile-service="cnc-machining">CNC Machining (3, 4 & 5-Axis)</a>
              <a href="#services" class="mobile-nav-link" data-mobile-service="3d-printing">Industrial 3D Printing (MJF, SLS, DMLS)</a>
              <a href="#services" class="mobile-nav-link" data-mobile-service="sheet-metal">Sheet Metal Fabrication</a>
              <a href="#services" class="mobile-nav-link" data-mobile-service="injection-molding">Injection Molding</a>
              <a href="#services" class="mobile-nav-link" data-mobile-service="urethane-casting">Urethane Vacuum Casting</a>
            </div>

            <div class="mobile-nav-group">
              <div class="mobile-nav-label">MATERIALS & STANDARDS</div>
              <a href="#materials" class="mobile-nav-link">Materials Directory & Comparator</a>
              <a href="#industries" class="mobile-nav-link">Industries We Serve</a>
              <a href="#quality" class="mobile-nav-link">Quality Lab & CMM Metrology</a>
              <a href="#gallery" class="mobile-nav-link">Sample Parts Gallery</a>
              <a href="#resources" class="mobile-nav-link">DFM Engineering Guides</a>
              <a href="#faq" class="mobile-nav-link">Frequently Asked Questions</a>
              <a href="#rfq-tracker-section" class="mobile-nav-link">Track Quotation Status</a>
            </div>

            <div class="mobile-drawer-cta-stack">
              <button type="button" class="btn btn-primary w-100" id="mobile-quote-btn">
                ⚡ Get an Instant Quote
              </button>
              <button type="button" class="btn btn-secondary w-100 mt-2" id="mobile-contact-btn">
                📞 Speak with an Engineer
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Sticky Mobile Bottom Bar -->
      <div class="mobile-sticky-bottom-bar" id="mobile-sticky-bar">
        <div class="bottom-bar-content">
          <div class="bottom-bar-info">
            <span class="bb-tag">Fast Turnaround</span>
            <span class="bb-sub">Instant 3D CAD Pricing</span>
          </div>
          <button type="button" class="btn btn-primary btn-sm" id="bottom-bar-quote-btn">
            Get Quote
          </button>
        </div>
      </div>
    `;

    document.getElementById('app').prepend(headerWrapper);
    this.headerElement = headerWrapper.querySelector('#site-header');
    this.mobileDrawer = headerWrapper.querySelector('#mobile-nav-drawer');
  }

  setupScrollEffect() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        this.headerElement.classList.add('scrolled');
      } else {
        this.headerElement.classList.remove('scrolled');
      }
    });
  }

  setupDropdownsAndMobile() {
    const servicesNavItem = this.headerElement.querySelector('#services-nav-item');
    const dropdownBtn = this.headerElement.querySelector('#services-dropdown-btn');

    // Toggle dropdown on click
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      servicesNavItem.classList.toggle('open');
      const isOpen = servicesNavItem.classList.contains('open');
      dropdownBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!servicesNavItem.contains(e.target)) {
        servicesNavItem.classList.remove('open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Mega menu cards click
    const megaCards = this.headerElement.querySelectorAll('.mega-menu-card');
    megaCards.forEach((card) => {
      card.addEventListener('click', () => {
        servicesNavItem.classList.remove('open');
        const serviceId = card.getAttribute('data-service');
        if (serviceId && this.serviceModal) {
          setTimeout(() => {
            this.serviceModal.open(serviceId);
          }, 150);
        }
      });
    });

    // Action buttons
    const headerQuoteBtn = this.headerElement.querySelector('#header-quote-btn');
    const headerContactBtn = this.headerElement.querySelector('#header-contact-btn');
    const topBarConsultBtn = document.getElementById('top-bar-consult-btn');
    const mobileQuoteBtn = this.headerElement.querySelector('#mobile-quote-btn');
    const mobileContactBtn = this.headerElement.querySelector('#mobile-contact-btn');
    const bottomBarQuoteBtn = document.getElementById('bottom-bar-quote-btn');

    headerQuoteBtn.addEventListener('click', () => this.quoteModal.open());
    if (bottomBarQuoteBtn) bottomBarQuoteBtn.addEventListener('click', () => this.quoteModal.open());
    mobileQuoteBtn.addEventListener('click', () => {
      this.closeMobileDrawer();
      this.quoteModal.open();
    });

    headerContactBtn.addEventListener('click', () => this.contactModal.open());
    if (topBarConsultBtn) topBarConsultBtn.addEventListener('click', () => this.contactModal.open());
    mobileContactBtn.addEventListener('click', () => {
      this.closeMobileDrawer();
      this.contactModal.open();
    });

    // Mobile Hamburger
    const hamburger = this.headerElement.querySelector('#mobile-menu-toggle');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      this.mobileDrawer.classList.toggle('open');
      document.body.classList.toggle('mobile-menu-open');
    });

    // Mobile links click closes drawer
    const mobileLinks = this.mobileDrawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const serviceId = link.getAttribute('data-mobile-service');
        this.closeMobileDrawer();
        if (serviceId && this.serviceModal) {
          setTimeout(() => {
            this.serviceModal.open(serviceId);
          }, 300);
        }
      });
    });
  }

  closeMobileDrawer() {
    const hamburger = this.headerElement.querySelector('#mobile-menu-toggle');
    if (hamburger) hamburger.classList.remove('active');
    if (this.mobileDrawer) this.mobileDrawer.classList.remove('open');
    document.body.classList.remove('mobile-menu-open');
  }
}
