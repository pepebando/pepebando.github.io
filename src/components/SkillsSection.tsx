import { useState } from 'react';
import { skills, projects } from '@/data/portfolio';

const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Group skills by category
  const skillCategories = {
    'COMBAT': skills.filter(s => ['game-engine', 'game-dev'].includes(s.category)),
    'FRONTEND': skills.filter(s => s.category === 'frontend'),
    'BACKEND': skills.filter(s => s.category === 'backend'),
    'SPECIAL': skills.filter(s => ['xr', '3d-web', 'special'].includes(s.category))
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'COMBAT': 'from-red-500/20 to-red-600/30 border-red-500/60 shadow-red-500/30',
      'FRONTEND': 'from-blue-500/20 to-blue-600/30 border-blue-500/60 shadow-blue-500/30',
      'BACKEND': 'from-purple-500/20 to-purple-600/30 border-purple-500/60 shadow-purple-500/30',
      'SPECIAL': 'from-yellow-500/20 to-yellow-600/30 border-yellow-500/60 shadow-yellow-500/30',
      'UTILITY': 'from-green-500/20 to-green-600/30 border-green-500/60 shadow-green-500/30'
    };
    return colors[category] || 'from-muted/20 to-muted/30 border-muted/60';
  };

  const getSkillState = (skill: any) => {
    if (selectedSkill === skill.name) return 'selected';
    if (skill.level >= 90) return 'mastered';
    if (skill.level >= 70) return 'advanced';
    return 'basic';
  };

  const getSkillGlow = (state: string) => {
    const glows: Record<string, string> = {
      'selected': 'shadow-lg shadow-primary/50 ring-2 ring-primary/60',
      'mastered': 'shadow-lg shadow-green-500/30 ring-1 ring-green-500/40',
      'advanced': 'shadow-lg shadow-blue-500/30 ring-1 ring-blue-500/40',
      'basic': 'shadow-md shadow-muted/20'
    };
    return glows[state] || '';
  };

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-background/95 to-background">
      {/* Gaming UI Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,255,0.1),transparent_70%)]" />
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-primary/10 bg-transparent" />
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Gaming Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">⚡</span>
            </div>
            <h2 className="font-cyber text-3xl md:text-4xl font-bold text-primary">
              AGENT ABILITIES
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm">
            Select an ability to view detailed information
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Skills Grid - Gaming Style */}
          <div className="xl:col-span-2">
            <div className="bg-gradient-to-br from-card/40 via-card/20 to-transparent backdrop-blur-md border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
              {/* UI Corner Brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-primary/60" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/60" />

              {/* Skills by Category */}
              <div className="space-y-8">
                {Object.entries(skillCategories).map(([categoryName, categorySkills]) => (
                  <div key={categoryName} className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-cyber font-bold text-muted-foreground tracking-wider">
                        {categoryName}
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-5 gap-4">
                      {categorySkills.map((skill, index) => {
                        const state = getSkillState(skill);
                        return (
                          <div
                            key={skill.name}
                            className={`
                              relative aspect-square cursor-pointer transition-all duration-300 group
                              ${getSkillGlow(state)}
                            `}
                            onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                          >
                            {/* Hexagonal Container */}
                            <div className={`
                              w-full h-full rounded-xl bg-gradient-to-br backdrop-blur-sm border-2 transition-all duration-300
                              ${getCategoryColor(categoryName)}
                              ${selectedSkill === skill.name ? 'scale-110' : 'hover:scale-105'}
                              flex items-center justify-center relative overflow-hidden
                            `}>
                              {/* Skill Icon */}
                              <div className="w-10 h-10 z-10 relative flex items-center justify-center">
                                {skill.icon.startsWith('http') ? (
                                  <img 
                                    src={skill.icon} 
                                    alt={skill.name}
                                    className="w-8 h-8 object-contain"
                                  />
                                ) : (
                                  <span className="text-3xl">{skill.icon}</span>
                                )}
                              </div>

                              {/* Progress Ring */}
                              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 60 60">
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="26"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  opacity="0.2"
                                  className="text-foreground"
                                />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="26"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeDasharray={`${skill.level / 100 * 163.36} 163.36`}
                                  className="text-foreground transition-all duration-1000"
                                  strokeLinecap="round"
                                  opacity="0.8"
                                />
                              </svg>

                              {/* Level Badge */}
                              <div className="absolute -bottom-1 -right-1 bg-background/90 border border-primary/40 rounded-md px-1.5 py-0.5 text-xs font-mono font-bold">
                                {skill.level}
                              </div>

                              {/* Selection Indicator */}
                              {selectedSkill === skill.name && (
                                <div className="absolute inset-0 rounded-xl border-2 border-primary animate-pulse" />
                              )}

                              {/* Hover Effect */}
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            </div>

                            {/* Skill Name */}
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-mono text-center text-muted-foreground whitespace-nowrap">
                              {skill.name.split(' ')[0]}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Details Panel */}
          <div className="space-y-6">
            {selectedSkill ? (
              <div className="bg-gradient-to-br from-card/60 via-card/30 to-transparent backdrop-blur-md border border-primary/20 rounded-2xl p-6 relative overflow-hidden animate-slide-in-right">
                {/* UI Brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-primary/60" />

                {(() => {
                  const skill = skills.find(s => s.name === selectedSkill);
                  if (!skill) return null;
                  
                  return (
                    <>
                      {/* Skill Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 flex items-center justify-center">
                          {skill.icon.startsWith('http') ? (
                            <img 
                              src={skill.icon} 
                              alt={skill.name}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <span className="text-4xl">{skill.icon}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-cyber text-xl font-bold text-foreground">
                            {skill.name}
                          </h3>
                          <div className="text-primary font-mono text-sm font-bold">
                            {skill.category.replace('-', ' ').toUpperCase()}
                          </div>
                        </div>
                      </div>

                      {/* Proficiency */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-mono text-muted-foreground">PROFICIENCY</span>
                          <span className="text-sm font-mono font-bold text-primary">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden border border-primary/20">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <div className="text-sm font-mono text-muted-foreground mb-3">ABILITY DESCRIPTION</div>
                        <p className="text-foreground/90 leading-relaxed text-sm">
                          {skill.description}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
                        <div className="text-center">
                          <div className="text-xs font-mono text-muted-foreground mb-1">STATUS</div>
                          <div className="text-sm font-mono font-bold text-success">ACTIVE</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-mono text-muted-foreground mb-1">PROJECTS</div>
                          <div className="text-sm font-mono font-bold text-primary">
                            {Math.floor(Math.random() * 15) + 5}+
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-card/40 via-card/20 to-transparent backdrop-blur-md border border-primary/20 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4 opacity-50">🎮</div>
                <h3 className="font-cyber text-lg font-bold text-foreground mb-2">
                  SELECT AN ABILITY
                </h3>
                <p className="text-muted-foreground font-mono text-sm">
                  Click on any ability icon to view details
                </p>
              </div>
            )}

            {/* Agent Stats */}
            <div className="bg-gradient-to-br from-card/40 via-card/20 to-transparent backdrop-blur-md border border-primary/20 rounded-2xl p-6">
              <h4 className="font-cyber text-lg font-bold text-foreground mb-4 flex items-center">
                <span className="mr-2">📊</span>
                AGENT STATS
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-xl font-bold text-primary">
                    {skills.length}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    ABILITIES
                  </div>
                </div>
                <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="text-xl font-bold text-secondary">
                    {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    AVG LEVEL
                  </div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-xl font-bold text-accent">
                    5+
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    YEARS EXP
                  </div>
                </div>
                <div className="text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <div className="text-xl font-bold text-warning">
                    {projects.length}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    MISSIONS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;