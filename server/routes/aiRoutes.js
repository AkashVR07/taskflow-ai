const express = require("express");

const router = express.Router();

const {
  generateProductivityTips,
  chatWithAI,
} = require("../controllers/aiController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post(
  "/suggestions",
  protect,
  generateProductivityTips
);

router.post(
  "/chat",
  protect,
  chatWithAI
);

module.exports = router;