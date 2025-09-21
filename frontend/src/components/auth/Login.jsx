import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, PenTool } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = loginData;
    if (!email || !password) return "All fields are required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) return toast.error(errorMsg);

    setIsLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast.success("Welcome back! You have successfully logged in.");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.success(`${provider} login coming soon ⚡`);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 font-[Inter] ${
        isDark
          ? "bg-[#0B0F19] text-white"
          : "bg-[linear-gradient(180deg,#FFFFFF,#F8FAFC)] text-[#0B0F19]"
      }`}
    >
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${
                isDark ? "text-white hover:text-[#6366F1]" : "text-[#0B0F19]"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>

        <Card
          className={`shadow-lg border-0 rounded-xl animate-[scaleIn_0.4s_ease-out_forwards] ${
            isDark ? "bg-[#1F2937]" : "bg-[#FFFFFF]"
          }`}
        >
          <CardHeader className="text-center pb-6">
            <div className="mb-4 flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#3366FF] to-[#00CCCC] rounded-lg flex items-center justify-center shadow-soft hover-glow">
                <PenTool className="w-5 h-5 text-white" />
              </div>
            </div>
            <CardTitle
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-[#0F172A]"
              }`}
            >
              Welcome Back
            </CardTitle>
            <p className={`${isDark ? "text-[#94A3B8]" : "text-[#64748B]"}`}>
              Sign in to your Blogify account
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={`${isDark ? "text-white" : "text-[#0F172A]"}`}
                >
                  Email
                </Label>
                <div className="relative mt-2">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                    } h-4 w-4`}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleChange}
                    className={`pl-10 border rounded-md w-full py-2 ${
                      isDark
                        ? "border-[#374151] bg-[#1F2937] text-white placeholder:text-[#9CA3AF]"
                        : "border-[#E2E8F0] bg-[#FFFFFF] text-[#0B0F19] placeholder:text-[#64748B]"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className={`${isDark ? "text-white" : "text-[#0F172A]"}`}
                >
                  Password
                </Label>
                <div className="relative mt-2">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                    } h-4 w-4`}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleChange}
                    className={`pl-10 pr-10 border rounded-md w-full py-2 ${
                      isDark
                        ? "border-[#374151] bg-[#1F2937] text-white placeholder:text-[#9CA3AF]"
                        : "border-[#E2E8F0] bg-[#FFFFFF] text-[#0B0F19] placeholder:text-[#64748B]"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDark
                        ? "text-[#94A3B8] hover:text-white"
                        : "text-[#64748B] hover:text-[#0B0F19]"
                    }`}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className={`${
                    isDark ? "text-[#00CCCC]" : "text-[#3366FF]"
                  } text-sm hover:underline`}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className={`w-full py-2 rounded-md ${
                  isDark
                    ? "bg-[#00CCCC] text-white hover:bg-[#00baba]"
                    : "bg-[#00CCCC] text-white hover:bg-[#00baba]"
                } transition-all duration-300`}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator
                  className={`${
                    isDark ? "border-[#374151]" : "border-[#E2E8F0]"
                  }`}
                />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className={`${
                    isDark
                      ? "bg-[#1F2937] text-[#94A3B8]"
                      : "bg-[#FFFFFF] text-[#64748B]"
                  } px-2`}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className={`w-full border ${
                  isDark
                    ? "border-[#374151] text-white bg-[#6633CC] dark:bg-[#00CCCC]"
                    : "border-[#E2E8F0] text-[#0B0F19] hover:bg-[#6633CC] hover:text-white "
                }`}
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  {" "}
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("GitHub")}
                className={`w-full border ${
                  isDark
                    ? "border-[#374151] text-white bg-[#6633CC] dark:bg-[#00CCCC]"
                    : "border-[#E2E8F0] text-[#0B0F19] hover:bg-[#6633CC] hover:text-white "
                }`}
              >
                <svg className="h-4 w-4 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm mt-4">
              <span
                className={`${isDark ? "text-[#94A3B8]" : "text-[#64748B]"}`}
              >
                Don't have an account?{" "}
              </span>
              <Link
                to="/signup"
                className={`${
                  isDark ? "text-[#00CCCC]" : "text-[#3366FF]"
                } hover:underline font-medium`}
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
