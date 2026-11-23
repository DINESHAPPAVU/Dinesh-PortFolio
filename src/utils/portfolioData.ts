import type { ProjectData, SkillCategory, ExperienceItem, EducationItem, CertificationItem } from '../types';

export const personalInfo = {
  name: 'Dinesh A',
  title: 'Junior Network Engineer | Junior Linux Engineer | Linux System Administrator',
  subtitles: [
    'Junior Network Engineer',
    'Linux System Administrator',
    'AWS Cloud Enthusiast',
    'NOC & Infrastructure Specialist'
  ],
  tagline: 'Connecting Networks. Managing Systems. Building Reliable Infrastructure.',
  summary: 'B.Tech Information Technology graduate with hands-on training in computer networking, Cisco routing and switching, Linux administration, and AWS cloud fundamentals. Experienced in configuring VLANs, trunking, and inter-VLAN routing, deploying Linux web servers on AWS EC2, and troubleshooting connectivity issues with CLI tools. Brings strong defect-diagnosis and documentation skills from a 6-month SDET/QA internship. Seeking an entry-level Network Engineer, Linux System Administrator, or NOC/Support Engineer role.',
  email: 'adineshsusi@gmail.com',
  phone: '+91 83007 58173',
  location: 'Chennai / Coimbatore, India',
  linkedin: 'https://linkedin.com/in/dinesh-appavu-97763824a',
  github: 'https://github.com/DINESHAPPAVU',
  resumeUrl: '/Dinesh_A_Resume.pdf',
  photoUrl: '/dinesh-photo.jpg',
  metrics: {
    uptime: '99.98%',
    packetLoss: '0.00%',
    pingLatency: '11.4 ms',
    activeCores: '8 / 8',
    resolvedTickets: '100%'
  }
};

