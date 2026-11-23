import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../../utils/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 bg-cyber-bg overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-surface border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Briefcase className="w-3.5 h-3.5" />
            <span>SECTION // 08</span>
            <span className="text-cyber-border">•</span>
            <span>CAREER_TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
            PROFESSIONAL EXPERIENCE
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyber-muted max-w-2xl mx-auto">
            Practical industry experience in enterprise software quality assurance, defect diagnosis, and automation scripting.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-neon mx-auto rounded" />
        </div>

        {/* Futuristic Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Conduit Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyber-cyan via-cyber-blue to-cyber-neon -translate-x-1/2 shadow-glow-cyan hidden sm:block" />

          <div className="space-y-12">
            {experienceData.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyber-bg border-2 border-cyber-cyan shadow-glow-cyan hidden sm:flex items-center justify-center z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyber-neon led-green animate-ping" />
                  </div>

                  {/* Experience Card */}
                  <div className="w-full md:w-1/2 pl-8 sm:pl-0">
                    <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-cyber-border hover:border-cyber-cyan/60 hover:shadow-glow-cyan transition-all duration-300 relative cyber-corners">
                      
                      {/* Role & Company */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 font-bold">
                          {exp.type}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-cyber-muted">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-0.5">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-mono text-cyber-neon font-semibold mb-3 flex items-center gap-2">
                        <span>{exp.company}</span>
                        <span className="text-cyber-border">•</span>
                        <span className="text-xs text-cyber-muted flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-cyber-text/85 font-sans leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Responsibilities */}
                      <ul className="space-y-2 mb-4 pt-3 border-t border-cyber-border/70">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="text-xs font-mono text-cyber-text/80 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Metrics & Technologies */}
                      <div className="pt-3 border-t border-cyber-border flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-cyber-border text-cyber-text/90"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {exp.metrics && (
                          <span className="text-xs font-mono font-bold text-cyber-neon">
                            ⚡ {exp.metrics}
                          </span>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Empty side for layout balance */}
                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
