export interface NetworkDevice {
  id: string;
  name: string;
  type: 'router' | 'l3switch' | 'l2switch' | 'firewall' | 'server' | 'pc' | 'cloud';
  ip: string;
  mac: string;
  subnet: string;
  gateway?: string;
  vlan?: string | number;
  status: 'online' | 'active' | 'filtering';
  interfaces: {
    port: string;
    status: 'up' | 'down';
    speed: string;
    vlan?: string;
    connectedTo?: string;
  }[];
  description: string;
  x: number;
  y: number;
  z?: number;
  badge: string;
}

export interface NetworkConnection {
  from: string;
  to: string;
  type: 'trunk' | 'access' | 'wan' | 'dmz';
  speed: string;
  active: boolean;
}

export interface SimulationLog {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: 'ARP' | 'ICMP' | 'TCP' | 'DNS' | 'HTTP';
  step: string;
  status: 'success' | 'forwarding' | 'inspecting' | 'resolved';
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: 'AWS Cloud' | 'Cisco Networking' | 'Linux Admin' | 'IoT / Systems';
  date: string;
  badge: string;
  summary: string;
  highlights: string[];
  skills: string[];
  architecture?: {
    nodes: string[];
    description: string;
  };
  metrics?: { label: string; value: string }[];
  details: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  color: string;
  skills: {
    name: string;
    level: number;
    badge?: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  metrics?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score: string;
  scoreLabel: string;
  highlights?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  category: string;
  badge: string;
  date?: string;
}
