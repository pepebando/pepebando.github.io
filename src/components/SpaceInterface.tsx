import { useState } from "react";
import { Menu, Search, User, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import CinematicCarousel from "@/components/CinematicCarousel";
import ContactForm from "@/components/ContactForm";
const SpaceInterface = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [activeTab, setActiveTab] = useState("02"); // Set Projects as active by default

  const navigationItems = [{
    number: "01",
    label: "Overview",
    active: activeTab === "01"
  }, {
    number: "02",
    label: "Projects",
    active: activeTab === "02"
  }, {
    number: "03",
    label: "Discovery",
    active: activeTab === "03"
  }];
  const rightPanelCards = [{
    id: "01",
    title: "Journey to the Unknown",
    subtitle: "From the Sun and into the farthest reaches of the Solar System",
    tag: "Jupiter",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=300&h=200&fit=crop"
  }, {
    id: "02",
    title: "Planets from the Sun and into the Deep Space System",
    subtitle: "Explore distant worlds",
    tag: "Neptune",
    image: "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=300&h=200&fit=crop"
  }];
  const planetNavigation = [{
    name: "Journey to the Unknown",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=80&h=80&fit=crop"
  }, {
    name: "Unleash Your Lunar Adventure",
    image: "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=80&h=80&fit=crop"
  }, {
    name: "Ultimate Guide to Interplanetary Travel",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=80&h=80&fit=crop"
  }];
  const skills = [{
    title: "Unreal Engine",
    image: "https://img.icons8.com/color/240/unreal-engine.png"
  }, {
    title: "Python",
    image: "https://img.icons8.com/color/240/python--v1.png"
  }, {
    title: "Wordpress",
    image: "https://img.icons8.com/color/240/wordpress.png"
  }, {
    title: "PHP",
    image: "https://img.icons8.com/offices/240/php-logo.png"
  }, {
    title: "C++",
    image: "https://img.icons8.com/fluency/240/c-plus-plus-logo.png"
  }, {
    title: "C#",
    image: "https://img.icons8.com/fluency/240/c-sharp-logo.png"
  }, {
    title: "Node JS",
    image: "https://img.icons8.com/color/240/nodejs.png"
  }, {
    title: "Javascript",
    image: "https://img.icons8.com/fluency/240/javascript.png"
  }, {
    title: "VUE",
    image: "https://img.icons8.com/color/240/vue-js.png"
  }, {
    title: "SQL",
    image: "https://img.icons8.com/color/240/sql.png"
  }, {
    title: "MySQL",
    image: "https://img.icons8.com/color/240/mysql-logo.png"
  }, {
    title: "Reality Capture",
    image: "https://img.icons8.com/color/240/3d-glasses.png"
  }, {
    title: "GIT",
    image: "https://img.icons8.com/fluency/240/github.png"
  }, {
    title: "CSS",
    image: "https://img.icons8.com/color/240/css3.png"
  }];
  return <div className="min-h-screen bg-background md:p-8 md:px-[33px] px-[0]">
      {/* Main Container */}
      <div className="max-w-8xl mx-auto h-screen bg-container-bg rounded-3xl overflow-hidden relative">
        
        {/* Top Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 p-6">
          
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col md:grid md:grid-cols-12 h-full">
          
          {/* Left Sidebar */}
          <div className="md:col-span-2 bg-sidebar-bg p-3 md:p-6 flex md:flex-col justify-center md:space-y-8 space-x-4 md:space-x-0 order-2 md:order-1 min-h-[60px] md:min-h-full">
            {navigationItems.map(item => <div key={item.number} onClick={() => setActiveTab(item.number)} className={`flex flex-col items-center space-y-2 cursor-pointer group transition-all duration-300 ${item.active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${item.active ? 'bg-nav-item-bg border-nav-item text-nav-item' : 'border-sidebar-text/30 text-sidebar-text hover:border-nav-item hover:text-nav-item'}`}>
                  <span className="text-sm font-bold">{item.number}</span>
                </div>
                <span className="text-xs text-sidebar-text text-center opacity-70">{item.label}</span>
              </div>)}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 md:col-span-10 relative overflow-hidden order-1 md:order-2">
            {activeTab === "02" ? (/* Cinematic Carousel */
          <CinematicCarousel />) : activeTab === "03" ? (/* Contact Form */
          <ContactForm />) : (/* Default Overview Content */
          <>
                {/* Hero Background */}
                <div className="absolute inset-0 bg-cover bg-center" style={{
              backgroundImage: `url('/lovable-uploads/21902a73-f377-4f68-af39-db9f4f83a656.png')`
            }} />
                {/* Cosmic overlay */}
                <div className="absolute inset-0 bg-gradient-cosmic" />

                {/* Main Description Section */}
                <div className="absolute top-1/2 left-4 md:left-8 right-4 md:right-8 transform -translate-y-1/2 z-20">
                  <div className="text-center bg-[#000a0e]/55 rounded-2xl p-4 md:p-6">
                    <div className="space-y-4">
                      <h1 className="text-2xl md:text-4xl font-bold text-card-foreground leading-tight">
                        Pepe Obando
                      </h1>
                      <p className="text-card-foreground/80 text-xs md:text-sm leading-relaxed max-w-4xl mx-auto">
                        Hey there! I'm a versatile software developer with a strong background in full-stack development, game design, and database management. Passionate about crafting efficient and scalable solutions, I specialize in web development, backend systems, and interactive experiences using modern programming technologies.
                        <br className="hidden md:block" /><br className="hidden md:block" />
                        <span className="hidden md:inline">With experience in JavaScript, Python, C++, C#, PHP, and SQL, I have built dynamic applications, optimized databases, and developed immersive projects in Unreal Engine. My expertise extends to server-side programming with Node.js and MySQL, ensuring seamless integration and performance across different platforms.
                        <br /><br />
                        I enjoy solving complex problems, automating workflows, and constantly learning new technologies to stay ahead in the ever-evolving tech landscape. Whether it's building robust web applications, designing efficient databases, or developing interactive 3D experiences, I'm always eager to take on new challenges.
                        <br /><br />
                        Feel free to reach out—I'm always open to new projects and collaborations!</span>
                      </p>
                    </div>
                    
                    <Button 
                      onClick={() => setActiveTab("02")}
                      className="bg-nav-item text-accent-foreground hover:bg-nav-item/90 rounded-full px-6 py-2 mt-6"
                    >
                      Discover More
                    </Button>
                    
                    {/* Technical Skills */}
                    <div className="mt-8">
                      <h2 className="text-xl md:text-2xl font-bold text-card-foreground mb-6 text-center">Technical Skills</h2>
                      <div className="grid grid-cols-5 md:grid-cols-7 gap-2 md:gap-4">
                        {skills.map((skill, index) => <div key={index} className="flex flex-col items-center space-y-2 group cursor-pointer">
                            <div className="w-8 md:w-12 h-8 md:h-12 bg-card/80 rounded-lg p-1 md:p-2 group-hover:bg-nav-item/20 transition-colors duration-300 flex items-center justify-center">
                              <img src={skill.image} alt={skill.title} className="w-6 md:w-8 h-6 md:h-8 object-contain" />
                            </div>
                            <span className="text-[10px] md:text-xs text-card-foreground/80 text-center group-hover:text-nav-item transition-colors duration-300">
                              {skill.title}
                            </span>
                          </div>)}
                      </div>
                    </div>
                    
                    {/* Social Icons */}
                    <div className="flex justify-center space-x-4 pt-4">
                      
                      
                      
                    </div>
                  </div>
                </div>

                {/* Top right stats */}
                <div className="absolute top-4 md:top-24 right-4 md:right-8 z-40">
                  <div className="bg-nav-item/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-1 md:py-2 flex items-center space-x-2">
                    <span className="text-nav-item font-bold text-sm md:text-base">+5</span>
                    <span className="text-card-foreground/80 text-[10px] md:text-xs">Years Experience</span>
                  </div>
                </div>
              </>)}
          </div>


        </div>
      </div>
    </div>;
};
export default SpaceInterface;