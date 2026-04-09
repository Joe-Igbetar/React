import { Link, useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { getOrderById, updateOrderStatus } from "../utils/orderStorage";

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

function getOrderProgress(status) {
  const steps = ["confirmed", "processing", "shipped", "delivered"];
  const currentStepIndex = steps.indexOf(status);

  return steps.map((step, index) => ({
    label: step.charAt(0).toUpperCase() + step.slice(1),
    isCompleted: currentStepIndex >= index,
    isCurrent: currentStepIndex === index,
  }));
}

function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = getOrderById(orderId);

  function handleCancelOrder() {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    updateOrderStatus(order.id, "cancelled");
    navigate(0);
  }

  if (!order) {
    return (
      <AppLayout>
        <div className="order-details-page">
          <h1>Order Not Found</h1>
          <p>We could not find that order.</p>
          <Link to="/orders">Back to My Orders</Link>
        </div>
      </AppLayout>
    );
  }

  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
    if (!order || order.userId !== currentUser?.id) {
    return (
      <AppLayout>
        <div className="order-details-page">
          <h1>Order Not Found</h1>
          <p>We could not find that order.</p>
          <Link to="/orders">Back to My Orders</Link>
        </div>
      </AppLayout>
    );
  }

  const customer = order.customer || {};
  const shippingAddress = order.shippingAddress || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const progressSteps = getOrderProgress(order.status || "confirmed");

  return (
    <AppLayout>
      <div className="order-details-page">
        <div className="order-details-header">
          <h1>Order Details</h1>
          <Link to="/orders">← Back to My Orders</Link>
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

          {order.status === "cancelled" ? (
            <div className="order-status-cancelled-box">
              <p>This order has been cancelled.</p>
            </div>
          ) : (
            <div className="order-progress">
              {progressSteps.map((step) => (
                <div
                  key={step.label}
                  className={`order-progress-step ${
                    step.isCompleted ? "completed" : ""
                  } ${step.isCurrent ? "current" : ""}`}
                >
                  <div className="order-progress-dot" />
                  <p>{step.label}</p>
                </div>
              ))}
            </div>
          )}

          {order.status === "confirmed" && (
            <button
              className="cancel-order-btn"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </button>
          )}
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

export default OrderDetailsPage;