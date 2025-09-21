const express = require("express");
const { signup, login, logout, getMe } = require("../controllers/auth.controller");
const { signupSchema, loginSchema } = require("../validation/auth.Validation");
const validate = require("../middleware/Validate");
const authMiddleware = require("../middleware/auth.Middleware");


const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

// Fetch profile
router.get("/me", authMiddleware, getMe);


module.exports = router;