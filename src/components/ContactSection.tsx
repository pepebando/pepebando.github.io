import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const ContactSection = () => {
  const [terminalText, setTerminalText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const projectType = formData.get('projectType') as string;
    const message = formData.get('message') as string;
    
    // Simulate terminal processing
    const messages = [
      'Initializing connection protocol...',
      'Encrypting message with quantum encryption...',
      'Establishing secure channel...',
      'Preparing email transmission...',
      'Message transmitted successfully!',
      'Connection terminated.'
    ];

    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalText(prev => prev + '\n> ' + messages[i]);
    }

    // Create mailto link
    const subject = `New Contact Form Submission from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:jsobando96@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default email client
    window.open(mailtoLink);

    setIsProcessing(false);
    setTimeout(() => setTerminalText(''), 3000);
  };

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="text-accent font-mono text-sm mb-2">&gt; NETWORK.CONNECT</div>
            <h2 className="font-cyber text-4xl md:text-5xl font-bold text-accent text-glow-accent mb-4">
              ESTABLISH CONNECTION
            </h2>
            <div className="w-32 h-1 bg-gradient-accent mx-auto"></div>
          </div>
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Ready to collaborate on your next digital adventure? Let's create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Terminal Interface */}
          <Card className="cyber-card">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <div className="text-sm font-mono text-muted-foreground ml-4">
                  SECURE_TERMINAL_v2.1.3
                </div>
              </div>
              
              <h3 className="font-cyber text-xl font-bold text-primary mb-2">
                CONTACT PROTOCOL
              </h3>
              <p className="text-muted-foreground font-mono text-sm">
                Initiate secure communication channel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    &gt; NAME.INPUT
                  </label>
                  <Input 
                    name="name"
                    placeholder="Enter your name..."
                    className="cyber-border bg-background/50 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    &gt; EMAIL.ADDR
                  </label>
                  <Input 
                    name="email"
                    type="email"
                    placeholder="user@domain.com"
                    className="cyber-border bg-background/50 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  &gt; PROJECT.TYPE
                </label>
                <Input 
                  name="projectType"
                  placeholder="e.g., VR Experience, Game Development, Web App..."
                  className="cyber-border bg-background/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-accent mb-2">
                  &gt; MESSAGE.BODY
                </label>
                <Textarea 
                  name="message"
                  placeholder="Describe your project vision..."
                  rows={4}
                  className="cyber-border bg-background/50 font-mono resize-none"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="submit"
                  disabled={isProcessing}
                  className="game-button-primary flex-1"
                >
                  <span className="mr-2">🚀</span>
                  {isProcessing ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                </Button>
                <Button 
                  type="button"
                  className="game-button-secondary"
                >
                  <span className="mr-2">🔄</span>
                  RESET
                </Button>
              </div>
            </form>

            {/* Terminal Output */}
            {terminalText && (
              <div className="mt-6 p-4 bg-background/80 border border-primary/30 rounded-lg">
                <div className="text-sm font-mono text-primary whitespace-pre-line">
                  {terminalText}
                  {isProcessing && <span className="animate-pulse">|</span>}
                </div>
              </div>
            )}
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card className="cyber-card">
              <h3 className="font-cyber text-xl font-bold text-secondary mb-4">
                DIRECT CHANNELS
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary">📧</span>
                  </div>
                  <div>
                    <div className="text-sm font-mono text-muted-foreground">EMAIL</div>
                    <div className="text-foreground font-mono">contact@pepebando.dev</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <span className="text-secondary">💼</span>
                  </div>
                  <div>
                    <div className="text-sm font-mono text-muted-foreground">LINKEDIN</div>
                    <div className="text-foreground font-mono">linkedin.com/in/pepebando</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <span className="text-accent">🐙</span>
                  </div>
                  <div>
                    <div className="text-sm font-mono text-muted-foreground">GITHUB</div>
                    <div className="text-foreground font-mono">github.com/pepebando</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Availability Status */}
            <Card className="cyber-card">
              <h3 className="font-cyber text-xl font-bold text-accent mb-4">
                SYSTEM STATUS
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">Availability</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-success font-mono text-sm">ONLINE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">Response Time</span>
                  <span className="text-primary font-mono text-sm">&lt; 24h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">Timezone</span>
                  <span className="text-accent font-mono text-sm">UTC-5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">Project Queue</span>
                  <span className="text-warning font-mono text-sm">OPEN</span>
                </div>
              </div>
            </Card>

            {/* Specializations */}
            <Card className="cyber-card">
              <h3 className="font-cyber text-xl font-bold text-primary mb-4">
                CORE SERVICES
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'VR/AR Experiences', icon: '🥽' },
                  { name: 'Game Development', icon: '🎮' },
                  { name: 'Interactive UIs', icon: '🖥️' },
                  { name: 'Esports Tools', icon: '⚡' },
                  { name: 'Archviz Solutions', icon: '🏗️' },
                  { name: 'Web Applications', icon: '🌐' }
                ].map((service, index) => (
                  <div 
                    key={service.name}
                    className="p-3 bg-muted/20 border border-border/50 rounded-lg text-center hover:border-primary/50 transition-colors"
                  >
                    <div className="text-lg mb-1">{service.icon}</div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {service.name}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border/50 text-center">
          <div className="font-mono text-muted-foreground text-sm">
            <span className="text-accent">&gt;</span> Built with passion for immersive digital experiences{' '}
            <span className="text-primary">•</span> Copyright © 2024 Pepe Bando{' '}
            <span className="text-secondary">•</span> All systems operational
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;