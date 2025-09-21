import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button-enhanced";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Bookmark, Share2, ArrowLeft } from "lucide-react";
import { usePostContext } from "@/context/PostContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { formatDate } from "@/utils/postHelpers";
import toast from "react-hot-toast";
import CommentPage from "./CommentPage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const {
    getPostById,
    likePost,
    unlikePost,
    bookmarkPost,
    unbookmarkPost,
    isBookmarked,
  } = usePostContext();
  const { user } = useAuth();

  const [post, setPost] = useState(null);

  // Fetch post
  useEffect(() => {
    if (id) {
      getPostById(id).then((data) => data && setPost(data));
    }
  }, [id, getPostById]);

  if (!post)
    return (
      <p
        className={`text-center py-20 font-[Inter] ${
          isDark ? "text-[#E2E8F0]" : "text-[#0B0F19]"
        } animate-fade-in`}
      >
        Loading post...
      </p>
    );

  const liked = user && post.likes.includes(user._id);
  const bookmarked = isBookmarked(post._id);

  const handleLike = async () => {
    if (!user) return toast.error("Login required");

    try {
      if (liked) {
        await unlikePost(post._id);
        setPost((prev) => ({
          ...prev,
          likes: prev.likes.filter((uid) => uid !== user._id),
        }));
        toast.success("Post unliked successfully!");
      } else {
        await likePost(post._id);
        setPost((prev) => ({
          ...prev,
          likes: [...prev.likes, user._id],
        }));
        toast.success("Post liked successfully!");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleBookmark = () => {
    if (bookmarked) {
      unbookmarkPost(post._id);
      toast("Bookmark removed", { icon: "🔖" });
    } else {
      bookmarkPost(post._id);
      toast.success("Post bookmarked!");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div
      className={`min-h-screen font-[Inter] ${
        isDark ? "bg-[#0B0F19]" : "bg-[#F8FAFC]"
      }`}
    >
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/">
          <Button
            variant="outline"
            size="sm"
            className={`mb-6 transition-all duration-300 hover:scale-105 ${
              isDark ? "hover:bg-[#3366FF33]" : "hover:bg-[#CCF9F9]"
            }`}
          >
            <ArrowLeft
              className={`h-4 w-4 mr-2 ${
                isDark
                  ? "text-[#0B0F19] hover:text-[#F8FAFC]"
                  : "text-[#0B0F19] "
              }`}
            />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <Card
          className={`shadow-[0_10px_40px_#3366FF33] border-0 mb-12 rounded-xl animate-fade-in ${
            isDark ? "bg-[#1E293B]" : "bg-[#FFFFFF]"
          }`}
        >
          <CardContent className="p-6 md:p-8 space-y-6">
            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-700 hover:scale-105 rounded-xl"
              />
            </div>

            {/* Category */}
            <span
              className={`text-sm font-medium px-4 py-1 rounded-full inline-block ${
                isDark
                  ? "bg-[#3366FF33] text-[#00CCCC]"
                  : "bg-[#CCF9F9] text-[#00CCCC]"
              }`}
            >
              {post.category}
            </span>

            {/* Title */}
            <h1
              className="text-3xl md:text-5xl font-[Poppins] font-bold leading-tight mb-4
                         bg-clip-text text-transparent 
                         bg-gradient-to-r from-[#3366FF] to-[#00CCCC]"
            >
              {post.title}
            </h1>

            {/* Author & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Author */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-[#3366FF33]">
                  {post.author?.avatar ? (
                    <AvatarImage src={post.author.avatar} />
                  ) : (
                    <AvatarFallback className="font-semibold">
                      {post.author?.username?.[0] || "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p
                    className={`${
                      isDark ? "text-[#E2E8F0]" : "text-[#0B0F19]"
                    } font-medium`}
                  >
                    {post.author?.username}
                  </p>
                  <p
                    className={`${
                      isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                    } text-xs`}
                  >
                    {formatDate(post.createdAt)} •{" "}
                    {post.readTime || "5 min read"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="gap-2 hover:scale-110 transition-transform duration-300"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      liked ? "fill-[#EF4444]" : "text-[#EF4444]"
                    }`}
                  />
                  {post.likes.length}
                </Button>
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={handleBookmark}
                  className={`hover:scale-110 transition-transform duration-300 ${
                    bookmarked
                      ? "bg-[#00CCCC]/20 hover:bg-[#00CCCC]/30 text-[#00CCCC]"
                      : isDark
                      ? "bg-[#1F2937] hover:bg-[#374151] text-[#E2E8F0]"
                      : "bg-white hover:bg-gray-100 text-[#0B0F19]"
                  }`}
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      bookmarked
                        ? "fill-[#00CCCC] text-[#00CCCC]"
                        : isDark
                        ? "text-[#E2E8F0]"
                        : "text-[#0B0F19]"
                    }`}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className={`hover:scale-110 transition-transform duration-300 ${
                    isDark
                      ? "bg-[#1F2937] hover:bg-[#374151] text-[#E2E8F0]"
                      : "bg-white hover:bg-gray-100 text-[#0B0F19]"
                  }`}
                >
                  <Share2
                    className={`h-4 w-4 ${
                      isDark ? "text-[#E2E8F0]" : "text-[#0B0F19]"
                    }`}
                  />
                </Button>
              </div>
            </div>

            {/* Summary */}

            <Card
              className={`mb-6 shadow-[0_10px_30px_#3366FF33] border-l-4 rounded-xl animate-slide-up ${
                isDark ? "border-l-[#00CCCC]" : "border-l-[#3366FF]"
              }`}
            >
              <CardContent className="p-6">
                <h2
                  className={`font-[Poppins] font-semibold text-2xl mb-2 ${
                    isDark ? "text-[#00CCCC]" : "text-[#3366FF]"
                  }`}
                >
                  Blog Summary
                </h2>
                <p
                  className={`leading-relaxed ${
                    isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                  }`}
                >
                  {post.summary}
                </p>
              </CardContent>
            </Card>

            {/* Description */}
            <div
              className={`prose prose-lg max-w-none leading-relaxed text-lg whitespace-pre-line font-[Inter] ${
                isDark ? "text-[#E2E8F0]" : "text-[#0B0F19]"
              }`}
            >
              {" "}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.description}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
        <CommentPage postId={post._id} isDark={isDark} />
      </div>
    </div>
  );
};

export default BlogDetailPage;
