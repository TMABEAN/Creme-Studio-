// Change quantity on product card
function changeQty(button, amount) {
  const qtyBox = button.parentElement;
  const qtyValue = qtyBox.querySelector('.qty-value');

  let currentQty = parseInt(qtyValue.innerText);

  currentQty = currentQty + amount;

  if (currentQty < 1) {
    currentQty = 1;
  }

  qtyValue.innerText = currentQty;
}


// Get all add to cart buttons
const addButtons = document.querySelectorAll('.product-card__btn');


// Add click function to each button
addButtons.forEach(function(button) {
  button.addEventListener('click', function() {

    const card = button.closest('.product-card');

    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const image = card.dataset.image;
    const quantity = Number(card.querySelector('.qty-value').innerText);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = {
      name: name,
      price: price,
      image: image,
      quantity: quantity
    };

    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(name + ' added to cart!');
  });
});
