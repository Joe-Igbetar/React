import { Link, useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { getOrderById } from "../utils/orderStorage";

function OrderSuccessPage() {
  const { orderId } = useParams();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <AppLayout>
        <div className="order-success-page">
          <div className="order-success-card">
            <h1>Order Not Found</h1>
            <p>We could not find your order details.</p>
            <Link to="/shop" className="order-success-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <AppLayout>
      <div className="order-success-page">
        <div className="order-success-card">
          <div className="order-success-icon">✓</div>

          <h1>Order Placed Successfully</h1>
          <p className="order-success-subtext">
            Thank you for shopping with Eco-Friend. Your order has been received.
          </p>

          <div className="order-success-meta">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {order.status || "confirmed"}
            </p>
          </div>

          <div className="order-success-section">
            <h2>Items Ordered</h2>

            {items.length === 0 ? (
              <p>No items found.</p>
            ) : (
              <div className="order-success-items">
                {items.map((item, index) => (
                  <div className="order-success-item" key={index}>
                    <div>
                      <p className="order-success-item-name">
                        {item.name || "Unnamed product"}
                      </p>
                      <p>Qty: {item.quantity || 0}</p>
                    </div>

                    <p className="order-success-item-total">
                      ₦
                      {Number(
                        (item.price || 0) * (item.quantity || 0)
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="order-success-section">
            <h2>Order Summary</h2>
            <p className="order-success-grand-total">
              Total: ₦{Number(order.total || 0).toLocaleString()}
            </p>
          </div>

          <div className="order-success-actions">
            <Link to="/orders" className="order-success-btn primary">
              View My Orders
            </Link>
            <Link to="/shop" className="order-success-btn secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default OrderSuccessPage;