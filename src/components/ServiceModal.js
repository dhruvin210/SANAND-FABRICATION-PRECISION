import { servicesData } from '../data/servicesData.js';

export class ServiceModal {
  constructor(quoteModalInstance) {
    this.quoteModal = quoteModalInstance;
    this.modalElement = null;
    this.currentService = null;
    this.init();
  }

  init() {
    const modal = document.createElement('div');
    modal.id = 'service-modal-backdrop';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog service-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-subtitle" id="service-modal-badge">Service Engineering Specs</span>
            <h2 id="service-modal-title" class="modal-title">Manufacturing Service</h2>
          </div>
          <button type="button" class="modal-close-btn" id="service-modal-close" aria-label="Close dialog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body service-modal-body" id="service-modal-content">
          <!-- Dynamic Service Content -->
        </div>

        <div class="modal-footer service-modal-footer">
          <button type="button" class="btn btn-secondary" id="service-modal-dismiss">Close</button>
          <button type="button" class="btn btn-primary" id="service-modal-quote-btn">
            Get an Instant Quote for this Process
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalElement = modal;

    // Listeners
    const closeBtn = modal.querySelector('#service-modal-close');
    const dismissBtn = modal.querySelector('#service-modal-dismiss');
    const quoteBtn = modal.querySelector('#service-modal-quote-btn');

    closeBtn.addEventListener('click', () => this.close());
    dismissBtn.addEventListener('click', () => this.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.close();
    });

    quoteBtn.addEventListener('click', () => {
      if (this.currentService) {
        const procId = this.currentService.id;
        this.close();
        if (this.quoteModal) {
          this.quoteModal.open({ process: procId });
        }
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) this.close();
    });
  }

  open(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return;
    this.currentService = service;

    this.modalElement.querySelector('#service-modal-badge').textContent = service.badge;
    this.modalElement.querySelector('#service-modal-title').textContent = service.name;

    const contentBox = this.modalElement.querySelector('#service-modal-content');
    contentBox.innerHTML = `
      <div class="service-detail-hero">
        <p class="service-lead-tagline">${service.tagline}</p>
        <p class="service-detail-desc">${service.description}</p>
        <div class="service-meta-stats-row">
          <div class="meta-stat-item">
            <span class="m-k">Production Speed:</span>
            <span class="m-v">${service.leadTime}</span>
          </div>
          <div class="meta-stat-item">
            <span class="m-k">Batch Quantities:</span>
            <span class="m-v">${service.minQuantity}</span>
          </div>
          <div class="meta-stat-item">
            <span class="m-k">Tolerance Standard:</span>
            <span class="m-v">Down to ±0.001" (0.025 mm)</span>
          </div>
        </div>
      </div>

      <!-- Core Capabilities Grid -->
      <div class="service-section mt-4">
        <h4 class="service-subheading">Technical Capabilities & Machinery Envelope</h4>
        <div class="capabilities-checklist">
          ${service.capabilities.map(cap => `
            <div class="cap-check-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${cap}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Materials & Finishes Row -->
      <div class="row-2-col mt-4">
        <div class="service-section">
          <h4 class="service-subheading">Supported Materials</h4>
          <div class="tag-cloud">
            ${service.materials.map(m => `<span class="service-tag material-tag">${m}</span>`).join('')}
          </div>
        </div>
        <div class="service-section">
          <h4 class="service-subheading">Post-Processing & Finishes</h4>
          <div class="tag-cloud">
            ${service.finishes.map(f => `<span class="service-tag finish-tag">${f}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- DFM Design Guidelines -->
      <div class="service-section mt-4">
        <h4 class="service-subheading">Design for Manufacturability (DFM) Rules</h4>
        <div class="dfm-guidelines-table">
          <div class="dfm-table-header">
            <span>Design Feature</span>
            <span>Recommended Engineering Practice</span>
          </div>
          ${service.designGuidelines.map(g => `
            <div class="dfm-table-row">
              <span class="dfm-rule">${g.rule}</span>
              <span class="dfm-advice">${g.advice}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Applications & Industries -->
      <div class="service-section mt-4">
        <h4 class="service-subheading">Typical Applications</h4>
        <div class="tag-cloud">
          ${service.applications.map(app => `<span class="service-tag app-tag">✦ ${app}</span>`).join('')}
        </div>
      </div>

      <!-- Process FAQs -->
      <div class="service-section mt-4">
        <h4 class="service-subheading">Frequently Asked Technical Questions</h4>
        <div class="service-faqs-list">
          ${service.faqs.map(faq => `
            <div class="service-faq-item">
              <strong class="faq-q-text">${faq.q}</strong>
              <p class="faq-a-text">${faq.a}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.modalElement.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modalElement.classList.remove('active');
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.modalElement.classList.contains('active');
  }
}
