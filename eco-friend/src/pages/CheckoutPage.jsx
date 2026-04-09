import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProductGrid from "../components/shop/ProductGrid";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../utils/orderStorage";
import { getStoredProducts, reduceProductStock } from "../utils/productStorage";
import { getRecentlyViewedProducts } from "../utils/recentlyViewed";

function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const recentlyViewed = useMemo(() => {
    return getRecentlyViewedProducts().filter(
      (recentItem) => !cartItems.some((cartItem) => cartItem.id === recentItem.id)
    );
  }, [cartItems]);

  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleSavedAddressChange(event) {
    const checked = event.target.checked;
    setUseSavedAddress(checked);

    if (checked) {
      const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));

      if (currentUser) {
        setFullName(`${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim());
        setEmail(currentUser.email || "");
        setPhone(currentUser.phone || "");
        setAddress(currentUser.address || "");
        setCity(currentUser.city || "");
        setState(currentUser.state || "");
      }
    } else {
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setState("");
    }
  }

  function handleCheckoutSubmit(event) {
    event.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
    const storedProducts = getStoredProducts();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!fullName || !email || !phone || !address || !city || !state) {
      setError("Please fill in all checkout fields.");
      return;
    }

    setError("");
    setIsPlacingOrder(true);

    try {
      const hasInvalidStock = cartItems.some((item) => {
        const product = storedProducts.find(
          (productItem) => productItem.id === item.id
        );

        const availableStock =
          typeof product?.stock === "number" ? product.stock : Infinity;

        return availableStock === 0 || item.quantity > availableStock;
      });

      if (hasInvalidStock) {
        setError("One or more items in your cart exceed available stock.");
        setIsPlacingOrder(false);
        return;
      }

      const order = createOrder({
        userId: currentUser?.id || "",
        customer: {
          fullName,
          email,
          phone,
        },
        shippingAddress: {
          address,
          city,
          state,
        },
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "",
        })),
        total,
      });

      reduceProductStock(cartItems);

      clearCart();
      navigate(`/order-success/${order.id}`);
    } catch (err) {
      console.error("Order placement failed:", err);
      setError("Something went wrong while placing your order.");
    } finally {
      setIsPlacingOrder(false);
    }
  }

  return (
    <AppLayout>
      <div className="checkout-page">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your details to place your order.</p>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form-section">
            <h2>Customer Information</h2>

            <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
              <div className="saved-address-option">
                <label>
                  <input
                    type="checkbox"
                    checked={useSavedAddress}
                    onChange={handleSavedAddressChange}
                  />
                  Use saved address
                </label>
              </div>

              {error && <p className="checkout-error">{error}</p>}

              <div className="checkout-form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="place-order-btn" disabled={isPlacingOrder}>
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>

              <div className="checkout-form-actions">
                <button
                  type="button"
                  className="checkout-secondary-btn"
                  onClick={() => navigate("/cart")}
                >
                  Return to Cart
                </button>

                <Link to="/shop" className="checkout-link-btn">
                  Continue Shopping
                </Link>
              </div>
            </form>
          </div>

          <aside className="checkout-summary-section">
            <h2>Order Summary</h2>

            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <>
                <div className="checkout-summary-items">
                  {cartItems.map((item, index) => (
                    <div className="checkout-item" key={index}>
                      <div className="checkout-item-left">
                        <img
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          className="checkout-item-image"
                        />
                        <div>
                          <p className="checkout-item-name">{item.name}</p>
                          <p className="checkout-item-qty">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="checkout-item-total">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="checkout-total-row">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </>
            )}
          </aside>
        </div>

        {recentlyViewed.length > 0 && (
          <section className="recently-viewed-home-section">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">Pick Up Where You Left Off</p>
                <h2>Recently Viewed</h2>
              </div>
              <Link to="/shop">Browse More</Link>
            </div>

            <ProductGrid products={recentlyViewed.slice(0, 4)} />
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default CheckoutPage;