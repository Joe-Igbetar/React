import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { getPrimaryImage } from "../../utils/productHelpers";
import { WishlistContext } from "../../context/WishlistContext";

function renderStars(rating = 0) {
  const fullStars = Math.round(rating);
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
}

function ProductCard({ product }) {
  const navigate = useNavigate();
  const location = useLocation();
  const primaryImage = getPrimaryImage(product);
  const isLowStock = typeof product.stock === "number" && product.stock <= 5;
  const isOutOfStock = typeof product.stock === "number" && product.stock === 0;

  const hasDiscount =
    product.isOnSale &&
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);

  const inWishlist = isInWishlist(product.id);

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

  function handleImageError(event) {
    event.target.src = "/placeholder.png";
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-image-wrap">
        <div className="product-card-badges">
          {product.isFeatured && <span className="product-badge featured">Featured</span>}
          {product.isOnSale && <span className="product-badge sale">Sale</span>}
          {product.isNew && <span className="product-badge new">New</span>}
          {isOutOfStock ? (
            <span className="product-badge out">Out of Stock</span>
          ) : (
            isLowStock && <span className="product-badge stock">Low Stock</span>
          )}
        </div>

        <img
          src={primaryImage || "/placeholder.jpg"}
          alt={product.name}
          className="product-card-image"
          onError={handleImageError}
        />
      </Link>

      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>

        <div className="product-card-rating">
          <span className="product-stars">{renderStars(product.rating)}</span>
          <span className="product-rating-text">
            {product.rating?.toFixed(1)} ({product.reviewCount || 0})
          </span>
        </div>

        <h2 className="product-card-title">{product.name}</h2>

        <div className="product-card-price-wrap">
          <p className="product-card-price">₦{product.price.toLocaleString()}</p>

          {hasDiscount && (
            <>
              <p className="product-card-original-price">
                ₦{product.originalPrice.toLocaleString()}
              </p>
              <span className="product-card-discount">-{discountPercent}%</span>
            </>
          )}
        </div>

        <p
          className={`product-stock-text ${
            isOutOfStock ? "out" : isLowStock ? "low" : "in"
          }`}
        >
          {isOutOfStock
            ? "Out of stock"
            : isLowStock
            ? `Only ${product.stock} left`
            : "In stock"}
        </p>

        <p className="product-card-description">{product.description}</p>

        <div className="product-card-actions">
          <Link to={`/product/${product.id}`} className="product-btn">
            View Details
          </Link>

          <button
            type="button"
            className={`wishlist-btn ${inWishlist ? "active" : ""}`}
            onClick={handleWishlistToggle}
          >
            {inWishlist ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;