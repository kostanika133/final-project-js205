async function getProducts(sortBy, order) {
  let url = "https://dummyjson.com/products?limit=12&skip=0";
  if (sortBy) {
    url += "&sortBy=" + sortBy;
  }
  if (order) {
    url += "&order=" + order;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Products could not be loaded");
  }
  return await response.json();
}

async function getProductById(id) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Product could not be loaded");
  }
  return await response.json();
}

async function searchProducts(query) {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}`,
  );
  if (!response.ok) {
    throw new Error("could not be loaded");
  }
  const data = await response.json();
  return data;
}

async function getCategories() {
  const response = await fetch("https://dummyjson.com/products/categories");
  if (!response.ok) {
    throw new Error("could not load");
  }
  const data = await response.json();
  return data;
}

async function getProductsByCategory(slug) {
  const response = await fetch(
    `https://dummyjson.com/products/category/${slug}`,
  );
  if (!response.ok) {
    throw new Error("could not load");
  }
  const data = await response.json();
  return data;
}
