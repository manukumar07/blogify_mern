import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePostContext } from "@/context/PostContext";
import { useTheme } from "@/context/ThemeContext";
import { truncateText, formatDate } from "@/utils/postHelpers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button-enhanced";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Heart,
  Bookmark,
  Clock,
  Cpu,
  Monitor,
  Smartphone,
  LifeBuoy,
  Activity,
  Funnel,
} from "lucide-react";

const categoryIcons = {
  Technology: <Cpu className="w-4 h-4 inline-block mr-2" />,
  Design: <Monitor className="w-4 h-4 inline-block mr-2" />,
  "AI & ML": <Activity className="w-4 h-4 inline-block mr-2" />,
  Mobile: <Smartphone className="w-4 h-4 inline-block mr-2" />,
  Lifestyle: <LifeBuoy className="w-4 h-4 inline-block mr-2" />,
  Health: <Activity className="w-4 h-4 inline-block mr-2" />,
  Business: <Monitor className="w-4 h-4 inline-block mr-2" />,
  All: <Activity className="w-4 h-4 inline-block mr-2" />,
};

const CategoriesPage = () => {
  const { posts, loading, likePost, unlikePost } = usePostContext();
  const { isDark } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [dateRange, setDateRange] = useState("all-time");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "All",
    "Technology",
    "Design",
    "AI & ML",
    "Mobile",
    "Web Dev",
    "Lifestyle",
    "Health",
    "Business",
  ];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    // Only search by title
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    const today = new Date();
    const postDate = new Date(post.date);
    let matchesDate = true;

    if (dateRange === "last-day") {
      matchesDate = (today - postDate) / (1000 * 60 * 60) <= 24;
    } else if (dateRange === "last-week") {
      matchesDate = (today - postDate) / (1000 * 60 * 60 * 24) <= 7;
    } else if (dateRange === "last-month") {
      matchesDate =
        today.getMonth() === postDate.getMonth() &&
        today.getFullYear() === postDate.getFullYear();
    } else if (dateRange === "last-year") {
      matchesDate = today.getFullYear() === postDate.getFullYear();
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortBy === "most-liked") return b.likes.length - a.likes.length;
    return new Date(b.date) - new Date(a.date); // newest
  });

  const postsPerPage = 6;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  if (loading) return <p className="text-center mt-20">Loading posts...</p>;

  return (
    <div
      className={`${
        isDark ? "bg-[#111827]" : "bg-[#F8FAFC]"
      } min-h-screen py-20`}
    >
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-inter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3366FF] to-[#00CCCC]">
            All Categories
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto font-inter ${
              isDark ? "text-[#94A3B8]" : "text-[#64748B]"
            }`}
          >
            Discover articles across different topics and interests
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 sticky top-24">
            <h2
              className={`flex items-center gap-2 font-inter font-semibold mb-4 text-lg ${
                isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
              }`}
            >
              <Funnel
                className={`w-5 h-5 ${
                  isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                }`}
              />
              Categories
            </h2>
            {/* Category Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-sm ${
                    selectedCategory === cat.toLowerCase()
                      ? "bg-gradient-to-r from-[#3366FF] to-[#00CCCC] text-white shadow-lg"
                      : isDark
                      ? "bg-[#1F2937] text-[#94A3B8] hover:bg-[#374151]"
                      : "bg-[#E2E8F0] text-[#0B0F19] hover:bg-[#CBD5E1]"
                  }`}
                  onClick={() => setSelectedCategory(cat.toLowerCase())}
                >
                  <div className="flex items-center gap-3">
                    {/* Category Icon */}
                    <div
                      className={`p-2 rounded-full ${
                        selectedCategory === cat.toLowerCase()
                          ? "bg-white/20"
                          : isDark
                          ? "bg-[#374151]"
                          : "bg-[#E2E8F0]"
                      } flex items-center justify-center`}
                    >
                      {categoryIcons[cat]}
                    </div>

                    {/* Category Name */}
                    <span className="font-medium font-inter">{cat}</span>
                  </div>

                  {/* Filter Icon */}
                </div>
              ))}
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Top Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                  }`}
                />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 font-inter ${
                    isDark ? "bg-[#1F2937] text-[#F8FAFC] border-[#374151]" : ""
                  }`}
                />
              </div>

              {/* Sort + Date */}
              <div className="flex gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    className={`w-40 font-inter ${
                      isDark
                        ? "bg-[#1F2937] text-[#F8FAFC] border-[#374151]"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="most-liked">Most Liked</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger
                    className={`w-40 font-inter ${
                      isDark
                        ? "bg-[#1F2937] text-[#F8FAFC] border-[#374151]"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="last-day">Last Day</SelectItem>
                    <SelectItem value="last-week">Last Week</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => {
                const isLiked = post.likes?.includes(post._id);
                return (
                  <Card
                    key={post._id}
                    className={`group transition-all duration-300 hover:-translate-y-2  shadow-lg rounded-xl overflow-hidden ${
                      isDark
                        ? "bg-[#1F2937] border border-[#374151]"
                        : "bg-white border border-[#E2E8F0]"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="icon"
                        variant={post.isBookmarked ? "default" : "secondary"}
                        className={`absolute top-4 right-4 shadow-md ${
                          isDark
                            ? "bg-[#1F2937]/80 hover:bg-[#1F2937]"
                            : "bg-white/90 hover:bg-white"
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

                    <CardContent className="p-6">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full font-inter ${
                          isDark
                            ? "bg-[#3366FF33] text-[#3366FF]"
                            : "bg-[#3366FF1A] text-[#3366FF]"
                        }`}
                      >
                        {post.category}
                      </span>
                      <h3
                        className={`text-xl font-semibold mb-2 group-hover:text-[#3366FF] transition-colors line-clamp-2 font-inter ${
                          isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                        }`}
                      >
                        {post.title}
                      </h3>
                      <p
                        className={`mb-4 line-clamp-2 font-inter ${
                          isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                        }`}
                      >
                        {truncateText(post.description, 25)}{" "}
                        <Link
                          to={`/posts/${post._id}`}
                          className="ml-1 text-[#3366FF] hover:underline"
                        >
                          Read More
                        </Link>
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={post?.author?.avatar || ""}
                              alt={post?.author?.username}
                            />

                            <AvatarFallback className="text-xs">
                              {post?.author?.username
                                ?.charAt(0)
                                .toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p
                              className={`text-sm font-medium font-inter ${
                                isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                              }`}
                            >
                              {post?.author?.username || "Unknown Author"}
                            </p>
                            <p
                              className={`text-xs font-inter ${
                                isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                              }`}
                            >
                              {formatDate(post.date)}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`flex items-center gap-3 text-sm font-inter ${
                            isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                          }`}
                        >
                          <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() =>
                              isLiked
                                ? unlikePost(post._id)
                                : likePost(post._id)
                            }
                          >
                            <Heart
                              className={`h-4 w-4 transition-colors duration-200 ${
                                isLiked
                                  ? "fill-[#EF4444] text-[#EF4444]"
                                  : isDark
                                  ? "text-[#94A3B8]"
                                  : "text-[#64748B]"
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
                            <Clock className="h-4 w-4" />{" "}
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={`px-3 py-1 rounded-md ${
                          isDark
                            ? "bg-[#1F2937] text-white hover:bg-[#374151]"
                            : "bg-[#E2E8F0] text-[#0B0F19] hover:bg-[#CBD5E1]"
                        }`}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i + 1);
                          }}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === i + 1
                              ? "bg-[#3366FF] text-white"
                              : isDark
                              ? "bg-[#1F2937] text-white hover:bg-[#374151]"
                              : "bg-[#E2E8F0] text-[#0B0F19] hover:bg-[#CBD5E1]"
                          }`}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                        className={`px-3 py-1 rounded-md ${
                          isDark
                            ? "bg-[#1F2937] text-white hover:bg-[#374151]"
                            : "bg-[#E2E8F0] text-[#0B0F19] hover:bg-[#CBD5E1]"
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p
                  className={`text-lg font-inter ${
                    isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                  }`}
                >
                  No articles found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 font-inter"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSortBy("newest");
                    setDateRange("all-time");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
