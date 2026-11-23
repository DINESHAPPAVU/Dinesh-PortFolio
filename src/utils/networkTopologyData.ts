import type { NetworkDevice, NetworkConnection } from '../types';

export const topologyDevices: NetworkDevice[] = [
  {
    id: 'cloud',
    name: 'Internet WAN Cloud',
    type: 'cloud',
    ip: '203.0.113.1 / 198.51.100.1',
    mac: '00:1E:F7:AA:BB:CC',
    subnet: '255.255.255.0 (/24)',
    status: 'online',
    badge: 'EXTERNAL WAN',
    description: 'Upstream Internet Service Provider (ISP) gateway providing global route advertisement and public IP address routing via BGP/Static Default Route.',
    x: 50,
    y: 12,
    interfaces: [
      { port: 'Serial0/0/0', status: 'up', speed: '1 Gbps', connectedTo: 'firewall' }
    ]
  },
  {
    id: 'firewall',
    name: 'NGFW Perimeter Firewall',
    type: 'firewall',
    ip: '203.0.113.2 / 192.168.1.254',
    mac: '00:08:E3:44:99:11',
    subnet: '255.255.255.0 (/24)',
    status: 'filtering',
    badge: 'STATEFUL INSPECTION',
    description: 'Enterprise Stateful Firewall with NAT/PAT translation, deep packet inspection, SPI table tracking, and ACL filtering (Denies unauthorized inbound ports, allows established outbound connections).',
    x: 50,
    y: 30,
    interfaces: [
      { port: 'WAN-Port (Eth0)', status: 'up', speed: '1 Gbps', connectedTo: 'cloud' },
      { port: 'LAN-Port (Eth1)', status: 'up', speed: '1 Gbps', connectedTo: 'router' },
      { port: 'DMZ-Port (Eth2)', status: 'up', speed: '1 Gbps', connectedTo: 'server' }
    ]
  },
  {
    id: 'router',
    name: 'Cisco Core Router (2911)',
    type: 'router',
    ip: '192.168.1.1 (Gateway)',
    mac: '00:01:42:5C:8B:01',
    subnet: '255.255.255.0 (/24)',
    status: 'active',
    badge: 'LAYER 3 ROUTING',
    description: 'Core Gateway Router handling default route forwarding (0.0.0.0/0), sub-interfaces with 802.1Q encapsulation for Inter-VLAN routing, and DHCP Relay agents.',
    x: 50,
    y: 50,
    interfaces: [
      { port: 'Gig0/0 (Uplink)', status: 'up', speed: '1 Gbps', connectedTo: 'firewall' },
      { port: 'Gig0/1 (Downlink)', status: 'up', speed: '1 Gbps', connectedTo: 'l3switch' }
    ]
  },
  {
    id: 'server',
    name: 'Enterprise Linux Web/App Server',
    type: 'server',
    ip: '192.168.1.100',
    mac: '08:00:27:11:88:AA',
    subnet: '255.255.255.0 (/24)',
    gateway: '192.168.1.1',
    status: 'online',
    badge: 'APACHE / SSH',
    description: 'Redundant Linux Host running Apache HTTP Server (httpd on port 80/443), systemd process supervision, and OpenSSH on port 22 with public-key authorization.',
    x: 82,
    y: 35,
    interfaces: [
      { port: 'ens192', status: 'up', speed: '10 Gbps', connectedTo: 'firewall' }
    ]
  },
  {
    id: 'l3switch',
    name: 'Cisco 3560 Layer 3 Switch',
    type: 'l3switch',
    ip: '192.168.1.254 (SVI)',
    mac: '00:19:AA:88:33:12',
    subnet: '255.255.255.0 (/24)',
    gateway: '192.168.1.1',
    status: 'active',
    badge: 'INTER-VLAN ROUTER',
    description: 'Distribution Multi-layer switch managing SVIs (Switch Virtual Interfaces) for VLAN 10 and VLAN 20, wire-speed packet switching, and IP helper-address forwards.',
    x: 50,
    y: 70,
    interfaces: [
      { port: 'Gig0/1 (Trunk)', status: 'up', speed: '1 Gbps', vlan: '10,20', connectedTo: 'router' },
      { port: 'Gig0/2 (Trunk)', status: 'up', speed: '1 Gbps', vlan: '10,20', connectedTo: 'l2switch' }
    ]
  },
  {
    id: 'l2switch',
    name: 'Cisco 2960 Layer 2 Access Switch',
    type: 'l2switch',
    ip: '192.168.1.20 (Management)',
    mac: '00:24:14:33:44:EE',
    subnet: '255.255.255.0 (/24)',
    gateway: '192.168.1.1',
    status: 'active',
    badge: 'ACCESS 802.1Q',
    description: 'Access layer switch segmenting broadcast domains into distinct VLANs. Spanning Tree Protocol (STP 802.1D) active to eliminate loops. Trunking enabled on Gigabit uplinks.',
    x: 50,
    y: 88,
    interfaces: [
      { port: 'Gig0/1 (Trunk)', status: 'up', speed: '1 Gbps', vlan: 'All (10, 20)', connectedTo: 'l3switch' },
      { port: 'Fa0/1 (Access)', status: 'up', speed: '100 Mbps', vlan: '10 (Engineering)', connectedTo: 'pc1' },
      { port: 'Fa0/2 (Access)', status: 'up', speed: '100 Mbps', vlan: '20 (Operations)', connectedTo: 'pc2' }
    ]
  },
  {
    id: 'pc1',
    name: 'Admin Workstation (PC-1)',
    type: 'pc',
    ip: '192.168.10.15',
    mac: 'B4:2E:99:D1:43:01',
    subnet: '255.255.255.0 (/24)',
    gateway: '192.168.10.1',
    vlan: 'VLAN 10 (Engineering)',
    status: 'online',
    badge: 'VLAN 10 ACCESS',
    description: 'Workstation assigned to VLAN 10 (Engineering). Receives dynamic IP via DHCP server. Configured with static DNS pointing to internal server and Google 8.8.8.8.',
    x: 20,
    y: 92,
    interfaces: [
      { port: 'Ethernet0', status: 'up', speed: '100 Mbps', vlan: '10', connectedTo: 'l2switch' }
    ]
  },
  {
    id: 'pc2',
    name: 'DevOps Workstation (PC-2)',
    type: 'pc',
    ip: '192.168.20.25',
    mac: 'B4:2E:99:D1:43:02',
    subnet: '255.255.255.0 (/24)',
    gateway: '192.168.20.1',
    vlan: 'VLAN 20 (Operations)',
    status: 'online',
    badge: 'VLAN 20 ACCESS',
    description: 'Workstation in VLAN 20 (Operations). Isolated from VLAN 10 at Layer 2, routed via Layer 3 Switch with ACL enforcement for role-based network security.',
    x: 80,
    y: 92,
    interfaces: [
      { port: 'Ethernet0', status: 'up', speed: '100 Mbps', vlan: '20', connectedTo: 'l2switch' }
    ]
  }
];

