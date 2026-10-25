export class RfqTracker {
  constructor(quoteModal) {
    this.quoteModal = quoteModal;
    this.element = null;
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'rfq-tracker-section';
    section.className = 'section-padding rfq-tracker-section';
    section.innerHTML = `
      <div class="container">
        <div class="tracker-card-wrapper">
          <div class="tracker-header text-center">
            <span class="badge-accent-pill">Real-Time Portal</span>
            <h2 class="section-headline">Track Your Quotation & Production Status</h2>
            <p class="section-lead-copy max-w-700 mx-auto">
              Enter your Sanand Fabrication quotation reference code (e.g., <strong>SND-2026-8942</strong>) to inspect live engineering DFM review status, spindle machining progress, and CMM metrology inspection logs.
            </p>

            <form class="tracker-search-form" id="tracker-form">
              <div class="tracker-input-group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tracker-icon">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" id="tracker-input" class="form-control" placeholder="Enter RFQ Reference (e.g. SND-2026-8942)..." value="SND-2026-8942" required />
                <button type="submit" class="btn btn-primary" id="tracker-submit-btn">
                  Lookup Status
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <!-- Dynamic Status Result Container -->
          <div class="tracker-result-box" id="tracker-result-box">
            ${this.renderResultHtml('SND-2026-8942')}
          </div>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.element = section;
    this.attachEventListeners();
  }

  renderResultHtml(rfqCode) {
    return `
      <div class="rfq-status-dashboard">
        <div class="dashboard-header-bar">
          <div>
            <span class="d-ref">RFQ TRACKING: <strong>${rfqCode}</strong></span>
            <span class="badge-status-pill badge-active">Active • Applications Engineering Review</span>
          </div>
          <div class="d-meta">
            <span>Customer: <strong>Apex Robotics Corp</strong></span>
            <span>•</span>
            <span>Target Ship: <strong>Nov 02, 2026</strong></span>
          </div>
        </div>

        <!-- 5-Stage Visual Progress Bar -->
        <div class="tracker-milestones-row">
          <div class="milestone-col completed">
            <div class="milestone-dot">✓</div>
            <span class="milestone-title">CAD Uploaded</span>
            <span class="milestone-date">Oct 25, 17:14</span>
          </div>
          <div class="milestone-col in-progress">
            <div class="milestone-dot">2</div>
            <span class="milestone-title">DFM Review</span>
            <span class="milestone-date">In Progress (85%)</span>
          </div>
          <div class="milestone-col">
            <div class="milestone-dot">3</div>
            <span class="milestone-title">Quote Approved</span>
            <span class="milestone-date">Pending Release</span>
          </div>
          <div class="milestone-col">
            <div class="milestone-dot">4</div>
            <span class="milestone-title">CNC Spindle Active</span>
            <span class="milestone-date">Scheduled</span>
          </div>
          <div class="milestone-col">
            <div class="milestone-dot">5</div>
            <span class="milestone-title">CMM Metrology & Ship</span>
            <span class="milestone-date">Final Step</span>
          </div>
        </div>

        <!-- Details Card -->
        <div class="rfq-details-summary mt-4">
          <div class="summary-cell">
            <span class="s-k">Part Geometry:</span>
            <span class="s-v">Hydraulic_Manifold_v2.step (124.5 × 82.0 × 45.0 mm)</span>
          </div>
          <div class="summary-cell">
            <span class="s-k">Process & Alloy:</span>
            <span class="s-v">5-Axis CNC Milling • Aluminum 6061-T6</span>
          </div>
          <div class="summary-cell">
            <span class="s-k">Finishing & Tol:</span>
            <span class="s-v">Anodize Type II Blue • ±0.001" (0.025 mm)</span>
          </div>
          <div class="summary-cell">
            <span class="s-k">Assigned Engineer:</span>
            <span class="s-v">Marcus Vance, Lead CAM Applications</span>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const form = this.element.querySelector('#tracker-form');
    const input = this.element.querySelector('#tracker-input');
    const resultBox = this.element.querySelector('#tracker-result-box');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = input.value.trim().toUpperCase() || 'SND-2026-8942';
      resultBox.innerHTML = `
        <div class="text-center py-4">
          <div class="spinner-border mb-2"></div>
          <p class="text-secondary text-sm">Querying Sanand Fabrication Metrology & Machine Telemetry Database...</p>
        </div>
      `;
      setTimeout(() => {
        resultBox.innerHTML = this.renderResultHtml(code);
      }, 500);
    });
  }
}
