import React from 'react'
import HeroSection from "@/components/sections/HeroSection";
import LatestProjects from "@/components/sections/LatestProjects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <LatestProjects />
      <WhyChooseUs />
    </main>
  )
}

export default HomePage;