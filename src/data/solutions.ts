import { Shield, Lock, Eye, Terminal, Server, Cpu } from 'lucide-react';

export const solutionsData = [
    {
        id: 'threat-detection',
        type: 'SCAN', // Determines the visual effect
        title: 'Threat Detection Lib',
        description: 'Real-time heuristic analysis engine for zero-day exploits.',
        longDescription: 'Our proprietary heuristic engine analyzes traffic patterns in real-time, identifying anomalies that traditional signature-based detection misses. Deployed across 140+ countries, it learns from global attack vectors instantly.',
        features: ['Heuristic Analysis', 'Zero-Day Mitigation', 'Global Threat Intel', ' sub-ms Latency'],
        icon: Eye,
        href: '/solutions/threat-detection'
    },
    {
        id: 'custom-builder',
        type: 'CRYPT',
        title: 'Custom Detection Builder',
        description: 'Visual logic gate builder for proprietary security protocols.',
        longDescription: 'Construct your own security logic without writing a single line of low-level code. Our visual builder compiles your logic into highly optimized WASM modules that run at the edge.',
        features: ['Visual Logic Gates', 'WASM Compilation', 'Edge Deployment', 'Hot-Swapping'],
        icon: Terminal,
        href: '/solutions/custom-builder'
    },
    {
        id: 'quantum-enc',
        type: 'CRYPT',
        title: 'Quantum Encryption',
        description: 'Post-quantum cryptography standards for banking infrastructure.',
        longDescription: 'Future-proof your data against quantum decryption algorithms. We utilize Lattice-based cryptography to ensure your archival data remains secure even in the post-quantum era.',
        features: ['Lattice Cryptography', 'AES-512 Hybrid', 'Key Rotation', 'Forward Secrecy'],
        icon: Lock,
        href: '/solutions/quantum-enc'
    },
    {
        id: 'cloud-sentry',
        type: 'GRID',
        title: 'Cloud Sentry',
        description: 'Automated AWS/Azure perimeter hardening and drift detection.',
        longDescription: 'Automatically detect infrastructure drift. Cloud Sentry takes a snapshot of your ideal state and relentlessly terminates any unauthorized instances or port modifications.',
        features: ['Drift Detection', 'Auto-Remediation', 'Multi-Cloud Support', 'Compliance Mapping'],
        icon: Server,
        href: '/solutions/cloud-sentry'
    },
    {
        id: 'iot-grid',
        type: 'GRID',
        title: 'IoT Grid Defense',
        description: 'Lightweight agents for embedded system security.',
        longDescription: 'Security for the edge. Our 4KB micro-agent runs on even the most constrained hardware, providing heartbeat monitoring and intrusion detection for industrial IoT grids.',
        features: ['4KB Footprint', 'Embedded OS Support', 'Fleet Management', 'Air-Gapped Sync'],
        icon: Cpu,
        href: '/solutions/iot-grid'
    },
    {
        id: 'red-team-ai',
        type: 'SCAN',
        title: 'Automated Red Team',
        description: 'AI-driven penetration testing that runs continuously.',
        longDescription: 'Why wait for an annual audit? Our AI Red Team attacks your infrastructure 24/7, finding vulnerabilities before the bad actors do. It generates detailed patch reports automatically.',
        features: ['Continuous Pen-Testing', 'AI Attack Vectors', 'Auto-Reporting', 'Safe-Mode Exploits'],
        icon: Shield,
        href: '/solutions/red-team-ai'
    }
];