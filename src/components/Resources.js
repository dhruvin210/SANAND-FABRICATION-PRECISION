import { guidesData } from '../data/guidesData.js';

export class Resources {
  constructor() {
    this.element = null;
    this.readerModal = null;
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'resources';
    section.className = 'section-padding resources-section';
    section.innerHTML = `
      <div class="container">
        <!-- Section Header -->
        <div class="section-header-block text-center">
          <div class="badge-accent-pill">Engineering Whitepapers & Guides</div>
          <h2 class="section-headline">Design for Manufacturability (DFM) Resources</h2>
          <p class="section-lead-copy">
            Reduce machining cycle time, eliminate tooling chatter, and master sheet metal bend deductions with our engineering whitepapers and design rules.
          </p>
        </div>

        <!-- Guides Cards Grid -->
        <div class="guides-grid">
          ${guidesData.map(guide => `
            <div class="guide-card" data-guide-id="${guide.id}">
              <div class="guide-card-top">
                <span class="guide-cat-badge">${guide.category}</span>
                <span class="guide-read-time">${guide.readTime}</span>
              </div>
              <h3 class="guide-title">${guide.title}</h3>
              <p class="guide-summary">${guide.summary}</p>
              <div class="guide-card-bottom">
                <button type="button" class="btn-link read-guide-btn" data-guide-id="${guide.id}">
                  Read Full Engineering Guide →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.element = section;
    this.createReaderModal();
    this.attachEventListeners();
  }

  createReaderModal() {
    const modal = document.createElement('div');
    modal.id = 'guide-reader-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog guide-modal-dialog" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-subtitle" id="guide-modal-cat">DFM Guide</span>
            <h2 id="guide-modal-title" class="modal-title">Engineering Guide</h2>
          </div>
          <button type="button" class="modal-close-btn" id="guide-modal-close" aria-label="Close dialog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body guide-modal-body" id="guide-modal-content"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="guide-modal-dismiss">Close Article</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    this.readerModal = modal;

    const closeBtn = modal.querySelector('#guide-modal-close');
    const dismissBtn = modal.querySelector('#guide-modal-dismiss');
    closeBtn.addEventListener('click', () => this.closeReader());
    dismissBtn.addEventListener('click', () => this.closeReader());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeReader();
    });
  }

  openReader(guideId) {
    const guide = guidesData.find(g => g.id === guideId);
    if (!guide) return;

    this.readerModal.querySelector('#guide-modal-cat').textContent = guide.category;
    this.readerModal.querySelector('#guide-modal-title').textContent = guide.title;

    const contentBox = this.readerModal.querySelector('#guide-modal-content');
    contentBox.innerHTML = `
      <div class="guide-article-lead mb-4">
        <p class="text-secondary"><strong>Overview:</strong> ${guide.summary}</p>
      </div>
      <div class="guide-sections-stack">
        ${guide.sections.map(sec => `
          <div class="guide-article-section mb-4">
            <h4 class="guide-sec-title">${sec.heading}</h4>
            <p class="guide-sec-text">${sec.text}</p>
          </div>
        `).join('')}
      </div>
    `;

    this.readerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeReader() {
    this.readerModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  attachEventListeners() {
    this.element.addEventListener('click', (e) => {
      const btn = e.target.closest('.read-guide-btn');
      if (btn) {
        const guideId = btn.getAttribute('data-guide-id');
        this.openReader(guideId);
      }
    });
  }
}
