const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create new order
router.post("/", orderController.createOrder);

// Get all orders (with optional status filter and pagination)
router.get("/", orderController.getAllOrders);

// Get order by ID
router.get("/:id", orderController.getOrderById);

// Update order (can update any field)
router.patch("/:id", orderController.updateOrder);
router.put("/:id", orderController.updateOrder);

// Delete order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
