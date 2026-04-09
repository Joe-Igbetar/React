import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { getStoredProducts } from "../utils/productStorage";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { getPrimaryImage } from "../utils/productHelpers";
import ProductGrid from "../components/shop/ProductGrid";
import {
  addRecentlyViewedProduct,
  getRecentlyViewedProducts,
  clearRecentlyViewedProducts,
} from "../utils/recentlyViewed";

function renderStars(rating = 0) {
  const fullStars = Math.round(rating);
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
}

function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist} = useContext(WishlistContext);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const storedProducts = getStoredProducts();
  const product = storedProducts.find((item) => item.id === Number(id));
  const productImages = product?.images || [];
  const primaryImage = product ? getPrimaryImage(product) : "";
  const inWishlist = product ? isInWishlist(product.id) : false;
  const reviews = product?.reviews || [];
  const isOutOfStock = typeof product?.stock === "number" && product.stock === 0;
  const isLowStock =
    typeof product?.stock === "number" && product.stock > 0 && product.stock <= 5;
  const primaryImageIndex = productImages.findIndex((image) => image.isPrimary);
  const defaultImageIndex = primaryImageIndex >= 0 ? primaryImageIndex : 0;

  const [selectedImageIndex, setSelectedImageIndex] = useState(defaultImageIndex);

  useEffect(() => {
    setSelectedImageIndex(defaultImageIndex);
  }, [defaultImageIndex, id]);

  useEffect(() => {
    if (!product) return;

    const recentlyViewedProduct = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      rating: product.rating,
      reviewCount: product.reviewCount,
      images: product.images,
    };

    addRecentlyViewedProduct(recentlyViewedProduct);

    const recentProducts = getRecentlyViewedProducts().filter(
      (item) => item.id !== product.id
    );

    setRecentlyViewed(recentProducts);
  }, [product?.id]);

  const activeImage =
    productImages[selectedImageIndex]?.url ||
    (product ? getPrimaryImage(product) : "") ||
    "";

  function handleAddToCart() {
    if (isOutOfStock) return;
    
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              image: item.image || primaryImage,
            }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          quantity: 1,
          image: primaryImage,
        },
      ]);
    }

    console.log("Added to cart:", product);
  }

  if (!product) {
    return (
      <AppLayout>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </AppLayout>
    );
  }
  
  const hasDiscount =
    product?.isOnSale &&
    typeof product?.originalPrice === "number" &&
    product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const relatedProducts = storedProducts
    .filter(
      (item) => item.id !== product?.id && item.category === product?.category
    )
    .slice(0, 4);

  function handleWishlistToggle() {
    const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));

    if (!currentUser) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    const wishlistProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || "",
      image: primaryImage,
    };

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistProduct);
    }
  }

  function handleClearRecentlyViewed() {
    clearRecentlyViewedProducts();
    setRecentlyViewed([]);
  }

  return (
    <AppLayout>
      <div className="product-details">
        <div className="product-details-image product-gallery-card">
          <img src={activeImage} alt={product.name} className="product-main-image" />

          {productImages.length > 1 && (
            <div className="product-image-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`product-thumb-btn ${
                    selectedImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="product-thumb-image"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-details-info">
          <h1>{product.name}</h1>

          <div className="product-detail-badges">
            {product.isFeatured && (
              <span className="product-badge featured">Featured</span>
            )}
            {product.isOnSale && (
              <span className="product-badge sale">Sale</span>
            )}
            {product.isNew && (
              <span className="product-badge new">New</span>
            )}
            {isOutOfStock ? (
              <span className="product-badge out">Out of Stock</span>
            ) : (
              isLowStock && <span className="product-badge stock">Low Stock</span>
            )}
          </div>

          <p className="product-category">{product.category}</p>

          <div className="product-rating-row">
            <span className="product-stars large">{renderStars(product.rating)}</span>
            <span className="product-rating-text">
              {product.rating?.toFixed(1)} rating • {product.reviewCount || 0} reviews
            </span>
          </div>

          <div className="product-price-wrap">
            <p className="product-price">₦{product.price.toLocaleString()}</p>

            {hasDiscount && (
              <div className="product-price-meta">
                <p className="product-original-price">
                  ₦{product.originalPrice.toLocaleString()}
                </p>
                <span className="product-discount-badge">Save {discountPercent}%</span>
              </div>
            )}
          </div>

          <p
            className={`product-stock-text large ${
              isOutOfStock ? "out" : isLowStock ? "low" : "in"
            }`}
          >
            {isOutOfStock
              ? "Out of stock"
              : isLowStock
              ? `Only ${product.stock} left in stock`
              : "In stock"}
          </p>

          <p className="product-description">{product.description}</p>

          <div className="product-detail-actions">
            <button
              className="product-btn"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              type="button"
              className={`product-wishlist-btn ${inWishlist ? "active" : ""}`}
              onClick={handleWishlistToggle}
            >
              {inWishlist ? "Saved" : "Save to Wishlist"}
            </button>
          </div>
        </div>
      </div>
      <section className="product-reviews-section">
        <div className="product-reviews-header">
          <h2>Customer Reviews</h2>
          <p>
            {product.reviewCount || reviews.length} review
            {(product.reviewCount || reviews.length) !== 1 ? "s" : ""}
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="product-review-empty">
            <p>No reviews yet for this product.</p>
          </div>
        ) : (
          <div className="product-reviews-list">
            {reviews.map((review) => (
              <article className="product-review-card" key={review.id}>
                <div className="product-review-top">
                  <div>
                    <h3>{review.name}</h3>
                    <p className="product-review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="product-stars">
                    {renderStars(review.rating)}
                  </span>
                </div>

                <p className="product-review-comment">{review.comment}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="related-products-section">
        <div className="related-products-header">
          <h2>Related Products</h2>
          <p>Explore similar products you may also like.</p>
        </div>

        {relatedProducts.length > 0 ? (
          <ProductGrid products={relatedProducts} />
        ) : (
          <div className="related-products-empty">
            <p>No related products available right now.</p>
          </div>
        )}
      </section>

      <section className="recently-viewed-section">
        <div className="recently-viewed-header">
          <div>
            <h2>Recently Viewed</h2>
            <p>Products you looked at recently.</p>
          </div>

          {recentlyViewed.length > 0 && (
            <button
              type="button"
              className="clear-recently-viewed-btn"
              onClick={handleClearRecentlyViewed}
            >
              Clear Recently Viewed
            </button>
          )}
        </div>
        {recentlyViewed.length > 0 ? (
          <ProductGrid products={recentlyViewed} />
        ) : (
          <div className="recently-viewed-empty">
            <p>No recently viewed products yet.</p>
          </div>
        )}
      </section>
    </AppLayout>
  );
}

export default ProductPage;