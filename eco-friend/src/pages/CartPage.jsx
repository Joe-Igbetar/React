import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { CartContext } from "../context/CartContext";
import { getStoredProducts } from "../utils/productStorage";

function CartPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const storedProducts = getStoredProducts();

  function handleIncreaseQuantity(indexToUpdate) {
    const updatedCart = cartItems.map((item, index) => {
      if (index !== indexToUpdate) return item;

      const product = storedProducts.find((productItem) => productItem.id === item.id);
      const availableStock =
        typeof product?.stock === "number" ? product.stock : Infinity;

      if (item.quantity >= availableStock) {
        return item;
      }

      return { ...item, quantity: item.quantity + 1 };
    });

    setCartItems(updatedCart);
  }

  function handleDecreaseQuantity(indexToUpdate) {
    const updatedCart = cartItems
      .map((item, index) =>
        index === indexToUpdate
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
  }

  function handleRemoveItem(indexToRemove) {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const hasInvalidStockItem = cartItems.some((item) => {
    const product = storedProducts.find((productItem) => productItem.id === item.id);
    const availableStock =
      typeof product?.stock === "number" ? product.stock : Infinity;

    return availableStock === 0 || item.quantity > availableStock;
  });

  return (
    <AppLayout>
      <div className="cart-page">
        <div className="cart-header">
          <h1>My Cart</h1>
          <p>Review your selected items before checkout.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <p>Your cart is empty.</p>
            <button className="cart-shop-btn" onClick={() => navigate("/shop")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item, index) => {
                const product = storedProducts.find(
                  (productItem) => productItem.id === item.id
                );
                const availableStock =
                  typeof product?.stock === "number" ? product.stock : Infinity;

                const isOutOfStock = availableStock === 0;
                const isLowStock = availableStock > 0 && availableStock <= 5;
                const hasReachedMaxStock = item.quantity >= availableStock;

                return (
                  <div className="cart-item" key={index}>
                    <div className="cart-item-image-wrap">
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="cart-item-image"
                        onError={(e) => {
                          e.target.src = "/placeholder.png";
                        }}
                      />
                    </div>

                    <div className="cart-item-content">
                      <div className="cart-item-top">
                        <div>
                          <h2 className="cart-item-name">{item.name}</h2>
                          <p className="cart-item-category">{item.category}</p>
                        </div>

                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="cart-item-meta">
                        <p>Unit Price: ₦{item.price.toLocaleString()}</p>
                        <p>
                          Line Total: ₦
                          {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      <p
                        className={`cart-stock-text ${
                          isOutOfStock ? "out" : isLowStock ? "low" : "in"
                        }`}
                      >
                        {isOutOfStock
                          ? "This item is out of stock."
                          : isLowStock
                          ? `Only ${availableStock} left in stock.`
                          : "In stock"}
                      </p>

                      <div className="quantity-controls">
                        <button onClick={() => handleDecreaseQuantity(index)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(index)}
                          disabled={hasReachedMaxStock || isOutOfStock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="cart-summary-row">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <hr />

              <div className="cart-summary-total">
                <span>Total</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => {
                  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));

                  if (!currentUser) {
                    navigate("/login", {
                      state: { from: "/checkout" },
                    });
                    return;
                  }

                  navigate("/checkout");
                }}
                disabled={hasInvalidStockItem}
              >
                {hasInvalidStockItem
                  ? "Unavailable Stock in Cart"
                  : "Proceed to Checkout"}
              </button>
            </aside>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default CartPage;