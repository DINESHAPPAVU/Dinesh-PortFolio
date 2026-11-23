import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { educationData, certificationsData } from '../../utils/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="relative py-24 bg-cyber-surface/40 overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-surface border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>SECTION // 09</span>
            <span className="text-cyber-border">•</span>
            <span>ACADEMIC_CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
            EDUCATION & CERTIFICATIONS
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyber-muted max-w-2xl mx-auto">
            Academic foundation in Information Technology and verified professional credentials in Cloud Computing, Python, and Data Systems.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-neon mx-auto rounded" />
        </div>

        {/* Education Degrees Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan mb-6">
            <GraduationCap className="w-4 h-4 text-cyber-cyan" />
            <span className="font-bold tracking-wider">ACADEMIC DEGREES & QUALIFICATIONS:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-cyber-cyan/60 hover:shadow-glow-cyan transition-all duration-300 relative cyber-corners flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-cyber-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyber-cyan" />
                      {edu.period}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 font-bold">
                      {edu.score}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-1">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-mono text-cyber-neon mb-2">
                    {edu.institution}
                  </div>
                  <div className="text-[11px] font-mono text-cyber-muted flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" />
                    <span>{edu.location}</span>
                  </div>

                  {edu.highlights && (
                    <ul className="space-y-1.5 pt-3 border-t border-cyber-border/70">
                      {edu.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="text-xs font-mono text-cyber-text/80 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-cyber-cyan shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-cyber-border text-[11px] font-mono text-cyber-muted">
                  Status: <span className="text-cyber-neon font-semibold">{edu.scoreLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Certifications Grid */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyber-neon mb-6">
            <Award className="w-4 h-4 text-cyber-neon" />
            <span className="font-bold tracking-wider">VERIFIED PROFESSIONAL CERTIFICATIONS:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificationsData.map((cert, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-xl border border-cyber-border hover:border-cyber-neon/60 hover:shadow-glow-neon transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-surface border border-cyber-border text-cyber-muted">
                      {cert.category}
                    </span>
                    <span className="text-[10px] font-mono text-cyber-neon font-bold">
                      {cert.badge}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-white mt-1 mb-1">
                    {cert.title}
                  </h4>
                  <div className="text-xs font-mono text-cyber-cyan">
                    {cert.issuer}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-cyber-border/60 flex items-center justify-between text-[10px] font-mono text-cyber-muted">
                  <span className="flex items-center gap-1 text-cyber-neon">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                  <span>{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
