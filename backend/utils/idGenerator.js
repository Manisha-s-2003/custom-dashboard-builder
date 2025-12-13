const Order = require("../models/Order");

// Generate sequential order ID in format ORD-0001
exports.generateOrderId = async () => {
  try {
    // Find the last order by sorting in descending order
    const lastOrder = await Order.findOne()
      .sort({ createdAt: -1 })
      .select("orderId");

    let nextNumber = 1;

    if (lastOrder && lastOrder.orderId) {
      // Extract the number from the last order ID (e.g., "ORD-0001" -> 1)
      const lastNumber = parseInt(lastOrder?.orderId.split("-")[1]);
      nextNumber = lastNumber + 1;
    }

    // Format the number with leading zeros (e.g., 1 -> "0001")
    const formattedNumber = nextNumber.toString().padStart(4, "0");
    return `ORD-${formattedNumber}`;
  } catch (error) {
    console.error("Error generating order ID:", error);
    throw error;
  }
};

// Generate sequential customer ID in format CUST-0001
exports.generateCustomerId = async () => {
  try {
    // Find the last order with customer data by sorting in descending order
    const lastOrder = await Order.findOne({
      "customer.customerId": { $exists: true },
    })
      .sort({ "customer.customerId": -1 })
      .select("customer.customerId");

    let nextNumber = 1;

    if (lastOrder && lastOrder.customer && lastOrder.customer.customerId) {
      // Extract the number from the last customer ID (e.g., "CUST-0001" -> 1)
      const lastNumber = parseInt(lastOrder.customer.customerId.split("-")[1]);
      nextNumber = lastNumber + 1;
    }

    // Format the number with leading zeros (e.g., 1 -> "0001")
    const formattedNumber = nextNumber.toString().padStart(4, "0");
    return `CUST-${formattedNumber}`;
  } catch (error) {
    console.error("Error generating customer ID:", error);
    throw error;
  }
};
