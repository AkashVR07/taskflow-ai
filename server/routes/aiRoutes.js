const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  generateProductivityTips,
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/suggestions",
  protect,
  generateProductivityTips
);

module.exports = router;