const ORDERS_KEY = "eco_friend_orders";

export function getStoredOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read orders from storage:", error);
    return [];
  }
}

export function saveStoredOrders(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to save orders to storage:", error);
  }
}

export function createOrder(orderData) {
  const existingOrders = getStoredOrders();

  const newOrder = {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "confirmed",
    ...orderData,
  };

  const updatedOrders = [newOrder, ...existingOrders];
  saveStoredOrders(updatedOrders);

  return newOrder;
}

export function getOrderById(orderId) {
  const orders = getStoredOrders();
  return orders.find((order) => order.id === orderId);
}

export function updateOrderStatus(orderId, newStatus) {
  const orders = getStoredOrders();

  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status: newStatus } : order
  );

  saveStoredOrders(updatedOrders);
}

export function getAllOrders() {
  return getStoredOrders();
}

export function deleteOrders(orderIds) {
  const orders = getStoredOrders();

  const updatedOrders = orders.filter(
    (order) => !orderIds.includes(order.id)
  );

  saveStoredOrders(updatedOrders);
}

export function getOrdersByUserId(userId) {
  const orders = getStoredOrders();
  return orders.filter((order) => order.userId === userId);
}