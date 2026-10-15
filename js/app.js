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

    const price = document.createElement("p");
    price.textContent = product.price.toFixed(2);

    const card_div = document.createElement("div");
    card_div.className = "card";
    card_div.addEventListener("click", () => loadProduct(product.id));
    card_div.append(img, title, description, stock, price);
    container.append(card_div);
  });
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
    if (data.products.length === 0) {
      showMessage("No products found");
    } else {
      renderProducts(data);
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

loadProducts();
