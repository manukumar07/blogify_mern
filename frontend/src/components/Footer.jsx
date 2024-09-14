// import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-[#F1F5F9] py-6">
      <div className="container mx-auto px-4">
        {/* Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4 text-[#F59E0B]">
              Blogify
            </h2>
            <p className="mb-4 text-md">
              Discover a new world of ideas with our intuitive blog application,
              designed to inspire and engage.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#10B981] hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#10B981] hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-[#10B981] hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <p className="mb-4">
              Subscribe to our newsletter to get the latest updates and blog
              posts.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="py-2 px-4 rounded bg-[#F1F5F9] text-[#1E293B] placeholder:text-[#1E293B]"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-[#10B981] text-[#F1F5F9] rounded hover:bg-[#10B981]/80"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="text-center mt-6 border-t border-[#F1F5F9] pt-4">
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F1F5F9] hover:text-[#10B981]"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F1F5F9] hover:text-[#10B981]"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F1F5F9] hover:text-[#10B981]"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F1F5F9] hover:text-[#10B981]"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
          <p className="text-lg">
            © {new Date().getFullYear()} Blogify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
