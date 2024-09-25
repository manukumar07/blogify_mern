import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
// import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-4 py-3 bg-[#F1F5F9] text-[#1E293B] rounded-lg my-2 shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#1E293B]">@{c.author}</h3>
        <div className="flex items-center space-x-4">
          <p>{new Date(c.updatedAt).toDateString()}</p>
          <p>{new Date(c.updatedAt).toLocaleTimeString()}</p>
          {user?._id === c?.userId && (
            <div className="flex items-center space-x-2">
              <p
                className="cursor-pointer text-[#EF4444]"
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
