import { faqData } from '../data/guidesData.js';

export class Faq {
  constructor(contactModal) {
    this.contactModal = contactModal;
    this.element = null;
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'faq';
    section.className = 'section-padding faq-section';
    section.innerHTML = `
      <div class="container">
        <!-- Section Header -->
        <div class="section-header-block text-center">
          <div class="badge-accent-pill">Engineering Answers</div>
          <h2 class="section-headline">Frequently Asked Manufacturing Questions</h2>
          <p class="section-lead-copy">
            Find technical details regarding supported CAD file types, precision tolerances, volume pricing tiers, certifications, and delivery timelines.
          </p>
        </div>

        <!-- Accordion Stack -->
        <div class="faq-accordion-container" id="faq-accordion">
          ${faqData.map((faq, idx) => `
            <div class="faq-accordion-item ${idx === 0 ? 'open' : ''}" data-index="${idx}">
              <button type="button" class="faq-accordion-trigger" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                <span class="faq-question-text">${faq.q}</span>
                <span class="faq-toggle-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div class="faq-accordion-content" style="${idx === 0 ? 'max-height: 200px;' : 'max-height: 0;'}">
                <div class="faq-content-inner">
                  <p class="faq-answer-text">${faq.a}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Still have questions footer card -->
        <div class="faq-support-card text-center mt-5">
          <h3>Have specific engineering drawings or tight tolerances to review?</h3>
          <p class="text-secondary mb-3">Our manufacturing engineering team is available for direct drawing reviews, DFM feedback, and alloy selection consultations.</p>
          <button type="button" class="btn btn-secondary btn-md" id="faq-contact-eng-btn">
            Speak with an Applications Engineer
          </button>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.element = section;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const items = this.element.querySelectorAll('.faq-accordion-item');

    items.forEach((item) => {
      const trigger = item.querySelector('.faq-accordion-trigger');
      const content = item.querySelector('.faq-accordion-content');

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        items.forEach((other) => {
          other.classList.remove('open');
          other.querySelector('.faq-accordion-trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-accordion-content').style.maxHeight = '0';
        });

        // Toggle selected
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = `${content.scrollHeight + 40}px`;
        }
      });
    });

    const contactBtn = this.element.querySelector('#faq-contact-eng-btn');
    contactBtn.addEventListener('click', () => {
      if (this.contactModal) this.contactModal.open();
    });
  }
}
