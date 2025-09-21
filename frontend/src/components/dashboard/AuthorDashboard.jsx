import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-enhanced";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Heart,
  BookOpen,
  TrendingUp,
  Calendar,
  Edit,
  Trash2,
  Search,
  Plus,
  Settings,
  Save,
  X,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { usePostContext } from "@/context/PostContext";
import toast from "react-hot-toast";

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

const AuthorDashboard = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { posts, editPost, deletePost, loading, getPosts } = usePostContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "",
    description: "",
    summary: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Views Over Time (LineChart)
  const viewsData = useMemo(() => {
    const monthly = {};
    posts.forEach((p) => {
      const month = new Date(p.createdAt).toLocaleString("default", {
        month: "short",
      });
      monthly[month] = (monthly[month] || 0) + (p.views || 0);
    });
    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthOrder
      .filter((m) => monthly[m] !== undefined)
      .map((month) => ({ month, views: monthly[month] }));
  }, [posts]);

  // Posts by Category (PieChart)
  const categoryData = useMemo(() => {
    const counts = {};
    posts.forEach((p) => {
      counts[p.category || "Uncategorized"] =
        (counts[p.category || "Uncategorized"] || 0) + 1;
    });
    const colors = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"];
    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      color: colors[i % colors.length],
    }));
  }, [posts]);

  // Likes per post (BarChart)
  const likesData = useMemo(
    () => posts.map((p) => ({ post: p.title, likes: p.likes?.length || 0 })),
    [posts]
  );

  const handleEditPost = (post) => {
    setEditingPost(post);
    setEditFormData({
      title: post.title,
      category: post.category || "",
      description: post.description || "",
      summary: post.summary || "",
    });
    setIsEditModalOpen(true);
  };

  const handleSavePost = async () => {
    if (
      !editFormData.title ||
      !editFormData.category ||
      !editFormData.description
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);
      await editPost(editingPost._id, editFormData);
      toast.success("Post updated successfully");
      setIsEditModalOpen(false);
      setEditingPost(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent">
              Author Dashboard
            </h1>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Manage your content and track performance
            </p>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() => navigate("/write")}
          >
            <Plus className="h-4 w-4" />
            Create New Post
          </Button>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className={`${isDark ? "bg-gray-800" : "bg-white"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#3366FF]" />
                Views Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3366FF"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={`${isDark ? "bg-gray-800" : "bg-white"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#10B981]" />
                Posts by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Likes per Post */}
        <Card className={`${isDark ? "bg-gray-800" : "bg-white"} mb-8`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#EF4444]" />
              Engagement by Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={likesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="post" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="likes" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Posts Management */}
        <Card
          className={`${
            isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-4">
              <span className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Manage Posts
              </span>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex flex-col gap-1">
                  <Label
                    className={`${isDark ? "text-gray-100" : "text-gray-900"}`}
                  >
                    Search
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <Label
                    className={`${isDark ? "text-gray-100" : "text-gray-900"}`}
                  >
                    Category
                  </Label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`px-3 py-2 border rounded-md ${
                      isDark
                        ? "bg-gray-700 text-gray-100 border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    }`}
                  >
                    <option value="All">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {filteredPosts.length === 0 ? (
              <p className="text-muted-foreground">No posts found.</p>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post._id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg transition-colors group ${
                      isDark
                        ? "hover:bg-gray-700/30 border-gray-700"
                        : "hover:bg-gray-100/50 border-gray-200"
                    }`}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-14 h-14 rounded-md border-2 border-[#3366FF]"
                    />
                    <div className="flex-1 w-full">
                      <h3 className="font-semibold mb-1">{post.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">
                          {post.category || "Uncategorized"}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.likes?.length || 0}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPost(post)}
                        className={`flex items-center justify-center transition-colors duration-200 ${
                          isDark
                            ? "bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700"
                            : "bg-white text-gray-900 border-gray-200"
                        }`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`flex items-center justify-center transition-colors duration-200 ${
                              isDark
                                ? "bg-gray-800 text-red-400 border-gray-700 hover:bg-gray-700"
                                : "bg-white text-red-600 border-gray-200 "
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent
                          className={`${
                            isDark ? "bg-gray-800 text-gray-100" : ""
                          }`}
                        >
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{post.title}"?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              className={`${
                                isDark
                                  ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                              } px-3 py-1 rounded-md`}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeletePost(post._id)}
                              className={`${
                                isDark
                                  ? "bg-red-600 text-white hover:bg-red-500"
                                  : "bg-red-500 text-white hover:bg-red-600"
                              } px-3 py-1 rounded-md`}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent
            className={`max-w-2xl max-h-[90vh] overflow-y-auto ${
              isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className={`${
                    isDark ? "bg-gray-700 text-gray-100 border-gray-600" : ""
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={editFormData.category}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className={`${
                    isDark ? "bg-gray-700 text-gray-100 border-gray-600" : ""
                  }`}
                />
              </div>

              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={editFormData.summary}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  rows={3}
                  className={`${
                    isDark ? "bg-gray-700 text-gray-100 border-gray-600" : ""
                  }`}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={6}
                  className={`${
                    isDark ? "bg-gray-700 text-gray-100 border-gray-600" : ""
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  className={`flex items-center gap-2 transition-colors ${
                    isDark
                      ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>

                <Button
                  onClick={handleSavePost}
                  disabled={saving || loading}
                  className={`flex items-center gap-2 transition-colors ${
                    isDark
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AuthorDashboard;
