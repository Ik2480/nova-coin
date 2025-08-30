


import FAQAccordion from "./components/FAQ";
import Header from "./components/Header";
import HeroSection from "./components/heroSection";
import Roadmap from "./components/Roadmap";
import TeamSection from "./components/Team";
import TokenomicsSection from "./components/TokenomicSection";
import WhySection from "./components/WhySection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <TokenomicsSection />
      <WhySection /> 
      <Roadmap />
      <TeamSection />
      <FAQAccordion />


      {/* Add other sections */}
    </>
  );
}
