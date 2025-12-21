'use client';

import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface InteractiveTileProps {
    title: string;
    hoverText: string;
    index: number;
    isBiased?: boolean;
    onClick?: () => void;
}

export default function InteractiveTile({ title, hoverText, index, isBiased, onClick }: InteractiveTileProps) {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Anti-gravity / Micro-tilt Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 120 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), springConfig);
    const zShift = useSpring(isHovered ? 4 : 0, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const xDist = (e.clientX - rect.left) / rect.width - 0.5;
        const yDist = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(xDist);
        mouseY.set(yDist);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    // Rotations for staggering
    const baseRotation = [-1.2, 1.2, -0.6, 0.6][index % 4];
    const yOffset = [0, 40, 15, 65][index % 4];

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                z: zShift,
                rotate: baseRotation,
                marginTop: yOffset
            }}
            className={`
        glass-morphic relative w-full h-[150px] p-7 cursor-pointer flex flex-col justify-center 
        transition-all duration-700 group perspective-1000
        ${isBiased ? 'biased-glow border-white/20' : 'border-white/10'}
        ${isBiased && !isHovered ? 'blur-[4px] scale-[0.98]' : 'blur-0 scale-100'}
      `}
            initial={{ opacity: 0, y: 30, filter: isBiased ? 'blur(4px)' : 'blur(0px)' }}
            animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                scale: 1
            }}
            transition={{
                delay: 0.7 + (index * 0.15) + (isBiased ? 0.3 : 0),
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            <div className="flex flex-col gap-1">
                <motion.div
                    animate={{ opacity: isHovered ? 0 : isBiased ? 1 : 0.8 }}
                    className={`text-lg font-medium tracking-tight ${isBiased ? 'text-[#000]' : 'text-[#2E2E2E]/70'}`}
                >
                    {title}
                </motion.div>

                {isBiased && (
                    <motion.span
                        animate={{ opacity: isHovered ? 0 : 0.25 }}
                        className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber -mt-1"
                    >
                        Start here.
                    </motion.span>
                )}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 p-7 flex items-center bg-white/50 backdrop-blur-md rounded-2xl text-[15px] leading-relaxed text-[#000] font-medium"
            >
                {hoverText}
            </motion.div>

            {/* Specular Glint Reflection */}
            <motion.div
                animate={{ opacity: isHovered ? 0.1 : 0.02 }}
                className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none rounded-2xl"
            />
        </motion.div>
    );
}
