import React from "react";
import { Mail, Sparkles, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <div className="border-t border-b border-[#E2E8F0] py-16 bg-[#F8FAFC] dark:bg-[#0B0F19] font-inter">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto animate-slide-up">
          {/* Header */}
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[#3366FF]" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#0B0F19] dark:text-white animate-fade-in">
              Stay Updated
            </h3>
          </div>

          <p className="text-[#64748B] dark:text-gray-400 mb-6 text-sm sm:text-base md:text-lg animate-fade-in">
            Get the latest updates, writing tips, AI insights, and exclusive
            content delivered straight to your inbox. Be the first to know about
            new features and trends in tech, design, and AI.
          </p>

          {/* Input & Button */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-scale-in w-full">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] dark:text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 w-full pl-10 px-4 py-3 rounded-lg bg-[#FFFFFF] dark:bg-[#1A1A1A] border border-[#E2E8F0] dark:border-gray-700 text-[#0B0F19] dark:text-white placeholder-[#94A3B8] focus:ring-2 focus:ring-[#3366FF] focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>
            <button className="px-4 py-3 rounded-lg bg-gradient-to-r from-[#6633CC] to-[#3366FF] text-sm sm:text-base text-white font-medium shadow hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5 animate-glow">
              <Zap className="w-4 h-4" />
              Subscribe
            </button>
          </div>

          {/* Extra Features */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#64748B] dark:text-gray-400 animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3366FF]" />
              No spam. Unsubscribe anytime.
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FACC15]" />
              Weekly updates & tips.
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#22C55E]" />
              AI & tech insights.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
