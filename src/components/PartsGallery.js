import { galleryData } from '../data/galleryData.js';

export class PartsGallery {
  constructor(quoteModal) {
    this.quoteModal = quoteModal;
    this.element = null;
    this.activeFilter = 'all';
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'gallery';
    section.className = 'section-padding gallery-section';
    section.innerHTML = `
      <div class="container">
        <!-- Section Header -->
        <div class="section-header-block text-center">
          <div class="badge-accent-pill">Production Portfolio & Case Samples</div>
          <h2 class="section-headline">Manufactured Components Gallery</h2>
          <p class="section-lead-copy">
            Explore sample precision components machined, formed, printed, and molded at Sanand Fabrication facilities for aerospace, EV automotive, robotics, and medical applications.
          </p>

          <!-- Filter Pills -->
          <div class="gallery-filter-pills" id="gallery-filter-bar">
            <button type="button" class="g-pill active" data-gfilter="all">All Components (${galleryData.length})</button>
            <button type="button" class="g-pill" data-gfilter="CNC Milling">CNC Milling</button>
            <button type="button" class="g-pill" data-gfilter="CNC Turning">CNC Turning</button>
            <button type="button" class="g-pill" data-gfilter="Sheet Metal">Sheet Metal</button>
            <button type="button" class="g-pill" data-gfilter="3D Printing">3D Printing</button>
            <button type="button" class="g-pill" data-gfilter="Injection Molding">Injection Molding</button>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid" id="gallery-cards-container">
          ${this.renderGalleryCards(galleryData)}
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.element = section;
    this.attachEventListeners();
  }

  renderGalleryCards(parts) {
    return parts.map((part) => `
      <div class="gallery-part-card" data-category="${part.category}">
        <div class="part-card-preview">
          <!-- Engineering Wireframe Vector Graphic -->
          <div class="part-blueprint-mesh">
            <svg width="100%" height="160" viewBox="0 0 240 160" fill="none">
              <rect width="240" height="160" fill="#0b1324"/>
              <!-- Blueprint grid -->
              <defs>
                <pattern id="grid-${part.id}" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#1e293b" stroke-width="0.7"/>
                </pattern>
              </defs>
              <rect width="240" height="160" fill="url(#grid-${part.id})"/>
              <!-- Isometric Part Representation -->
              <path d="M120 35 L190 70 L120 105 L50 70 Z" stroke="#38bdf8" stroke-width="1.8" fill="#0284c7" fill-opacity="0.12"/>
              <path d="M50 70 L50 115 L120 150 L120 105 Z" stroke="#38bdf8" stroke-width="1.8" fill="#0284c7" fill-opacity="0.2"/>
              <path d="M190 70 L190 115 L120 150 L120 105 Z" stroke="#38bdf8" stroke-width="1.8" fill="#0284c7" fill-opacity="0.3"/>
              <!-- Cross-drilled bores and counterbores -->
              <ellipse cx="120" cy="70" rx="20" ry="10" stroke="#38bdf8" stroke-width="1.4" fill="#0b1324"/>
              <circle cx="85" cy="52" r="4" stroke="#38bdf8" stroke-width="1.2" fill="#0b1324"/>
              <circle cx="155" cy="52" r="4" stroke="#38bdf8" stroke-width="1.2" fill="#0b1324"/>
              <!-- Dimension callout lines -->
              <line x1="45" y1="65" x2="45" y2="120" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="2 2"/>
              <text x="18" y="96" fill="#94a3b8" font-size="8" font-family="monospace">H: 45mm</text>
            </svg>
          </div>
          <div class="part-badges-strip">
            <span class="part-process-badge">${part.process}</span>
            <span class="part-mat-badge">${part.material}</span>
          </div>
        </div>

        <div class="part-card-content">
          <div class="part-ind-label">${part.industry}</div>
          <h3 class="part-card-title">${part.title}</h3>
          <p class="part-card-desc">${part.description}</p>

          <div class="part-specs-row">
            <div class="p-spec">
              <span class="p-k">Achieved Tol:</span>
              <span class="p-v">${part.tolerance}</span>
            </div>
            <div class="p-spec">
              <span class="p-k">Finish:</span>
              <span class="p-v">${part.finish}</span>
            </div>
            <div class="p-spec">
              <span class="p-k">Envelope:</span>
              <span class="p-v">${part.dimensions}</span>
            </div>
          </div>

          <div class="part-card-action mt-3">
            <button type="button" class="btn btn-outline btn-sm w-100 quote-similar-part-btn" data-material="${part.material}">
              Quote Similar Component
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  attachEventListeners() {
    const pills = this.element.querySelectorAll('.g-pill');
    const cards = this.element.querySelectorAll('.gallery-part-card');

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = pill.getAttribute('data-gfilter');

        cards.forEach((card) => {
          const cat = card.getAttribute('data-category');
          if (filterVal === 'all' || cat === filterVal) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    this.element.addEventListener('click', (e) => {
      const btn = e.target.closest('.quote-similar-part-btn');
      if (btn && this.quoteModal) {
        this.quoteModal.open();
      }
    });
  }
}
