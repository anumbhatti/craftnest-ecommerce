const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Add Product to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { product } = req.body;

    const productExists = await Product.findById(product);

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const alreadyExists = await Wishlist.findOne({
      user: req.user.id,
      product,
    });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Product already exists in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      product,
    });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Product from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id);

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    await wishlistItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};