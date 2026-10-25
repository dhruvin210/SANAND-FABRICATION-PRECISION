import { CadViewer3D } from './CadViewer3D.js';

export class QuoteModal {
  constructor() {
    this.modalElement = null;
    this.currentStep = 1;
    this.cadViewer = null;

    // Quotation state
    this.quoteState = {
      files: [
        {
          name: 'manifold_hydraulic_v2.step',
          size: '14.2 MB',
          type: 'STEP CAD',
          status: 'Validated',
          dimensions: '124.5 × 82.0 × 45.0 mm',
          volume: '168.4 cm³'
        }
      ],
      process: 'cnc-milling',
      material: 'al-6061',
      quantity: 5,
      finish: 'anodize-type-ii',
      tolerance: 'precision-002',
      hasThreads: true,
      certifications: {
        coc: true,
        cmm: false,
        mtr: true,
        fai: false
      },
      speed: 'standard',
      notes: '',
      customer: {
        fullName: '',
        company: '',
        email: '',
        phone: '',
        country: 'United States',
        postalCode: '',
        address: '',
        deadline: ''
      },
      rfqId: null
    };

    this.init();
  }

  init() {
    this.createModalHtml();
    this.attachEventListeners();
  }

  createModalHtml() {
    const modal = document.createElement('div');
    modal.id = 'quote-modal-backdrop';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog quote-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-subtitle">Instant Quoting & RFQ Engine</span>
            <h2 id="modal-title" class="modal-title">Configure Manufacturing Quote</h2>
          </div>
          <button type="button" class="modal-close-btn" id="quote-modal-close" aria-label="Close dialog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Multi-step Stepper -->
        <div class="quote-stepper-bar">
          <div class="stepper-step active" data-step="1">
            <div class="step-num">1</div>
            <span class="step-label">Upload CAD</span>
          </div>
          <div class="stepper-connector"></div>
          <div class="stepper-step" data-step="2">
            <div class="step-num">2</div>
            <span class="step-label">Specifications</span>
          </div>
          <div class="stepper-connector"></div>
          <div class="stepper-step" data-step="3">
            <div class="step-num">3</div>
            <span class="step-label">Customer Info</span>
          </div>
          <div class="stepper-connector"></div>
          <div class="stepper-step" data-step="4">
            <div class="step-num">4</div>
            <span class="step-label">Review & Pricing</span>
          </div>
          <div class="stepper-connector"></div>
          <div class="stepper-step" data-step="5">
            <div class="step-num">5</div>
            <span class="step-label">Confirmation</span>
          </div>
        </div>

        <!-- Modal Body: Step Container -->
        <div class="modal-body quote-modal-body" id="quote-step-content">
          <!-- Dynamic Step Content Rendered Here -->
        </div>

        <!-- Modal Footer Navigation -->
        <div class="modal-footer quote-modal-footer">
          <button type="button" class="btn btn-secondary" id="quote-prev-btn" style="display: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back
          </button>
          <div class="footer-spacer"></div>
          <button type="button" class="btn btn-primary" id="quote-next-btn">
            Continue to Specifications
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalElement = modal;
  }

  attachEventListeners() {
    const closeBtn = this.modalElement.querySelector('#quote-modal-close');
    closeBtn.addEventListener('click', () => this.close());

    // Click outside backdrop
    this.modalElement.addEventListener('click', (e) => {
      if (e.target === this.modalElement) {
        this.close();
      }
    });

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    const nextBtn = this.modalElement.querySelector('#quote-next-btn');
    const prevBtn = this.modalElement.querySelector('#quote-prev-btn');

    nextBtn.addEventListener('click', () => this.handleNext());
    prevBtn.addEventListener('click', () => this.handlePrev());
  }

  open(initialConfig = {}) {
    if (initialConfig.process) {
      this.quoteState.process = initialConfig.process;
    }
    if (initialConfig.initialFiles && initialConfig.initialFiles.length > 0) {
      this.quoteState.files = initialConfig.initialFiles;
    }

    this.currentStep = 1;
    this.modalElement.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.renderStep();
  }

  close() {
    this.modalElement.classList.remove('active');
    document.body.style.overflow = '';
    if (this.cadViewer) {
      this.cadViewer.destroy();
      this.cadViewer = null;
    }
  }

  isOpen() {
    return this.modalElement.classList.contains('active');
  }

  renderStep() {
    const stepContainer = this.modalElement.querySelector('#quote-step-content');
    const prevBtn = this.modalElement.querySelector('#quote-prev-btn');
    const nextBtn = this.modalElement.querySelector('#quote-next-btn');
    const steps = this.modalElement.querySelectorAll('.stepper-step');

    // Update Stepper Bar UI
    steps.forEach((stepEl) => {
      const stepIndex = parseInt(stepEl.getAttribute('data-step'), 10);
      stepEl.classList.remove('active', 'completed');
      if (stepIndex === this.currentStep) {
        stepEl.classList.add('active');
      } else if (stepIndex < this.currentStep) {
        stepEl.classList.add('completed');
      }
    });

    // Cleanup previous 3D viewer if moving away from Step 1
    if (this.cadViewer && this.currentStep !== 1) {
      this.cadViewer.destroy();
      this.cadViewer = null;
    }

    // Render Step Content
    switch (this.currentStep) {
      case 1:
        stepContainer.innerHTML = this.renderStep1Html();
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';
        nextBtn.innerHTML = `
          Continue to Specifications
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        `;
        this.initStep1Logic();
        break;

      case 2:
        stepContainer.innerHTML = this.renderStep2Html();
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'inline-flex';
        nextBtn.innerHTML = `
          Continue to Customer Info
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        `;
        this.initStep2Logic();
        break;

      case 3:
        stepContainer.innerHTML = this.renderStep3Html();
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'inline-flex';
        nextBtn.innerHTML = `
          Review Quotation Breakdown
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        `;
        this.initStep3Logic();
        break;

      case 4:
        stepContainer.innerHTML = this.renderStep4Html();
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'inline-flex';
        nextBtn.innerHTML = `
          Submit RFQ for Engineering Review
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        `;
        this.initStep4Logic();
        break;

      case 5:
        stepContainer.innerHTML = this.renderStep5Html();
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        this.initStep5Logic();
        break;
    }
  }

