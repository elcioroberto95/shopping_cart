// code executes only once the window is ready
// i.e once all the images, scripts and css
(function () {
  let menuData = {
    21390312: {
      productName: "Mouse",
      price: 199,
    },
    21399999: {
      productName: "KeyBoard",
      price: 299,
    },
    21398888: {
      productName: "AMD CPU",
      price: 999,
    },
  };

  let cartData = {};
  let menuArea = document.getElementById("menu-area");
  let cartList = document.getElementById("cart-list");
  const totalAmount = document.getElementById("total-amount");

  let setMenu = function () {
    for (let cod in menuData) {
      let menuItem = createMenuItem(cod);
      menuArea.appendChild(menuItem);
    }
  };

  let createMenuItem = function (cod) {
    let data = menuData[cod];

    let menuItem = document.createElement("div");
    menuItem.className = "menu-item";

    let menuText = document.createElement("span");
    menuText.className = "menu-text";
    menuText.innerText = `${data.productName} - R$${data.price}`;

    let menuActionSpan = document.createElement("span");
    menuActionSpan.className = "menu-action";

    let menuActionButton = document.createElement("button");
    menuActionButton.innerText = "+";
    menuActionButton.setAttribute("data-cod", cod);
    menuActionButton.onclick = addToCart;
    menuActionSpan.appendChild(menuActionButton);

    menuItem.appendChild(menuText);
    menuItem.appendChild(menuActionSpan);

    return menuItem;
  };

  let addToCart = function (e) {
    let button = e.target;
    let cod = button.getAttribute("data-cod");

    if (cod in cartData) cartData[cod] += 1;
    else cartData[cod] = 1;

    setCart();
  };
  let reduceCartCount = function (e) {
    let button = e.target;
    let cod = button.getAttribute("data-cod");
    if (cod in cartData) {
      cartData[cod] -= 1;
      if (cartData[cod] < 1) delete cartData[cod];
    }
    setCart();
  };

  let setCart = function () {
    cartList.innerHTML = "";
    let total = 0;

    for (let cod in cartData) {
      let details = menuData[cod];
      let qty = cartData[cod];
      let cartItem = createCartItem(cod);
      total += qty * details.price;
      cartList.appendChild(cartItem);
    }
    totalAmount.innerText = total;
  };

  let createCartItem = (cod) => {
    let data = menuData[cod];
    let qty = cartData[cod];

    let cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    let itemText = document.createElement("span");
    itemText.classList.add("item-text");
    itemText.innerText = `${data.productName} x ${qty}`;

    let itemTotal = document.createElement("span");
    itemTotal.classList.add("item-text");
    itemTotal.innerText = `R$ ${data.price} * ${qty}`;

    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("data-cod", cod);
    removeButton.innerText = `-`;
    removeButton.onclick = reduceCartCount;

    cartItemDiv.appendChild(itemText);
    cartItemDiv.appendChild(itemTotal);
    cartItemDiv.appendChild(removeButton);

    return cartItemDiv;
  };
  setMenu();
})();
