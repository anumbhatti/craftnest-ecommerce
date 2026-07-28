const express = require("express");

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addToCart);

router.get("/", protect, getCart);

router.put("/:id", protect, updateCart);

router.delete("/:id", protect, removeFromCart);

router.delete("/", protect, clearCart);

module.exports = router;