// Quantity change
function changeQty(id, delta) {
  const el = document.getElementById(`qty-${id}`);
  let val = parseInt(el.textContent) + delta;
  if (val < 1) val = 1;
  el.textContent = val;
  updateTotal();
}

// Delete item
function deleteItem(id) {
  const item = document.querySelector(`.cart-item[data-id="${id}"]`);
  if (item) {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { item.remove(); updateTotal(); }, 300);
  }
}

// Update total
function updateTotal() {
  const items = document.querySelectorAll('.cart-item');
  let total = 0;
  items.forEach(item => {
    const id = item.dataset.id;
    const qty = parseInt(document.getElementById(`qty-${id}`)?.textContent || 0);
    total += qty * 100;
  });
  document.getElementById('subtotal').textContent = `SEK ${total}`;
  document.getElementById('total').textContent = `SEK ${total}`;
}

// Tabs
const tabs = document.querySelectorAll('.cart-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('cart-tab--active'));
    tab.classList.add('cart-tab--active');
  });
});