export const topologyConnections: NetworkConnection[] = [
  { from: 'cloud', to: 'firewall', type: 'wan', speed: '1 Gbps Fiber', active: true },
  { from: 'firewall', to: 'server', type: 'dmz', speed: '10 Gbps Direct', active: true },
  { from: 'firewall', to: 'router', type: 'trunk', speed: '1 Gbps Copper', active: true },
  { from: 'router', to: 'l3switch', type: 'trunk', speed: '1 Gbps 802.1Q', active: true },
  { from: 'l3switch', to: 'l2switch', type: 'trunk', speed: '1 Gbps 802.1Q', active: true },
  { from: 'l2switch', to: 'pc1', type: 'access', speed: '100 Mbps Cat6 (VLAN 10)', active: true },
  { from: 'l2switch', to: 'pc2', type: 'access', speed: '100 Mbps Cat6 (VLAN 20)', active: true }
];

export const osiLayers = [
  {
    number: 7,
    name: 'Application Layer',
    protocols: 'HTTP, HTTPS, SSH, DNS, DHCP, FTP, Telnet',
    description: 'Interfaces with end-user applications and manages communication protocols.',
    dineshRole: 'Configured Apache HTTP Server, OpenSSH key-based auth, and automated DNS queries via CLI.'
  },
  {
    number: 6,
    name: 'Presentation Layer',
    protocols: 'SSL/TLS, ASCII, JPEG, JSON, MPEG',
    description: 'Handles data formatting, syntax translation, and cryptographic encryption/decryption.',
    dineshRole: 'Managed SSL certificates on AWS Security Groups & Apache virtual hosts.'
  },
  {
    number: 5,
    name: 'Session Layer',
    protocols: 'NetBIOS, RPC, PPTP, Sockets',
    description: 'Establishes, maintains, and terminates communication sessions between local and remote apps.',
    dineshRole: 'Monitored persistent SSH sessions and socket states using ss and netstat.'
  },
  {
    number: 4,
    name: 'Transport Layer',
    protocols: 'TCP (Connection-oriented), UDP (Connectionless), Port Numbers',
    description: 'Ensures end-to-end reliable data delivery, flow control, sequencing, and port multiplexing.',
    dineshRole: 'Configured Port 80 (HTTP), 443 (HTTPS), 22 (SSH) in firewall rules and verified three-way handshakes.'
  },
  {
    number: 3,
    name: 'Network Layer',
    protocols: 'IPv4, IPv6, ICMP, ARP, OSPF, BGP, NAT',
    description: 'Determines best logical paths across diverse networks using IP addressing and routing protocols.',
    dineshRole: 'Implemented IPv4 subnetting (/24, /27, /30), default gateways, Inter-VLAN routing, and static routes.'
  },
  {
    number: 2,
    name: 'Data Link Layer',
    protocols: 'Ethernet (802.3), 802.1Q VLANs, STP (802.1D), MAC Addressing, ARP',
    description: 'Provides physical addressing, node-to-node frame transfer, collision detection, and loop prevention.',
    dineshRole: 'Configured access & trunk ports in Cisco IOS, Spanning Tree Protocol, and MAC address tables.'
  },
  {
    number: 1,
    name: 'Physical Layer',
    protocols: 'Cat6 UTP, Fiber Optic (Single/Multi-mode), RJ-45, Signals, Bits',
    description: 'Transmits raw unstructured bit streams over physical transmission media.',
    dineshRole: 'Cabled rack switches, verified physical link LEDs, and diagnosed cable faults with loopback tests.'
  }
];

