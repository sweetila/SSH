/* ═══════════════════════════════════════════════════════════════
   SHAMBHU SERENITY FOOD SERVICE — Main Application
   ═══════════════════════════════════════════════════════════════ */

// ─── SVG Decorations ───────────────────────────────────────────
const SVG = {
  leafLeft: `<svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 42 Q25 28 50 30 Q70 15 90 22" stroke="#596B3A" stroke-width="1.5" fill="none" opacity="0.7"/>
    <ellipse cx="32" cy="32" rx="10" ry="6" fill="#596B3A" opacity="0.4" transform="rotate(-25 32 32)"/>
    <ellipse cx="54" cy="26" rx="9" ry="5" fill="#71824A" opacity="0.5" transform="rotate(-10 54 26)"/>
    <ellipse cx="74" cy="20" rx="7" ry="4" fill="#596B3A" opacity="0.35" transform="rotate(10 74 20)"/>
    <ellipse cx="18" cy="38" rx="7" ry="4" fill="#71824A" opacity="0.4" transform="rotate(-35 18 38)"/>
  </svg>`,
  leafRight: `<svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform:scaleX(-1)">
    <path d="M8 42 Q25 28 50 30 Q70 15 90 22" stroke="#596B3A" stroke-width="1.5" fill="none" opacity="0.7"/>
    <ellipse cx="32" cy="32" rx="10" ry="6" fill="#596B3A" opacity="0.4" transform="rotate(-25 32 32)"/>
    <ellipse cx="54" cy="26" rx="9" ry="5" fill="#71824A" opacity="0.5" transform="rotate(-10 54 26)"/>
    <ellipse cx="74" cy="20" rx="7" ry="4" fill="#596B3A" opacity="0.35" transform="rotate(10 74 20)"/>
    <ellipse cx="18" cy="38" rx="7" ry="4" fill="#71824A" opacity="0.4" transform="rotate(-35 18 38)"/>
  </svg>`,
  flower: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" fill="#A95D32" opacity="0.6"/>
    <ellipse cx="12" cy="6" rx="2.5" ry="4" fill="#596B3A" opacity="0.35"/>
    <ellipse cx="12" cy="18" rx="2.5" ry="4" fill="#596B3A" opacity="0.35"/>
    <ellipse cx="6" cy="12" rx="4" ry="2.5" fill="#596B3A" opacity="0.35"/>
    <ellipse cx="18" cy="12" rx="4" ry="2.5" fill="#596B3A" opacity="0.35"/>
  </svg>`,
};

// ─── State ─────────────────────────────────────────────────────
let currentLang = localStorage.getItem('ssfs-lang') || 'hi';
let cart = JSON.parse(localStorage.getItem('ssfs-cart') || '[]');
let cartOpen = false;
let mobileNavOpen = false;
let lastOrderData = null;

// ─── Language Helpers ──────────────────────────────────────────
function t(key) {
  return AppData.translations[key]?.[currentLang] || key;
}

function itemName(item) {
  return item.name[currentLang];
}

function catName(cat) {
  return cat.name[currentLang];
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ssfs-lang', lang);
  renderApp();
}

// ─── Cart Management ───────────────────────────────────────────
function saveCart() {
  localStorage.setItem('ssfs-cart', JSON.stringify(cart));
}

function findItem(id) {
  return AppData.menuItems.find(i => i.id === id) || AppData.thalis.find(i => i.id === id);
}

function getCartItem(id) {
  return cart.find(c => c.id === id);
}

function addToCart(itemId) {
  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: itemId, qty: 1 });
  }
  saveCart();
  const item = findItem(itemId);
  if (item) showToast(item);
  renderApp();
}

function removeFromCart(itemId) {
  cart = cart.filter(c => c.id !== itemId);
  saveCart();
  renderApp();
}

function incrementItem(itemId) {
  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty++;
    saveCart();
    renderApp();
  }
}

function decrementItem(itemId) {
  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty--;
    if (existing.qty <= 0) {
      removeFromCart(itemId);
    } else {
      saveCart();
      renderApp();
    }
  }
}

function clearCart() {
  cart = [];
  saveCart();
  renderApp();
}

function getCartTotal() {
  return cart.reduce((total, ci) => {
    const item = findItem(ci.id);
    return total + (item ? item.price * ci.qty : 0);
  }, 0);
}

function getCartCount() {
  return cart.reduce((count, ci) => count + ci.qty, 0);
}

// ─── Toast ─────────────────────────────────────────────────────
function showToast(item) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const msg = currentLang === 'hi'
    ? `${item.name.hi} ${t('addedToCart')}`
    : `${item.name.en} ${t('addedToCart')}`;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2100);
}

// ─── Navbar Component ──────────────────────────────────────────
function renderNavbar() {
  const count = getCartCount();
  const brandText = currentLang === 'hi' ? AppData.brand.name.hi : AppData.brand.name.en;
  return `
    <nav class="navbar" role="navigation" aria-label="Main Navigation">
      <div class="navbar-inner">
        <a href="#/" class="navbar-brand" aria-label="Shambhu Serenity Food Service - Home">
          <span class="brand-icon">🍽️</span>
          <span>${escHtml(AppData.brand.name.en)}</span>
        </a>

        <div class="navbar-nav" role="menubar">
          <a href="#menu-section" role="menuitem" onclick="scrollToSection(event,'menu-section')">${t('menu')}</a>
          <a href="#thali-section" role="menuitem" onclick="scrollToSection(event,'thali-section')">${t('thalis')}</a>
          <a href="#brand-story" role="menuitem" onclick="scrollToSection(event,'brand-story')">${t('about')}</a>
          <a href="#contact-section" role="menuitem" onclick="scrollToSection(event,'contact-section')">${t('contact')}</a>
        </div>

        <div class="navbar-actions">
          <div class="lang-toggle" role="group" aria-label="Language Selection">
            <button onclick="setLanguage('hi')" class="${currentLang === 'hi' ? 'active' : ''}" aria-label="Hindi">हिंदी</button>
            <button onclick="setLanguage('en')" class="${currentLang === 'en' ? 'active' : ''}" aria-label="English">EN</button>
          </div>

          <button class="cart-btn" onclick="toggleCart()" aria-label="Open Cart${count > 0 ? `, ${count} items` : ''}">
            <span class="cart-icon">🛒</span>
            ${count > 0 ? `<span class="cart-badge">${count}</span>` : ''}
          </button>

          <button class="menu-toggle" onclick="toggleMobileNav()" aria-label="Open Menu">☰</button>
        </div>
      </div>
    </nav>

    ${renderMobileNav()}
  `;
}

function renderMobileNav() {
  return `
    <div class="mobile-nav-overlay ${mobileNavOpen ? 'open' : ''}" id="mobile-nav-overlay"
         onclick="closeMobileNav()" style="${mobileNavOpen ? 'display:block' : 'display:none'}">
    </div>
    <div class="mobile-nav ${mobileNavOpen ? 'open' : ''}" id="mobile-nav" role="dialog" aria-label="Mobile Navigation">
      <div class="mobile-nav-header">
        <span class="navbar-brand" style="font-size:1rem;">🍽️ ${escHtml(AppData.brand.name.en)}</span>
        <button class="mobile-nav-close" onclick="closeMobileNav()" aria-label="Close Menu">✕</button>
      </div>
      <div class="mobile-nav-links">
        <a href="#/" onclick="closeMobileNav(); scrollToTop()">🏠 ${t('home')}</a>
        <a href="#menu-section" onclick="closeMobileNav(); scrollToSection(event,'menu-section')">🍽️ ${t('menu')}</a>
        <a href="#thali-section" onclick="closeMobileNav(); scrollToSection(event,'thali-section')">🥘 ${t('thalis')}</a>
        <a href="#brand-story" onclick="closeMobileNav(); scrollToSection(event,'brand-story')">🏡 ${t('about')}</a>
        <a href="#contact-section" onclick="closeMobileNav(); scrollToSection(event,'contact-section')">📞 ${t('contact')}</a>
      </div>
    </div>
  `;
}

// ─── Hero Section ──────────────────────────────────────────────
function renderHero() {
  const tagline = AppData.brand.tagline;
  return `
    <section class="hero" id="hero">
      <div class="hero-content">
        <div class="hero-decor">
          ${SVG.leafLeft}
          <span class="decor-flower">${SVG.flower}</span>
          ${SVG.leafRight}
        </div>

        <h1 class="hero-brand">${escHtml(AppData.brand.name.en)}</h1>
        <p class="hero-brand-hi font-serif-hi">${escHtml(AppData.brand.name.hi)}</p>

        <div class="hero-divider">
          <span class="divider-icon">❦</span>
        </div>

        <p class="hero-tagline">${escHtml(tagline.hi)}</p>
        <p class="hero-tagline-en">${escHtml(tagline.en)}</p>

        <p class="hero-subtitle">${t('heroSubtitle')}</p>

        <div class="hero-actions">
          <a href="#menu-section" class="btn btn-primary" onclick="scrollToSection(event,'menu-section')">
            ${t('viewMenu')}
          </a>
          <a href="#menu-section" class="btn btn-secondary" onclick="scrollToSection(event,'menu-section')">
            ${t('orderNow')}
          </a>
        </div>
      </div>
    </section>
  `;
}

// ─── Featured Categories ───────────────────────────────────────
function renderFeaturedCategories() {
  const chips = AppData.categories.map(cat => `
    <button class="feat-cat-chip" onclick="scrollToSection(event,'menu-section'); setTimeout(() => filterCategory('${cat.id}'), 300)">
      <span class="feat-cat-emoji">${cat.emoji}</span>
      <span>${catName(cat)}</span>
    </button>
  `).join('');

  return `
    <section class="section" id="featured-categories">
      <div class="section-header">
        <h2 class="section-title ${currentLang === 'hi' ? 'section-title-hi' : 'section-title-en'}">
          ${currentLang === 'hi' ? 'हमारी श्रेणियाँ' : 'Our Categories'}
        </h2>
        <div class="section-divider"><span class="divider-icon">🌿</span></div>
      </div>
      <div class="feat-categories">${chips}</div>
    </section>
  `;
}

// ─── Menu Section ──────────────────────────────────────────────
let activeCategory = 'all';
let searchQuery = '';

function filterCategory(catId) {
  activeCategory = catId;
  renderMenuContent();
}

function handleSearch(value) {
  searchQuery = value.toLowerCase().trim();
  renderMenuContent();
}

function renderMenuSection() {
  return `
    <section class="section" id="menu-section">
      <div class="section-header">
        <h2 class="section-title ${currentLang === 'hi' ? 'section-title-hi' : 'section-title-en'}">
          ${t('menu')}
        </h2>
        <div class="section-divider"><span class="divider-icon">🍽️</span></div>
      </div>

      <div class="menu-search-wrapper">
        <span class="menu-search-icon">🔍</span>
        <input
          type="search"
          class="menu-search"
          id="menu-search-input"
          placeholder="${t('searchPlaceholder')}"
          oninput="handleSearch(this.value)"
          value="${escHtml(searchQuery)}"
          aria-label="${t('searchPlaceholder')}"
        />
      </div>

      ${renderCategoryTabs()}

      <div id="menu-content">
        ${renderMenuItems()}
      </div>
    </section>
  `;
}

function renderCategoryTabs() {
  const tabs = [
    { id: 'all', name: { hi: 'सभी', en: 'All' }, emoji: '✨' },
    ...AppData.categories,
  ];

  return `
    <div class="category-tabs-wrapper">
      <div class="category-tabs" role="tablist" aria-label="Food Categories">
        ${tabs.map(tab => `
          <button
            class="category-tab ${activeCategory === tab.id ? 'active' : ''}"
            onclick="filterCategory('${tab.id}')"
            role="tab"
            aria-selected="${activeCategory === tab.id}"
            aria-label="${tab.name.en}"
          >
            <span class="tab-emoji">${tab.emoji}</span>
            <span>${tab.name[currentLang]}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMenuItems() {
  const filteredCategories = activeCategory === 'all'
    ? AppData.categories.filter(c => c.id !== 'thali')
    : AppData.categories.filter(c => c.id === activeCategory && c.id !== 'thali');

  // For thali category, show thali section
  if (activeCategory === 'thali') {
    return renderThaliCards();
  }

  let html = '';
  let hasResults = false;

  filteredCategories.forEach(cat => {
    let items = AppData.menuItems.filter(item => item.category === cat.id);

    if (searchQuery) {
      items = items.filter(item =>
        item.name.hi.toLowerCase().includes(searchQuery) ||
        item.name.en.toLowerCase().includes(searchQuery) ||
        item.id.toLowerCase().includes(searchQuery)
      );
    }

    if (items.length === 0) return;
    hasResults = true;

    html += `
      <div class="menu-category-section">
        <div class="menu-category-header">
          <span class="menu-category-emoji">${cat.emoji}</span>
          <h3 class="menu-category-name ${currentLang === 'hi' ? 'menu-category-name-hi' : 'menu-category-name-en'}">
            ${catName(cat)}
          </h3>
          <span class="menu-category-count">${items.length}</span>
        </div>
        <div class="menu-grid">
          ${items.map(item => renderMenuCard(item)).join('')}
        </div>
      </div>
    `;
  });

  // Also search in thalis if searching
  if (searchQuery && activeCategory === 'all') {
    const thaliResults = AppData.thalis.filter(item =>
      item.name.hi.toLowerCase().includes(searchQuery) ||
      item.name.en.toLowerCase().includes(searchQuery) ||
      item.id.toLowerCase().includes(searchQuery)
    );
    if (thaliResults.length > 0) {
      hasResults = true;
      html += renderThaliCards(thaliResults);
    }
  }

  if (!hasResults) {
    html = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <p class="no-results-text">${currentLang === 'hi' ? 'कोई आइटम नहीं मिला' : 'No items found'}</p>
      </div>
    `;
  }

  return html;
}

function renderMenuCard(item) {
  const cartItem = getCartItem(item.id);
  const qty = cartItem ? cartItem.qty : 0;

  return `
    <div class="menu-card" id="card-${item.id}">
      <div class="menu-card-header">
        <h4 class="menu-card-name ${currentLang === 'hi' ? 'menu-card-name-hi' : ''}">
          ${itemName(item)}
        </h4>
        ${item.isVeg ? '<span class="veg-badge" title="Vegetarian" aria-label="Vegetarian"></span>' : ''}
      </div>

      <div class="menu-card-price">₹${item.price}/-</div>

      <div class="menu-card-actions">
        ${qty === 0
          ? `<button class="add-btn" onclick="addToCart('${item.id}')" aria-label="${t('addToCart')} ${itemName(item)}">
               <span class="plus-icon">+</span> ${t('addToCart')}
             </button>`
          : `<div class="qty-controls">
               <button class="qty-btn qty-minus" onclick="decrementItem('${item.id}')" aria-label="Decrease quantity">−</button>
               <span class="qty-value">${qty}</span>
               <button class="qty-btn qty-plus" onclick="incrementItem('${item.id}')" aria-label="Increase quantity">+</button>
             </div>`
        }
      </div>
    </div>
  `;
}

function renderMenuContent() {
  const menuContent = document.getElementById('menu-content');
  const tabsWrapper = document.querySelector('.category-tabs-wrapper');
  if (menuContent) menuContent.innerHTML = renderMenuItems();
  if (tabsWrapper) tabsWrapper.innerHTML = renderCategoryTabs().replace(/<div class="category-tabs-wrapper">/,'').replace(/<\/div>$/,'');

  // Restore search value
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) searchInput.value = searchQuery;
}

