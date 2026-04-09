import AppLayout from "../components/layout/AppLayout";
import { getOrdersByUserId } from "../utils/orderStorage";
import { Link } from "react-router-dom";

function getStatusClass(status) {
  switch (status) {
    case "pending":
      return "status-badge pending";
    case "processing":
      return "status-badge processing";
    case "shipped":
      return "status-badge shipped";
    case "delivered":
      return "status-badge delivered";
    case "cancelled":
      return "status-badge cancelled";
    case "confirmed":
    default:
      return "status-badge confirmed";
  }
}

function OrdersPage() {
  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
  const orders = getOrdersByUserId(currentUser?.id || "");

  return (
    <AppLayout>
      <div className="orders-page">
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <p>You have not placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
                <Link to={`/orders/${order.id}`} className="order-card-link" key={order.id}>
                    <div className="order-card">
                    <div className="order-card-top">
                        <div>
                        <h3>Order #{order.id}</h3>
                        <p className="order-date">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                        </div>

                        <span className={getStatusClass(order.status)}>
                        {order.status}
                        </span>
                    </div>

                    <div className="order-card-middle">
                        <p className="order-total">Total: ₦{order.total.toLocaleString()}</p>
                        <p className="order-count">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </p>
                    </div>

                    <div className="order-preview-list">
                        {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="order-preview-item">
                            <span>
                            {item.name} x {item.quantity}
                            </span>
                            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        ))}

                        {order.items.length > 3 && (
                        <p className="order-more-items">
                            +{order.items.length - 3} more item{order.items.length - 3 > 1 ? "s" : ""}
                        </p>
                        )}
                    </div>
                    </div>
                </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default OrdersPage;