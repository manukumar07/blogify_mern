const Post = require("../models/Post");

// helper function
const calculateReadTime = (text) => {
    if (!text) return "Less than 1 min read";
    const words = text.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
};


// ✅ Create Post
const createPost = async (req, res) => {
    try {
        const { title, description, slug, category, summary } = req.body;


        if (!title || !description || !slug || !category) {
            return res.status(400).json({
                message: "Title, description, slug, and category are required"
            });
        }


        //  agar image upload hui ho
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newPost = new Post({
            title,
            description,
            slug,
            category,
            image,
            summary,
            author: req.user._id,
            readTime: calculateReadTime(description),
        });

        const savedPost = await newPost.save();
        res.status(201).json({
            message: "Post created successfully", post: savedPost
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating post", error: error.message
        });
    }
};

// Get all posts (with author info)
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username avatar");
        res.json({
            message: "Posts fetched successfully", posts
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: "Internal server error", error: err.message
        });
    }
};

// Get a single post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "username  avatar");
        if (!post) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post fetched successfully", post
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching post", error: error.message
        });
    }
};

// Update a post
const updatePost = async (req, res) => {
    try {
        const { title, category, description, summary } = req.body;

        const updatedData = {
            title,
            category,
            description,
            summary,
            readTime: calculateReadTime(description),
        };

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedPost) return res.status(404).json({
            message: "Post not found"
        });

        res.json({
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update post", error: error.message
        });
    }
};


// Delete a post
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting post", error: error.message
        });
    }
};

// Like a post
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Check if user already liked
        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({
                message: "You have already liked this post"
            });
        }

        post.likes.push(req.user._id);
        await post.save();

        res.status(200).json({
            message: "Post liked successfully", likes: post.likes.length
        });
    } catch (error) {
        res.status(500).json({
            message: "Error liking post", error: error.message
        });
    }
};

// Unlike a post
const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({
            message: "Post not found"
        });

        // Check if user has liked
        if (!post.likes.includes(req.user._id)) {
            return res.status(400).json({
                message: "You have not liked this post"
            });
        }

        post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
        await post.save();

        res.status(200).json({
            message: "Post unliked successfully", likes: post.likes.length
        });
    } catch (error) {
        res.status(500).json({
            message: "Error unliking post", error: error.message
        });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost
};
