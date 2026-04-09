import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AccountPage from "../pages/AccountPage";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutPage from "../pages/CheckoutPage";
import AuthRedirect from "../components/auth/AuthRedirect";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import OrdersPage from "../pages/OrdersPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import AdminOrdersPage from "../pages/AdminOrdersPage";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import AdminOrderDetailsPage from "../pages/AdminOrderDetailsPage";
import WishlistPage from "../pages/WishlistPage";
import ScrollToTop from "../components/common/ScrollToTop";
import AdminProductsPage from "../pages/AdminProductsPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/login"
          element={
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <SignupPage />
            </AuthRedirect>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<UserRoute><OrdersPage /></UserRoute>} />
        <Route path="/orders/:orderId" element={<UserRoute><OrderDetailsPage /></UserRoute>}/>
        <Route path="/admin/orders" element={<AdminRoute><AdminOrdersPage /></AdminRoute>} />
        <Route path="/wishlist" element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>}/>
        <Route path="/admin/orders/:orderId" element={
            <AdminRoute>
              <AdminOrderDetailsPage />
            </AdminRoute>}/>
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProductsPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
    </>
  );
}

export default AppRoutes;