import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const API_URL = "http://localhost:8000/api/posts";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  // --- fetch all posts ---
  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- fetch single post ---
  const getPostById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return response.data.post;
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // --- create post ---
  const createPost = async (newPost) => {
    try {
      const response = await axios.post(API_URL, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPosts((prevPosts) => [response.data.post, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // --- edit post ---
  const editPost = async (id, updatedPost) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // update local state
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === id ? response.data.data : post))
      );
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  // --- delete post ---
  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // --- like post ---
  const likePost = async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id
            ? { ...post, likes: [...post.likes, response.data.userId] }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // --- unlike post ---
  const unlikePost = async (id) => {
    try {
      await axios.post(
        `${API_URL}/${id}/unlike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const userId = JSON.parse(atob(token.split(".")[1])).userId;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id
            ? { ...post, likes: post.likes.filter((uid) => uid !== userId) }
            : post
        )
      );
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  // --- bookmark a post (frontend only) ---
  const bookmarkPost = (postId) => {
    setBookmarks((prev) => {
      const updated = [...prev, postId];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  // --- remove bookmark ---
  const unbookmarkPost = (postId) => {
    setBookmarks((prev) => {
      const updated = prev.filter((id) => id !== postId);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  // --- check if bookmarked ---
  const isBookmarked = (postId) => bookmarks.includes(postId);

  // --- load bookmarks from localStorage on mount ---
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(saved);
  }, []);

  // --- fetch posts on mount ---
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        getPosts,
        createPost,
        editPost,
        deletePost,
        likePost,
        unlikePost,
        getPostById,
        bookmarkPost,
        unbookmarkPost,
        isBookmarked,
        bookmarks,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
