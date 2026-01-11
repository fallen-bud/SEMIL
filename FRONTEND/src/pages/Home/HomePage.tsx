import React from "react";
import HeroSection from "../../components/sections/HeroSection/HeroSection";
import HowItWorks from "../../components/sections/HowItWorks/HowItWorks";
import WhyPlatformSection from "../../components/sections/WhyPlatform/WhyPlatformSection";
import CTASection from "../../components/sections/CTASection/CTASection";



const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <HowItWorks />
      <WhyPlatformSection/>
      <CTASection/>
    </div>
  )
}

export default HomePage
