const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

// Create a new order
orderRouter.post("/", orderController.createOrder);

// Get a specific order by ID
orderRouter.get("/:id", orderController.getOrderById);

// Update order status (e.g., cancel or complete)
orderRouter.put("/:id", orderController.updateOrderStatus);

// Cancel an order
orderRouter.delete("/:id", orderController.cancelOrder);

// List all orders (with optional query filters)
orderRouter.get("/", orderController.listOrders);

module.exports = orderRouter;
