import React from "react";
import { Link } from "react-router-dom";
import {
  PenTool,
  Mail,
  Twitter,
  Github,
  Linkedin,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    Product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "AI Writing", href: "/ai-writing" },
      { label: "Analytics", href: "/analytics" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    Categeries: [
      { label: "Technology", href: "/technology" },
      { label: "Business", href: "/business" },
      { label: "Health", href: "/health" },
      { label: "Lifestyle", href: "/lifestyle" },
    ],
    Legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Cookies", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-[#FFFFFF] dark:bg-[#0B0F19] border-t border-[#E2E8F0] dark:border-gray-800 font-[Inter] animate-fade-in">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 max-w-[1440px]">
        <div className="grid lg:grid-cols-6 gap-8 animate-slide-up">
          {/* Brand Section */}
          <div className="lg:col-span-2 animate-scale-in">
            <Link
              to="/"
              className="flex items-center space-x-2 mb-4 hover-scale"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-[#3366FF] to-[#00CCCC] rounded-lg flex items-center justify-center shadow-soft hover-glow">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3366FF] to-[#00CCCC]">
                Blogify
              </span>
            </Link>
            <p className="text-[#64748B] dark:text-gray-400 mb-6 leading-relaxed animate-fade-in">
              The AI-powered blogging platform that helps creators write better,
              faster, and more creatively. Join thousands of writers worldwide.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, i) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-[#F8FAFC] dark:bg-gray-800 hover:bg-[#3366FF] hover:text-white transition-all duration-300 flex items-center dark:text-white dark:hover:bg-[#6633CC] justify-center animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <div
              key={category}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <h4 className="font-semibold mb-4 text-[#0B0F19] dark:text-white">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, j) => (
                  <li
                    key={link.label}
                    className="animate-fade-in"
                    style={{ animationDelay: `${j * 0.1}s` }}
                  >
                    <Link
                      to={link.href}
                      className="text-[#64748B] dark:text-gray-400 hover:text-[#0B0F19] dark:hover:text-white transition-colors duration-200 hover-lift"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#E2E8F0] dark:border-gray-800 animate-slide-up">
        <div className="container mx-auto px-4 py-6 max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-[#64748B] dark:text-gray-400 animate-fade-in">
              <span>© 2025 Blogify. Made with ❤️</span>
              <span> Manu Kumar Pal</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-[#64748B] dark:text-gray-400  hover:bg-[#6633CC] hover:text-white dark:hover:text-white transition-colors px-3 py-2 rounded-lg animate-scale-in"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
