import React from "react";
import {
  Sparkles,
  Zap,
  Users,
  BarChart3,
  Globe,
  Brain,
  Palette,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const Features = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: Brain,
      title: "AI Writing Assistant",
      description:
        "Get intelligent suggestions, content ideas, and writing improvements powered by advanced AI.",
      gradient: "from-[#3366FF] to-[#7C3AED]",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized performance ensures your content loads instantly and provides seamless user experience.",
      gradient: "from-[#FACC15] to-[#EA580C]",
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description:
        "Modern, responsive design that adapts to any device and provides an elegant reading experience.",
      gradient: "from-[#EC4899] to-[#E11D48]",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Connect with fellow writers, share ideas, and grow your audience in our vibrant community.",
      gradient: "from-[#22C55E] to-[#0D9488]",
    },
    {
      icon: BarChart3,
      title: "Analytics Insights",
      description:
        "Track your content performance with detailed analytics and insights to grow your readership.",
      gradient: "from-[#6366F1] to-[#2563EB]",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Share your content with readers worldwide and discover stories from every corner of the globe.",
      gradient: "from-[#06B6D4] to-[#2563EB]",
    },
  ];

  return (
    <section
      className={`py-24 font-[Inter] transition-colors duration-300 ${
        isDark ? "bg-[#0B0F19]" : "bg-[#F8FAFC]"
      }`}
    >
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Section Header */}
        <div className="text-center mb-16 animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#3366FF]/10 text-[#3366FF] border border-[#3366FF]/20 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-[#0B0F19]"
            }`}
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent">
              succeed
            </span>
          </h2>

          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDark ? "text-[#94A3B8]" : "text-[#64748B]"
            }`}
          >
            Blogify combines cutting-edge AI technology with intuitive design to
            provide the ultimate blogging experience for creators and readers
            alike.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl shadow-md border hover:shadow-xl hover:scale-[1.02] transition-all duration-500 animate-[fadeIn_0.8s_ease-out] h-[340px] w-full md:w-auto ${
                isDark
                  ? "bg-[#1E293B] border-[#334155]"
                  : "bg-white border-[#E2E8F0]"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3
                className={`text-xl font-semibold mb-2 text-center transition-colors ${
                  isDark
                    ? "text-white group-hover:text-[#00CCCC]"
                    : "text-[#0B0F19] group-hover:text-[#3366FF]"
                }`}
              >
                {feature.title}
              </h3>

              <p
                className={`text-sm leading-relaxed text-center ${
                  isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                }`}
              >
                {feature.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3366FF]/5 to-[#00CCCC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#3366FF] to-[#00CCCC] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <span className="font-medium">Ready to get started?</span>
            <Sparkles className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
