const Joi = require("joi");

// Email Regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// Password: 8+ characters, uppercase, lowercase, number, special char
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

// Signup schema
const signupSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.base": "Username must be a string",
            "string.min": "Username must be at least 3 characters",
            "any.required": "Username is required",
        }),

    email: Joi.string()
        .pattern(emailPattern)
        .required()
        .messages({
            "string.pattern.base": "Invalid email format",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .pattern(passwordPattern)
        .required()
        .messages({
            "string.pattern.base":
                "Password must be 8+ characters, include uppercase, lowercase, number, and special character",
            "any.required": "Password is required",
        }),

    // Optional: confirmPassword only if frontend sends it
    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .optional()
        .messages({
            "any.only": "Passwords do not match",
        }),
});

// Login schema
const loginSchema = Joi.object({
    email: Joi.string()
        .pattern(emailPattern)
        .required()
        .messages({
            "string.pattern.base": "Invalid email format",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .pattern(passwordPattern)
        .required()
        .messages({
            "string.pattern.base":
                "Password must be 8+ characters, include uppercase, lowercase, number, and special character",
            "any.required": "Password is required",
        }),
});

module.exports = { signupSchema, loginSchema };
