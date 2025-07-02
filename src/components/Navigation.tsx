import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'INIT', icon: '🎯' },
    { id: 'projects', label: 'PROJECTS', icon: '💼' },
    { id: 'skills', label: 'SKILLS', icon: '⚡' },
    { id: 'contact', label: 'CONNECT', icon: '📡' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/90 backdrop-blur-lg border-b border-primary/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-background font-bold text-lg animate-glow-pulse">
              PB
            </div>
            <div className="hidden md:block">
              <div className="font-cyber text-xl font-bold text-primary text-glow-primary">
                PEPE OBANDO
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                &gt; CREATIVE DEVELOPER_
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`nav-item font-mono transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-primary glow-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Audio Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="game-button-accent ml-4"
          >
            <span className="mr-2">🔇</span>
            <span className="hidden sm:inline">AUDIO</span>
          </Button>
        </div>
      </div>

      {/* Scanning Line Effect */}
      <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-primary animate-scan-line opacity-60"></div>
    </nav>
  );
};

export default Navigation;