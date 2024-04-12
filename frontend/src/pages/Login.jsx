import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      // console.log(res.data)
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      {/* // this login and register ui used for a tailwindcss components merakui */}
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1>
          <Link to="/" className="text-blue-500">
            MERN -
          </Link>
          <span className="text-red-500"> Blogify</span>
        </h1>

        <h3 className="font-bold hover:underline">
          <Link to="/register">Register</Link>
        </h3>
      </div>
      {/* /// */}
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-24  h-96 border border-black ">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto"></div>

          <h3 className="mt-3 text-xl font-medium text-center text-black dark:text-gray-800 font-bold">
            Welcome Back
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-800 font-semibold">
            Login or create account
          </p>

          <form>
            <div class="w-full mt-6">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>

            <div className="w-full mt-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link
                to="#"
                className="text-sm text-gray-600 dark:text-gray-900 hover:text-gray-500"
              >
                Forgot Password?
              </Link>
              <button
                onClick={handleLogin}
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-00">
          <span className="text-sm text-gray-300 dark:text-gray-900 font-bold">
            Don't have an account?{" "}
          </span>

          <Link
            to="/register"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
