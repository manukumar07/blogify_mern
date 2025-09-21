import LoadingSpinner from "@/components/LoadingSpinner";
import CategoriesSection from "@/components/sections/CategorySection";
import CTASection from "@/components/sections/CTASection";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import RecentPosts from "./posts/RecentsPosts";
import TestimonialSection from "@/components/sections/TestimonialSection";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <RecentPosts />
      <Features />
      <CategoriesSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
};

export default Home;