// ─── Featured Thalis Section ───────────────────────────────────
function renderFeaturedThalis() {
  return `
    <section class="section section-bg-alt section-full-bg" id="thali-section" style="background:var(--paper-light);border-top:var(--border);border-bottom:var(--border);">
      <div class="section-header">
        <h2 class="section-title ${currentLang === 'hi' ? 'section-title-hi' : 'section-title-en'}">
          ${t('ourSpecialThalis')}
        </h2>
        <p class="section-subtitle">${currentLang === 'hi' ? 'पूरा भोजन, एक थाली में' : 'A complete meal, on one plate'}</p>
        <div class="section-divider"><span class="divider-icon">🥘</span></div>
      </div>
      ${renderThaliCards()}
    </section>
  `;
}

function renderThaliCards(thaliList) {
  const thalis = thaliList || AppData.thalis;
  return `
    <div class="thali-grid">
      ${thalis.map(thali => {
        const cartItem = getCartItem(thali.id);
        const qty = cartItem ? cartItem.qty : 0;
        const isMalvi = thali.id === 'malvi-thali';
        return `
          <div class="thali-card ${isMalvi ? 'thali-malvi' : ''}" id="card-${thali.id}">
            ${isMalvi ? `<span class="thali-badge">${currentLang === 'hi' ? '★ विशेष' : '★ Special'}</span>` : ''}
            <div class="thali-card-emoji">${isMalvi ? '🏆' : '🥘'}</div>
            <h3 class="thali-card-name ${currentLang === 'hi' ? 'thali-card-name-hi' : 'thali-card-name-en'}">
              ${itemName(thali)}
            </h3>
            <div class="thali-card-price">₹${thali.price}/-</div>
            <div class="thali-contents-label">${t('contents')}</div>
            <div class="thali-contents">${thali.contents[currentLang]}</div>
            <div class="thali-card-actions">
              ${qty === 0
                ? `<button class="btn btn-primary" onclick="addToCart('${thali.id}')">
                     <span>+</span> ${t('addToCart')}
                   </button>`
                : `<div class="qty-controls" style="margin:0 auto;">
                     <button class="qty-btn qty-minus" onclick="decrementItem('${thali.id}')" aria-label="Decrease quantity">−</button>
                     <span class="qty-value">${qty}</span>
                     <button class="qty-btn qty-plus" onclick="incrementItem('${thali.id}')" aria-label="Increase quantity">+</button>
                   </div>`
              }
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ─── Brand Story ───────────────────────────────────────────────
function renderBrandStory() {
  return `
    <section class="section brand-story section-full-bg" id="brand-story">
      <div class="brand-story-content">
        <div class="hero-decor" style="margin-bottom:var(--space-lg);">
          ${SVG.leafLeft}
          <span class="decor-flower">${SVG.flower}</span>
          ${SVG.leafRight}
        </div>
        <h2 class="brand-story-tagline">${AppData.brand.tagline[currentLang]}</h2>
        <p class="brand-story-text">${t('brandStoryText')}</p>
        <div class="decor-hearts">♥ ♥ ♥</div>
      </div>
    </section>
  `;
}

// ─── Contact Section ───────────────────────────────────────────
function renderContactSection() {
  return `
    <section class="section contact-section section-full-bg" id="contact-section">
      <div class="section-header">
        <h2 class="section-title ${currentLang === 'hi' ? 'section-title-hi' : 'section-title-en'}">
          ${t('contactTitle')}
        </h2>
        <div class="section-divider"><span class="divider-icon">📞</span></div>
      </div>
      <div class="contact-phone">
        <a href="tel:${AppData.brand.phone}" aria-label="Call ${AppData.brand.phone}">${AppData.brand.phone}</a>
      </div>
      <div class="contact-actions">
        <a href="tel:${AppData.brand.phone}" class="btn btn-primary">
          📞 ${t('callNow')}
        </a>
        <a href="https://wa.me/${AppData.brand.whatsapp}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" aria-label="WhatsApp">
          💬 ${t('whatsapp')}
        </a>
      </div>
    </section>
  `;
}

// ─── Footer ────────────────────────────────────────────────────
function renderFooter() {
  return `
    <footer class="footer" role="contentinfo">
      <div class="footer-inner">
        <div class="footer-decor">🌿 ❦ 🌿</div>
        <div class="footer-brand">${escHtml(AppData.brand.name.en)}</div>
        <div class="footer-tagline">${AppData.brand.tagline.hi}</div>

        <div class="footer-links">
          <a href="#/" onclick="scrollToTop()">${t('home')}</a>
          <a href="#menu-section" onclick="scrollToSection(event,'menu-section')">${t('menu')}</a>
          <a href="#thali-section" onclick="scrollToSection(event,'thali-section')">${t('thalis')}</a>
          <a href="#contact-section" onclick="scrollToSection(event,'contact-section')">${t('contact')}</a>
        </div>

        <div class="footer-phone">
          <a href="tel:${AppData.brand.phone}">${AppData.brand.phone}</a>
        </div>

        <div class="footer-divider"></div>
        <div class="footer-copy">${t('rights')} · ${escHtml(AppData.brand.name.en)} · ${new Date().getFullYear()}</div>
      </div>
    </footer>
  `;
}

// ─── Cart Drawer ───────────────────────────────────────────────
function toggleCart() {
  cartOpen = !cartOpen;
  renderCartDrawer();
  document.body.style.overflow = cartOpen ? 'hidden' : '';
}

function closeCart() {
  cartOpen = false;
  renderCartDrawer();
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const drawerEl = document.getElementById('cart-drawer-container');
  if (!drawerEl) return;
  drawerEl.innerHTML = renderCartDrawerHtml();
}

function renderCartDrawerHtml() {
  const count = getCartCount();
  const total = getCartTotal();

  let bodyHtml = '';
  if (cart.length === 0) {
    bodyHtml = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p class="cart-empty-text">${t('cartEmpty')}</p>
        <button class="btn btn-secondary" onclick="closeCart(); scrollToSection(null,'menu-section')">
          ${t('viewMenu')}
        </button>
      </div>
    `;
  } else {
    bodyHtml = cart.map(ci => {
      const item = findItem(ci.id);
      if (!item) return '';
      const subtotal = item.price * ci.qty;
      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${itemName(item)}</div>
            <div class="cart-item-price-each">₹${item.price} × ${ci.qty}</div>
            <div class="cart-item-controls">
              <div class="cart-item-qty">
                <button onclick="decrementItem('${ci.id}')" aria-label="Decrease">−</button>
                <span>${ci.qty}</span>
                <button onclick="incrementItem('${ci.id}')" aria-label="Increase">+</button>
              </div>
              <button class="cart-item-remove" onclick="removeFromCart('${ci.id}')" aria-label="${t('removeItem')}">${t('removeItem')}</button>
            </div>
          </div>
          <div class="cart-item-subtotal">₹${subtotal}</div>
        </div>
      `;
    }).join('');
  }

  return `
    <div class="cart-overlay ${cartOpen ? 'open' : ''}" onclick="closeCart()"></div>
    <div class="cart-drawer ${cartOpen ? 'open' : ''}" role="dialog" aria-label="${t('yourCart')}">
      <div class="cart-drawer-header">
        <h2 class="cart-drawer-title">${t('yourCart')} ${count > 0 ? `(${count})` : ''}</h2>
        <button class="cart-drawer-close" onclick="closeCart()" aria-label="Close Cart">✕</button>
      </div>
      <div class="cart-drawer-body">
        ${bodyHtml}
      </div>
      ${cart.length > 0 ? `
        <div class="cart-drawer-footer">
          <div class="cart-totals">
            <div class="cart-total-row total-final">
              <span class="cart-total-label">${t('total')}</span>
              <span class="cart-total-value">₹${total}</span>
            </div>
          </div>
          <div class="cart-footer-actions">
            <a href="#/billing" class="btn btn-primary" onclick="closeCart()" style="width:100%;text-align:center;">
              ${t('placeOrder')}
            </a>
            <button class="cart-clear-btn" onclick="clearCart()">${t('clearCart')}</button>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// ─── Mobile Bottom Bar ─────────────────────────────────────────
