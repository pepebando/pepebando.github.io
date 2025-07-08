import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    projectDescription: ""
  });
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-container-bg via-container-bg to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border border-nav-item/30 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-nav-item/20 rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-nav-item/25 -rotate-12"></div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center p-4 md:p-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Side - Marketing Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-card-foreground/90 text-base md:text-lg font-medium">
                Let's Work Together!
              </h2>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-nav-item">
                  Contact Me
                </h1>
                <p className="text-card-foreground text-lg md:text-xl">
                  Tell me about your <span className="font-bold">Project!</span>
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            

            {/* Contact Info */}
            <div className="pt-4">
              
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-sidebar-bg/60 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-card-foreground/10 w-full">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name */}
              <div>
                <Input placeholder="Your Name" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} className="bg-container-bg/50 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/50 h-10 md:h-12" required />
              </div>

              {/* Email */}
              <div>
                <Input type="email" placeholder="Your Email Address" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} className="bg-container-bg/50 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/50 h-10 md:h-12" required />
              </div>

              {/* Project Type */}
              <div>
                <Select value={formData.projectType} onValueChange={value => handleInputChange("projectType", value)}>
                  <SelectTrigger className="bg-container-bg/50 border-card-foreground/20 text-card-foreground h-10 md:h-12">
                    <SelectValue placeholder="Select Project Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-container-bg border-card-foreground/20 text-card-foreground">
                    <SelectItem value="web-development" className="text-card-foreground hover:bg-nav-item/20 focus:bg-nav-item/20">Web Development</SelectItem>
                    <SelectItem value="mobile-app" className="text-card-foreground hover:bg-nav-item/20 focus:bg-nav-item/20">Mobile App</SelectItem>
                    <SelectItem value="game-development" className="text-card-foreground hover:bg-nav-item/20 focus:bg-nav-item/20">Game Development</SelectItem>
                    <SelectItem value="database-design" className="text-card-foreground hover:bg-nav-item/20 focus:bg-nav-item/20">Database Design</SelectItem>
                    <SelectItem value="3d-modeling" className="text-card-foreground hover:bg-nav-item/20 focus:bg-nav-item/20">3D Modeling</SelectItem>
                    <SelectItem value="consulting" className="text-card-foreground hover:bg-nav-item/20 focus:bg-nav-item/20">Consulting</SelectItem>
                    <SelectItem value="other" className="text-card-foreground hover:bg-nav-item/20 focus:bg-nav-item/20">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Project Description */}
              <div>
                <Textarea placeholder="Tell me about your project... What are your goals, requirements, and timeline?" value={formData.projectDescription} onChange={e => handleInputChange("projectDescription", e.target.value)} className="bg-container-bg/50 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/50 min-h-[100px] md:min-h-[120px]" required />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-nav-item hover:bg-nav-item/90 text-accent-foreground font-bold py-2 md:py-3 rounded-lg text-base md:text-lg">
                Send Message 🚀
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default ContactForm;