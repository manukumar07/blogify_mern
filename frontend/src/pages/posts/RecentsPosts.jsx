import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button-enhanced";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Bookmark, Clock } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { usePostContext } from "@/context/PostContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { truncateText, formatDate } from "@/utils/postHelpers";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RecentPosts = () => {
  const { isDark } = useTheme();
  const {
    posts,
    getPosts,
    likePost,
    unlikePost,
    bookmarkPost,
    unbookmarkPost,
    isBookmarked,
  } = usePostContext();
  const { user } = useAuth();

  // --- helpers ---
  const isPostLiked = (post) => user && post.likes.includes(user._id);
  const isPostBookmarked = (postId) => isBookmarked(postId);

  // handle like and unlike
  const handleLike = async (post) => {
    try {
      if (isPostLiked(post)) {
        await unlikePost(post._id);
        toast.success("Post unliked successfully!");
      } else {
        await likePost(post._id);
        toast.success("Post liked successfully!");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  // handle bookmark
  const handleBookmark = (postId) => {
    if (isPostBookmarked(postId)) {
      unbookmarkPost(postId);
      toast("Bookmark removed", { icon: "🔖" });
    } else {
      bookmarkPost(postId);
      toast.success("Post bookmarked!");
    }
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!posts || posts.length === 0) {
    return (
      <section
        className={`py-20 font-[Inter] ${
          isDark ? "bg-[#0B0F19]" : "bg-[#FFFFFF]"
        }`}
      >
        <div className="container mx-auto px-4 max-w-[1440px] text-center">
          <h2
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            No posts available
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-2`}>
            Check back later for updates.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-20 font-[Inter] ${
        isDark ? "bg-[#0B0F19]" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-12 animate-[fadeIn_0.8s_ease-out]">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent mb-4">
            Recent{" "}
            <span className="bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent">
              Posts
            </span>
          </h2>
          <p
            className={`${
              isDark ? "text-[#94A3B8]" : "text-[#64748B]"
            } text-lg max-w-2xl mx-auto`}
          >
            Discover the latest insights, tutorials, and thoughts from our
            community of writers
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const liked = isPostLiked(post);
            return (
              <Card
                key={post._id}
                className={`group relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-[fadeIn_0.8s_ease-out] ${
                  isDark
                    ? "bg-[#1F2937] border-[#374151]"
                    : "bg-[#FFFFFF] border-[#E2E8F0]"
                }`}
              >
                {/* Post Image + Bookmark */}
                <Link to={`/blog/${post._id}`}>
                  <div className="relative">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <Button
                      onClick={() => handleBookmark(post._id)}
                      size="icon"
                      variant="secondary"
                      className={`absolute top-4 right-4 shadow-md ${
                        isDark
                          ? "bg-[#1F2937]/80 hover:bg-[#1F2937]"
                          : "bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] "
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 transition-colors duration-200 ${
                          post.isBookmarked
                            ? "fill-[#3366FF] text-[#3366FF]"
                            : isDark
                            ? "text-[#FBBF24]"
                            : "text-gray-800"
                        }`}
                      />
                    </Button>
                  </div>
                </Link>

                {/* Post Content */}
                <CardContent className="p-6">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        isDark
                          ? "bg-[#3366FF]/20 text-[#00CCCC]"
                          : "bg-[#3366FF]/10 text-[#3366FF]"
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-semibold mb-2 transition-colors ${
                      isDark
                        ? "text-white group-hover:text-[#00CCCC]"
                        : "text-[#0B0F19] group-hover:text-[#3366FF]"
                    }`}
                  >
                    {post.title}
                  </h3>

                  {/* Description */}
                  <div
                    className={`${
                      isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                    } text-sm leading-relaxed mb-4 prose`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {truncateText(post.description, 25)}
                    </ReactMarkdown>
                  </div>

                  {/* Footer: Author + Actions */}
                  <div className="flex items-center justify-between">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {post.author?.avatar ? (
                          <AvatarImage src={post.author.avatar} />
                        ) : (
                          <AvatarFallback className="text-xs">
                            {post.author?.initials || "?"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p
                          className={`${
                            isDark ? "text-white" : "text-[#0B0F19]"
                          } text-sm font-medium`}
                        >
                          {post.author?.username}
                        </p>
                        <p
                          className={`${
                            isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                          } text-xs`}
                        >
                          {formatDate(post.date)}
                        </p>
                      </div>
                    </div>

                    {/* Like + ReadTime */}
                    <div className="flex items-center gap-3 text-sm">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleLike(post)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            liked
                              ? "fill-[#EF4444] text-[#EF4444]"
                              : "text-[#EF4444]"
                          }`}
                        />
                        <span
                          className={`${
                            isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                          }`}
                        >
                          {post.likes.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-[#3B82F6]" />
                        <span
                          className={`${
                            isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                          }`}
                        >
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 animate-[fadeIn_0.8s_ease-out]">
          <Link to="/categories">
            <Button
              variant="default"
              size="lg"
              className={`px-6 py-3 rounded-full font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-[#00CCCC] to-[#3366FF] text-[#0B0F19]"
                  : "bg-gradient-to-r from-[#3366FF] to-[#00CCCC] text-[#FFFFFF]"
              }`}
            >
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
