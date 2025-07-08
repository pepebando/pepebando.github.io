import cosmicHero from "@/assets/cosmic-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={cosmicHero} 
          alt="Cosmic background with astronaut among flowers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/80" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center space-y-8 max-w-4xl mx-auto px-6">
        {/* Name and title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-cosmic bg-clip-text text-transparent animate-pulse">
            Pepe Obando
          </h1>
          <div className="h-px w-32 mx-auto bg-gradient-cosmic" />
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            Programmer • AR • VR • MXR • Videogames • Webpages
          </p>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between imagination and reality through immersive technologies, 
            cutting-edge development, and innovative digital experiences.
          </p>

          {/* Tech specialties */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Unreal Engine', 'VR/AR/MXR', 'Web Development', 'Game Development', 'Python'].map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 bg-card/30 backdrop-blur-sm border border-border/30 rounded-full text-sm text-foreground/90 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;