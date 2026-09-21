/**
 * KnowLab — Main Application Controller (app.js)
 * Domain-First Architecture connecting DomainData, CompatibilityEngine,
 * CalculatorEngine, ComparisonEngine, KnowledgeEngine, and ScenarioEngine.
 */

import { KnowledgeEngine } from '../src/engines/knowledge.js';
import { LearningEngine } from '../src/engines/learning.js';
import { CalculatorEngine } from '../src/engines/calculator.js';
import { CompatibilityEngine } from '../src/engines/compatibility.js';
import { ComparisonEngine } from '../src/engines/comparison.js';
import { ScenarioEngine } from '../src/engines/scenario.js';
import { DomainData } from '../src/data/domainData.js';

class KnowLabApp {
  constructor() {
    this.currentView = 'home';
    this.currentDomainId = 'pc-building';
    this.currentDomainTab = 'overview';
    this.theme = localStorage.getItem('knowlab_theme') || 'dark';

    // PC Builder State
    this.targetBudgetVnd = 30000000;
    this.pcBuild = {
      cpu: DomainData.pc.cpus[2], // Ryzen 7600X
      motherboard: DomainData.pc.motherboards[2], // Gigabyte B650
      ram: DomainData.pc.ram[2], // Corsair DDR5 32GB
      gpu: DomainData.pc.gpus[1], // RTX 4070 Super
      storage: DomainData.pc.storage[0], // Samsung 980 Pro 1TB
      psu: DomainData.pc.psus[2], // Corsair RM750e
      caseComp: DomainData.pc.cases[1], // Montech 903
      cooler: DomainData.pc.coolers[1] // Thermalright Peerless Assassin 120
    };

    // Component picker modal state
    this.currentPickerSlot = null;
  }

  init() {
    this.applyTheme(this.theme);
    this.renderHomeDomains();
    this.renderGlossaryView();
    this.renderCompareView();
    this.renderScenariosView();

    // Check URL parameters for direct routing (e.g. ?domain=pc-building&tab=tools)
    const urlParams = new URLSearchParams(window.location.search);
    const domainParam = urlParams.get('domain');
    const tabParam = urlParams.get('tab') || 'overview';
    const viewParam = urlParams.get('view');

    if (domainParam) {
      this.openDomain(domainParam, tabParam);
    } else if (viewParam) {
      this.switchView(viewParam);
    } else {
      this.switchView('home');
    }

    console.log('KnowLab Domain-First Platform Initialized.');
  }

  // =========================================================================
  // THEME & NAVIGATION
  // =========================================================================
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('knowlab_theme', this.theme);
    this.applyTheme(this.theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sunI = document.getElementById('suni');
    const moonI = document.getElementById('mooni');
    if (sunI && moonI) {
      sunI.style.display = theme === 'light' ? 'inline-block' : 'none';
      moonI.style.display = theme === 'light' ? 'none' : 'inline-block';
    }
  }

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.view-section').forEach(sec => sec.style.display = 'none');

    const target = document.getElementById(`view-${viewName}`);
    if (target) target.style.display = 'block';

