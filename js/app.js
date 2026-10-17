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

    const card_div = document.createElement("div");
    card_div.className = "card";
    card_div.addEventListener("click", () => loadProduct(product.id));
    card_div.append(img, title, rating, description, discount, stock, price);
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
  } catch {}
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
  try {
    const data = await getProducts();
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
