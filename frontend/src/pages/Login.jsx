import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.error("Login error:", err.response?.data || err.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#F1F5F9] px-4 py-12">
        <div className="w-full max-w-md bg-[#1E293B] text-[#F1F5F9] rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#F1F5F9] text-[#1E293B] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#F1F5F9] text-[#1E293B] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] sm:text-sm "
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center mt-6"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-[#1E293B]" />
                ) : (
                  <FaEye className="text-[#1E293B]" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#10B981] text-[#F1F5F9] rounded-md hover:bg-[#0D9F6E] focus:ring-2 focus:ring-[#10B981]"
            >
              Login
            </button>
            {error && (
              <h3 className="text-[#EF4444] text-sm">Something went wrong</h3>
            )}
            <p className="text-lg text-center text-gray-400">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#10B981] hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
