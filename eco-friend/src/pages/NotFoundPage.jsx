import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProductGrid from "../components/shop/ProductGrid";
import { getRecentlyViewedProducts } from "../utils/recentlyViewed";

function NotFoundPage() {
  const recentlyViewed = getRecentlyViewedProducts().slice(0, 4);

  return (
    <AppLayout>
      <div className="notfound-page">
        <div className="notfound-card">
          <p className="notfound-eyebrow">Oops • Page Missing</p>
          <h1>404</h1>
          <h2>Looks like this page ran out of power</h2>
          <p className="notfound-text">
            The page you’re looking for doesn’t exist, may have been moved, or
            the link may be incorrect.
          </p>

          <div className="notfound-actions">
            <Link to="/" className="notfound-btn primary">
              Go Home
            </Link>

            <Link to="/shop" className="notfound-btn secondary">
              Browse Products
            </Link>
          </div>
        </div>

        <section className="notfound-section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Quick Navigation</p>
              <h2>Shop by Category</h2>
            </div>
          </div>

          <div className="categories-grid">
            <Link to="/shop?category=Solar Panels" className="category-card notfound-category-card">
              <h3>Solar Panels</h3>
              <p>Efficient solar solutions for homes and businesses.</p>
            </Link>

            <Link to="/shop?category=Power Stations" className="category-card notfound-category-card">
              <h3>Power Stations</h3>
              <p>Reliable portable power for backup and outdoor use.</p>
            </Link>

            <Link to="/shop?category=Inverters" className="category-card notfound-category-card">
              <h3>Inverters</h3>
              <p>Stable energy conversion for smart backup systems.</p>
            </Link>

            <Link to="/shop?category=Rechargeables" className="category-card notfound-category-card">
              <h3>Rechargeables</h3>
              <p>Convenient everyday rechargeable essentials.</p>
            </Link>
          </div>
        </section>

        {recentlyViewed.length > 0 && (
          <section className="notfound-section">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">Pick Up Where You Left Off</p>
                <h2>Recently Viewed</h2>
              </div>

              <Link to="/shop">View All</Link>
            </div>

            <ProductGrid products={recentlyViewed} />
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default NotFoundPage;