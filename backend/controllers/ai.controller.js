const { generateSummary, generateContent } = require("../services/ai.service");

const getSummary = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({
            message: "Title is required"
        });

        const summary = await generateSummary(title);
        res.status(200).json({
            title, summary
        });
    } catch (err) {
        res.status(500).json({
            message: "Error generating summary", error: err.message
        });
    }
};

const getContent = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({
            message: "Title is required"
        });

        const content = await generateContent(title);
        res.status(200).json({
            title, content
        });
    } catch (err) {
        res.status(500).json({
            message: "Error generating content", error: err.message
        });
    }
};

module.exports = { getSummary, getContent, };
