export class Footer {
  constructor(quoteModal, contactModal, serviceModal) {
    this.quoteModal = quoteModal;
    this.contactModal = contactModal;
    this.serviceModal = serviceModal;
    this.element = null;
    this.init();
  }

  init() {
    const footer = document.createElement('footer');
    footer.id = 'site-footer';
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-certifications-bar">
        <div class="container certs-container">
          <div class="cert-item">
            <span class="cert-shield">✦</span>
            <span><strong>ISO 9001:2015</strong> Certified Quality Management</span>
          </div>
          <div class="cert-item">
            <span class="cert-shield">✦</span>
            <span><strong>AS9100D</strong> Aerospace Precision Ready</span>
          </div>
          <div class="cert-item">
            <span class="cert-shield">✦</span>
            <span><strong>ITAR</strong> Registered Facility Protocols</span>
          </div>
          <div class="cert-item">
            <span class="cert-shield">✦</span>
            <span><strong>RoHS & REACH</strong> Compliant Finishing</span>
          </div>
        </div>
      </div>

      <div class="container footer-main-content">
        <div class="footer-grid">
          <!-- Col 1: Brand & Overview -->
          <div class="footer-col-brand">
            <div class="brand-logo footer-logo mb-3">
              <div class="logo-mark">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2L29.8564 10V26L16 34L2.14359 26V10L16 2Z" stroke="#155EEF" stroke-width="2.5" fill="none"/>
                  <path d="M16 7L24 12V22L16 27L8 22V12L16 7Z" fill="#155EEF" fill-opacity="0.15" stroke="#155EEF" stroke-width="1.8"/>
                  <circle cx="16" cy="17" r="3.5" fill="#155EEF"/>
                </svg>
              </div>
              <div class="logo-text-col">
                <span class="logo-main-name">SANAND</span>
                <span class="logo-sub-tag">FABRICATION & PRECISION</span>
              </div>
            </div>
            <p class="footer-company-desc">
              Sanand Fabrication is an on-demand manufacturing platform connecting engineering leaders, procurement teams, and innovators with high-precision CNC machining, industrial 3D printing, sheet metal fabrication, and injection molding.
            </p>
            <div class="footer-contact-details">
              <div>📍 <strong>Precision Metrology & Manufacturing Hub</strong></div>
              <div>✉️ engineering@sanandfabrication.com | 📞 +1 (800) 492-7283</div>
            </div>
          </div>

          <!-- Col 2: Services -->
          <div class="footer-col">
            <h4 class="footer-heading">Manufacturing Services</h4>
            <ul class="footer-links-list">
              <li><a href="#services" class="footer-service-link" data-service="cnc-machining">CNC Milling & Turning</a></li>
              <li><a href="#services" class="footer-service-link" data-service="3d-printing">3D Printing (SLS, MJF, DMLS)</a></li>
              <li><a href="#services" class="footer-service-link" data-service="sheet-metal">Sheet Metal Fabrication</a></li>
              <li><a href="#services" class="footer-service-link" data-service="injection-molding">Plastic Injection Molding</a></li>
              <li><a href="#services" class="footer-service-link" data-service="urethane-casting">Urethane Vacuum Casting</a></li>
              <li><a href="#services" class="footer-service-link" data-service="cnc-machining">5-Axis Micro Machining</a></li>
            </ul>
          </div>

          <!-- Col 3: Materials & Finishes -->
          <div class="footer-col">
            <h4 class="footer-heading">Materials & Standards</h4>
            <ul class="footer-links-list">
              <li><a href="#materials">Aluminum 6061-T6 & 7075</a></li>
              <li><a href="#materials">Stainless Steel 304 & 316L</a></li>
              <li><a href="#materials">Titanium Ti-6Al-4V Grade 5</a></li>
              <li><a href="#materials">Delrin (POM) & PEEK High-Temp</a></li>
              <li><a href="#materials">Type II & III Hardcoat Anodize</a></li>
              <li><a href="#materials">Electropolishing & Passivation</a></li>
            </ul>
          </div>

          <!-- Col 4: Industries & Portal -->
          <div class="footer-col">
            <h4 class="footer-heading">Industries & Portal</h4>
            <ul class="footer-links-list">
              <li><a href="#industries">Aerospace & Defense</a></li>
              <li><a href="#industries">Automotive & EV Mobility</a></li>
              <li><a href="#industries">Robotics & Industrial Automation</a></li>
              <li><a href="#industries">Medical Devices & Instruments</a></li>
              <li><a href="#rfq-tracker-section">Track Quotation Reference</a></li>
              <li><button type="button" class="btn-link text-sm footer-quote-btn">Submit 3D CAD RFQ</button></li>
            </ul>
          </div>

          <!-- Col 5: Engineering Resources -->
          <div class="footer-col">
            <h4 class="footer-heading">Technical Resources</h4>
            <ul class="footer-links-list">
              <li><a href="#resources">CNC Machining DFM Guide</a></li>
              <li><a href="#resources">Sheet Metal K-Factor Chart</a></li>
              <li><a href="#resources">Surface Finish Ra Comparison</a></li>
              <li><a href="#quality">CMM Inspection Protocol</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
              <li><button type="button" class="btn-link text-sm footer-contact-btn">Speak with an Engineer</button></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Copyright & Legal Strip -->
        <div class="footer-bottom-bar">
          <div class="copyright-text">
            © ${new Date().getFullYear()} Sanand Fabrication Inc. All rights reserved. Precision Manufacturing on Demand.
          </div>
          <div class="footer-legal-links">
            <a href="#privacy" id="privacy-link">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" id="terms-link">Terms of Service & Manufacturing Agreement</a>
            <span>•</span>
            <a href="#security" id="security-link">IP & CAD Security</a>
          </div>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(footer);
    this.element = footer;
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.element.addEventListener('click', (e) => {
      const sLink = e.target.closest('.footer-service-link');
      if (sLink) {
        const id = sLink.getAttribute('data-service');
        if (id && this.serviceModal) {
          setTimeout(() => this.serviceModal.open(id), 200);
        }
      }

      if (e.target.closest('.footer-quote-btn') && this.quoteModal) {
        this.quoteModal.open();
      }

      if (e.target.closest('.footer-contact-btn') && this.contactModal) {
        this.contactModal.open();
      }

      if (e.target.id === 'privacy-link' || e.target.id === 'terms-link' || e.target.id === 'security-link') {
        e.preventDefault();
        alert('All uploaded CAD files, engineering drawings, and customer data are protected under Sanand Fabrication Standard Mutual NDA and encrypted using 256-bit AES protocols.');
      }
    });
  }
}
