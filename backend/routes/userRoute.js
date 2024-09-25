// routes/user.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");

// UPDATE USER
router.put("/:id", verifyToken, updateUser);

// DELETE USER
router.delete("/:id", verifyToken, deleteUser);

// GET USER DETAILS
router.get("/:id", getUser);

module.exports = router;
