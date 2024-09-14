import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
    } catch {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-[#F1F5F9] px-4 py-12">
        <div className="w-full max-w-md bg-[#1E293B] text-[#F1F5F9] rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#F1F5F9] text-[#1E293B] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] sm:text-sm"
                placeholder="Your username"
              />
            </div>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#F1F5F9] text-[#1E293B] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] sm:text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-[#1E293B] mt-6" />
                ) : (
                  <FaEye className="text-[#1E293B]" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#10B981] text-[#F1F5F9] rounded-md hover:bg-[#0D9F6E] focus:ring-2 focus:ring-[#10B981]"
            >
              Register
            </button>
            <p className="text-lg text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-[#10B981] hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
