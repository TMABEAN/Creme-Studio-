const cartContainer = document.getElementById('cartItems');
const subtotalText = document.getElementById('subtotal');
const totalText = document.getElementById('total');
const cartCount = document.getElementById('cartCount');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

let total = 0;
let itemCount = 0;

cartContainer.innerHTML = '';

if (cart.length === 0) {
  cartContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
}

cart.forEach(function(item, index) {
  total = total + item.price * item.quantity;
  itemCount = itemCount + item.quantity;

  cartContainer.innerHTML += `
    <div class="cart-item">

      <div class="cart-item__img">
        <img src="${item.image}" alt="${item.name}">
      </div>

      <div class="cart-item__info">
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__desc">Fresh bakery item</p>
      </div>

      <div class="cart-item__qty">
        <button class="qty-btn qty-btn--up" onclick="updateQty(${index}, 1)">↑</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn qty-btn--down" onclick="updateQty(${index}, -1)">↓</button>
      </div>

      <p class="cart-item__price">SEK ${item.price * item.quantity}</p>

      <button class="cart-item__delete" onclick="deleteItem(${index})">
        Remove
      </button>

    </div>
  `;
});

subtotalText.innerText = 'SEK ' + total;
totalText.innerText = 'SEK ' + total;
cartCount.innerText = itemCount + ' items';

function updateQty(index, amount) {
  cart[index].quantity = cart[index].quantity + amount;

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  location.reload();
}

function deleteItem(index) {
  cart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cart));

  location.reload();
}

const clearButton = document.querySelector('.cart-clear-btn');

clearButton.addEventListener('click', function() {
  localStorage.removeItem('cart');

  location.reload();
});
