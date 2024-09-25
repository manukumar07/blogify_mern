// routes/post.js
const express = require("express");
const router = express.Router();
// const verifyToken = require('../verifyToken');
const verifyToken = require("../middleware/VerifyToken");
const {
  createPost,
  updatePost,
  deletePost,
  getPostDetails,
  getAllPosts,
  getUserPosts,
} = require("../controllers/postController");

// CREATE POST
router.post("/create", verifyToken, createPost);

// UPDATE POST
router.put("/:id", verifyToken, updatePost);

// DELETE POST
router.delete("/:id", verifyToken, deletePost);

// GET POST DETAILS
router.get("/:id", getPostDetails);

// GET ALL POSTS WITH SEARCH QUERY
router.get("/", getAllPosts);

// GET USER POSTS
router.get("/user/:userId", getUserPosts);

module.exports = router;
