document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("products-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotalMsg = document.getElementById("cart-total");
  const totalAmt = document.getElementById("total-amount");
  const checkoutBtn = document.getElementById("checkout-btn");
  cartTotalMsg.classList.add("hidden");
  const products = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    { id: 3, name: "Product 3", price: 39.99 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
  console.log("DOM fully loaded and parsed");

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productItem);
  });

  productList.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);

      addToCart(product);
    }
  });
  function addToCart(product) {
    cart.push(product);
    updateCart();
    renderCart();
  }
  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    if (cart.length > 0) {
      emptyCartMsg.classList.add("hidden");
      cartTotalMsg.classList.remove("hidden");
      cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span> 
        <button class="remove-btn" data-id="${index}">Remove</button>`;

        cartItem.classList.add("cart-item");
        cartItems.appendChild(cartItem);
      });
      totalAmt.textContent = `${total.toFixed(2)}`;
    } else {
      emptyCartMsg.classList.remove("hidden");
      cartTotalMsg.classList.add("hidden");
    }
  }
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-id"));
      console.log(index);

      cart.splice(index, 1);
      updateCart();
      renderCart();
    }
  });
  checkoutBtn.addEventListener("click", function () {
    cart.length = 0;
    updateCart();
    renderCart();
    setTimeout(() => {
      alert("Thank you for your purchase!");
    }, 50);
  });
});
