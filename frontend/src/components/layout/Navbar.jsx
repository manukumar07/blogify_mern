import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button-enhanced";
import {
  Moon,
  Sun,
  Menu,
  X,
  PenTool,
  Home,
  Grid3x3,
  Info,
  MessageCircle,
  LogIn,
  UserPlus,
  PencilLine,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, token } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/categories", label: "Categories", icon: Grid3x3 },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: MessageCircle },
  ];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-[#FFFFFF]/95 backdrop-blur-xl dark:bg-[#0B0F19]/95 animate-fade-in">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="flex items-center justify-between h-16 animate-slide-up">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover-scale animate-scale-in"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-[#3366FF] to-[#00CCCC] rounded-lg flex items-center justify-center shadow-soft hover-glow">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3366FF] to-[#00CCCC] font-[Inter]">
              Blogify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 animate-slide-up">
            {navLinks.map(({ to, label, icon: Icon }, i) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 font-[Inter] animate-fade-in ${
                  isActiveLink(to)
                    ? "bg-[#3366FF]/10 text-[#3366FF] font-medium"
                    : "text-[#64748B] hover:text-[#0B0F19] hover:bg-[#F8FAFC] hover:dark:text-[#3366FF]"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 animate-slide-up">
            {user && token && (
              <Button
                asChild
                size="sm"
                className="flex items-center space-x-2 bg-gradient-to-r from-[#6633CC] to-[#3366FF] text-white px-3 py-1 rounded-lg shadow-elegant hover-lift animate-scale-in"
              >
                <Link to="/write">
                  <PencilLine className="w-4 h-4" />
                  <span>Write</span>
                </Link>
              </Button>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover-scale hover-glow"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-[#FFCC00] animate-glow" />
              ) : (
                <Moon className="h-5 w-5 text-[#0B0F19]" />
              )}
            </Button>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-2 animate-scale-in">
              {user && token ? (
                <UserMenu />
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-[#3d3d3e] hover:bg-[#6633CC] hover:text-white dark:hover:text-white animate-fade-in dark:text-white"
                  >
                    <Link to="/login">
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="flex items-center space-x-2 bg-gradient-to-r from-[#6633CC] to-[#3366FF] text-white px-3 py-1 rounded-lg shadow-elegant hover-lift animate-scale-in"
                  >
                    <Link to="/signup">
                      <UserPlus className="w-4 h-4" />
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover-scale"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-[#0B0F19] dark:text-white" />
              ) : (
                <Menu className="h-5 w-5 text-[#0B0F19] dark:text-white" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in border-t border-[#E2E8F0] dark:text-white">
            {navLinks.map(({ to, label, icon: Icon }, i) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 font-[Inter] hover-lift animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-4 space-y-4 border-t border-[#E2E8F0] animate-scale-in">
              {user && token ? (
                <>
                  <Link to="/write" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-48 justify-start space-x-2 bg-gradient-to-r from-[#6633CC] to-[#3366FF] text-white px-3 py-2 rounded-lg shadow-elegant">
                      <PencilLine className="w-5 h-5" />
                      <span>Write</span>
                    </Button>
                  </Link>
                  <UserMenu />
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-48 justify-start space-x-3 text-[#64748B] hover:bg-[#6633CC] hover:text-white dark:hover:text-white bg-transparent">
                      <LogIn className="w-5 h-5" />
                      <span>Login</span>
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-48 justify-start space-x-3 bg-gradient-to-r from-[#6633CC] to-[#3366FF] text-white px-3 py-2 rounded-lg shadow-elegant mt-4">
                      <UserPlus className="w-5 h-5" />
                      <span>Sign Up</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
