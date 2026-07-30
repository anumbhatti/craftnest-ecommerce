const express = require("express");

const {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add Review
router.post("/", protect, addReview);

// Get Reviews of a Product
router.get("/:productId", getProductReviews);

// Update Review
router.put("/:id", protect, updateReview);

// Delete Review
router.delete("/:id", protect, deleteReview);

module.exports = router;