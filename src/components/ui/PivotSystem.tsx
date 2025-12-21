'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NodeSpec {
    id: string;
    title: string;
    subLabel: string;
    tooltip: string;
    x: number; // grid col relative to diagram center (50)
    y: number; // grid row relative to diagram center (50)
    isPivot?: boolean;
}

const nodes: NodeSpec[] = [
    {
        id: 'pivot',
        title: 'PIVOT',
        subLabel: 'Directional change without losing intent',
        tooltip: 'The most defining decisions in my career weren’t optimizations. They were pivots made before clarity arrived.',
        x: 50, y: 50,
        isPivot: true
    },
    {
        id: 'perspective',
        title: 'PERSPECTIVE',
        subLabel: 'How the same problem looks different from different angles',
        tooltip: 'Exposure to multiple ways of thinking taught me that the problem rarely changes. The lens does.',
        x: 25, y: 25
    },
    {
        id: 'prioritization',
        title: 'PRIORITIZATION',
        subLabel: 'Choosing what matters now',
        tooltip: 'Every phase of my work forced a different answer to the same question: what can’t wait?',
        x: 75, y: 25
    },
    {
        id: 'pragmatism',
        title: 'PRAGMATISM',
        subLabel: 'What survives contact with reality',
        tooltip: 'Some ideas sound right until they meet constraints. I learned to respect the difference early.',
        x: 75, y: 75
    },
    {
        id: 'pressure',
        title: 'PRESSURE',
        subLabel: 'Decisions made without full information',
        tooltip: 'Waiting for certainty is comfortable. It’s also rarely an option when responsibility is real.',
        x: 25, y: 75
    }
];

const satellites = [
    { label: 'SIGNAL ≠ NOISE', x: 50, y: 20 },
    { label: 'HUMAN FACTORS', x: 85, y: 50 },
    { label: 'TIME PRESSURE', x: 15, y: 50 }
];

export default function PivotSystem() {
    const [hoveredNode, setHoveredNode] = useState<NodeSpec | null>(null);

    return (
        <div className="relative w-full h-full flex items-center justify-center select-none overflow-visible">
            {/* Background System Whisper */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
                <circle cx="50" cy="50" r="25" fill="none" stroke="#B6FF3B" strokeWidth="0.1" strokeDasharray="1 2" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#B6FF3B" strokeWidth="0.05" strokeDasharray="1 3" />
            </svg>

            <svg viewBox="0 0 100 100" className="w-[110%] h-[110%] overflow-visible">
                {/* Convergent Flow Lines */}
                {nodes.filter(n => !n.isPivot).map((node) => {
                    const isActive = hoveredNode?.id === node.id || hoveredNode?.id === 'pivot';
                    return (
                        <g key={`edge-${node.id}`}>
                            <motion.line
                                x1={node.x}
                                y1={node.y}
                                x2={50}
                                y2={50}
                                stroke={isActive ? '#3CF2E6' : '#B6FF3B'}
                                strokeWidth={isActive ? 0.3 : 0.15}
                                strokeOpacity={isActive ? 0.4 : 0.1}
                                animate={{
                                    strokeOpacity: isActive ? 0.4 : 0.1,
                                    strokeWidth: isActive ? 0.3 : 0.15
                                }}
                            />
                            {/* Flow particles */}
                            <motion.circle
                                r="0.2"
                                fill="#3CF2E6"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: isActive ? [0, 1, 0] : 0,
                                    cx: [node.x, 50],
                                    cy: [node.y, 50]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 2
                                }}
                            />
                        </g>
                    );
                })}

                {/* Satellite Signals */}
                {satellites.map((s, i) => (
                    <text
                        key={`sat-${i}`}
                        x={s.x}
                        y={s.y}
                        textAnchor="middle"
                        className="text-[1.8px] fill-white/10 font-medium tracking-[0.3em] uppercase pointer-events-none"
                    >
                        {s.label}
                    </text>
                ))}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g
                        key={node.id}
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-crosshair pointer-events-auto"
                    >
                        {/* Ambient Glow */}
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={node.isPivot ? 4 : 2.5}
                            fill={node.isPivot ? "#3CF2E6" : "#B6FF3B"}
                            animate={{
                                opacity: hoveredNode?.id === node.id ? 0.1 : (node.isPivot ? 0.03 : 0),
                                scale: hoveredNode?.id === node.id ? 1.5 : 1
                            }}
                        />

                        {/* Core Node Dot */}
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={node.isPivot ? 0.8 : 0.5}
                            fill={hoveredNode?.id === node.id ? "#3CF2E6" : "#B6FF3B"}
                            animate={{
                                scale: hoveredNode?.id === node.id ? 1.5 : 1,
                                fill: hoveredNode?.id === node.id ? "#3CF2E6" : "#B6FF3B"
                            }}
                        />

                        {/* Titles */}
                        <text
                            x={node.x}
                            y={node.y + (node.isPivot ? -6 : -4)}
                            textAnchor="middle"
                            className={`
                ${node.isPivot ? 'text-[5px] font-instrument italic tracking-normal' : 'text-[2.2px] font-instrument italic tracking-wider'}
                fill-white transition-opacity duration-500
                ${hoveredNode?.id === node.id ? 'opacity-100' : (node.isPivot ? 'opacity-90' : 'opacity-40')}
              `}
                        >
                            {node.title}
                        </text>

                        {/* Sub-labels */}
                        <text
                            x={node.x}
                            y={node.y + (node.isPivot ? 6 : 4)}
                            textAnchor="middle"
                            className={`
                ${node.isPivot ? 'text-[2.2px]' : 'text-[1.8px]'}
                fill-white/30 font-medium tracking-tight pointer-events-none transition-opacity duration-500
                ${hoveredNode?.id === node.id ? 'opacity-100' : 'opacity-30'}
              `}
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            {node.subLabel}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Identity Signature */}
            <div className="absolute bottom-[-10vh] left-0 pointer-events-none opacity-40">
                <div className="text-white text-[16px] font-instrument italic">Utkarsh Bansal</div>
                <div className="text-white/40 text-[9px] uppercase tracking-[0.5em] font-bold">Decision-making under ambiguity</div>
            </div>

            {/* Tooltip System */}
            <AnimatePresence>
                {hoveredNode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute z-[100] pointer-events-none glass-panel-static px-6 py-4 max-w-[300px]"
                        style={{
                            left: `${hoveredNode.x}%`,
                            top: `${hoveredNode.y}%`,
                            transform: 'translate(-50%, -150%)'
                        }}
                    >
                        <p className="text-[13px] leading-relaxed text-white/90 font-medium">
                            {hoveredNode.tooltip}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
