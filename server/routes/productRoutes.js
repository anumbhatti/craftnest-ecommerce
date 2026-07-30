const express = require("express");

const {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getProducts);
router.get("/:id", getSingleProduct);

// Admin Routes
router.post("/", protect, admin, addProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;