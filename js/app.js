let currentPage = 1;

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}
document.querySelector("#theme-button").addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  updateThemeButton();
});

function updateThemeButton() {
  if (document.body.classList.contains("dark")) {
    document.querySelector("#theme-button").textContent = "Light";
  } else {
    document.querySelector("#theme-button").textContent = "Dark";
  }
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
updateThemeButton();

async function loadCheckout(event) {
  event.preventDefault();

  const name = document.querySelector("#name-input").value;
  const email = document.querySelector("#email-input").value;
  const address = document.querySelector("#address-input").value;

  const name_error = document.querySelector("#name-error");
  const email_error = document.querySelector("#email-error");
  const address_error = document.querySelector("#address-error");

  name_error.textContent = "";
  email_error.textContent = "";
  address_error.textContent = "";

  let valid = true;

  if (name === "") {
    name_error.textContent = "Name is required";
    valid = false;
  }

  if (email === "") {
    email_error.textContent = "Email is required";
    valid = false;
  } else if (!email.includes("@")) {
    email_error.textContent = "Enter a valid email";
    valid = false;
  }
  const phone = document.querySelector("#phone-input").value;

  const phone_error = document.querySelector("#phone-error");

  phone_error.textContent = "";

  if (phone === "") {
    phone_error.textContent = "Phone is required";
    valid = false;
  }

  if (address === "") {
    address_error.textContent = "Address is required";
    valid = false;
  } else if (address.length < 5) {
    address_error.textContent = "Address is too short";
    valid = false;
  }

  if (valid === false) {
    return;
  }
  const submit_button = document.querySelector("#checkout-form button");
  submit_button.disabled = true;
  submit_button.textContent = "Sending...";

  try {
    const result = await addUser({ firstName: name, email, phone, address });
    showMessage("Order placed for " + result.firstName + ", id " + result.id);
    document.querySelector("#checkout-form").reset();
  } catch (error) {
    showMessage("Something went wrong. Try again");
  } finally {
    submit_button.disabled = false;
    submit_button.textContent = "Place order";
  }
}

function updateCartCounter() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#cart-count").textContent = total;
}

function renderCart() {
  const main = document.querySelector("#main");
  main.innerHTML = "";

  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  if (cart.length === 0) {
    showMessage("Your cart is empty");
    const back_button = document.createElement("button");
    back_button.textContent = "Back to products";
    back_button.addEventListener("click", () => loadProducts());
    main.append(back_button);
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-row";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const price = document.createElement("p");
    price.textContent = item.price.toFixed(2);

    const quantity = document.createElement("p");
    quantity.textContent = item.quantity;

    const minus_button = document.createElement("button");
    minus_button.textContent = "−";
    minus_button.addEventListener("click", () => changeQuantity(item.id, -1));

    const plus_button = document.createElement("button");
    plus_button.textContent = "+";
    plus_button.addEventListener("click", () => changeQuantity(item.id, 1));

    const remove_button = document.createElement("button");
    remove_button.textContent = "Remove";
    remove_button.addEventListener("click", () => removeFromCart(item.id));

    row.append(
      title,
      price,
      quantity,
      minus_button,
      plus_button,
      remove_button,
    );
    main.append(row);
  });

  const back_button = document.createElement("button");
  back_button.textContent = "Back to products";
  back_button.addEventListener("click", () => loadProducts());
  main.append(back_button);
}
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  cart = cart.filter((item) => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
  renderCart();
}

function changeQuantity(id, delta) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  const item = cart.find((entry) => entry.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter((entry) => entry.id !== id);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
  renderCart();
}

function renderProducts(products) {
  const container = document.querySelector("#main");
  container.innerHTML = "";
  products.forEach((product) => {
    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;

    const title = document.createElement("h2");
    title.textContent = product.title;

    const description = document.createElement("p");
    description.textContent = product.description;

    const stock = document.createElement("p");
    stock.textContent = product.availabilityStatus;

    const discount = document.createElement("p");
    discount.textContent =
      "-" + Math.round(Number(product.discountPercentage)) + "%";

    const price = document.createElement("p");
    price.textContent = product.price.toFixed(2);

    const rating = document.createElement("p");
    rating.textContent = product.rating;

    const cart_button = document.createElement("button");
    cart_button.textContent = "Add to cart";
    cart_button.addEventListener("click", (event) => {
      event.stopPropagation();
      addToCart(product);
    });

    const card_div = document.createElement("div");
    card_div.className = "card";
    card_div.addEventListener("click", () => loadProduct(product.id));
    card_div.append(
      img,
      title,
      rating,
      description,
      discount,
      stock,
      price,
      cart_button,
    );
    container.append(card_div);
  });
}

async function loadSort() {
  const sort_select = document.querySelector("#sort-select").value;
  if (sort_select === "") {
    loadProducts();
    return;
  }
  const parts = sort_select.split("-");
  const sortBy = parts[0];
  const order = parts[1];
  showMessage("loading...");
  try {
    const data = await getProducts(sortBy, order);
    if (data.products.length === 0) {
      showMessage("No products found");
    } else {
      renderProducts(data.products);
    }
  } catch {
    showMessage("Something went wrong. Try again");
    const button = document.createElement("button");
    button.addEventListener("click", () => loadSort());
    button.textContent = "Try again";

    document.querySelector("#main").append(button);
  }
}

async function loadCategories() {
  try {
    const categories = await getCategories();
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.slug;
      option.textContent = category.name;
      document.querySelector("#category-select").append(option);
    });
  } catch {
    showMessage("something went wrong");
    const try_button = document.createElement("button");
    try_button.textContent = "try again";
    try_button.addEventListener("click", () => loadCategory());
    main.append(try_button);
  }
}

