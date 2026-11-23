import React, { useState } from 'react';
import { Network, Terminal, Cloud, Code, Wrench, Shield, CheckCircle2, Cpu, HardDrive } from 'lucide-react';
import { personalInfo } from '../../utils/portfolioData';
import { sound } from '../../utils/soundFx';

export const AboutSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const pillars = [
    {
      id: 0,
      title: 'Networking Fundamentals',
      icon: Network,
      color: '#00f3ff',
      badge: 'Cisco IOS & Switching',
      description: 'Hands-on training in enterprise computer networking: TCP/IP and OSI 7-layer architecture, IPv4/IPv6 subnetting (VLSM), 802.1Q VLAN segmentation, Inter-VLAN routing, and Spanning Tree Protocol (STP).',
      skills: ['TCP/IP & OSI', 'IPv4/IPv6 Subnetting', 'VLAN 10/20 Tagging', '802.1Q Trunking', 'DHCP & DNS', 'NAT/PAT']
    },
    {
      id: 1,
      title: 'Linux System Administration',
      icon: Terminal,
      color: '#00ff66',
      badge: 'Ubuntu & Amazon Linux',
      description: 'Proficient in command-line administration, user and group access control (useradd, usermod), granular file permissions (chmod, chown), systemd service supervision (systemctl), and Apache HTTP Server hosting.',
      skills: ['Command Line (CLI)', 'User/Group Permissions', 'systemctl & Daemons', 'Apache (httpd)', 'SSH Key Authentication', 'UFW / Firewall']
    },
    {
      id: 2,
      title: 'AWS Cloud Infrastructure',
      icon: Cloud,
      color: '#ffb703',
      badge: 'EC2 & CloudWatch',
      description: 'Experience provisioning Amazon Linux EC2 compute instances, configuring stateful Security Groups for port whitelisting (80, 443, 22), monitoring health via CloudWatch alarms, and object storage with S3.',
      skills: ['AWS EC2 Linux', 'Security Groups', 'Amazon CloudWatch', 'AWS S3 Basics', 'IAM Roles & Policies', 'Load Balancer Basics']
    },
    {
      id: 3,
      title: 'Python Automation',
      icon: Code,
      color: '#9d4edd',
      badge: 'Data & Scripting',
      description: 'Developed Python automation scripts to streamline reporting pipelines, automated scorecard generation, and batch file processing, reducing repetitive manual tasks and improving data accuracy.',
      skills: ['Python 3 Scripting', 'Reporting Automation', 'Data Pipeline Scripts', 'Selenium QA Exposure', 'Git & GitHub']
    },
    {
      id: 4,
      title: 'Network Troubleshooting',
      icon: Wrench,
      color: '#0066ff',
      badge: 'Packet Analysis',
      description: 'Proven defect-isolation methodology honed during a 6-month SDET internship. Proficient in diagnosing connectivity failures, broadcast storms, and port dropouts using ping, traceroute, netstat, ss, and arp.',
      skills: ['ping & traceroute', 'netstat & ss Sockets', 'ip & ifconfig', 'nslookup & dig', 'Cisco Packet Tracer', 'Root-Cause Analysis']
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-cyber-bg overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-surface border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Shield className="w-3.5 h-3.5" />
            <span>SECTION // 02</span>
            <span className="text-cyber-border">•</span>
            <span>SYSTEM_OVERVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
            MISSION & PROFESSIONAL IDENTITY
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-neon mx-auto rounded" />
        </div>

        {/* Professional Summary Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyber-cyan/30 shadow-glass mb-14 relative overflow-hidden cyber-corners">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-neon">
                <span className="w-2 h-2 rounded-full bg-cyber-neon led-green animate-pulse" />
                <span>EXECUTIVE PROFILE & OBJECTIVE</span>
              </div>
              <p className="text-base sm:text-lg text-cyber-text leading-relaxed font-sans">
                {personalInfo.summary}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border text-xs font-mono text-cyber-cyan">
                  📍 Chennai / Coimbatore, India
                </span>
                <span className="px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border text-xs font-mono text-cyber-neon">
                  🎓 B.Tech IT (8.0 CGPA)
                </span>
                <span className="px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border text-xs font-mono text-cyber-amber">
                  💼 6-Month Enterprise QA Internship
                </span>
                <span className="px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border text-xs font-mono text-white">
                  🌐 Cisco IOS & Packet Tracer Certified
                </span>
              </div>
            </div>

            {/* Quick Live Telemetry Gauge */}
            <div className="lg:col-span-4 bg-cyber-surface/90 border border-cyber-border rounded-xl p-5 space-y-3">
              <div className="text-xs font-mono text-cyber-cyan border-b border-cyber-border pb-2 flex items-center justify-between">
                <span>NOC TELEMETRY STATUS</span>
                <Cpu className="w-4 h-4 text-cyber-cyan" />
              </div>
              
              <div className="space-y-2 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-cyber-muted mb-1">
                    <span>Networking Mastery</span>
                    <span className="text-cyber-cyan">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-cyber-bg rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-cyan rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-cyber-muted mb-1">
                    <span>Linux System Administration</span>
                    <span className="text-cyber-neon">90%</span>
                  </div>
                  <div className="w-full h-1.5 bg-cyber-bg rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-neon rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-cyber-muted mb-1">
                    <span>AWS Cloud Fundamentals</span>
                    <span className="text-cyber-amber">86%</span>
                  </div>
                  <div className="w-full h-1.5 bg-cyber-bg rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-amber rounded-full" style={{ width: '86%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-cyber-border text-[11px] font-mono text-cyber-muted flex items-center justify-between">
                <span className="flex items-center gap-1 text-cyber-neon">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Kernel v6.5 Healthy
                </span>
                <span className="flex items-center gap-1 text-cyber-cyan">
                  <HardDrive className="w-3.5 h-3.5" />
                  NVMe 18% Used
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 5 Core Engineering Pillars */}
        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide flex items-center justify-center sm:justify-start gap-2">
              <Network className="w-5 h-5 text-cyber-cyan" />
              <span>CORE ENGINEERING CAPABILITIES</span>
            </h3>
            <p className="text-sm font-mono text-cyber-muted mt-1">
              Select any pillar below to inspect architectural competence and toolchains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = selectedPillar === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPillar(pillar.id);
                  }}
                  className={`cursor-pointer rounded-xl p-6 transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? 'glass-panel border-2 border-cyber-cyan shadow-glow-cyan bg-cyber-surface/90 scale-[1.02]'
                      : 'glass-card border border-cyber-border hover:border-cyber-cyan/50 hover:bg-cyber-surface/60'
                  }`}
                >
                  {/* Top Badge & Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: `${pillar.color}15`,
                        border: `1px solid ${pillar.color}40`
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: pillar.color }} />
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                      style={{
                        color: pillar.color,
                        borderColor: `${pillar.color}40`,
                        backgroundColor: `${pillar.color}10`
                      }}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-lg font-display font-bold text-white mb-2 tracking-wide">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-cyber-text/80 leading-relaxed font-sans mb-4">
                    {pillar.description}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cyber-border/70">
                    {pillar.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-cyber-border text-cyber-text/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Active Selection Glow Dot */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyber-cyan led-cyan" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
