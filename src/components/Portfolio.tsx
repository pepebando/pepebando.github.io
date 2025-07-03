import Navigation from './Navigation';
import HeroProjectsSection from './HeroProjectsSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';
import { projects } from '@/data/portfolio';

const Portfolio = () => {
  const firstProjectImage = projects[0]?.ImagenesIndividualProjectArray?.[0]?.src || projects[0]?.image;
  
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('${firstProjectImage}')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      
      {/* Content Layer */}
      <div className="relative z-10 overflow-x-hidden">
        <Navigation />
        <HeroProjectsSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Portfolio;