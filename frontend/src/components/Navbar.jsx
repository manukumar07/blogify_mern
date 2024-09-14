import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-[200px] py-4 bg-[#1E293B] text-[#F1F5F9] ">
      {/* Logo aligned to the left */}
      <div className="flex-shrink-0">
        <h1 className="item-left md:text-3xl font-extrabold text-[#F59E0B] mb-2 mr-10">
          <Link to="/">Blogify</Link>
        </h1>
      </div>

      {/* Search Bar (only on the homepage) */}
      {path === "/" && (
        <div className="relative w-96 max-w-[400px] md:max-w-[500px] mx-4">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-full bg-[#F1F5F9] text-[#1E293B] placeholder-[#1E293B] outline-none"
            placeholder="Search a post"
            type="text"
          />
          <button
            onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1E293B]"
          >
            <BsSearch />
          </button>
        </div>
      )}

      {/* Desktop Links aligned to the right */}
      <div className="hidden md:flex items-center space-x-4 gap-2">
        {user ? (
          <h3>
            <Link
              to="/write"
              className="hover:text-[#F59E0B] font-bold text-md"
            >
              Write
            </Link>
          </h3>
        ) : (
          <button className="bg-[#F59E0B] text-[#F1F5F9] px-4 py-2 rounded-lg hover:bg-[#D97706] font-extrabold">
            <Link to="/login">Login</Link>
          </button>
        )}

        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              {menu ? <FaTimes /> : <FaBars />}
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <button className="bg-[#10B981] text-[#F1F5F9] px-4 py-2 rounded-lg hover:bg-[#10B981] font-extrabold">
            <Link to="/register">Register</Link>
          </button>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div onClick={showMenu} className="md:hidden text-lg cursor-pointer">
        {menu ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu (visible when the hamburger menu is open) */}
      {menu && <Menu />}
    </div>
  );
};

export default Navbar;
