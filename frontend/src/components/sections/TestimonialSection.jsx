import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
  {
    id: 1,
    name: "Manu Kumar Pal",
    role: "Tech Explorer",
    avatar: "#",
    content:
      "Blogify has transformed how I share my thoughts with the world. The AI-powered features make writing engaging content effortless.",
    rating: 5,
  },
  {
    id: 2,
    name: "Neeraj",
    role: "Content Creator",
    avatar: "#",
    content:
      "The intuitive interface and powerful editing tools have made Blogify my go-to platform for all my blogging needs.",
    rating: 5,
  },
  {
    id: 3,
    name: "MK",
    role: "Digital Marketer",
    avatar: "#",
    content:
      "Amazing platform! helps me understand my audience better and grow my reach.",
    rating: 4,
  },
];

const Testimonials = () => {
  const { isDark } = useTheme();

  const bgSection = isDark ? "bg-[#0B0F19]" : "bg-[#F8FAFC]";
  const textPrimary = isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]";
  const textSecondary = isDark ? "text-[#94A3B8]" : "text-[#64748B]";
  const cardBg = isDark
    ? "bg-[#1E293B] backdrop-blur-sm border-[#374151]"
    : "bg-[#FFFFFF]/50 backdrop-blur-sm border-[#00CCCC33]";
  const badgeBg = isDark ? "bg-[#6E59A5]" : "bg-[#6633CC]";
  const quoteColor = isDark ? "#FFFFFF" : "#6E59A5";

  return (
    <section className={`py-20 font-inter ${bgSection}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-[#0B0F19]"
            }`}
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${textSecondary}`}>
            Join thousands of writers who trust Blogify to share their stories
            with the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 ${cardBg} animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 flex flex-col justify-between h-full">
                {/* Quote icon */}
                <Quote
                  className={`h-8 w-8 mb-4`}
                  style={{ color: quoteColor }}
                />

                {/* Testimonial content */}
                <blockquote
                  className={`mb-6 italic leading-relaxed flex-grow ${textSecondary}`}
                >
                  "{testimonial.content}"
                </blockquote>

                {/* Avatar, name, role */}
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#00CCCC33]"
                  />
                  <div>
                    <h4 className={`font-semibold ${textPrimary}`}>
                      {testimonial.name}
                    </h4>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${badgeBg} text-[#FFFFFF] hover:${badgeBg}`}
                    >
                      {testimonial.role}
                    </Badge>
                  </div>
                </div>

                {/* Star rating below role */}
                <div className="flex items-center gap-1 mt-2 ml-16">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-[#FFD700] fill-current"
                          : "text-[#64748B4D]"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
