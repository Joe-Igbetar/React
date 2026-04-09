import { Link } from "react-router-dom";

function Footer() {
  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
  const isLoggedIn = !!currentUser;
  const isAdmin = currentUser?.role === "admin";

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <h2>Eco-Friend</h2>
            <p>
              Reliable solar and backup energy solutions for homes, businesses,
              and everyday resilience.
            </p>
          </div>

          <div className="site-footer-links">
            <div className="site-footer-column">
              <h3>Shop</h3>
              <Link to="/shop">All Products</Link>
              <Link to="/shop?category=Solar Panels">Solar Panels</Link>
              <Link to="/shop?category=Power Stations">Power Stations</Link>
              <Link to="/shop?category=Inverters">Inverters</Link>
            </div>

            <div className="site-footer-column">
              <h3>Company</h3>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              {isLoggedIn && !isAdmin && <Link to="/account">Account</Link>}
              {isLoggedIn && !isAdmin && <Link to="/orders">My Orders</Link>}
            </div>

            <div className="site-footer-column">
              <h3>Support</h3>
              <p>Energy products curated for practical everyday use.</p>
              <p>Email: support@ecofriend.com</p>
              <p>Phone: +234 903 728 3779</p>
              <a
                href="https://wa.me/2349013249301"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© 2026 Eco-Friend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;