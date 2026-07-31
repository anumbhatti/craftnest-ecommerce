const express = require("express");

const {
  getAllUsers,
  deleteUser,
  makeAdmin,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

// ================= Admin Routes =================

// Get All Users
router.get("/", protect, admin, getAllUsers);

// Delete User
router.delete("/:id", protect, admin, deleteUser);

// Make User Admin
router.put("/make-admin/:id", protect, admin, makeAdmin);

module.exports = router;