/* ---------- Templates: menu ---------- */

function categoryTemplate(category) {
  const dishCards = DISHES.map((dish, index) =>
    dish.category === category.id ? dishTemplate(dish, index) : ""
  ).join("");

  return `
    <section class="menu-section" id="section-${category.id}">
      <div class="section-band">
        <span class="section-icon">${category.icon}</span>
        <h2>${category.title} ${category.suffix ? `<small>${category.suffix}</small>` : ""}</h2>
      </div>
      <div class="dish-list">${dishCards}</div>
    </section>`;
}

function dishTemplate(dish, index) {
  const quantity = basket[index] || 0;
  return `
    <article class="dish-card">
      <div class="dish-img dish-img-${dish.category}"><span>${dish.emoji}</span></div>
      <div class="dish-info">
        <div class="dish-top">
          <h3>${dish.name}</h3>
          <span class="dish-price">${formatPrice(dish.price)}</span>
        </div>
        <p class="dish-description">${dish.description}</p>
        <button class="add-btn ${quantity > 0 ? "added" : ""}" onclick="addToBasket(${index})">
          ${quantity > 0 ? `Added ${quantity}` : "Add to basket"}
        </button>
      </div>
    </article>`;
}

/* ---------- Templates: basket ---------- */

function emptyBasketTemplate() {
  return `
    <div class="basket-empty">
      <p>Nothing here yet.<br>Go ahead and choose something delicious!</p>
      <svg viewBox="0 0 24 24"><path d="M4 6h2l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2h7.8a1.5 1.5 0 0 0 1.5-1.2L20.5 9H7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="21" r="1.2" fill="currentColor"/><circle cx="17.5" cy="21" r="1.2" fill="currentColor"/></svg>
    </div>`;
}

function basketItemTemplate(index) {
  const dish = DISHES[index];
  const quantity = basket[index];
  return `
    <div class="basket-item">
      <p class="basket-item-name">${quantity} x ${dish.name}</p>
      <div class="basket-item-row">
        <div class="qty-controls">
          <button onclick="decreaseQuantity(${index})" aria-label="Remove one">
            <svg viewBox="0 0 24 24"><path d="M5 7h14M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m-8.5 0 .8 12A1.5 1.5 0 0 0 8.8 20.5h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-12.1M10 11v6m4-6v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <span>${quantity}</span>
          <button onclick="increaseQuantity(${index})" aria-label="Add one">+</button>
        </div>
        <span class="basket-item-price">${formatPrice(dish.price * quantity)}</span>
      </div>
    </div>`;
}

function basketSummaryTemplate() {
  const subtotal = getSubtotal();
  const total = subtotal + DELIVERY_FEE;
  return `
    <div class="basket-summary">
      <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="summary-row"><span>Delivery fee</span><span>${formatPrice(DELIVERY_FEE)}</span></div>
      <div class="summary-row summary-total"><span>Total</span><span>${formatPrice(total)}</span></div>
      <button class="buy-btn" onclick="buyNow()">Buy now (${formatPrice(total)})</button>
    </div>`;
}
