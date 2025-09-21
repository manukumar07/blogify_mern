import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button-enhanced";
import { Home, ArrowLeft, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const NotFound = () => {
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center font-[Inter] ${
        isDark ? "bg-[#111827]" : "bg-[linear-gradient(180deg,#6633CC,#3366FF)]"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center animate-[fadeIn_0.6s_ease-out_forwards]">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${
              isDark
                ? "bg-[#6E59A533] text-[#FFFFFF] border border-[#6E59A533]"
                : "bg-[#3366FF1A] text-[#FFFFFF] border border-[#3366FF33]"
            }`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">404 Error</span>
          </div>

          <h1
            className={`text-6xl md:text-8xl font-bold mb-6 ${
              isDark ? "text-[#FFFFFF]" : "text-[#FFFFFF]"
            }`}
          >
            <span className="bg-gradient-to-r from-[#6E59A5] to-[#33C3F0] bg-clip-text text-transparent">
              404
            </span>
          </h1>

          <h2
            className={`text-2xl md:text-3xl font-semibold mb-4 ${
              isDark ? "text-[#FFFFFF]" : "text-[#FFFFFF]"
            }`}
          >
            Page Not Found
          </h2>

          <p
            className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDark ? "text-[#94A3B8]" : "text-[#F8FAFC]"
            }`}
          >
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className={`transition-all duration-300 ${
                isDark
                  ? "bg-[#3366FF] text-white hover:bg-[#0033CC]"
                  : "bg-[#3366FF] text-[#FFFFFF] hover:bg-[#0033CC]"
              }`}
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className={`transition-all duration-300 ${
                isDark
                  ? "border border-[#6B7280] text-[#3366FF] hover:bg-[#FFFFFF] hover:text-[#3366FF]"
                  : "border border-[#FFFFFF] text-[#3366FF] hover:bg-[#FFFFFF] hover:text-[#3366FF]"
              }`}
            >
              <Link
                to="/"
                onClick={() => window.history.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
