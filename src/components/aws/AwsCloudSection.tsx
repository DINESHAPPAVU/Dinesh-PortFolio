import React, { useState } from 'react';
import { 
  Cloud, Server, Shield, Database, Activity, Lock, CheckCircle, 
  Layers, Terminal 
} from 'lucide-react';
import { sound } from '../../utils/soundFx';

export const AwsCloudSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('ec2');
  const [activeStep, setActiveStep] = useState<number>(0);

  const awsServices = [
    {
      id: 'route53',
      name: 'Amazon Route 53 & ALB',
      category: 'DNS & LOAD BALANCING',
      icon: Cloud,
      color: '#00f3ff',
      status: 'HEALTHY',
      summary: 'Global DNS routing and Application Load Balancer distributing HTTP/HTTPS traffic to the EC2 target group.',
      dineshConfig: 'Configured Route 53 A-records with health-check failover and SSL certificate termination on Port 443.'
    },
    {
      id: 'sg',
      name: 'AWS Security Groups',
      category: 'VIRTUAL FIREWALL',
      icon: Shield,
      color: '#00ff66',
      status: 'ACTIVE ENFORCEMENT',
      summary: 'Stateful packet filter governing inbound and outbound CIDR traffic to the EC2 web server instance.',
      dineshConfig: 'Whitelisted Port 80 (HTTP) & 443 (HTTPS) for public web traffic (0.0.0.0/0); restricted Port 22 (SSH) strictly to admin management IP.'
    },
    {
      id: 'ec2',
      name: 'Amazon EC2 Linux Instance',
      category: 'COMPUTE & APACHE HTTPD',
      icon: Server,
      color: '#ffb703',
      status: 'RUNNING (t3.medium)',
      summary: 'Virtual machine running Amazon Linux 2023 with Apache HTTP Server (httpd) managed via systemctl.',
      dineshConfig: 'Provisioned instance with user-data bootstrap script, installed httpd, deployed website files in /var/www/html, and enabled automatic restart on boot.'
    },
    {
      id: 'cloudwatch',
      name: 'Amazon CloudWatch',
      category: 'MONITORING & ALARMS',
      icon: Activity,
      color: '#9d4edd',
      status: 'STREAMING METRICS',
      summary: 'Monitors compute metrics (CPUUtilization, NetworkIn/NetworkOut, DiskReadOps) and triggers incident notifications.',
      dineshConfig: 'Configured CloudWatch metric alarms at >80% CPU threshold and automated health check failure notifications.'
    },
    {
      id: 's3',
      name: 'Amazon S3 Storage',
      category: 'OBJECT STORAGE',
      icon: Database,
      color: '#0066ff',
      status: 'ENCRYPTED SSE-S3',
      summary: 'Scalable object storage bucket holding static media assets, automated website snapshots, and access logs.',
      dineshConfig: 'Configured S3 bucket with least-privilege IAM bucket policy, versioning enabled, and automated backup synchronization scripts.'
    },
    {
      id: 'iam',
      name: 'AWS Identity & Access Management (IAM)',
      category: 'SECURITY & POLICIES',
      icon: Lock,
      color: '#ff0055',
      status: 'LEAST PRIVILEGE',
      summary: 'Granular access control policies and instance IAM roles without embedding credentials in code.',
      dineshConfig: 'Created EC2 instance profile IAM role granting write-only access to S3 backup buckets and CloudWatch metrics.'
    }
  ];

  const deploymentSteps = [
    {
      step: 1,
      title: 'Provision EC2 Amazon Linux Instance',
      description: 'Selected Amazon Linux 2023 AMI, created key-pair (dinesh-keypair.pem) for secure SSH authentication, and attached IAM instance role.',
      code: 'aws ec2 run-instances --image-id ami-0c101f26f147fa7ab --instance-type t3.medium --key-name dinesh-keypair'
    },
    {
      step: 2,
      title: 'Configure Stateful Security Groups',
      description: 'Defined ingress rules: Port 80 (HTTP) from 0.0.0.0/0, Port 443 (HTTPS) from 0.0.0.0/0, and Port 22 (SSH) strictly from admin IP CIDR.',
      code: 'aws ec2 authorize-security-group-ingress --group-id sg-0812ab --protocol tcp --port 80 --cidr 0.0.0.0/0'
    },
    {
      step: 3,
      title: 'Deploy Apache HTTP Server (httpd)',
      description: 'Connected via SSH, installed Apache web daemon, configured virtual hosts, and enabled auto-start via systemctl.',
      code: 'sudo dnf install -y httpd && sudo systemctl start httpd && sudo systemctl enable httpd'
    },
    {
      step: 4,
      title: 'Setup Amazon CloudWatch Metric Alarms',
      description: 'Created metric alarms to supervise CPUUtilization and NetworkIn/NetworkOut metrics with threshold alerts.',
      code: 'aws cloudwatch put-metric-alarm --alarm-name WebServer-HighCPU --metric-name CPUUtilization --threshold 80'
    },
    {
      step: 5,
      title: 'Integrate S3 Static Storage & Backup',
      description: 'Synchronized website media and automated nightly backup dumps of web files into an encrypted S3 bucket.',
      code: 'aws s3 sync /var/www/html/ s3://dinesh-web-backups/prod/ --delete'
    }
  ];

  const currentService = awsServices.find(s => s.id === selectedService) || awsServices[2];

  return (
    <section id="aws" className="relative py-24 bg-cyber-surface/30 overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-surface border border-cyber-amber/40 text-xs font-mono text-cyber-amber shadow-glow-amber">
            <Cloud className="w-3.5 h-3.5" />
            <span>SECTION // 05</span>
            <span className="text-cyber-border">•</span>
            <span>AWS CLOUD INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
            AWS CLOUD ARCHITECTURE & LINUX DEPLOYMENT
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyber-muted max-w-3xl mx-auto">
            Interactive cloud infrastructure illustrating how Dinesh deployed, secured, and monitored an Apache HTTP Server on an Amazon EC2 Linux instance.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-amber via-cyber-cyan to-cyber-neon mx-auto rounded" />
        </div>

        {/* Cloud Topology Architecture Map */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyber-cyan/30 shadow-2xl mb-12 relative overflow-hidden cyber-corners">
          
          <div className="flex items-center justify-between border-b border-cyber-border pb-3 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyber-cyan font-bold">
              <Layers className="w-4 h-4" />
              <span>INTERACTIVE AWS TOPOLOGY GRAPH (CLICK ANY SERVICE)</span>
            </div>
            <span className="text-[10px] font-mono text-cyber-neon flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyber-neon led-green animate-pulse" />
              AWS REGION: ap-south-1 (Mumbai)
            </span>
          </div>

          {/* Connected AWS Nodes Flow */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {awsServices.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedService === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedService(service.id);
                  }}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-300 relative text-left ${
                    isSelected
                      ? 'bg-cyber-surface border-2 shadow-lg scale-105'
                      : 'bg-black/50 border border-cyber-border hover:border-cyber-cyan/40 hover:bg-cyber-surface/60'
                  }`}
                  style={{
                    borderColor: isSelected ? service.color : undefined,
                    boxShadow: isSelected ? `0 0 20px ${service.color}40` : undefined
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: `${service.color}15`,
                      border: `1px solid ${service.color}40`
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: service.color }} />
                  </div>

                  <div className="text-[10px] font-mono text-cyber-muted font-bold truncate">
                    {service.category}
                  </div>
                  <div className="text-xs font-display font-bold text-white mt-0.5 truncate">
                    {service.name}
                  </div>

                  <div className="mt-2 pt-2 border-t border-cyber-border flex items-center justify-between text-[9px] font-mono">
                    <span style={{ color: service.color }}>{service.status}</span>
                  </div>

                  {isSelected && (
                    <div
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: service.color, boxShadow: `0 0 8px ${service.color}` }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Cloud Component Detailed Inspector */}
          <div className="mt-8 p-5 rounded-xl bg-black/60 border border-cyber-border/80 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-surface border text-white font-bold" style={{ borderColor: currentService.color }}>
                  {currentService.name}
                </span>
                <span className="text-xs font-mono text-cyber-muted">•</span>
                <span className="text-xs font-mono" style={{ color: currentService.color }}>
                  {currentService.category}
                </span>
              </div>
              <p className="text-sm font-sans text-cyber-text leading-relaxed">
                {currentService.summary}
              </p>
              <div className="bg-cyber-surface/90 p-3 rounded-lg border border-cyber-border text-xs font-mono text-cyber-text/90 mt-2">
                <span className="text-cyber-cyan font-bold block mb-1">DINESH'S CLOUD IMPLEMENTATION:</span>
                {currentService.dineshConfig}
              </div>
            </div>

            <div className="lg:col-span-4 bg-cyber-surface/90 p-4 rounded-xl border border-cyber-border font-mono text-xs space-y-2">
              <div className="text-cyber-muted text-[11px] border-b border-cyber-border pb-1 font-bold">
                TELEMETRY & STATUS
              </div>
              <div className="flex justify-between">
                <span className="text-cyber-muted">State:</span>
                <span className="text-cyber-neon font-bold">{currentService.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyber-muted">Availability Zone:</span>
                <span className="text-white">ap-south-1a</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyber-muted">Security Policy:</span>
                <span className="text-cyber-cyan">Encrypted / Strict</span>
              </div>
            </div>
          </div>

        </div>

        {/* Step-by-Step Deployment Walkthrough */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyber-border shadow-glass cyber-corners">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-4 mb-6">
            <div>
              <div className="text-xs font-mono text-cyber-amber font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyber-amber" />
                <span>STEP-BY-STEP AWS DEPLOYMENT WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                How Dinesh Deployed & Monitored the Apache Web Server on AWS EC2
              </h3>
            </div>
            <div className="flex gap-2">
              {deploymentSteps.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(idx);
                  }}
                  className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all border ${
                    activeStep === idx
                      ? 'bg-cyber-cyan text-cyber-bg border-cyber-cyan shadow-glow-cyan'
                      : 'bg-cyber-surface text-cyber-muted border-cyber-border hover:border-cyber-cyan/50'
                  }`}
                >
                  {s.step}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan font-mono text-xs font-bold flex items-center justify-center">
                {deploymentSteps[activeStep].step}
              </span>
              <h4 className="text-lg font-display font-bold text-white">
                {deploymentSteps[activeStep].title}
              </h4>
            </div>

            <p className="text-sm font-sans text-cyber-text/90 leading-relaxed max-w-4xl">
              {deploymentSteps[activeStep].description}
            </p>

            <div className="bg-black/80 rounded-xl p-4 border border-cyber-border/80 font-mono text-xs text-cyber-cyan overflow-x-auto scanline flex items-center justify-between">
              <code>$ {deploymentSteps[activeStep].code}</code>
              <CheckCircle className="w-4 h-4 text-cyber-neon shrink-0 ml-2" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
