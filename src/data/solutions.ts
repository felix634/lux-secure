import { Shield, Lock, Eye, Terminal, Server, Cpu } from 'lucide-react';

export const solutionsData = [
    {
        id: 'threat-detection',
        title: 'Threat Detection Lib',
        description: 'Real-time heuristic analysis engine for zero-day exploits.',
        icon: Eye,
        href: '/solutions#threat-detection'
    },
    {
        id: 'custom-builder',
        title: 'Custom Detection Builder',
        description: 'Visual logic gate builder for proprietary security protocols.',
        icon: Terminal,
        href: '/solutions#custom-builder'
    },
    {
        id: 'quantum-enc',
        title: 'Quantum Encryption',
        description: 'Post-quantum cryptography standards for banking infrastructure.',
        icon: Lock,
        href: '/solutions#quantum-enc'
    },
    {
        id: 'cloud-sentry',
        title: 'Cloud Sentry',
        description: 'Automated AWS/Azure perimeter hardening and drift detection.',
        icon: Server,
        href: '/solutions#cloud-sentry'
    },
    {
        id: 'iot-grid',
        title: 'IoT Grid Defense',
        description: 'Lightweight agents for embedded system security.',
        icon: Cpu,
        href: '/solutions#iot-grid'
    },
    {
        id: 'red-team-ai',
        title: 'Automated Red Team',
        description: 'AI-driven penetration testing that runs continuously.',
        icon: Shield,
        href: '/solutions#red-team-ai'
    }
];