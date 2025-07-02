import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft, Video, Play } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [projectCard, setProjectCard] = useState<any>(null);
  
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Fetch detailed project data
        const detailResponse = await fetch('/dataIndividualProject.json');
        const detailData = await detailResponse.json();
        
        // Fetch project card data
        const cardResponse = await fetch('/dataProjectCard.json');
        const cardData = await cardResponse.json();
        
        const foundProject = detailData.find((p: any) => p.id === parseInt(id || '0'));
        const foundCard = cardData.find((p: any) => p.id === parseInt(id || '0'));
        
        if (foundProject && foundCard) {
          setProject(foundProject);
          setProjectCard(foundCard);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
        navigate('/');
      }
    };

    fetchProjectData();
  }, [id, navigate]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!project || !projectCard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-primary font-mono">LOADING PROJECT...</div>
        </div>
      </div>
    );
  }

  const mediaItems = project.ImagenesIndividualProjectArray || [];

  return (
    <div className="min-h-screen relative">
      {/* Parallax Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${mediaItems[0]?.src}')`,
          backgroundAttachment: 'fixed',
          transform: 'translateZ(0)'
        }}
      />
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[1px]" />
      
      <div className="relative z-10 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-primary hover:text-primary-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-mono">BACK TO PORTFOLIO</span>
            </Button>
            
            <div className="text-center">
              <div className="font-cyber text-lg font-bold text-primary">
                {projectCard.title}
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                PROJECT #{project.id.toString().padStart(3, '0')}
              </div>
            </div>

            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Hero Slider Section */}
      <div className="relative">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {mediaItems.map((media: any, index: number) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh]">
                  {media.type === 'video' ? (
                    <>
                      <video
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                      >
                        <source src={media.src} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={media.src}
                      alt={media.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Project overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <div className="container mx-auto">
                      <h1 className="font-cyber text-4xl md:text-6xl font-bold text-white mb-4">
                        {projectCard.title}
                      </h1>
                      <p className="text-accent font-mono text-xl mb-6">
                        {projectCard.subtitle}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {projectCard.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-primary/20 text-primary text-sm font-mono rounded border border-primary/30"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-8" />
          <CarouselNext className="right-8" />
        </Carousel>


      </div>

      {/* Thumbnail Navigation Carousel */}
      {mediaItems.length > 1 && (
        <div className="w-full bg-background/90 backdrop-blur-lg border-t border-primary/20 py-6">
          <div className="w-full px-6">
            <div className="relative">
              {/* Custom scrollbar container */}
              <div 
                className="thumbnail-carousel flex gap-3 overflow-x-auto pb-4"
                style={{
                  scrollBehavior: 'smooth'
                }}
              >
                {mediaItems.map((media: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === current 
                        ? 'border-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)] scale-105' 
                        : 'border-border/30 hover:border-primary/50 hover:scale-102'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <>
                        <video
                          className="w-full h-full object-cover"
                          muted
                        >
                          <source src={media.src} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Video className="w-4 h-4 text-white" />
                        </div>
                      </>
                    ) : (
                      <img
                        src={media.src}
                        alt={media.alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Active indicator with glow */}
                    {index === current && (
                      <>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
                        <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
                      </>
                    )}
                    
                    {/* Holographic corner accents for active thumbnail */}
                    {index === current && (
                      <>
                        <div className="absolute top-0 left-0 w-4 h-4">
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"></div>
                        </div>
                        <div className="absolute top-0 right-0 w-4 h-4">
                          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"></div>
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Scan line effect for the carousel */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan-line"></div>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Section */}
      <div className="w-full bg-background/90 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="space-y-8">
            {/* Detailed Description */}
            <Card className="cyber-card">
              <div className="space-y-4">
                <div className="text-primary font-mono text-sm mb-4">
                  &gt; PROJECT_DESCRIPTION.LOAD()
                </div>
                
                <div className="prose prose-invert max-w-none">
                  {project.description.map((paragraph: string, index: number) => (
                    <div
                      key={index}
                      className="text-muted-foreground leading-relaxed mb-3"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="game-button-primary flex-1">
                <span className="mr-2">🚀</span>
                LAUNCH PROJECT
              </Button>
              <Button variant="outline" className="game-button-secondary flex-1">
                <span className="mr-2">📤</span>
                SHARE PROJECT
              </Button>
            </div>

            {/* Project Stats */}
            <Card className="cyber-card">
              <div className="space-y-4">
                <div className="text-primary font-mono text-sm">
                  &gt; PROJECT_STATS.INFO
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-accent font-mono text-xs mb-1">CATEGORY</div>
                    <div className="text-foreground font-medium">
                      {projectCard.tags[0]?.toUpperCase() || 'GENERAL'}
                    </div>
                  </div>
                  <div>
                    <div className="text-accent font-mono text-xs mb-1">MEDIA COUNT</div>
                    <div className="text-foreground font-medium">
                      {mediaItems.length} FILES
                    </div>
                  </div>
                  <div>
                    <div className="text-accent font-mono text-xs mb-1">PROJECT ID</div>
                    <div className="text-foreground font-medium">
                      #{project.id.toString().padStart(3, '0')}
                    </div>
                  </div>
                  <div>
                    <div className="text-accent font-mono text-xs mb-1">STATUS</div>
                    <div className="text-primary font-medium">ACTIVE</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Scanning Line Effect */}
      <div className="fixed bottom-0 left-0 w-2 h-0.5 bg-primary animate-scan-line opacity-60"></div>
      </div>
    </div>
  );
};

export default ProjectDetail;