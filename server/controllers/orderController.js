const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ================= Place Order =================
const placeOrder = async (req, res) => {
  try {
    const {
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    // Clear User Cart
    await Cart.deleteMany({
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Logged-in User Orders =================
const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id,
    }).populate("orderItems.product");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get Single Order =================
const getSingleOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get All Orders (Admin) =================
const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Update Order Status =================
const updateOrderStatus = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = req.body.orderStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
};