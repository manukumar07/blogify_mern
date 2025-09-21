import React from "react";
import { Button } from "@/components/ui/button-enhanced";
import {
  Sparkles,
  Users,
  Target,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";

const About = () => {
  const { isDark } = useTheme();

  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description:
        "We leverage cutting-edge AI technology to revolutionize content creation and discovery.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description:
        "Building a platform where writers and readers can connect, share, and grow together.",
    },
    {
      icon: Award,
      title: "Quality Content",
      description:
        "Promoting high-quality, meaningful content that educates, inspires, and entertains.",
    },
  ];

  const team = [
    {
      name: "Manu Kumar Pal",
      role: "Full Stack Developer",
      image: "#",
      bio: "Full-stack engineer passionate about building scalable platforms for creators.",
      skills: ["React", "AI/ML", "Frontend", "Backend"],
    },
  ];

  return (
    <div
      className={`min-h-screen font-[Inter] transition-colors duration-300 ${
        isDark ? "bg-[#111827] text-[#F8FAFC]" : "bg-[#FFFFFF] text-[#0B0F19]"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`py-20 transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-b from-[#1E1B2E] to-[#1E293B]"
            : "bg-gradient-to-b from-[#F8FAFC] to-[#E2E8F0]"
        }`}
      >
        <div className="container mx-auto px-4 ">
          <div className="text-center animate-fade-in">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full mb-6 border ${
                isDark
                  ? "bg-[#6E59A533] text-[#6E59A5] border-[#6E59A544]"
                  : "bg-[#E0E7FF] text-[#4F46E5] border-[#C7D2FE]"
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">About Blogify</span>
            </div>

            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 ${
                isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
              }`}
            >
              Empowering
              <span className="text-[#6E59A5]"> Creators </span>
              Worldwide
            </h1>

            <p
              className={`text-xl max-w-4xl mx-auto ${
                isDark ? "text-[#94A3B8]" : "text-[#475569]"
              }`}
            >
              Blogify is a MERN-powered platform that goes beyond simple
              blogging. Built with MongoDB, Express, React, and Node.js, it
              empowers writers and readers with a fast, scalable, and
              interactive experience, redefining how digital stories are shared
              and discovered.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[900px] text-center">
          <div className="animate-fade-in">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
              }`}
            >
              Our Mission
            </h2>
            <p
              className={`text-lg mb-6 leading-relaxed ${
                isDark ? "text-[#94A3B8]" : "text-[#475569]"
              }`}
            >
              At Blogify, we believe that ideas become powerful when they’re
              shared. Our mission is to give every voice — from casual writers
              to passionate storytellers — a place to be heard and appreciated.
            </p>
            <p
              className={`text-lg mb-8 leading-relaxed ${
                isDark ? "text-[#94A3B8]" : "text-[#475569]"
              }`}
            >
              Our focus is on building a welcoming space where storytellers and
              readers connect, exchange ideas, and grow together through the
              power of words.
            </p>
            <Button variant="hero" size="lg" className="group mx-auto">
              Join Our Mission
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        className={`py-16 transition-colors duration-300 ${
          isDark ? "bg-[#1F2937]" : "bg-[#F1F5F9]"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
              }`}
            >
              Our Core <span className="text-[#6E59A5]">Values</span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDark ? "text-[#94A3B8]" : "text-[#475569]"
              }`}
            >
              These fundamental principles guide everything we do and shape the
              culture of our platform and community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`text-center p-8 rounded-2xl transition-all duration-500 animate-fade-in border ${
                  isDark
                    ? "bg-[#1E293B] border-[#374151] hover:shadow-lg"
                    : "bg-[#FFFFFF] border-[#E2E8F0] hover:shadow-md"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#6E59A5] to-[#33C3F0] p-4 mx-auto mb-6">
                  <value.icon
                    className={`w-full h-full ${
                      isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
                    }`}
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
                  }`}
                >
                  {value.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    isDark ? "text-[#94A3B8]" : "text-[#475569]"
                  }`}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={member.name}
                className={`w-full backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border ${
                  isDark
                    ? "bg-[#FFFFFF0D] border-[#00CCCC33]"
                    : "bg-[#FFFFFF] border-[#E2E8F0]"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-24 h-24 rounded-full object-cover mx-auto mb-4 shadow-lg ring-2 ${
                      isDark ? "ring-[#00CCCC33]" : "ring-[#3366FF33]"
                    }`}
                  />
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[#3366FF] font-medium mb-3">
                    {member.role}
                  </p>
                  <p
                    className={`text-sm mb-4 ${
                      isDark ? "text-[#94A3B8]" : "text-[#475569]"
                    }`}
                  >
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={`text-xs ${
                          isDark
                            ? "bg-[#6633CC] text-[#FFFFFF]"
                            : "bg-[#E0E7FF] text-[#0B0F19]"
                        }`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div
            className={`text-center rounded-3xl p-12 border animate-fade-in ${
              isDark
                ? "bg-[#1F2937] border-[#374151]"
                : "bg-[#F8FAFC] border-[#E2E8F0]"
            }`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
              }`}
            >
              Ready to Start Your{" "}
              <span className="text-[#6E59A5]">Journey</span>?
            </h2>
            <p
              className={`text-xl mb-8 max-w-2xl mx-auto ${
                isDark ? "text-[#94A3B8]" : "text-[#475569]"
              }`}
            >
              Join thousands of writers who have already discovered the power of
              AI-assisted content creation with Blogify.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button className="bg-[#3366FF] text-[#FFFFFF] hover:bg-[#0033CC] px-6 py-3 rounded-xl text-lg">
                Start Writing Today
              </Button>
              <Button className="border border-[#3366FF]  hover:bg-[#3366FF] text-[#FFFFFF] px-6 py-3 rounded-xl text-lg">
                Learn More
              </Button>
            </div>
            {/* Simple extra content */}
            <p
              className={`text-sm max-w-md mx-auto ${
                isDark ? "text-[#94A3B8]" : "text-[#64748B]"
              }`}
            >
              No experience required — just your ideas. Whether you’re a
              beginner or a seasoned writer, Blogify gives you the tools to
              bring your stories to life.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
