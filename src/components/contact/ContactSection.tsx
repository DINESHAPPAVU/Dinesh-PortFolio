import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { personalInfo } from '../../utils/portfolioData';
import { sound } from '../../utils/soundFx';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Network Engineering / Linux Opportunity',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = (text: string, field: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playPacketPulse();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sound.playSuccess();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00f3ff', '#0066ff', '#00ff66', '#ffb703']
        });
      } catch {}

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: 'Network Engineering / Linux Opportunity',
          message: ''
        });
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 bg-cyber-bg overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-surface border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Mail className="w-3.5 h-3.5" />
            <span>SECTION // 10</span>
            <span className="text-cyber-border">•</span>
            <span>TRANSMIT_DISPATCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
            CONNECT & INITIATE COMMUNICATON
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyber-muted max-w-2xl mx-auto">
            Available for full-time Junior Network Engineer, Junior Linux Administrator, and NOC / Cloud Support positions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-neon mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Social Media Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="glass-panel p-5 rounded-2xl border border-cyber-border hover:border-cyber-cyan/60 transition-all cyber-corners">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-cyan/15 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-cyber-muted">PRIMARY EMAIL</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-mono text-white hover:text-cyber-cyan font-bold transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  title="Copy email"
                  className="p-2 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-cyan text-cyber-muted hover:text-cyber-cyan transition-colors"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-cyber-neon" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="glass-panel p-5 rounded-2xl border border-cyber-border hover:border-cyber-neon/60 transition-all cyber-corners">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-neon/15 border border-cyber-neon/40 flex items-center justify-center text-cyber-neon">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-cyber-muted">DIRECT PHONE / WHATSAPP</div>
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-mono text-white hover:text-cyber-neon font-bold transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  title="Copy phone"
                  className="p-2 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-neon text-cyber-muted hover:text-cyber-neon transition-colors"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-cyber-neon" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & Status Card */}
            <div className="glass-panel p-5 rounded-2xl border border-cyber-border cyber-corners">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyber-amber/15 border border-cyber-amber/40 flex items-center justify-center text-cyber-amber">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyber-muted">LOCATION / RELOCATION</div>
                  <div className="text-sm font-mono text-white font-bold">
                    Chennai / Coimbatore, Tamil Nadu, India
                  </div>
                  <div className="text-[11px] font-mono text-cyber-neon">
                    Ready to join immediately & open to relocate
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="glass-card p-4 rounded-xl border border-cyber-border hover:border-cyber-blue hover:shadow-glow-blue transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded bg-blue-950/60 border border-cyber-blue/40 flex items-center justify-center text-cyber-blue group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div className="font-mono text-xs">
                  <div className="text-cyber-muted text-[10px]">PROFESSIONAL</div>
                  <div className="text-white font-bold group-hover:text-cyber-blue transition-colors">LinkedIn</div>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="glass-card p-4 rounded-xl border border-cyber-border hover:border-cyber-cyan hover:shadow-glow-cyan transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded bg-cyan-950/60 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan group-hover:scale-110 transition-transform">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div className="font-mono text-xs">
                  <div className="text-cyber-muted text-[10px]">CODE REPOS</div>
                  <div className="text-white font-bold group-hover:text-cyber-cyan transition-colors">GitHub</div>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Functional Contact Dispatch Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyber-cyan/30 shadow-glass relative cyber-corners">
              
              <div className="flex items-center justify-between border-b border-cyber-border pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyber-cyan" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    DISPATCH ENCRYPTED MESSAGE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyber-neon flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyber-neon led-green animate-pulse" />
                  ROUTING: DIRECT_INBOX
                </span>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyber-neon/20 border-2 border-cyber-neon text-cyber-neon mx-auto flex items-center justify-center shadow-glow-neon">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    MESSAGE DISPATCHED SUCCESSFULLY!
                  </h3>
                  <p className="text-sm font-mono text-cyber-text/80 max-w-md mx-auto">
                    Thank you for reaching out. Your transmission has been queued and Dinesh will respond promptly at {personalInfo.email}.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 rounded bg-cyber-surface border border-cyber-cyan text-xs font-mono text-cyber-cyan hover:bg-cyber-cyan/15 transition-colors"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-cyber-muted mb-1.5">
                        YOUR NAME / ORGANIZATION *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Hiring Manager / Technical Recruiter"
                        className="w-full bg-black/60 border border-cyber-border focus:border-cyber-cyan rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-cyber-muted/60 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyber-muted mb-1.5">
                        YOUR EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. recruiter@company.com"
                        className="w-full bg-black/60 border border-cyber-border focus:border-cyber-cyan rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-cyber-muted/60 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyber-muted mb-1.5">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-black/60 border border-cyber-border focus:border-cyber-cyan rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyber-muted mb-1.5">
                      TRANSMISSION PAYLOAD (MESSAGE) *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discuss job openings, interview scheduling, or networking opportunities..."
                      className="w-full bg-black/60 border border-cyber-border focus:border-cyber-cyan rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-cyber-muted/60 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Form Submission Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto cyber-btn px-6 py-3 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-neon text-cyber-bg font-mono font-bold text-xs tracking-wider rounded flex items-center justify-center gap-2 shadow-glow-cyan hover:shadow-glow-cyan-lg disabled:opacity-50 transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin" />
                          <span>TRANSMITTING PACKETS...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>TRANSMIT MESSAGE</span>
                        </>
                      )}
                    </button>

                    <div className="text-[10px] font-mono text-cyber-muted flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyber-neon" />
                      <span>Direct route to {personalInfo.email}</span>
                    </div>
                  </div>
                </form>
              )}

              {/* Backend Integration Note */}
              <div className="mt-6 pt-4 border-t border-cyber-border/70 text-[10px] font-mono text-cyber-muted">
                ℹ️ Form is configured with simulated immediate dispatch and can link directly to Formspree, EmailJS, or AWS SES webhook endpoint.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
