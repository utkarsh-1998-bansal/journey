'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/**
 * SCULPTURAL ECG · TURQUOISE · P-Q-R-S-T
 * 
 * 1. FIXED BEAT PATH (Sculptural, extreme vertical peaks)
 * 2. Cyan/Turquoise (#2EE6D6)
 * 3. Observational Tooltips
 */

interface ECGSegment {
    id: string;
    label: string;
    tooltip: string;
    x: number; // Position in SVG coords
    y: number; // Anchor point
    pqrst: 'P' | 'Q' | 'R' | 'S' | 'T';
}

const segments: ECGSegment[] = [
    {
        id: 'pivot',
        pqrst: 'P',
        label: 'PIVOT',
        tooltip: "Direction changed before clarity arrived.",
        x: 350, y: 35
    },
    {
        id: 'perseverance',
        pqrst: 'Q',
        label: 'PERSEVERANCE',
        tooltip: "Uniform velocity through high-friction intervals.",
        x: 480, y: 90
    },
    {
        id: 'resilience',
        pqrst: 'R',
        label: 'RESILIENCE',
        tooltip: "Structural integrity under maximum ambiguity.",
        x: 500, y: -45
    },
    {
        id: 'pragmatism',
        pqrst: 'S',
        label: 'PRAGMATISM',
        tooltip: "Collapsing ideology into functional reality.",
        x: 520, y: 165
    },
    {
        id: 'timing',
        pqrst: 'T',
        label: 'TIMING',
        tooltip: "The precise cost of waiting vs the cost of moving.",
        x: 650, y: 35
    }
];

export default function DecisionECG() {
    const [hoveredSegment, setHoveredSegment] = useState<ECGSegment | null>(null);

    // Sculptural PQRST Path: Zoomed to fit frame, short side lines, extreme vertical
    // Baseline is at y=60
    const ecgPath = "M 280 60 L 320 60 Q 350 35 380 60 L 460 60 L 480 90 L 500 -45 L 520 165 L 540 60 L 620 60 Q 650 35 680 60 L 720 60";

    return (
        <div className="relative w-full h-full flex flex-col justify-center select-none overflow-visible px-4 group/ecg">

            {/* Tooltip Overlay (No container) */}
            <div className="absolute top-4 right-8 w-64 pointer-events-none">
                <AnimatePresence mode="wait">
                    {hoveredSegment && (
                        <motion.div
                            key={hoveredSegment.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="text-right"
                        >
                            <div className="text-[10px] uppercase tracking-[0.4em] text-[#2EE6D6] font-bold mb-1 opacity-80">
                                {hoveredSegment.label}
                            </div>
                            <p className="text-[13px] text-white/60 font-instrument italic leading-tight">
                                {hoveredSegment.tooltip}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative w-full h-96 transition-all duration-700">
                <svg viewBox="250 -60 500 240" className="w-full h-full overflow-visible">
                    <defs>
                        <filter id="ecgGlow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* The Intentional Sculptural Line */}
                    <motion.path
                        d={ecgPath}
                        fill="none"
                        stroke="#2EE6D6"
                        strokeWidth="5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        filter="url(#ecgGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: 1,
                        }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="drop-shadow-[0_0_15px_rgba(46,230,214,0.4)]"
                    />

                    {/* Interaction Hit Areas & Label Markers */}
                    {segments.map((seg) => {
                        const isHovered = hoveredSegment?.id === seg.id;

                        return (
                            <g
                                key={seg.id}
                                className="cursor-pointer"
                                onMouseEnter={() => setHoveredSegment(seg)}
                                onMouseLeave={() => setHoveredSegment(null)}
                            >
                                {/* Invisible larger hit area - Adjusted for spikes */}
                                <rect
                                    x={seg.x - 25}
                                    y={seg.id === 'resilience' ? -100 : -20}
                                    width="50"
                                    height={seg.id === 'resilience' ? 300 : 200}
                                    fill="transparent"
                                />

                                <motion.text
                                    x={seg.x}
                                    y={seg.y + (seg.pqrst === 'S' || seg.pqrst === 'Q' ? 25 : -15)}
                                    textAnchor="middle"
                                    initial={false}
                                    animate={{
                                        scale: isHovered ? 1.1 : 1,
                                        fill: isHovered ? '#2EE6D6' : 'rgba(255,255,255,0.2)',
                                        opacity: isHovered ? 1 : 0.4
                                    }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ transformOrigin: `${seg.x}px ${seg.y + (seg.pqrst === 'S' || seg.pqrst === 'Q' ? 25 : -15)}px` }}
                                    className="text-[6px] font-sans font-bold uppercase tracking-[0.2em] pointer-events-none"
                                >
                                    {seg.label}
                                </motion.text>

                                {/* Geometric Marker */}
                                <circle
                                    cx={seg.x}
                                    cy={seg.y}
                                    r={isHovered ? 3 : 1}
                                    fill={isHovered ? "#2EE6D6" : "rgba(255,255,255,0.2)"}
                                    className="transition-all duration-500"
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
