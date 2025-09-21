const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { message } = require("../validation/post.validation");

// 🔐 Signup user
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);

        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// 🔐 Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// Logout
const logout = async (req, res) => {
    res.status(200).json({
        message: "Logged out successfully"
    });
};

// 👤 Get Logged-in User Profile
const getMe = async (req, res) => {
    try {
        // req.user comes from auth middleware
        const user = await User.findById(req.user._id).select("username email avatar");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User profile fetched successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch profile", error: error.message
        });
    }
};

module.exports = { signup, login, logout, getMe };
