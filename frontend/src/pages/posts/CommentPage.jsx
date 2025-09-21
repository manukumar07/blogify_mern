import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button-enhanced";
import axios from "axios";
import {
  MessageCircle,
  Send,
  Reply,
  Heart,
  Trash2,
  Edit,
  Check,
  X,
  MoreVertical,
} from "lucide-react";

const CommentPage = ({ postId, isDark }) => {
  const { token, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const API_BASE = "http://localhost:8000/api/comments";

  // Click outside menu to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/${postId}`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch comments error:", err.response?.data || err.message);
      setComments([]);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  // Add comment
  const handleAddComment = async () => {
    if (!comment.trim() || !token) return;

    try {
      const res = await axios.post(
        API_BASE,
        { postId, content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        setComments([res.data, ...comments]);
        setComment("");
      }
    } catch (err) {
      console.error("Add comment error:", err.response?.data || err.message);
    }
  };

  // Add reply
  const handleReply = async (commentId) => {
    if (!replyContent.trim() || !token) return;

    try {
      const res = await axios.post(
        `${API_BASE}/reply`,
        { commentId, content: replyContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? res.data : c))
        );
        setReplyContent("");
        setReplyingTo(null);
      }
    } catch (err) {
      console.error("Add reply error:", err.response?.data || err.message);
    }
  };

  // Like/unlike
  const handleCommentLike = async (id, isReply = false, parentId = null) => {
    if (!token) return;

    try {
      const res = await axios.post(
        `${API_BASE}/like`,
        { commentId: isReply ? parentId : id, replyId: isReply ? id : null },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) fetchComments();
    } catch (err) {
      console.error("Like error:", err.response?.data || err.message);
    }
  };

  // Delete
  const handleDeleteComment = async (id) => {
    if (!token) return;

    try {
      const url = `${API_BASE}/${id}`;
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) fetchComments();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  // to handle saveedit content
  const handleSaveEdit = async (id) => {
    if (!editContent.trim() || !token) return;

    try {
      const res = await axios.put(
        `${API_BASE}/${id}`,
        { content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setEditingComment(null);
        setEditContent("");
        fetchComments();
      }
    } catch (err) {
      console.error("Edit error:", err.response?.data || err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
  };

  const totalComments = Array.isArray(comments)
    ? comments.reduce(
        (total, c) =>
          total + 1 + (Array.isArray(c.replies) ? c.replies.length : 0),
        0
      )
    : 0;

  return (
    <div className="w-full mt-12">
      <Card
        className={`shadow-soft border-0 ${
          isDark ? "bg-[#1E293B]" : "bg-white"
        }`}
      >
        <CardContent className="p-8">
          <h3
            className={`text-2xl font-bold mb-8 flex items-center gap-3 ${
              isDark ? "text-[#E2E8F0]" : "text-[#0B0F19]"
            }`}
          >
            <MessageCircle className="h-6 w-6 text-primary" />
            Comments ({totalComments})
          </h3>

          {/* Add Comment */}
          <div
            className={`mb-8 p-6 rounded-lg border ${
              isDark
                ? "bg-[#0B0F19] border-[#334155]"
                : "bg-accent/5 border-accent/20"
            }`}
          >
            <Textarea
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`mb-4 ${
                isDark ? "bg-[#1E293B] text-[#E2E8F0]" : "bg-white"
              }`}
              rows={4}
            />
            <Button onClick={handleAddComment} disabled={!comment.trim()}>
              <Send className="h-4 w-4 mr-2" /> Post Comment
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-8">
            {Array.isArray(comments) &&
              comments.map((c) => (
                <div key={c._id} className="space-y-6">
                  <div
                    className={`flex gap-4 p-6 rounded-lg border transition-colors ${
                      isDark
                        ? "border-[#334155] hover:bg-[#0F172A]"
                        : "border-accent/20 hover:bg-accent/5"
                    }`}
                  >
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      {c.author?.avatar ? (
                        <AvatarImage src={c.author.avatar} />
                      ) : (
                        <AvatarFallback>
                          {c.author?.username ? c.author.username[0] : "?"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <p
                            className={`font-semibold ${
                              isDark ? "text-[#E2E8F0]" : "text-[#0B0F19]"
                            }`}
                          >
                            {c.author.username}
                          </p>
                          <p
                            className={`text-sm ${
                              isDark
                                ? "text-[#94A3B8]"
                                : "text-muted-foreground"
                            }`}
                          >
                            {new Date(c.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {/* 
                        {user?._id === c.author._id && ( */}
                        {user?.userId === c.author?._id && (
                          <div className="relative" ref={menuRef}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() =>
                                setOpenMenu(openMenu === c._id ? null : c._id)
                              }
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                            {openMenu === c._id && (
                              <div
                                className={`absolute right-0 top-8 rounded-md shadow-lg z-10 ${
                                  isDark
                                    ? "bg-[#1E293B] border border-[#334155]"
                                    : "bg-white border border-accent/20"
                                }`}
                              >
                                <div className="py-1">
                                  <button
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2"
                                    onClick={() => {
                                      setEditingComment(c._id);
                                      setEditContent(c.content);
                                      setOpenMenu(null);
                                    }}
                                  >
                                    <Edit className="h-3 w-3" /> Edit
                                  </button>
                                  <button
                                    className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-accent flex items-center gap-2"
                                    onClick={() => handleDeleteComment(c._id)}
                                  >
                                    <Trash2 className="h-3 w-3" /> Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Comment Content */}
                      {editingComment === c._id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className={`bg-background ${
                              isDark ? "bg-[#1E293B] text-[#E2E8F0]" : ""
                            }`}
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(c._id)}
                              disabled={!editContent.trim()}
                            >
                              <Check className="h-3 w-3 mr-1" /> Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelEdit}
                              className={`flex items-center transition-colors duration-200 ${
                                isDark
                                  ? "bg-[#1F2937] text-[#E2E8F0] border-[#374151] hover:bg-[#374151]"
                                  : "bg-white text-[#0B0F19] border-[#E2E8F0] hover:bg-[#E2E8F0] hover:text-white"
                              }`}
                            >
                              <X className="h-3 w-3 mr-1" /> Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p
                            className={`mb-4 leading-relaxed ${
                              isDark
                                ? "text-[#E2E8F0]"
                                : "text-muted-foreground"
                            }`}
                          >
                            {c.content}
                          </p>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3"
                              onClick={() => handleCommentLike(c._id)}
                            >
                              <Heart
                                className={`h-4 w-4 mr-2 ${
                                  c.likes.includes(user?._id)
                                    ? "fill-rose-500 text-rose-500"
                                    : ""
                                }`}
                              />{" "}
                              {c.likes.length}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3"
                              onClick={() =>
                                setReplyingTo(
                                  replyingTo === c._id ? null : c._id
                                )
                              }
                            >
                              <Reply className="h-4 w-4 mr-2" /> Reply
                            </Button>
                          </div>
                        </>
                      )}

                      {/* Reply Form */}
                      {replyingTo === c._id && (
                        <div
                          className={`mt-4 p-4 rounded-lg border ${
                            isDark
                              ? "bg-[#0F172A] border-[#334155]"
                              : "bg-accent/5 border-accent/20"
                          }`}
                        >
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className={`mb-3 ${
                              isDark
                                ? "bg-[#1E293B] text-[#E2E8F0]"
                                : "bg-white"
                            }`}
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleReply(c._id)}
                              disabled={!replyContent.trim()}
                            >
                              <Send className="h-4 w-4 mr-2" /> Reply
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent("");
                              }}
                              className={`transition-colors duration-200 ${
                                isDark
                                  ? "bg-[#1F2937] text-[#E2E8F0] border-[#374151] hover:bg-[#374151]"
                                  : "bg-white text-[#0B0F19] border-[#E2E8F0] hover:bg-[#E2E8F0] hover:text-white"
                              }`}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {c.replies.length > 0 && (
                        <div className="mt-6 pl-6 border-l-2 border-accent/20 space-y-4">
                          {c.replies.map((r) => (
                            <div
                              key={r._id}
                              className={`flex gap-3 p-4 rounded-lg ${
                                isDark
                                  ? "hover:bg-[#0F172A]"
                                  : "hover:bg-accent/5"
                              } transition-colors`}
                            >
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                {r.author?.avatar ? (
                                  <AvatarImage src={r.author.avatar} />
                                ) : (
                                  <AvatarFallback>
                                    {r.author?.username
                                      ? r.author.username[0]
                                      : "?"}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <p
                                    className={`font-semibold text-sm ${
                                      isDark
                                        ? "text-[#E2E8F0]"
                                        : "text-[#0B0F19]"
                                    }`}
                                  >
                                    {r.author.username}
                                  </p>
                                  <p
                                    className={`text-sm ${
                                      isDark
                                        ? "text-[#94A3B8]"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {new Date(r.createdAt).toLocaleString()}
                                  </p>
                                </div>
                                <p
                                  className={`text-sm leading-relaxed ${
                                    isDark
                                      ? "text-[#E2E8F0]"
                                      : "text-muted-foreground"
                                  } mb-3`}
                                >
                                  {r.content}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs"
                                  onClick={() =>
                                    handleCommentLike(r._id, true, c._id)
                                  }
                                >
                                  <Heart
                                    className={`h-3 w-3 mr-1 ${
                                      r.likes.includes(user?._id)
                                        ? "fill-rose-500 text-rose-500"
                                        : ""
                                    }`}
                                  />{" "}
                                  {r.likes.length}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentPage;
