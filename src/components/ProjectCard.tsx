import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  color: string;
  tags: string[];
}

const ProjectCard = ({ title, subtitle, image, description, tags, color }: ProjectCardProps) => {
  const getColorClass = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-titlep1': 'bg-titlep1',
      'bg-titlep2': 'bg-titlep2', 
      'bg-titlep3': 'bg-titlep3',
      'bg-titlep4': 'bg-titlep4',
      'bg-titlep5': 'bg-titlep5',
      'bg-titlep6': 'bg-titlep6'
    };
    return colorMap[colorName] || 'bg-primary';
  };

  const getTagColor = (tag: string) => {
    const tagColors: { [key: string]: string } = {
      'ue': 'bg-primary/20 text-primary',
      'archviz': 'bg-secondary/20 text-secondary',
      'web': 'bg-accent/20 text-accent',
      'wp': 'bg-titlep4/20 text-titlep4',
      'py': 'bg-titlep5/20 text-titlep5',
      'vr': 'bg-titlep1/20 text-titlep1',
      'mr': 'bg-titlep2/20 text-titlep2',
      'games': 'bg-titlep3/20 text-titlep3',
      'app': 'bg-titlep6/20 text-titlep6',
      '3D': 'bg-primary/20 text-primary'
    };
    return tagColors[tag] || 'bg-muted/20 text-muted-foreground';
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-glass backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-cosmic hover:scale-105">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
        
        {/* Color accent */}
        <div className={`absolute top-4 left-4 w-3 h-3 rounded-full ${getColorClass(color)} shadow-glow-primary`} />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className={`text-xs px-2 py-1 ${getTagColor(tag)} border-0 hover:scale-105 transition-transform duration-200`}
            >
              {tag.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>
    </Card>
  );
};

export default ProjectCard;