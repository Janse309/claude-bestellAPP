let basket = loadBasket();

function init() {
  renderMenu();
  renderBasket();
  if (!isMobileView() && getItemCount() > 0) openBasket();
}

/* ---------- Rendering: menu ---------- */

function renderMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = CATEGORIES.map((category) => categoryTemplate(category)).join("");
}

/* ---------- Rendering: basket ---------- */

function renderBasket() {
  const content = document.getElementById("basket-content");
  const indexes = Object.keys(basket);

  if (indexes.length === 0) {
    content.innerHTML = emptyBasketTemplate();
  } else {
    content.innerHTML = `
      <div class="basket-items">${indexes.map((i) => basketItemTemplate(+i)).join("")}</div>
      ${basketSummaryTemplate()}`;
  }
  updateNavBadge();
}

/* ---------- Basket actions ---------- */

function addToBasket(index) {
  basket[index] = (basket[index] || 0) + 1;
  updateAll();
  if (!isMobileView()) openBasket();
}

function increaseQuantity(index) {
  basket[index]++;
  updateAll();
}

function decreaseQuantity(index) {
  basket[index]--;
  if (basket[index] <= 0) delete basket[index];
  updateAll();
}

let confirmationTimer;

function buyNow() {
  basket = {};
  updateAll();
  closeBasket();
  document.getElementById("confirmation-overlay").classList.remove("d-none");
  clearTimeout(confirmationTimer);
  confirmationTimer = setTimeout(closeConfirmation, 3000);
}

function closeConfirmation() {
  document.getElementById("confirmation-overlay").classList.add("d-none");
}

function updateAll() {
  saveBasket();
  renderMenu();
  renderBasket();
}

/* ---------- Helpers ---------- */

function getSubtotal() {
  return Object.keys(basket).reduce((sum, i) => sum + DISHES[i].price * basket[i], 0);
}

function getItemCount() {
  return Object.values(basket).reduce((sum, qty) => sum + qty, 0);
}

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",") + "€";
}

function saveBasket() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function loadBasket() {
  try {
    return JSON.parse(localStorage.getItem("basket")) || {};
  } catch {
    return {};
  }
}

/* ---------- Mobile navigation ---------- */

function updateNavBadge() {
  const badge = document.getElementById("nav-badge");
  const count = getItemCount();
  badge.textContent = count;
  badge.classList.toggle("d-none", count === 0);
}

function isMobileView() {
  return window.matchMedia("(max-width: 1000px)").matches;
}

function openBasket() {
  document.body.classList.add("basket-open");
  if (isMobileView()) {
    document.getElementById("basket-overlay").classList.remove("d-none");
  }
}

function closeBasket() {
  document.body.classList.remove("basket-open");
  document.getElementById("basket-overlay").classList.add("d-none");
}

function toggleBasket() {
  if (document.body.classList.contains("basket-open")) {
    closeBasket();
  } else {
    openBasket();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeBasket();
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}