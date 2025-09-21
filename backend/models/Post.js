const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    summary: {
        type: String,
        default: "",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    readTime: { type: String, default: "Less than 1 min read" },
    date: {
        type: Date,
        default: () => Date.now(),
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},

    { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
