import React, { useState } from 'react';
import { 
  Network, Server, Shield, Globe, Monitor, Radio, Play, CheckCircle, 
  Layers, Info, ArrowRight, Zap, RefreshCw, Cpu
} from 'lucide-react';
import { topologyDevices, osiLayers, keyNetworkingConcepts } from '../../utils/networkTopologyData';
import type { NetworkDevice, SimulationLog } from '../../types';
import { sound } from '../../utils/soundFx';

export const NetworkingLabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'topology' | 'osi' | 'concepts'>('topology');
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice>(topologyDevices[2]); // Default Cisco Router
  const [simSource, setSimSource] = useState<string>('pc1');
  const [simDest, setSimDest] = useState<string>('server');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<SimulationLog[]>([]);

  // Device icon helper
  const renderDeviceIcon = (type: string, className = "w-6 h-6") => {
    switch (type) {
      case 'cloud':
        return <Globe className={className} />;
      case 'firewall':
        return <Shield className={className} />;
      case 'router':
        return <Radio className={className} />;
      case 'l3switch':
      case 'l2switch':
        return <Network className={className} />;
      case 'server':
        return <Server className={className} />;
      case 'pc':
        return <Monitor className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  // Run realistic Cisco Packet Tracer simulation
  const handleStartSimulation = () => {
    if (isSimulating) return;

    sound.playPacketPulse();
    setIsSimulating(true);
    setSimStep(0);
    setSimulationLogs([]);

    const srcObj = topologyDevices.find(d => d.id === simSource);
    const destObj = topologyDevices.find(d => d.id === simDest);

    const logEntries: Omit<SimulationLog, 'id' | 'time'>[] = [
      {
        source: srcObj?.name || 'Source',
        destination: 'Default Gateway',
        protocol: 'ARP',
        step: `ARP Request: Broadcast from ${srcObj?.ip} -> Who has default gateway?`,
        status: 'forwarding'
      },
      {
        source: 'Access Switch 2960',
        destination: 'L3 Multi-layer Switch',
        protocol: 'TCP',
        step: `802.1Q Encapsulation: Frame tagged with ${srcObj?.vlan || 'VLAN 10'} over Trunk Gig0/1`,
        status: 'forwarding'
      },
      {
        source: 'L3 Switch / Router',
        destination: 'Firewall',
        protocol: 'ICMP',
        step: `Inter-VLAN Route lookup & forwarding to Next-Hop: ${destObj?.ip}`,
        status: 'inspecting'
      },
      {
        source: 'Perimeter Firewall',
        destination: destObj?.name || 'Destination',
        protocol: 'ICMP',
        step: `Stateful Inspection: Permitted ICMP Echo Request (Type 8) to target`,
        status: 'forwarding'
      },
      {
        source: destObj?.name || 'Destination',
        destination: srcObj?.name || 'Source',
        protocol: 'ICMP',
        step: `ICMP Echo Reply (Type 0) returned! RTT: 1.84ms, TTL=64, 0% Packet Loss`,
        status: 'success'
      }
    ];

    logEntries.forEach((entry, index) => {
      setTimeout(() => {
        setSimStep(index + 1);
        sound.playTerminalKey();
        setSimulationLogs(prev => [
          ...prev,
          {
            id: Date.now() + index,
            time: new Date().toLocaleTimeString(),
            ...entry
          }
        ]);

        if (index === logEntries.length - 1) {
          sound.playSuccess();
          setIsSimulating(false);
        }
      }, (index + 1) * 850);
    });
  };

  return (
    <section id="lab" className="relative py-24 bg-cyber-surface/40 overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-surface border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan shadow-glow-cyan">
            <Network className="w-3.5 h-3.5" />
            <span>SECTION // 03</span>
            <span className="text-cyber-border">•</span>
            <span>CISCO PACKET TRACER VIRTUAL LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
            INTERACTIVE NETWORKING LAB
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyber-muted max-w-3xl mx-auto">
            Explore live network topologies, test packet traces across VLANs and firewalls, and inspect device configurations modeled on enterprise Cisco architectures.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-neon mx-auto rounded" />
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-cyber-bg border border-cyber-border/80 shadow-glass">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('topology');
              }}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-mono rounded-lg transition-all ${
                activeTab === 'topology'
                  ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/50 font-bold shadow-glow-cyan'
                  : 'text-cyber-muted hover:text-white'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>3D TOPOLOGY & SIMULATOR</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('osi');
              }}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-mono rounded-lg transition-all ${
                activeTab === 'osi'
                  ? 'bg-cyber-neon/15 text-cyber-neon border border-cyber-neon/50 font-bold shadow-glow-neon'
                  : 'text-cyber-muted hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>OSI vs TCP/IP ARCHITECTURE</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('concepts');
              }}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-mono rounded-lg transition-all ${
                activeTab === 'concepts'
                  ? 'bg-cyber-amber/15 text-cyber-amber border border-cyber-amber/50 font-bold shadow-glow-amber'
                  : 'text-cyber-muted hover:text-white'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>KEY CONCEPTS (VLAN, DHCP, NAT)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TOPOLOGY LAB & PACKET SIMULATOR */}
        {activeTab === 'topology' && (
          <div className="space-y-8">
            
            {/* Main Interactive Diagram & Device Inspector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Interactive Topology Visualizer Canvas (8 Cols) */}
              <div className="lg:col-span-8 glass-panel rounded-2xl border border-cyber-cyan/30 p-5 shadow-2xl relative cyber-corners flex flex-col justify-between">
                
                {/* Topology HUD Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-border pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyber-neon led-green animate-pulse" />
                    <span className="font-mono text-xs text-white font-bold tracking-wider">
                      TOPOLOGY: ENTERPRISE MULTI-TIER NETWORK
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-cyber-muted">
                    <span className="text-cyber-cyan">VLAN 10: ENG</span>
                    <span>|</span>
                    <span className="text-cyber-neon">VLAN 20: OPS</span>
                    <span>|</span>
                    <span className="text-cyber-amber">DMZ: SERVER</span>
                  </div>
                </div>

                {/* Device Nodes Canvas Grid */}
                <div className="relative min-h-[460px] w-full rounded-xl bg-black/60 border border-cyber-border/70 p-6 flex flex-col justify-between scanline overflow-hidden">
                  
                  {/* Tier 1: Cloud & External WAN */}
                  <div className="flex justify-center">
                    {topologyDevices.filter(d => d.type === 'cloud').map(device => {
                      const isSelected = selectedDevice.id === device.id;
                      return (
                        <div
                          key={device.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedDevice(device);
                          }}
                          className={`cursor-pointer px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'bg-cyber-cyan/20 border-cyber-cyan shadow-glow-cyan scale-105'
                              : 'bg-cyber-surface/90 border-cyber-border hover:border-cyber-cyan/50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                            {renderDeviceIcon(device.type)}
                          </div>
                          <div className="text-left font-mono">
                            <div className="text-xs font-bold text-white">{device.name}</div>
                            <div className="text-[10px] text-cyber-cyan">{device.ip}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Connecting Line 1 */}
                  <div className="flex justify-center -my-1">
                    <div className="h-6 w-0.5 bg-gradient-to-b from-cyber-cyan to-cyber-blue" />
                  </div>

                  {/* Tier 2: Firewall & DMZ Server */}
                  <div className="flex items-center justify-center gap-8 sm:gap-14">
                    {topologyDevices.filter(d => d.type === 'firewall').map(device => {
                      const isSelected = selectedDevice.id === device.id;
                      return (
                        <div
                          key={device.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedDevice(device);
                          }}
                          className={`cursor-pointer px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'bg-cyber-blue/20 border-cyber-cyan shadow-glow-cyan scale-105'
                              : 'bg-cyber-surface/90 border-cyber-border hover:border-cyber-cyan/50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded bg-blue-950/80 border border-cyber-blue/40 flex items-center justify-center text-cyber-blue">
                            {renderDeviceIcon(device.type)}
                          </div>
                          <div className="text-left font-mono">
                            <div className="text-xs font-bold text-white">{device.name}</div>
                            <div className="text-[10px] text-cyber-neon">{device.badge}</div>
                          </div>
                        </div>
                      );
                    })}

                    {/* DMZ Server Branch */}
                    {topologyDevices.filter(d => d.type === 'server').map(device => {
                      const isSelected = selectedDevice.id === device.id;
                      return (
                        <div
                          key={device.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedDevice(device);
                          }}
                          className={`cursor-pointer px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'bg-cyber-amber/20 border-cyber-amber shadow-glow-amber scale-105'
                              : 'bg-cyber-surface/90 border-cyber-border hover:border-cyber-amber/50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded bg-amber-950/80 border border-cyber-amber/40 flex items-center justify-center text-cyber-amber">
                            {renderDeviceIcon(device.type)}
                          </div>
                          <div className="text-left font-mono">
                            <div className="text-xs font-bold text-white">{device.name}</div>
                            <div className="text-[10px] text-cyber-amber">{device.ip}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Connecting Line 2 */}
                  <div className="flex justify-center -my-1">
                    <div className="h-6 w-0.5 bg-gradient-to-b from-cyber-blue to-cyber-cyan" />
                  </div>

                  {/* Tier 3: Core Router & L3 Switch */}
                  <div className="flex items-center justify-center gap-6 sm:gap-12">
                    {topologyDevices.filter(d => d.type === 'router' || d.type === 'l3switch').map(device => {
                      const isSelected = selectedDevice.id === device.id;
                      return (
                        <div
                          key={device.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedDevice(device);
                          }}
                          className={`cursor-pointer px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'bg-cyber-cyan/20 border-cyber-cyan shadow-glow-cyan scale-105'
                              : 'bg-cyber-surface/90 border-cyber-border hover:border-cyber-cyan/50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                            {renderDeviceIcon(device.type)}
                          </div>
                          <div className="text-left font-mono">
                            <div className="text-xs font-bold text-white">{device.name}</div>
                            <div className="text-[10px] text-cyber-cyan">{device.badge}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Connecting Line 3 */}
                  <div className="flex justify-center -my-1">
                    <div className="h-6 w-0.5 bg-gradient-to-b from-cyber-cyan to-cyber-neon" />
                  </div>

                  {/* Tier 4: Layer 2 Access Switch */}
                  <div className="flex justify-center">
                    {topologyDevices.filter(d => d.type === 'l2switch').map(device => {
                      const isSelected = selectedDevice.id === device.id;
                      return (
                        <div
                          key={device.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedDevice(device);
                          }}
                          className={`cursor-pointer px-5 py-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'bg-cyber-neon/20 border-cyber-neon shadow-glow-neon scale-105'
                              : 'bg-cyber-surface/90 border-cyber-border hover:border-cyber-neon/50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded bg-emerald-950/80 border border-cyber-neon/40 flex items-center justify-center text-cyber-neon">
                            {renderDeviceIcon(device.type)}
                          </div>
                          <div className="text-left font-mono">
                            <div className="text-xs font-bold text-white">{device.name}</div>
                            <div className="text-[10px] text-cyber-neon">802.1Q TRUNK & ACCESS</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Connecting Line 4 (Branching to PC1 & PC2) */}
                  <div className="flex justify-around px-16 -my-1">
                    <div className="h-6 w-0.5 bg-cyber-cyan" />
                    <div className="h-6 w-0.5 bg-cyber-neon" />
                  </div>

                  {/* Tier 5: Department PC Workstations */}
                  <div className="flex items-center justify-around gap-4">
                    {topologyDevices.filter(d => d.type === 'pc').map(device => {
                      const isSelected = selectedDevice.id === device.id;
                      return (
                        <div
                          key={device.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedDevice(device);
                          }}
                          className={`cursor-pointer px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'bg-cyber-cyan/20 border-cyber-cyan shadow-glow-cyan scale-105'
                              : 'bg-cyber-surface/90 border-cyber-border hover:border-cyber-cyan/50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded bg-blue-950/80 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                            {renderDeviceIcon(device.type)}
                          </div>
                          <div className="text-left font-mono">
                            <div className="text-xs font-bold text-white">{device.name}</div>
                            <div className="text-[10px] text-cyber-neon font-semibold">{device.vlan}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Animated Traveling Packet Marker */}
                  {isSimulating && (
                    <div className="absolute top-4 right-4 bg-cyber-surface/90 border border-cyber-cyan px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono text-xs text-cyber-cyan animate-pulse shadow-glow-cyan">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>STEP {simStep}/5: PACKET IN FLIGHT</span>
                    </div>
                  )}

                </div>

                {/* Packet Simulation Control Console */}
                <div className="mt-5 p-4 rounded-xl bg-cyber-surface/90 border border-cyber-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto font-mono text-xs">
                    <span className="text-cyber-muted">SIMULATE TRACE:</span>
                    
                    {/* Source Device Selector */}
                    <div className="flex items-center gap-1.5 bg-cyber-bg px-2.5 py-1 rounded border border-cyber-border">
                      <span className="text-cyber-cyan">SRC:</span>
                      <select
                        value={simSource}
                        onChange={(e) => setSimSource(e.target.value)}
                        className="bg-transparent text-white font-mono text-xs focus:outline-none"
                      >
                        <option value="pc1" className="bg-cyber-bg">PC-1 (VLAN 10)</option>
                        <option value="pc2" className="bg-cyber-bg">PC-2 (VLAN 20)</option>
                        <option value="server" className="bg-cyber-bg">Web Server</option>
                      </select>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-cyber-muted hidden sm:inline" />

                    {/* Destination Device Selector */}
                    <div className="flex items-center gap-1.5 bg-cyber-bg px-2.5 py-1 rounded border border-cyber-border">
                      <span className="text-cyber-neon">DEST:</span>
                      <select
                        value={simDest}
                        onChange={(e) => setSimDest(e.target.value)}
                        className="bg-transparent text-white font-mono text-xs focus:outline-none"
                      >
                        <option value="server" className="bg-cyber-bg">Web Server (192.168.1.100)</option>
                        <option value="cloud" className="bg-cyber-bg">Internet WAN Cloud</option>
                        <option value="pc2" className="bg-cyber-bg">PC-2 (VLAN 20)</option>
                        <option value="pc1" className="bg-cyber-bg">PC-1 (VLAN 10)</option>
                      </select>
                    </div>
                  </div>

                  {/* Trigger Simulation Button */}
                  <button
                    onClick={handleStartSimulation}
                    disabled={isSimulating}
                    className="w-full sm:w-auto cyber-btn px-5 py-2.5 bg-gradient-to-r from-cyber-cyan to-cyber-neon text-cyber-bg font-mono font-bold text-xs tracking-wider rounded flex items-center justify-center gap-2 shadow-glow-cyan disabled:opacity-50"
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>TRACING PATH...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>RUN ICMP PING TRACE</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Floating Glassmorphic Device Inspector (4 Cols) */}
              <div className="lg:col-span-4 glass-panel rounded-2xl border border-cyber-cyan/30 p-5 shadow-2xl relative cyber-corners flex flex-col justify-between">
                <div>
                  {/* Inspector Header */}
                  <div className="flex items-center justify-between border-b border-cyber-border pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                        {renderDeviceIcon(selectedDevice.type, "w-4 h-4")}
                      </div>
                      <div>
                        <div className="font-mono text-xs text-cyber-cyan font-bold">DEVICE INSPECTOR</div>
                        <div className="font-display font-bold text-white text-base leading-tight">
                          {selectedDevice.name}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-neon/15 border border-cyber-neon/40 text-cyber-neon font-semibold">
                      {selectedDevice.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Device Configuration Specs */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="bg-cyber-surface/80 p-3 rounded-lg border border-cyber-border space-y-2">
                      <div className="flex justify-between">
                        <span className="text-cyber-muted">IP Address:</span>
                        <span className="text-cyber-cyan font-bold">{selectedDevice.ip}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyber-muted">Subnet Mask:</span>
                        <span className="text-white">{selectedDevice.subnet}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyber-muted">MAC Address:</span>
                        <span className="text-cyber-neon">{selectedDevice.mac}</span>
                      </div>
                      {selectedDevice.gateway && (
                        <div className="flex justify-between">
                          <span className="text-cyber-muted">Default Gateway:</span>
                          <span className="text-white">{selectedDevice.gateway}</span>
                        </div>
                      )}
                      {selectedDevice.vlan && (
                        <div className="flex justify-between">
                          <span className="text-cyber-muted">VLAN Segment:</span>
                          <span className="text-cyber-amber font-bold">{selectedDevice.vlan}</span>
                        </div>
                      )}
                    </div>

                    {/* Description of Dinesh's Configuration */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] text-cyber-cyan font-bold tracking-wider">
                        CISCO LAB CONFIGURATION:
                      </div>
                      <p className="text-[11px] text-cyber-text/85 font-sans leading-relaxed bg-black/40 p-3 rounded-lg border border-cyber-border">
                        {selectedDevice.description}
                      </p>
                    </div>

                    {/* Interface Port Matrix */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] text-cyber-neon font-bold tracking-wider">
                        PORT INTERFACE TABLE:
                      </div>
                      <div className="space-y-1.5">
                        {selectedDevice.interfaces.map((intf, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-cyber-surface/90 px-2.5 py-1.5 rounded border border-cyber-border text-[10px]"
                          >
                            <span className="text-white font-bold">{intf.port}</span>
                            <span className="text-cyber-neon font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyber-neon led-green" />
                              {intf.speed}
                            </span>
                            {intf.vlan && (
                              <span className="text-cyber-amber font-mono">VLAN {intf.vlan}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Packet Tracer Verification Tip */}
                <div className="mt-4 pt-3 border-t border-cyber-border text-[10px] font-mono text-cyber-muted flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyber-neon shrink-0" />
                  <span>Configured & verified in Cisco Packet Tracer</span>
                </div>
              </div>

            </div>

            {/* Real-time Simulation Event Logs Terminal */}
            {simulationLogs.length > 0 && (
              <div className="glass-panel p-5 rounded-2xl border border-cyber-neon/40 shadow-glow-neon">
                <div className="flex items-center justify-between border-b border-cyber-border pb-2.5 mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyber-neon font-bold">
                    <Zap className="w-4 h-4 text-cyber-neon" />
                    <span>REAL-TIME PACKET FLOW TRACE LOGS</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyber-muted">
                    {simulationLogs.length} EVENTS RECORDED
                  </span>
                </div>
                <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto">
                  {simulationLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded bg-black/60 border border-cyber-border text-cyber-text"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-cyber-muted text-[10px]">{log.time}</span>
                        <span className="px-1.5 py-0.2 rounded bg-cyber-cyan/15 text-cyber-cyan text-[10px] font-bold border border-cyber-cyan/30">
                          {log.protocol}
                        </span>
                        <span className="text-white">{log.step}</span>
                      </div>
                      <span className={`text-[10px] font-bold ${
                        log.status === 'success' ? 'text-cyber-neon' : 'text-cyber-amber'
                      }`}>
                        [{log.status.toUpperCase()}]
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: OSI 7-LAYER vs TCP/IP ARCHITECTURE */}
        {activeTab === 'osi' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyber-cyan/30 shadow-glass space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyber-border pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">
                  OSI 7-LAYER MODEL VS TCP/IP PROTOCOL STACK
                </h3>
                <p className="text-xs font-mono text-cyber-muted">
                  Comprehensive layer-by-layer architectural comparison with Dinesh's hands-on project implementation details.
                </p>
              </div>
              <span className="px-3 py-1 rounded bg-cyber-surface border border-cyber-cyan/40 text-xs font-mono text-cyber-cyan">
                CCNA CURRICULUM MASTERY
              </span>
            </div>

            <div className="space-y-3">
              {osiLayers.map((layer) => (
                <div
                  key={layer.number}
                  className="glass-card p-4 rounded-xl border border-cyber-border hover:border-cyber-cyan/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyber-surface border border-cyber-cyan/40 flex items-center justify-center font-display font-bold text-lg text-cyber-cyan shrink-0">
                      L{layer.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base text-white">
                          {layer.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyber-surface border border-cyber-border text-cyber-neon">
                          {layer.protocols}
                        </span>
                      </div>
                      <p className="text-xs text-cyber-text/80 font-sans mt-0.5">
                        {layer.description}
                      </p>
                    </div>
                  </div>

                  <div className="lg:max-w-md bg-black/40 p-2.5 rounded border border-cyber-border/70 text-xs font-mono">
                    <span className="text-cyber-cyan font-semibold block text-[10px] uppercase">
                      DINESH'S HANDS-ON IMPLEMENTATION:
                    </span>
                    <span className="text-cyber-text/90 text-[11px]">
                      {layer.dineshRole}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: KEY NETWORKING CONCEPTS */}
        {activeTab === 'concepts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyNetworkingConcepts.map((concept, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-cyber-cyan/30 shadow-glass space-y-4 cyber-corners"
              >
                <div className="flex items-center justify-between border-b border-cyber-border pb-3">
                  <h4 className="font-display font-bold text-xl text-white tracking-wide">
                    {concept.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 font-bold">
                    {concept.tag}
                  </span>
                </div>

                <p className="text-sm font-sans text-cyber-text/90">
                  {concept.summary}
                </p>

                <ul className="space-y-2 pt-2 border-t border-cyber-border/70">
                  {concept.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs font-mono text-cyber-text/80 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-neon mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
