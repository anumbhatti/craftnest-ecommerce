const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const productExists = await Product.findById(product);

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cartItem = await Cart.findOne({
      user: req.user.id,
      product,
    });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cartItem,
      });
    }

    cartItem = await Cart.create({
      user: req.user.id,
      product,
      quantity: quantity || 1,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Cart
const getCart = async (req, res) => {
  try {

    const cart = await Cart.find({ user: req.user.id })
      .populate("product");

    res.status(200).json({
      success: true,
      count: cart.length,
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Cart Quantity
const updateCart = async (req, res) => {
  try {

    const cartItem = await Cart.findOne({
  _id: req.params.id,
  user: req.user.id,
});

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cartItem.quantity = req.body.quantity;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItem,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
  try {

    const cartItem = await Cart.findOne({
  _id: req.params.id,
  user: req.user.id,
});

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {

    await Cart.deleteMany({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
};