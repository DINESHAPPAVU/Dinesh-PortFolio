import React, { useState } from 'react';
import { LoadingScreen } from './components/common/LoadingScreen';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { NetworkingLabSection } from './components/lab/NetworkingLabSection';
import { TerminalSection } from './components/terminal/TerminalSection';
import { AwsCloudSection } from './components/aws/AwsCloudSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { EducationSection } from './components/education/EducationSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';

export const App: React.FC = () => {
  const [bootCompleted, setBootCompleted] = useState(false);

  return (
    <div className="relative min-h-screen bg-cyber-bg text-cyber-text font-sans selection:bg-cyber-cyan/30 selection:text-cyber-cyan overflow-x-hidden">
      {/* Futuristic Initial Boot Screen */}
      {!bootCompleted && (
        <LoadingScreen onComplete={() => setBootCompleted(true)} />
      )}

      {/* Cybernetic Custom Mouse Pointer */}
      <CustomCursor />

      {/* Top Futuristic Navigation & Audio HUD */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: 3D Hero Experience */}
        <HeroSection />

        {/* Section 2: About Profile & Engineering Pillars */}
        <AboutSection />

        {/* Section 3: Interactive Networking Lab & Packet Simulator */}
        <NetworkingLabSection />

        {/* Section 4: Interactive Linux Terminal Simulator */}
        <TerminalSection />

        {/* Section 5: AWS Cloud Infrastructure */}
        <AwsCloudSection />

        {/* Section 6: Technical Projects */}
        <ProjectsSection />

        {/* Section 7: Technical Skills Matrix */}
        <SkillsSection />

        {/* Section 8: Professional Experience Timeline */}
        <ExperienceSection />

        {/* Section 9: Academic Education & Certifications */}
        <EducationSection />

        {/* Section 10: Contact Dispatch Form & Social Channels */}
        <ContactSection />
      </main>

      {/* Futuristic Status Footer */}
      <Footer />
    </div>
  );
};

export default App;
