import React, { useState } from "react";
import { Button } from "@/components/ui/button-enhanced";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import toast from "react-hot-toast";

const Contact = () => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "demo@blogify.com",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "+91 98178XXXXX",
      action: "Call Now",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "123 Street, YNR",
      action: "Get Directions",
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
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full mb-6 border ${
                isDark
                  ? "bg-[#6E59A533] text-[#6E59A5] border-[#6E59A544]"
                  : "bg-[#E0E7FF] text-[#4F46E5] border-[#C7D2FE]"
              }`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Contact Us</span>
            </div>
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 ${
                isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
              }`}
            >
              Let's <span className="text-[#6E59A5]"> Connect </span>& Create
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDark ? "text-[#94A3B8]" : "text-[#475569]"
              }`}
            >
              Have questions, suggestions, or just want to say hello? We'd love
              to hear from you and help you on your blogging journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h2
                className={`text-3xl font-bold mb-6 ${
                  isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
                }`}
              >
                Send us a Message
              </h2>
              <p
                className={`mb-8 ${
                  isDark ? "text-[#94A3B8]" : "text-[#475569]"
                }`}
              >
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                      }`}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-[#6E59A5] ${
                        isDark
                          ? "bg-[#1F2937] border-[#374151] text-[#F8FAFC]"
                          : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0B0F19]"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                      }`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-[#6E59A5] ${
                        isDark
                          ? "bg-[#1F2937] border-[#374151] text-[#F8FAFC]"
                          : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0B0F19]"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                    }`}
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-[#6E59A5] ${
                      isDark
                        ? "bg-[#1F2937] border-[#374151] text-[#F8FAFC]"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0B0F19]"
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all resize-none focus:ring-2 focus:ring-[#6E59A5] ${
                      isDark
                        ? "bg-[#1F2937] border-[#374151] text-[#F8FAFC]"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0B0F19]"
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full group"
                >
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="animate-slide-up">
              <h2
                className={`text-3xl font-bold mb-6 ${
                  isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
                }`}
              >
                Get in Touch
              </h2>
              <p
                className={`mb-6 ${
                  isDark ? "text-[#94A3B8]" : "text-[#475569]"
                }`}
              >
                Choose your preferred way to reach us. We're here to help and
                answer any questions you might have.
              </p>

              <div className="space-y-5">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className={`flex items-start space-x-4 p-4 rounded-xl border transition-all duration-300 ${
                      isDark
                        ? "bg-[#1F2937] border-[#374151] hover:shadow-lg"
                        : "bg-[#F8FAFC] border-[#E2E8F0] hover:shadow-md"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#6E59A5] to-[#33C3F0] p-3 flex-shrink-0">
                      <info.icon
                        className={`w-full h-full ${
                          isDark ? "text-[#FFFFFF]" : "text-[#0B0F19]"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold ${
                          isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                        }`}
                      >
                        {info.title}
                      </h3>
                      <p
                        className={`mb-2 ${
                          isDark ? "text-[#94A3B8]" : "text-[#475569]"
                        }`}
                      >
                        {info.description}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${
                          isDark
                            ? "text-[#6E59A5] hover:text-[#33C3F0]"
                            : "text-[#3366FF] hover:text-[#0033CC]"
                        }`}
                      >
                        {info.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
