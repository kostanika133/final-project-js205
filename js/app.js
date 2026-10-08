async function loadProducts() {
  try {
    const data = await getProducts();
    renderProducts(data.products);
  } catch (error) {
    showMessage("Something went wrong. Try again");
  }
}
