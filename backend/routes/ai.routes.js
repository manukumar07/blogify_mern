const express = require("express");
const { getSummary, getContent } = require("../controllers/ai.controller");
const authMiddleware = require("../middleware/auth.Middleware");

const router = express.Router();

// Protected routes
router.post("/summary", authMiddleware, getSummary);
router.post("/content", authMiddleware, getContent);

module.exports = router;
