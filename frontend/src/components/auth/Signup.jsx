import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-enhanced";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  PenTool,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { isDark } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
  };

  const validateSignupForm = () => {
    const { username, email, password, confirmPassword } = signupData;
    if (!username || !email || !password || !confirmPassword)
      return "All fields are required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    if (!acceptTerms) return "You must accept the Terms & Privacy Policy.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateSignupForm();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    setIsLoading(true);
    try {
      await signup(signupData.username, signupData.email, signupData.password);
      toast.success("🎉 Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Signup failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.success(`${provider} login coming soon ⚡`);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 ${
        isDark
          ? "bg-[#0B0F19] text-white"
          : "bg-gradient-to-br from-[#FFFFFF] via-[#FFFFFF] to-[#64748B]/20 text-[#0B0F19]"
      }`}
    >
      <div className="w-full max-w-lg">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${
                isDark ? "text-white hover:text-[#6366F1]" : ""
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <Card
          className={`shadow-elegant border-0 ${
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
              Create Account
            </CardTitle>
            <p className={`${isDark ? "text-[#94A3B8]" : "text-[#64748B]"}`}>
              Join Blogify and start sharing your stories
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className={isDark ? "text-[#F8FAFC]" : "text-[#0F172A]"}
                >
                  Username
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] h-4 w-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={signupData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className={`pl-10 py-2 ${
                      isDark
                        ? "bg-[#1F2937] border-[#374151] text-white"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0B0F19]"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={isDark ? "text-[#F8FAFC]" : "text-[#0F172A]"}
                >
                  Email
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 py-2 ${
                      isDark
                        ? "bg-[#1F2937] border-[#374151] text-white"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0B0F19]"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className={isDark ? "text-[#F8FAFC]" : "text-[#0F172A]"}
                >
                  Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={signupData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`pl-10 pr-10 py-2 ${
                      isDark
                        ? "bg-[#1F2937] border-[#374151] text-white"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0B0F19]"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p
                  className={
                    isDark
                      ? "text-[#94A3B8] text-xs mt-1"
                      : "text-[#64748B] text-xs mt-1"
                  }
                >
                  Password must be at least 8 characters long
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className={isDark ? "text-[#F8FAFC]" : "text-[#0F172A]"}
                >
                  Confirm Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`pl-10 pr-10 py-2 ${
                      isDark
                        ? "bg-[#1F2937] border-[#374151] text-white"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0B0F19]"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) =>
                    setAcceptTerms(checked === true)
                  }
                />
                <Label
                  htmlFor="terms"
                  className={`text-sm leading-none ${
                    isDark ? "text-[#F8FAFC]" : "text-[#0F172A]"
                  }`}
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#6366F1] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-[#6366F1] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Signup Button */}
              <Button
                type="submit"
                className={`w-full py-2 mt-2 ${
                  isDark
                    ? "bg-[#6E59A5] text-white hover:bg-[#7F70B8]"
                    : "bg-[#6366F1] text-white hover:bg-[#4F46E5]"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator
                  className={isDark ? "border-[#374151]" : "border-[#E2E8F0]"}
                />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className={
                    isDark
                      ? "bg-[#1F2937] px-2 text-[#94A3B8]"
                      : "bg-[#FFFFFF] px-2 text-[#64748B]"
                  }
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className={`w-full border ${
                  isDark
                    ? "border-[#374151] text-white bg-[#6633CC]"
                    : "border-[#E2E8F0] text-[#0B0F19] hover:bg-[#6633CC]"
                }`}
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
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
                    ? "border-[#374151] text-white bg-[#6633CC]"
                    : "border-[#E2E8F0] text-[#0B0F19] hover:bg-[#6633CC]"
                }`}
              >
                <svg className="h-4 w-4 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm mt-4">
              <span className={isDark ? "text-[#94A3B8]" : "text-[#64748B]"}>
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-[#6366F1] hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
