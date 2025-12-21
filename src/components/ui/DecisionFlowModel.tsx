'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface Node {
    id: string;
    label: string;
    microLine?: string;
    x: number;
    y: number;
    tooltip: string;
    isSatellite?: boolean;
}

interface Annotation {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    text: string;
}

const nodes: Node[] = [
    {
        id: 'intent',
        label: 'Intent',
        microLine: 'What are we really trying to change?',
        x: 12, y: 50,
        tooltip: "Every problem starts unclear. Intent is what you decide to make explicit first."
    },
    {
        id: 'context',
        label: 'Context',
        microLine: 'People, incentives, history',
        x: 32, y: 35,
        tooltip: "Decisions fail when context is treated as background noise instead of input."
    },
    {
        id: 'constraints',
        label: 'Constraints',
        microLine: 'Time. Money. Reality.',
        x: 52, y: 65,
        tooltip: "Constraints aren’t blockers. They define the shape of viable solutions."
    },
    {
        id: 'tradeoffs',
        label: 'Trade-offs',
        microLine: 'What we choose to give up',
        x: 72, y: 40,
        tooltip: "Good decisions are rarely optimal. They’re consciously unbalanced."
    },
    {
        id: 'reality',
        label: 'Execution Reality',
        microLine: 'Where theory meets resistance',
        x: 92, y: 60,
        tooltip: "A decision isn’t complete until it survives contact with real users and systems."
    },

    // Satellites
    {
        id: 'human', label: 'Human Factors', x: 68, y: 85, isSatellite: true,
        tooltip: "Logic persuades systems. Emotion persuades people."
    },
    {
        id: 'signal', label: 'Signal ≠ Noise', x: 42, y: 15, isSatellite: true,
        tooltip: "Not all data deserves attention. Judgment decides what matters."
    },
    {
        id: 'time', label: 'Time Pressure', x: 22, y: 75, isSatellite: true,
        tooltip: "Some decisions are bad because they’re rushed. Others fail because they waited."
    },
];

const edges = [
    ['intent', 'context'],
    ['context', 'constraints'],
    ['constraints', 'tradeoffs'],
    ['tradeoffs', 'reality'],
    ['context', 'signal'],
    ['tradeoffs', 'human'],
    ['intent', 'time'],
];

const annotations: Annotation[] = [
    { fromX: 12, fromY: 50, toX: 32, toY: 35, text: "Clarity arrives late" },
    { fromX: 52, fromY: 65, toX: 72, toY: 40, text: "There is no free choice" },
    { fromX: 72, fromY: 40, toX: 92, toY: 60, text: "Decisions compound" },
];

export default function DecisionFlowModel() {
    const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
    const time = useMotionValue(0);

    useEffect(() => {
        let frameId: number;
        const animate = (t: number) => {
            time.set(t / 1000);
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [time]);

    return (
        <div className="relative w-full h-full flex items-center justify-center select-none overflow-visible">
            <svg viewBox="0 0 100 100" className="w-[130%] h-[130%] -ml-[15%]">
                {/* Soft Connections */}
                {edges.map(([fromId, toId], i) => {
                    const from = nodes.find(n => n.id === fromId)!;
                    const to = nodes.find(n => n.id === toId)!;
                    const isActive = hoveredNode?.id === fromId || hoveredNode?.id === toId;

                    return (
                        <motion.line
                            key={i}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke={isActive ? '#3CF2E6' : '#B6FF3B'}
                            strokeWidth={isActive ? 0.3 : 0.1}
                            strokeOpacity={isActive ? 0.5 : 0.1}
                            animate={{
                                strokeOpacity: isActive ? 0.5 : 0.1,
                                strokeWidth: isActive ? 0.3 : 0.1
                            }}
                            transition={{ duration: 0.8 }}
                        />
                    );
                })}

                {/* Micro-annotations */}
                {annotations.map((ann, i) => (
                    <text
                        key={i}
                        x={(ann.fromX + ann.toX) / 2}
                        y={(ann.fromY + ann.toY) / 2 - 2}
                        textAnchor="middle"
                        className="text-[1.8px] fill-white/10 font-medium italic pointer-events-none tracking-wide"
                        style={{ transform: `rotate(${Math.atan2(ann.toY - ann.fromY, ann.toX - ann.fromX) * 180 / Math.PI}deg)` }}
                    >
                        {ann.text}
                    </text>
                ))}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g key={node.id}
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-crosshair pointer-events-auto"
                    >
                        {/* Outer Pulse */}
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={node.isSatellite ? 1.2 : 2}
                            fill="#B6FF3B"
                            animate={{
                                opacity: hoveredNode?.id === node.id ? 0.2 : 0,
                                scale: hoveredNode?.id === node.id ? 2.2 : 1
                            }}
                        />

                        {/* Core Node */}
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={node.isSatellite ? 0.3 : 0.5}
                            fill={hoveredNode?.id === node.id ? '#3CF2E6' : '#B6FF3B'}
                            animate={{
                                fill: hoveredNode?.id === node.id ? '#3CF2E6' : '#B6FF3B',
                                r: hoveredNode?.id === node.id ? (node.isSatellite ? 0.5 : 0.8) : (node.isSatellite ? 0.3 : 0.5)
                            }}
                        />

                        {/* Labels */}
                        <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            className={`text-[2.2px] font-semibold tracking-[0.08em] uppercase fill-white/40 transition-colors duration-500
                ${hoveredNode?.id === node.id ? 'fill-accent-cyan' : 'fill-white/40'}`}
                        >
                            {node.label}
                        </text>

                        {node.microLine && (
                            <text
                                x={node.x}
                                y={node.y + 6.5}
                                textAnchor="middle"
                                className="text-[1.6px] fill-white/20 font-medium opacity-50 italic pointer-events-none"
                            >
                                {node.microLine}
                            </text>
                        )}
                    </g>
                ))}
            </svg>

            {/* Identity Label - Quiet & Professional */}
            <div className="absolute bottom-[-10%] left-0 flex flex-col gap-1.5">
                <div className="text-white/60 text-[16px] font-instrument italic leading-none">Utkarsh Bansal</div>
                <div className="text-white/10 text-[9px] uppercase tracking-[0.45em] font-bold">
                    Decision-making under ambiguity
                </div>
            </div>

            {/* Tooltip System */}
            <AnimatePresence>
                {hoveredNode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute z-50 pointer-events-none glass-panel-static px-6 py-4 max-w-[300px]"
                        style={{
                            left: `${hoveredNode.x}%`,
                            top: `${hoveredNode.y}%`,
                            transform: 'translate(-50%, -140%)'
                        }}
                    >
                        <p className="text-[14px] leading-relaxed text-white/90 font-medium">
                            {hoveredNode.tooltip}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
