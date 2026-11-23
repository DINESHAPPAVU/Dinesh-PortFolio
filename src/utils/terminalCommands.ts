export interface FileNode {
  name: string;
  type: 'file' | 'dir';
  permissions: string;
  owner: string;
  group: string;
  size: string;
  date: string;
  content?: string;
  children?: { [key: string]: FileNode };
}

export interface TerminalState {
  currentPath: string; // e.g. "/home/dinesh"
  fileSystem: { [key: string]: FileNode };
}

export const initialFileSystem: { [key: string]: FileNode } = {
  home: {
    name: 'home',
    type: 'dir',
    permissions: 'drwxr-xr-x',
    owner: 'root',
    group: 'root',
    size: '4096',
    date: 'Nov 23 10:00',
    children: {
      dinesh: {
        name: 'dinesh',
        type: 'dir',
        permissions: 'drwxr-xr-x',
        owner: 'dinesh',
        group: 'dinesh',
        size: '4096',
        date: 'Nov 23 10:15',
        children: {
          'about.txt': {
            name: 'about.txt',
            type: 'file',
            permissions: '-rw-r--r--',
            owner: 'dinesh',
            group: 'dinesh',
            size: '734',
            date: 'Nov 23 10:18',
            content: `DINESH A - Junior Network Engineer & Linux Administrator
Location: Chennai / Coimbatore, India
Phone: +91 83007 58173 | Email: adineshsusi@gmail.com
LinkedIn: linkedin.com/in/dinesh-appavu-97763824a
GitHub: github.com/DINESHAPPAVU

Passionate about computer networking (TCP/IP, OSI, Cisco IOS, VLANs, Subnetting),
Linux systems administration (Ubuntu, Amazon Linux, Apache httpd, systemctl),
and AWS Cloud infrastructure (EC2, Security Groups, S3, CloudWatch).`
          },
          'resume.txt': {
            name: 'resume.txt',
            type: 'file',
            permissions: '-rw-r--r--',
            owner: 'dinesh',
            group: 'dinesh',
            size: '1240',
            date: 'Nov 23 10:20',
            content: `=====================================================
DINESH A - CURRICULUM VITAE
=====================================================
B.Tech in Information Technology (CGPA: 8.0)
Nehru Institute of Engineering and Technology (2022 - 2026)

PROFESSIONAL EXPERIENCE:
1. Digiclarity - Trainee MIS Executive (Jul 2026 - Oct 2026)
   * Automated scorecard and report pipelines using Python.
   * Reduced manual data processing and resolved daily operational issues.

2. TVS Supply Chain Solutions - SDET / QA Intern (Dec 2025 - Jun 2026)
   * Enterprise WMS (IEX & CA) and TOS platform testing in an Agile environment.
   * Performed functional, regression, sanity, integration and root-cause analysis.
   * Hands-on exposure to Python/Selenium test scripts and defect management.

KEY PROJECTS:
* AWS EC2 Apache Web Server Deployment & CloudWatch Monitoring
* CCNA Lab: Enterprise VLANs, Trunking & Inter-VLAN Routing in Cisco Packet Tracer
* Linux Lab: Server Administration, User Management & Service Hardening
* IoT Wireless Gas/Smoke Safety System for Fireworks Factories`
          },
          'skills.json': {
            name: 'skills.json',
            type: 'file',
            permissions: '-rw-r--r--',
            owner: 'dinesh',
            group: 'dinesh',
            size: '512',
            date: 'Nov 23 10:21',
            content: `{\n  "networking": ["TCP/IP", "OSI 7-Layer", "IPv4/IPv6", "Subnetting", "VLANs", "STP", "DHCP", "DNS", "NAT", "ARP", "ICMP", "Routing & Switching"],\n  "cisco": ["Cisco IOS", "Packet Tracer", "Router & Switch Configuration", "802.1Q Trunking"],\n  "linux": ["Ubuntu", "Amazon Linux", "CLI", "systemctl", "SSH", "Apache (httpd)", "File Permissions"],\n  "aws": ["EC2", "Security Groups", "IAM", "S3", "CloudWatch", "Load Balancer"],\n  "scripting": ["Python", "Bash", "Git", "GitHub", "MySQL"]\n}`
          },
          'aws_deploy.sh': {
            name: 'aws_deploy.sh',
            type: 'file',
            permissions: '-rwxr-xr-x',
            owner: 'dinesh',
            group: 'dinesh',
            size: '890',
            date: 'Nov 23 10:22',
            content: `#!/bin/bash
# AWS Linux EC2 Apache Web Server Deployment Script by Dinesh A
echo "[*] Updating packages on Amazon Linux..."
sudo dnf update -y || sudo yum update -y

echo "[*] Installing Apache HTTP Server (httpd)..."
sudo dnf install -y httpd || sudo yum install -y httpd

echo "[*] Starting and enabling httpd systemd service..."
sudo systemctl start httpd
sudo systemctl enable httpd

echo "[*] Verifying Security Group Inbound: Port 80 (HTTP) [ALLOW 0.0.0.0/0]"
echo "[*] Verifying Security Group Inbound: Port 22 (SSH) [ALLOW ADMIN_IP]"

echo "<h1>Welcome to Dinesh's High-Availability Web Server on AWS EC2</h1>" | sudo tee /var/www/html/index.html
echo "[+] Deployment successful! Server is responding on http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"`
          },
          'cisco_vlan.conf': {
            name: 'cisco_vlan.conf',
            type: 'file',
            permissions: '-rw-r--r--',
            owner: 'dinesh',
            group: 'dinesh',
            size: '640',
            date: 'Nov 23 10:23',
            content: `! Cisco 2960 Switch VLAN Configuration by Dinesh A
enable
configure terminal
hostname SW-ACCESS-01
!
vlan 10
 name ENGINEERING_VLAN
vlan 20
 name OPERATIONS_VLAN
!
interface FastEthernet0/1
 switchport mode access
 switchport access vlan 10
 no shutdown
!
interface FastEthernet0/2
 switchport mode access
 switchport access vlan 20
 no shutdown
!
interface GigabitEthernet0/1
 description UPLINK-TO-CORE-ROUTER
 switchport mode trunk
 switchport trunk allowed vlan 10,20
 no shutdown
exit`
          },
          projects: {
            name: 'projects',
            type: 'dir',
            permissions: 'drwxr-xr-x',
            owner: 'dinesh',
            group: 'dinesh',
            size: '4096',
            date: 'Nov 23 10:24',
            children: {
              'aws-web-server.md': {
                name: 'aws-web-server.md',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'dinesh',
                group: 'dinesh',
                size: '380',
                date: 'Nov 23 10:25',
                content: '# Web Server Deployment and Monitoring on AWS\n* Deployed on EC2 Linux with Apache HTTPD\n* Configured Security Groups for HTTP/HTTPS/SSH\n* Integrated CloudWatch metric alarms for CPU and network health'
              },
              'ccna-packet-tracer.md': {
                name: 'ccna-packet-tracer.md',
                type: 'file',
                permissions: '-rw-r--r--',
                owner: 'dinesh',
                group: 'dinesh',
                size: '340',
                date: 'Nov 23 10:25',
                content: '# CCNA Lab: Network Topology & VLANs\n* Router & Switch configuration with Cisco IOS\n* VLAN segmentation (VLAN 10, 20), 802.1Q Trunking\n* Tested with ping, traceroute, and packet capture'
              }
            }
          }
        }
      }
    }
  }
};