function renderBottomBar() {
  const count = getCartCount();
  return `
    <div class="bottom-bar" id="bottom-bar" role="navigation" aria-label="Bottom Navigation">
      <div class="bottom-bar-inner">
        <a href="#/" class="bottom-bar-item" onclick="scrollToTop()" aria-label="${t('home')}">
          <span class="bottom-bar-icon">🏠</span>
          <span>${t('home')}</span>
        </a>
        <a href="#menu-section" class="bottom-bar-item" onclick="scrollToSection(event,'menu-section')" aria-label="${t('menu')}">
          <span class="bottom-bar-icon">🍽️</span>
          <span>${t('menu')}</span>
        </a>
        <button class="bottom-bar-item" onclick="toggleCart()" aria-label="${t('cart')}${count > 0 ? ` (${count})` : ''}">
          <span class="bottom-bar-icon">🛒</span>
          ${count > 0 ? `<span class="bottom-bar-badge">${count}</span>` : ''}
          <span>${t('cart')}</span>
        </button>
        <a href="tel:${AppData.brand.phone}" class="bottom-bar-item" aria-label="${t('call')}">
          <span class="bottom-bar-icon">📞</span>
          <span>${t('call')}</span>
        </a>
      </div>
    </div>
  `;
}

// ─── Mobile Nav ────────────────────────────────────────────────
function toggleMobileNav() {
  mobileNavOpen = !mobileNavOpen;
  renderApp();
}

