import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, FileDown, Terminal, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/soundFx';

interface NavbarProps {
  onAudioToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['hero', 'about', 'lab', 'terminal', 'aws', 'projects', 'skills', 'experience', 'education', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'NETWORKING LAB', href: '#lab', id: 'lab', badge: 'LAB' },
    { label: 'TERMINAL', href: '#terminal', id: 'terminal' },
    { label: 'AWS CLOUD', href: '#aws', id: 'aws' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'EDUCATION', href: '#education', id: 'education' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-border/80 shadow-glass py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Callout */}
        <a
          href="#hero"
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded bg-cyber-surface border border-cyber-cyan/40 flex items-center justify-center group-hover:border-cyber-cyan group-hover:shadow-glow-cyan transition-all">
            <Terminal className="w-5 h-5 text-cyber-cyan group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <div className="font-display font-bold text-base tracking-wider text-white flex items-center gap-2">
              DINESH A
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan rounded">
                NOC_ENG
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyber-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-neon led-green animate-pulse" />
              <span>SYS_ADMIN: ONLINE</span>
              <span className="text-cyber-border">|</span>
              <span className="text-cyber-cyan">11ms</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => sound.playClick()}
              className={`relative px-3 py-1.5 text-xs font-mono tracking-wider transition-colors rounded ${
                activeSection === item.id
                  ? 'text-cyber-cyan bg-cyber-cyan/10 font-bold border border-cyber-cyan/30'
                  : 'text-cyber-text/75 hover:text-cyber-cyan hover:bg-cyber-surface/60'
              }`}
            >
              {item.label}
              {item.badge && (
                <span className="ml-1.5 text-[9px] px-1 py-0.2 rounded bg-cyber-neon/20 text-cyber-neon font-sans border border-cyber-neon/30">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls: Audio Mute, Resume Button, Mobile Menu */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute Futuristic UI Audio' : 'Mute Futuristic UI Audio'}
            className="p-2 rounded bg-cyber-surface/80 border border-cyber-border hover:border-cyber-cyan text-cyber-muted hover:text-cyber-cyan transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-cyber-muted" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyber-neon animate-pulse" />
            )}
          </button>

          {/* Quick Resume Download */}
          <a
            href="/Dinesh_A_Resume.pdf"
            download="Dinesh_A_Network_Linux_Resume.pdf"
            onClick={() => sound.playSuccess()}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono text-white bg-cyber-surface hover:bg-cyber-cyan/15 border border-cyber-cyan/40 hover:border-cyber-cyan rounded shadow-glow-cyan transition-all"
          >
            <FileDown className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden p-2 rounded bg-cyber-surface border border-cyber-border text-cyber-cyan hover:bg-cyber-surface/80"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-b border-cyber-border mt-2 px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded text-xs font-mono tracking-wider border ${
                  activeSection === item.id
                    ? 'text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/40 font-bold'
                    : 'text-cyber-text/80 bg-cyber-surface/60 border-cyber-border'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-cyber-border flex items-center justify-between">
            <span className="text-[11px] font-mono text-cyber-muted flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyber-neon" />
              AUTHENTICATED VIRTUAL NOC
            </span>
            <a
              href="/Dinesh_A_Resume.pdf"
              download="Dinesh_A_Network_Linux_Resume.pdf"
              onClick={() => sound.playSuccess()}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-cyber-cyan bg-cyber-surface border border-cyber-cyan/40 rounded"
            >
              <FileDown className="w-3 h-3" />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
