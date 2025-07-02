import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProjectCarousel from './ProjectCarousel';
const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/dataProjectCard.json');
        const data = await response.json();
        setProjects(data);
        
        // Extract unique categories from tags
        const allTags = data.flatMap((project: any) => project.tags);
        const uniqueTags = [...new Set(allTags)];
        const categoryList = [
          { id: 'all', name: 'ALL PROJECTS' },
          ...uniqueTags.map((tag: string) => ({ id: tag, name: tag.toUpperCase() }))
        ];
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.tags.includes(activeCategory)));
    }
    setDisplayedCount(6); // Reset displayed count when category changes
  }, [activeCategory, projects]);

  const loadMoreProjects = () => {
    setDisplayedCount(prev => prev + 6);
  };
  const getCardClasses = (index: number) => {
    const layouts = ['col-span-1 row-span-2 h-96',
    // Tall
    'col-span-2 row-span-1 h-48',
    // Wide
    'col-span-1 row-span-1 h-48',
    // Small
    'col-span-2 row-span-2 h-96',
    // Large
    'col-span-1 row-span-1 h-48',
    // Small
    'col-span-1 row-span-2 h-96',
    // Tall
    'col-span-2 row-span-1 h-48',
    // Wide
    'col-span-1 row-span-1 h-48' // Small
    ];
    return layouts[index % layouts.length];
  };
  return <section id="projects" className="py-20 px-6 relative overflow-hidden">

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="text-accent font-mono text-sm mb-2">&gt; PORTFOLIO.PROJECTS</div>
            <h2 className="font-cyber text-4xl md:text-5xl font-bold text-primary text-glow-primary mb-4">
              PROJECT ARCHIVES
            </h2>
            <div className="w-32 h-1 bg-gradient-primary mx-auto"></div>
          </div>
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Explore a collection of immersive experiences, game tools, and interactive solutions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => <Button key={category.id} onClick={() => setActiveCategory(category.id)} className={`game-button transition-all duration-300 ${activeCategory === category.id ? 'game-button-primary' : 'game-button-secondary'}`}>
              {category.name}
            </Button>)}
        </div>

        {/* Holographic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.slice(0, displayedCount).map((project, index) => {
          const borderColors = ['border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]',
          // cyan
          'border-secondary shadow-[0_0_20px_hsl(var(--secondary)/0.3)]',
          // purple
          'border-accent shadow-[0_0_20px_hsl(var(--accent)/0.3)]',
          // green
          'border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]', 'border-secondary shadow-[0_0_20px_hsl(var(--secondary)/0.3)]', 'border-accent shadow-[0_0_20px_hsl(var(--accent)/0.3)]'];
          return <div key={project.id} className={`group relative bg-background/50 backdrop-blur-sm rounded-2xl border-2 ${borderColors[index]} transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in overflow-hidden`} style={{
            animationDelay: `${index * 0.2}s`
          }} onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)} onClick={() => window.location.href = `/project/${project.id}`}>
                {/* Holographic corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8">
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${index % 3 === 0 ? 'from-primary' : index % 3 === 1 ? 'from-secondary' : 'from-accent'} to-transparent`}></div>
                  <div className={`absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b ${index % 3 === 0 ? 'from-primary' : index % 3 === 1 ? 'from-secondary' : 'from-accent'} to-transparent`}></div>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8">
                  <div className={`absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l ${index % 3 === 0 ? 'from-primary' : index % 3 === 1 ? 'from-secondary' : 'from-accent'} to-transparent`}></div>
                  <div className={`absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b ${index % 3 === 0 ? 'from-primary' : index % 3 === 1 ? 'from-secondary' : 'from-accent'} to-transparent`}></div>
                </div>
                <div className="absolute bottom-0 left-0 w-8 h-8">
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${index % 3 === 0 ? 'from-primary' : index % 3 === 1 ? 'from-secondary' : 'from-accent'} to-transparent`}></div>
                  <div className={`absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t ${index % 3 === 0 ? 'from-primary' : index % 3 === 1 ? 'from-secondary' : 'from-accent'} to-transparent`}></div>
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8">
                  <div className={`absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l ${index % 3 === 0 ? 'from-primary' : index % 3 === 1 ? 'from-secondary' : 'from-accent'} to-transparent`}></div>
                  <div className={`absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t ${index % 3 === 0 ? 'from-primary' : index % 3 === 1 ? 'from-secondary' : 'from-accent'} to-transparent`}></div>
                </div>

                {/* Content Container */}
                <div className="relative p-8 h-full min-h-[400px] flex flex-col">
                  {/* Project Image */}
                  <div className="flex-1 flex items-center justify-center mb-6 relative">
                    <div className="w-full h-48 rounded-lg overflow-hidden border border-primary/20">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-cyber text-xl font-bold text-foreground mb-2 uppercase tracking-wider">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className={`text-sm font-mono mb-4 ${index % 3 === 0 ? 'text-primary/80' : index % 3 === 1 ? 'text-secondary/80' : 'text-accent/80'}`}>
                    {project.subtitle}
                  </p>

                  {/* Hover overlay with glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${index % 3 === 0 ? 'from-primary/10' : index % 3 === 1 ? 'from-secondary/10' : 'from-accent/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                </div>
              </div>;
        })}
        </div>

        {/* Load More */}
        {displayedCount < filteredProjects.length && <div className="text-center mt-12">
            <Button onClick={loadMoreProjects} className="game-button-primary">
              <span className="mr-2">📦</span>
              LOAD MORE PROJECTS
            </Button>
          </div>}
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan-line"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent animate-scan-line" style={{
        animationDelay: '1s'
      }}></div>
      </div>
    </section>;
};
export default ProjectsSection;