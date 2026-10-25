export class HowItWorks {
  constructor(quoteModal) {
    this.quoteModal = quoteModal;
    this.element = null;
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'how-it-works';
    section.className = 'section-padding how-it-works-section';
    section.innerHTML = `
      <div class="container">
        <!-- Section Header -->
        <div class="section-header-block text-center">
          <div class="badge-accent-pill">Transparent Digital Workflow</div>
          <h2 class="section-headline">How On-Demand Manufacturing Works at Sanand Fabrication</h2>
          <p class="section-lead-copy">
            We streamline the custom hardware sourcing journey from CAD upload to doorstep delivery with automated DFM checks, expert engineering oversight, and real-time order tracking.
          </p>
        </div>

        <!-- 6 Steps Interactive Timeline -->
        <div class="workflow-steps-grid">
          <!-- Step 1 -->
          <div class="workflow-step-card">
            <div class="step-card-num-badge">01</div>
            <div class="step-card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <h3 class="step-card-title">Upload Your 3D CAD</h3>
            <p class="step-card-desc">
              Drop your STEP, STL, or IGES model into our secure portal. Accompanying 2D PDF drawings detail critical tolerances, tapped threads, and surface finishes.
            </p>
            <div class="step-sub-note">Instant mesh analysis & 3D inspection</div>
          </div>

          <!-- Step 2 -->
          <div class="workflow-step-card">
            <div class="step-card-num-badge">02</div>
            <div class="step-card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
            </div>
            <h3 class="step-card-title">Configure Specifications</h3>
            <p class="step-card-desc">
              Select process, alloy (e.g. Al 6061, Stainless 316L, Delrin, Titanium), quantity tiers, surface finishing, and required quality inspection certificates.
            </p>
            <div class="step-sub-note">Real-time volume discount scaling</div>
          </div>

          <!-- Step 3 -->
          <div class="workflow-step-card">
            <div class="step-card-num-badge">03</div>
            <div class="step-card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 class="step-card-title">DFM Review & Quote</h3>
            <p class="step-card-desc">
              Our applications engineering team evaluates internal pocket radii, wall thicknesses, and tool access within 2 hours, returning a verified price and locked lead time.
            </p>
            <div class="step-sub-note">No surprise re-quotes or hidden tooling fees</div>
          </div>

          <!-- Step 4 -->
          <div class="workflow-step-card">
            <div class="step-card-num-badge">04</div>
            <div class="step-card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 class="step-card-title">Approve & Queue Order</h3>
            <p class="step-card-desc">
              Review line items, confirm tolerances and delivery address, and release your PO or payment. Raw material billet and CNC spindles are scheduled immediately.
            </p>
            <div class="step-sub-note">Transparent PO & corporate billing terms</div>
          </div>

          <!-- Step 5 -->
          <div class="workflow-step-card">
            <div class="step-card-num-badge">05</div>
            <div class="step-card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <h3 class="step-card-title">Precision Manufacturing</h3>
            <p class="step-card-desc">
              Your components are machined on calibrated CNC centers or sintered on additive machines. In-process inspection monitors tool wear and dimensions.
            </p>
            <div class="step-sub-note">High precision down to ±0.001"</div>
          </div>

          <!-- Step 6 -->
          <div class="workflow-step-card">
            <div class="step-card-num-badge">06</div>
            <div class="step-card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h3 class="step-card-title">CMM Metrology & Delivery</h3>
            <p class="step-card-desc">
              Final quality control on Zeiss CMMs, surface finish Ra measurement, protective vacuum packaging, and courier dispatch with tracking and CoC/MTR docs.
            </p>
            <div class="step-sub-note">Track order in real-time portal</div>
          </div>
        </div>

        <!-- Workflow CTA Banner -->
        <div class="workflow-cta-banner mt-5 text-center">
          <h3>Ready to start step 1 with your CAD model?</h3>
          <p class="text-secondary mb-3">Upload your files now to receive automated geometry feedback and instant pricing.</p>
          <button type="button" class="btn btn-primary btn-lg" id="workflow-start-btn">
            Upload CAD Files for Quotation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.element = section;

    const startBtn = section.querySelector('#workflow-start-btn');
    startBtn.addEventListener('click', () => {
      if (this.quoteModal) this.quoteModal.open();
    });
  }
}
