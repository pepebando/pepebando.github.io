import { useState, useEffect } from "react";
import { Play, Plus, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
interface Project {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  duration: string;
  rating: string;
  genre: string;
  description: string;
  image: string;
  category: string;
  featured?: boolean;
}

interface IndividualProjectMedia {
  src: string;
  alt: string;
  type: string;
}

interface IndividualProject {
  id: number;
  image: string;
  ImagenesIndividualProjectArray: IndividualProjectMedia[];
}
const CinematicCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextProjects, setNextProjects] = useState([1, 2]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [individualProjects, setIndividualProjects] = useState<IndividualProject[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const categories = [{
    title: 'All',
    tags: 'all'
  }, {
    title: 'Unreal Engine',
    tags: 'ue'
  }, {
    title: 'Web',
    tags: 'web'
  }, {
    title: 'Videogames',
    tags: 'games'
  }, {
    title: 'Mixed Reality',
    tags: 'mr'
  }, {
    title: 'Virtual Reality',
    tags: 'vr'
  }, {
    title: 'Archviz',
    tags: 'archviz'
  }, {
    title: 'Python',
    tags: 'py'
  }, {
    title: 'APPs',
    tags: 'app'
  }];
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/dataProjectCard.json');
        const data = await response.json();

        // Transform the JSON data to match the Project interface
        const transformedProjects = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          year: "2024",
          // Default values since not in JSON
          duration: "30min",
          rating: "G",
          genre: "Project",
          description: Array.isArray(item.description) ? item.description.join(" ") : item.description,
          image: item.image,
          category: item.tags.join(", "),
          featured: item.id === 1
        }));
        setProjects(transformedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to default project if JSON fails to load
        setProjects([{
          id: 1,
          title: "Advanced Architectural Visualization",
          subtitle: "Archviz in Unreal Engine 5.5",
          year: "2024",
          duration: "30min",
          rating: "G",
          genre: "ArchViz",
          description: "This is a placeholder description",
          image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=400&fit=crop",
          category: "ue, archviz",
          featured: true
        }]);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const loadIndividualProjects = async () => {
      try {
        const response = await fetch('/dataIndividualProject.json');
        const data = await response.json();
        setIndividualProjects(data);
      } catch (error) {
        console.error('Error loading individual projects:', error);
      }
    };
    loadIndividualProjects();
  }, []);

  // Filter projects based on selected category
  useEffect(() => {
    if (selectedCategory === '' || selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category.includes(selectedCategory));
      setFilteredProjects(filtered);
    }
    setCurrentIndex(0); // Reset to first project when filtering
  }, [selectedCategory, projects]);
  const currentProject = filteredProjects[currentIndex] || projects[0];
  const nextProjectsList = nextProjects.map(index => filteredProjects[index % filteredProjects.length]);

  // Show loading state while projects are being fetched
  if (isLoading || !currentProject) {
    return <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-container-bg via-container-bg to-black flex items-center justify-center">
        <div className="text-card-foreground">Loading...</div>
      </div>;
  }
  if (showGallery) {
    const currentIndividualProject = individualProjects.find(p => p.id === currentProject.id);
    const mediaItems = currentIndividualProject?.ImagenesIndividualProjectArray || [];
    
    return <div className="relative w-full h-full overflow-hidden bg-container-bg">
        {/* Close Button */}
        <Button onClick={() => setShowGallery(false)} variant="ghost" size="sm" className="absolute top-6 right-6 text-white hover:bg-white/20 z-50">
          <Plus className="w-5 h-5 rotate-45" />
        </Button>

        {/* Main Carousel Container */}
        <div className="h-full flex items-center justify-center p-8">
          <Carousel opts={{
            align: "center",
            loop: true
          }} className="w-full max-w-6xl">
            <CarouselContent>
              {mediaItems.map((media, index) => (
                <CarouselItem key={index} className="flex items-center justify-center">
                  <div className="w-full h-[80vh] flex items-center justify-center bg-black/20 rounded-xl">
                    {media.type === "video" ? (
                      <video 
                        controls 
                        className="max-w-full max-h-full object-contain rounded-lg"
                        src={media.src}
                      />
                    ) : (
                      <img 
                        src={media.src} 
                        alt={media.alt} 
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white border-white/30 hover:bg-white/20 left-4" />
            <CarouselNext className="text-white border-white/30 hover:bg-white/20 right-4" />
          </Carousel>
        </div>

        {/* Project Info */}
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{currentProject.title}</h2>
          <div className="flex items-center space-x-4 text-sm opacity-80">
            <span>{currentProject.year}</span>
            <span>{currentProject.duration}</span>
            <span>{currentProject.rating}</span>
          </div>
        </div>
      </div>;
  }
  return <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-container-bg via-container-bg to-black">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{
      backgroundImage: `url(${currentProject.image})`
    }} />
      <div className="absolute inset-0 bg-gradient-to-r from-container-bg/90 via-container-bg/60 to-transparent" />

      {/* Main Content Container */}
      <div className="relative z-10 h-full p-8 flex">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center space-y-0 max-w-2xl px-4 md:px-0">
          {/* Category Badge */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <span className="bg-nav-item text-accent-foreground text-xs px-3 py-1 rounded font-bold tracking-wider">
              {currentProject.subtitle}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-nav-item fill-current" />
              <span className="text-card-foreground/80 text-sm">Add to favorites</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-4 mt-4">
            <h1 className="text-3xl md:text-5xl font-black text-card-foreground leading-none tracking-tighter">
              {currentProject.title.split(" ").map((word, index) => <div key={index} className="inline-block mx-[2px] md:mx-[3px] py-[8px] md:py-[14px]">
                  {word}
                </div>)}
            </h1>
          </div>

          {/* Project Info */}
          <div className="space-y-4 mt-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-6 text-card-foreground/80">
              <span className="bg-nav-item text-accent-foreground text-xs px-2 py-1 rounded">
                {currentProject.year}
              </span>
              <span className="bg-nav-item text-accent-foreground text-xs px-2 py-1 rounded">
                {currentProject.category}
              </span>
              <span className="text-sm">{currentProject.duration}</span>
              <span className="text-sm">{currentProject.genre}</span>
            </div>

            <p className="text-card-foreground/90 text-sm leading-relaxed max-w-md py-[7px]">
              {currentProject.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-4">
            <Button onClick={() => setShowGallery(true)} className="bg-nav-item hover:bg-nav-item/90 text-accent-foreground rounded-lg px-6 md:px-8 font-bold text-sm md:text-base py-[12px] md:py-[15px] my-[15px]">
              <Play className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              PLAY
            </Button>
          </div>

        </div>

        {/* Mobile Categories Dropdown */}
        <div className="absolute top-8 left-4 md:hidden z-20">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40 bg-container-bg/80 backdrop-blur-sm border-card-foreground/20 text-card-foreground">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-container-bg border-card-foreground/20">
              {categories.map(category => (
                <SelectItem key={category.tags} value={category.tags} className="text-card-foreground hover:bg-nav-item/20">
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Categories Sidebar */}
        <div className="hidden md:block absolute top-8 right-8 w-64 bg-container-bg/80 backdrop-blur-sm rounded-lg p-6 border border-card-foreground/10 max-h-none overflow-y-auto">
          <h3 className="text-card-foreground font-bold text-lg mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => <button key={category.tags} onClick={() => setSelectedCategory(category.tags)} className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-sm ${selectedCategory === category.tags ? 'text-nav-item bg-nav-item/20 border border-nav-item/30' : 'text-card-foreground/70 hover:text-card-foreground hover:bg-card-foreground/5'}`}>
                {category.title}
              </button>)}
          </div>
        </div>
      </div>

      {/* Bottom Carousel - positioned in the red box area */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 z-20">
        <Carousel opts={{
        align: "start",
        loop: true
      }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredProjects.map((project, index) => <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-1/8s md:basis-1/8 py-2 md:py-5 px-[4px] md:px-[9px] mx-[8px] md:mx-[15px]">
                <div className="flex flex-col items-center space-y-2 md:space-y-3 cursor-pointer transition-all duration-300 relative z-10" onClick={() => setCurrentIndex(index)}>
                  <div className={`w-20 md:w-32 h-16 md:h-24 bg-cover bg-center rounded-lg md:rounded-xl transition-all duration-300 border-2 ${index === currentIndex ? 'border-nav-item shadow-xl scale-105' : 'border-transparent hover:border-nav-item/30 hover:scale-102'}`} style={{
                backgroundImage: `url(${project.image})`
              }} />
                  <div className="text-center">
                    <p className="text-card-foreground text-xs md:text-sm font-medium leading-tight max-w-20 md:max-w-32">
                      {project.title}
                    </p>
                  </div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="text-nav-item border-nav-item/30 hover:bg-nav-item/20 bg-container-bg/80 backdrop-blur-sm z-10 -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10" />
          <CarouselNext className="text-nav-item border-nav-item/30 hover:bg-nav-item/20 bg-container-bg/80 backdrop-blur-sm z-10 -right-2 md:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10" />
        </Carousel>
      </div>

    </div>;
};
export default CinematicCarousel;