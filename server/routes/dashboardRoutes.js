const express = require("express");

const { getDashboardStats } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", protect, admin, getDashboardStats);

module.exports = router;