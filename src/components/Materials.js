import { materialsData } from '../data/materialsData.js';
import { finishesData } from '../data/finishesData.js';

export class Materials {
  constructor(quoteModal) {
    this.quoteModal = quoteModal;
    this.materialsElement = null;
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.comparatorMat1 = 'al-6061';
    this.comparatorMat2 = 'al-7075';
    this.init();
  }

  init() {
    const section = document.createElement('section');
    section.id = 'materials';
    section.className = 'section-padding materials-section';
    section.innerHTML = `
      <div class="container">
        <!-- Section Header -->
        <div class="section-header-block text-center">
          <div class="badge-accent-pill">Engineering Materials & Surface Finishes</div>
          <h2 class="section-headline">Verified Production Materials Directory</h2>
          <p class="section-lead-copy">
            Select from aerospace-grade aluminum alloys, surgical stainless steels, titanium, and high-performance engineering thermoplastics. Compare mechanical properties, continuous service temperatures, and compatible finishes.
          </p>

          <!-- Search & Filter Controls -->
          <div class="materials-controls-bar">
            <div class="mat-search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="mat-search-input" placeholder="Search by alloy (e.g. 6061, 316L, PEEK, Delrin)..." />
            </div>

            <div class="mat-category-pills">
              <button type="button" class="mat-pill active" data-cat="all">All Materials (11)</button>
              <button type="button" class="mat-pill" data-cat="Metals">Metals (6)</button>
              <button type="button" class="mat-pill" data-cat="Plastics">Engineering Plastics (5)</button>
            </div>
          </div>
        </div>

        <!-- Materials Cards Grid -->
        <div class="materials-cards-grid" id="materials-grid-container">
          ${this.renderMaterialsGridHtml()}
        </div>

        <!-- Interactive Side-by-Side Material Comparator -->
        <div class="mat-comparator-box mt-5">
          <div class="comparator-header">
            <div>
              <span class="badge-pill-cyan">Engineering Decision Tool</span>
              <h3 class="comparator-title">Side-by-Side Material Property Comparator</h3>
              <p class="text-secondary text-sm mb-0">Select two engineering materials to evaluate tensile strength, density, maximum service temperature, and relative cost.</p>
            </div>
          </div>

          <div class="comparator-selectors-row">
            <div class="comp-select-group">
              <label for="comp-mat-1" class="comp-label">Material Alpha:</label>
              <select id="comp-mat-1" class="form-control">
                ${materialsData.map(m => `<option value="${m.id}" ${m.id === this.comparatorMat1 ? 'selected' : ''}>${m.name} (${m.category})</option>`).join('')}
              </select>
            </div>
            <div class="comp-vs-badge">VS</div>
            <div class="comp-select-group">
              <label for="comp-mat-2" class="comp-label">Material Beta:</label>
              <select id="comp-mat-2" class="form-control">
                ${materialsData.map(m => `<option value="${m.id}" ${m.id === this.comparatorMat2 ? 'selected' : ''}>${m.name} (${m.category})</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Dynamic Comparison Results Table -->
          <div class="comparator-table-box" id="comparator-results-box">
            ${this.renderComparatorTableHtml()}
          </div>
        </div>

        <!-- Surface Finishes Catalog Subsection -->
        <div class="finishes-subsection mt-5" id="finishes">
          <div class="section-title-small text-center mb-3">Certified Surface Finishes & Post-Processing</div>
          <p class="text-secondary text-center mb-4 max-w-700 mx-auto">
            From bead-blasted satin textures and mil-spec hardcoat anodizing to surgical electropolishing, specify precise surface finishes for cosmetic appeal, corrosion protection, and mechanical wear resistance.
          </p>

          <div class="finishes-cards-grid">
            ${finishesData.map(finish => `
              <div class="finish-item-card">
                <div class="finish-card-top">
                  <h4 class="finish-title">${finish.name}</h4>
                  <span class="finish-ra-badge">${finish.roughness}</span>
                </div>
                <p class="finish-desc">${finish.description}</p>
                <div class="finish-benefits-list">
                  ${finish.benefits.map(b => `<span>✓ ${b}</span>`).join('')}
                </div>
                <div class="finish-meta-footer">
                  <span class="lead-impact">Lead Time Impact: ${finish.leadTimeImpact}</span>
                  <button type="button" class="btn-link text-xs quote-finish-btn" data-finish="${finish.id}">Select for Quote →</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.getElementById('app').appendChild(section);
    this.materialsElement = section;
    this.attachEventListeners();
  }

  renderMaterialsGridHtml() {
    const filtered = materialsData.filter((mat) => {
      const matchCat = this.activeCategory === 'all' || mat.category === this.activeCategory;
      const matchSearch = !this.searchQuery ||
        mat.name.toLowerCase().includes(this.searchQuery) ||
        mat.subcategory.toLowerCase().includes(this.searchQuery) ||
        mat.description.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      return `
        <div class="no-results-box text-center py-5">
          <p class="text-secondary">No materials found matching "${this.searchQuery}". Try searching "Aluminum", "Stainless", "Delrin", or "Titanium".</p>
        </div>
      `;
    }

    return filtered.map((mat) => `
      <div class="material-card">
        <div class="mat-card-header">
          <div>
            <span class="mat-cat-tag">${mat.category} • ${mat.subcategory}</span>
            <h3 class="mat-name">${mat.name}</h3>
          </div>
          <span class="mat-cost-badge">${mat.relativeCost}</span>
        </div>

        <p class="mat-desc">${mat.description}</p>

        <!-- Mechanical Properties Key-Value Grid -->
        <div class="mat-props-grid">
          <div class="prop-cell">
            <span class="prop-k">Tensile Strength:</span>
            <span class="prop-v">${mat.tensileStrength}</span>
          </div>
          <div class="prop-cell">
            <span class="prop-k">Density:</span>
            <span class="prop-v">${mat.density}</span>
          </div>
          <div class="prop-cell">
            <span class="prop-k">Max Service Temp:</span>
            <span class="prop-v">${mat.maxTemp}</span>
          </div>
          <div class="prop-cell">
            <span class="prop-k">Hardness:</span>
            <span class="prop-v">${mat.hardness}</span>
          </div>
          <div class="prop-cell">
            <span class="prop-k">Machinability:</span>
            <span class="prop-v">${mat.machinability}</span>
          </div>
          <div class="prop-cell">
            <span class="prop-k">Best Process:</span>
            <span class="prop-v">${mat.bestProcesses[0]}</span>
          </div>
        </div>

        <!-- Compatible Finishes -->
        <div class="mat-finishes-row">
          <span class="fin-label">Compatible Finishes:</span>
          <div class="fin-tags">
            ${mat.compatibleFinishes.slice(0, 3).map(f => `<span class="fin-mini-tag">${f}</span>`).join('')}
          </div>
        </div>

        <!-- Action Quote Trigger -->
        <div class="mat-card-footer">
          <button type="button" class="btn btn-outline btn-sm w-100 quote-this-material-btn" data-material="${mat.id}">
            Quote with ${mat.name}
          </button>
        </div>
      </div>
    `).join('');
  }

  renderComparatorTableHtml() {
    const m1 = materialsData.find(m => m.id === this.comparatorMat1) || materialsData[0];
    const m2 = materialsData.find(m => m.id === this.comparatorMat2) || materialsData[1];

    return `
      <div class="comp-table-responsive">
        <table class="comp-table">
          <thead>
            <tr>
              <th style="width: 28%;">Engineering Property</th>
              <th style="width: 36%; color: #155eef;">${m1.name} (${m1.subcategory})</th>
              <th style="width: 36%; color: #0284c7;">${m2.name} (${m2.subcategory})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Tensile Strength (Yield)</strong></td>
              <td><strong>${m1.tensileStrength}</strong> (${m1.yieldStrength})</td>
              <td><strong>${m2.tensileStrength}</strong> (${m2.yieldStrength})</td>
            </tr>
            <tr>
              <td><strong>Material Density</strong></td>
              <td>${m1.density}</td>
              <td>${m2.density}</td>
            </tr>
            <tr>
              <td><strong>Continuous Service Temp</strong></td>
              <td>${m1.maxTemp}</td>
              <td>${m2.maxTemp}</td>
            </tr>
            <tr>
              <td><strong>Surface Hardness</strong></td>
              <td>${m1.hardness}</td>
              <td>${m2.hardness}</td>
            </tr>
            <tr>
              <td><strong>Machinability Rating</strong></td>
              <td>${m1.machinability}</td>
              <td>${m2.machinability}</td>
            </tr>
            <tr>
              <td><strong>Relative Raw Material Cost</strong></td>
              <td>${m1.relativeCost}</td>
              <td>${m2.relativeCost}</td>
            </tr>
            <tr>
              <td><strong>Recommended Manufacturing</strong></td>
              <td>${m1.bestProcesses.join(', ')}</td>
              <td>${m2.bestProcesses.join(', ')}</td>
            </tr>
            <tr>
              <td><strong>Key Advantages</strong></td>
              <td>${m1.pros.join('; ')}</td>
              <td>${m2.pros.join('; ')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  attachEventListeners() {
    // Search input
    const searchInput = this.materialsElement.querySelector('#mat-search-input');
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.refreshMaterialsGrid();
    });

    // Category pills
    const pills = this.materialsElement.querySelectorAll('.mat-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeCategory = pill.getAttribute('data-cat');
        this.refreshMaterialsGrid();
      });
    });

