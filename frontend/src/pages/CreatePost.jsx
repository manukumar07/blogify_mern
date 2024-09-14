import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1); // Corrected splice to remove the category
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  // const handleCreate = async (e) => {
  //   e.preventDefault();
  //   const post = {
  //     title,
  //     desc,
  //     username: user.username,
  //     userId: user._id,
  //     categories: cats,
  //   };

  //   if (file) {
  //     const data = new FormData();
  //     const filename = Date.now() + file.name;
  //     data.append("img", filename);
  //     data.append("file", file);
  //     post.photo = filename;
  //     try {
  //       await axios.post(URL + "/api/upload", data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/posts/create",
  //       post,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     navigate("/posts/post/" + res.data._id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        await axios.post(URL + "/api/upload", data, { withCredentials: true });
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-[#1E293B] text-[#F1F5F9] flex flex-col justify-between">
      <Navbar />
      <div className="container mx-auto max-w-6xl p-4 md:p-8 lg:p-12">
        {/* <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-6">
          Create a Post
        </h1> */}

        <div className="bg-[#0F172A] p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-6">
            Create a Post
          </h1>
          <form
            className="w-full flex flex-col space-y-4"
            onSubmit={handleCreate}
          >
            {/* Title Input */}
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter post title"
              className="px-4 py-2 bg-[#1E293B] text-[#F1F5F9] border border-gray-500 rounded-md w-full"
            />

            {/* File Input */}
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="px-4 py-2 bg-[#1E293B] text-[#F1F5F9] border border-gray-500 rounded-md w-full"
            />

            {/* Categories */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="px-4 py-2 bg-[#1E293B] text-[#F1F5F9] border border-gray-500 rounded-md flex-grow"
                  placeholder="Enter post category"
                  type="text"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="bg-[#10B981] text-white px-4 py-2 rounded-md font-semibold"
                >
                  Add
                </button>
              </div>

              {/* Added Categories */}
              <div className="flex flex-wrap mt-4 space-x-2">
                {cats?.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 mb-2 bg-[#F59E0B] px-3 py-1 rounded-md"
                  >
                    <p className="text-[#1E293B]">{c}</p>
                    <button
                      type="button"
                      onClick={() => deleteCategory(i)}
                      className="text-white bg-[#EF4444] rounded-full p-1"
                    >
                      <ImCross />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Input */}
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={10}
              className="px-4 py-2 bg-[#1E293B] text-[#F1F5F9] border border-gray-500 rounded-md w-full"
              placeholder="Enter post description"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#10B981] w-full md:w-1/2 lg:w-1/3 mx-auto text-white font-semibold px-4 py-2 rounded-md text-lg md:text-xl lg:text-2xl"
            >
              Create
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
