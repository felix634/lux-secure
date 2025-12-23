import { Database, Globe, Lock, ShieldAlert, Terminal, Activity, Search, Server } from 'lucide-react';

export const vaultData = [
    {
        id: 'CASE-942',
        client: 'FinTech Giant (Anon)',
        sector: 'Banking Infrastructure',
        date: '2024-11-12',
        clearance: 'TOP SECRET',
        title: 'Operation: Silent Ledger',
        summary: 'Neutralization of a polymorphic ransomware strain targeting SWIFT transaction nodes.',
        // Words in [] will be redacted
        report: `
            At 0400 hours, node telemetry detected an anomaly in the [ledger verification protocol]. 
            A hostile actor attempted to inject a [polyglot payload] into the transaction stream. 
            Standard firewalls were bypassed using a [zero-day logic flaw] in the legacy SQL cluster.
            
            We deployed a custom [honeypot simulating the core database]. The attacker engaged the decoy, 
            allowing us to trace the IP origin to a [botnet based in Eastern Europe]. 
            The vulnerability was patched hot-live without downtime.
        `,
        stack: [
            { name: 'Wireshark', icon: Activity },
            { name: 'Nmap', icon: Search },
            { name: 'Custom WAF', icon: ShieldAlert }
        ]
    },
    {
        id: 'CASE-881',
        client: 'Ministry of [REDACTED]',
        sector: 'Government Defense',
        date: '2024-08-20',
        clearance: 'CLASSIFIED // EYES ONLY',
        title: 'Project: Iron Dome',
        summary: 'Hardening of satellite uplink frequencies against signal jamming and interception.',
        report: `
            Intelligence suggested an imminent attempt to intercept [low-orbit telemetry data].
            The threat vector identified was a [Man-in-the-Middle attack] on the ground station uplink.
            
            Our team implemented a [quantum-resistant key exchange] protocol (Kyber-1024). 
            We also established a [frequency-hopping spread spectrum] algorithm to confuse signal jammers.
            Hostile interception attempts resulted in [garbage data acquisition] only.
        `,
        stack: [
            { name: 'OpenSSL', icon: Lock },
            { name: 'Kali Linux', icon: Terminal },
            { name: 'Air-Gap', icon: Server }
        ]
    },
    {
        id: 'CASE-719',
        client: 'Global Pharma Corp',
        sector: 'Biotech Research',
        date: '2024-05-15',
        clearance: 'CONFIDENTIAL',
        title: 'Incident: Ghost Shell',
        summary: 'Detection and removal of a persistent APT (Advanced Persistent Threat) hidden in R&D servers.',
        report: `
            Routine deep-scans revealed a [rootkit embedded in the BIOS] of the main research cluster.
            The malware was exfiltrating [proprietary genome data] via DNS tunneling to avoid detection.
            
            We initiated a [level-5 containment protocol], isolating the infected subnet.
            Using [memory forensics], we extracted the encryption keys used by the malware.
            The threat was purged, and the BIOS was flashed with a [signed secure bootloader].
        `,
        stack: [
            { name: 'Metasploit', icon: Database },
            { name: 'Burp Suite', icon: Activity },
            { name: 'Snort IDS', icon: ShieldAlert }
        ]
    }
];