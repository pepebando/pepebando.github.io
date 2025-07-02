import { useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface ProjectCarouselProps {
  images: Array<{ src: string; alt: string; type: string }>;
  borderColor: string;
}

const ProjectCarousel = ({ images, borderColor }: ProjectCarouselProps) => {
  // Filter only image type items for the carousel
  const imageItems = images?.filter(item => item.type === "imagen") || [];
  
  // If no images available, show a fallback
  if (imageItems.length === 0) {
    return (
      <div className="w-full h-40 bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg border border-border/20 flex items-center justify-center relative overflow-hidden">
        <div className="text-6xl text-primary">💻</div>
        <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line`}></div>
      </div>
    );
  }

  return (
    <div className="w-full h-40 rounded-lg overflow-hidden relative border border-border/20">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent className="h-40">
          {imageItems.map((image, index) => (
            <CarouselItem key={index} className="h-40">
              <div className="w-full h-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-muted/20 to-muted/5 flex items-center justify-center"><div class="text-4xl text-primary">📷</div></div>';
                  }}
                />
                {/* Scanning line effect */}
                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${borderColor} animate-scan-line`}></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProjectCarousel;