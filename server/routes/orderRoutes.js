const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// User Routes
router.post("/", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getSingleOrder);

// Admin Routes
router.get("/", protect, getAllOrders);
router.put("/:id", protect, updateOrderStatus);

module.exports = router;