function closeMobileNav() {
  mobileNavOpen = false;
  renderApp();
}

// ─── Page: Home ────────────────────────────────────────────────
function renderHomePage() {
  return `
    ${renderHero()}
    ${renderFeaturedCategories()}
    ${renderMenuSection()}
    ${renderFeaturedThalis()}
    ${renderBrandStory()}
    ${renderContactSection()}
  `;
}

// ─── Page: Billing ─────────────────────────────────────────────
function renderBillingPage() {
  if (cart.length === 0) {
    return `
      <div class="billing-page" style="text-align:center; padding-top:80px;">
        <div style="font-size:3rem; margin-bottom:var(--space-md);">🛒</div>
        <h2 style="margin-bottom:var(--space-md);">${t('cartEmpty')}</h2>
        <a href="#/" class="btn btn-primary">${t('viewMenu')}</a>
      </div>
    `;
  }

  const total = getCartTotal();

  const orderRows = cart.map(ci => {
    const item = findItem(ci.id);
    if (!item) return '';
    return `
      <tr>
        <td class="item-name">${itemName(item)}</td>
        <td style="text-align:center">${ci.qty}</td>
        <td class="item-price" style="text-align:right">₹${item.price * ci.qty}</td>
      </tr>
    `;
  }).join('');

  return `
    <div class="billing-page">
      <div class="billing-title">
        <h1 class="${currentLang === 'hi' ? 'font-serif-hi' : 'font-serif-en'}">${t('billingDetails')}</h1>
      </div>

      <!-- Order Summary -->
      <div class="billing-form-section">
        <h2 class="${currentLang === 'hi' ? 'font-serif-hi' : 'font-serif-en'}">${t('orderSummary')}</h2>
        <table class="order-summary-table">
          <thead>
            <tr>
              <th>${t('item')}</th>
              <th style="text-align:center">${t('quantity')}</th>
              <th style="text-align:right">${t('price')}</th>
            </tr>
          </thead>
          <tbody>
            ${orderRows}
          </tbody>
        </table>
        <div class="order-summary-total">
          <span class="order-summary-total-label">${t('total')}</span>
          <span class="order-summary-total-value">₹${total}</span>
        </div>
      </div>

      <!-- Customer Details -->
      <form id="billing-form" onsubmit="handlePlaceOrder(event)">
        <div class="billing-form-section">
          <h2 class="${currentLang === 'hi' ? 'font-serif-hi' : 'font-serif-en'}">${t('customerDetails')}</h2>

          <div class="form-group">
            <label class="form-label" for="billing-name">${t('fullName')} <span style="color:var(--terracotta)">*</span></label>
            <input type="text" class="form-input" id="billing-name" required placeholder="${t('namePlaceholder')}" autocomplete="name" />
          </div>

          <div class="form-group">
            <label class="form-label" for="billing-instructions">${t('specialInstructions')} <span class="optional-tag">(${t('optional')})</span></label>
            <textarea class="form-textarea" id="billing-instructions" placeholder="${t('instructionsPlaceholder')}" rows="2"></textarea>
          </div>
        </div>

        <div class="billing-form-section">
          <p class="billing-note" style="margin-bottom:var(--space-md);line-height:1.7;">${currentLang === 'hi'
            ? 'ऑर्डर भेजने के लिए कृपया जानकारी भरें। पूरा विवरण व्हाट्सएप पर स्वत: खुल जाएगा।'
            : 'Fill in your details and your order will be prepared to send directly via WhatsApp.'
          }</p>
        </div>

        <div class="billing-submit">
          <button type="submit" class="btn btn-gold" style="padding:14px 48px; font-size:1.05rem;">
            ${t('placeOrder')}
          </button>
        </div>
      </form>
    </div>
  `;
}