    // Comparator selects
    const select1 = this.materialsElement.querySelector('#comp-mat-1');
    const select2 = this.materialsElement.querySelector('#comp-mat-2');

    select1.addEventListener('change', (e) => {
      this.comparatorMat1 = e.target.value;
      this.refreshComparatorTable();
    });

    select2.addEventListener('change', (e) => {
      this.comparatorMat2 = e.target.value;
      this.refreshComparatorTable();
    });

    // Delegate quote buttons
    this.materialsElement.addEventListener('click', (e) => {
      const matBtn = e.target.closest('.quote-this-material-btn');
      if (matBtn) {
        const matId = matBtn.getAttribute('data-material');
        if (this.quoteModal) {
          this.quoteModal.quoteState.material = matId;
          this.quoteModal.open();
        }
      }

      const finishBtn = e.target.closest('.quote-finish-btn');
      if (finishBtn) {
        const finId = finishBtn.getAttribute('data-finish');
        if (this.quoteModal) {
          this.quoteModal.quoteState.finish = finId;
          this.quoteModal.open();
        }
      }
    });
  }

  refreshMaterialsGrid() {
    const container = this.materialsElement.querySelector('#materials-grid-container');
    if (container) {
      container.innerHTML = this.renderMaterialsGridHtml();
    }
  }

  refreshComparatorTable() {
    const container = this.materialsElement.querySelector('#comparator-results-box');
    if (container) {
      container.innerHTML = this.renderComparatorTableHtml();
    }
  }
}
