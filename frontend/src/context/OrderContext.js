import React, { createContext, useContext, useState, useEffect } from "react";
import orderService from "../services/orderService";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    const result = await orderService.fetchOrders({ limit: 100 });

    if (result.success) {
      setOrders(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const addOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    // Send data in flat format matching the schema
    const result = await orderService.createOrder(orderData);

    if (result.success) {
      await fetchOrders(); // Refresh orders list
      setLoading(false);
      return { success: true, data: result.data, message: result.message };
    } else {
      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  const updateOrder = async (id, updatedOrderData) => {
    setLoading(true);
    setError(null);

    // Send data in flat format matching the schema
    const result = await orderService.updateOrder(id, updatedOrderData);

    if (result.success) {
      await fetchOrders();
      setLoading(false);
      return { success: true, data: result.data, message: result.message };
    } else {
      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  const deleteOrder = async (id) => {
    setLoading(true);
    setError(null);

    const result = await orderService.removeOrder(id);

    if (result.success) {
      await fetchOrders(); // Refresh orders list
      setLoading(false);
      return { success: true, message: result.message };
    } else {
      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        addOrder,
        updateOrder,
        deleteOrder,
        fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
