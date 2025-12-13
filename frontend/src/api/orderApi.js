import httpClient from "../config/httpClient";

// Order API endpoints
const orderApi = {
  // Create new order
  createOrder: async (orderData) => {
    return await httpClient.post("/orders", orderData);
  },

  // Get all orders with optional filters
  getAllOrders: async (params = {}) => {
    return await httpClient.get("/orders", { params });
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    return await httpClient.get(`/orders/${orderId}`);
  },

  // Get orders by customer email
  getOrdersByCustomer: async (email) => {
    return await httpClient.get(`/orders/customer/${email}`);
  },

  // Update order (can update any field)
  updateOrder: async (orderId, updateData) => {
    return await httpClient.patch(`/orders/${orderId}`, updateData);
  },

  // Delete order
  deleteOrder: async (orderId) => {
    return await httpClient.delete(`/orders/${orderId}`);
  },
};

export default orderApi;
