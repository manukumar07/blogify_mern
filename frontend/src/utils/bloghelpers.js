export const generateSlug = (title) => {
    if (!title) return "";
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
};



// Calculate stats from content
export const calculateStats = (description = "") => {
    const textContent = description
        .replace(/[#*_`~[\]()]/g, "")
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\[.*?\]\(.*?\)/g, "")
        .trim();

    const words = textContent.split(/\s+/).filter(Boolean).length;
    const chars = description.length;
    const readTime =
        words === 0
            ? "Less than 1 min read"
            : `${Math.max(1, Math.ceil(words / 200))} min read`;

    return { words, chars, readTime };
};

export const cleanAIResponse = (text = "") => {
    return text
        .replace(/[#*@]/g, "")
        .replace(/\s{2,}/g, " ")
        .replace(/(\*\*|__)(.*?)\1/g, "$2")
        .replace(/(\*|_)(.*?)\1/g, "$2")
        .trim();
};

// Format time ago
export const formatTimeAgo = (date) => {
    if (!date) return "Just now";
    const diff = Math.floor((new Date() - date) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return `${Math.floor(diff / 86400)} days ago`;
};


export const categories = ["Technology", "Design", "Business", "Lifestyle", "Health", "Travel", "Food", "Science", "Art", "Music"];