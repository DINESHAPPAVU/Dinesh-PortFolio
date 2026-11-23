import React, { useState } from 'react';
import { Cpu, Network, Server, Terminal, Cloud, Code } from 'lucide-react';
import { skillCategories } from '../../utils/portfolioData';
import { sound } from '../../utils/soundFx';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Network':
        return Network;
      case 'Server':
        return Server;
      case 'Terminal':
        return Terminal;
      case 'Cloud':
        return Cloud;
      case 'Code':
        return Code;
      default:
        return Cpu;
    }
  };

  return (
    <section id="skills" className="relative py-24 bg-cyber-surface/40 overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-surface border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Cpu className="w-3.5 h-3.5" />
            <span>SECTION // 07</span>
            <span className="text-cyber-border">•</span>
            <span>TECHNICAL_COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
            TECHNICAL SKILLS MATRIX
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyber-muted max-w-2xl mx-auto">
            Practical competencies in enterprise network architecture, Cisco IOS configuration, Linux systems engineering, and AWS cloud hosting.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-neon mx-auto rounded" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {skillCategories.map((category, idx) => {
            const Icon = getCategoryIcon(category.iconName);
            const isActive = activeCategory === idx;

            return (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(idx);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-200 border ${
                  isActive
                    ? 'bg-cyber-surface border-2 text-white shadow-lg scale-105'
                    : 'bg-black/50 border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-cyan/40'
                }`}
                style={{
                  borderColor: isActive ? category.color : undefined,
                  boxShadow: isActive ? `0 0 20px ${category.color}35` : undefined
                }}
              >
                <Icon className="w-4 h-4" style={{ color: isActive ? category.color : undefined }} />
                <span>{category.title.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories[activeCategory].skills.map((skill, sIdx) => {
            const cat = skillCategories[activeCategory];

            return (
              <div
                key={sIdx}
                className="glass-panel p-5 rounded-2xl border border-cyber-border/90 hover:border-cyber-cyan/50 hover:shadow-glow-cyan transition-all duration-300 relative cyber-corners flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-bold text-base text-white tracking-wide">
                      {skill.name}
                    </span>
                    {skill.badge && (
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                        style={{
                          color: cat.color,
                          borderColor: `${cat.color}40`,
                          backgroundColor: `${cat.color}15`
                        }}
                      >
                        {skill.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-cyber-text/80 font-sans leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Proficiency Gauge */}
                <div className="space-y-1.5 pt-3 border-t border-cyber-border/70">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-cyber-muted">Proficiency Index</span>
                    <span style={{ color: cat.color }} className="font-bold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-cyber-border">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: cat.color,
                        boxShadow: `0 0 8px ${cat.color}`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
