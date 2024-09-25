const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
  createComment,
  updateComment,
  deleteComment,
  getPostComments,
} = require("../controllers/commentController");

// CREATE COMMENT
router.post("/create", verifyToken, createComment);

// UPDATE COMMENT
router.put("/:id", verifyToken, updateComment);

// DELETE COMMENT
router.delete("/:id", verifyToken, deleteComment);

// GET COMMENTS BY POST
router.get("/post/:postId", getPostComments);

module.exports = router;
