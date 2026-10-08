async function loadProducts() {
  try {
    const data = await getProducts();
    renderProducts(data.products);
  } catch (error) {
    showMessage("Something went wrong. Try again");
  }
}

function renderProducts(products) {
  const container = document.querySelector("#main");
  container.innerHTML = "";
  products.forEach((product) => {
    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;
    const title = product.title;
    const price = product.price.toFixed(2);
    const rating = product.rating;
    const stock = product.availabilityStatus;
    const description = product.description;
    const card_div = document.createElement("div");
    card_div.className = "card";
    card_div.append(img, title, description, price, rating, stock);
    container.append(card_div);
  });
}

loadProducts();
