import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code,
  Palette,
  Brain,
  Smartphone,
  Globe,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const CategoriesSection = () => {
  const { isDark } = useTheme();

  const categories = [
    {
      name: "Technology",
      icon: Code,
      count: 124,
      gradient: "from-[#3366FF] to-[#00CCCC]",
    },
    {
      name: "Design",
      icon: Palette,
      count: 89,
      gradient: "from-[#A855F7] to-[#6366F1]",
    },
    {
      name: "AI & ML",
      icon: Brain,
      count: 67,
      gradient: "from-[#22C55E] to-[#0D9488]",
    },
    {
      name: "Mobile",
      icon: Smartphone,
      count: 45,
      gradient: "from-[#F97316] to-[#EA580C]",
    },
    {
      name: "Web Dev",
      icon: Globe,
      count: 156,
      gradient: "from-[#06B6D4] to-[#2563EB]",
    },
    {
      name: "Business",
      icon: TrendingUp,
      count: 76,
      gradient: "from-[#EF4444] to-[#F97316]",
    },
  ];

  return (
    <section
      className={`py-20 font-[Inter] ${
        isDark ? "bg-[#0B0F19]" : "bg-[#F8FAFC]"
      }`}
    >
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-16 animate-[fadeIn_0.8s_ease-out]">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full border mb-6 ${
              isDark
                ? "bg-[#1F2937]/20 text-[#00CCCC] border-[#00CCCC]/20"
                : "bg-[#3366FF]/10 text-[#3366FF] border-[#3366FF]/20"
            }`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Browse by Topics</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-[#0B0F19]"
            }`}
          >
            Explore{" "}
            <span className="bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent">
              Categories
            </span>
          </h2>

          <p
            className={`text-xl max-w-2xl mx-auto ${
              isDark ? "text-[#94A3B8]" : "text-[#64748B]"
            }`}
          >
            Discover articles, tutorials, and stories across multiple domains —
            curated for creators like you.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.name}
                className={`group relative p-8 rounded-2xl shadow-md border transition-all duration-500 hover:shadow-xl hover:scale-[1.03] animate-[fadeIn_0.8s_ease-out] ${
                  isDark
                    ? "bg-[#1F2937] border-[#374151]"
                    : "bg-white border-[#E2E8F0]"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="text-center">
                  {/* Icon with gradient */}
                  <div
                    className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  <h3
                    className={`text-lg font-semibold mb-2 transition-colors ${
                      isDark
                        ? "text-white group-hover:text-[#00CCCC]"
                        : "text-[#0B0F19] group-hover:text-[#3366FF]"
                    }`}
                  >
                    {category.name}
                  </h3>

                  <p
                    className={`${
                      isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                    } text-sm`}
                  >
                    {category.count} posts
                  </p>
                  <div className="flex items-center justify-center text-[#6E59A5] group-hover:translate-x-1 transition-transform mt-4">
                    <span className="text-md font-medium mr-2">
                      Explore posts
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3366FF]/5 to-[#00CCCC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-[fadeIn_0.8s_ease-out]">
          <Button
            className={`px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
              isDark
                ? "bg-gradient-to-r from-[#00CCCC] to-[#3366FF] text-[#0B0F19]"
                : "bg-gradient-to-r from-[#3366FF] to-[#00CCCC] text-white"
            }`}
          >
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
