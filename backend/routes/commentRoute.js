// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const Post = require("../models/Post");
// const Comment = require("../models/Comment");
// const VerifyToken = require("../VerifyToken");

// //CREATE
// router.post("/create", VerifyToken, async (req, res) => {
//   try {
//     const newComment = new Comment(req.body);
//     const savedComment = await newComment.save();
//     res.status(200).json(savedComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //UPDATE
// router.put("/:id", VerifyToken, async (req, res) => {
//   try {
//     const updatedComment = await Comment.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //DELETE
// router.delete("/:id", VerifyToken, async (req, res) => {
//   try {
//     await Comment.findByIdAndDelete(req.params.id);

//     res.status(200).json("Comment has been deleted!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET POST COMMENTS
// router.get("/post/:postId", async (req, res) => {
//   try {
//     const comments = await Comment.find({ postId: req.params.postId });
//     res.status(200).json(comments);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
// routes/comment.js
const express = require("express");
const router = express.Router();
// const verifyToken = require("../verifyToken");
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
