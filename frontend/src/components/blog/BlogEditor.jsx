import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { usePostContext } from "@/context/PostContext";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MDEditor from "@uiw/react-md-editor";

import { Button } from "@/components/ui/button-enhanced";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  ArrowLeft,
  PenTool,
  FileText,
  Image as ImageIcon,
  Eye,
  Clock,
  Save,
  Send,
  Wand2,
  Upload,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import {
  generateSlug,
  calculateStats,
  formatTimeAgo,
  categories,
  cleanAIResponse,
} from "@/utils/bloghelpers";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const BlogEditor = () => {
  const { isDark } = useTheme();
  const { token } = useAuth();
  const { createPost } = usePostContext();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    description: "",
    category: "",
    image: "",
  });
  const [isDraft, setIsDraft] = useState(true);
  const [activeTab, setActiveTab] = useState("edit");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readTime, setReadTime] = useState("Less than 1 min read");
  const [lastSaved, setLastSaved] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSaveDraft = () => {
    localStorage.setItem("blogDraft", JSON.stringify(formData));
    setIsDraft(true);
    setLastSaved(new Date());
    toast.success("Draft saved successfully");
  };

  // Update slug when title changes
  useEffect(() => {
    handleInputChange("slug", generateSlug(formData.title));
  }, [formData.title]);

  // Update stats whenever description changes
  useEffect(() => {
    const { words, chars, readTime } = calculateStats(formData.description);
    setWordCount(words);
    setCharCount(chars);
    setReadTime(readTime);
  }, [formData.description]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange("image", file);

      setPreviewUrl(URL.createObjectURL(file));
      toast.success("Image selected!");
    }
  };

  // to handle post create
  const handlePublish = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Title, description, and category are required");
      return;
    }

    try {
      const postData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) postData.append(key, formData[key]);
      });

      await createPost(postData);
      toast.success("Post published successfully!");
      localStorage.removeItem("blogDraft");
      setFormData({
        title: "",
        summary: "",
        description: "",
        category: "",
        slug: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish post");
    }
  };

  // handle to generate summary
  const handleGenerateSummary = async () => {
    try {
      setIsGenerating(true);

      const response = await axios.post(
        "http://localhost:8000/api/ai/summary",
        { title: formData.title, wordLimit: 10 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cleaned = cleanAIResponse(response.data.summary);
      handleInputChange("summary", cleaned);

      toast.success("AI generated summary!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  };

  // handle to generate content
  const handleGenerate = async () => {
    try {
      setIsGenerating(true);

      const response = await axios.post(
        "http://localhost:8000/api/ai/content",
        { title: formData.title, wordLimit: 500 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cleaned = cleanAIResponse(response.data.content);
      handleInputChange("description", cleaned);

      toast.success("AI generated content!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className={`min-h-screen py-8 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="icon" className="text-[#3366FF]">
                <ArrowLeft />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#3366FF] to-[#00CCCC]">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Blog Editor</h1>
                <p className="text-sm text-muted-foreground">
                  Create and publish amazing content with AI assistance
                </p>
              </div>
            </div>
          </div>
          {isDraft && <Badge className="bg-purple-700 text-white">Draft</Badge>}
        </div>
        {/* Main editor cards go here (Post Details, Cover Image, Content Editor, Action Buttons, Preview) */}
        <div className="flex justify-center">
          {/* Editor */}
          <div className="max-w-6xl w-full space-y-6">
            {/* Post Details */}
            <Card
              className={`shadow-xl border-0 rounded-2xl animate-fade-in ${
                isDark
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gradient-to-br from-[#FFFFFF] to-[#F8FAFC] text-[#0B0F19]"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-inter text-lg">
                  <FileText
                    className={`w-6 h-6 ${
                      isDark ? "text-[#7F7FFF]" : "text-[#3366FF]"
                    }`}
                  />{" "}
                  Post Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Title */}
                <div>
                  <Label
                    className={`text-sm font-medium mb-3 block ${
                      isDark ? "text-gray-200" : "text-[#0B0F19]"
                    }`}
                  >
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="Enter blog title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={`text-xl h-12 rounded-xl mt-2 font-inter transition-all focus:ring-2 ${
                      isDark
                        ? "bg-gray-700 border-gray-600 focus:ring-[#7F7FFF] text-gray-100"
                        : "bg-[#FFFFFF]/70 border border-[#E2E8F0] focus:ring-[#3366FF]"
                    }`}
                  />
                </div>

                {/* Category + Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      className={`text-sm font-medium mb-3 block ${
                        isDark ? "text-gray-200" : "text-[#0B0F19]"
                      }`}
                    >
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger
                        className={`h-12 rounded-xl font-inter ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-[#FFFFFF]/70 border border-[#E2E8F0]"
                        }`}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                            className={isDark ? "text-gray-100" : ""}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      className={`text-sm font-medium mb-3 block ${
                        isDark ? "text-gray-200" : "text-[#0B0F19]"
                      }`}
                    >
                      URL Slug
                    </Label>
                    <Input
                      placeholder="url-friendly-slug"
                      value={formData.slug}
                      onChange={(e) =>
                        handleInputChange("slug", e.target.value)
                      }
                      className={`h-12 rounded-xl font-inter transition-all focus:ring-2 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 focus:ring-[#00CCCC] text-gray-100"
                          : "bg-[#FFFFFF]/70 border border-[#E2E8F0] focus:ring-[#00CCCC]"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card
              className={`shadow-xl border-0 rounded-2xl animate-fade-in ${
                isDark
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gradient-to-br from-[#FFFFFF] to-[#F8FAFC] text-[#0B0F19]"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-inter text-lg">
                  <ImageIcon
                    className={`w-6 h-6 ${
                      isDark ? "text-[#7F7FFF]" : "text-[#3366FF]"
                    }`}
                  />{" "}
                  Cover Image
                </CardTitle>
              </CardHeader>

              <CardContent>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                {formData.image ? (
                  <div className="relative group">
                    <img
                      src={previewUrl || formData.image}
                      alt="Cover preview"
                      className="w-full h-56 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-all"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className={`absolute top-4 right-4 rounded-lg transition-all backdrop-blur-sm ${
                        isDark
                          ? "bg-gray-700 hover:bg-gray-600/20"
                          : "bg-[#FFFFFF]/80 hover:bg-[#3366FF]/20"
                      }`}
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer group transition-all ${
                      isDark
                        ? "border-gray-600 bg-gray-700/30 hover:border-gray-500"
                        : "border-[#3366FF]/30 bg-gradient-to-br from-[#3366FF]/5 to-[#00CCCC]/5 hover:border-[#3366FF]/60"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-4 rounded-full mb-4 transition-colors ${
                          isDark
                            ? "bg-gray-600 group-hover:bg-gray-500"
                            : "bg-[#3366FF]/10 group-hover:bg-[#3366FF]/20"
                        }`}
                      >
                        <Upload
                          className={`w-8 h-8 ${
                            isDark ? "text-gray-100" : "text-[#3366FF]"
                          }`}
                        />
                      </div>
                      <p
                        className={`${
                          isDark ? "text-gray-100" : "text-[#0B0F19]"
                        } text-lg font-medium mb-2`}
                      >
                        Drop your cover image here, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Supports: JPG, PNG, GIF up to 10MB
                      </p>
                      <Button
                        variant="outline"
                        className={`mt-2 font-inter transition-all ${
                          isDark
                            ? "hover:bg-gray-600/20 bg-gray-100 text-[#3366FF]"
                            : "hover:bg-[#00CCCC]/10 hover:text-[#3366FF]"
                        }`}
                      >
                        Choose Image
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Summary Card */}
              <Card
                className={`shadow-xl border-0 rounded-2xl animate-fade-in ${
                  isDark
                    ? "bg-gray-800 text-gray-100"
                    : "bg-gradient-to-br from-[#FFFFFF] to-[#F8FAFC] text-[#0B0F19]"
                }`}
              >
                <CardContent className="p-6">
                  <Label
                    className={`text-sm font-medium mb-4 block font-inter ${
                      isDark ? "text-gray-200" : "text-[#0B0F19]"
                    }`}
                  >
                    Summary
                  </Label>

                  <Textarea
                    placeholder="Brief summary of your blog post..."
                    value={formData.summary}
                    onChange={(e) =>
                      handleInputChange("summary", e.target.value)
                    }
                    rows={4}
                    className={`resize-none rounded-xl p-3 font-inter text-sm leading-relaxed transition-all focus:ring-2 ${
                      isDark
                        ? "bg-gray-700 border-gray-600 focus:ring-[#7F7FFF] text-gray-100"
                        : "bg-[#FFFFFF]/70 border border-[#E2E8F0] focus:ring-[#3366FF]"
                    }`}
                  />
                </CardContent>

                {/* AI Generate Button */}
                <div className="flex justify-end pr-6 pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateSummary}
                    disabled={isGenerating}
                    className={`px-4 py-2 rounded-lg font-inter flex items-center transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                      isDark
                        ? "bg-gray-700/30 hover:bg-gray-600/20 text-gray-100"
                        : "bg-gradient-to-r from-[#3366FF]/10 to-[#00CCCC]/10 hover:from-[#3366FF]/20 hover:to-[#00CCCC]/20 text-[#0B0F19]"
                    }`}
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin text-[#3366FF]" />
                    ) : (
                      <Sparkles
                        className={`w-4 h-4 mr-2 ${
                          isDark ? "text-[#7F7FFF]" : "text-[#3366FF]"
                        }`}
                      />
                    )}
                    {isGenerating ? "Generating..." : "AI Generate"}
                  </Button>
                </div>
              </Card>
            </Card>

            {/* Content Editor */}
            <Card
              className={`shadow-xl border-0 rounded-2xl animate-fade-in ${
                isDark
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gradient-to-br from-[#FFFFFF] to-[#F8FAFC] text-[#0B0F19]"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg font-inter">
                      <PenTool
                        className={`w-5 h-5 ${
                          isDark ? "text-[#7F7FFF]" : "text-[#3366FF]"
                        }`}
                      />
                      Content Editor
                    </CardTitle>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Generate Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className={`bg-gradient-to-r from-[#6633CC]/10 to-[#FF66B2]/10 hover:from-[#6633CC]/20 hover:to-[#FF66B2]/20 transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                        isDark ? "text-gray-100" : "text-[#6633CC]"
                      }`}
                    >
                      {isGenerating ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin text-[#6633CC]" />
                      ) : (
                        <Wand2
                          className={`w-4 h-4 mr-2 ${
                            isDark ? "text-[#7F7FFF]" : "text-[#6633CC]"
                          }`}
                        />
                      )}
                      Generate
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  {/* Tab Switcher */}
                  <TabsList
                    className={`grid w-full grid-cols-2 rounded-md mb-2 ${
                      isDark ? "bg-gray-700" : "bg-[#6633CC]/10"
                    }`}
                  >
                    <TabsTrigger
                      value="edit"
                      className={`flex items-center gap-2 font-inter ${
                        isDark
                          ? "text-gray-100 data-[state=active]:bg-[#3366FF] data-[state=active]:text-white"
                          : "text-[#0B0F19] data-[state=active]:bg-[#3366FF] data-[state=active]:text-white"
                      }`}
                    >
                      <PenTool className="w-4 h-4" />
                      Edit
                    </TabsTrigger>
                    <TabsTrigger
                      value="preview"
                      className={`flex items-center gap-2 font-inter ${
                        isDark
                          ? "text-gray-100 data-[state=active]:bg-[#7F7FFF] data-[state=active]:text-white"
                          : "text-[#0B0F19] data-[state=active]:bg-[#6633CC] data-[state=active]:text-white"
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </TabsTrigger>
                  </TabsList>

                  {/* Edit Mode */}
                  <TabsContent value="edit" className="animate-slide-up">
                    <div
                      className={`rounded-xl border-2 overflow-hidden ${
                        isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-[#FFFFFF]/70 border-[#E2E8F0]"
                      }`}
                    >
                      {/* Markdown Toolbar */}
                      <div
                        className={`p-3 border-b flex flex-wrap gap-2 ${
                          isDark
                            ? "bg-gray-800 border-gray-600"
                            : "bg-[#FFFFFF] border-[#E2E8F0]"
                        }`}
                      ></div>

                      {/* MDEditor for live markdown rendering */}
                      <MDEditor
                        value={formData.description}
                        onChange={(value) =>
                          handleInputChange("description", value || "")
                        }
                        height={500}
                        visiableDragbar={false}
                        className={
                          isDark
                            ? "bg-gray-700 text-gray-100"
                            : "bg-white text-gray-900"
                        }
                        textareaProps={{
                          placeholder:
                            "Write your awesome blog content here...",
                        }}
                      />
                    </div>

                    {/* Stats */}
                    <div
                      className={`flex items-center justify-between text-sm p-4 rounded-xl mt-4 border ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gradient-to-r from-[#6633CC]/10 to-[#3366FF]/10 border-[#E2E8F0] text-[#64748B]"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[#6633CC]">•</span>
                        <span
                          className={`font-medium ${
                            isDark ? "text-[#7F7FFF]" : "text-[#3366FF]"
                          }`}
                        >
                          {wordCount} words
                        </span>
                        <span className="text-[#00CCCC]">•</span>
                        <span className="text-[#f17f15]">
                          {charCount} characters
                        </span>
                        <span className="text-[#FF4444]">•</span>
                        <span className="text-[#1FAA55]">{readTime}</span>
                      </div>
                      <div className="flex items-center font-medium">
                        <Clock className="w-4 h-4 mr-1" />
                        {lastSaved
                          ? `Auto-saved • ${formatTimeAgo(lastSaved)}`
                          : "Auto-saved • Just now"}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Preview Mode */}
                  <TabsContent value="preview" className="animate-slide-up">
                    <div
                      className={`p-8 rounded-xl border min-h-96 shadow-md ${
                        isDark
                          ? "bg-gray-800 border-gray-600 text-gray-100"
                          : "bg-[#FFFFFF]/70 border-[#E2E8F0] text-[#0B0F19]"
                      }`}
                    >
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Cover"
                          className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg animate-scale-in"
                        />
                      )}
                      <h1 className="text-4xl font-bold mb-4 font-inter">
                        {formData.title || "Your title will appear here"}
                      </h1>
                      {formData.category && (
                        <Badge
                          className={`mb-4 px-3 py-1 rounded-lg ${
                            isDark
                              ? "bg-[#7F7FFF] text-gray-100"
                              : "bg-[#3366FF] text-white"
                          }`}
                        >
                          {formData.category}
                        </Badge>
                      )}
                      {formData.summary && (
                        <p
                          className={`text-xl mb-6 leading-relaxed border-l-4 pl-4 italic ${
                            isDark
                              ? "border-[#7F7FFF] text-gray-200"
                              : "border-[#3366FF] text-[#64748B]"
                          }`}
                        >
                          {formData.summary}
                        </p>
                      )}
                      <div className="prose prose-lg max-w-none leading-relaxed p-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {formData.description ||
                            "Your content will appear here..."}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card
              className={`shadow-xl border-0 rounded-2xl animate-fade-in ${
                isDark
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gradient-to-br from-[#FFFFFF] to-[#F8FAFC] text-[#0B0F19]"
              }`}
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3
                    className={`text-lg font-semibold font-inter mb-2 ${
                      isDark ? "text-gray-100" : "text-[#0B0F19]"
                    }`}
                  >
                    Ready to save or publish your post?
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-[#64748B]"
                    }`}
                  >
                    Your content will be automatically optimized
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* Save Draft */}
                  <Button
                    variant="outline"
                    onClick={handleSaveDraft}
                    className={`px-8 py-3 rounded-lg font-inter border transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                      isDark
                        ? "text-gray-100 border-gray-600 bg-gray-700 hover:bg-gray-600"
                        : "text-[#6633CC] border-[#6633CC]/40 bg-[#6633CC]/10 hover:bg-[#6633CC]/20"
                    }`}
                  >
                    <Save
                      className={`w-4 h-4 mr-2 ${
                        isDark ? "text-gray-100" : "text-[#6633CC]"
                      }`}
                    />
                    Save Draft
                  </Button>

                  {/* Publish */}
                  <Button
                    onClick={handlePublish}
                    className={`px-8 py-3 rounded-lg font-inter shadow-md transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                      isDark
                        ? "bg-gradient-to-r from-[#7F7FFF] to-[#00CCCC] text-gray-100 hover:from-[#5F5FFF] hover:to-[#009999]"
                        : "bg-gradient-to-r from-[#3366FF] to-[#00CCCC] text-white hover:from-[#0033CC] hover:to-[#009999]"
                    }`}
                  >
                    <Send
                      className={`w-4 h-4 mr-2 ${
                        isDark ? "text-gray-100" : "text-white"
                      }`}
                    />
                    Publish
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
