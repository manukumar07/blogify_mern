const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Add a comment to a post
const addComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        if (!postId || !content)
            return res.status(400).json({
                message: "Post ID and content are required"
            });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({
            message: "Post not found"
        });

        const comment = await Comment.create({
            post: postId,
            author: req.user._id,
            content,
        });
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Add a reply to a comment
const addReply = async (req, res) => {
    try {
        const { commentId, content } = req.body;
        if (!content) return res.status(400).json({
            message: "Content is required"
        });

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({
            message: "Comment not found"
        });

        comment.replies.push({ author: req.user._id, content });
        await comment.save();
        await comment.populate("replies.author", "username avatar");
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Like or unlike comment/reply
const toggleLike = async (req, res) => {
    try {
        const { commentId, replyId } = req.body;
        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (replyId) {
            const reply = comment.replies.id(replyId);
            if (!reply) return res.status(404).json({ message: "Reply not found" });

            reply.likes.includes(req.user._id)
                ? reply.likes.pull(req.user._id)
                : reply.likes.push(req.user._id);
        } else {
            comment.likes.includes(req.user._id)
                ? comment.likes.pull(req.user._id)
                : comment.likes.push(req.user._id);
        }

        await comment.save();
        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Delete comment 
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await comment.deleteOne();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
// Get all comments for a post
const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId })
            .populate("author", "username avatar")
            .populate("replies.author", "username avatar")
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addComment, addReply, toggleLike, deleteComment, getComments };
