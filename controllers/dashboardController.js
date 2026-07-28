const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    let totalRevenue = 0;

    orders.forEach((order) => {
      totalRevenue += order.totalPrice;
    });

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      statistics: {
        totalUsers,
        totalProducts,
        totalCategories,
        totalOrders,
        totalRevenue,
      },
      recentOrders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};