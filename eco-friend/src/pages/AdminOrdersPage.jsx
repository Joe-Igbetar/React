import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { getAllOrders, updateOrderStatus, deleteOrders } from "../utils/orderStorage";

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

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  useEffect(() => {
    setOrders(getAllOrders());
  }, []);

  function handleStatusChange(orderId, newStatus) {
    updateOrderStatus(orderId, newStatus);
    setOrders(getAllOrders());
  }

  const totalOrders = orders.length;
  const confirmedOrders = orders.filter(
    (order) => order.status === "confirmed"
  ).length;
  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  ).length;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.customer?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      switch (sortOption) {
          case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
          case "highest":
          return Number(b.total || 0) - Number(a.total || 0);
          case "lowest":
          return Number(a.total || 0) - Number(b.total || 0);
          case "newest":
          default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const totalRevenue = orders.reduce(
  (sum, order) => sum + Number(order.total || 0),
  0
 );

  const deliveredRevenue = orders
  .filter((order) => order.status === "delivered")
  .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const pendingRevenue = orders
  .filter(
    (order) =>
    order.status === "confirmed" ||
    order.status === "pending" ||
    order.status === "processing" ||
    order.status === "shipped"
  )
  .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const cancelledValue = orders
  .filter((order) => order.status === "cancelled")
  .reduce((sum, order) => sum + Number(order.total || 0), 0);

  function handleExportCSV() {
  if (sortedOrders.length === 0) return;

  const headers = [
    "Order ID",
    "Date",
    "Status",
    "Customer Name",
    "Customer Email",
    "Customer Phone",
    "Address",
    "City",
    "State",
    "Items Count",
    "Total",
  ];

  const rows = sortedOrders.map((order) => [
    order.id || "",
    order.createdAt ? new Date(order.createdAt).toLocaleString() : "",
    order.status || "",
    order.customer?.fullName || "",
    order.customer?.email || "",
    order.customer?.phone || "",
    order.shippingAddress?.address || "",
    order.shippingAddress?.city || "",
    order.shippingAddress?.state || "",
    order.items?.length || 0,
    Number(order.total || 0),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "admin-orders.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

  function handleClearFilters() {
  setSearchTerm("");
  setStatusFilter("all");
  setSortOption("newest");
  }

  const hasActiveFilters =
  searchTerm !== "" || statusFilter !== "all" || sortOption !== "newest";

  function handleToggleOrderSelection(orderId) {
    setSelectedOrderIds((prevSelected) => {
      if (prevSelected.includes(orderId)) {
        return prevSelected.filter((id) => id !== orderId);
      }

      return [...prevSelected, orderId];
    });
  }

  function handleSelectAllVisible() {
    const visibleIds = sortedOrders.map((order) => order.id);
    setSelectedOrderIds(visibleIds);
  }

  function handleClearSelection() {
    setSelectedOrderIds([]);
  }

  function handleBulkStatusUpdate(newStatus) {
    if (selectedOrderIds.length === 0) return;

    selectedOrderIds.forEach((orderId) => {
      updateOrderStatus(orderId, newStatus);
    });

    setOrders(getAllOrders());
    setSelectedOrderIds([]);
  }

  function handleExportSelectedCSV() {
    if (selectedOrderIds.length === 0) return;

    const selectedOrders = sortedOrders.filter((order) =>
      selectedOrderIds.includes(order.id)
    );

    const headers = [
      "Order ID",
      "Date",
      "Status",
      "Customer Name",
      "Customer Email",
      "Customer Phone",
      "Address",
      "City",
      "State",
      "Items Count",
      "Total",
    ];

    const rows = selectedOrders.map((order) => [
      order.id || "",
      order.createdAt ? new Date(order.createdAt).toLocaleString() : "",
      order.status || "",
      order.customer?.fullName || "",
      order.customer?.email || "",
      order.customer?.phone || "",
      order.shippingAddress?.address || "",
      order.shippingAddress?.city || "",
      order.shippingAddress?.state || "",
      order.items?.length || 0,
      Number(order.total || 0),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "selected-admin-orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function handleDeleteSelected() {
    if (selectedOrderIds.length === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedOrderIds.length} selected order(s)?`
    );

    if (!confirmed) return;

    deleteOrders(selectedOrderIds);
    setOrders(getAllOrders());
    setSelectedOrderIds([]);
  }

  return (
    <AppLayout>
      <div className="admin-orders-page">
        <div className="admin-orders-header">
          <h1>Admin Orders Dashboard</h1>
          <p>Manage all customer orders here.</p>
        </div>

        <div className="admin-stats-grid">
            <button
                type="button"
                className={`admin-stat-card ${statusFilter === "all" ? "active" : ""}`}
                onClick={() => setStatusFilter("all")}
            >
                <h3>Total Orders</h3>
                <p>{totalOrders}</p>
            </button>

            <button
                type="button"
                className={`admin-stat-card confirmed ${statusFilter === "confirmed" ? "active" : ""}`}
                onClick={() => setStatusFilter("confirmed")}
            >
                <h3>Confirmed</h3>
                <p>{confirmedOrders}</p>
            </button>

            <button
                type="button"
                className={`admin-stat-card processing ${statusFilter === "processing" ? "active" : ""}`}
                onClick={() => setStatusFilter("processing")}
            >
                <h3>Processing</h3>
                <p>{processingOrders}</p>
            </button>

            <button
                type="button"
                className={`admin-stat-card delivered ${statusFilter === "delivered" ? "active" : ""}`}
                onClick={() => setStatusFilter("delivered")}
            >
                <h3>Delivered</h3>
                <p>{deliveredOrders}</p>
            </button>

            <button
                type="button"
                className={`admin-stat-card cancelled ${statusFilter === "cancelled" ? "active" : ""}`}
                onClick={() => setStatusFilter("cancelled")}
            >
                <h3>Cancelled</h3>
                <p>{cancelledOrders}</p>
            </button>
        </div>

        <div className="admin-revenue-grid">
            <div className="admin-revenue-card">
                <h3>Total Revenue</h3>
                <p>₦{totalRevenue.toLocaleString()}</p>
            </div>

            <div className="admin-revenue-card delivered">
                <h3>Delivered Revenue</h3>
                <p>₦{deliveredRevenue.toLocaleString()}</p>
            </div>

            <div className="admin-revenue-card pending">
                <h3>Pending Revenue</h3>
                <p>₦{pendingRevenue.toLocaleString()}</p>
            </div>

            <div className="admin-revenue-card cancelled">
                <h3>Cancelled Value</h3>
                <p>₦{cancelledValue.toLocaleString()}</p>
            </div>
        </div>

        <div className="admin-orders-controls">
          <input
            type="text"
            placeholder="Search by order ID, customer name, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="admin-filter-select"
            >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Total</option>
            <option value="lowest">Lowest Total</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              className="admin-clear-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}

          <button
            type="button"
            className="admin-export-btn"
            onClick={handleExportCSV}
            disabled={sortedOrders.length === 0}
          >
            Export CSV
          </button>
        </div>

        <div className="admin-bulk-toolbar">
          <div className="admin-bulk-left">
            <button
              type="button"
              className="admin-bulk-btn"
              onClick={handleSelectAllVisible}
              disabled={sortedOrders.length === 0}
            >
              Select All Visible
            </button>

            <button
              type="button"
              className="admin-bulk-btn secondary"
              onClick={handleClearSelection}
              disabled={selectedOrderIds.length === 0}
            >
              Clear Selection
            </button>
          </div>

          <div className="admin-bulk-right">
            <span className="admin-selected-count">
              {selectedOrderIds.length} selected
            </span>

            <button
              type="button"
              className="admin-bulk-btn processing"
              onClick={() => handleBulkStatusUpdate("processing")}
              disabled={selectedOrderIds.length === 0}
            >
              Mark Processing
            </button>

            <button
              type="button"
              className="admin-bulk-btn delivered"
              onClick={() => handleBulkStatusUpdate("delivered")}
              disabled={selectedOrderIds.length === 0}
            >
              Mark Delivered
            </button>

            <button
              type="button"
              className="admin-bulk-btn cancelled"
              onClick={() => handleBulkStatusUpdate("cancelled")}
              disabled={selectedOrderIds.length === 0}
            >
              Cancel Selected
            </button>

            <button
              type="button"
              className="admin-bulk-btn export"
              onClick={handleExportSelectedCSV}
              disabled={selectedOrderIds.length === 0}
            >
              Export Selected
            </button>

            <button
              type="button"
              className="admin-bulk-btn delete"
              onClick={handleDeleteSelected}
              disabled={selectedOrderIds.length === 0}
            >
              Delete Selected
            </button>
          </div>
        </div>

        <p className="admin-results-count">
          Showing {sortedOrders.length} order{sortedOrders.length !== 1 ? "s" : ""}
        </p>

        {sortedOrders.length === 0 ? (
          <div className="admin-orders-empty">
            <p>No matching orders found.</p>
          </div>
        ) : (
          <div className="admin-orders-list">
            {sortedOrders.map((order) => (
              <div className="admin-order-card" key={order.id}>
                <div className="admin-order-select">
                  <input
                    type="checkbox"
                    checked={selectedOrderIds.includes(order.id)}
                    onChange={() => handleToggleOrderSelection(order.id)}
                  />
                </div>

                <div className="admin-order-top">
                  <div>
                    <h2>{order.id}</h2>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  <span className={getStatusClass(order.status)}>
                    {order.status}
                  </span>
                </div>

                <div className="admin-order-info">
                  <p>
                    <strong>Customer:</strong> {order.customer?.fullName || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.customer?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.customer?.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Total:</strong> ₦{Number(order.total || 0).toLocaleString()}
                  </p>
                  <p>
                    <strong>Items:</strong> {order.items?.length || 0}
                  </p>
                </div>

                <div className="admin-order-actions">
                  <label htmlFor={`status-${order.id}`}>Update Status</label>
                  <select
                    id={`status-${order.id}`}
                    value={order.status || "confirmed"}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="admin-order-footer">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="admin-order-details-link"
                  >
                    View Order Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default AdminOrdersPage;