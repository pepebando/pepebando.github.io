import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { projects, categories } from '@/data/portfolio';
const HeroProjectsSection = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [scrollY, setScrollY] = useState(0);
  const fullText = "Creative full-stack developer focused on game tools, esports production software, and immersive UIs.";
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.tags.includes(activeCategory)));
    }
  }, [activeCategory]);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const getProjectCardStyle = (index: number) => {
    const sizes = ['w-80 h-96', 'w-72 h-80', 'w-96 h-72', 'w-64 h-72', 'w-88 h-88'];
    const positions = [{
      top: '10%',
      left: '5%'
    }, {
      top: '60%',
      left: '15%'
    }, {
      top: '30%',
      left: '70%'
    }, {
      top: '80%',
      left: '60%'
    }, {
      top: '15%',
      right: '10%'
    }, {
      top: '50%',
      right: '25%'
    }, {
      top: '75%',
      left: '40%'
    }, {
      top: '25%',
      left: '40%'
    }];
    const parallaxSpeed = 0.5 + index % 3 * 0.2;
    const transform = `translateY(${scrollY * parallaxSpeed}px) rotate(${(index % 2 === 0 ? 1 : -1) * 2}deg)`;
    return {
      ...positions[index % positions.length],
      transform,
      zIndex: 20 + index
    };
  };
  return <section id="hero" className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero">
        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 opacity-10" style={{ transform: 'translateZ(0)' }}>
          {Array.from({
          length: 20
        }).map((_, i) => <div key={i} className="absolute text-primary font-mono text-sm animate-matrix" style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${5 + Math.random() * 3}s`,
          transform: 'translateZ(0)',
          willChange: 'auto'
        }}>
              {Array.from({
            length: 10
          }).map((_, j) => <div key={j} className="opacity-80">
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>)}
            </div>)}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
          {Array.from({
          length: 15
        }).map((_, i) => <div key={i} className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${6 + Math.random() * 4}s`,
          transform: 'translateZ(0)',
          willChange: 'auto'
        }} />)}
        </div>
      </div>

      {/* Floating Project Cards */}
      <div className="absolute inset-0 pointer-events-none">
        {filteredProjects.slice(0, 8).map((project, index) => <Card key={project.id} className="absolute cyber-card opacity-20 hover:opacity-60 transition-opacity duration-500 pointer-events-auto cursor-pointer" style={getProjectCardStyle(index)} onClick={() => window.location.href = `/project/${project.id}`}>
            <div className="relative h-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-primary/10"></div>
              
              {/* Category Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-mono z-30 ${project.color} text-white`}>
                {project.tags[0]?.toUpperCase()}
              </div>

              {/* Project Info */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h3 className="font-cyber text-sm font-bold text-foreground mb-1">
                  {project.title}
                </h3>
                <p className="text-accent font-mono text-xs">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </Card>)}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-50 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary glow-primary animate-glow-pulse">
                <img src="/lovable-uploads/1a125712-e884-4e9f-98f6-42336efc6834.png" alt="Pepe Bando" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full border-2 border-background animate-pulse"></div>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-6">
            <h1 className="font-cyber text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-primary text-glow-primary">PEPE</span>{' '}
              <span className="text-secondary text-glow-secondary">BANDO</span>
            </h1>
            <div className="text-xl md:text-2xl text-accent font-mono mb-2">
              &gt; CREATIVE_DEVELOPER.EXE
            </div>
          </div>

          {/* Typing Animation */}
          <div className="mb-8 h-16 flex items-center justify-center">
            <p className="text-lg md:text-xl text-foreground font-mono max-w-3xl">
              <span className="text-warning">&gt;</span> {text}
              <span className="terminal-cursor"></span>
            </p>
          </div>

          {/* Status Indicators */}
          <div className="mb-8 flex justify-center space-x-6 text-sm font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-success">ONLINE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary">AVAILABLE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-accent">CREATING</span>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => document.getElementById('projects')?.scrollIntoView({
            behavior: 'smooth'
          })} className="game-button-primary text-lg px-8 py-3">
              <span className="mr-2">🎯</span>
              VIEW PROJECTS
            </Button>
            <Button onClick={() => document.getElementById('skills')?.scrollIntoView({
            behavior: 'smooth'
          })} className="game-button-secondary text-lg px-8 py-3">
              <span className="mr-2">⚡</span>
              EXPLORE SKILLS
            </Button>
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({
            behavior: 'smooth'
          })} className="game-button-secondary text-lg px-8 py-3">
              <span className="mr-2">📡</span>
              INITIATE CONTACT
            </Button>
          </div>
        </div>
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan-line" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan-line" style={{
        animationDelay: '2s'
      }}></div>
      </div>
    </section>;
};
export default HeroProjectsSection;