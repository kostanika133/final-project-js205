async function getProducts(sortBy, order, skip) {
  let url = "https://dummyjson.com/products?limit=12";
  if (sortBy) {
    url += "&sortBy=" + sortBy;
  }
  if (order) {
    url += "&order=" + order;
  }
  if (skip) {
    url += "&skip=" + skip;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Products could not be loaded");
  }
  return await response.json();
}

async function addUser(user) {
  const response = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Could not submit order");
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