export const keyNetworkingConcepts = [
  {
    title: 'VLANs & 802.1Q Trunking',
    tag: 'Layer 2 Isolation',
    summary: 'Virtual LANs segment a single physical switch into isolated logical broadcast domains.',
    points: [
      'Access ports carry traffic for a single untagged VLAN (e.g. PC-1 in VLAN 10).',
      'Trunk ports utilize IEEE 802.1Q tagging (4-byte tag with 12-bit VLAN ID) to multiplex traffic from multiple VLANs across a single cable.',
      'Prevents broadcast storms and enhances security between department workstations.'
    ]
  },
  {
    title: 'DHCP (D.O.R.A. Process)',
    tag: 'Dynamic Addressing',
    summary: 'Automates IP address, subnet mask, default gateway, and DNS server assignment to hosts.',
    points: [
      '1. Discover: Client broadcasts DHCPDISCOVER to 255.255.255.255 looking for a DHCP server.',
      '2. Offer: Server replies with DHCPOFFER containing reserved IP address and lease terms.',
      '3. Request: Client broadcasts DHCPREQUEST confirming acceptance of offered IP parameters.',
      '4. Acknowledge: Server sends DHCPACK finalizing the lease.'
    ]
  },
  {
    title: 'DNS Resolution Cycle',
    tag: 'Domain Translation',
    summary: 'Translates human-readable names (e.g. aws.amazon.com) into machine-routable IP addresses.',
    points: [
      'Recursive Resolver checks local cache -> queries Root Nameserver (.) -> queries TLD Nameserver (.com) -> queries Authoritative Nameserver.',
      'Supports A records (IPv4), AAAA (IPv6), CNAME (Aliases), and MX (Mail).',
      'Tested and debugged via nslookup, dig, and host CLI utilities.'
    ]
  },
  {
    title: 'NAT & PAT (Overload)',
    tag: 'Address Translation',
    summary: 'Conserves public IPv4 space by mapping private RFC 1918 addresses to public IPs.',
    points: [
      'Port Address Translation (PAT) allows thousands of internal hosts to share 1 public IP using unique source port numbers.',
      'Firewall / Router maintains translation table mapping Inside Local (192.168.10.15:49152) to Inside Global (203.0.113.2:1025).',
      'Enables secure outbound internet access while shielding internal topology from WAN threats.'
    ]
  }
];
