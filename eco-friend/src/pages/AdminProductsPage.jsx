import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import {
  createProduct,
  deleteProduct,
  getStoredProducts,
  setPrimaryProductImage,
  updateProduct,
} from "../utils/productStorage";

const categoryOptions = [
  "Solar Panels",
  "Power Stations",
  "Inverters",
  "Rechargeables",
];

const initialFormState = {
  name: "",
  category: "Solar Panels",
  description: "",
  price: "",
  originalPrice: "",
  stock: "",
  isFeatured: false,
  isNew: false,
  isOnSale: false,
  rating: "",
  reviewCount: "",
  images: [],
};

function AdminProductsPage() {
  const [products, setProducts] = useState(getStoredProducts());
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [form, setForm] = useState(initialFormState);
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  function refreshProducts() {
    setProducts(getStoredProducts());
  }

  function resetForm() {
    setForm(initialFormState);
    setFormError("");
    setFormMessage("");
    setIsCreating(false);
    setEditingProductId(null);
  }

  function handleStartCreate() {
    setForm(initialFormState);
    setFormError("");
    setFormMessage("");
    setEditingProductId(null);
    setIsCreating(true);
  }

  function handleStartEdit(product) {
    setForm({
      name: product.name || "",
      category: product.category || "Solar Panels",
      description: product.description || "",
      price: product.price ?? "",
      originalPrice: product.originalPrice ?? "",
      stock: product.stock ?? "",
      isFeatured: Boolean(product.isFeatured),
      isNew: Boolean(product.isNew),
      isOnSale: Boolean(product.isOnSale),
      rating: product.rating ?? "",
      reviewCount: product.reviewCount ?? "",
      images: Array.isArray(product.images) ? product.images : [],
    });

    setFormError("");
    setFormMessage("");
    setIsCreating(false);
    setEditingProductId(product.id);
  }

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleImagesChange(event) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    try {
      const newImages = await Promise.all(
        files.map(async (file, index) => ({
          id: `img_${Date.now()}_${index}`,
          url: await fileToBase64(file),
          isPrimary: false,
        }))
      );

      setForm((prev) => {
        const combinedImages = [...prev.images, ...newImages];

        if (!combinedImages.some((image) => image.isPrimary) && combinedImages.length > 0) {
          combinedImages[0].isPrimary = true;
        }

        return {
          ...prev,
          images: combinedImages,
        };
      });
    } catch (error) {
      console.error("Failed to load images:", error);
      setFormError("Failed to load one or more selected images.");
    }

    event.target.value = "";
  }

  function handleSetPrimaryImage(imageId) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((image) => ({
        ...image,
        isPrimary: image.id === imageId,
      })),
    }));
  }

  function handleRemoveImage(imageId) {
    setForm((prev) => {
      const remainingImages = prev.images.filter((image) => image.id !== imageId);

      if (!remainingImages.some((image) => image.isPrimary) && remainingImages.length > 0) {
        remainingImages[0].isPrimary = true;
      }

      return {
        ...prev,
        images: remainingImages,
      };
    });
  }

  function validateForm() {
    if (!form.name.trim()) return "Product name is required.";
    if (!form.category.trim()) return "Category is required.";
    if (!form.description.trim()) return "Description is required.";
    if (Number(form.price) <= 0) return "Price must be greater than 0.";
    if (Number(form.stock) < 0) return "Stock cannot be negative.";
    if (form.images.length === 0) return "Please upload at least one product image.";
    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      setFormMessage("");
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice === "" ? 0 : Number(form.originalPrice),
      stock: Number(form.stock),
      isFeatured: form.isFeatured,
      isNew: form.isNew,
      isOnSale: form.isOnSale,
      rating: form.rating === "" ? 0 : Number(form.rating),
      reviewCount: form.reviewCount === "" ? 0 : Number(form.reviewCount),
      images: form.images,
      reviews: [],
    };

    if (editingProductId !== null) {
      updateProduct(editingProductId, payload);

      const primaryImage = payload.images.find((image) => image.isPrimary);
      if (primaryImage) {
        setPrimaryProductImage(editingProductId, primaryImage.id);
      }

      setFormMessage("Product updated successfully.");
    } else {
      createProduct(payload);
      setFormMessage("Product created successfully.");
    }

    refreshProducts();
    resetForm();
  }

  function handleDeleteProduct(productId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    deleteProduct(productId);
    refreshProducts();

    if (editingProductId === productId) {
      resetForm();
    }
  }

  function getPrimaryImage(product) {
    const images = Array.isArray(product.images) ? product.images : [];
    return images.find((image) => image.isPrimary)?.url || images[0]?.url || "/placeholder.png";
  }

  function getStockClass(stock) {
    if (stock === 0) return "out";
    if (stock <= 5) return "low";
    return "in";
  }

  return (
    <AppLayout>
      <div className="admin-products-page">
        <div className="admin-products-header">
          <div>
            <h1>Admin Product Manager</h1>
            <p>Create, edit, and manage store products from one place.</p>
          </div>

          <button
            type="button"
            className="admin-create-product-btn"
            onClick={handleStartCreate}
          >
            Add New Product
          </button>
        </div>

        <div className="admin-products-controls">
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search by name, category, or description"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            className="admin-filter-select"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {(isCreating || editingProductId !== null) && (
          <section className="admin-product-form-card">
            <div className="admin-product-form-header">
              <h2>{editingProductId !== null ? "Edit Product" : "Create Product"}</h2>

              <button
                type="button"
                className="admin-cancel-product-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>

            {formError && <p className="account-password-error">{formError}</p>}
            {formMessage && <p className="account-password-success">{formMessage}</p>}

            <form className="admin-product-form" onSubmit={handleSubmit}>
              <div className="admin-product-form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (₦)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                  />
                </div>

                <div className="form-group">
                  <label>Original Price (₦)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={form.originalPrice}
                    onChange={handleInputChange}
                    placeholder="Optional original price"
                  />
                </div>

                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleInputChange}
                    placeholder="Enter stock quantity"
                  />
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={form.rating}
                    onChange={handleInputChange}
                    placeholder="Optional rating"
                  />
                </div>

                <div className="form-group">
                  <label>Review Count</label>
                  <input
                    type="number"
                    name="reviewCount"
                    value={form.reviewCount}
                    onChange={handleInputChange}
                    placeholder="Optional review count"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows="5"
                  />
                </div>
              </div>

              <div className="admin-product-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleInputChange}
                  />
                  Featured
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={form.isNew}
                    onChange={handleInputChange}
                  />
                  New
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="isOnSale"
                    checked={form.isOnSale}
                    onChange={handleInputChange}
                  />
                  On Sale
                </label>
              </div>

              <div className="admin-product-images-section">
                <div className="admin-product-images-top">
                  <h3>Product Images</h3>
                  <label className="admin-image-upload-btn">
                    Upload Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesChange}
                      hidden
                    />
                  </label>
                </div>

                {form.images.length === 0 ? (
                  <p className="admin-product-images-empty">
                    No images uploaded yet.
                  </p>
                ) : (
                  <div className="admin-product-images-grid">
                    {form.images.map((image) => (
                      <div className="admin-product-image-card" key={image.id}>
                        <img
                          src={image.url}
                          alt="Product preview"
                          className="admin-product-image-preview"
                        />

                        <div className="admin-product-image-actions">
                          <button
                            type="button"
                            className={`admin-image-action-btn ${
                              image.isPrimary ? "primary" : ""
                            }`}
                            onClick={() => handleSetPrimaryImage(image.id)}
                          >
                            {image.isPrimary ? "Primary Image" : "Set as Primary"}
                          </button>

                          <button
                            type="button"
                            className="admin-image-action-btn delete"
                            onClick={() => handleRemoveImage(image.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="admin-product-form-actions">
                <button type="submit" className="admin-save-product-btn">
                  {editingProductId !== null ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </section>
        )}

        <div className="admin-products-list">
          {filteredProducts.length === 0 ? (
            <div className="admin-orders-empty">
              <p>No products found.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <article className="admin-product-card" key={product.id}>
                <div className="admin-product-card-image-wrap">
                  <img
                    src={getPrimaryImage(product)}
                    alt={product.name}
                    className="admin-product-card-image"
                  />
                </div>

                <div className="admin-product-card-body">
                  <div className="admin-product-card-top">
                    <div>
                      <p className="admin-product-card-category">{product.category}</p>
                      <h2>{product.name}</h2>
                    </div>

                    <p
                      className={`product-stock-text ${getStockClass(
                        Number(product.stock || 0)
                      )}`}
                    >
                      {Number(product.stock || 0) === 0
                        ? "Out of stock"
                        : Number(product.stock || 0) <= 5
                        ? `Low stock: ${Number(product.stock || 0)}`
                        : `In stock: ${Number(product.stock || 0)}`}
                    </p>
                  </div>

                  <p className="admin-product-card-description">
                    {product.description}
                  </p>

                  <div className="admin-product-card-meta">
                    <p>
                      <strong>Price:</strong> ₦{Number(product.price || 0).toLocaleString()}
                    </p>
                    <p>
                      <strong>Original:</strong> ₦
                      {Number(product.originalPrice || 0).toLocaleString()}
                    </p>
                    <p>
                      <strong>Rating:</strong> {Number(product.rating || 0).toFixed(1)}
                    </p>
                    <p>
                      <strong>Reviews:</strong> {Number(product.reviewCount || 0)}
                    </p>
                  </div>

                  <div className="admin-product-card-badges">
                    {product.isFeatured && <span className="product-badge featured">Featured</span>}
                    {product.isNew && <span className="product-badge new">New</span>}
                    {product.isOnSale && <span className="product-badge sale">Sale</span>}
                  </div>

                  <div className="admin-product-card-actions">
                    <button
                      type="button"
                      className="admin-bulk-btn"
                      onClick={() => handleStartEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-bulk-btn delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>

                    <Link
                      to={`/product/${product.id}`}
                      className="admin-order-details-link"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default AdminProductsPage;