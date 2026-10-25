import './index.css';

import { QuoteModal } from './components/QuoteModal.js';
import { ContactModal } from './components/ContactModal.js';
import { ServiceModal } from './components/ServiceModal.js';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { Services } from './components/Services.js';
import { Materials } from './components/Materials.js';
import { Industries } from './components/Industries.js';
import { HowItWorks } from './components/HowItWorks.js';
import { QualityLab } from './components/QualityLab.js';
import { PartsGallery } from './components/PartsGallery.js';
import { Resources } from './components/Resources.js';
import { Faq } from './components/Faq.js';
import { RfqTracker } from './components/RfqTracker.js';
import { CtaSection } from './components/CtaSection.js';
import { Footer } from './components/Footer.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // 1. Initialize Modals
  const quoteModal = new QuoteModal();
  const contactModal = new ContactModal();
  const serviceModal = new ServiceModal(quoteModal);

  // 2. Assemble Main Page Components in Logical Order
  const header = new Header(quoteModal, contactModal, serviceModal);
  const hero = new Hero(quoteModal, serviceModal);
  const services = new Services(serviceModal, quoteModal);
  const materials = new Materials(quoteModal);
  const industries = new Industries(quoteModal, contactModal);
  const howItWorks = new HowItWorks(quoteModal);
  const qualityLab = new QualityLab(contactModal);
  const partsGallery = new PartsGallery(quoteModal);
  const resources = new Resources();
  const faq = new Faq(contactModal);
  const rfqTracker = new RfqTracker(quoteModal);
  const ctaSection = new CtaSection(quoteModal, contactModal);
  const footer = new Footer(quoteModal, contactModal, serviceModal);

  // 3. Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  console.log('Sanand Fabrication Digital Manufacturing Platform initialized successfully.');
});
