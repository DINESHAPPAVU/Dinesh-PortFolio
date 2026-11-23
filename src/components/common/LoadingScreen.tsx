import React, { useEffect, useState } from 'react';
import { Terminal, Shield, Cpu, Activity } from 'lucide-react';
import { sound } from '../../utils/soundFx';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFading, setIsFading] = useState(false);

  const bootMessages = [
    { text: '[INIT] Initializing Cyber NOC Core Kernel v6.5...', time: 200 },
    { text: '[OK] Establishing virtual 802.1Q VLAN Trunking bus...', time: 500 },
    { text: '[OK] Calibrating 3D WebGL Digital Network Globe...', time: 900 },
    { text: '[OK] Synchronizing AWS EC2 Linux Cloud Infrastructure...', time: 1300 },
    { text: '[OK] Mounting Interactive Cisco Topology Simulator...', time: 1700 },
    { text: '[AUTH] SYS_ADMIN: DINESH A verified [ACCESS GRANTED]', time: 2000 }
  ];

  useEffect(() => {
    sound.playTerminalKey();

    bootMessages.forEach((msg) => {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, msg.text]);
        sound.playTerminalKey();
      }, msg.time);
      return () => clearTimeout(timer);
    });

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            sound.playSuccess();
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setIsFading(true);
    sound.playClick();
    setTimeout(onComplete, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyber-bg text-cyber-text transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 cyber-grid-dense opacity-30" />
      <div className="relative z-10 w-full max-w-xl mx-4 p-6 glass-panel rounded-lg border border-cyber-cyan/30 shadow-glow-cyan cyber-corners">
        <div className="flex items-center justify-between border-b border-cyber-border pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyber-cyan animate-pulse" />
            <span className="font-mono text-sm tracking-wider text-cyber-cyan font-semibold">
              SYS_BOOT // NOC_OPERATIONS_CENTER
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-mono text-cyber-neon">
              <span className="w-2 h-2 rounded-full bg-cyber-neon led-green animate-ping" />
              ONLINE
            </span>
            <button
              onClick={handleSkip}
              className="text-xs font-mono text-cyber-muted hover:text-cyber-cyan transition-colors px-2 py-0.5 rounded border border-cyber-border hover:border-cyber-cyan"
            >
              [SKIP]
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-cyber-surface/80 border border-cyber-border p-2 rounded flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyber-blue" />
            <div className="text-[10px] font-mono leading-tight">
              <div className="text-cyber-muted">SECURITY</div>
              <div className="text-white font-semibold">SPI_ACTIVE</div>
            </div>
          </div>
          <div className="bg-cyber-surface/80 border border-cyber-border p-2 rounded flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyber-cyan" />
            <div className="text-[10px] font-mono leading-tight">
              <div className="text-cyber-muted">ENGINE</div>
              <div className="text-white font-semibold">THREE_JS_3D</div>
            </div>
          </div>
          <div className="bg-cyber-surface/80 border border-cyber-border p-2 rounded flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyber-neon" />
            <div className="text-[10px] font-mono leading-tight">
              <div className="text-cyber-muted">LATENCY</div>
              <div className="text-cyber-neon font-semibold">11.4 ms</div>
            </div>
          </div>
        </div>

        <div className="h-36 overflow-y-auto font-mono text-xs space-y-1.5 bg-black/60 p-3 rounded border border-cyber-border/70 scanline">
          {logs.map((log, index) => (
            <div
              key={index}
              className={`${
                log.includes('DINESH')
                  ? 'text-cyber-neon font-bold'
                  : log.includes('3D') || log.includes('AWS')
                  ? 'text-cyber-cyan'
                  : 'text-cyber-text/80'
              }`}
            >
              {log}
            </div>
          ))}
          <div className="flex items-center gap-1 text-cyber-cyan">
            <span>&gt;</span>
            <span className="terminal-cursor" />
          </div>
        </div>

        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-cyber-cyan">SYSTEM COMPONENT STATUS</span>
            <span className="text-cyber-neon font-semibold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-cyber-surface rounded-full overflow-hidden border border-cyber-border">
            <div
              className="h-full bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-neon transition-all duration-150 shadow-glow-cyan"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
