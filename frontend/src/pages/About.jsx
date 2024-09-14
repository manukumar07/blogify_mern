import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="font-mono bg-[#F1F5F9] text-[#1E293B] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Page Title */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#F59E0B]">
            About Us
          </h1>

          {/* Introduction Section */}
          <section className="mb-12 px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
              Welcome to Our Blog
            </h2>
            <p className="text-base sm:text-md mb-4">
              Our blog is a place where you can find insightful articles, useful
              tips, and engaging stories that matter to you.
            </p>
          </section>

          {/* Mission Section */}
          <section className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-base sm:text-md mb-4">
              Our mission is to deliver high-quality, well-researched content
              that enriches our readers' lives. We aim to provide valuable
              insights and practical advice on topics ranging from lifestyle and
              technology to health and entertainment.
            </p>
            <p className="text-base sm:text-md">
              We strive to create a platform where everyone can learn, grow, and
              connect with others who share similar interests.
            </p>
          </section>

          {/* Contact Section */}
          <section className="text-center px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
              Get in Touch
            </h2>
            <p className="text-base sm:text-md mb-4">
              We’d love to hear from you! If you have any questions,
              suggestions, or just want to say hi, feel free to reach out.
            </p>
            <Link
              to="#"
              className="inline-block py-2 px-4 bg-[#10B981] text-[#F1F5F9] rounded-lg hover:bg-[#10B981]/80"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