  /* ----------------------------------------------------
     STEP 1: Upload CAD Files & 3D Geometry
  ---------------------------------------------------- */
  renderStep1Html() {
    return `
      <div class="step-layout-split">
        <!-- Left Column: Upload Dropzone & File List -->
        <div class="step-col-left">
          <div class="section-title-small">CAD File Upload</div>
          <p class="text-secondary mb-3">Upload your native 3D CAD files (.STEP, .STP, .STL, .IGES, .DXF, .PDF). Max 100 MB per file.</p>

          <!-- Drag and Drop Box -->
          <div class="quote-dropzone" id="quote-dropzone">
            <input type="file" id="quote-file-input" multiple accept=".step,.stp,.stl,.iges,.igs,.dxf,.dwg,.pdf" style="display: none;" />
            <div class="dropzone-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div class="dropzone-text">
              <strong>Drag & drop your 3D CAD models here</strong>
              <span>or <button type="button" class="btn-link" id="quote-browse-btn">browse files from computer</button></span>
            </div>
            <div class="file-badges-row">
              <span class="file-badge">.STEP</span>
              <span class="file-badge">.STP</span>
              <span class="file-badge">.STL</span>
              <span class="file-badge">.IGES</span>
              <span class="file-badge">.DXF</span>
              <span class="file-badge">.PDF Drawings</span>
            </div>
          </div>

          <!-- Active Uploaded Files List -->
          <div class="uploaded-files-container mt-4">
            <div class="d-flex justify-between align-center mb-2">
              <span class="label-bold">Uploaded CAD Models (${this.quoteState.files.length})</span>
              <span class="text-muted text-xs">Automated Geometry Analysis Ready</span>
            </div>
            <div class="files-list" id="files-list-rendered">
              ${this.quoteState.files.map((file, idx) => `
                <div class="file-item-card" data-index="${idx}">
                  <div class="file-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <div class="file-info-col">
                    <div class="file-name-row">
                      <span class="file-name">${file.name}</span>
                      <span class="badge-success-tag">${file.status}</span>
                    </div>
                    <div class="file-meta-row">
                      <span>Size: ${file.size}</span>
                      <span>•</span>
                      <span>Dim: ${file.dimensions}</span>
                      <span>•</span>
                      <span>Vol: ${file.volume}</span>
                    </div>
                  </div>
                  <button type="button" class="file-remove-btn" data-index="${idx}" title="Remove file">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- NDA & IP Security Assurance -->
          <div class="security-banner mt-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <div>
              <strong>Secure Intellectual Property Handling</strong>
              <p class="text-xs text-secondary mb-0">Files are encrypted with 256-bit AES. Never shared publicly. Automatic NDA protection applies to all quotation submissions.</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Interactive 3D CAD Inspection Viewer -->
        <div class="step-col-right">
          <div class="cad-viewer-header">
            <div>
              <span class="cad-viewer-title">Interactive 3D CAD Geometry</span>
              <span class="cad-viewer-status">● Live WebGL Mesh Inspection</span>
            </div>
            <div class="viewer-view-pills">
              <button type="button" class="view-pill active" data-view="iso">ISO</button>
              <button type="button" class="view-pill" data-view="top">TOP</button>
              <button type="button" class="view-pill" data-view="front">FRONT</button>
              <button type="button" class="view-pill" data-view="right">RIGHT</button>
            </div>
          </div>

          <!-- Three.js Canvas Container -->
          <div class="cad-canvas-box" id="quote-cad-canvas-container"></div>

          <!-- Viewer Control Bar -->
          <div class="cad-viewer-toolbar">
            <div class="toolbar-group">
              <span class="toolbar-label">Shading:</span>
              <button type="button" class="toolbar-btn active" data-shading="metallic">Metallic PBR</button>
              <button type="button" class="toolbar-btn" data-shading="wireframe">Wireframe</button>
              <button type="button" class="toolbar-btn" data-shading="xray">X-Ray</button>
            </div>
            <div class="toolbar-group">
              <span class="toolbar-label">Finish:</span>
              <select id="viewer-mat-select" class="toolbar-select">
                <option value="aluminum">Aluminum 6061-T6</option>
                <option value="stainless">Stainless 304 Lustre</option>
                <option value="anodize-blue">Anodized Blue</option>
                <option value="anodize-black">Anodized Black</option>
                <option value="titanium">Titanium Ti-6Al-4V</option>
                <option value="delrin">Delrin Black POM</option>
              </select>
            </div>
          </div>

          <!-- Automated Engineering Dimensions Panel -->
          <div class="cad-specs-summary-bar">
            <div class="spec-cell">
              <span class="spec-cell-label">Bounding Box:</span>
              <span class="spec-cell-value">124.5 × 82.0 × 45.0 mm</span>
            </div>
            <div class="spec-cell">
              <span class="spec-cell-label">Solid Volume:</span>
              <span class="spec-cell-value">168.4 cm³</span>
            </div>
            <div class="spec-cell">
              <span class="spec-cell-label">Raw Billet Wt:</span>
              <span class="spec-cell-value">~0.455 kg (Al 6061)</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initStep1Logic() {
    const dropzone = this.modalElement.querySelector('#quote-dropzone');
    const fileInput = this.modalElement.querySelector('#quote-file-input');
    const browseBtn = this.modalElement.querySelector('#quote-browse-btn');

    browseBtn.addEventListener('click', (e) => {
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
        this.handleFileUpload(e.dataTransfer.files);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        this.handleFileUpload(e.target.files);
      }
    });

    // Remove file listener
    const removeBtns = this.modalElement.querySelectorAll('.file-remove-btn');
    removeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        this.quoteState.files.splice(idx, 1);
        this.renderStep();
      });
    });

    // Initialize Three.js CAD Viewer on right side
    const canvasContainer = this.modalElement.querySelector('#quote-cad-canvas-container');
    if (canvasContainer) {
      this.cadViewer = new CadViewer3D(canvasContainer, {
        initialMaterial: 'aluminum',
        autoRotate: true
      });

      // View presets
      const viewPills = this.modalElement.querySelectorAll('.view-pill');
      viewPills.forEach((pill) => {
        pill.addEventListener('click', () => {
          viewPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.cadViewer.setViewPreset(pill.getAttribute('data-view'));
        });
      });

      // Shading controls
      const shadingBtns = this.modalElement.querySelectorAll('[data-shading]');
      shadingBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          shadingBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.cadViewer.setShadingMode(btn.getAttribute('data-shading'));
        });
      });

      // Material selector
      const matSelect = this.modalElement.querySelector('#viewer-mat-select');
      matSelect.addEventListener('change', (e) => {
        this.cadViewer.updateMaterial(e.target.value);
      });
    }
  }

  handleFileUpload(files) {
    Array.from(files).forEach((file) => {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const ext = file.name.split('.').pop().toUpperCase();
      this.quoteState.files.push({
        name: file.name,
        size: `${sizeMb} MB`,
        type: `${ext} Model`,
        status: 'Validated',
        dimensions: '110.0 × 75.0 × 38.0 mm',
        volume: '142.0 cm³'
      });
    });
    this.renderStep();
  }

  /* ----------------------------------------------------
     STEP 2: Manufacturing Requirements & Specifications
  ---------------------------------------------------- */
  renderStep2Html() {
    return `
      <div class="step-specs-form">
        <div class="row-2-col">
          <!-- Left Specs Column -->
          <div class="form-col">
            <!-- 1. Process Selection -->
            <div class="form-group mb-4">
              <label class="form-label">1. Primary Manufacturing Process *</label>
              <div class="process-radio-grid">
                <label class="process-radio-card ${this.quoteState.process === 'cnc-milling' ? 'selected' : ''}">
                  <input type="radio" name="spec-process" value="cnc-milling" ${this.quoteState.process === 'cnc-milling' ? 'checked' : ''} />
                  <div class="card-radio-content">
                    <span class="process-name">CNC Milling</span>
                    <span class="process-sub">3, 4 & 5-Axis Precision</span>
                  </div>
                </label>
                <label class="process-radio-card ${this.quoteState.process === 'cnc-turning' ? 'selected' : ''}">
                  <input type="radio" name="spec-process" value="cnc-turning" ${this.quoteState.process === 'cnc-turning' ? 'checked' : ''} />
                  <div class="card-radio-content">
                    <span class="process-name">CNC Turning</span>
                    <span class="process-sub">Live Tooling & Lathe</span>
                  </div>
                </label>
                <label class="process-radio-card ${this.quoteState.process === 'sheet-metal' ? 'selected' : ''}">
                  <input type="radio" name="spec-process" value="sheet-metal" ${this.quoteState.process === 'sheet-metal' ? 'checked' : ''} />
                  <div class="card-radio-content">
                    <span class="process-name">Sheet Metal</span>
                    <span class="process-sub">Laser Cut & Forming</span>
                  </div>
                </label>
                <label class="process-radio-card ${this.quoteState.process === '3d-printing' ? 'selected' : ''}">
                  <input type="radio" name="spec-process" value="3d-printing" ${this.quoteState.process === '3d-printing' ? 'checked' : ''} />
                  <div class="card-radio-content">
                    <span class="process-name">3D Printing</span>
                    <span class="process-sub">HP MJF, SLS & DMLS</span>
                  </div>
                </label>
                <label class="process-radio-card ${this.quoteState.process === 'injection-molding' ? 'selected' : ''}">
                  <input type="radio" name="spec-process" value="injection-molding" ${this.quoteState.process === 'injection-molding' ? 'checked' : ''} />
                  <div class="card-radio-content">
                    <span class="process-name">Injection Molding</span>
                    <span class="process-sub">Rapid & Production</span>
                  </div>
                </label>
                <label class="process-radio-card ${this.quoteState.process === 'urethane-casting' ? 'selected' : ''}">
                  <input type="radio" name="spec-process" value="urethane-casting" ${this.quoteState.process === 'urethane-casting' ? 'checked' : ''} />
                  <div class="card-radio-content">
                    <span class="process-name">Urethane Casting</span>
                    <span class="process-sub">Silicone Tooling</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- 2. Material Selection -->
            <div class="form-group mb-4">
              <label class="form-label" for="spec-material">2. Material Selection *</label>
              <select id="spec-material" class="form-control">
                <optgroup label="Metals (Aluminum)">
                  <option value="al-6061" ${this.quoteState.material === 'al-6061' ? 'selected' : ''}>Aluminum 6061-T6 (Standard All-Purpose Structural)</option>
                  <option value="al-7075" ${this.quoteState.material === 'al-7075' ? 'selected' : ''}>Aluminum 7075-T6 (Aerospace High-Strength)</option>
                  <option value="al-5052" ${this.quoteState.material === 'al-5052' ? 'selected' : ''}>Aluminum 5052-H32 (Sheet Metal Formable)</option>
                </optgroup>
                <optgroup label="Metals (Stainless Steel & Superalloys)">
                  <option value="ss-304" ${this.quoteState.material === 'ss-304' ? 'selected' : ''}>Stainless Steel 304 (Corrosion Resistant)</option>
                  <option value="ss-316l" ${this.quoteState.material === 'ss-316l' ? 'selected' : ''}>Stainless Steel 316L (Marine & Medical Grade)</option>
                  <option value="ti-6al4v" ${this.quoteState.material === 'ti-6al4v' ? 'selected' : ''}>Titanium Grade 5 (Ti-6Al-4V Extreme Strength)</option>
                  <option value="brass-c360" ${this.quoteState.material === 'brass-c360' ? 'selected' : ''}>Brass C360 (Free Machining)</option>
                  <option value="copper-110" ${this.quoteState.material === 'copper-110' ? 'selected' : ''}>Copper 110 (Electrically & Thermally Conductive)</option>
                </optgroup>
                <optgroup label="Engineering Polymers">
                  <option value="delrin-pom" ${this.quoteState.material === 'delrin-pom' ? 'selected' : ''}>Delrin / Acetal POM (Low Friction, High Rigidity)</option>
                  <option value="peek" ${this.quoteState.material === 'peek' ? 'selected' : ''}>PEEK (Ultra High-Performance 250°C)</option>
                  <option value="nylon-pa12" ${this.quoteState.material === 'nylon-pa12' ? 'selected' : ''}>Nylon PA12 (Tough & Impact Resistant)</option>
                  <option value="abs" ${this.quoteState.material === 'abs' ? 'selected' : ''}>ABS (Rigid Commercial Plastic)</option>
                  <option value="polycarbonate" ${this.quoteState.material === 'polycarbonate' ? 'selected' : ''}>Polycarbonate PC (Impact Resistant Clear)</option>
                </optgroup>
              </select>
            </div>

            <!-- 3. Quantity & Tier Scaling -->
            <div class="form-group mb-4">
              <label class="form-label">3. Quantity & Tiered Batching</label>
              <div class="qty-control-row">
                <input type="number" id="spec-quantity" min="1" max="100000" class="form-control qty-input" value="${this.quoteState.quantity}" />
                <div class="qty-pills">
                  <button type="button" class="qty-pill ${this.quoteState.quantity === 1 ? 'active' : ''}" data-qty="1">1 pc</button>
                  <button type="button" class="qty-pill ${this.quoteState.quantity === 5 ? 'active' : ''}" data-qty="5">5 pcs</button>
                  <button type="button" class="qty-pill ${this.quoteState.quantity === 25 ? 'active' : ''}" data-qty="25">25 pcs (-18%)</button>
                  <button type="button" class="qty-pill ${this.quoteState.quantity === 100 ? 'active' : ''}" data-qty="100">100 pcs (-34%)</button>
                  <button type="button" class="qty-pill ${this.quoteState.quantity === 500 ? 'active' : ''}" data-qty="500">500 pcs (-52%)</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Specs Column -->
          <div class="form-col">
            <!-- 4. Surface Finish -->
            <div class="form-group mb-4">
              <label class="form-label" for="spec-finish">4. Surface Finish & Post-Processing</label>
              <select id="spec-finish" class="form-control">
                <option value="as-machined" ${this.quoteState.finish === 'as-machined' ? 'selected' : ''}>As-Machined Standard (Ra 3.2 μm / 125 μin)</option>
                <option value="bead-blast" ${this.quoteState.finish === 'bead-blast' ? 'selected' : ''}>Bead Blasted (Uniform Satin Matte)</option>
                <option value="anodize-type-ii" ${this.quoteState.finish === 'anodize-type-ii' ? 'selected' : ''}>Anodize Type II (Corrosion Protection & Color)</option>
                <option value="anodize-type-iii" ${this.quoteState.finish === 'anodize-type-iii' ? 'selected' : ''}>Anodize Type III (Military Hardcoat 50 μm)</option>
                <option value="electropolish" ${this.quoteState.finish === 'electropolish' ? 'selected' : ''}>Electropolishing (Ultra-Clean Mirror Ra 0.2 μm)</option>
                <option value="passivation" ${this.quoteState.finish === 'passivation' ? 'selected' : ''}>Passivation ASTM A967 (Anti-Oxidation)</option>
                <option value="powder-coat" ${this.quoteState.finish === 'powder-coat' ? 'selected' : ''}>Industrial Powder Coating (Impact Durable)</option>
              </select>
            </div>

            <!-- 5. Tightest Tolerance -->
            <div class="form-group mb-4">
              <label class="form-label">5. Tightest Critical Tolerance</label>
              <div class="tolerance-options-grid">
                <label class="tolerance-card ${this.quoteState.tolerance === 'standard-005' ? 'selected' : ''}">
                  <input type="radio" name="spec-tolerance" value="standard-005" ${this.quoteState.tolerance === 'standard-005' ? 'checked' : ''} />
                  <span class="tol-title">Standard ISO 2768-m</span>
                  <span class="tol-val">±0.005" (±0.125 mm)</span>
                  <span class="tol-note">Standard Machining</span>
                </label>
                <label class="tolerance-card ${this.quoteState.tolerance === 'precision-002' ? 'selected' : ''}">
                  <input type="radio" name="spec-tolerance" value="precision-002" ${this.quoteState.tolerance === 'precision-002' ? 'checked' : ''} />
                  <span class="tol-title">Precision Machined</span>
                  <span class="tol-val">±0.002" (±0.050 mm)</span>
                  <span class="tol-note">Dowel & Bearing Fits</span>
                </label>
                <label class="tolerance-card ${this.quoteState.tolerance === 'ultra-001' ? 'selected' : ''}">
                  <input type="radio" name="spec-tolerance" value="ultra-001" ${this.quoteState.tolerance === 'ultra-001' ? 'checked' : ''} />
                  <span class="tol-title">Ultra-Precision CMM</span>
                  <span class="tol-val">±0.001" (±0.025 mm)</span>
                  <span class="tol-note">Aerospace & Defense</span>
                </label>
              </div>
            </div>

            <!-- 6. Quality Documentation & Inspection -->
            <div class="form-group mb-4">
              <label class="form-label">6. Quality Documentation & Certificates</label>
              <div class="checkbox-stack">
                <label class="custom-checkbox-row">
                  <input type="checkbox" id="cert-coc" ${this.quoteState.certifications.coc ? 'checked' : ''} />
                  <div>
                    <span class="checkbox-title">Certificate of Conformance (CoC)</span>
                    <span class="checkbox-desc">Standard Sanand Fabrication factory conformance certificate included free.</span>
                  </div>
                </label>
                <label class="custom-checkbox-row">
                  <input type="checkbox" id="cert-mtr" ${this.quoteState.certifications.mtr ? 'checked' : ''} />
                  <div>
                    <span class="checkbox-title">Raw Material Test Report (MTR / Mill Cert)</span>
                    <span class="checkbox-desc">Traceable heat lot chemistry and mechanical certs from mill.</span>
                  </div>
                </label>
                <label class="custom-checkbox-row">
                  <input type="checkbox" id="cert-cmm" ${this.quoteState.certifications.cmm ? 'checked' : ''} />
                  <div>
                    <span class="checkbox-title">CMM Dimensional Inspection Report (100% Critical Callouts)</span>
                    <span class="checkbox-desc">Zeiss Coordinate Measuring Machine automated verification report.</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- 7. Delivery Speed -->
            <div class="form-group mb-3">
              <label class="form-label">7. Lead Time Preference</label>
              <div class="speed-toggle-row">
                <label class="speed-card ${this.quoteState.speed === 'standard' ? 'selected' : ''}">
                  <input type="radio" name="spec-speed" value="standard" ${this.quoteState.speed === 'standard' ? 'checked' : ''} />
                  <div>
                    <span class="speed-title">Standard Production</span>
                    <span class="speed-desc">8 - 10 Business Days (Standard Economical Rate)</span>
                  </div>
                </label>
                <label class="speed-card ${this.quoteState.speed === 'expedited' ? 'selected' : ''}">
                  <input type="radio" name="spec-speed" value="expedited" ${this.quoteState.speed === 'expedited' ? 'checked' : ''} />
                  <div>
                    <span class="speed-title">⚡ Expedited Turnaround</span>
                    <span class="speed-desc">3 - 5 Business Days (Dedicated Machine Queue Priority)</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Engineering Notes -->
        <div class="form-group mt-2">
          <label class="form-label" for="spec-notes">Additional Technical Notes or Tolerancing Instructions (Optional)</label>
          <textarea id="spec-notes" class="form-control" rows="2" placeholder="e.g. Please tap M4x0.7 through holes, mask bearing bores prior to anodizing, refer to accompanying drawing PDF...">${this.quoteState.notes}</textarea>
        </div>
      </div>
    `;
  }

  initStep2Logic() {
    // Process radio cards
    const processCards = this.modalElement.querySelectorAll('.process-radio-card');
    processCards.forEach((card) => {
      card.addEventListener('click', () => {
        processCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input');
        radio.checked = true;
        this.quoteState.process = radio.value;
      });
    });

    // Material select
    const matSelect = this.modalElement.querySelector('#spec-material');
    matSelect.addEventListener('change', (e) => {
      this.quoteState.material = e.target.value;
    });

    // Quantity input & pills
    const qtyInput = this.modalElement.querySelector('#spec-quantity');
    const qtyPills = this.modalElement.querySelectorAll('.qty-pill');

    qtyInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) || 1;
      this.quoteState.quantity = val;
      qtyPills.forEach(p => p.classList.remove('active'));
    });

    qtyPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        qtyPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const qty = parseInt(pill.getAttribute('data-qty'), 10);
        qtyInput.value = qty;
        this.quoteState.quantity = qty;
      });
    });

    // Finish select
    const finishSelect = this.modalElement.querySelector('#spec-finish');
    finishSelect.addEventListener('change', (e) => {
      this.quoteState.finish = e.target.value;
    });

    // Tolerance cards
    const tolCards = this.modalElement.querySelectorAll('.tolerance-card');
    tolCards.forEach((card) => {
      card.addEventListener('click', () => {
        tolCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input');
        radio.checked = true;
        this.quoteState.tolerance = radio.value;
      });
    });

    // Certifications checkboxes
    const certCoc = this.modalElement.querySelector('#cert-coc');
    const certMtr = this.modalElement.querySelector('#cert-mtr');
    const certCmm = this.modalElement.querySelector('#cert-cmm');

    certCoc.addEventListener('change', (e) => { this.quoteState.certifications.coc = e.target.checked; });
    certMtr.addEventListener('change', (e) => { this.quoteState.certifications.mtr = e.target.checked; });
    certCmm.addEventListener('change', (e) => { this.quoteState.certifications.cmm = e.target.checked; });

    // Speed radio
    const speedCards = this.modalElement.querySelectorAll('.speed-card');
    speedCards.forEach((card) => {
      card.addEventListener('click', () => {
        speedCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input');
        radio.checked = true;
        this.quoteState.speed = radio.value;
      });
    });

    // Notes
    const notesInput = this.modalElement.querySelector('#spec-notes');
    notesInput.addEventListener('input', (e) => {
      this.quoteState.notes = e.target.value;
    });
  }

  /* ----------------------------------------------------
     STEP 3: Customer Information & Delivery Address
  ---------------------------------------------------- */
  renderStep3Html() {
    const cust = this.quoteState.customer;
    return `
      <div class="customer-info-form">
        <div class="section-title-small">Engineering & Procurement Contact</div>
        <p class="text-secondary mb-4">Provide your verified organization details to receive our official formal quotation document and DFM manufacturability feedback.</p>

        <div class="form-row-2">
          <div class="form-group mb-3">
            <label class="form-label" for="cust-fullname">Full Name *</label>
            <input type="text" id="cust-fullname" class="form-control" placeholder="e.g. Sarah Jenkins" value="${cust.fullName}" required />
          </div>
          <div class="form-group mb-3">
            <label class="form-label" for="cust-company">Company / Organization *</label>
            <input type="text" id="cust-company" class="form-control" placeholder="e.g. Apex Robotics Dynamics Ltd." value="${cust.company}" required />
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-group mb-3">
            <label class="form-label" for="cust-email">Business Work Email *</label>
            <input type="email" id="cust-email" class="form-control" placeholder="e.g. s.jenkins@apexrobotics.com" value="${cust.email}" required />
            <span class="field-hint">Formal PDF quote & DFM analysis will be dispatched to this address.</span>
          </div>
          <div class="form-group mb-3">
            <label class="form-label" for="cust-phone">Direct Phone Number</label>
            <input type="tel" id="cust-phone" class="form-control" placeholder="+1 (555) 234-5678" value="${cust.phone}" />
          </div>
        </div>

        <div class="section-title-small mt-4">Shipping Destination & Delivery Schedule</div>
        <div class="form-row-2">
          <div class="form-group mb-3">
            <label class="form-label" for="cust-country">Destination Country / Territory *</label>
            <select id="cust-country" class="form-control">
              <option value="United States" ${cust.country === 'United States' ? 'selected' : ''}>United States (Domestic Hub)</option>
              <option value="Canada" ${cust.country === 'Canada' ? 'selected' : ''}>Canada</option>
              <option value="United Kingdom" ${cust.country === 'United Kingdom' ? 'selected' : ''}>United Kingdom</option>
              <option value="Germany" ${cust.country === 'Germany' ? 'selected' : ''}>Germany (EU Hub)</option>
              <option value="Japan" ${cust.country === 'Japan' ? 'selected' : ''}>Japan</option>
              <option value="India" ${cust.country === 'India' ? 'selected' : ''}>India (Direct Manufacturing Hub)</option>
              <option value="Australia" ${cust.country === 'Australia' ? 'selected' : ''}>Australia</option>
            </select>
          </div>
          <div class="form-group mb-3">
            <label class="form-label" for="cust-postal">Postal / ZIP Code</label>
            <input type="text" id="cust-postal" class="form-control" placeholder="e.g. 94107" value="${cust.postalCode}" />
          </div>
        </div>

        <div class="form-group mb-3">
          <label class="form-label" for="cust-address">Street Address / Receiving Facility</label>
          <input type="text" id="cust-address" class="form-control" placeholder="e.g. 450 Innovation Parkway, Suite 300, Dock B" value="${cust.address}" />
        </div>

        <div class="form-group mb-3">
          <label class="form-label" for="cust-deadline">Target Production In-Hand Date (Optional)</label>
          <input type="date" id="cust-deadline" class="form-control" value="${cust.deadline}" />
        </div>
      </div>
    `;
  }

  initStep3Logic() {
    const cust = this.quoteState.customer;
    const bindField = (id, prop) => {
      const el = this.modalElement.querySelector(`#${id}`);
      if (el) {
        el.addEventListener('input', (e) => { cust[prop] = e.target.value; });
        el.addEventListener('change', (e) => { cust[prop] = e.target.value; });
      }
    };

    bindField('cust-fullname', 'fullName');
    bindField('cust-company', 'company');
    bindField('cust-email', 'email');
    bindField('cust-phone', 'phone');
    bindField('cust-country', 'country');
    bindField('cust-postal', 'postalCode');
    bindField('cust-address', 'address');
    bindField('cust-deadline', 'deadline');
  }

  /* ----------------------------------------------------
     STEP 4: Review & Live Cost Breakdown
  ---------------------------------------------------- */
  calculatePricing() {
    const qty = this.quoteState.quantity;
    const proc = this.quoteState.process;
    const mat = this.quoteState.material;
    const tol = this.quoteState.tolerance;
    const spd = this.quoteState.speed;

    // Base part complexity setup cost
    let setupFee = 85;
    let baseUnitMachining = 42;

    if (proc === 'cnc-turning') {
      setupFee = 65;
      baseUnitMachining = 32;
    } else if (proc === 'sheet-metal') {
      setupFee = 55;
      baseUnitMachining = 24;
    } else if (proc === '3d-printing') {
      setupFee = 30;
      baseUnitMachining = 28;
    } else if (proc === 'injection-molding') {
      setupFee = 1800; // Rapid tooling bridge mold
      baseUnitMachining = 3.20;
    }

    // Material multiplier
    let matCostPerPart = 16;
    if (mat.includes('7075') || mat.includes('ss-304')) matCostPerPart = 24;
    if (mat.includes('ss-316l')) matCostPerPart = 32;
    if (mat.includes('ti-6al4v')) matCostPerPart = 95;
    if (mat.includes('peek')) matCostPerPart = 78;
    if (mat.includes('delrin') || mat.includes('abs')) matCostPerPart = 12;

    // Tolerance adder
    let tolAdder = 0;
    if (tol === 'precision-002') tolAdder = 8;
    if (tol === 'ultra-001') tolAdder = 22;

    // Finishing adder
    let finishAdder = 0;
    if (this.quoteState.finish === 'bead-blast') finishAdder = 5;
    if (this.quoteState.finish.includes('anodize')) finishAdder = 12;
    if (this.quoteState.finish === 'electropolish') finishAdder = 18;
    if (this.quoteState.finish === 'powder-coat') finishAdder = 14;

    // Volume discount curve
    let volumeDiscountFactor = 1.0;
    if (qty >= 500) volumeDiscountFactor = 0.48;
    else if (qty >= 100) volumeDiscountFactor = 0.66;
    else if (qty >= 25) volumeDiscountFactor = 0.82;
    else if (qty >= 5) volumeDiscountFactor = 0.94;

    const unitPartTotal = ((baseUnitMachining + matCostPerPart + tolAdder + finishAdder) * volumeDiscountFactor);
    const partsTotal = unitPartTotal * qty;

    // Certifications
    let certCost = 0;
    if (this.quoteState.certifications.mtr) certCost += 85;
    if (this.quoteState.certifications.cmm) certCost += 120;
    if (this.quoteState.certifications.fai) certCost += 150;

    // Expedited shipping multiplier
    const leadTimeDays = spd === 'expedited' ? '3 - 5 Business Days' : '8 - 10 Business Days';
    let expeditedFee = spd === 'expedited' ? 180 : 0;

    let subtotal = setupFee + partsTotal + certCost + expeditedFee;
    let shippingEst = 35;
    let totalEst = subtotal + shippingEst;

    return {
      setupFee,
      unitPrice: unitPartTotal.toFixed(2),
      partsTotal: partsTotal.toFixed(2),
      certCost,
      expeditedFee,
      shippingEst,
      subtotal: subtotal.toFixed(2),
      totalEst: totalEst.toFixed(2),
      leadTimeDays
    };
  }

  renderStep4Html() {
    const calc = this.calculatePricing();
    const cust = this.quoteState.customer;

    return `
      <div class="review-layout">
        <!-- Left: Part & Customer Summary Cards -->
        <div class="review-details-col">
          <div class="section-title-small">Manufacturing Configuration Summary</div>

          <div class="review-card mb-3">
            <div class="review-card-header">
              <span class="card-tag">Uploaded Model</span>
              <button type="button" class="btn-link text-xs edit-step-link" data-goto="1">Edit Files</button>
            </div>
            <div class="review-file-row">
              <strong>${this.quoteState.files[0]?.name || 'CAD Model'}</strong>
              <span class="text-secondary text-sm">${this.quoteState.files[0]?.dimensions || '124.5 × 82.0 × 45.0 mm'}</span>
            </div>
          </div>

          <div class="review-card mb-3">
            <div class="review-card-header">
              <span class="card-tag">Engineering Specifications</span>
              <button type="button" class="btn-link text-xs edit-step-link" data-goto="2">Edit Specs</button>
            </div>
            <div class="spec-grid-review">
              <div class="spec-item">
                <span class="spec-k">Process:</span>
                <span class="spec-v text-capitalize">${this.quoteState.process.replace('-', ' ')}</span>
              </div>
              <div class="spec-item">
                <span class="spec-k">Material:</span>
                <span class="spec-v text-capitalize">${this.quoteState.material.replace('-', ' ').toUpperCase()}</span>
              </div>
              <div class="spec-item">
                <span class="spec-k">Order Quantity:</span>
                <span class="spec-v"><strong>${this.quoteState.quantity} pieces</strong></span>
              </div>
              <div class="spec-item">
                <span class="spec-k">Surface Finish:</span>
                <span class="spec-v text-capitalize">${this.quoteState.finish.replace('-', ' ')}</span>
              </div>
              <div class="spec-item">
                <span class="spec-k">Tightest Tolerance:</span>
                <span class="spec-v">${this.quoteState.tolerance === 'ultra-001' ? '±0.001" (Ultra Precision)' : '±0.002" (Precision Machined)'}</span>
              </div>
              <div class="spec-item">
                <span class="spec-k">Production Speed:</span>
                <span class="spec-v">${calc.leadTimeDays}</span>
              </div>
            </div>
          </div>

          <div class="review-card mb-3">
            <div class="review-card-header">
              <span class="card-tag">Contact & Destination</span>
              <button type="button" class="btn-link text-xs edit-step-link" data-goto="3">Edit Contact</button>
            </div>
            <div class="review-contact-info">
              <p class="mb-1"><strong>${cust.fullName || 'Engineering Lead'}</strong> — ${cust.company || 'Organization'}</p>
              <p class="text-secondary text-sm mb-1">${cust.email || 'quote@customer.com'} | ${cust.phone || 'Phone on file'}</p>
              <p class="text-secondary text-sm mb-0">Shipping to: ${cust.country} ${cust.postalCode ? `(${cust.postalCode})` : ''}</p>
            </div>
          </div>
        </div>

        <!-- Right: Transparent Line-Item Price Breakdown -->
        <div class="review-pricing-col">
          <div class="pricing-box-card">
            <div class="pricing-box-header">
              <span class="pricing-title">Verified Quotation Estimate</span>
              <span class="pricing-subtitle">Direct Factory B2B Sourcing</span>
            </div>

            <div class="pricing-line-items">
              <div class="line-item">
                <span>Machine Setup & Tooling Prep:</span>
                <span>$${calc.setupFee.toFixed(2)}</span>
              </div>
              <div class="line-item">
                <span>Part Manufacturing (${this.quoteState.quantity} × $${calc.unitPrice}/pc):</span>
                <span>$${calc.partsTotal}</span>
              </div>
              <div class="line-item">
                <span>Surface Finishing & Post-Treatment:</span>
                <span>Included in Unit</span>
              </div>
              ${calc.certCost > 0 ? `
                <div class="line-item">
                  <span>Inspection Reports & Material Certs:</span>
                  <span>$${calc.certCost.toFixed(2)}</span>
                </div>
              ` : ''}
              ${calc.expeditedFee > 0 ? `
                <div class="line-item">
                  <span>Priority Expedited Queue Fee:</span>
                  <span>$${calc.expeditedFee.toFixed(2)}</span>
                </div>
              ` : ''}
              <div class="line-item">
                <span>Freight & Insured Logistics:</span>
                <span>$${calc.shippingEst.toFixed(2)}</span>
              </div>

              <div class="line-item-divider"></div>

              <div class="line-item total-row">
                <div>
                  <span class="total-label">Estimated Order Total:</span>
                  <span class="total-lead-time">Estimated Ship: ${calc.leadTimeDays}</span>
                </div>
                <div class="total-amount-box">
                  <span class="total-currency">USD</span>
                  <span class="total-price-val">$${calc.totalEst}</span>
                </div>
              </div>
            </div>

            <!-- Transparency Disclaimer -->
            <div class="engineering-review-note">
              <div class="d-flex align-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <div class="text-xs text-secondary">
                  <strong>Engineering DFM Verification:</strong>
                  Our applications engineering team inspects your 3D geometry within 2 hours. Final formal invoice is locked upon CAD toolpath validation.
                </div>
              </div>
            </div>

            <!-- Terms acceptance -->
            <div class="terms-row mt-3">
              <label class="custom-checkbox-row text-xs">
                <input type="checkbox" id="terms-agree" checked />
                <span>I confirm the uploaded CAD model is accurate and authorize Sanand Fabrication to generate a formal production quotation.</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initStep4Logic() {
    const editLinks = this.modalElement.querySelectorAll('.edit-step-link');
    editLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const targetStep = parseInt(link.getAttribute('data-goto'), 10);
        this.currentStep = targetStep;
        this.renderStep();
      });
    });
  }

  /* ----------------------------------------------------
     STEP 5: Confirmation & RFQ ID Generation
  ---------------------------------------------------- */
  renderStep5Html() {
    if (!this.quoteState.rfqId) {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      this.quoteState.rfqId = `SND-2026-${randNum}`;
    }

    const calc = this.calculatePricing();
    const cust = this.quoteState.customer;

    return `
      <div class="confirmation-container text-center">
        <div class="success-icon-badge">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h3 class="confirmation-title">Manufacturing RFQ Successfully Submitted!</h3>
        <p class="text-secondary confirmation-desc">
          Your manufacturing quotation has been routed to our senior applications engineering team for full DFM review and toolpath feasibility verification.
        </p>

        <!-- Reference Box -->
        <div class="rfq-ticket-card">
          <div class="ticket-header">
            <span>OFFICIAL RFQ REFERENCE NUMBER</span>
            <span class="badge-status-pill">Pending DFM Review</span>
          </div>
          <div class="ticket-id-row">
            <span class="rfq-code" id="rfq-code-display">${this.quoteState.rfqId}</span>
            <button type="button" class="btn-copy-code" id="btn-copy-rfq" title="Copy RFQ code">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </button>
          </div>
          <div class="ticket-details-grid">
            <div>
              <span class="t-k">Target Deliverable:</span>
              <span class="t-v">${this.quoteState.quantity} pcs (${this.quoteState.material.toUpperCase()})</span>
            </div>
            <div>
              <span class="t-k">Estimated Lead:</span>
              <span class="t-v">${calc.leadTimeDays}</span>
            </div>
            <div>
              <span class="t-k">Recipient:</span>
              <span class="t-v">${cust.email || 'quote@customer.com'}</span>
            </div>
            <div>
              <span class="t-k">Estimated Total:</span>
              <span class="t-v">$${calc.totalEst} USD</span>
            </div>
          </div>
        </div>

        <!-- Next Steps Timeline -->
        <div class="next-steps-container text-left mt-4">
          <h4 class="next-steps-title">What Happens Next?</h4>
          <div class="steps-progress-list">
            <div class="step-progress-item">
              <div class="step-dot completed">1</div>
              <div class="step-text">
                <strong>Quotation Submitted & Encrypted:</strong>
                <span>Files received in our ISO 27001 compliant secure CAD vault.</span>
              </div>
            </div>
            <div class="step-progress-item">
              <div class="step-dot active">2</div>
              <div class="step-text">
                <strong>Applications Engineering DFM Inspection (1 - 2 Hours):</strong>
                <span>Senior machinist evaluates internal pocket radii, wall thicknesses, and toolpaths.</span>
              </div>
            </div>
            <div class="step-progress-item">
              <div class="step-dot">3</div>
              <div class="step-text">
                <strong>Formal PDF Quotation Dispatched:</strong>
                <span>You receive a formal locked price quotation with payment link and delivery schedule.</span>
              </div>
            </div>
            <div class="step-progress-item">
              <div class="step-dot">4</div>
              <div class="step-text">
                <strong>Production Kickoff & Live Tracking:</strong>
                <span>Chips fly! Monitor CNC machining and CMM metrology in your portal.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="confirmation-actions mt-4">
          <button type="button" class="btn btn-primary" id="btn-download-rfq-summary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download RFQ Summary PDF / Document
          </button>
          <button type="button" class="btn btn-secondary" id="btn-track-submitted-rfq">
            Track Quotation Status
          </button>
          <button type="button" class="btn btn-secondary" id="btn-quote-another">
            Submit Another Part
          </button>
        </div>
      </div>
    `;
  }

  initStep5Logic() {
    const copyBtn = this.modalElement.querySelector('#btn-copy-rfq');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(this.quoteState.rfqId);
      copyBtn.innerHTML = `✓ Copied!`;
      setTimeout(() => {
        copyBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy
        `;
      }, 2000);
    });

    const downloadBtn = this.modalElement.querySelector('#btn-download-rfq-summary');
    downloadBtn.addEventListener('click', () => {
      this.generateDownloadableRfq();
    });

    const trackBtn = this.modalElement.querySelector('#btn-track-submitted-rfq');
    trackBtn.addEventListener('click', () => {
      const rfqId = this.quoteState.rfqId;
      this.close();
      const trackerSection = document.getElementById('rfq-tracker-section');
      if (trackerSection) {
        trackerSection.scrollIntoView({ behavior: 'smooth' });
        const input = document.getElementById('tracker-input');
        if (input) {
          input.value = rfqId;
          const searchBtn = document.getElementById('tracker-submit-btn');
          if (searchBtn) searchBtn.click();
        }
      }
    });

    const quoteAnotherBtn = this.modalElement.querySelector('#btn-quote-another');
    quoteAnotherBtn.addEventListener('click', () => {
      this.quoteState.rfqId = null;
      this.currentStep = 1;
      this.renderStep();
    });
  }

  generateDownloadableRfq() {
    const calc = this.calculatePricing();
    const cust = this.quoteState.customer;
    const content = `
========================================================================
SANAND FABRICATION — OFFICIAL MANUFACTURING RFQ SUMMARY
Reference ID: ${this.quoteState.rfqId}
Date Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
Platform: Sanand Fabrication Digital Manufacturing On-Demand
========================================================================

1. CUSTOMER & FACILITY DETAILS:
   Contact Name:    ${cust.fullName || 'Engineering Lead'}
   Organization:    ${cust.company || 'Not Specified'}
   Business Email:  ${cust.email || 'quote@customer.com'}
   Phone:           ${cust.phone || 'N/A'}
   Ship Destination:${cust.country} ${cust.postalCode ? `(${cust.postalCode})` : ''}
   Street Address:  ${cust.address || 'Standard Dock Delivery'}

2. CAD GEOMETRY SPECIFICATIONS:
   Primary File:    ${this.quoteState.files[0]?.name || 'CAD Model.step'}
   Bounding Box:    ${this.quoteState.files[0]?.dimensions || '124.5 x 82.0 x 45.0 mm'}
   Solid Volume:    ${this.quoteState.files[0]?.volume || '168.4 cm3'}
   Process:         ${this.quoteState.process.toUpperCase()}
   Material Alloy:  ${this.quoteState.material.toUpperCase()}
   Surface Finish:  ${this.quoteState.finish.toUpperCase()}
   Tightest Tol:    ${this.quoteState.tolerance}
   Tapped Threads:  ${this.quoteState.hasThreads ? 'Yes (per 2D drawing specifications)' : 'None'}

3. QUALITY & CERTIFICATIONS:
   Certificate of Conformance (CoC): ${this.quoteState.certifications.coc ? 'INCLUDED' : 'N/A'}
   Raw Material Test Report (MTR):   ${this.quoteState.certifications.mtr ? 'REQUESTED (Traceable Heat Lot)' : 'N/A'}
   CMM Metrology Inspection:         ${this.quoteState.certifications.cmm ? 'REQUESTED (100% Critical Points)' : 'N/A'}

4. ESTIMATED COMMERCIAL BREAKDOWN:
   Order Quantity:                   ${this.quoteState.quantity} pieces
   Estimated Unit Price:             $${calc.unitPrice} USD
   Setup & Program Prep:             $${calc.setupFee.toFixed(2)} USD
   Parts Total:                      $${calc.partsTotal} USD
   Quality & Metrology Reports:      $${calc.certCost.toFixed(2)} USD
   Insured Logistics / Freight:      $${calc.shippingEst.toFixed(2)} USD
   ---------------------------------------------------------------------
   ESTIMATED RFQ TOTAL:              $${calc.totalEst} USD
   Estimated Manufacturing Lead:     ${calc.leadTimeDays}

5. ENGINEERING NEXT STEPS:
   - Your CAD file has entered our applications engineering DFM queue.
   - You will receive a verified locked-price quote within 2 business hours.
   - To track this submission, visit https://sanandfabrication.com and enter RFQ: ${this.quoteState.rfqId}.

========================================================================
Sanand Fabrication | Manufacturing Precision On-Demand
AS9100D & ISO 9001:2015 Aligned Quality Management System
========================================================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RFQ_${this.quoteState.rfqId}_SanandFabrication.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  handleNext() {
    if (this.currentStep === 1) {
      if (this.quoteState.files.length === 0) {
        alert('Please upload or select at least one CAD file to proceed.');
        return;
      }
      this.currentStep = 2;
      this.renderStep();
    } else if (this.currentStep === 2) {
      this.currentStep = 3;
      this.renderStep();
    } else if (this.currentStep === 3) {
      // Validate customer info
      const cust = this.quoteState.customer;
      if (!cust.fullName.trim() || !cust.company.trim() || !cust.email.trim()) {
        alert('Please fill in your Full Name, Company, and Business Email to generate your quote.');
        return;
      }
      this.currentStep = 4;
      this.renderStep();
    } else if (this.currentStep === 4) {
      this.currentStep = 5;
      this.renderStep();
    }
  }

  handlePrev() {
    if (this.currentStep > 1 && this.currentStep <= 4) {
      this.currentStep--;
      this.renderStep();
    }
  }
}
