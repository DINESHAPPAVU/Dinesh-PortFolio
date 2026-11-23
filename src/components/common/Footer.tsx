import React from 'react';
import { ArrowUp, Terminal, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../../utils/portfolioData';
import { sound } from '../../utils/soundFx';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-cyber-border/80 pt-12 pb-8 overflow-hidden font-mono text-xs text-cyber-muted">
      {/* Background Cyber Glow */}
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-cyber-border/60">
          
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-cyber-surface border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base text-white tracking-wider">
                DINESH A
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30">
                NOC_INFRA
              </span>
            </div>
            <p className="text-xs text-cyber-text/75 font-sans leading-relaxed max-w-sm">
              Connecting networks, administering hardened Linux servers, and deploying resilient cloud systems on AWS.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyber-neon">
              <span className="w-2 h-2 rounded-full bg-cyber-neon led-green animate-pulse" />
              <span>SYS_ADMIN: DINESH A // STATUS 200 OK</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-[11px] text-cyber-cyan font-bold uppercase tracking-wider mb-2">
              QUICK MODULES
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <a href="#hero" onClick={() => sound.playClick()} className="hover:text-cyber-cyan transition-colors">
                &gt; 3D Hero Globe
              </a>
              <a href="#about" onClick={() => sound.playClick()} className="hover:text-cyber-cyan transition-colors">
                &gt; About Profile
              </a>
              <a href="#lab" onClick={() => sound.playClick()} className="hover:text-cyber-cyan transition-colors">
                &gt; Networking Lab
              </a>
              <a href="#terminal" onClick={() => sound.playClick()} className="hover:text-cyber-cyan transition-colors">
                &gt; Linux Terminal
              </a>
              <a href="#aws" onClick={() => sound.playClick()} className="hover:text-cyber-cyan transition-colors">
                &gt; AWS Cloud Infra
              </a>
              <a href="#projects" onClick={() => sound.playClick()} className="hover:text-cyber-cyan transition-colors">
                &gt; Technical Projects
              </a>
              <a href="#skills" onClick={() => sound.playClick()} className="hover:text-cyber-cyan transition-colors">
                &gt; Skills Matrix
              </a>
              <a href="#contact" onClick={() => sound.playClick()} className="hover:text-cyber-cyan transition-colors">
                &gt; Transmit Message
              </a>
            </div>
          </div>

          {/* Socials & Back To Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end space-y-4">
            <div className="space-y-2">
              <div className="text-[11px] text-cyber-cyan font-bold uppercase tracking-wider md:text-right">
                CHANNELS
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-2 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-blue text-cyber-text hover:text-cyber-blue transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-2 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-cyan text-cyber-text hover:text-cyber-cyan transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => sound.playClick()}
                  className="p-2 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-neon text-cyber-text hover:text-cyber-neon transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-surface border border-cyber-cyan/40 hover:border-cyber-cyan text-cyber-cyan text-xs transition-all shadow-glow-cyan"
            >
              <span>TOP OF PAGE</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Telemetry Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-cyber-muted">
          <div>
            © 2026 Dinesh A. Designed as a Futuristic NOC Dashboard & 3D Interactive Portfolio.
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span>TECH STACK:</span>
            <span className="text-cyber-cyan font-bold">React 19</span>
            <span>•</span>
            <span className="text-cyber-neon font-bold">Three.js</span>
            <span>•</span>
            <span className="text-cyber-amber font-bold">Tailwind CSS</span>
            <span>•</span>
            <span className="text-white font-bold">TypeScript</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
