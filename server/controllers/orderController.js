const Order = require("../models/orderModel");


//create order
const createOrder = async (req, res) => {
  try {
    const { venue, user, startDate, endDate, totalAmount } = req.body;

    // Check for overlapping bookings (if not handled at DB level)
    const conflictingOrder = await Order.findOne({
      venue,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
      orderStatus: { $ne: "cancelled" }
    });

    if (conflictingOrder) {
      return res.status(400).json({ message: "Venue is not available for the selected dates." });
    }

    const newOrder = new Order({ venue, user, startDate, endDate, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get order by id
const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate("venue user");
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  //update order status
  const updateOrderStatus = async (req, res) => {
    try {
      const { orderStatus } = req.body;
  
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { orderStatus },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  //cancel order 
  const cancelOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { orderStatus: "cancelled" },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      res.status(200).json({ message: "Order cancelled successfully.", order });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
  //list order  filter by user/venue
   const listOrders = async (req, res) => {
    try {
      const orders = await Order.find(req.query).populate("venue user");
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports={
    createOrder,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    listOrders
  }
  
  
