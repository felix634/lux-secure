import { ShieldCheck, Truck, Factory, Activity, Globe, Server } from 'lucide-react';

export const labExperiments = [
    {
        id: 'compliance-dashboard',
        title: 'CISO Compliance Engine',
        subtitle: 'SOC2 / GDPR Readiness Simulator',
        description: 'Interactive risk assessment modeling for enterprise infrastructure.',
        icon: ShieldCheck,
        color: 'text-lux-green',
        component: 'Compliance'
    },
    {
        id: 'global-logistics',
        title: 'Global Logistics Command',
        subtitle: 'Real-Time Fleet Telemetry',
        description: 'AI-driven route optimization and asset tracking visualization.',
        icon: Globe,
        color: 'text-blue-400', // Differentiating color for variety
        component: 'Logistics'
    },
    {
        id: 'predictive-twin',
        title: 'Industrial Digital Twin',
        subtitle: 'Predictive Maintenance Twin',
        description: 'IoT sensor array simulation with stress-testing capabilities.',
        icon: Factory,
        color: 'text-orange-400',
        component: 'Industrial'
    }
];