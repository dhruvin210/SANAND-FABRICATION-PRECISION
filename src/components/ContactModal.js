export class ContactModal {
  constructor() {
    this.modalElement = null;
    this.init();
  }

  init() {
    const modal = document.createElement('div');
    modal.id = 'contact-modal-backdrop';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog contact-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-subtitle">Direct Engineering Consultation</span>
            <h2 id="contact-modal-title" class="modal-title">Connect with Applications Engineering</h2>
          </div>
          <button type="button" class="modal-close-btn" id="contact-modal-close" aria-label="Close dialog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body contact-modal-body">
          <p class="text-secondary mb-4">
            Need design-for-manufacturability (DFM) advice, enterprise blanket orders, or assistance selecting the ideal material alloy? Our senior mechanical engineers typically respond within 2 hours.
          </p>

          <form id="contact-eng-form">
            <div class="form-row-2">
              <div class="form-group mb-3">
                <label class="form-label" for="contact-name">Your Full Name *</label>
                <input type="text" id="contact-name" class="form-control" placeholder="Alex Morgan" required />
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="contact-org">Organization / Company *</label>
                <input type="text" id="contact-org" class="form-control" placeholder="Orbit Propulsion Labs" required />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group mb-3">
                <label class="form-label" for="contact-email">Work Email Address *</label>
                <input type="email" id="contact-email" class="form-control" placeholder="a.morgan@orbitpropulsion.com" required />
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="contact-phone">Phone Number</label>
                <input type="tel" id="contact-phone" class="form-control" placeholder="+1 (555) 789-0123" />
              </div>
            </div>

            <div class="form-group mb-3">
              <label class="form-label" for="contact-service-interest">Process of Interest</label>
              <select id="contact-service-interest" class="form-control">
                <option value="cnc">CNC Machining (Milling / Turning)</option>
                <option value="sheet-metal">Sheet Metal Fabrication & Enclosures</option>
                <option value="3d-printing">Additive Manufacturing (HP MJF / DMLS Metal)</option>
                <option value="injection-molding">Injection Molding & Rapid Tooling</option>
                <option value="materials">Materials & Heat Treatment Selection</option>
                <option value="enterprise">Enterprise Long-Term Supply Agreement</option>
              </select>
            </div>

            <div class="form-group mb-4">
              <label class="form-label" for="contact-msg">Project Requirements & Questions *</label>
              <textarea id="contact-msg" class="form-control" rows="4" placeholder="Describe your part geometry, required quantities, target timeline, or DFM challenges..." required></textarea>
            </div>

            <div class="contact-success-msg" id="contact-success-box" style="display: none;">
              <div class="d-flex align-center gap-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#12b76a" stroke-width="2.2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div>
                  <strong>Inquiry Dispatched to Engineering!</strong>
                  <p class="text-xs text-secondary mb-0">Our senior applications engineer will review your specifications and contact you shortly.</p>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100" id="contact-submit-btn">
              Send Message to Engineering Team
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalElement = modal;

    const closeBtn = modal.querySelector('#contact-modal-close');
    closeBtn.addEventListener('click', () => this.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.close();
    });

    const form = modal.querySelector('#contact-eng-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successBox = modal.querySelector('#contact-success-box');
      const submitBtn = modal.querySelector('#contact-submit-btn');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting to Engineering...';

      setTimeout(() => {
        submitBtn.style.display = 'none';
        successBox.style.display = 'block';
        setTimeout(() => {
          this.close();
          form.reset();
          submitBtn.disabled = false;
          submitBtn.style.display = 'flex';
          submitBtn.innerHTML = `
            Send Message to Engineering Team
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          `;
          successBox.style.display = 'none';
        }, 3000);
      }, 700);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) this.close();
    });
  }

  open() {
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
