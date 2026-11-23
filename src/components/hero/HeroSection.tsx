import React, { useState, useEffect } from 'react';
import { ArrowRight, FileDown, Mail, Network, Terminal, Shield, Cpu, Activity, Sparkles } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { personalInfo } from '../../utils/portfolioData';
import { sound } from '../../utils/soundFx';

export const HeroSection: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % personalInfo.subtitles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D Canvas Background */}
      <Hero3DCanvas />

      {/* Radial Vignette to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-bg/60 via-transparent to-cyber-bg pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-cyber-bg/40 to-cyber-bg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Text, Roles & CTA Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Mission Control Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-surface/90 border border-cyber-cyan/40 shadow-glow-cyan backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-neon opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-neon" />
              </span>
              <span className="text-xs font-mono text-cyber-cyan tracking-wider font-semibold">
                NOC MISSION CONTROL // READY
              </span>
              <span className="text-cyber-border">|</span>
              <span className="text-[11px] font-mono text-cyber-neon">
                PING: {personalInfo.metrics.pingLatency}
              </span>
            </div>

            {/* Main Greeting and Name */}
            <div className="space-y-2">
              <div className="text-sm font-mono text-cyber-cyan uppercase tracking-widest flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-cyber-cyan" />
                <span>HELLO, I'M</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
                DINESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-neon drop-shadow-[0_0_25px_rgba(0,243,255,0.4)]">A</span>
              </h1>
            </div>

            {/* Dynamic Role Cycler */}
            <div className="h-10 flex items-center justify-center lg:justify-start">
              <div className="text-xl sm:text-2xl font-mono text-cyber-neon font-semibold flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyber-neon" />
                <span className="transition-all duration-300">
                  {personalInfo.subtitles[currentRoleIndex]}
                </span>
                <span className="terminal-cursor" />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-cyber-text/90 font-light max-w-2xl mx-auto lg:mx-0 border-l-2 border-cyber-cyan/50 pl-4 italic bg-cyber-surface/30 py-1 rounded-r">
              "{personalInfo.tagline}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#lab"
                onClick={() => sound.playPacketPulse()}
                className="cyber-btn inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-neon text-cyber-bg font-mono font-bold text-sm tracking-wider rounded shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all"
              >
                <span>EXPLORE MY WORLD</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/Dinesh_A_Resume.pdf"
                download="Dinesh_A_Network_Linux_Resume.pdf"
                onClick={() => sound.playSuccess()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-cyber-surface hover:bg-cyber-surface/90 text-cyber-cyan border border-cyber-cyan/50 hover:border-cyber-cyan font-mono text-sm tracking-wider rounded shadow-glass transition-all hover:scale-[1.02]"
              >
                <FileDown className="w-4 h-4 text-cyber-cyan" />
                <span>DOWNLOAD RESUME</span>
              </a>

              <a
                href="#contact"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-cyber-surface/60 hover:bg-cyber-surface text-cyber-text/80 hover:text-white border border-cyber-border hover:border-cyber-cyan/40 font-mono text-sm tracking-wider rounded transition-all"
              >
                <Mail className="w-4 h-4 text-cyber-blue" />
                <span>CONTACT ME</span>
              </a>
            </div>

            {/* Telemetry Metric Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-xl mx-auto lg:mx-0">
              <div className="glass-card p-2.5 rounded border border-cyber-border text-center">
                <div className="text-[10px] font-mono text-cyber-muted">PACKET LOSS</div>
                <div className="text-sm font-mono font-bold text-cyber-neon">0.00%</div>
              </div>
              <div className="glass-card p-2.5 rounded border border-cyber-border text-center">
                <div className="text-[10px] font-mono text-cyber-muted">UPTIME</div>
                <div className="text-sm font-mono font-bold text-cyber-cyan">99.98%</div>
              </div>
              <div className="glass-card p-2.5 rounded border border-cyber-border text-center">
                <div className="text-[10px] font-mono text-cyber-muted">VLAN LABS</div>
                <div className="text-sm font-mono font-bold text-white">802.1Q OK</div>
              </div>
              <div className="glass-card p-2.5 rounded border border-cyber-border text-center">
                <div className="text-[10px] font-mono text-cyber-muted">AWS CLOUD</div>
                <div className="text-sm font-mono font-bold text-cyber-amber">EC2 LIVE</div>
              </div>
            </div>
          </div>

          {/* Right Column: Cybernetic Profile Card with Official Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Cyber Glow Ambient */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-neon opacity-35 blur-xl animate-pulse-slow" />

              {/* Main Profile Card Container */}
              <div className="relative rounded-2xl glass-panel border border-cyber-cyan/40 p-5 shadow-2xl overflow-hidden cyber-corners">
                
                {/* HUD Top Bar */}
                <div className="flex items-center justify-between border-b border-cyber-border/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-mono text-xs font-semibold tracking-wider text-cyber-cyan">
                      ID: DINESH_A // SYS_ENG
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyber-neon led-green animate-ping" />
                    <span className="font-mono text-[11px] text-cyber-neon font-bold">ONLINE</span>
                  </div>
                </div>

                {/* Professional Photo with Futuristic Scanner Overlay */}
                <div className="relative group rounded-xl overflow-hidden border-2 border-cyber-border/80 aspect-[4/5] bg-black/40">
                  <img
                    src={personalInfo.photoUrl}
                    alt="Dinesh A - Junior Network & Linux Engineer"
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />

                  {/* Scanline & Grid Overlay */}
                  <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
                  
                  {/* Holographic HUD Elements Over Photo */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-cyber-cyan/30 text-[10px] font-mono text-cyber-cyan">
                    HOST: 192.168.1.105
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-cyber-neon/30 text-[10px] font-mono text-cyber-neon">
                    PORT 22: ALLOW
                  </div>

                  {/* Bottom HUD Banner */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 space-y-1">
                    <div className="text-white font-display font-bold text-lg tracking-wide flex items-center justify-between">
                      <span>DINESH A</span>
                      <span className="text-xs font-mono text-cyber-cyan">B.TECH IT (8.0 CGPA)</span>
                    </div>
                    <div className="text-xs font-mono text-cyber-neon">
                      Junior Network & Linux Engineer
                    </div>
                    <div className="text-[11px] text-cyber-text/70 flex items-center gap-1.5 pt-1">
                      <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>Cisco IOS • Amazon Linux • AWS EC2 • Python</span>
                    </div>
                  </div>
                </div>

                {/* Quick Diagnostics Strip */}
                <div className="mt-4 pt-3 border-t border-cyber-border flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-cyber-cyan">
                    <Network className="w-3.5 h-3.5" />
                    <span>L2/L3 SWITCHING</span>
                  </div>
                  <div className="text-cyber-border">|</div>
                  <div className="flex items-center gap-1.5 text-cyber-neon">
                    <Activity className="w-3.5 h-3.5" />
                    <span>SYSTEMD / APACHE</span>
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
