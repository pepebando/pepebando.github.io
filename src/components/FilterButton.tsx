import { Button } from "@/components/ui/button";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
}

const FilterButton = ({ label, isActive, onClick, count }: FilterButtonProps) => {
  return (
    <Button
      variant={isActive ? "default" : "secondary"}
      size="sm"
      onClick={onClick}
      className={`
        relative transition-all duration-300 hover:scale-105
        ${isActive 
          ? 'bg-gradient-cosmic text-primary-foreground shadow-glow-primary' 
          : 'bg-card/50 backdrop-blur-sm hover:bg-primary/20 border border-border/50'
        }
      `}
    >
      {label}
      <span className="ml-2 text-xs opacity-70">
        {count}
      </span>
    </Button>
  );
};

export default FilterButton;