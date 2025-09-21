const express = require("express");
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost
} = require("../controllers/post.controller");
const validate = require("../middleware/Validate");
const postSchema = require("../validation/post.validation");
const upload = require("../utils/upload");
const authMiddleware = require("../middleware/auth.Middleware")

const router = express.Router();

// ✅ Public routes
router.get("/", getPosts);
router.get("/:id", getPostById);

// ✅ Protected routes 
router.post("/", authMiddleware, upload.single("image"), validate(postSchema), createPost);
router.put("/:id", authMiddleware, validate(postSchema), updatePost);
router.delete("/:id", authMiddleware, deletePost);


// Like/Unlike
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/unlike", authMiddleware, unlikePost);


module.exports = router;