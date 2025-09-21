import React from "react";
import { ArrowRight, Sparkles, BookOpen, Users, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import RightSectionHero from "../RightSectionHero";

const Hero = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden font-[Inter]
        ${
          isDark
            ? "bg-gradient-to-br from-[#0B0F19] via-[#1E293B] to-[#0F172A]" // dark gradient
            : "bg-gradient-to-br from-[#3366FF]/10 via-transparent to-[#00CCCC]/10"
        }
      `}
    >
      {/* Background Elements */}
      <div
        className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse
          ${isDark ? "bg-[#3366FF]/30" : "bg-[#3366FF]/20"}`}
      />
      <div
        className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse
          ${isDark ? "bg-[#00CCCC]/30" : "bg-[#00CCCC]/20"}`}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-2">
          {/* Content */}
          <div className="text-center lg:text-left animate-[fadeIn_0.8s_ease-out] mt-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#3366FF]/10 text-[#3366FF] border border-[#3366FF]/20 mb-6 animate-[scaleIn_0.5s_ease-out] ">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                AI-Powered Writing Platform
              </span>
            </div>

            <h1
              className={`text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6
                ${isDark ? "text-white" : "text-[#0B0F19]"}`}
            >
              Create
              <span className="bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent">
                {" "}
                Amazing{" "}
              </span>
              Blogs with
              <span className="bg-gradient-to-r from-[#00CCCC] to-[#3366FF] bg-clip-text text-transparent">
                {" "}
                AI
              </span>
            </h1>

            <p
              className={`text-md md:text-xl mb-8 max-w-2xl
                ${isDark ? "text-gray-300" : "text-[#64748B]"}`}
            >
              Join thousands of writers who use Blogify to create, share, and
              discover incredible content. Our AI helps you write better,
              faster, and more creatively.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button className="group inline-flex items-center justify-center rounded-md text-sm font-semibold px-4 py-2.5 bg-gradient-to-r from-[#3366FF] to-[#00CCCC] text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                <BookOpen className="w-4 h-4 mr-1.5" />
                Explore Blogs
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2.5 border border-[#3366FF]/40 transition-colors shadow-sm
      ${
        isDark
          ? "bg-gray-900 text-white hover:bg-gray-800"
          : "bg-white text-[#0B0F19] hover:bg-[#F8FAFC]"
      }`}
              >
                <Sparkles className="w-4 h-4 mr-1.5 text-[#3366FF]" />
                Write Blog
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 mb-8">
              {/* Writers */}
              <div className="flex flex-col items-center text-center px-2 py-1">
                <User
                  className={`w-5 h-5 mb-1 ${
                    isDark ? "text-white" : "text-[#0B0F19]"
                  }`}
                />
                <div
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-[#0B0F19]"
                  }`}
                >
                  2K+
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-[#64748B]"
                  }`}
                >
                  Writers
                </div>
              </div>

              {/* Articles */}
              <div className="flex flex-col items-center text-center px-2 py-1">
                <BookOpen
                  className={`w-5 h-5 mb-1 ${
                    isDark ? "text-white" : "text-[#0B0F19]"
                  }`}
                />
                <div
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-[#0B0F19]"
                  }`}
                >
                  5K+
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-[#64748B]"
                  }`}
                >
                  Articles
                </div>
              </div>

              {/* Readers */}
              <div className="flex flex-col items-center text-center px-2 py-1">
                <Users
                  className={`w-5 h-5 mb-1 ${
                    isDark ? "text-white" : "text-[#0B0F19]"
                  }`}
                />
                <div
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-[#0B0F19]"
                  }`}
                >
                  10k+
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-[#64748B]"
                  }`}
                >
                  Readers
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-[slideUp_0.8s_ease-out] flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-full max-w-sm lg:max-w-none">
              <RightSectionHero />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
