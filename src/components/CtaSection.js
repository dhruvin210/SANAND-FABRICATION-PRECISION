export class CtaSection {
  constructor(quoteModal, contactModal) {
    this.quoteModal = quoteModal;
    this.contactModal = contactModal;
    this.element = null;
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'closing-cta';
    section.className = 'section-padding closing-cta-section';
    section.innerHTML = `
      <div class="container">
        <div class="cta-banner-wrapper">
          <div class="cta-content-col">
            <span class="badge-accent-pill">Accelerate Production Cycles</span>
            <h2 class="cta-main-title">Ready to Bring Your Design to Life?</h2>
            <p class="cta-lead-text">
              Share your manufacturing requirements and let our engineering team help you determine the next steps. From prototype validation to high-volume production, we are your end-to-end manufacturing partner.
            </p>
            <div class="cta-actions-group">
              <button type="button" class="btn btn-primary btn-lg" id="cta-bottom-quote-btn">
                Request an Instant Quote
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              <button type="button" class="btn btn-secondary btn-lg" id="cta-bottom-contact-btn">
                Contact Engineering Team
              </button>
            </div>
          </div>
          <div class="cta-graphic-col">
            <div class="cta-feature-list">
              <div class="cta-feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Automated DFM Toolpath Inspection</span>
              </div>
              <div class="cta-feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Full Mill Material Heat Lot Traceability (MTR)</span>
              </div>
              <div class="cta-feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Tolerances Verified by Zeiss CMM Metrology</span>
              </div>
              <div class="cta-feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>256-bit AES Encrypted File Security & NDA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.element = section;

    const quoteBtn = section.querySelector('#cta-bottom-quote-btn');
    const contactBtn = section.querySelector('#cta-bottom-contact-btn');

    quoteBtn.addEventListener('click', () => {
      if (this.quoteModal) this.quoteModal.open();
    });

    contactBtn.addEventListener('click', () => {
      if (this.contactModal) this.contactModal.open();
    });
  }
}