    document.querySelectorAll('.nav-link-custom, .sidebar-item').forEach(el => {
      const dataView = el.getAttribute('data-view');
      if (dataView === viewName) el.classList.add('active');
      else el.classList.remove('active');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  formatVnd(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  // =========================================================================
  // 1. HOME VIEW
  // =========================================================================
  renderHomeDomains() {
    const container = document.getElementById('domainGridContainer');
    if (!container) return;

    const domains = KnowledgeEngine.getDomains();
    container.innerHTML = domains.map(d => `
      <div class="domain-card gc p-4 h-100" onclick="app.openDomain('${d.id}', 'overview')" style="cursor: pointer;">
        <div class="domain-icon-wrapper mb-3" style="color: ${d.color}; font-size: 2rem;">
          <i class="fa-solid ${d.icon}"></i>
        </div>
        <h4 class="domain-title fw-bold text-white mb-2">${d.name}</h4>
        <p class="domain-desc text-secondary small mb-3">${d.desc}</p>
        <div class="d-flex align-items-center justify-content-between pt-2 border-top border-secondary-subtle">
          <span class="badge bg-secondary-subtle text-white-50"><i class="fa-solid fa-layer-group me-1"></i> 5 Cấp độ (L0-L4)</span>
          <span class="fw-bold small" style="color: ${d.color}">Vào Domain &rarr;</span>
        </div>
      </div>
    `).join('');
  }

  handleSearch(query) {
    if (!query || query.trim().length < 2) return;
    const results = KnowledgeEngine.search(query);
    if (results.concepts.length > 0) {
      const firstConcept = results.concepts[0];
      this.openDomain(firstConcept.domainId, 'topics');
    }
  }

  // =========================================================================
  // 2. DOMAIN LANDING HUB (8 TABS MANDATORY)
  // =========================================================================
  openDomain(domainId, tab = 'overview') {
    this.currentDomainId = domainId;
    this.currentDomainTab = tab;
    this.switchView('domain');

    const domain = KnowledgeEngine.getDomainById(domainId);
    if (!domain) return;

    // Render Domain Hub Header
    const headerEl = document.getElementById('domainHubHeader');
    if (headerEl) {
      headerEl.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-4 d-flex align-items-center justify-content-center" style="width: 64px; height: 64px; background: rgba(255,255,255,0.06); color: ${domain.color}; font-size: 2rem;">
              <i class="fa-solid ${domain.icon}"></i>
            </div>
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <h2 class="fw-bold text-white mb-0">${domain.name}</h2>
                <span class="badge" style="background: ${domain.color}22; color: ${domain.color}; border: 1px solid ${domain.color}44;">Domain-First Hub</span>
              </div>
              <p class="text-secondary mb-0" style="max-width: 700px;">${domain.tagline || domain.desc}</p>
            </div>
          </div>
          <div class="d-flex gap-2">
            <button class="bgrd btn-sm" onclick="app.switchDomainTab('tools')">
              <i class="fa-solid fa-wrench me-1"></i> Mở Công Cụ
            </button>
            <button class="boc btn-sm" onclick="app.switchDomainTab('topics')">
              <i class="fa-solid fa-book-open me-1"></i> Xem Chủ Đề (L0-L4)
            </button>
          </div>
        </div>
      `;
    }

    this.renderDomainNavTabs();
    this.renderDomainActiveTabContent();
  }

  renderDomainNavTabs() {
    const tabsContainer = document.getElementById('domainNavTabs');
    if (!tabsContainer) return;

    const tabs = [
      { id: 'overview', label: 'Tổng Quan', icon: 'fa-compass' },
      { id: 'tools', label: 'Công Cụ Chuyên Môn', icon: 'fa-wrench' },
      { id: 'topics', label: 'Chủ Đề & Khái Niệm L0-L4', icon: 'fa-graduation-cap' },
      { id: 'compare', label: 'So Sánh Đối Tượng', icon: 'fa-code-compare' },
      { id: 'scenarios', label: 'Kịch Bản Đã Lưu', icon: 'fa-bookmark' },
      { id: 'glossary', label: 'Thuật Ngữ', icon: 'fa-spell-check' },
      { id: 'advanced', label: 'Chuyên Sâu L3-L4', icon: 'fa-brain' },
      { id: 'sources', label: 'Nguồn & Dữ Liệu', icon: 'fa-shield-halved' }
    ];

    tabsContainer.innerHTML = tabs.map(t => `
      <button class="domain-nav-tab ${this.currentDomainTab === t.id ? 'active' : ''}" onclick="app.switchDomainTab('${t.id}')">
        <i class="fa-solid ${t.icon}"></i> ${t.label}
      </button>
    `).join('');
  }

  switchDomainTab(tabId) {
    this.currentDomainTab = tabId;
    this.renderDomainNavTabs();
    this.renderDomainActiveTabContent();
  }

  renderDomainActiveTabContent() {
    const container = document.getElementById('domainTabContent');
    if (!container) return;

    switch (this.currentDomainTab) {
      case 'overview':
        this.renderTabOverview(container);
        break;
      case 'tools':
        this.renderTabTools(container);
        break;
      case 'topics':
        this.renderTabTopics(container);
        break;
      case 'compare':
        this.renderTabCompare(container);
        break;
      case 'scenarios':
        this.renderTabScenarios(container);
        break;
      case 'glossary':
        this.renderTabGlossary(container);
        break;
      case 'advanced':
        this.renderTabAdvanced(container);
        break;
      case 'sources':
        this.renderTabSources(container);
        break;
      default:
        this.renderTabOverview(container);
    }
  }

  // TAB 1: OVERVIEW
  renderTabOverview(container) {
    const domain = KnowledgeEngine.getDomainById(this.currentDomainId);
    container.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-8">
          <div class="gc p-4 mb-4">
            <h4 class="fw-bold text-white mb-3"><i class="fa-solid fa-bullseye text-warning me-2"></i>Mục Tiêu &amp; Lộ Trình Đào Sâu</h4>
            <p class="text-secondary leading-relaxed mb-4">${domain.desc}</p>
            
            <div class="p-3 bg-dark-subtle rounded-3 border border-secondary-subtle mb-4">
              <strong class="text-white small d-block mb-2"><i class="fa-solid fa-circle-check text-success me-1"></i>Quy Trình Ra Quyết Định Có Cơ Sở (Zero-Knowledge):</strong>
              <div class="d-flex align-items-center gap-2 flex-wrap text-secondary small">
                <span>Chọn chủ đề</span> &rarr; <span>Hiểu thông số</span> &rarr; <span>Tính toán / Kiểm tra</span> &rarr; <span>Thử biến số What-if</span> &rarr; <span>So sánh trade-off</span> &rarr; <span class="text-white fw-bold">Lưu kịch bản</span>
              </div>
            </div>

            <div class="d-flex gap-2">
              <button class="bgrd" onclick="app.switchDomainTab('tools')">
                <i class="fa-solid fa-play me-1"></i> Khởi chạy công cụ ngay
              </button>
              <button class="boc" onclick="app.switchDomainTab('advanced')">
                <i class="fa-solid fa-bolt me-1"></i> Xem kiến thức chuyên sâu
              </button>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="gc p-4">
            <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-layer-group text-primary me-2"></i>5 Cấp Độ Kiến Thức</h5>
            <div class="d-flex flex-column gap-2 small">
              <div class="p-2 bg-dark rounded-3 border border-secondary-subtle">
                <strong class="text-info">L0 — Mới bắt đầu:</strong> Thuật ngữ &amp; khái niệm cơ bản
              </div>
              <div class="p-2 bg-dark rounded-3 border border-secondary-subtle">
                <strong class="text-primary">L1 — Hiểu quan hệ:</strong> Cấu trúc &amp; quan hệ giữa các biến
              </div>
              <div class="p-2 bg-dark rounded-3 border border-secondary-subtle">
                <strong class="text-warning">L2 — Thực hành:</strong> Tính toán, kiểm tra &amp; mô phỏng
              </div>
              <div class="p-2 bg-dark rounded-3 border border-secondary-subtle">
                <strong class="text-danger">L3 — Phân tích:</strong> Phân tích trade-off, nghẽn &amp; rủi ro
              </div>
              <div class="p-2 bg-dark rounded-3 border border-secondary-subtle">
                <strong class="text-purple">L4 — Chuyên sâu:</strong> Kiến trúc vi mô &amp; phương pháp luận
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 2: TOOLS (DOMAIN SPECIFIC)
  renderTabTools(container) {
    if (this.currentDomainId === 'pc-building') {
      this.renderPCBuilderTool(container);
    } else if (this.currentDomainId === 'real-estate') {
      this.renderRealEstateTools(container);
    } else if (this.currentDomainId === 'cars') {
      this.renderCarsTools(container);
    } else if (this.currentDomainId === 'motorcycles') {
      this.renderMotorcyclesTools(container);
    } else if (this.currentDomainId === 'home') {
      this.renderHomeTools(container);
    } else if (this.currentDomainId === 'feng-shui') {
      this.renderFengShuiTools(container);
    }
  }

  // TAB 3: TOPICS L0-L4
  renderTabTopics(container) {
    const concepts = KnowledgeEngine.getConceptsByDomain(this.currentDomainId);
    container.innerHTML = `
      <div class="mb-4">
        <h4 class="fw-bold text-white mb-1"><i class="fa-solid fa-graduation-cap text-purple me-2"></i>Danh Sách Chủ Đề &amp; Khái Niệm</h4>
        <p class="text-secondary small mb-0">Bạn có thể nhấp trực tiếp vào bất kỳ cấp độ nào từ L0 đến L4 mà không bị khóa bài.</p>
      </div>

      <div class="row g-4">
        ${concepts.map(c => `
          <div class="col-md-6">
            <div class="gc p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="badge bg-purple-subtle text-purple">Level ${c.level}</span>
                  <span class="small text-secondary"><i class="fa-solid fa-check me-1"></i>Độ sâu ${c.level === 0 ? 'Cơ bản' : (c.level >= 3 ? 'Chuyên sâu' : 'Ứng dụng')}</span>
                </div>
                <h5 class="fw-bold text-white mb-2">${c.title}</h5>
                <p class="text-info small fw-semibold mb-2">${c.summary}</p>
                <p class="text-secondary small mb-3">${c.explanation}</p>
                
                <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-2">
                  <strong class="text-warning small"><i class="fa-solid fa-circle-question me-1"></i>Tại sao quan trọng?</strong>
                  <p class="text-white-50 small mb-0 mt-1">${c.whyItMatters || ''}</p>
                </div>
                <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
                  <strong class="text-danger small"><i class="fa-solid fa-triangle-exclamation me-1"></i>Sai lầm phổ biến:</strong>
                  <p class="text-white-50 small mb-0 mt-1">${c.commonMistakes || ''}</p>
                </div>
              </div>

              <div class="pt-2 border-top border-secondary-subtle d-flex align-items-center justify-content-between">
                <span class="small text-secondary"><i class="fa-solid fa-lightbulb me-1"></i>Ví dụ: ${c.realExample || 'Thực tế'}</span>
                <button class="btn btn-sm btn-outline-purple" onclick="app.switchDomainTab('tools')">
                  Thử công cụ &rarr;
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // TAB 4: COMPARE
  renderTabCompare(container) {
    container.innerHTML = `
      <div class="mb-4">
        <h4 class="fw-bold text-white mb-1"><i class="fa-solid fa-code-compare text-success me-2"></i>So Sánh Đối Tượng Chuẩn Hóa</h4>
        <p class="text-secondary small mb-0">So sánh tiêu chí kỹ thuật, ưu nhược điểm minh bạch không ép một winner duy nhất.</p>
      </div>
      <div id="domainCompareContainer">
        <!-- Rendered by domain -->
      </div>
    `;
    this.renderDomainCompareContent();
  }

  // TAB 5: SCENARIOS
  renderTabScenarios(container) {
    const scenarios = ScenarioEngine.getScenarios(this.currentDomainId);
    container.innerHTML = `
      <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <div>
          <h4 class="fw-bold text-white mb-1"><i class="fa-solid fa-bookmark text-primary me-2"></i>Kịch Bản Của Lĩnh Vực Này</h4>
          <p class="text-secondary small mb-0">Lưu trữ thông số đầu vào, giả định và kết quả tính toán có đánh dấu phiên bản.</p>
        </div>
        <span class="badge bg-secondary-subtle text-white">${scenarios.length} Kịch Bản Đã Lưu</span>
      </div>

      <div class="row g-3">
        ${scenarios.length === 0 ? `
          <div class="col-12 text-center py-5 gc">
            <i class="fa-solid fa-box-open text-secondary fs-1 mb-3"></i>
            <p class="text-secondary mb-3">Chưa có kịch bản nào cho lĩnh vực này. Hãy thử chạy một mô phỏng trong tab Công Cụ và nhấn "Lưu Kịch Bản".</p>
            <button class="bgrd btn-sm" onclick="app.switchDomainTab('tools')">Mở Công Cụ Thử Nghiệm</button>
          </div>
        ` : scenarios.map(s => `
          <div class="col-md-6">
            <div class="gc p-4 h-100">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="fw-bold text-white mb-0">${s.name}</h5>
                <span class="badge bg-primary-subtle text-primary">${s.engineVersion}</span>
              </div>
              <div class="small text-secondary mb-3">Tạo lúc: ${new Date(s.createdAt).toLocaleDateString('vi-VN')}</div>
              <div class="p-3 bg-dark rounded-3 small text-info mb-3">
                ${Object.entries(s.results || {}).slice(0, 3).map(([k, v]) => `<div><strong>${k}:</strong> ${typeof v === 'number' ? app.formatVnd(v) : v}</div>`).join('')}
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-danger" onclick="app.deleteScenario('${s.id}')"><i class="fa-solid fa-trash me-1"></i>Xóa</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // TAB 6: GLOSSARY
  renderTabGlossary(container) {
    const terms = KnowledgeEngine.getGlossaryTerms(this.currentDomainId);
    container.innerHTML = `
      <div class="mb-4">
        <h4 class="fw-bold text-white mb-1"><i class="fa-solid fa-spell-check text-warning me-2"></i>Từ Điển Thuật Ngữ</h4>
        <p class="text-secondary small mb-0">Các thuật ngữ chuyên môn được giải thích bằng ngôn ngữ dễ hiểu và chi tiết kỹ thuật.</p>
      </div>

      <div class="row g-3">
        ${terms.map(t => `
          <div class="col-md-6">
            <div class="gc p-4 h-100">
              <h5 class="fw-bold text-primary mb-2">${t.term}</h5>
              <p class="text-white-50 small mb-2">${t.shortDef}</p>
              <p class="text-secondary small mb-0">${t.longDef || ''}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // TAB 7: ADVANCED L3-L4
  renderTabAdvanced(container) {
    const advancedConcepts = KnowledgeEngine.getConceptsByDomain(this.currentDomainId).filter(c => c.level >= 3);
    container.innerHTML = `
      <div class="mb-4">
        <h4 class="fw-bold text-white mb-1"><i class="fa-solid fa-brain text-purple me-2"></i>Kiến Thức Chuyên Sâu &amp; Phương Pháp Luận (L3 - L4)</h4>
        <p class="text-secondary small mb-0">Dành cho người muốn hiểu sâu về kiến trúc vi mô, phân tích trade-off và các trường hợp lỗi biên.</p>
      </div>

      <div class="row g-4">
        ${advancedConcepts.map(c => `
          <div class="col-12">
            <div class="gc p-4 border border-purple-subtle">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="fw-bold text-white mb-0">${c.title}</h5>
                <span class="badge bg-purple text-white">Level ${c.level}</span>
              </div>
              <p class="text-info fw-semibold small mb-3">${c.summary}</p>
              <p class="text-secondary small leading-relaxed mb-3">${c.explanation}</p>
              
              <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
                <strong class="text-warning small d-block mb-1"><i class="fa-solid fa-microchip me-1"></i>Chi tiết kỹ thuật chuyên sâu (Technical Details):</strong>
                <p class="text-white-50 small mb-0 font-monospace">${c.technicalDetails || 'Đang cập nhật'}</p>
              </div>

              <div class="small text-secondary">
                <i class="fa-solid fa-book-bookmark me-1"></i>Nguồn tham chiếu: <strong>${c.source || 'Tài liệu kỹ thuật tiêu chuẩn'}</strong>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // TAB 8: SOURCES
  renderTabSources(container) {
    container.innerHTML = `
      <div class="gc p-4">
        <h4 class="fw-bold text-white mb-3"><i class="fa-solid fa-shield-halved text-success me-2"></i>Minh Bạch Nguồn Dữ Liệu &amp; Phân Loại</h4>
        <p class="text-secondary small mb-4">Mọi dữ liệu trên KnowLab đều được phân loại rõ ràng theo chuẩn Data Trust &amp; Safety:</p>
        
        <div class="row g-3 mb-4">
          <div class="col-md-4">
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle">
              <span class="data-tag tag-fact mb-2">FACT (Dữ Kiện)</span>
              <p class="small text-secondary mb-0">Thông số kỹ thuật nhà sản xuất công bố (kích thước, cổng cắm, tiêu chuẩn JEDEC/ATX).</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle">
              <span class="data-tag tag-assumption mb-2">ASSUMPTION (Giả Định)</span>
              <p class="small text-secondary mb-0">Các biến số tính toán (tỷ lệ dự phòng nguồn 20-30%, tỷ lệ lạm phát, khấu hao xe).</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle">
              <span class="data-tag tag-estimate mb-2">ESTIMATE (Ước Tính)</span>
              <p class="small text-secondary mb-0">Kết quả suy ra từ mô hình toán học hoặc mô phỏng phụ tải thực tế.</p>
            </div>
          </div>
        </div>

        <div class="p-3 bg-dark rounded-3 border border-warning-subtle text-secondary small">
          <strong class="text-warning"><i class="fa-solid fa-triangle-exclamation me-1"></i>Lưu ý về tính độc lập:</strong>
          KnowLab không bán hàng, không nhận tài trợ quảng cáo từ bất kỳ thương hiệu linh kiện hay đơn vị phân phối nào. Mọi phân tích nhằm hỗ trợ người dùng tự đưa ra quyết định tối ưu.
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 3. SMART PC BUILDER IMPLEMENTATION
  // =========================================================================
  renderPCBuilderTool(container) {
    const report = CompatibilityEngine.check(this.pcBuild);
    const totalPrice = this.calculateBuildPrice();
    const budgetPercent = Math.min(100, Math.round((totalPrice / this.targetBudgetVnd) * 100));

    container.innerHTML = `
      <!-- PRESET BUTTONS & ACTIONS -->
      <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <div class="d-flex gap-2 flex-wrap">
          <button class="boc btn-sm" onclick="app.loadPresetBuild('budget-am5')"><i class="fa-solid fa-microchip me-1"></i>Cấu hình Gaming AM5 (30 Tr)</button>
          <button class="boc btn-sm" onclick="app.loadPresetBuild('intel-creator')"><i class="fa-solid fa-film me-1"></i>Cấu hình Creator i7 (45 Tr)</button>
          <button class="boc btn-sm text-danger border-danger-subtle" onclick="app.loadPresetBuild('error-demo')"><i class="fa-solid fa-bug me-1"></i>Thử Nghiệm Lỗi Xung Đột</button>
          <button class="boc btn-sm" onclick="app.clearPcBuild()"><i class="fa-solid fa-rotate-left me-1"></i>Làm Mới</button>
        </div>
        <div>
          <button class="bgrd btn-sm" onclick="app.savePcBuildScenario()"><i class="fa-solid fa-bookmark me-1"></i>Lưu Cấu Hình Vào Scenario</button>
        </div>
      </div>

      <!-- COMPATIBILITY ALERT BOX -->
      <div class="compat-alert-box status-${report.status}">
        <div class="d-flex align-items-start gap-3">
          <div class="fs-3">
            ${report.status === 'COMPATIBLE' ? '<i class="fa-solid fa-circle-check"></i>' : (report.status === 'WARNING' ? '<i class="fa-solid fa-triangle-exclamation"></i>' : '<i class="fa-solid fa-circle-xmark"></i>')}
          </div>
          <div class="flex-grow-1">
            <h5 class="fw-bold mb-1">${report.statusSummary}</h5>
            <div class="small mb-2">Trạng thái: <strong>${report.status}</strong> | Tải đỉnh: <strong>${report.power.totalPeakWatts}W</strong> | Nguồn đề xuất: <strong>${report.power.recommendedPsuWatts}W</strong> | Headroom: <strong>${report.power.headroomPercent}%</strong></div>
            
            ${report.issues.length > 0 ? `
              <div class="mt-3 pt-2 border-top border-secondary-subtle">
                ${report.issues.map(iss => `
                  <div class="mb-2 p-2 rounded-3 bg-dark text-white border border-secondary-subtle small">
                    <div class="fw-bold text-${iss.severity === 'error' ? 'danger' : 'warning'}"><i class="fa-solid fa-circle-exclamation me-1"></i>${iss.title}</div>
                    <div class="text-white-50">${iss.message}</div>
                    <div class="text-info mt-1"><i class="fa-solid fa-lightbulb me-1"></i>${iss.recommendation}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- COMPONENT SLOTS LIST (LEFT) -->
        <div class="col-lg-8">
          <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-layer-group text-primary me-2"></i>Danh Sách Linh Kiện (8 Slot Tiêu Chuẩn)</h5>
          
          <!-- SLOTS -->
          ${this.renderSlotCard('cpu', 'Bộ Vi Xử Lý (CPU)', 'fa-microchip', this.pcBuild.cpu)}
          ${this.renderSlotCard('motherboard', 'Bo Mạch Chủ (Mainboard)', 'fa-chess-board', this.pcBuild.motherboard)}
          ${this.renderSlotCard('ram', 'Bộ Nhớ RAM', 'fa-memory', this.pcBuild.ram)}
          ${this.renderSlotCard('gpu', 'Card Đồ Họa (GPU)', 'fa-tv', this.pcBuild.gpu)}
          ${this.renderSlotCard('storage', 'Ổ Cứng Lưu Trữ (SSD)', 'fa-hard-drive', this.pcBuild.storage)}
          ${this.renderSlotCard('psu', 'Nguồn Điện (PSU)', 'fa-plug', this.pcBuild.psu)}
          ${this.renderSlotCard('caseComp', 'Vỏ Thùng Máy (Case)', 'fa-cube', this.pcBuild.caseComp)}
          ${this.renderSlotCard('cooler', 'Tản Nhiệt CPU (Cooler)', 'fa-fan', this.pcBuild.cooler)}

          <!-- BENCHMARK INTEGRATION -->
          <div class="gc p-4 mt-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="fw-bold text-white mb-0"><i class="fa-solid fa-gauge-high text-warning me-2"></i>Dữ Liệu Benchmark Tham Chiếu (Có Nguồn Kiểm Định)</h5>
              <span class="badge bg-secondary-subtle text-white-50">Test Conditions Certified</span>
            </div>
            <p class="text-secondary small mb-3">Hiển thị hiệu năng thực tế đo đạc trong phòng lab cho tổ hợp CPU &amp; GPU tương ứng:</p>
            
            <div class="row g-3">
              ${DomainData.pc.benchmarks.map(b => `
                <div class="col-md-4">
                  <div class="benchmark-card h-100 p-3">
                    <h6 class="fw-bold text-white mb-1">${b.game}</h6>
                    <div class="spec-badge">${b.resolution}</div>
                    <div class="spec-badge">${b.graphicsPreset}</div>
                    <div class="output-hero-val text-success my-2" style="font-size: 1.8rem;">${b.avgFps} <span class="fs-6 text-secondary">FPS Avg</span></div>
                    <div class="small text-secondary">1% Low: <strong class="text-warning">${b.p1LowFps} FPS</strong></div>
                    <div class="small text-secondary mt-2 pt-2 border-top border-secondary-subtle">
                      Nguồn: <a href="${b.sourceUrl}" target="_blank" class="text-info">${b.source}</a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- STICKY CART & POWER GAUGE (RIGHT) -->
        <div class="col-lg-4">
          <div class="sticky-cart-summary">
            <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-calculator text-success me-2"></i>Tổng Ngân Sách Cấu Hình</h5>
            
            <div class="output-hero-val text-success mb-1">
              ${this.formatVnd(totalPrice)}
            </div>
            <div class="small text-secondary mb-3">
              Mục tiêu ngân sách: <strong>${this.formatVnd(this.targetBudgetVnd)}</strong>
            </div>

            <!-- BUDGET PROGRESS BAR -->
            <div class="progress mb-3" style="height: 10px; background: rgba(255,255,255,0.08); border-radius: 5px;">
              <div class="progress-bar ${budgetPercent > 100 ? 'bg-danger' : 'bg-success'}" role="progressbar" style="width: ${budgetPercent}%;"></div>
            </div>
            ${budgetPercent > 100 ? `
              <div class="alert alert-danger p-2 small mb-3"><i class="fa-solid fa-triangle-exclamation me-1"></i>Vượt ngân sách mục tiêu ${budgetPercent - 100}%!</div>
            ` : ''}

            <!-- POWER GAUGE -->
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
              <div class="d-flex justify-content-between small text-secondary mb-1">
                <span>Ước tính tải tối đa (Peak):</span>
                <strong class="text-white">${report.power.totalPeakWatts} W</strong>
              </div>
              <div class="d-flex justify-content-between small text-secondary mb-1">
                <span>Nguồn khuyến nghị (+30%):</span>
                <strong class="text-warning">${report.power.recommendedPsuWatts} W</strong>
              </div>
              <div class="d-flex justify-content-between small text-secondary">
                <span>Độ dự phòng an toàn (Headroom):</span>
                <strong class="${report.power.headroomPercent >= 20 ? 'text-success' : 'text-danger'}">${report.power.headroomPercent}%</strong>
              </div>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="d-flex flex-column gap-2">
              <button class="bgrd w-100 justify-content-center" onclick="app.savePcBuildScenario()">
                <i class="fa-solid fa-floppy-disk me-1"></i> Lưu Cấu Hình PC
              </button>
              <button class="boc w-100 justify-content-center" onclick="window.print()">
                <i class="fa-solid fa-print me-1"></i> In Báo Cáo Cấu Hình
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderSlotCard(slotKey, slotTitle, iconClass, selectedItem) {
    if (!selectedItem) {
      return `
        <div class="pc-slot-card border-dashed">
          <div class="pc-slot-type">
            <i class="fa-solid ${iconClass}"></i> ${slotTitle}
          </div>
          <div class="pc-slot-item-info text-secondary small">
            <em>Chưa chọn linh kiện cho slot này</em>
          </div>
          <div class="pc-slot-price text-secondary">-</div>
          <button class="bgrd btn-sm" onclick="app.openComponentPicker('${slotKey}')">
            <i class="fa-solid fa-plus me-1"></i> Chọn
          </button>
        </div>
      `;
    }

    return `
      <div class="pc-slot-card">
        <div class="pc-slot-type">
          <i class="fa-solid ${iconClass}"></i> ${slotTitle}
        </div>
        <div class="pc-slot-item-info">
          <div class="pc-slot-name">${selectedItem.name}</div>
          <div class="pc-slot-spec">
            ${selectedItem.socket ? `<span class="spec-badge">Socket ${selectedItem.socket}</span>` : ''}
            ${selectedItem.chipset ? `<span class="spec-badge">${selectedItem.chipset}</span>` : ''}
            ${selectedItem.tdpWatts ? `<span class="spec-badge">${selectedItem.tdpWatts}W TDP</span>` : ''}
            ${selectedItem.vramGb ? `<span class="spec-badge">${selectedItem.vramGb}GB VRAM</span>` : ''}
            ${selectedItem.lengthMm ? `<span class="spec-badge">Dài ${selectedItem.lengthMm}mm</span>` : ''}
            ${selectedItem.wattageWatts ? `<span class="spec-badge">${selectedItem.wattageWatts}W</span>` : ''}
            ${selectedItem.formFactor ? `<span class="spec-badge">${selectedItem.formFactor}</span>` : ''}
          </div>
        </div>
        <div class="pc-slot-price">
          ${this.formatVnd(selectedItem.priceVnd)}
        </div>
        <div class="d-flex gap-1">
          <button class="boc btn-sm" onclick="app.openComponentPicker('${slotKey}')" title="Đổi linh kiện">
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
          </button>
          <button class="boc btn-sm text-danger" onclick="app.removeComponent('${slotKey}')" title="Gỡ bỏ">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
  }

  calculateBuildPrice() {
    let total = 0;
    Object.values(this.pcBuild).forEach(item => {
      if (item && item.priceVnd) total += item.priceVnd;
    });
    return total;
  }

  openComponentPicker(slotKey) {
    this.currentPickerSlot = slotKey;
    const modalEl = document.getElementById('componentPickerModal');
    const modalBody = document.getElementById('componentPickerBody');
    const modalTitle = document.getElementById('componentPickerTitle');

    if (!modalEl || !modalBody) return;

    modalTitle.textContent = `Chọn Linh Kiện: ${slotKey.toUpperCase()}`;

    // Map slot key to data catalog
    const catalogMap = {
      cpu: DomainData.pc.cpus,
      motherboard: DomainData.pc.motherboards,
      ram: DomainData.pc.ram,
      gpu: DomainData.pc.gpus,
      storage: DomainData.pc.storage,
      psu: DomainData.pc.psus,
      caseComp: DomainData.pc.cases,
      cooler: DomainData.pc.coolers
    };

    const items = catalogMap[slotKey] || [];

    modalBody.innerHTML = `
      <div class="list-group">
        ${items.map(item => `
          <div class="list-group-item bg-dark text-white border-secondary-subtle p-3 mb-2 rounded-3 d-flex align-items-center justify-content-between">
            <div>
              <h6 class="fw-bold text-white mb-1">${item.name}</h6>
              <div class="small text-secondary">
                ${item.socket ? `<span class="spec-badge">${item.socket}</span>` : ''}
                ${item.cores ? `<span class="spec-badge">${item.cores} Cores</span>` : ''}
                ${item.ramType ? `<span class="spec-badge">${item.ramType}</span>` : ''}
                ${item.generation ? `<span class="spec-badge">${item.generation}</span>` : ''}
                ${item.tdpWatts ? `<span class="spec-badge">${item.tdpWatts}W</span>` : ''}
                ${item.wattageWatts ? `<span class="spec-badge">${item.wattageWatts}W</span>` : ''}
                ${item.lengthMm ? `<span class="spec-badge">Dài ${item.lengthMm}mm</span>` : ''}
                ${item.maxGpuLengthMm ? `<span class="spec-badge">Hỗ trợ GPU ${item.maxGpuLengthMm}mm</span>` : ''}
              </div>
            </div>
            <div class="text-end">
              <div class="fw-bold text-success mb-2">${app.formatVnd(item.priceVnd)}</div>
              <button class="bgrd btn-sm" onclick="app.selectComponent('${slotKey}', '${item.id}')">
                Chọn
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }

  selectComponent(slotKey, itemId) {
    const catalogMap = {
      cpu: DomainData.pc.cpus,
      motherboard: DomainData.pc.motherboards,
      ram: DomainData.pc.ram,
      gpu: DomainData.pc.gpus,
      storage: DomainData.pc.storage,
      psu: DomainData.pc.psus,
      caseComp: DomainData.pc.cases,
      cooler: DomainData.pc.coolers
    };

    const found = (catalogMap[slotKey] || []).find(i => i.id === itemId);
    if (found) {
      this.pcBuild[slotKey] = found;
      const modalEl = document.getElementById('componentPickerModal');
      const bsModal = bootstrap.Modal.getInstance(modalEl);
      if (bsModal) bsModal.hide();
      this.renderDomainActiveTabContent();
    }
  }

  removeComponent(slotKey) {
    this.pcBuild[slotKey] = null;
    this.renderDomainActiveTabContent();
  }

  clearPcBuild() {
    this.pcBuild = {
      cpu: null, motherboard: null, ram: null, gpu: null,
      storage: null, psu: null, caseComp: null, cooler: null
    };
    this.renderDomainActiveTabContent();
  }

  loadPresetBuild(presetKey) {
    if (presetKey === 'budget-am5') {
      this.pcBuild = {
        cpu: DomainData.pc.cpus[2], // Ryzen 7600X
        motherboard: DomainData.pc.motherboards[2], // Gigabyte B650
        ram: DomainData.pc.ram[2], // Corsair DDR5 32GB
        gpu: DomainData.pc.gpus[1], // RTX 4070 Super
        storage: DomainData.pc.storage[0], // Samsung 980 Pro
        psu: DomainData.pc.psus[2], // Corsair 750W
        caseComp: DomainData.pc.cases[1], // Montech 903
        cooler: DomainData.pc.coolers[1] // Peerless Assassin 120
      };
    } else if (presetKey === 'intel-creator') {
      this.pcBuild = {
        cpu: DomainData.pc.cpus[1], // i7-14700K
        motherboard: DomainData.pc.motherboards[1], // MSI B760M D5
        ram: DomainData.pc.ram[3], // G.Skill DDR5 32GB
        gpu: DomainData.pc.gpus[2], // RTX 4080 Super
        storage: DomainData.pc.storage[0],
        psu: DomainData.pc.psus[3], // ASUS TUF 850W
        caseComp: DomainData.pc.cases[1],
        cooler: DomainData.pc.coolers[2] // DeepCool 360mm AIO
      };
    } else if (presetKey === 'error-demo') {
      // Intentionally cause multiple conflicts!
      this.pcBuild = {
        cpu: DomainData.pc.cpus[0], // Intel i5-13600K (LGA1700)
        motherboard: DomainData.pc.motherboards[2], // Gigabyte B650 (AM5) -> SOCKET CONFLICT!
        ram: DomainData.pc.ram[0], // Corsair DDR4 -> RAM TYPE CONFLICT with B650 DDR5!
        gpu: DomainData.pc.gpus[2], // RTX 4080 Super (342mm)
        storage: DomainData.pc.storage[0],
        psu: DomainData.pc.psus[0], // 550W PSU -> UNDERPOWERED!
        caseComp: DomainData.pc.cases[0], // NYX Air (Max GPU 315mm) -> GPU CLEARANCE CONFLICT!
        cooler: DomainData.pc.coolers[1]
      };
    }
    this.renderDomainActiveTabContent();
  }

  savePcBuildScenario() {
    const report = CompatibilityEngine.check(this.pcBuild);
    const totalPrice = this.calculateBuildPrice();
    const scenario = ScenarioEngine.saveScenario({
      name: `Cấu hình PC: ${this.pcBuild.cpu ? this.pcBuild.cpu.name : 'Custom'} + ${this.pcBuild.gpu ? this.pcBuild.gpu.name : ''}`,
      domainId: 'pc-building',
      goal: 'Lắp ráp PC Gaming & Làm việc',
      inputs: {
        cpu: this.pcBuild.cpu ? this.pcBuild.cpu.name : null,
        gpu: this.pcBuild.gpu ? this.pcBuild.gpu.name : null,
        motherboard: this.pcBuild.motherboard ? this.pcBuild.motherboard.name : null,
        psu: this.pcBuild.psu ? this.pcBuild.psu.name : null
      },
      results: {
        totalPriceVnd: totalPrice,
        status: report.status,
        peakWatts: report.power.totalPeakWatts,
        recommendedPsuWatts: report.power.recommendedPsuWatts,
        headroomPercent: report.power.headroomPercent
      },
      assumptions: report.power.assumptions
    });

    alert(`Đã lưu kịch bản PC thành công!\nMã kịch bản: ${scenario.id}\nTổng giá: ${this.formatVnd(totalPrice)}`);
  }

  // =========================================================================
  // 4. REAL ESTATE TOOLS
  // =========================================================================
  renderRealEstateTools(container) {
    const mortgage = CalculatorEngine.calculateMortgage({
      price: 2850000000,
      downPaymentPercent: 30,
      interestRatePercent: 9.5,
      termYears: 20,
      monthlyIncome: 45000000,
      monthlyRentIncome: 12000000
    });

    container.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="gc p-4">
            <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-sliders text-primary me-2"></i>Tham Số Vay Mua &amp; Khai Thác BĐS</h5>
            
            <div class="lab-input-group mb-3">
              <label class="lab-label">Giá Trị Bất Động Sản (VNĐ):</label>
              <input type="number" class="lab-control" id="rePrice" value="2850000000" onchange="app.recalculateMortgage()">
            </div>

            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="lab-label">% Trả Trước (%):</label>
                <input type="number" class="lab-control" id="reDown" value="30" onchange="app.recalculateMortgage()">
              </div>
              <div class="col-6">
                <label class="lab-label">Lãi Suất Năm (%):</label>
                <input type="number" step="0.1" class="lab-control" id="reRate" value="9.5" onchange="app.recalculateMortgage()">
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="lab-label">Thời Hạn Vay (Năm):</label>
                <input type="number" class="lab-control" id="reTerm" value="20" onchange="app.recalculateMortgage()">
              </div>
              <div class="col-6">
                <label class="lab-label">Thu Nhập Hàng Tháng (VNĐ):</label>
                <input type="number" class="lab-control" id="reIncome" value="45000000" onchange="app.recalculateMortgage()">
              </div>
            </div>

            <div class="lab-input-group mb-3">
              <label class="lab-label">Giá Dự Kiến Cho Thuê (VNĐ/tháng):</label>
              <input type="number" class="lab-control" id="reRent" value="12000000" onchange="app.recalculateMortgage()">
            </div>

            <button class="bgrd w-100 justify-content-center" onclick="app.recalculateMortgage()">
              <i class="fa-solid fa-calculator me-1"></i> Chạy Tính Toán Dòng Tiền
            </button>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="gc p-4 h-100" id="reResultContainer">
            ${this.renderMortgageResultHtml(mortgage)}
          </div>
        </div>
      </div>
    `;
  }

  recalculateMortgage() {
    const price = Number(document.getElementById('rePrice').value) || 0;
    const down = Number(document.getElementById('reDown').value) || 0;
    const rate = Number(document.getElementById('reRate').value) || 0;
    const term = Number(document.getElementById('reTerm').value) || 0;
    const income = Number(document.getElementById('reIncome').value) || 0;
    const rent = Number(document.getElementById('reRent').value) || 0;

    const res = CalculatorEngine.calculateMortgage({
      price, downPaymentPercent: down, interestRatePercent: rate,
      termYears: term, monthlyIncome: income, monthlyRentIncome: rent
    });

    const resultBox = document.getElementById('reResultContainer');
    if (resultBox) resultBox.innerHTML = this.renderMortgageResultHtml(res);
  }

  renderMortgageResultHtml(m) {
    return `
      <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-chart-pie text-success me-2"></i>Kết Quả Mô Phỏng Tài Chính (Explain Result)</h5>
      
      <div class="mb-3">
        <span class="text-secondary small">Gốc &amp; Lãi Trả Hàng Tháng (Tháng 1):</span>
        <div class="output-hero-val text-success">${this.formatVnd(m.results.monthlyPayment)}/tháng</div>
        <div class="d-flex align-items-center gap-2">
          <span class="badge ${m.results.isDtiSafe ? 'bg-success' : 'bg-danger'}">DTI: ${m.results.debtToIncomeRatio}% (${m.results.dtiStatus})</span>
          <span class="badge bg-purple-subtle text-purple">Rental Yield: ${m.results.rentalYieldPercent}%</span>
        </div>
      </div>

      <div class="row g-2 mb-3">
        <div class="col-6">
          <div class="p-2 bg-dark rounded-3 border border-secondary-subtle">
            <div class="small text-secondary">Vốn tự có trả trước:</div>
            <div class="fw-bold text-white">${this.formatVnd(m.results.downPaymentAmount)}</div>
          </div>
        </div>
        <div class="col-6">
          <div class="p-2 bg-dark rounded-3 border border-secondary-subtle">
            <div class="small text-secondary">Tổng lãi phải trả:</div>
            <div class="fw-bold text-warning">${this.formatVnd(m.results.totalInterest)}</div>
          </div>
        </div>
      </div>

      <!-- WHAT-IF SENSITIVITY TABLE -->
      <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
        <strong class="text-info small d-block mb-2"><i class="fa-solid fa-chart-line me-1"></i>Kiểm Tra Độ Nhạy (What-If Lãi Suất Thả Nổi):</strong>
        ${m.whatIf.map(w => `
          <div class="d-flex justify-content-between small mb-1">
            <span class="text-white-50">${w.scenario}:</span>
            <strong class="text-warning">${app.formatVnd(w.monthlyPayment)}/tháng (+${app.formatVnd(w.diff)})</strong>
          </div>
        `).join('')}
      </div>

      <div class="small text-secondary">
        * Giả định: ${m.assumptions[0]}
      </div>
    `;
  }

  // =========================================================================
  // 5. CARS TOOLS
  // =========================================================================
  renderCarsTools(container) {
    const tco = CalculatorEngine.calculateCarTCO({
      carPrice: 600000000,
      annualKm: 15000,
      fuelConsumptionPer100Km: 6.5,
      fuelPricePerLiter: 24000,
      engineType: 'Petrol'
    });

    container.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="gc p-4">
            <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-car text-success me-2"></i>Mô Phỏng Chi Phí Nuôi Xe 5 Năm (TCO)</h5>
            
            <div class="lab-input-group mb-3">
              <label class="lab-label">Giá Xe Niêm Yết (VNĐ):</label>
              <input type="number" class="lab-control" id="carPrice" value="600000000" onchange="app.recalculateCarTco()">
            </div>

            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="lab-label">Quãng Đường Hàng Năm (km):</label>
                <input type="number" class="lab-control" id="carKm" value="15000" onchange="app.recalculateCarTco()">
              </div>
              <div class="col-6">
                <label class="lab-label">Loại Động Cơ:</label>
                <select class="lab-control" id="carEngine" onchange="app.recalculateCarTco()">
                  <option value="Petrol">Xe Xăng (ICE)</option>
                  <option value="Electric">Xe Điện (EV)</option>
                </select>
              </div>
            </div>

            <div class="lab-input-group mb-3">
              <label class="lab-label">Mức Tiêu Thụ Nhiên Liệu (Lít hoặc kWh/100km):</label>
              <input type="number" step="0.1" class="lab-control" id="carCons" value="6.5" onchange="app.recalculateCarTco()">
            </div>

            <button class="bgrd w-100 justify-content-center" onclick="app.recalculateCarTco()">
              <i class="fa-solid fa-calculator me-1"></i> Tính Toán TCO 5 Năm
            </button>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="gc p-4 h-100" id="carResultContainer">
            ${this.renderCarResultHtml(tco)}
          </div>
        </div>
      </div>
    `;
  }

  recalculateCarTco() {
    const carPrice = Number(document.getElementById('carPrice').value) || 0;
    const annualKm = Number(document.getElementById('carKm').value) || 0;
    const engineType = document.getElementById('carEngine').value;
    const fuelCons = Number(document.getElementById('carCons').value) || 0;

    const res = CalculatorEngine.calculateCarTCO({
      carPrice, annualKm, fuelConsumptionPer100Km: fuelCons, engineType
    });

    const resultBox = document.getElementById('carResultContainer');
    if (resultBox) resultBox.innerHTML = this.renderCarResultHtml(res);
  }

  renderCarResultHtml(t) {
    return `
      <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-chart-line text-success me-2"></i>Kết Quả Tổng Chi Phí Sở Hữu 5 Năm</h5>
      
      <div class="mb-3">
        <span class="text-secondary small">Tổng Chi Phí TCO 5 Năm:</span>
        <div class="output-hero-val text-success">${this.formatVnd(t.results.totalTCO)}</div>
        <p class="text-secondary small">Trung bình: <strong class="text-white">${this.formatVnd(t.results.monthlyCost)}/tháng</strong> (${this.formatVnd(t.results.costPerKm)}/km)</p>
      </div>

      <div class="row g-2 mb-3">
        <div class="col-6">
          <div class="p-2 bg-dark rounded-3 border border-secondary-subtle">
            <div class="small text-secondary">Nhiên liệu 5 năm:</div>
            <div class="fw-bold text-warning">${this.formatVnd(t.results.annualEnergyCost * 5)}</div>
          </div>
        </div>
        <div class="col-6">
          <div class="p-2 bg-dark rounded-3 border border-secondary-subtle">
            <div class="small text-secondary">Khấu hao mất giá:</div>
            <div class="fw-bold text-danger">${this.formatVnd(t.results.totalDepreciation)}</div>
          </div>
        </div>
      </div>

      <div class="p-3 bg-dark rounded-3 border border-secondary-subtle text-secondary small">
        * Giả định: ${t.assumptions[0]}
      </div>
    `;
  }

  // =========================================================================
  // 6. MOTORCYCLES TOOLS
  // =========================================================================
  renderMotorcyclesTools(container) {
    const moto = CalculatorEngine.calculateMotorcycleCost({
      dailyKm: 25,
      fuelConsPer100Km: 2.0,
      fuelPrice: 24000,
      transmission: 'Scooter'
    });

    container.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="gc p-4">
            <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-motorcycle text-warning me-2"></i>Tính Chi Phí Xe Máy Đô Thị</h5>
            
            <div class="lab-input-group mb-3">
              <label class="lab-label">Quãng Đường Đi Làm Hàng Ngày (km):</label>
              <input type="number" class="lab-control" id="motoDailyKm" value="25" onchange="app.recalculateMoto()">
            </div>

            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="lab-label">Mức Tiêu Thụ (L/100km):</label>
                <input type="number" step="0.1" class="lab-control" id="motoCons" value="2.0" onchange="app.recalculateMoto()">
              </div>
              <div class="col-6">
                <label class="lab-label">Hệ Truyền Động:</label>
                <select class="lab-control" id="motoTrans" onchange="app.recalculateMoto()">
                  <option value="Scooter">Xe Tay Ga (CVT)</option>
                  <option value="Manual">Xe Số (Xích)</option>
                </select>
              </div>
            </div>

            <button class="bgrd w-100 justify-content-center" onclick="app.recalculateMoto()">
              <i class="fa-solid fa-calculator me-1"></i> Tính Phí Nuôi Xe
            </button>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="gc p-4 h-100" id="motoResultContainer">
            <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-coins text-warning me-2"></i>Kết Quả Chi Phí Đi Lại Hàng Tháng</h5>
            <div class="output-hero-val text-warning mb-1">${this.formatVnd(moto.results.totalMonthlyCost)}/tháng</div>
            <p class="text-secondary small">Tổng chi phí vận hành năm: <strong class="text-white">${this.formatVnd(moto.results.annualRunningCost)}/năm</strong></p>
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle small text-secondary">
              <div class="mb-1">&bull; Tiền xăng hàng tháng (750 km): <strong class="text-white">${this.formatVnd(moto.results.monthlyFuelCost)}</strong></div>
              <div>&bull; Bảo dưỡng định kỳ (dầu nhớt): <strong class="text-white">${this.formatVnd(moto.results.monthlyMaintenance)}</strong></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  recalculateMoto() {
    const dailyKm = Number(document.getElementById('motoDailyKm').value) || 0;
    const cons = Number(document.getElementById('motoCons').value) || 0;
    const trans = document.getElementById('motoTrans').value;

    const res = CalculatorEngine.calculateMotorcycleCost({
      dailyKm, fuelConsPer100Km: cons, transmission: trans
    });

    const box = document.getElementById('motoResultContainer');
    if (box) {
      box.innerHTML = `
        <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-coins text-warning me-2"></i>Kết Quả Chi Phí Đi Lại Hàng Tháng</h5>
        <div class="output-hero-val text-warning mb-1">${this.formatVnd(res.results.totalMonthlyCost)}/tháng</div>
        <p class="text-secondary small">Tổng chi phí vận hành năm: <strong class="text-white">${this.formatVnd(res.results.annualRunningCost)}/năm</strong></p>
        <div class="p-3 bg-dark rounded-3 border border-secondary-subtle small text-secondary">
          <div class="mb-1">&bull; Tiền xăng hàng tháng (${res.results.monthlyKm} km): <strong class="text-white">${this.formatVnd(res.results.monthlyFuelCost)}</strong></div>
          <div>&bull; Bảo dưỡng định kỳ: <strong class="text-white">${this.formatVnd(res.results.monthlyMaintenance)}</strong></div>
        </div>
      `;
    }
  }

  // =========================================================================
  // 7. HOME TOOLS
  // =========================================================================
  renderHomeTools(container) {
    const budget = CalculatorEngine.calculateHomeBudget({
      landAreaM2: 60, floors: 2, packageType: 'medium', foundationType: 'strip', roofType: 'concrete'
    });

    container.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="gc p-4">
            <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-house-hammer text-danger me-2"></i>Lập Dự Toán Xây/Sửa Nhà</h5>
            
            <div class="lab-input-group mb-3">
              <label class="lab-label">Diện Tích Đất Xây Dựng (m²):</label>
              <input type="number" class="lab-control" id="homeLand" value="60" onchange="app.recalculateHome()">
            </div>

            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="lab-label">Số Tầng Sàn:</label>
                <input type="number" class="lab-control" id="homeFloors" value="2" onchange="app.recalculateHome()">
              </div>
              <div class="col-6">
                <label class="lab-label">Gói Thi Công:</label>
                <select class="lab-control" id="homePackage" onchange="app.recalculateHome()">
                  <option value="raw">Phần thô (3.8 tr/m²)</option>
                  <option value="medium" selected>Trọn gói Khá (6.2 tr/m²)</option>
                  <option value="premium">Trọn gói Cao Cấp (8.5 tr/m²)</option>
                </select>
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="lab-label">Loại Móng:</label>
                <select class="lab-control" id="homeFoundation" onchange="app.recalculateHome()">
                  <option value="strip">Móng Băng (50%)</option>
                  <option value="single">Móng Đơn (30%)</option>
                  <option value="pile">Móng Cọc (40%)</option>
                </select>
              </div>
              <div class="col-6">
                <label class="lab-label">Loại Mái:</label>
                <select class="lab-control" id="homeRoof" onchange="app.recalculateHome()">
                  <option value="concrete">Mái Bê Tông (50%)</option>
                  <option value="corrugated">Mái Tôn (30%)</option>
                  <option value="tile">Mái Ngói (70%)</option>
                </select>
              </div>
            </div>

            <button class="bgrd w-100 justify-content-center" onclick="app.recalculateHome()">
              <i class="fa-solid fa-calculator me-1"></i> Tính Dự Toán Chi Tiết
            </button>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="gc p-4 h-100" id="homeResultContainer">
            <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-calculator text-danger me-2"></i>Dự Toán Ngân Sách Quy Đổi</h5>
            <div class="output-hero-val text-danger mb-1">${this.formatVnd(budget.results.grandTotal)}</div>
            <p class="text-secondary small">Tổng diện tích quy đổi: <strong class="text-white">${budget.results.totalCalculatedAreaM2} m²</strong></p>
            
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle small text-secondary mb-3">
              <div class="mb-1">&bull; Chi phí xây dựng cơ bản: <strong class="text-white">${this.formatVnd(budget.results.baseCost)}</strong></div>
              <div class="mb-1">&bull; Hao hụt vật tư thực tế (5%): <strong class="text-warning">${this.formatVnd(budget.results.wasteCost)}</strong></div>
              <div>&bull; Dự phòng phát sinh kiến trúc (10%): <strong class="text-info">${this.formatVnd(budget.results.contingency)}</strong></div>
            </div>

            <div class="small text-secondary">
              * Giả định: ${budget.assumptions[0]}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  recalculateHome() {
    const land = Number(document.getElementById('homeLand').value) || 0;
    const floors = Number(document.getElementById('homeFloors').value) || 0;
    const pkg = document.getElementById('homePackage').value;
    const found = document.getElementById('homeFoundation').value;
    const roof = document.getElementById('homeRoof').value;

    const res = CalculatorEngine.calculateHomeBudget({
      landAreaM2: land, floors, packageType: pkg, foundationType: found, roofType: roof
    });

    const box = document.getElementById('homeResultContainer');
    if (box) {
      box.innerHTML = `
        <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-calculator text-danger me-2"></i>Dự Toán Ngân Sách Quy Đổi</h5>
        <div class="output-hero-val text-danger mb-1">${this.formatVnd(res.results.grandTotal)}</div>
        <p class="text-secondary small">Tổng diện tích quy đổi: <strong class="text-white">${res.results.totalCalculatedAreaM2} m²</strong></p>
        
        <div class="p-3 bg-dark rounded-3 border border-secondary-subtle small text-secondary mb-3">
          <div class="mb-1">&bull; Chi phí xây dựng cơ bản: <strong class="text-white">${this.formatVnd(res.results.baseCost)}</strong></div>
          <div class="mb-1">&bull; Hao hụt vật tư thực tế (5%): <strong class="text-warning">${this.formatVnd(res.results.wasteCost)}</strong></div>
          <div>&bull; Dự phòng phát sinh kiến trúc (10%): <strong class="text-info">${this.formatVnd(res.results.contingency)}</strong></div>
        </div>

        <div class="small text-secondary">
          * Giả định: ${res.assumptions[0]}
        </div>
      `;
    }
  }

  // =========================================================================
  // 8. FENG SHUI TOOLS
  // =========================================================================
  renderFengShuiTools(container) {
    const evalData = CalculatorEngine.evaluateFengShui({ direction: 'Nam' });

    container.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="gc p-4">
            <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-compass text-purple me-2"></i>Khảo Sát Hướng Nhà &amp; Vi Khí Hậu</h5>
            
            <div class="lab-input-group mb-3">
              <label class="lab-label">Chọn Hướng Nhà Chính:</label>
              <select class="lab-control" id="fsDirection" onchange="app.recalculateFengShui()">
                <option value="Nam" selected>Hướng Nam (Gió mát mùa hè)</option>
                <option value="Đông Nam">Hướng Đông Nam (Ôn hòa nắng sớm)</option>
                <option value="Tây">Hướng Tây (Nắng chiều gay gắt)</option>
                <option value="Bắc">Hướng Bắc (Tránh gió lạnh đông)</option>
              </select>
            </div>

            <button class="bgrd w-100 justify-content-center" onclick="app.recalculateFengShui()">
              <i class="fa-solid fa-magnifying-glass me-1"></i> Xem Phân Tích Đối Lưu &amp; Ánh Sáng
            </button>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="gc p-4 h-100" id="fsResultContainer">
            <h5 class="fw-bold text-white mb-2"><i class="fa-solid fa-sun text-purple me-2"></i>Đánh Giá Vi Khí Hậu &amp; Phong Thủy</h5>
            <div class="badge bg-purple-subtle text-purple mb-3">${evalData.results.score}</div>
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle small mb-3">
              <div class="text-white mb-2"><strong>Thông gió tự nhiên:</strong> ${evalData.results.ventilation}</div>
              <div class="text-info"><strong>Giải pháp kiến trúc:</strong> ${evalData.results.recommendation}</div>
            </div>
            <div class="small text-secondary">
              * Tuyên bố minh bạch: ${evalData.limitations[0]}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  recalculateFengShui() {
    const dir = document.getElementById('fsDirection').value;
    const res = CalculatorEngine.evaluateFengShui({ direction: dir });
    const box = document.getElementById('fsResultContainer');
    if (box) {
      box.innerHTML = `
        <h5 class="fw-bold text-white mb-2"><i class="fa-solid fa-sun text-purple me-2"></i>Đánh Giá Vi Khí Hậu &amp; Phong Thủy</h5>
        <div class="badge bg-purple-subtle text-purple mb-3">${res.results.score}</div>
        <div class="p-3 bg-dark rounded-3 border border-secondary-subtle small mb-3">
          <div class="text-white mb-2"><strong>Thông gió tự nhiên:</strong> ${res.results.ventilation}</div>
          <div class="text-info"><strong>Giải pháp kiến trúc:</strong> ${res.results.recommendation}</div>
        </div>
        <div class="small text-secondary">
          * Tuyên bố minh bạch: ${res.limitations[0]}
        </div>
      `;
    }
  }

  // =========================================================================
  // 9. COMPARE VIEW & ENGINE INTEGRATION
  // =========================================================================
  renderCompareView() {
    this.renderDomainCompareContent();
  }

  renderDomainCompareContent() {
    const container = document.getElementById('domainCompareContainer') || document.getElementById('compareTableContainer');
    if (!container) return;

    let items = [];
    let criteria = [];

    if (this.currentDomainId === 'pc-building') {
      items = [
        {
          id: 'cpu-i5',
          name: 'Intel Core i5-13600K',
          cores: '14 (6P + 8E)',
          tdp: '125W (Peak 181W)',
          socket: 'LGA1700',
          ram: 'DDR4 & DDR5',
          price: this.formatVnd(7690000),
          tradeOffSummary: 'Đơn nhân cực mạnh, hỗ trợ cả DDR4 tiết kiệm chi phí nhưng ăn điện tải nặng.'
        },
        {
          id: 'cpu-r5',
          name: 'AMD Ryzen 5 7600X',
          cores: '6C / 12T',
          tdp: '105W (Peak 142W)',
          socket: 'AM5',
          ram: 'Chỉ DDR5',
          price: this.formatVnd(5790000),
          tradeOffSummary: 'Nền tảng socket AM5 dùng dài lâu đến 2027+, mát hơn nhưng bắt buộc dùng RAM DDR5 đắt hơn.'
        }
      ];
      criteria = [
        { key: 'socket', label: 'Chân Cắm Socket' },
        { key: 'cores', label: 'Số Nhân / Luồng' },
        { key: 'tdp', label: 'Mức Tiêu Thụ TDP' },
        { key: 'ram', label: 'Hỗ Trợ RAM' },
        { key: 'price', label: 'Giá Tham Chiếu' }
      ];
    } else if (this.currentDomainId === 'cars') {
      items = [
        {
          id: 'car-ice',
          name: 'Hyundai Creta 1.5L (Xăng)',
          fuel: '6.3 Lít / 100km (~151.000 ₫)',
          maintenance: 'Định kỳ động cơ đốt trong',
          convenience: 'Đổ xăng 3 phút tiện lợi',
          price: this.formatVnd(599000000),
          tradeOffSummary: 'Đi xa xuyên việt thuận tiện, nhưng chi phí xăng và bảo dưỡng lâu dài cao hơn.'
        },
        {
          id: 'car-ev',
          name: 'VinFast VF e34 (Điện)',
          fuel: '15.2 kWh / 100km (~58.500 ₫)',
          maintenance: 'Chi phí bảo dưỡng siêu thấp',
          convenience: 'Phụ thuộc trụ sạc công cộng',
          price: this.formatVnd(710000000),
          tradeOffSummary: 'Chi phí sạc pin siêu rẻ, bảo hành pin 10 năm nhưng cần quy hoạch thời gian sạc.'
        }
      ];
      criteria = [
        { key: 'fuel', label: 'Chi Phí Nhiên Liệu / 100km' },
        { key: 'maintenance', label: 'Bảo Dưỡng' },
        { key: 'convenience', label: 'Độ Tiện Dụng' },
        { key: 'price', label: 'Giá Xe' }
      ];
    } else {
      // Default sample comparison
      items = [
        { id: 'opt1', name: 'Phương Án A (Cơ Bản)', cost: 'Thấp', time: 'Nhanh', tradeOffSummary: 'Tiết kiệm chi phí đầu tư ban đầu nhưng hạn chế nâng cấp.' },
        { id: 'opt2', name: 'Phương Án B (Nâng Cao)', cost: 'Cao', time: 'Lâu dài', tradeOffSummary: 'Hiệu năng và độ bền vượt trội nhưng cần vốn đầu tư lớn.' }
      ];
      criteria = [
        { key: 'cost', label: 'Mức Chi Phí' },
        { key: 'time', label: 'Thời Gian / Vòng Đời' }
      ];
    }

    const res = ComparisonEngine.compare(items, criteria);

    container.innerHTML = `
      <div class="table-responsive mb-4">
        <table class="compare-table">
          <thead>
            <tr>
              <th style="width: 200px;">Tiêu Chí</th>
              ${res.items.map(i => `<th>${i.name}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${res.matrix.map(row => `
              <tr>
                <td class="fw-bold text-white">${row.label}</td>
                ${row.values.map(v => `<td>${v}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="row g-3">
        ${res.tradeOffs.map(t => `
          <div class="col-md-6">
            <div class="gc p-3 border border-secondary-subtle">
              <strong class="text-white d-block mb-1"><i class="fa-solid fa-scale-balanced text-primary me-1"></i>Đánh giá trade-off: ${t.name}</strong>
              <p class="text-secondary small mb-0">${t.summary}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // 10. SCENARIOS & DECISION JOURNAL
  // =========================================================================
  renderScenariosView() {
    const container = document.getElementById('scenariosListContainer');
    if (!container) return;

    const scenarios = ScenarioEngine.getScenarios();
    const countBadge = document.getElementById('savedScenarioCount');
    if (countBadge) countBadge.textContent = `${scenarios.length} Scenarios`;

    if (scenarios.length === 0) {
      container.innerHTML = `
        <div class="gc p-4 text-center text-secondary">
          <i class="fa-solid fa-box-open fs-2 mb-2"></i>
          <p class="mb-0">Chưa có scenario nào được lưu. Hãy thử mô phỏng và bấm "Lưu Kịch Bản".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = scenarios.map(s => `
      <div class="gc p-4 mb-3">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <h5 class="fw-bold text-white mb-0">${s.name}</h5>
          <span class="badge bg-purple-subtle text-purple">${s.domainId}</span>
        </div>
        <div class="small text-secondary mb-2">Tạo lúc: ${new Date(s.createdAt).toLocaleDateString('vi-VN')} | Engine: ${s.engineVersion}</div>
        <div class="p-3 bg-dark rounded-3 small text-info mb-3">
          ${Object.entries(s.results || {}).slice(0, 4).map(([k, v]) => `<div><strong>${k}:</strong> ${typeof v === 'number' ? app.formatVnd(v) : v}</div>`).join('')}
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-danger" onclick="app.deleteScenario('${s.id}')"><i class="fa-solid fa-trash me-1"></i>Xóa</button>
        </div>
      </div>
    `).join('');
  }

  deleteScenario(id) {
    ScenarioEngine.deleteScenario(id);
    this.renderScenariosView();
    if (this.currentView === 'domain' && this.currentDomainTab === 'scenarios') {
      this.renderDomainActiveTabContent();
    }
  }

  saveJournalEntry(e) {
    if (e) e.preventDefault();
    const goal = document.getElementById('jGoal').value;
    const assumptions = document.getElementById('jAssumptions').value;
    const decision = document.getElementById('jDecision').value;

    ScenarioEngine.saveJournalEntry({ goal, assumptions, decision });
    alert('Đã lưu nhật ký ra quyết định có cơ sở thành công!');
    document.getElementById('journalForm').reset();
  }

  renderGlossaryView(query = '') {
    const container = document.getElementById('glossaryGridContainer');
    if (!container) return;

    let terms = KnowledgeEngine.getGlossaryTerms();
    if (query && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      terms = terms.filter(t => t.term.toLowerCase().includes(q) || t.shortDef.toLowerCase().includes(q));
    }

    container.innerHTML = terms.map(t => `
      <div class="col-md-6">
        <div class="gc p-4 h-100">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <h5 class="fw-bold text-primary mb-0">${t.term}</h5>
            <span class="badge bg-secondary-subtle text-white-50">${t.domainId}</span>
          </div>
          <p class="text-white-50 small mb-2">${t.shortDef}</p>
          <p class="text-secondary small mb-0">${t.longDef || ''}</p>
        </div>
      </div>
    `).join('');
  }
}

// Instantiate and attach globally
const app = new KnowLabApp();
window.app = app;
document.addEventListener('DOMContentLoaded', () => app.init());
