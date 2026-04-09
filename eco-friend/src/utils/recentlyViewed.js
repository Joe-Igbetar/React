const RECENTLY_VIEWED_KEY = "ecoRecentlyViewed";

export function getRecentlyViewedProducts() {
  try {
    const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to read recently viewed products:", error);
    return [];
  }
}

export function addRecentlyViewedProduct(product) {
  try {
    const existingProducts = getRecentlyViewedProducts();

    const updatedProducts = [
      product,
      ...existingProducts.filter((item) => item.id !== product.id),
    ].slice(0, 6);

    localStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify(updatedProducts)
    );
  } catch (error) {
    console.error("Failed to save recently viewed product:", error);
  }
}

export function clearRecentlyViewedProducts() {
  try {
    localStorage.removeItem("ecoRecentlyViewed");
  } catch (error) {
    console.error("Failed to clear recently viewed products:", error);
  }
}