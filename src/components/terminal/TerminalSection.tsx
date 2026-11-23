import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ShieldAlert, Sparkles } from 'lucide-react';
import { runCommand, initialFileSystem } from '../../utils/terminalCommands';
import type { TerminalState } from '../../utils/terminalCommands';
import { sound } from '../../utils/soundFx';

interface HistoryItem {
  command: string;
  output: string;
  path: string;
}

export const TerminalSection: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'neofetch',
      path: '/home/dinesh',
      output: `       _,met$$$$$gg.          dinesh@cyber-noc
    ,g$$$$$$$$$$$$$$$P.       ----------------
  ,g$$P"     """Y$$.".        OS: Ubuntu 24.04 LTS / Amazon Linux 2023 x86_64
 ,$$P'              \`$$$.     Host: AWS EC2 t3.medium Virtual Machine
',$$P       ,ggs.     \`$$b:   Kernel: 6.5.0-35-generic
\`d$$'     ,$P"'   .    $$$    Uptime: 48 days, 14 hours, 22 mins
 $$P      d$'     ,    $$P    Shell: bash 5.2.21
 $$:      $$.   -    ,d$$'    Terminal: xterm-256color
 $$;      Y$b._   _,d$P'      CPU: AMD EPYC 7R13 (2 vCPU) @ 2.650GHz
 Y$$.    \`."Y$$$$P"'          Memory: 3842MiB / 16384MiB (23%)
  \`$$b      "-.__             Network: eth0: 192.168.1.105/24 (Gigabit LAN)
   \`Y$$                       Services: httpd (active), sshd (active), ufw (active)
    \`$$b.                     Role: Junior Network Engineer | Linux Administrator
      \`Y$$b.
        \`"Y$b._
            \`"""`
    },
    {
      command: 'cat about.txt',
      path: '/home/dinesh',
      output: `DINESH A - Junior Network Engineer & Linux Administrator
Location: Chennai / Coimbatore, India
Phone: +91 83007 58173 | Email: adineshsusi@gmail.com
LinkedIn: linkedin.com/in/dinesh-appavu-97763824a
GitHub: github.com/DINESHAPPAVU

Passionate about computer networking (TCP/IP, OSI, Cisco IOS, VLANs, Subnetting),
Linux systems administration (Ubuntu, Amazon Linux, Apache httpd, systemctl),
and AWS Cloud infrastructure (EC2, Security Groups, S3, CloudWatch).`
    }
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>(['neofetch', 'cat about.txt']);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [state, setState] = useState<TerminalState>({
    currentPath: '/home/dinesh',
    fileSystem: initialFileSystem
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    sound.playTerminalKey();
    const result = runCommand(trimmed, state);

    if (result.output === '__CLEAR__') {
      setHistory([]);
    } else {
      setHistory(prev => [
        ...prev,
        {
          command: trimmed,
          output: result.output,
          path: state.currentPath
        }
      ]);
    }

    setState(result.newState);
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryPointer(-1);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextIndex = historyPointer + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const available = ['whoami', 'pwd', 'ls', 'mkdir', 'touch', 'cat', 'clear', 'date', 'uname -a', 'hostname', 'ip addr', 'ip route', 'ping', 'df -h', 'free -h', 'ps', 'systemctl status httpd', 'chmod', 'chown', 'ssh', 'help', 'neofetch', 'about.txt', 'resume.txt', 'skills.json', 'aws_deploy.sh', 'cisco_vlan.conf'];
      const match = available.find(c => c.startsWith(inputVal.trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const handleQuickCommand = (cmd: string) => {
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  const quickCommands = [
    'whoami',
    'ls -la',
    'cat about.txt',
    'cat resume.txt',
    'ip addr',
    'ping 8.8.8.8',
    'systemctl status httpd',
    'df -h',
    'cat aws_deploy.sh',
    'neofetch',
    'help'
  ];

  return (
    <section id="terminal" className="relative py-24 bg-cyber-bg overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-surface border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>SECTION // 04</span>
            <span className="text-cyber-border">•</span>
            <span>LINUX_SHELL_SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
            INTERACTIVE LINUX TERMINAL
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyber-muted max-w-2xl mx-auto">
            A realistic browser-based Linux shell simulator. Inspect system configurations, network sockets, active systemd services, and file permissions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-neon mx-auto rounded" />
        </div>

        {/* Quick Command Chips */}
        <div className="mb-4">
          <div className="text-xs font-mono text-cyber-muted mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>QUICK SIMULATED COMMANDS (CLICK TO EXECUTE):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="px-2.5 py-1 rounded text-xs font-mono text-cyber-cyan bg-cyber-surface/90 border border-cyber-border hover:border-cyber-cyan hover:bg-cyber-cyan/15 hover:shadow-glow-cyan transition-all"
              >
                $ {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window Frame */}
        <div className="rounded-2xl border-2 border-cyber-cyan/40 bg-black/90 shadow-2xl overflow-hidden glass-panel cyber-corners">
          
          {/* Top Window Chrome */}
          <div className="bg-cyber-surface/90 border-b border-cyber-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-3 font-mono text-xs text-cyber-cyan font-semibold hidden sm:inline">
                dinesh@cyber-noc: {state.currentPath} (bash)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-cyber-border text-cyber-neon">
                x86_64 GNU/Linux
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  executeCommand('clear');
                }}
                className="text-xs font-mono text-cyber-muted hover:text-white px-2 py-0.5 rounded border border-cyber-border hover:border-cyber-cyan"
                title="Clear screen"
              >
                CLEAR
              </button>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-5 font-mono text-xs sm:text-sm min-h-[380px] max-h-[520px] overflow-y-auto space-y-4 scanline cursor-text"
          >
            {/* Terminal History Entries */}
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {/* Prompt Line */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-cyber-neon font-bold">dinesh@cyber-noc</span>
                  <span className="text-cyber-muted">:</span>
                  <span className="text-cyber-cyan">{item.path}</span>
                  <span className="text-cyber-muted">$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
                {/* Output Pre */}
                {item.output && (
                  <pre className="text-cyber-text/90 whitespace-pre-wrap leading-relaxed font-mono text-xs pl-2 border-l border-cyber-border/60">
                    {item.output}
                  </pre>
                )}
              </div>
            ))}

            {/* Active Command Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-cyber-neon font-bold">dinesh@cyber-noc</span>
              <span className="text-cyber-muted">:</span>
              <span className="text-cyber-cyan">{state.currentPath}</span>
              <span className="text-cyber-muted">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  sound.playTerminalKey();
                  setInputVal(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none min-w-[200px]"
                autoFocus
                placeholder="Type 'help' or try commands above..."
              />
              <span className="terminal-cursor" />
            </form>

            <div ref={terminalEndRef} />
          </div>

          {/* Educational Disclaimer Footer */}
          <div className="bg-cyber-surface/80 border-t border-cyber-border px-4 py-2 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-cyber-muted gap-1">
            <div className="flex items-center gap-1.5 text-cyber-amber">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>FRONTEND EDUCATIONAL SIMULATOR // SAFE CLIENT-SIDE SANDBOX</span>
            </div>
            <div className="text-cyber-text/60">
              Supported: whoami, ls, cat, ip addr, ping, systemctl, ssh, df, free, ps
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