async function loadCategory() {
  const slug = document.querySelector("#category-select").value;
  if (slug === "all") {
    loadProducts();
    return;
  }
  try {
    showMessage("Loading...");
    const data = await getProductsByCategory(slug);
    if (data.products.length === 0) {
      showMessage("No products found");
    } else {
      renderProducts(data.products);
    }
  } catch {
    const main = document.querySelector("#main");
    showMessage("Something went wrong. Try again");

    const try_button = document.createElement("button");
    try_button.textContent = "Try again";
    try_button.addEventListener("click", () => loadCategory());
    main.append(try_button);
  }
}

async function loadSearch() {
  const query = document.querySelector("#search-input").value;
  if (query === "") {
    loadProducts();
    return;
  }
  try {
    showMessage("Loading...");
    const data = await searchProducts(query);
    if (data.products.length === 0) {
      showMessage("No products found");
    } else {
      renderProducts(data.products);
    }
  } catch {
    const main = document.querySelector("#main");
    showMessage("Something went wrong. Try again");

    const try_button = document.createElement("button");
    try_button.textContent = "Try again";
    try_button.addEventListener("click", () => loadSearch());
    main.append(try_button);
  }
}

function showMessage(text) {
  const message_h3 = document.createElement("h3");
  message_h3.className = "message_h3";
  message_h3.textContent = text;
  const main = document.querySelector("#main");
  main.innerHTML = "";
  main.append(message_h3);
}

async function loadProduct(id) {
  showMessage("Loading...");
  const main = document.querySelector("#main");
  try {
    const data = await getProductById(id);
    renderProduct(data);
  } catch (error) {
    showMessage("Something went wrong. Try again");
    const button_refresh = document.createElement("button");
    button_refresh.className = "button_refresh";
    button_refresh.addEventListener("click", () => loadProducts());
    button_refresh.textContent = "Try again";
    main.append(button_refresh);
  }
}

async function loadProducts() {
  showMessage("Loading...");
  const main = document.querySelector("#main");
  const skip = (currentPage - 1) * 12;
  try {
    const data = await getProducts(undefined, undefined, skip);
    let pages = Math.ceil(data.total / 12);
    let page_info = document.querySelector("#page-info");
    if (currentPage === pages) {
      document.querySelector("#next-button").disabled = true;
    } else {
      document.querySelector("#next-button").disabled = false;
    }
    if (currentPage === 1) {
      document.querySelector("#prev-button").disabled = true;
    } else {
      document.querySelector("#prev-button").disabled = false;
    }
    page_info.textContent = `Page ${currentPage} of ${pages}`;
    if (data.products.length === 0) {
      showMessage("No products found");
    } else {
      renderProducts(data.products);
    }
  } catch (error) {
    showMessage("Something went wrong. Try again");
    const button_refresh = document.createElement("button");
    button_refresh.className = "button_refresh";
    button_refresh.addEventListener("click", () => loadProducts());
    button_refresh.textContent = "Try again";
    main.append(button_refresh);
  }
}
function renderProduct(product) {
  const main = document.querySelector("#main");
  main.innerHTML = "";
  const img = document.createElement("img");
  img.src = product.images[0];
  img.alt = product.title;
  const galleryDiv = document.createElement("div");
  galleryDiv.className = "gallery";

  product.images.forEach((picture) => {
    const smallImg = document.createElement("img");
    smallImg.src = picture;
    smallImg.addEventListener("click", () => {
      img.src = picture;
    });
    galleryDiv.append(smallImg);
  });

  const title = document.createElement("h2");
  title.textContent = product.title;

  const description = document.createElement("p");
  description.textContent = product.description;

  const brand = document.createElement("p");
  if (product.brand) {
    brand.textContent = product.brand;
  }

  const stock = document.createElement("p");
  stock.textContent = product.availabilityStatus;

  const shiping = document.createElement("p");
  shiping.textContent = product.shippingInformation;

  const price = document.createElement("p");
  price.textContent = product.price.toFixed(2);

  const reviews = document.createElement("div");

  product.reviews.forEach((review) => {
    const rating = document.createElement("p");
    rating.textContent = review.rating;

    const comment = document.createElement("p");
    comment.textContent = review.comment;

    const reviewerName = document.createElement("p");
    reviewerName.textContent = review.reviewerName;

    const date = document.createElement("p");
    date.textContent = review.date;

    reviews.append(rating, comment, reviewerName, date);
  });

  const button_exit = document.createElement("button");
  button_exit.addEventListener("click", () => loadProducts());
  button_exit.textContent = "back";

  const page_div = document.createElement("div");

  page_div.className = "page_div";
  page_div.append(
    img,
    title,
    description,
    brand,
    shiping,
    stock,
    price,
    reviews,
    galleryDiv,
    button_exit,
  );
  main.append(page_div);
}

loadProducts();
document.querySelector("#search-button").addEventListener("click", loadSearch);

loadCategories();
document
  .querySelector("#category-select")
  .addEventListener("change", loadCategory);
document.querySelector("#sort-select").addEventListener("change", loadSort);

document.querySelector("#prev-button").addEventListener("click", () => {
  currentPage--;
  loadProducts();
});
document.querySelector("#next-button").addEventListener("click", () => {
  currentPage++;
  loadProducts();
});

document.querySelector("#cart-button").addEventListener("click", renderCart);

updateCartCounter();
document
  .querySelector("#checkout-form")
  .addEventListener("submit", loadCheckout);
