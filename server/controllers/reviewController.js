const Review = require("../models/Review");
const Product = require("../models/Product");

// Add Review
const addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    const productExists = await Product.findById(product);

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const alreadyReviewed = await Review.findOne({
      user: req.user.id,
      product,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await Review.create({
      user: req.user.id,
      product,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Product Reviews
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "name");

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
};