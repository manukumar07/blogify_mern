import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      if (user?._id) {
        const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
        setPosts(res.data);

        // Check if no posts are found
        if (res.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoader(false); // Ensure loader is hidden after both success and error
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, user?._id]); // Include user._id to refetch if the user changes

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link
              key={post._id}
              to={user ? `/posts/post/${post._id}` : "/login"}
            >
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
