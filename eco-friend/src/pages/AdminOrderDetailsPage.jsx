import { Link, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { getOrderById, updateOrderStatus, deleteOrders } from "../utils/orderStorage";

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

function AdminOrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = getOrderById(orderId);

  function handleStatusChange(event) {
    updateOrderStatus(order.id, event.target.value);
    navigate(0);
  }

  function handleQuickStatusUpdate(newStatus) {
    updateOrderStatus(order.id, newStatus);
    navigate(0);
  }

  if (!order) {
    return (
      <AppLayout>
        <div className="order-details-page">
          <h1>Order Not Found</h1>
          <p>We could not find that order.</p>
          <Link to="/admin/orders">Back to Admin Orders</Link>
        </div>
      </AppLayout>
    );
  }

  const customer = order.customer || {};
  const shippingAddress = order.shippingAddress || {};
  const items = Array.isArray(order.items) ? order.items : [];

  function handleDeleteOrder() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) return;

    deleteOrders([order.id]);
    navigate("/admin/orders");
  }

  return (
    <AppLayout>
      <div className="order-details-page">
        <div className="order-details-header">
          <h1>Admin Order Details</h1>
          <Link to="/admin/orders">← Back to Admin Orders</Link>
        </div>

        <div className="order-details-card">
          <h2>Order ID: {order.id}</h2>
          <p>
            Status:{" "}
            <span className={getStatusClass(order.status)}>
              {order.status || "confirmed"}
            </span>
          </p>
          <p>
            Date:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "N/A"}
          </p>
          <p>Total: ₦{Number(order.total || 0).toLocaleString()}</p>

          <div className="admin-quick-actions">
            {order.status === "confirmed" && (
              <>
                <button
                  className="quick-action-btn processing"
                  onClick={() => handleQuickStatusUpdate("processing")}
                >
                  Mark as Processing
                </button>

                <button
                  className="quick-action-btn cancelled"
                  onClick={() => handleQuickStatusUpdate("cancelled")}
                >
                  Cancel Order
                </button>
              </>
            )}

            {order.status === "pending" && (
              <>
                <button
                  className="quick-action-btn processing"
                  onClick={() => handleQuickStatusUpdate("processing")}
                >
                  Mark as Processing
                </button>

                <button
                  className="quick-action-btn cancelled"
                  onClick={() => handleQuickStatusUpdate("cancelled")}
                >
                  Cancel Order
                </button>
              </>
            )}

            {order.status === "processing" && (
              <button
                className="quick-action-btn shipped"
                onClick={() => handleQuickStatusUpdate("shipped")}
              >
                Mark as Shipped
              </button>
            )}

            {order.status === "shipped" && (
              <button
                className="quick-action-btn delivered"
                onClick={() => handleQuickStatusUpdate("delivered")}
              >
                Mark as Delivered
              </button>
            )}

            <button
              type="button"
              className="quick-action-btn delete"
              onClick={handleDeleteOrder}
            >
              Delete Order
            </button>
          </div>
        </div>

        <div className="order-details-card">
          <h2>Update Status</h2>
          <select
            value={order.status || "confirmed"}
            onChange={handleStatusChange}
          >
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="order-details-card">
          <h2>Customer Information</h2>
          <p>{customer.fullName || "N/A"}</p>
          <p>{customer.email || "N/A"}</p>
          <p>{customer.phone || "N/A"}</p>
        </div>

        <div className="order-details-card">
          <h2>Shipping Address</h2>
          <p>{shippingAddress.address || "N/A"}</p>
          <p>
            {shippingAddress.city || "N/A"}
            {shippingAddress.state ? `, ${shippingAddress.state}` : ""}
          </p>
        </div>

        <div className="order-details-card">
          <h2>Items Ordered</h2>

          {items.length === 0 ? (
            <p>No items found for this order.</p>
          ) : (
            items.map((item, index) => (
              <div className="order-detail-item" key={index}>
                <div>
                  <p>{item.name || "Unnamed product"}</p>
                  <p>Qty: {item.quantity || 0}</p>
                </div>
                <p>
                  ₦
                  {Number(
                    (item.price || 0) * (item.quantity || 0)
                  ).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default AdminOrderDetailsPage;