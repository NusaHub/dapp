import React from 'react'
import { Metadata } from 'next'
import HeroSection from "@/components/sections/HeroSection";
import LatestProjects from "@/components/sections/LatestProjects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata: Metadata = {
  title: "NusaHub - Decentralized Game Funding Platform",
  description: "Connect game developers with investors through blockchain technology. Discover innovative gaming projects, invest in the future of gaming, and support Indonesian game development.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: "https://nusahub.io",
  }
}

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