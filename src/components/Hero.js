import { CadViewer3D } from './CadViewer3D.js';

export class Hero {
  constructor(quoteModal, serviceModal) {
    this.quoteModal = quoteModal;
    this.serviceModal = serviceModal;
    this.heroElement = null;
    this.heroCadViewer = null;
    this.uploadedHeroFiles = [];
    this.currentSamplePart = 'manifold';
    this.init();
  }

  init() {
    this.render();
    this.initHeroCadViewer();
    this.attachEventListeners();
  }

  render() {
    const heroSection = document.createElement('section');
    heroSection.id = 'hero-section';
    heroSection.className = 'hero-section';
    heroSection.innerHTML = `
      <div class="hero-tech-bg">
        <div class="hero-grid-mesh"></div>
        <div class="hero-radial-glow glow-blue"></div>
        <div class="hero-radial-glow glow-cyan"></div>
      </div>

      <div class="container hero-container">
        <!-- Left: Value Proposition -->
        <div class="hero-text-side">
          <div class="hero-pill-tag">
            <span class="live-dot"></span>
            <span>Digital Manufacturing Platform • Direct CNC & 3D Print Network</span>
          </div>

          <h1 class="hero-headline">
            On-Demand Manufacturing <span class="gradient-text">for Your Next Big Idea</span>
          </h1>

          <p class="hero-subtext">
            Instant quotation, automated DFM toolpath analysis, and high-precision production from prototype to 100,000+ parts. 5-Axis CNC machining, additive manufacturing, sheet metal, and injection molding.
          </p>

          <div class="hero-buttons-row">
            <button type="button" class="btn btn-primary btn-lg" id="hero-primary-quote-btn">
              <span>Get an Instant Quote</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <a href="#services" class="btn btn-secondary btn-lg" id="hero-explore-services-btn">
              Explore Capabilities
            </a>
          </div>

          <!-- Trust Badges Row -->
          <div class="hero-stats-strip">
            <div class="h-stat-card">
              <span class="h-stat-num">±0.001"</span>
              <span class="h-stat-label">Precision Tolerances (0.025mm)</span>
            </div>
            <div class="h-stat-sep"></div>
            <div class="h-stat-card">
              <span class="h-stat-num">70+</span>
              <span class="h-stat-label">Certified Metals & Plastics</span>
            </div>
            <div class="h-stat-sep"></div>
            <div class="h-stat-card">
              <span class="h-stat-num">3 Days</span>
              <span class="h-stat-label">Fast-Turn Expedited Lead Time</span>
            </div>
          </div>
        </div>

        <!-- Right: Instant Quoting Engine (IQE) Widget -->
        <div class="hero-widget-side">
          <div class="iqe-widget-card">
            <!-- Widget Top Header -->
            <div class="iqe-card-header">
              <div class="iqe-title-row">
                <div class="iqe-badge">INSTANT QUOTING ENGINE (IQE)</div>
                <div class="iqe-secure-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#12b76a" stroke-width="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>256-Bit Encrypted • Mutual NDA</span>
                </div>
              </div>

              <!-- Widget Mode Selector: Upload CAD vs Try Sample Part -->
              <div class="iqe-tab-switcher">
                <button type="button" class="iqe-tab-btn active" id="tab-upload-cad">
                  Upload 3D CAD
                </button>
                <button type="button" class="iqe-tab-btn" id="tab-sample-part">
                  Inspect Sample CAD Model
                </button>
              </div>
            </div>

            <!-- 3D Interactive CAD Preview Viewport -->
            <div class="iqe-viewport-container">
              <div class="iqe-3d-canvas" id="hero-cad-canvas-box"></div>
              
              <!-- Floating Overlay with View Controls & Specs -->
              <div class="iqe-view-controls">
                <button type="button" class="iqe-ctrl-btn active" data-view="iso">ISO</button>
                <button type="button" class="iqe-ctrl-btn" data-view="top">TOP</button>
                <button type="button" class="iqe-ctrl-btn" data-view="front">FRONT</button>
              </div>

              <div class="iqe-model-tag">
                <span class="model-name-text" id="iqe-model-title">Hydraulic_Manifold_v2.step</span>
                <span class="model-spec-val">124.5 × 82.0 × 45.0 mm • 168.4 cm³</span>
              </div>
            </div>

            <!-- Automated DFM Telemetry Bar -->
            <div class="iqe-dfm-telemetry">
              <div class="dfm-check-item">
                <span class="dfm-icon-check">✓</span>
                <span>Geometry Validated</span>
              </div>
              <div class="dfm-check-item">
                <span class="dfm-icon-check">✓</span>
                <span>Tolerances Feasible (±0.001")</span>
              </div>
              <div class="dfm-check-item">
                <span class="dfm-icon-check">✓</span>
                <span>Zero Toolpath Clashes</span>
              </div>
            </div>

            <!-- Drag and Drop Dropzone -->
            <div class="iqe-dropzone" id="hero-dropzone">
              <input type="file" id="hero-file-input" multiple accept=".step,.stp,.stl,.iges,.igs,.dxf,.dwg,.pdf" style="display: none;" />
              <div class="dropzone-text-row">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span><strong>Drag & Drop 3D CAD</strong> or <button type="button" class="btn-link" id="hero-browse-link">browse</button> (.STEP, .STL, .IGES, .DXF, .PDF)</span>
              </div>
            </div>

            <!-- Sample Part Selector Tray (when Sample Part tab active) -->
            <div class="iqe-sample-parts-tray" id="iqe-sample-parts-tray" style="display: none;">
              <span class="tray-label">Choose sample component to test quoting engine:</span>
              <div class="sample-part-chips">
                <button type="button" class="sample-chip active" data-sample="manifold">
                  Hydraulic Manifold (Al 6061)
                </button>
                <button type="button" class="sample-chip" data-sample="bracket">
                  Aerospace Bracket (Ti-6Al-4V)
                </button>
                <button type="button" class="sample-chip" data-sample="enclosure">
                  Electronics Bezel (Delrin POM)
                </button>
              </div>
            </div>

            <!-- Uploaded File Queue Tray -->
            <div class="iqe-files-tray" id="hero-files-tray" style="display: none;"></div>

            <!-- Action Button -->
            <button type="button" class="btn btn-primary w-100 iqe-quote-btn" id="hero-continue-quote-btn">
              <span>Configure Specifications & Get Instant Quote</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <!-- Bottom Disclaimer -->
            <div class="iqe-footer-note">
              <span>✦ Direct factory sourcing • Real-time volume pricing tiers • Dedicated DFM applications engineers</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Industrial Client Credentials Strip -->
      <div class="client-credentials-strip">
        <div class="container strip-container">
          <span class="strip-label">MANUFACTURING FOR TEAMS IN:</span>
          <div class="strip-sectors">
            <span class="sector-tag">🚀 Aerospace & Flight Systems</span>
            <span class="sector-tag">⚡ EV & Automotive Propulsion</span>
            <span class="sector-tag">🤖 Robotics & Industrial Automation</span>
            <span class="sector-tag">🧬 Medical Devices & Diagnostics</span>
            <span class="sector-tag">🛰️ Defense & Telecommunications</span>
          </div>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(heroSection);
    this.heroElement = heroSection;
  }

  initHeroCadViewer() {
    const canvasContainer = this.heroElement.querySelector('#hero-cad-canvas-box');
    if (canvasContainer) {
      this.heroCadViewer = new CadViewer3D(canvasContainer, {
        initialMaterial: 'aluminum',
        autoRotate: true
      });
    }
  }

  attachEventListeners() {
    const quoteBtn = this.heroElement.querySelector('#hero-primary-quote-btn');
    const continueBtn = this.heroElement.querySelector('#hero-continue-quote-btn');
    const dropzone = this.heroElement.querySelector('#hero-dropzone');
    const fileInput = this.heroElement.querySelector('#hero-file-input');
    const browseLink = this.heroElement.querySelector('#hero-browse-link');

    quoteBtn.addEventListener('click', () => {
      this.quoteModal.open({
        initialFiles: this.uploadedHeroFiles.length > 0 ? this.uploadedHeroFiles : undefined
      });
    });

    continueBtn.addEventListener('click', () => {
      this.quoteModal.open({
        initialFiles: this.uploadedHeroFiles.length > 0 ? this.uploadedHeroFiles : undefined
      });
    });

    browseLink.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });

    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.handleFiles(e.dataTransfer.files);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        this.handleFiles(e.target.files);
      }
    });

    // View control buttons
    const ctrlBtns = this.heroElement.querySelectorAll('.iqe-ctrl-btn');
    ctrlBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        ctrlBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (this.heroCadViewer) {
          this.heroCadViewer.setViewPreset(btn.getAttribute('data-view'));
        }
      });
    });

    // Tabs: Upload vs Sample Part
    const tabUpload = this.heroElement.querySelector('#tab-upload-cad');
    const tabSample = this.heroElement.querySelector('#tab-sample-part');
    const dropzoneBox = this.heroElement.querySelector('#hero-dropzone');
    const sampleTray = this.heroElement.querySelector('#iqe-sample-parts-tray');
    const modelTitle = this.heroElement.querySelector('#iqe-model-title');

    tabUpload.addEventListener('click', () => {
      tabUpload.classList.add('active');
      tabSample.classList.remove('active');
      dropzoneBox.style.display = 'block';
      sampleTray.style.display = 'none';
    });

    tabSample.addEventListener('click', () => {
      tabSample.classList.add('active');
      tabUpload.classList.remove('active');
      dropzoneBox.style.display = 'none';
      sampleTray.style.display = 'block';
    });

    // Sample Part Chips
    const sampleChips = this.heroElement.querySelectorAll('.sample-chip');
    sampleChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        sampleChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const sampleType = chip.getAttribute('data-sample');
        this.currentSamplePart = sampleType;

        if (sampleType === 'manifold') {
          modelTitle.textContent = 'Hydraulic_Manifold_v2.step';
          if (this.heroCadViewer) this.heroCadViewer.updateMaterial('aluminum');
        } else if (sampleType === 'bracket') {
          modelTitle.textContent = 'Aerospace_Bracket_Ti.step';
          if (this.heroCadViewer) this.heroCadViewer.updateMaterial('titanium');
        } else if (sampleType === 'enclosure') {
          modelTitle.textContent = 'Electronics_Bezel_POM.step';
          if (this.heroCadViewer) this.heroCadViewer.updateMaterial('delrin');
        }
      });
    });
  }

  handleFiles(files) {
    Array.from(files).forEach((file) => {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const ext = file.name.split('.').pop().toUpperCase();
      this.uploadedHeroFiles.push({
        name: file.name,
        size: `${sizeMb} MB`,
        type: `${ext} Model`,
        status: 'Validated',
        dimensions: '110.0 × 75.0 × 38.0 mm',
        volume: '142.0 cm³'
      });
    });

    this.renderHeroFiles();
  }

  renderHeroFiles() {
    const tray = this.heroElement.querySelector('#hero-files-tray');
    if (!tray) return;

    if (this.uploadedHeroFiles.length === 0) {
      tray.style.display = 'none';
      return;
    }

    tray.style.display = 'block';
    tray.innerHTML = `
      <div class="tray-title">Queued CAD Files (${this.uploadedHeroFiles.length}):</div>
      ${this.uploadedHeroFiles.map((f, i) => `
        <div class="tray-file-item">
          <span>📁 <strong>${f.name}</strong> (${f.size})</span>
          <span class="badge-success-tag">Ready</span>
        </div>
      `).join('')}
    `;
  }
}
