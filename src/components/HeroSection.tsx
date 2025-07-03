import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero">
        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-primary font-mono text-sm animate-matrix"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j} className="opacity-80">
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Animated 3D Cubes */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${15 + (i * 15)}%`,
                top: `${20 + Math.random() * 60}%`,
                animation: `floatSlow ${8 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${i * 1.2}s`
              }}
            >
              {/* Simple 3D Cube Effect */}
              <div 
                className="relative w-8 h-8"
                style={{
                  animation: `cubeRotate ${15 + Math.random() * 10}s linear infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              >
                {/* Main Face */}
                <div className="w-8 h-8 bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 absolute"></div>
                {/* Top Face */}
                <div className="w-8 h-4 bg-gradient-to-br from-primary/40 to-primary/20 border border-primary/50 absolute -top-2 left-2 transform -skew-x-12"></div>
                {/* Right Face */}
                <div className="w-4 h-8 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 absolute top-2 -right-2 transform skew-y-12"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Geometric Overlays */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-secondary/20 rotate-45 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-accent/20 rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/10 rotate-45 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary glow-primary animate-glow-pulse">
              <img 
                src="/lovable-uploads/1a125712-e884-4e9f-98f6-42336efc6834.png" 
                alt="Pepe Bando"
                className="w-full h-full object-cover"
              />
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
          <Button
            onClick={scrollToProjects}
            className="game-button-primary text-lg px-8 py-3"
          >
            <span className="mr-2">🚀</span>
            EXPLORE PROJECTS
          </Button>
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="game-button-secondary text-lg px-8 py-3"
          >
            <span className="mr-2">📡</span>
            INITIATE CONTACT
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan-line" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan-line" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;