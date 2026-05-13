const express = require("express");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(protect, createTask)
  .get(protect, getTasks);

router
  .route("/:id")
  .put(protect, updateTaskStatus)
  .delete(protect, deleteTask);

module.exports = router;