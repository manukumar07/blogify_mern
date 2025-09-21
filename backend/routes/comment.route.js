const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.Middleware");
const {
    addComment,
    addReply,
    toggleLike,
    deleteComment,
    getComments,
} = require("../controllers/comment.controller");

// Public route
router.get("/:postId", getComments);

// Protected routes
router.post("/", authMiddleware, addComment);
router.post("/reply", authMiddleware, addReply);
router.post("/like", authMiddleware, toggleLike);
router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;
