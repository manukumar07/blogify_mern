import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-4 md:px-8 lg:px-[200px] mt-8 bg-[#F1F5F9] text-[#1E293B]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold md:text-3xl">{post.title}</h1>
            {user?._id === post?.userId && (
              <div className="flex items-center space-x-2">
                <p
                  className="cursor-pointer text-[#10B981]"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p
                  className="cursor-pointer text-[#EF4444]"
                  onClick={handleDeletePost}
                >
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toDateString()}</p>
              <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
            </div>
          </div>
          <img
            src={IF + post.photo}
            className="w-full mx-auto mt-8 rounded-lg shadow-md"
            alt=""
          />
          <p className="mx-auto mt-8 text-base md:text-lg">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex flex-wrap gap-2">
              {post.categories?.map((c, i) => (
                <div
                  key={i}
                  className="bg-[#F1F5F9] text-[#1E293B] rounded-lg px-3 py-1 border border-[#1E293B]"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold text-xl">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 border border-[#1E293B] rounded-md"
            />
            <button
              onClick={postComment}
              className="bg-[#1E293B] text-sm text-[#F1F5F9] px-4 py-2 md:w-[20%] mt-4 md:mt-0 rounded-md"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
