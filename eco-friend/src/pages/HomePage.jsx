import React, { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Link } from "react-router-dom";
import ProductGrid from "../components/shop/ProductGrid";
import { getRecentlyViewedProducts } from "../utils/recentlyViewed";
import { getStoredProducts } from "../utils/productStorage";
import heroSolarPanels from "../assets/hero-solar-panels.png";
import heroPowerStations from "../assets/hero-power-stations.png";
import heroRechargeables from "../assets/hero-rechargeables.png";
import heroInverters from "../assets/hero-inverters.png";

const heroSlides = [
  {
    id: 1,
    image: heroSolarPanels,
    eyebrow: "Clean Solar Solutions",
    title: "Power Your Space with Solar Panels",
    description:
      "Discover efficient solar panels designed to reduce energy costs and keep your home or business running sustainably.",
  },
  {
    id: 2,
    image: heroPowerStations,
    eyebrow: "Portable Energy",
    title: "Reliable Power Stations for Every Need",
    description:
      "From home backup to outdoor adventures, explore powerful stations built to keep your devices and appliances running.",
  },
  {
    id: 3,
    image: heroInverters,
    eyebrow: "Smart Energy Conversion",
    title: "High-Performance Inverters You Can Trust",
    description:
      "Choose dependable inverters that deliver stable, efficient power for homes, offices, and off-grid systems.",
  },
  {
    id: 4,
    image: heroRechargeables,
    eyebrow: "Everyday Essentials",
    title: "Rechargeables for Modern Living",
    description:
      "Shop eco-friendly rechargeable devices and accessories that help you save money while reducing waste.",
  },
];

function HomePage() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  const allProducts = getStoredProducts();
  const featuredProducts = allProducts.slice(0, 3);

  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
  const isAdmin = currentUser?.role === "admin";
  const isLoggedInCustomer = currentUser && currentUser.role !== "admin";

  const homepageReviews = [
    {
      id: 1,
      name: "Amaka",
      text: "The power station has been very reliable during outages. Delivery was smooth and the product quality was excellent.",
    },
    {
      id: 2,
      name: "Tunde",
      text: "I like how easy it was to browse categories and compare products. The inverter has been working very well.",
    },
    {
      id: 3,
      name: "Chinonso",
      text: "The rechargeable products were exactly what I needed. The shopping experience felt clean and straightforward.",
    },
  ];

  useEffect(() => {
    if (!isLoggedInCustomer) {
      setRecentlyViewed([]);
      return;
    }

    const recentProducts = getRecentlyViewedProducts();
    setRecentlyViewed(recentProducts);
  }, [isLoggedInCustomer]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setReviewIndex((currentIndex) =>
        currentIndex === homepageReviews.length - 1 ? 0 : currentIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [homepageReviews.length]);

  const recentlyViewedCategories = [
    ...new Set(recentlyViewed.map((item) => item.category)),
  ];

  const recommendedProducts = allProducts
    .filter(
      (product) =>
        recentlyViewedCategories.includes(product.category) &&
        !recentlyViewed.some((item) => item.id === product.id)
    )
    .slice(0, 4);

  const activeReview = homepageReviews[reviewIndex];

  const [currentSlide, setCurrentSlide] = useState(0);
  const activeSlide = heroSlides[currentSlide];

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);

  return (
    <AppLayout>
      <section
        className="home-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${activeSlide.image})`,
        }}
      >
        <div key={activeSlide.id} className="home-hero-content hero-fade">
          <p className="home-hero-eyebrow">{activeSlide.eyebrow}</p>

          <h1>{activeSlide.title}</h1>

          <p className="home-hero-text">{activeSlide.description}</p>

          <div className="home-hero-actions">
            <Link to="/shop" className="hero-secondary-btn">
              Shop Now
            </Link>

            <Link to="/shop" className="hero-secondary-btn">
              Explore Products
            </Link>
          </div>
        </div>

        <div className="home-hero-panel">
          <div className="home-hero-panel-card">
            <h3>Why Eco-Friend?</h3>

            <div className="home-hero-points">
              <div className="home-hero-point">
                <strong>Reliable Products</strong>
                <span>Solar and backup solutions selected for practical use.</span>
              </div>

              <div className="home-hero-point">
                <strong>Energy Independence</strong>
                <span>Reduce outages and stay prepared with cleaner power.</span>
              </div>

              <div className="home-hero-point">
                <strong>Built for Everyday Needs</strong>
                <span>From household essentials to stronger backup systems.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-highlights">
        <div className="home-highlight-card">
          <strong>Trusted Product Range</strong>
          <span>Panels, inverters, power stations, and rechargeables</span>
        </div>

        <div className="home-highlight-card">
          <strong>Built for Home & Business</strong>
          <span>Practical energy options for different daily needs</span>
        </div>

        <div className="home-highlight-card">
          <strong>Better Preparedness</strong>
          <span>Stay ready for outages with dependable backup solutions</span>
        </div>
      </section>

      {isAdmin && (
        <section className="admin-home-note">
          <div className="admin-home-note-card">
            <h2>Admin Mode</h2>
            <p>
              You are signed in as an administrator. Use the admin dashboard to
              manage orders and monitor store activity.
            </p>

            <Link to="/admin/orders" className="hero-btn">
              Open Admin Dashboard
            </Link>
          </div>
        </section>
      )}

      <section className="categories-section">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Browse by Type</p>
            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="categories-grid">
          <Link
            to="/shop?category=Solar Panels"
            className="category-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroSolarPanels})`,
            }}
          >
            <h3>Solar Panels</h3>
            <p>Efficient panels for home and outdoor energy setups.</p>
          </Link>

          <Link
            to="/shop?category=Solar Generators"
            className="category-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroPowerStations})`,
            }}
          >
            <h3>Power Generators</h3>
            <p>Portable and backup power solutions for flexible use.</p>
          </Link>

          <Link
            to="/shop?category=Solar Charge Controllers"
            className="category-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroRechargeables})`,
            }}
          >
            <h3>Charge Controllers</h3>
            <p>Everyday rechargeable essentials built for convenience.</p>
          </Link>

          <Link
            to="/shop?category=Inverters"
            className="category-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroInverters})`,
            }}
          >
            <h3>Inverters</h3>
            <p>Stable energy conversion for smarter backup systems.</p>
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Store Highlights</p>
            <h2>Featured Products</h2>
          </div>
          <Link to="/shop">View All</Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>

      {isLoggedInCustomer && recentlyViewed.length > 0 && (
        <section className="recently-viewed-home-section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Continue Browsing</p>
              <h2>Recently Viewed</h2>
            </div>
            <Link to="/shop">Browse More</Link>
          </div>

          <ProductGrid products={recentlyViewed} />
        </section>
      )}

      {isLoggedInCustomer && recommendedProducts.length > 0 && (
        <section className="recommended-section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Picked From Your Interests</p>
              <h2>Recommended for You</h2>
            </div>
            <Link to="/shop">View More</Link>
          </div>

          <ProductGrid products={recommendedProducts} />
        </section>
      )}

      <section className="home-testimonials-section">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Customer Feedback</p>
            <h2>Customer Reviews</h2>
          </div>
        </div>

        <div className="home-testimonial-card">
          <p className="home-testimonial-text">“{activeReview.text}”</p>
          <p className="home-testimonial-name">— {activeReview.name}</p>

          <div className="home-testimonial-dots">
            {homepageReviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                className={`home-testimonial-dot ${
                  reviewIndex === index ? "active" : ""
                }`}
                onClick={() => setReviewIndex(index)}
                aria-label={`Show review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

export default HomePage;