export const runCommand = (
  cmdLine: string,
  state: TerminalState
): { output: string; newState: TerminalState } => {
  const trimmed = cmdLine.trim();
  const parts = trimmed.split(/\s+/);
  const command = parts[0]?.toLowerCase() || '';
  const args = parts.slice(1);

  const cloneState = JSON.parse(JSON.stringify(state)) as TerminalState;

  if (!command) {
    return { output: '', newState: cloneState };
  }

  switch (command) {
    case 'help':
      return {
        output: `CYBERNETIC LINUX TERMINAL SIMULATOR v6.5 (GNU/Linux)
Available Commands:
  System & Identity:  whoami, hostname, uname -a, date, neofetch, clear
  File & Directory:   pwd, ls [-la], cd <dir>, cat <file>, mkdir <dir>, touch <file>, chmod, chown
  Network & Diag:     ip addr, ip route, ping <host>, netstat, traceroute
  Services & Monitor: systemctl status <svc>, ps [aux], df -h, free -h
  Remote & Auth:      ssh <user@host>, exit, help

Try: 'cat about.txt', 'ls -la', 'ip addr', 'systemctl status httpd', or 'neofetch'`,
        newState: cloneState
      };

    case 'whoami':
      return { output: 'dinesh', newState: cloneState };

    case 'hostname':
      return { output: 'dinesh-cyber-noc.internal.net', newState: cloneState };

    case 'pwd':
      return { output: cloneState.currentPath, newState: cloneState };

    case 'date':
      return { output: new Date().toUTCString(), newState: cloneState };

    case 'uname':
      if (args.includes('-a')) {
        return {
          output: 'Linux dinesh-cyber-noc 6.5.0-35-generic #36-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
          newState: cloneState
        };
      }
      return { output: 'Linux', newState: cloneState };

    case 'neofetch':
    case 'fastfetch':
      return {
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
            \`"""`,
        newState: cloneState
      };

    case 'clear':
      return { output: '__CLEAR__', newState: cloneState };

    case 'ip':
      if (args[0] === 'addr' || args[0] === 'a') {
        return {
          output: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:d1:e4:5a brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.105/24 brd 192.168.1.255 scope global dynamic eth0
       valid_lft 86320sec preferred_lft 86320sec
    inet6 fe80::a00:27ff:fed1:e45a/64 scope link
       valid_lft forever preferred_lft forever
3: vlan10: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 08:00:27:d1:e4:5a brd ff:ff:ff:ff:ff:ff
    inet 192.168.10.15/24 brd 192.168.10.255 scope global vlan10`,
          newState: cloneState
        };
      }
      if (args[0] === 'route' || args[0] === 'r') {
        return {
          output: `default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.105 metric 100
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.105 metric 100
192.168.10.0/24 dev vlan10 proto kernel scope link src 192.168.10.15
192.168.20.0/24 via 192.168.1.254 dev eth0 proto static metric 20`,
          newState: cloneState
        };
      }
      return { output: 'Usage: ip [addr | route]', newState: cloneState };

    case 'ping': {
      const target = args[0] || '8.8.8.8';
      return {
        output: `PING ${target} (${target}) 56(84) bytes of data.
64 bytes from ${target}: icmp_seq=1 ttl=117 time=11.4 ms
64 bytes from ${target}: icmp_seq=2 ttl=117 time=12.1 ms
64 bytes from ${target}: icmp_seq=3 ttl=117 time=10.9 ms
64 bytes from ${target}: icmp_seq=4 ttl=117 time=11.2 ms

--- ${target} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 10.912/11.402/12.115/0.450 ms`,
        newState: cloneState
      };
    }

    case 'df':
      return {
        output: `Filesystem     Type      Size  Used Avail Use% Mounted on
udev           devtmpfs  7.8G     0  7.8G   0% /dev
tmpfs          tmpfs     1.6G  2.1M  1.6G   1% /run
/dev/nvme0n1p2 ext4      490G   84G  382G  18% /
/dev/nvme0n1p1 vfat      511M  6.1M  505M   2% /boot/efi
/dev/sdb1      xfs       1.0T  210G  790G  21% /data/network-backups`,
        newState: cloneState
      };

    case 'free':
      return {
        output: `               total        used        free      shared  buff/cache   available
Mem:           15.6Gi       3.8Gi       8.9Gi        42Mi       2.9Gi      11.4Gi
Swap:           4.0Gi          0B       4.0Gi`,
        newState: cloneState
      };

    case 'ps':
      return {
        output: `  PID TTY          TIME CMD
    1 ?        00:00:04 systemd
  421 ?        00:00:01 systemd-journal
  880 ?        00:00:00 NetworkManager
 1102 ?        00:00:02 sshd
 1284 ?        00:00:05 httpd
 1450 ?        00:00:00 amazon-ssm-agent
 2190 ?        00:00:01 python3 /opt/automation/report_generator.py
 3410 pts/0    00:00:00 bash
 3488 pts/0    00:00:00 ps`,
        newState: cloneState
      };

    case 'systemctl':
      if (args[0] === 'status') {
        const svc = args[1] || 'httpd';
        if (svc === 'httpd' || svc === 'apache2') {
          return {
            output: `* httpd.service - The Apache HTTP Server
     Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; preset: disabled)
     Active: active (running) since Mon 2026-11-23 08:30:12 UTC; 2h 45min ago
       Docs: man:httpd.service(8)
   Main PID: 1284 (httpd)
     Status: "Total requests: 18420; Idle/Busy workers 100/0; CPU 0.08%; Req/Sec 2.4"
      Tasks: 177 (limit: 18889)
     Memory: 64.2M
        CPU: 1.482s
     CGroup: /system.slice/httpd.service
             ├─1284 /usr/sbin/httpd -DFOREGROUND
             ├─1285 /usr/sbin/httpd -DFOREGROUND
             └─1286 /usr/sbin/httpd -DFOREGROUND

Nov 23 08:30:12 cyber-host systemd[1]: Starting httpd.service - The Apache HTTP Server...
Nov 23 08:30:12 cyber-host httpd[1284]: AH00558: httpd: Could not reliably determine the server's fully qualified domain name
Nov 23 08:30:12 cyber-host systemd[1]: Started httpd.service - The Apache HTTP Server.`,
            newState: cloneState
          };
        }
        if (svc === 'sshd') {
          return {
            output: `* sshd.service - OpenSSH server daemon
     Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled)
     Active: active (running) (port 22)
   Main PID: 1102 (sshd)`,
            newState: cloneState
          };
        }
        return {
          output: `* ${svc}.service - Generic System Service
     Loaded: loaded (/lib/systemd/system/${svc}.service; enabled)
     Active: active (running) since Nov 23 08:00:00 UTC`,
          newState: cloneState
        };
      }
      return { output: 'Usage: systemctl status [httpd | sshd | ufw]', newState: cloneState };

    case 'ls': {
      const isLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
      // Look at /home/dinesh or projects
      let targetNode: { [key: string]: FileNode } | undefined = cloneState.fileSystem.home.children?.dinesh.children;
      if (cloneState.currentPath === '/home/dinesh/projects') {
        targetNode = cloneState.fileSystem.home.children?.dinesh.children?.projects.children;
      }

      if (!targetNode) {
        return { output: '', newState: cloneState };
      }

      const fileList = Object.values(targetNode);
      if (isLong) {
        const lines = fileList.map(
          f => `${f.permissions} 1 ${f.owner} ${f.group} ${f.size.padStart(5, ' ')} ${f.date} ${f.type === 'dir' ? '\x1b[34m' + f.name + '/\x1b[0m' : f.name}`
        );
        return { output: `total ${fileList.length * 4}\n` + lines.join('\n'), newState: cloneState };
      } else {
        const names = fileList.map(f => f.type === 'dir' ? `${f.name}/` : f.name).join('  ');
        return { output: names, newState: cloneState };
      }
    }

    case 'cat': {
      const filename = args[0];
      if (!filename) {
        return { output: 'cat: missing file operand', newState: cloneState };
      }
      const dir = cloneState.currentPath === '/home/dinesh/projects'
        ? cloneState.fileSystem.home.children?.dinesh.children?.projects.children
        : cloneState.fileSystem.home.children?.dinesh.children;

      const file = dir ? dir[filename] : undefined;
      if (!file) {
        return { output: `cat: ${filename}: No such file or directory`, newState: cloneState };
      }
      if (file.type === 'dir') {
        return { output: `cat: ${filename}: Is a directory`, newState: cloneState };
      }
      return { output: file.content || '', newState: cloneState };
    }

    case 'cd': {
      const target = args[0] || '~';
      if (target === '~' || target === '/home/dinesh' || target === '..') {
        cloneState.currentPath = '/home/dinesh';
        return { output: '', newState: cloneState };
      }
      if (target === 'projects' || target === './projects' || target === '/home/dinesh/projects') {
        cloneState.currentPath = '/home/dinesh/projects';
        return { output: '', newState: cloneState };
      }
      return { output: `cd: no such file or directory: ${target}`, newState: cloneState };
    }

    case 'touch': {
      const name = args[0];
      if (!name) return { output: 'touch: missing file operand', newState: cloneState };
      const dir = cloneState.currentPath === '/home/dinesh/projects'
        ? cloneState.fileSystem.home.children?.dinesh.children?.projects.children
        : cloneState.fileSystem.home.children?.dinesh.children;
      if (dir) {
        dir[name] = {
          name,
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'dinesh',
          group: 'dinesh',
          size: '0',
          date: 'Just now',
          content: ''
        };
      }
      return { output: `Created empty file: ${name}`, newState: cloneState };
    }

    case 'mkdir': {
      const name = args[0];
      if (!name) return { output: 'mkdir: missing operand', newState: cloneState };
      const dir = cloneState.currentPath === '/home/dinesh/projects'
        ? cloneState.fileSystem.home.children?.dinesh.children?.projects.children
        : cloneState.fileSystem.home.children?.dinesh.children;
      if (dir) {
        dir[name] = {
          name,
          type: 'dir',
          permissions: 'drwxr-xr-x',
          owner: 'dinesh',
          group: 'dinesh',
          size: '4096',
          date: 'Just now',
          children: {}
        };
      }
      return { output: `Created directory: ${name}/`, newState: cloneState };
    }

    case 'chmod': {
      if (args.length < 2) return { output: 'chmod: missing operand (e.g. chmod +x file.sh)', newState: cloneState };
      const [perm, file] = args;
      const dir = cloneState.fileSystem.home.children?.dinesh.children;
      if (dir && dir[file]) {
        dir[file].permissions = perm.includes('+x') ? '-rwxr-xr-x' : `-rw-r--r--`;
        return { output: `Updated permissions for ${file} -> ${dir[file].permissions}`, newState: cloneState };
      }
      return { output: `chmod: cannot access '${file}': No such file`, newState: cloneState };
    }

    case 'chown': {
      if (args.length < 2) return { output: 'chown: missing operand (e.g. chown root:root file)', newState: cloneState };
      return { output: `Ownership updated successfully.`, newState: cloneState };
    }

    case 'ssh': {
      const target = args[0] || 'ec2-user@aws-linux';
      return {
        output: `The authenticity of host '${target} (3.110.45.12)' can't be established.
ED25519 key fingerprint is SHA256:4Xk78d91b8Q398fn0w82hsd912hfk.
Connecting to ${target}... Authenticated with public key (dinesh-keypair.pem).
Last login: Mon Nov 23 09:12:00 from 192.168.1.105

   ,     #_
   ~\\_  ####_        Amazon Linux 2023 AMI
  ~~  \\_#####\\
  ~~     \\###|       https://aws.amazon.com/linux/amazon-linux-2023/
  ~~       \\#/ ___
   ~~       V~' '->
    ~~~         /
      ~~~~._.  /
         _/ _/
       _/m/'

[ec2-user@aws-linux-node ~]$ Welcome to Dinesh's AWS EC2 Instance!
[ec2-user@aws-linux-node ~]$ Session closed by foreign host. Returning to local terminal.`,
        newState: cloneState
      };
    }

    default:
      return {
        output: `bash: ${command}: command not found. Type 'help' for available commands.`,
        newState: cloneState
      };
  }
};
