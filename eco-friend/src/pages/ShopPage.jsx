import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import ProductGrid from "../components/shop/ProductGrid";
import { getStoredProducts } from "../utils/productStorage";

function ShopPage() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  const allProducts = getStoredProducts();

  const categories = useMemo(() => {
    return [...new Set(allProducts.map((product) => product.category))];
  }, [allProducts]);

  let filteredProducts = selectedCategory
    ? allProducts.filter((product) => product.category === selectedCategory)
    : allProducts;

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-az":
        return a.name.localeCompare(b.name);
      case "name-za":
        return b.name.localeCompare(a.name);
      case "featured":
      default:
        return 0;
    }
  });

  return (
    <AppLayout>
      <div className="shop-page">
        <div className="shop-header">
          <div>
            <h1>Shop</h1>

            {selectedCategory ? (
              <p>Showing products in: {selectedCategory}</p>
            ) : (
              <p>Browse our solar products and rechargeables.</p>
            )}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {selectedCategory && (
            <Link to="/shop" className="clear-filter-btn">
              View All Products
            </Link>
          )}
        </div>

        <div className="shop-toolbar">
          <div className="category-chips">
            <Link
              to="/shop"
              className={`category-chip ${!selectedCategory ? "active" : ""}`}
            >
              All
            </Link>

            {categories.map((category) => (
              <Link
                key={category}
                to={`/shop?category=${encodeURIComponent(category)}`}
                className={`category-chip ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="shop-sort">
            <label htmlFor="shop-sort">Sort By</label>
            <select
              id="shop-sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Name: A to Z</option>
              <option value="name-za">Name: Z to A</option>
            </select>
          </div>
        </div>

        <p className="shop-results-count">
          Showing {sortedProducts.length} product
          {sortedProducts.length !== 1 ? "s" : ""}
        </p>

        {sortedProducts.length > 0 ? (
          <ProductGrid products={sortedProducts} />
        ) : (
          <p className="no-results">
            No products found. Try a different search or view all products.
          </p>
        )}
      </div>
    </AppLayout>
  );
}

export default ShopPage;