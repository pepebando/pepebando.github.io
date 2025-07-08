import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Users, Clock } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  stats?: {
    users?: string;
    duration?: string;
    views?: string;
  };
}

const ProjectViewer3D = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle project as main

  const projects: Project[] = [
    {
      id: 1,
      title: "Architectural Visualization",
      subtitle: "Unreal Engine 5.5",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop",
      category: "ArchViz",
      stats: { users: "1.2K", duration: "15min" }
    },
    {
      id: 2,
      title: "VR Medical Training",
      subtitle: "Pharmaceutical Experience",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      category: "VR/Medical",
      stats: { users: "850", duration: "20min" }
    },
    {
      id: 3,
      title: "Rosa Khutor Resort",
      subtitle: "Interactive Experience",
      image: "https://images.unsplash.com/photo-1551524164-6cf1ac14d300?w=400&h=300&fit=crop",
      category: "Interactive",
      stats: { users: "2.1K", duration: "12min" }
    },
    {
      id: 4,
      title: "Multiplayer Arena",
      subtitle: "3D Gaming Experience",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      category: "Gaming",
      stats: { users: "3.4K", duration: "25min" }
    },
    {
      id: 5,
      title: "Web3D Aquarium",
      subtitle: "Python Integration",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      category: "Web3D",
      stats: { users: "950", duration: "18min" }
    }
  ];

  const getCardStyle = (index: number) => {
    const position = index - currentIndex;
    const isCenter = position === 0;
    const isLeft = position < 0;
    const isRight = position > 0;
    
    if (isCenter) {
      return {
        transform: 'translateX(0) translateY(-20px) scale(1.2) rotateY(0deg)',
        zIndex: 10,
        opacity: 1,
      };
    } else if (isLeft) {
      const offset = Math.abs(position);
      return {
        transform: `translateX(-${80 * offset}px) translateY(${20 * offset}px) scale(${1 - offset * 0.1}) rotateY(25deg)`,
        zIndex: 10 - offset,
        opacity: Math.max(0.4, 1 - offset * 0.3),
      };
    } else {
      const offset = position;
      return {
        transform: `translateX(${80 * offset}px) translateY(${20 * offset}px) scale(${1 - offset * 0.1}) rotateY(-25deg)`,
        zIndex: 10 - offset,
        opacity: Math.max(0.4, 1 - offset * 0.3),
      };
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(projects.length - 1, prev + 1));
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-container-bg/60 backdrop-blur-lg" />
      
      {/* 3D Card Carousel */}
      <div className="relative w-full max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
        <div className="relative h-80 flex items-center justify-center">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="absolute w-64 h-72 cursor-pointer transition-all duration-700 ease-out"
              style={getCardStyle(index)}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="w-full h-full bg-gradient-card rounded-2xl overflow-hidden shadow-2xl border border-border/20 hover:border-nav-item/50 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-container-bg/80 via-transparent to-transparent" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-nav-item text-accent-foreground text-xs px-3 py-1 rounded-full font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Page indicator for center card */}
                  {index === currentIndex && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-glass-overlay text-card-foreground text-xs px-2 py-1 rounded">
                        {currentIndex + 1}/{projects.length}
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-card-foreground font-bold text-lg leading-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-card-foreground/70 text-sm">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Stats - only show on center card */}
                  {index === currentIndex && project.stats && (
                    <div className="flex items-center space-x-4 pt-2">
                      {project.stats.users && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-nav-item" />
                          <span className="text-card-foreground/80 text-xs">{project.stats.users}</span>
                        </div>
                      )}
                      {project.stats.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-nav-item" />
                          <span className="text-card-foreground/80 text-xs">{project.stats.duration}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="w-12 h-12 bg-glass-overlay backdrop-blur-sm rounded-full flex items-center justify-center text-card-foreground hover:bg-nav-item/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2">
        <button
          onClick={handleNext}
          disabled={currentIndex === projects.length - 1}
          className="w-12 h-12 bg-glass-overlay backdrop-blur-sm rounded-full flex items-center justify-center text-card-foreground hover:bg-nav-item/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center space-x-6 bg-glass-overlay backdrop-blur-sm rounded-full px-6 py-3">
          {/* Project Counter */}
          <div className="flex items-center space-x-2">
            <span className="text-nav-item font-bold text-sm">{currentIndex + 1}</span>
            <span className="text-card-foreground/60 text-sm">/</span>
            <span className="text-card-foreground/60 text-sm">{projects.length}</span>
          </div>

          {/* Dot indicators */}
          <div className="flex space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-nav-item' : 'bg-card-foreground/30 hover:bg-card-foreground/50'
                }`}
              />
            ))}
          </div>

          {/* Play button */}
          <button className="w-8 h-8 bg-nav-item rounded-full flex items-center justify-center hover:bg-nav-item/80 transition-all duration-300">
            <Play className="w-4 h-4 text-accent-foreground ml-0.5" />
          </button>
        </div>
      </div>

      {/* Project Title Overlay */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
        <h2 className="text-3xl font-bold text-card-foreground mb-2">
          {currentProject.title}
        </h2>
        <p className="text-card-foreground/80 text-lg">
          {currentProject.subtitle}
        </p>
      </div>
    </div>
  );
};

export default ProjectViewer3D;