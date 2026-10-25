import { industriesData } from '../data/industriesData.js';

export class Industries {
  constructor(quoteModal, contactModal) {
    this.quoteModal = quoteModal;
    this.contactModal = contactModal;
    this.industriesElement = null;
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'industries';
    section.className = 'section-padding industries-section';
    section.innerHTML = `
      <div class="container">
        <!-- Section Header -->
        <div class="section-header-block text-center">
          <div class="badge-accent-pill">Specialized Engineering Solutions</div>
          <h2 class="section-headline">Industries We Empower with Precision Manufacturing</h2>
          <p class="section-lead-copy">
            From flight-critical aerospace hardware and EV battery assemblies to clinical surgical devices, our manufacturing facilities adhere to strict tolerances, material certifications, and traceability standards.
          </p>
        </div>

        <!-- Industries Grid -->
        <div class="industries-cards-grid">
          ${industriesData.map((ind) => `
            <div class="industry-card" data-industry="${ind.id}">
              <div class="industry-card-header">
                <div class="ind-icon-box">
                  ${this.getIndustrySvg(ind.id)}
                </div>
                <div class="ind-title-col">
                  <h3 class="industry-title">${ind.title}</h3>
                  <span class="industry-tagline">${ind.tagline}</span>
                </div>
              </div>

              <p class="industry-desc">${ind.description}</p>

              <!-- Key Applications List -->
              <div class="industry-apps-box">
                <span class="apps-heading">Typical Flight & Production Hardware:</span>
                <ul class="apps-items-list">
                  ${ind.keyApplications.map(app => `<li>✦ ${app}</li>`).join('')}
                </ul>
              </div>

              <!-- Recommended Processes & Certs -->
              <div class="industry-meta-footer">
                <div class="ind-cert-line">
                  <strong>Quality Protocol:</strong> ${ind.certifications}
                </div>
                <div class="ind-actions-row mt-3">
                  <button type="button" class="btn btn-outline btn-sm quote-industry-btn" data-industry="${ind.id}">
                    Quote ${ind.title} Parts
                  </button>
                  <button type="button" class="btn-link text-xs consult-industry-btn" data-industry="${ind.id}">
                    Consult Applications Specialist →
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.industriesElement = section;
    this.attachEventListeners();
  }

  getIndustrySvg(id) {
    switch (id) {
      case 'aerospace-defense':
        return `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
            <path d="M12 9v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
          </svg>
        `;
      case 'automotive-ev':
        return `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
            <circle cx="7" cy="17" r="2"></circle>
            <path d="M9 17h6"></path>
            <circle cx="17" cy="17" r="2"></circle>
          </svg>
        `;
      case 'robotics-automation':
        return `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8" y2="16.01"></line>
            <line x1="16" y1="16" x2="16" y2="16.01"></line>
          </svg>
        `;
      case 'medical-devices':
        return `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        `;
      case 'consumer-electronics':
        return `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
        `;
      case 'industrial-energy':
        return `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        `;
      default:
        return ``;
    }
  }

  attachEventListeners() {
    this.industriesElement.addEventListener('click', (e) => {
      const quoteBtn = e.target.closest('.quote-industry-btn');
      if (quoteBtn && this.quoteModal) {
        this.quoteModal.open();
      }

      const consultBtn = e.target.closest('.consult-industry-btn');
      if (consultBtn && this.contactModal) {
        this.contactModal.open();
      }
    });
  }
}