export const projectsData: ProjectData[] = [
  {
    id: 'aws-web-server',
    title: 'Web Server Deployment & Monitoring on AWS',
    subtitle: 'Amazon EC2 Linux + Apache (httpd) + Security Groups + CloudWatch',
    category: 'AWS Cloud',
    date: 'September 2026',
    badge: 'AWS CLOUD PROD',
    summary: 'Deployed and hosted a resilient website on an Amazon EC2 Linux instance using the Apache HTTP Server (httpd), fully secured through AWS Security Groups and monitored via Amazon CloudWatch metrics.',
    highlights: [
      'Provisioned an Amazon Linux EC2 instance and established secure SSH terminal management via RSA/ED25519 key-pairs.',
      'Configured inbound Security Group rules restricting SSH (port 22) to authorized administrative IPs while opening HTTP (80) and HTTPS (443) to web traffic.',
      'Installed, enabled, and supervised Apache HTTP Server (httpd) service utilizing systemctl for automatic restart on failure.',
      'Configured Amazon CloudWatch metric alarms for CPU utilization, disk I/O, and NetworkIn/NetworkOut traffic spikes.'
    ],
    skills: ['AWS EC2', 'Amazon Linux', 'Apache (httpd)', 'Security Groups', 'Amazon CloudWatch', 'SSH Key Auth', 'systemctl'],
    architecture: {
      nodes: ['Internet User', 'Security Group (80/443/22)', 'EC2 Linux Instance', 'Apache Web Service', 'CloudWatch Alarms', 'S3 Storage'],
      description: 'End-to-end cloud pipeline: External web traffic hits AWS VPC Security Group filters, reaches Apache httpd daemon running on EC2 Amazon Linux, with real-time telemetry piped into CloudWatch dashboards.'
    },
    metrics: [
      { label: 'Web Server Uptime', value: '99.99%' },
      { label: 'HTTP Response Code', value: '200 OK' },
      { label: 'Avg TTFB Latency', value: '42 ms' }
    ],
    details: [
      'Configured virtual host configuration files in /etc/httpd/conf.d/',
      'Created custom bash bootstrap user-data scripts for automated server provisioning',
      'Tested end-to-end network connectivity and port responsiveness using curl, netstat, and ss'
    ]
  },
  {
    id: 'ccna-lab-network',
    title: 'CCNA Lab – Network Configuration & Troubleshooting',
    subtitle: 'Cisco Packet Tracer + VLANs + 802.1Q Trunking + Inter-VLAN Routing',
    category: 'Cisco Networking',
    date: 'August 2026',
    badge: 'CISCO PACKET TRACER',
    summary: 'Designed, configured, and troubleshot complex multi-switch and multi-router enterprise topologies using Cisco Packet Tracer, enforcing strict broadcast domain segmentation via VLANs and inter-VLAN routing.',
    highlights: [
      'Architected network topologies connecting core routers, Layer 3 multi-layer switches, Layer 2 access switches, and departmental PCs.',
      'Configured IPv4 addressing schemes, custom variable-length subnet masks (VLSM /24, /27, /30), and default gateway parameters.',
      'Segmented department traffic into VLAN 10 (Engineering) and VLAN 20 (Operations) with IEEE 802.1Q trunking across inter-switch uplinks.',
      'Configured Router-on-a-Stick sub-interfaces and Layer 3 Switch Virtual Interfaces (SVIs) with IP helper addresses for DHCP forwarding.',
      'Diagnosed and eliminated broadcast storms using Spanning Tree Protocol (STP 802.1D) and validated end-to-end paths via ping and traceroute.'
    ],
    skills: ['Cisco IOS', 'Cisco Packet Tracer', 'VLANs', '802.1Q Trunking', 'Inter-VLAN Routing', 'Subnetting', 'STP', 'DHCP', 'NAT'],
    architecture: {
      nodes: ['Edge Router 2911', 'L3 Core Switch', 'L2 Access Switch', 'VLAN 10 Workstations', 'VLAN 20 Workstations'],
      description: 'Hierarchical Cisco enterprise topology: Access layer handles port security and VLAN tagging; distribution layer provides high-speed Inter-VLAN routing; core router provides WAN default routing and NAT.'
    },
    metrics: [
      { label: 'VLAN Segmentation', value: '100% Isolated' },
      { label: 'End-to-End Ping', value: '< 2 ms' },
      { label: 'Packet Drop Rate', value: '0.0%' }
    ],
    details: [
      'Authored Cisco IOS configuration files via CLI console commands',
      'Analyzed ARP table resolution and MAC address table aging dynamically',
      'Simulated packet flows in simulation mode to verify ICMP Echo Request and Reply frame structures'
    ]
  },
  {
    id: 'linux-server-admin',
    title: 'Linux Lab – Enterprise Server Administration',
    subtitle: 'Ubuntu & Amazon Linux + Systemctl + User/Group Permissions + SSH Hardening',
    category: 'Linux Admin',
    date: 'July 2026',
    badge: 'LINUX SYSADMIN',
    summary: 'Comprehensive hands-on Linux system administration lab covering user and group access control, file permission hardening (chmod/chown), systemd service lifecycle, and shell automation.',
    highlights: [
      'Administered user and group permissions utilizing useradd, usermod, groupadd, and sudoers configuration for least-privilege security.',
      'Hardened file and directory permissions using symbolic and octal modes (chmod 750, 600 for SSH keys) and changed ownership via chown.',
      'Managed system daemons and background services using systemctl (start, stop, enable, restart, status) for web and SSH daemons.',
      'Established remote administration sessions with PuTTY, WinSCP, and native OpenSSH with disabled root login and key-only authentication.',
      'Wrote Bash automation scripts and utilized diagnostic utilities (df -h, free -m, top, ps aux, ss -tulpn) to troubleshoot resource bottlenecks.'
    ],
    skills: ['Ubuntu Server', 'Amazon Linux', 'Linux CLI', 'User & Group Management', 'File Permissions', 'systemctl', 'SSH Hardening', 'Bash Scripting'],
    metrics: [
      { label: 'Services Managed', value: 'httpd, sshd, ufw' },
      { label: 'Auth Method', value: 'ED25519 Keys' },
      { label: 'Security Compliance', value: 'Hardened' }
    ],
    details: [
      'Configured UFW firewall to whitelist administrative management subnets',
      'Monitored system logs with journalctl -xeu and /var/log/messages inspection',
      'Automated scheduled backup tasks via crontab cron jobs'
    ]
  },
  {
    id: 'iot-safety-system',
    title: 'IoT-Based Wireless Safety System for Fireworks Factories',
    subtitle: 'Hazardous Gas & Smoke Detection + RF Telemetry + Instant Alerting',
    category: 'IoT / Systems',
    date: 'April 2026',
    badge: 'IOT & EMBEDDED',
    summary: 'Engineered an IoT environmental safety monitoring solution specifically designed for high-risk fireworks manufacturing facilities to detect volatile hazardous gases, toxic smoke, and temperature surges.',
    highlights: [
      'Integrated specialized sensor modules (MQ gas sensors, optical smoke detectors, thermal probes) for real-time hazardous environment tracking.',
      'Engineered wireless RF/ESP telemetry to transmit telemetry data continuously to a centralized monitoring console without exposed wiring.',
      'Built automated threshold-triggered alarms for instant audio-visual siren activation and incident mitigation before ignition thresholds.',
      'Designed fail-safe operational logic ensuring continuous monitoring even during localized network drops.'
    ],
    skills: ['IoT Architecture', 'Sensors (MQ/Smoke/Temp)', 'Wireless Telemetry', 'Microcontrollers', 'Python/C++', 'Industrial Safety'],
    metrics: [
      { label: 'Detection Response', value: '< 200 ms' },
      { label: 'Wireless Range', value: 'Up to 300m' },
      { label: 'Failsafe Uptime', value: '99.9%' }
    ],
    details: [
      'Calibrated sensor baseline readings for industrial sulfur and gunpowder airborne particulates',
      'Implemented packet validation and checksum verification across the wireless telemetry link',
      'Presented findings and live prototype demonstrations to engineering safety review boards'
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Networking & Protocols',
    iconName: 'Network',
    color: '#00f3ff',
    skills: [
      { name: 'TCP/IP & OSI Model', level: 95, badge: 'Core', description: 'Deep 7-layer and 4-layer protocol stack understanding, packet encapsulation, and data flow analysis.' },
      { name: 'IPv4 / IPv6 & Subnetting', level: 92, badge: 'Core', description: 'Classless Inter-Domain Routing (CIDR), VLSM design, host bit allocation, and binary subnet calculations.' },
      { name: 'VLANs & 802.1Q Trunking', level: 90, badge: 'Expertise', description: 'Access ports, trunk ports, native VLANs, and IEEE 802.1Q frame tagging on enterprise switches.' },
      { name: 'Inter-VLAN Routing & STP', level: 88, badge: 'Routing', description: 'Router-on-a-Stick sub-interfaces, SVI routing, and Spanning Tree Protocol (802.1D) loop avoidance.' },
      { name: 'DHCP, DNS & NAT/PAT', level: 90, badge: 'Services', description: 'DORA lifecycle, authoritative DNS lookups, Port Address Translation (Overload), and static NAT.' },
      { name: 'ARP, ICMP & Troubleshooting', level: 94, badge: 'Diag', description: 'Layer 2 ARP resolution, ICMP echo diagnostics, packet analysis with ping, traceroute, and netstat.' }
    ]
  },
  {
    title: 'Cisco Routing & Switching',
    iconName: 'Server',
    color: '#0066ff',
    skills: [
      { name: 'Cisco IOS CLI', level: 90, badge: 'IOS', description: 'EXEC modes, running-config and startup-config management, interface provisioning, and show commands.' },
      { name: 'Cisco Packet Tracer', level: 92, badge: 'Lab', description: 'End-to-end design, simulation mode frame inspection, and troubleshooting multi-tier topologies.' },
      { name: 'Router Configuration', level: 88, badge: 'Routing', description: 'Default routing (0.0.0.0/0), static routing paths, sub-interface encapsulation dot1q, and DHCP pools.' },
      { name: 'Switch Configuration', level: 90, badge: 'Switching', description: 'Port security (MAC sticky), VLAN creation, trunk negotiation (DTP disable), and duplex settings.' },
      { name: 'Access Control Lists (ACL)', level: 82, badge: 'Security', description: 'Standard and extended numbered/named ACLs for packet filtering based on source/dest IP and ports.' }
    ]
  },
  {
    title: 'Linux Administration',
    iconName: 'Terminal',
    color: '#00ff66',
    skills: [
      { name: 'Ubuntu & Amazon Linux', level: 90, badge: 'Distros', description: 'Package managers (apt, dnf, yum), OS configuration, system files in /etc, and filesystem hierarchy.' },
      { name: 'Linux CLI & Navigation', level: 94, badge: 'CLI', description: 'Proficient terminal productivity, piping, grep, awk, sed, find, tar, and redirection.' },
      { name: 'File Permissions & Users', level: 92, badge: 'Security', description: 'chmod (symbolic/octal), chown, chgrp, useradd, groupadd, and granular sudoers privilege configuration.' },
      { name: 'systemctl & Daemons', level: 88, badge: 'Services', description: 'systemd service creation, enabling on boot, status inspection, process logs with journalctl.' },
      { name: 'Apache HTTP Server (httpd)', level: 88, badge: 'Web', description: 'Web server installation, virtual hosts configuration, document roots, and service troubleshooting.' },
      { name: 'SSH & Remote Access', level: 92, badge: 'Remote', description: 'Public/private key authentication (ssh-keygen), config hardening, port forwarding, and PuTTY/WinSCP.' }
    ]
  },
  {
    title: 'AWS & Cloud Infrastructure',
    iconName: 'Cloud',
    color: '#ffb703',
    skills: [
      { name: 'AWS EC2 Instances', level: 88, badge: 'Compute', description: 'Instance lifecycle, AMI selection, user data provisioning scripts, instance metadata, and SSH access.' },
      { name: 'Security Groups', level: 90, badge: 'Firewall', description: 'Stateful virtual firewall rules for ports 80, 443, 22 with precise CIDR block whitelisting.' },
      { name: 'Amazon CloudWatch', level: 85, badge: 'Monitoring', description: 'Metric dashboards for CPUUtilization, NetworkIn/Out, status checks, and threshold alarm setup.' },
      { name: 'AWS S3 Fundamentals', level: 86, badge: 'Storage', description: 'Bucket policies, public access blocking, object versioning, and static website hosting.' },
      { name: 'AWS IAM Basics', level: 84, badge: 'Identity', description: 'IAM users, groups, roles, policy JSON definitions, and principle of least privilege.' },
      { name: 'Load Balancer Concepts', level: 80, badge: 'Infra', description: 'Application Load Balancer (ALB) concepts, target groups, listener rules, and health checks.' }
    ]
  },
  {
    title: 'Programming, Tools & Automation',
    iconName: 'Code',
    color: '#9d4edd',
    skills: [
      { name: 'Python Scripting', level: 85, badge: 'Scripting', description: 'Automating repetitive data tasks, file handling, reporting scripts, and API interactions.' },
      { name: 'Git & GitHub', level: 88, badge: 'VCS', description: 'Branching, commits, pull requests, repository maintenance, and Git Bash CLI workflows.' },
      { name: 'QA & Test Automation', level: 84, badge: 'QA', description: 'Functional, regression, integration testing, defect tracking, and exposure to Selenium WebDriver.' },
      { name: 'MySQL Fundamentals', level: 80, badge: 'Database', description: 'Relational database schema queries (SELECT, JOIN, GROUP BY), table creation, and data filtering.' },
      { name: 'Diagnostic CLI Tools', level: 92, badge: 'NOC Tools', description: 'ping, traceroute, ip, ifconfig, netstat, ss, nslookup, dig, arp, curl, and Wireshark inspection.' }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    company: 'Digiclarity',
    role: 'Trainee – Business Excellence & MIS',
    period: 'July 2026 – October 2026',
    location: 'Chennai / Remote, India',
    type: 'Full-time Trainee',
    description: 'Developed Python automation scripts to streamline reporting workflows, scorecard generation, and daily operational data monitoring.',
    responsibilities: [
      'Developed Python-based automation scripts to streamline weekly and monthly scorecard generation and automated report downloads.',
      'Significantly improved reporting efficiency by eliminating repetitive manual data aggregation tasks.',
      'Handled daily operational data pipelines and troubleshot anomalies to ensure 100% data integrity and uninterrupted management reporting.',
      'Collaborated with cross-functional business excellence teams to document workflow standard operating procedures (SOPs).'
    ],
    technologies: ['Python', 'Automation Scripts', 'Data Processing', 'Excel Automation', 'Workflow Optimization'],
    metrics: 'Reduced report generation turnaround time by 65%'
  },
  {
    company: 'TVS Supply Chain Solutions',
    role: 'SDET / QA Intern',
    period: 'December 2025 – June 2026',
    location: 'Coimbatore, India',
    type: 'Internship (6 Months)',
    description: 'Supported quality assurance and defect diagnosis activities for mission-critical enterprise Warehouse Management Systems (WMS) and Tenant Operating Systems (TOS).',
    responsibilities: [
      'Executed functional, regression, integration, sanity, and system testing for enterprise WMS (IEX & CA) and TOS platforms.',
      'Reproduced, analyzed, and tracked complex software defects through to verified resolution in an Agile development environment.',
      'Collaborated closely with development teams, system engineers, and Product Managers to diagnose root causes and improve system stability.',
      'Authored comprehensive test cases, defect logs, and verification summaries; gained practical hands-on exposure to Python and Selenium automation.'
    ],
    technologies: ['Enterprise WMS', 'TOS Applications', 'Python', 'Selenium Automation', 'Defect Diagnostics', 'Agile / Jira', 'Regression Testing'],
    metrics: 'Logged and verified 120+ critical defects across 6 releases'
  }
];

export const educationData: EducationItem[] = [
  {
    degree: 'B.Tech in Information Technology',
    institution: 'Nehru Institute of Engineering and Technology',
    period: '2022 – 2026',
    location: 'Coimbatore, Tamil Nadu, India',
    score: '8.0 CGPA (81.30%)',
    scoreLabel: 'First Class with Distinction',
    highlights: [
      'Specialized in Computer Networks, Operating Systems, Cloud Computing, and Information Security.',
      'Hands-on lab coursework in Cisco Packet Tracer, Linux Kernel Administration, and Web Technologies.',
      'Led academic final-year project on IoT wireless sensor network safety systems.'
    ]
  },
  {
    degree: 'Higher Secondary Certificate (HSC - 12th Grade)',
    institution: "St. Joseph's Higher Secondary School",
    period: '2021 – 2022',
    location: 'Ramanathapuram, Tamil Nadu, India',
    score: '82.00%',
    scoreLabel: 'Mathematics & Computer Science',
    highlights: ['Strong foundation in computer science principles, discrete mathematics, and algorithms.']
  },
  {
    degree: 'Secondary School Certificate (SSLC - 10th Grade)',
    institution: 'Government Higher Secondary School',
    period: '2019 – 2020',
    location: 'Ramanathapuram, Tamil Nadu, India',
    score: '92.00%',
    scoreLabel: 'Distinction Score',
    highlights: ['Top 5% rank in school academic examinations.']
  }
];

export const certificationsData: CertificationItem[] = [
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL (IIT Kharagpur)',
    category: 'Cloud Architecture',
    badge: 'NPTEL Elite',
    date: '2025'
  },
  {
    title: 'Google Cloud Computing Foundations',
    issuer: 'Google Cloud',
    category: 'Cloud Engineering',
    badge: 'Google Certified',
    date: '2025'
  },
  {
    title: 'The Joy of Computing using Python',
    issuer: 'NPTEL (IIT Madras)',
    category: 'Programming & Logic',
    badge: 'NPTEL Verified',
    date: '2024'
  },
  {
    title: 'Python for Data Science',
    issuer: 'NPTEL (IIT Madras)',
    category: 'Data & Scripting',
    badge: 'NPTEL Verified',
    date: '2024'
  },
  {
    title: 'Data Structures & Algorithms',
    issuer: 'Coursera',
    category: 'Computer Science',
    badge: 'Specialization',
    date: '2024'
  },
  {
    title: 'Python Programming Masterclass',
    issuer: 'Udemy',
    category: 'Scripting & Automation',
    badge: 'Completed',
    date: '2024'
  },
  {
    title: 'Advanced Excel & Data Analysis',
    issuer: 'Udemy',
    category: 'Analytics & Tools',
    badge: 'Completed',
    date: '2024'
  }
];
