import orderApi from "../api/orderApi";

// Order service - business logic layer
const orderService = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      const response = await orderApi.createOrder(orderData);
      return {
        success: true,
        data: response.data,
        message: response.message || "Order created successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Fetch all orders with pagination and filters
  fetchOrders: async (filters = {}) => {
    try {
      const { status, page = 1, limit = 10 } = filters;
      const params = { page, limit };

      if (status) {
        params.status = status;
      }

      const response = await orderApi.getAllOrders(params);
      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Fetch single order details
  fetchOrderDetails: async (orderId) => {
    try {
      const response = await orderApi.getOrderById(orderId);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Fetch customer orders
  fetchCustomerOrders: async (email) => {
    try {
      const response = await orderApi.getOrdersByCustomer(email);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Update order (can update any field)
  updateOrder: async (orderId, updateData) => {
    try {
      const response = await orderApi.updateOrder(orderId, updateData);
      return {
        success: true,
        data: response.data,
        message: response.message || "Order updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Delete order
  removeOrder: async (orderId) => {
    try {
      const response = await orderApi.deleteOrder(orderId);
      return {
        success: true,
        message: response.message || "Order deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

export default orderService;
