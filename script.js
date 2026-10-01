// Edit this list to change the products shown in the shop.
const products = [
  { id: 1, name: 'Club de Nuit Intense', category: 'Perfumes', audience: "Men's Fragrances", price: 45000, description: 'Smoky citrus and woods with a confident, lasting finish.', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80', stock: 8 },
  { id: 2, name: 'Afnan 9PM', category: 'Perfumes', audience: "Men's Fragrances", price: 52000, description: 'Warm vanilla, spice, and a little after-hours energy.', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80', stock: 7 },
  { id: 3, name: 'Lattafa Asad', category: 'Perfumes', audience: "Men's Fragrances", price: 38000, description: 'A bold blend of black pepper, amber, and deep woods.', image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80', stock: 10 },
  { id: 4, name: 'Amouage Interlude', category: 'Perfumes', audience: 'Unisex', price: 185000, description: 'Resinous incense and amber, composed with presence.', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80', stock: 4 },
  { id: 5, name: 'Hugo Boss Bottled', category: 'Perfumes', audience: "Men's Fragrances", price: 68000, description: 'Polished apple, spice, and woods for every day.', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80', stock: 6 },
  { id: 6, name: 'Ombre Nomade', category: 'Perfumes', audience: 'Unisex', price: 215000, description: 'Smoky oud and dark rose with a soft, warm trail.', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', stock: 3 },
  { id: 7, name: 'Oud Oil', category: 'Perfume Oils', audience: 'Unisex', price: 18000, description: 'Earthy oud in a concentrated, pocket-sized oil.', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80', stock: 12 },
  { id: 8, name: 'Vanilla Oil', category: 'Perfume Oils', audience: "Women's Fragrances", price: 14000, description: 'Soft, creamy vanilla with a gentle warmth.', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80', stock: 15 },
  { id: 9, name: 'Amber Oil', category: 'Perfume Oils', audience: 'Unisex', price: 16000, description: 'Golden amber and resin, warm against the skin.', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80', stock: 10 },
  { id: 10, name: 'Musk Oil', category: 'Perfume Oils', audience: 'Unisex', price: 12000, description: 'Clean, quiet musk with an easy everyday feel.', image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80', stock: 15 },
  { id: 11, name: 'Boss-Inspired Oil', category: 'Perfume Oils', audience: "Men's Fragrances", price: 15000, description: 'Fresh woods and spice in a convenient oil blend.', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80', stock: 12 },
  { id: 12, name: 'Tobacco Vanilla Oil', category: 'Perfume Oils', audience: 'Unisex', price: 19000, description: 'A smooth pairing of dry tobacco and sweet vanilla.', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', stock: 8 }
];

const CART_STORAGE_KEY = 'tuvo-perfumes-cart';
const productGrid = document.querySelector('#product-grid');
const cartDrawer = document.querySelector('#cart-drawer');
const cartOverlay = document.querySelector('#cart-overlay');
const productModal = document.querySelector('#product-modal');
const authModal = document.querySelector('#auth-modal');
const checkoutModal = document.querySelector('#checkout-modal');
const searchInput = document.querySelector('#product-search');
const toast = document.querySelector('#toast');

let activeCategory = 'All';
let cart = loadCart();
let detailProductId = null;
let detailQuantity = 1;
let toastTimer;
let lastFocusedElement = null;

// Keep every displayed amount in Nigerian Naira.
function formatPrice(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount);
}

function getProduct(productId) {
  return products.find((product) => product.id === Number(productId));
}

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All'
      || product.category === activeCategory
      || product.audience === activeCategory;
    const searchableText = `${product.name} ${product.category} ${product.audience} ${product.description}`.toLowerCase();
    return matchesCategory && searchableText.includes(searchTerm);
  });

  productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.name} fragrance" loading="lazy">
        <span class="product-label">${product.category === 'Perfume Oils' ? 'Perfume oil' : product.audience.replace(' Fragrances', '')}</span>
        <button class="product-quick-add" type="button" aria-label="Add ${product.name} to cart" data-add="${product.id}">+</button>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <div class="product-name-row"><h3 class="product-name">${product.name}</h3><span class="product-price">${formatPrice(product.price)}</span></div>
        <p class="product-description">${product.description}</p>
        <div class="product-card-actions">
          <button class="add-button" type="button" data-add="${product.id}">Add to bag</button>
          <button class="details-button" type="button" data-details="${product.id}">View details</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelector('#no-results').hidden = filteredProducts.length > 0;
}

function renderOilProducts() {
  const oilProducts = products.filter((product) => product.category === 'Perfume Oils');
  document.querySelector('#oil-product-grid').innerHTML = oilProducts.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.name} perfume oil" loading="lazy">
        <span class="product-label">${product.audience.replace(' Fragrances', '')}</span>
        <button class="product-quick-add" type="button" aria-label="Add ${product.name} to cart" data-add="${product.id}">+</button>
      </div>
      <div class="product-info">
        <p class="product-category">Perfume oil</p>
        <div class="product-name-row"><h3 class="product-name">${product.name}</h3><span class="product-price">${formatPrice(product.price)}</span></div>
        <p class="product-description">${product.description}</p>
        <div class="product-card-actions">
          <button class="add-button" type="button" data-add="${product.id}">Add to bag</button>
          <button class="details-button" type="button" data-details="${product.id}">View details</button>
        </div>
      </div>
    </article>
  `).join('');
}

function updateCategoryButtons() {
  document.querySelectorAll('.category-button').forEach((button) => {
    const isActive = button.dataset.category === activeCategory;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function setCategory(category) {
  activeCategory = category;
  updateCategoryButtons();
  renderProducts();
}

function calculateTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    if (!Array.isArray(savedCart)) return [];

    return savedCart.reduce((validItems, item) => {
      const product = products.find((entry) => entry.id === Number(item.id));
      const quantity = Number(item.quantity);
      if (product && Number.isInteger(quantity) && quantity > 0) {
        validItems.push({ id: product.id, quantity: Math.min(quantity, product.stock) });
      }
      return validItems;
    }, []);
  } catch {
    return [];
  }
}

function addToCart(productId, quantity = 1) {
  const product = getProduct(productId);
  const amountToAdd = Number(quantity);
  if (!product || !Number.isInteger(amountToAdd) || amountToAdd < 1) {
    showToast('Choose a valid product quantity first.');
    return;
  }

  const existingItem = cart.find((item) => item.id === product.id);
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  if (currentQuantity + amountToAdd > product.stock) {
    showToast(`Only ${product.stock} available for ${product.name}.`);
    return;
  }

  if (existingItem) existingItem.quantity += amountToAdd;
  else cart.push({ id: product.id, quantity: amountToAdd });

  updateCart();
  showToast(`${product.name} added to your bag.`);
}

function updateCart() {
  saveCart();
  renderCart();
  updateCheckoutSummary();
}

function renderCart() {
  const cartItems = document.querySelector('#cart-items');
  const cartFooter = document.querySelector('#cart-footer');
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.cart-count').textContent = count;
  document.querySelector('.cart-trigger').setAttribute('aria-label', `Open shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`);
  document.querySelector('.drawer-count').textContent = `(${count})`;
  document.querySelector('#cart-subtotal').textContent = formatPrice(calculateTotal());

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span class="empty-cart-mark" aria-hidden="true">T</span>
        <h3>Your cart is empty.</h3>
        <p>Discover a fragrance that feels like you.</p>
        <button class="button button-dark" type="button" data-shop-from-empty>Shop fragrances <span aria-hidden="true">↗</span></button>
      </div>
    `;
    cartFooter.hidden = true;
    return;
  }

  cartFooter.hidden = false;
  cartItems.innerHTML = cart.map((item) => {
    const product = getProduct(item.id);
    if (!product) return '';
    return `
      <article class="cart-line">
        <img class="cart-line-image" src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="cart-line-details">
          <h3>${product.name}</h3>
          <p>${formatPrice(product.price)} each</p>
          <div class="quantity-control" aria-label="Quantity for ${product.name}">
            <button type="button" aria-label="Decrease ${product.name} quantity" data-cart-change="-1" data-id="${product.id}">−</button>
            <span>${item.quantity}</span>
            <button type="button" aria-label="Increase ${product.name} quantity" data-cart-change="1" data-id="${product.id}">+</button>
          </div>
        </div>
        <div class="cart-line-end">
          <span class="cart-line-total">${formatPrice(product.price * item.quantity)}</span>
          <button class="remove-item" type="button" data-remove="${product.id}">Remove</button>
        </div>
      </article>
    `;
  }).join('');
}

function changeCartQuantity(productId, change) {
  const item = cart.find((entry) => entry.id === Number(productId));
  const product = getProduct(productId);
  if (!item || !product) return;

  const nextQuantity = item.quantity + Number(change);
  if (nextQuantity < 1) {
    removeFromCart(productId);
    return;
  }
  if (nextQuantity > product.stock) {
    showToast(`Only ${product.stock} available for ${product.name}.`);
    return;
  }

  item.quantity = nextQuantity;
  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== Number(productId));
  updateCart();
  showToast('Item removed from your bag.');
}

function openCart() {
  lastFocusedElement = document.activeElement;
  cartDrawer.classList.add('is-open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartOverlay.hidden = false;
  document.body.classList.add('drawer-open');
  cartDrawer.querySelector('[data-close-cart]').focus();
}

function closeCart() {
  cartDrawer.classList.remove('is-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartOverlay.hidden = true;
  document.body.classList.remove('drawer-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

function openProductDetails(productId) {
  const product = getProduct(productId);
  if (!product) return;
  detailProductId = product.id;
  detailQuantity = 1;
  renderProductDetails(product);
  openDialog(productModal);
}

function renderProductDetails(product) {
  document.querySelector('#detail-content').innerHTML = `
    <img class="detail-image" src="${product.image}" alt="${product.name} fragrance">
    <div class="detail-copy">
      <p class="eyebrow">${product.category} · ${product.audience.replace(' Fragrances', '')}</p>
      <h2 id="detail-name">${product.name}</h2>
      <p class="detail-price">${formatPrice(product.price)}</p>
      <p class="detail-description">${product.description} A considered addition to your fragrance wardrobe, selected by TUVO PERFUMES in Lagos.</p>
      <p class="detail-meta"><strong>Available quantity:</strong> ${product.stock} in stock</p>
      <div class="detail-quantity">
        <label>Quantity</label>
        <div class="quantity-control">
          <button type="button" aria-label="Decrease quantity" data-detail-change="-1">−</button>
          <span id="detail-quantity-value" aria-live="polite">${detailQuantity}</span>
          <button type="button" aria-label="Increase quantity" data-detail-change="1">+</button>
        </div>
      </div>
      <button class="button button-dark detail-add" type="button" data-detail-add>Add to bag <span aria-hidden="true">↗</span></button>
    </div>
  `;
}

function changeDetailQuantity(change) {
  const product = getProduct(detailProductId);
  if (!product) return;
  const nextQuantity = detailQuantity + Number(change);
  if (nextQuantity < 1 || nextQuantity > product.stock) return;
  detailQuantity = nextQuantity;
  document.querySelector('#detail-quantity-value').textContent = detailQuantity;
}

function openDialog(dialog) {
  lastFocusedElement = document.activeElement;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}

function updateCheckoutSummary() {
  const summary = document.querySelector('#checkout-items');
  summary.innerHTML = cart.map((item) => {
    const product = getProduct(item.id);
    if (!product) return '';
    return `<div class="summary-line"><span class="summary-line-name">${product.name} × ${item.quantity}</span><span class="summary-line-price">${formatPrice(product.price * item.quantity)}</span></div>`;
  }).join('');
  document.querySelector('#checkout-total').textContent = formatPrice(calculateTotal());
  document.querySelector('#summary-total').textContent = formatPrice(calculateTotal());
}

function openCheckout() {
  if (cart.length === 0) {
    showToast('Add a fragrance to your bag before checking out.');
    return;
  }
  closeCart();
  updateCheckoutSummary();
  openDialog(checkoutModal);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function closeMobileMenu() {
  const menu = document.querySelector('.main-navigation');
  const toggle = document.querySelector('.menu-toggle');
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
}

// Delegate product and cart actions so dynamically rendered buttons keep working.
document.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add]');
  const detailsButton = event.target.closest('[data-details]');
  const quantityButton = event.target.closest('[data-cart-change]');
  const removeButton = event.target.closest('[data-remove]');
  const detailChangeButton = event.target.closest('[data-detail-change]');
  const navCategoryLink = event.target.closest('[data-nav-category]');

  if (addButton) addToCart(addButton.dataset.add);
  if (detailsButton) openProductDetails(detailsButton.dataset.details);
  if (quantityButton) changeCartQuantity(quantityButton.dataset.id, quantityButton.dataset.cartChange);
  if (removeButton) removeFromCart(removeButton.dataset.remove);
  if (detailChangeButton) changeDetailQuantity(detailChangeButton.dataset.detailChange);

  if (event.target.closest('[data-open-cart]')) openCart();
  if (event.target.closest('[data-close-cart]')) closeCart();
  if (event.target === cartOverlay) closeCart();
  if (event.target.closest('[data-open-checkout]')) openCheckout();

  if (event.target.closest('[data-detail-add]')) {
    addToCart(detailProductId, detailQuantity);
    closeDialog(productModal);
  }

  if (event.target.closest('[data-open-auth]')) openDialog(authModal);
  if (event.target.closest('[data-demo-signin]')) {
    closeDialog(authModal);
    showToast('Demo sign-in only. Google authentication is not connected yet.');
  }

  if (event.target.closest('[data-close-dialog]')) {
    const dialog = event.target.closest('dialog');
    if (dialog) closeDialog(dialog);
  }

  if (event.target.closest('[data-shop-from-empty]')) {
    closeCart();
    document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
  }

  if (event.target.closest('.category-button')) {
    setCategory(event.target.closest('.category-button').dataset.category);
  }

  if (event.target.closest('.reset-filters')) {
    searchInput.value = '';
    setCategory('All');
  }

  if (navCategoryLink) setCategory(navCategoryLink.dataset.navCategory);
  if (event.target.closest('.menu-toggle')) {
    const menu = document.querySelector('.main-navigation');
    const toggle = document.querySelector('.menu-toggle');
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  }

  if (event.target.closest('.main-navigation a')) closeMobileMenu();
});

// Keep the card layout polished if a remote sample photo cannot be loaded.
document.addEventListener('error', (event) => {
  if (event.target instanceof HTMLImageElement) event.target.classList.add('image-unavailable');
}, true);

searchInput.addEventListener('input', renderProducts);

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('close', () => {
    if (![productModal, authModal, checkoutModal].some((openDialogElement) => openDialogElement.open)) {
      document.body.classList.remove('dialog-open');
    }
    if (lastFocusedElement) lastFocusedElement.focus();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cartDrawer.classList.contains('is-open')) closeCart();
});

document.querySelector('#checkout-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (cart.length === 0) {
    closeDialog(checkoutModal);
    showToast('Your bag is empty. Add a fragrance to continue.');
    return;
  }

  document.querySelector('#checkout-form').reset();
  cart = [];
  updateCart();
  closeDialog(checkoutModal);
  showToast('Thank you for your order. Your order has been received.');
});

// Paint the saved bag immediately when the storefront opens.
updateCategoryButtons();
renderProducts();
renderOilProducts();
updateCart();
