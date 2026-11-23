import React, { useState } from 'react';
import { FolderGit2, ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { projectsData } from '../../utils/portfolioData';
import type { ProjectData } from '../../types';
import { sound } from '../../utils/soundFx';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AWS Cloud':
        return '#ffb703';
      case 'Cisco Networking':
        return '#00f3ff';
      case 'Linux Admin':
        return '#00ff66';
      case 'IoT / Systems':
        return '#9d4edd';
      default:
        return '#0066ff';
    }
  };

  return (
    <section id="projects" className="relative py-24 bg-cyber-bg overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-surface border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>SECTION // 06</span>
            <span className="text-cyber-border">•</span>
            <span>ENGINEERING_PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
            FEATURED TECHNICAL PROJECTS
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyber-muted max-w-2xl mx-auto">
            Practical network implementations, Linux server deployments, and cloud infrastructure engineered and verified by Dinesh A.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-neon mx-auto rounded" />
        </div>

        {/* 3D Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => {
            const catColor = getCategoryColor(project.category);

            return (
              <div
                key={project.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedProject(project);
                }}
                className="group cursor-pointer glass-panel rounded-2xl border border-cyber-border/90 p-6 sm:p-7 transition-all duration-300 hover:border-cyber-cyan hover:shadow-glow-cyan hover:-translate-y-1 relative flex flex-col justify-between cyber-corners"
              >
                <div>
                  {/* Top Header Badge & Date */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="text-[11px] font-mono font-bold px-2.5 py-1 rounded border"
                      style={{
                        color: catColor,
                        borderColor: `${catColor}40`,
                        backgroundColor: `${catColor}15`
                      }}
                    >
                      {project.badge}
                    </span>
                    <span className="text-xs font-mono text-cyber-muted">
                      {project.date}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyber-cyan transition-colors tracking-wide mb-1">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-cyber-neon mb-4">
                    {project.subtitle}
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-cyber-text/85 font-sans leading-relaxed mb-5">
                    {project.summary}
                  </p>

                  {/* Key Highlights */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.slice(0, 3).map((hl, hIdx) => (
                      <li key={hIdx} className="text-xs font-mono text-cyber-text/80 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-1.5 shrink-0" />
                        <span className="leading-snug">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-cyber-border mb-4">
                    {project.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 border border-cyber-border/80 text-cyber-text/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action Link & Metrics */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-cyber-cyan group-hover:underline">
                      <span>INSPECT ARCHITECTURE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    {project.metrics && project.metrics[0] && (
                      <span className="text-cyber-neon font-bold">
                        {project.metrics[0].label}: {project.metrics[0].value}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal for In-Depth Project Architecture */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl glass-panel rounded-2xl border-2 border-cyber-cyan p-6 sm:p-8 shadow-glow-cyan cyber-corners max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedProject(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-lg bg-cyber-surface border border-cyber-border hover:border-cyber-cyan text-cyber-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/40 font-bold">
                    {selectedProject.badge}
                  </span>
                  <span className="text-xs font-mono text-cyber-muted">{selectedProject.date}</span>
                </div>

                <h3 className="text-2xl font-display font-bold text-white">
                  {selectedProject.title}
                </h3>
                <div className="text-xs font-mono text-cyber-neon">
                  {selectedProject.subtitle}
                </div>

                <p className="text-sm font-sans text-cyber-text leading-relaxed">
                  {selectedProject.summary}
                </p>

                {/* Architecture Nodes Flow */}
                {selectedProject.architecture && (
                  <div className="bg-black/60 p-4 rounded-xl border border-cyber-border space-y-2">
                    <div className="text-xs font-mono text-cyber-cyan font-bold">
                      SYSTEM ARCHITECTURE FLOW:
                    </div>
                    <div className="flex flex-wrap items-center gap-2 py-1">
                      {selectedProject.architecture.nodes.map((node, nIdx) => (
                        <React.Fragment key={nIdx}>
                          <span className="px-2.5 py-1 rounded bg-cyber-surface border border-cyber-cyan/30 text-xs font-mono text-white">
                            {node}
                          </span>
                          {nIdx < selectedProject.architecture!.nodes.length - 1 && (
                            <span className="text-cyber-cyan text-xs font-mono">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-xs font-sans text-cyber-text/80 mt-1">
                      {selectedProject.architecture.description}
                    </p>
                  </div>
                )}

                {/* Detailed Highlights */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-cyber-neon font-bold">
                    FULL IMPLEMENTATION HIGHLIGHTS:
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((hl, idx) => (
                      <li key={idx} className="text-xs font-mono text-cyber-text/90 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyber-neon shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Skills Used */}
                <div className="pt-2">
                  <div className="text-xs font-mono text-cyber-muted mb-2 font-bold">
                    TECHNOLOGIES & PROTOCOLS APPLIED:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border text-cyber-cyan"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
