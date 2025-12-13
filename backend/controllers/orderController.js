const Order = require("../models/Order");
const { generateOrderId, generateCustomerId } = require("../utils/idGenerator");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Validate required fields
    if (!orderData.firstName || !orderData.lastName || !orderData.email) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required",
      });
    }

    if (!orderData.product) {
      return res.status(400).json({
        success: false,
        message: "Product is required",
      });
    }

    // Check if customer exists by email, if not generate new customer ID
    let customerId = orderData.customerId;
    if (!customerId) {
      const existingOrder = await Order.findOne({ email: orderData.email });
      if (existingOrder) {
        customerId = existingOrder.customerId;
      } else {
        customerId = await generateCustomerId();
      }
    }

    // Generate sequential order ID
    const orderId = await generateOrderId();

    // Create order object with flat structure
    const order = new Order({
      orderId,
      customerId,
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      email: orderData.email,
      phoneNumber: orderData.phoneNumber,
      streetAddress: orderData.streetAddress,
      city: orderData.city,
      state: orderData.state,
      postalCode: orderData.postalCode,
      country: orderData.country,
      product: orderData.product,
      quantity: orderData.quantity || 1,
      unitPrice: orderData.unitPrice,
      totalAmount: orderData.totalAmount,
      status: orderData.status || "Pending",
      createdBy: orderData.createdBy,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const updateData = req.body;

    // Remove fields that shouldn't be updated
    delete updateData._id;
    delete updateData.orderId;
    delete updateData.customerId;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
