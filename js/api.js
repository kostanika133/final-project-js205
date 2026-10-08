async function getProducts() {
  const response = await fetch(
    "https://dummyjson.com/products?limit=12&skip=0",
  );
  if (!response.ok) {
    throw new Error("Products could not be loaded");
  }
  return await response.json();
}