function handlePlaceOrder(e) {
  e.preventDefault();
  const name = document.getElementById('billing-name').value.trim();
  const instructions = document.getElementById('billing-instructions').value.trim();

  if (!name) {
    alert(t('fillRequired'));
    return;
  }

  // Generate order ID
  const orderId = 'SSFS-' + Date.now().toString(36).toUpperCase();

  const orderItems = cart.map(ci => {
    const item = findItem(ci.id);
    return item ? { name: itemName(item), qty: ci.qty, price: item.price, subtotal: item.price * ci.qty } : null;
  }).filter(Boolean);

  if (orderItems.length === 0) {
    alert(currentLang === 'hi' ? 'कृपया पहले कुछ जोड़ें।' : 'Please add items before placing an order.');
    return;
  }

  const total = getCartTotal();
  const itemLines = orderItems.map(item => `• ${item.name} × ${item.qty} = ₹${item.subtotal}`).join('\n');
  const instructionLine = instructions ? `${currentLang === 'hi' ? 'विशेष निर्देश' : 'Special Instructions'}: ${instructions}` : '';

  const messageLines = [
    currentLang === 'hi' ? 'नमस्ते Shambhu Serenity Food Service,' : 'Hello Shambhu Serenity Food Service,',
    currentLang === 'hi' ? 'मैं यह ऑर्डर देना चाहता/चाहती हूँ:' : 'I would like to place this order:',
    '',
    `${currentLang === 'hi' ? 'ग्राहक का नाम' : 'Customer Name'}: ${name}`,
  ];

  if (instructionLine) {
    messageLines.push(instructionLine);
  }

  messageLines.push('', `${currentLang === 'hi' ? 'ऑर्डर विवरण' : 'Order Details'}:`, itemLines, '', `${currentLang === 'hi' ? 'कुल' : 'Total'}: ₹${total}`);

  const whatsappNumber = AppData.brand.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`;

  cart = [];
  saveCart();
  renderApp();

  window.open(whatsappUrl, '_blank');
}

// ─── Page: Order Confirmation ──────────────────────────────────
function renderConfirmationPage() {
  if (!lastOrderData) {
    return `
      <div class="confirmation-page">
        <div style="font-size:3rem; margin-bottom:var(--space-md);">🍽️</div>
        <h2 style="margin-bottom:var(--space-md);">${currentLang === 'hi' ? 'कोई ऑर्डर नहीं मिला' : 'No order found'}</h2>
        <a href="#/" class="btn btn-primary">${t('backToMenu')}</a>
      </div>
    `;
  }

  const od = lastOrderData;
  const itemsList = od.items.map(i => `${i.name} ×${i.qty}`).join(', ');

  return `
    <div class="confirmation-page">
      <div class="confirmation-hearts">♥ ♥ ♥</div>
      <h1 class="confirmation-title ${currentLang === 'hi' ? 'font-serif-hi' : 'font-serif-en'}">
        ${t('thankYou')}
      </h1>
      <p class="confirmation-subtitle">${t('orderReceived')}</p>

      <div class="confirmation-details">
        <div class="confirmation-row">
          <span class="confirmation-row-label">${t('orderId')}</span>
          <span class="confirmation-row-value">${escHtml(od.orderId)}</span>
        </div>
        <div class="confirmation-row">
          <span class="confirmation-row-label">${t('customerName')}</span>
          <span class="confirmation-row-value">${escHtml(od.name)}</span>
        </div>
        <div class="confirmation-row">
          <span class="confirmation-row-label">${t('items')}</span>
          <span class="confirmation-row-value">${escHtml(itemsList)}</span>
        </div>
        <div class="confirmation-row">
          <span class="confirmation-row-label">${t('totalAmount')}</span>
          <span class="confirmation-row-value total-amount">₹${od.total}</span>
        </div>
      </div>

      <div class="confirmation-actions">
        <a href="#/" class="btn btn-primary">${t('backToMenu')}</a>
        <a href="tel:${AppData.brand.phone}" class="btn btn-secondary">📞 ${t('callForOrder')}</a>
      </div>
    </div>
  `;
}

// ─── Utilities ─────────────────────────────────────────────────
function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function scrollToSection(event, sectionId) {
  if (event) event.preventDefault();
  // If not on home page, navigate there first
  if (window.location.hash !== '#/' && window.location.hash !== '') {
    window.location.hash = '#/';
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 70;
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
  } else {
    const el = document.getElementById(sectionId);
    if (el) {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 70;
      const top = el.getBoundingClientRect().top + window.scrollY - navH - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Router ────────────────────────────────────────────────────
function getPageContent() {
  const hash = window.location.hash || '#/';
  if (hash === '#/billing') {
    return renderBillingPage();
  } else {
    return renderHomePage();
  }
}

// ─── Main Render ───────────────────────────────────────────────
function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  // Save scroll position for search-related re-renders
  const scrollY = window.scrollY;
  const isSearchRerender = document.activeElement?.id === 'menu-search-input';

  app.innerHTML = `
    ${renderNavbar()}
    <main role="main">
      ${getPageContent()}
    </main>
    ${renderFooter()}
    ${renderBottomBar()}
    <div id="cart-drawer-container">
      ${renderCartDrawerHtml()}
    </div>
    <div id="toast-container" class="toast-container"></div>
  `;

  // Restore scroll for search
  if (isSearchRerender) {
    window.scrollTo(0, scrollY);
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    }
  }
}

// ─── Initialize ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  window.scrollTo(0, 0);
});

window.addEventListener('hashchange', () => {
  mobileNavOpen = false;
  cartOpen = false;
  document.body.style.overflow = '';
  renderApp();
  window.scrollTo(0, 0);
});
