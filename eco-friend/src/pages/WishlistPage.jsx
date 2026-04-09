import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

function WishlistPage() {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  function handleMoveToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
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
          image: product.image || "",
        },
      ]);
    }

    removeFromWishlist(product.id);
  }

  return (
    <AppLayout>
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>Products you saved for later.</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty-state">
            <p>Your wishlist is empty.</p>
            <button
              type="button"
              className="wishlist-shop-btn"
              onClick={() => navigate("/shop")}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div className="wishlist-card" key={item.id}>
                <div className="wishlist-card-image-wrap">
                    <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="wishlist-card-image"
                    />
                </div>

                <div className="wishlist-card-body">
                  <p className="wishlist-card-category">{item.category}</p>
                  <h2 className="wishlist-card-title">{item.name}</h2>
                  <p className="wishlist-card-price">
                    ₦{item.price.toLocaleString()}
                  </p>
                  <p className="wishlist-card-description">
                    {item.description}
                  </p>

                  <div className="wishlist-card-actions">
                    <button
                      type="button"
                      className="wishlist-move-btn"
                      onClick={() => handleMoveToCart(item)}
                    >
                      Move to Cart
                    </button>

                    <button
                      type="button"
                      className="wishlist-remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default WishlistPage;