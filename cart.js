const savedCart = localStorage.getItem("cart");
let cart = savedCart ? JSON.parse(savedCart) : [];


function displayProducts() {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';
  products.forEach(product => {
    productsDiv.innerHTML += `
      <div class="product">
        <a href="${product.href}">
  <img src="${product.image}" alt="${product.name}"></a>
        <h3>${product.name}</h3>
        <p>Price: ₹ ${product.price}</p>
        <button class="add-btn"onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // Calculate total after cart update
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cartTotal", total.toString());

  alert("Added to cart!");
}

function decreaseQuantity(productId) {
  const itemIndex = cart.findIndex(i => i.id === productId);
  if (itemIndex !== -1) {
    const item = cart[itemIndex];
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
    updateCart();

    // 🔑 Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 🔑 Also update total in localStorage
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    localStorage.setItem("cartTotal", total.toString());
  }
}
function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalSpan = document.getElementById('total');
  cartItemsDiv.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 10px;">
        <span>${item.name || "Item"} x ${item.quantity} = ₹${subtotal}</span>
        <button class="remove-btn" onclick="decreaseQuantity(${item.id})">Remove</button>
      </div>
    `;
  });

  totalSpan.textContent = total;
  localStorage.setItem("cart", JSON.stringify(cart)); // ✅ sync with localStorage
}
displayProducts();