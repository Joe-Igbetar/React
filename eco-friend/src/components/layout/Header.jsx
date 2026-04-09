import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import useTheme from "../../hooks/useTheme";

function Header() {
  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const totalWishlistItems = wishlistItems.length;
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const pathname = location.pathname;

  const isHomePage = pathname === "/";
  const isShopPage = pathname === "/shop";
  const isShopRelatedPage = pathname === "/shop" || pathname.startsWith("/product/");
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const isOrdersPage = pathname === "/orders" || pathname.startsWith("/orders/");
  const isAdminOrdersPage =
    pathname === "/admin/orders" || pathname.startsWith("/admin/orders/");
  const isCartPage = pathname === "/cart";
  const isWishlistPage = pathname === "/wishlist";
  const isAccountPage = pathname === "/account";
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  function handleLogout() {
    localStorage.removeItem("ecoCurrentUser");
    navigate("/");
    window.location.reload();
  }

  return (
    <header>
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="logo">
            Eco-Friend
          </Link>

          <nav className="nav-left">
            {!isHomePage && <Link to="/">Home</Link>}
            {!isShopRelatedPage && <Link to="/shop">Shop</Link>}
            {currentUser?.role !== "admin" && !isAboutPage && <Link to="/about">About</Link>}
            {currentUser?.role !== "admin" && !isContactPage && <Link to="/contact">Contact</Link>}

            {currentUser && currentUser.role !== "admin" && !isOrdersPage && (
              <Link to="/orders">My Orders</Link>
            )}

            {currentUser?.role === "admin" && !isAdminOrdersPage && (
              <Link to="/admin/orders">Admin Orders</Link>
            )}

            {currentUser?.role === "admin" && pathname !== "/admin/products" && (
              <Link to="/admin/products">Admin Products</Link>
            )}
          </nav>
        </div>

        <div className="header-right">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {!isCartPage && (
            <Link to="/cart" className="header-icon-link">
              <span>Cart</span>
              <span className="header-count-badge">{totalCartItems}</span>
            </Link>
          )}

          {currentUser &&
            currentUser.role !== "admin" &&
            !isWishlistPage && (
              <Link to="/wishlist" className="header-icon-link">
                <span>Wishlist</span>
                <span className="header-count-badge">{totalWishlistItems}</span>
              </Link>
            )}

          {currentUser ? (
            <>
              {currentUser.role !== "admin" && !isAccountPage && (
                <Link to="/account">Account</Link>
              )}

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {!isLoginPage && <Link to="/login">Login</Link>}
              {!isSignupPage && <Link to="/signup">Sign Up</Link>}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;