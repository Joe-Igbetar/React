import defaultProducts from "../data/products";

const PRODUCTS_KEY = "eco_products";

function normalizeProducts(products) {
  return Array.isArray(products) ? products : [];
}

export function getStoredProducts() {
  try {
    const savedProducts = localStorage.getItem(PRODUCTS_KEY);

    if (savedProducts) {
      return normalizeProducts(JSON.parse(savedProducts));
    }

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return normalizeProducts(defaultProducts);
  } catch (error) {
    console.error("Failed to read stored products:", error);
    return normalizeProducts(defaultProducts);
  }
}

export function saveStoredProducts(products) {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(normalizeProducts(products)));
  } catch (error) {
    console.error("Failed to save products:", error);
  }
}

export function getNextProductId(products = []) {
  if (products.length === 0) return 1;

  const numericIds = products
    .map((product) => Number(product.id))
    .filter((id) => Number.isFinite(id));

  if (numericIds.length === 0) return Date.now();

  return Math.max(...numericIds) + 1;
}

export function createProduct(productData) {
  const products = getStoredProducts();
  const newProduct = {
    id: getNextProductId(products),
    name: productData.name || "",
    category: productData.category || "",
    description: productData.description || "",
    price: Number(productData.price) || 0,
    originalPrice: Number(productData.originalPrice) || 0,
    stock: Number(productData.stock) || 0,
    isFeatured: Boolean(productData.isFeatured),
    isNew: Boolean(productData.isNew),
    isOnSale: Boolean(productData.isOnSale),
    rating: Number(productData.rating) || 0,
    reviewCount: Number(productData.reviewCount) || 0,
    reviews: Array.isArray(productData.reviews) ? productData.reviews : [],
    images: Array.isArray(productData.images)
      ? productData.images.map((image, index) => ({
          id: image.id || `img_${Date.now()}_${index}`,
          url: image.url || "",
          isPrimary: Boolean(image.isPrimary),
        }))
      : [],
  };

  const hasPrimaryImage = newProduct.images.some((image) => image.isPrimary);

  if (!hasPrimaryImage && newProduct.images.length > 0) {
    newProduct.images[0].isPrimary = true;
  }

  const updatedProducts = [newProduct, ...products];
  saveStoredProducts(updatedProducts);

  return newProduct;
}

export function updateProduct(productId, updates) {
  const products = getStoredProducts();

  const updatedProducts = products.map((product) => {
    if (product.id !== productId) return product;

    const updatedProduct = {
      ...product,
      ...updates,
    };

    if (updates.price !== undefined) {
      updatedProduct.price = Number(updates.price) || 0;
    }

    if (updates.originalPrice !== undefined) {
      updatedProduct.originalPrice = Number(updates.originalPrice) || 0;
    }

    if (updates.stock !== undefined) {
      updatedProduct.stock = Number(updates.stock) || 0;
    }

    if (updates.rating !== undefined) {
      updatedProduct.rating = Number(updates.rating) || 0;
    }

    if (updates.reviewCount !== undefined) {
      updatedProduct.reviewCount = Number(updates.reviewCount) || 0;
    }

    if (updates.images !== undefined) {
      updatedProduct.images = Array.isArray(updates.images)
        ? updates.images.map((image, index) => ({
            id: image.id || `img_${Date.now()}_${index}`,
            url: image.url || "",
            isPrimary: Boolean(image.isPrimary),
          }))
        : [];
    }

    const hasPrimaryImage = Array.isArray(updatedProduct.images)
      ? updatedProduct.images.some((image) => image.isPrimary)
      : false;

    if (!hasPrimaryImage && updatedProduct.images?.length > 0) {
      updatedProduct.images[0].isPrimary = true;
    }

    return updatedProduct;
  });

  saveStoredProducts(updatedProducts);
  return updatedProducts.find((product) => product.id === productId) || null;
}

export function deleteProduct(productId) {
  const products = getStoredProducts();
  const updatedProducts = products.filter((product) => product.id !== productId);
  saveStoredProducts(updatedProducts);
  return updatedProducts;
}

export function setPrimaryProductImage(productId, imageId) {
  const products = getStoredProducts();

  const updatedProducts = products.map((product) => {
    if (product.id !== productId) return product;

    return {
      ...product,
      images: (product.images || []).map((image) => ({
        ...image,
        isPrimary: image.id === imageId,
      })),
    };
  });

  saveStoredProducts(updatedProducts);
  return updatedProducts.find((product) => product.id === productId) || null;
}

export function addProductImages(productId, newImages) {
  const products = getStoredProducts();

  const updatedProducts = products.map((product) => {
    if (product.id !== productId) return product;

    const existingImages = Array.isArray(product.images) ? product.images : [];

    const mappedImages = (newImages || []).map((image, index) => ({
      id: image.id || `img_${Date.now()}_${index}`,
      url: image.url || "",
      isPrimary: false,
    }));

    const combinedImages = [...existingImages, ...mappedImages];

    if (!combinedImages.some((image) => image.isPrimary) && combinedImages.length > 0) {
      combinedImages[0].isPrimary = true;
    }

    return {
      ...product,
      images: combinedImages,
    };
  });

  saveStoredProducts(updatedProducts);
  return updatedProducts.find((product) => product.id === productId) || null;
}

export function deleteProductImage(productId, imageId) {
  const products = getStoredProducts();

  const updatedProducts = products.map((product) => {
    if (product.id !== productId) return product;

    const remainingImages = (product.images || []).filter(
      (image) => image.id !== imageId
    );

    if (!remainingImages.some((image) => image.isPrimary) && remainingImages.length > 0) {
      remainingImages[0].isPrimary = true;
    }

    return {
      ...product,
      images: remainingImages,
    };
  });

  saveStoredProducts(updatedProducts);
  return updatedProducts.find((product) => product.id === productId) || null;
}

export function reduceProductStock(orderItems) {
  const products = getStoredProducts();

  const updatedProducts = products.map((product) => {
    const orderedItem = orderItems.find((item) => item.id === product.id);

    if (!orderedItem) return product;

    const currentStock =
      typeof product.stock === "number" ? product.stock : Infinity;

    if (currentStock === Infinity) return product;

    return {
      ...product,
      stock: Math.max(0, currentStock - orderedItem.quantity),
    };
  });

  saveStoredProducts(updatedProducts);
  return updatedProducts;
}