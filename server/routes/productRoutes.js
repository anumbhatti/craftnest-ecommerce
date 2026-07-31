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
const upload = require("../middleware/upload");

const router = express.Router();

// Public Routes
router.get("/", getProducts);
router.get("/:id", getSingleProduct);

// Admin Routes
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  addProduct
);

router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateProduct
);

router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;