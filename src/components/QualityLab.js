export class QualityLab {
  constructor(contactModal) {
    this.contactModal = contactModal;
    this.element = null;
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'quality';
    section.className = 'section-padding quality-section';
    section.innerHTML = `
      <div class="container">
        <!-- Section Header -->
        <div class="section-header-block text-center">
          <div class="badge-accent-pill">Engineering Metrology & Inspection</div>
          <h2 class="section-headline">Quality Control & Dimensional Assurance</h2>
          <p class="section-lead-copy">
            We don't just cut parts—we verify critical dimensions, certify raw material melt chemistries, and inspect GD&T callouts in our climate-controlled metrology laboratory.
          </p>
        </div>

        <!-- 4 Pillars Grid -->
        <div class="quality-pillars-grid">
          <!-- Pillar 1 -->
          <div class="quality-card">
            <div class="q-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="22" y1="12" x2="18" y2="12"></line>
                <line x1="6" y1="12" x2="2" y2="12"></line>
                <line x1="12" y1="6" x2="12" y2="2"></line>
                <line x1="12" y1="22" x2="12" y2="18"></line>
              </svg>
            </div>
            <h3 class="q-card-title">Zeiss CMM Inspection</h3>
            <p class="q-card-desc">
              Multi-sensor Coordinate Measuring Machines (CMM) with motorized indexing probe heads measure complex 3D profiles, concentricities, and true position down to sub-micron accuracy.
            </p>
            <div class="q-card-stat">Accuracy down to 0.001 mm (1 μm)</div>
          </div>

          <!-- Pillar 2 -->
          <div class="quality-card">
            <div class="q-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <h3 class="q-card-title">Mill Test Reports (MTR)</h3>
            <p class="q-card-desc">
              100% material heat-lot traceability from certified primary metal mills. Chemical composition spectroscopy and tensile mechanical testing reports provided with your batch.
            </p>
            <div class="q-card-stat">Complete raw material lineage</div>
          </div>

          <!-- Pillar 3 -->
          <div class="quality-card">
            <div class="q-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
            </div>
            <h3 class="q-card-title">FAI Reports (AS9102)</h3>
            <p class="q-card-desc">
              Ballooned 2D engineering drawing inspection with First Article Inspection (FAI) reports per AS9102 aerospace standard. Every drawing dimension measured and recorded.
            </p>
            <div class="q-card-stat">100% drawing feature validation</div>
          </div>

          <!-- Pillar 4 -->
          <div class="quality-card">
            <div class="q-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155eef" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3 class="q-card-title">Mitutoyo Profilometry</h3>
            <p class="q-card-desc">
              Diamond stylus surface roughness testers verify Ra, Rz, and Rmax values across sealing surfaces, bearing journals, and cosmetic blasted finishes.
            </p>
            <div class="q-card-stat">Calibrated Ra 0.1 to 12.5 μm</div>
          </div>
        </div>

        <!-- QA Standards Table & Certifications Strip -->
        <div class="quality-standards-box mt-5">
          <div class="standards-header">
            <div>
              <span class="badge-pill-cyan">Manufacturing Standards</span>
              <h3 class="standards-title">Factory Operating Standards & Quality Protocols</h3>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" id="qa-consult-btn">
              Request Quality Manual & Audit Packet
            </button>
          </div>

          <div class="standards-table-responsive">
            <table class="standards-table">
              <thead>
                <tr>
                  <th>Inspection Protocol</th>
                  <th>Standard Equipment</th>
                  <th>Acceptance Criterion</th>
                  <th>Documentation Delivered</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>General Machining Tolerances</strong></td>
                  <td>Digital Micrometers & Bore Gauges</td>
                  <td>ISO 2768-m (Fine: ISO 2768-f)</td>
                  <td>Standard Certificate of Conformance (CoC)</td>
                </tr>
                <tr>
                  <td><strong>Critical Geometric Tolerances</strong></td>
                  <td>Zeiss Contura Bridge CMM</td>
                  <td>Customer 2D Drawing GD&T callouts</td>
                  <td>Full CMM Coordinate Data Sheet & Graphical Report</td>
                </tr>
                <tr>
                  <td><strong>Thread Verification</strong></td>
                  <td>Thread Go / No-Go Plug & Ring Gauges</td>
                  <td>Class 2B / 3B (Metric 6H / 4H)</td>
                  <td>Thread Class Gauge Inspection Log</td>
                </tr>
                <tr>
                  <td><strong>Anodizing & Coating Thickness</strong></td>
                  <td>Eddy Current Coating Thickness Gauge</td>
                  <td>Mil-A-8625 Type II / III Specifications</td>
                  <td>Coating Thickness & Seal Test Certificate</td>
                </tr>
                <tr>
                  <td><strong>Surface Roughness (Ra)</strong></td>
                  <td>Mitutoyo Surftest Profilometer</td>
                  <td>Ra 3.2 μm (Standard) down to Ra 0.4 μm</td>
                  <td>Surface Profile Roughness Trace Report</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.element = section;

    const consultBtn = section.querySelector('#qa-consult-btn');
    consultBtn.addEventListener('click', () => {
      if (this.contactModal) this.contactModal.open();
    });
  }
}
