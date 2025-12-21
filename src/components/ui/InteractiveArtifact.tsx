'use client';

import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface InteractiveArtifactProps {
    title: string;
    hoverText: string;
    index: number;
    isBiased?: boolean;
    onClick?: () => void;
}

export default function InteractiveArtifact({ title, hoverText, index, isBiased, onClick }: InteractiveArtifactProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isNear, setIsNear] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);
    const zShift = useSpring((isHovered || (isBiased && isNear)) ? 8 : 0, springConfig);

    useEffect(() => {
        const handleGlobalMouse = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

            const activationRadius = isBiased ? 400 : 200;
            setIsNear(dist < activationRadius);

            if (dist < rect.width * 2) {
                mouseX.set((e.clientX - centerX) / rect.width);
                mouseY.set((e.clientY - centerY) / rect.height);
            } else {
                mouseX.set(0);
                mouseY.set(0);
            }
        };

        window.addEventListener('mousemove', handleGlobalMouse);
        return () => window.removeEventListener('mousemove', handleGlobalMouse);
    }, [isBiased, mouseX, mouseY]);

    const baseRotation = [-0.5, 0.5, -0.2, 0.2][index % 4];

    return (
        <motion.div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                z: zShift,
                rotate: baseRotation
            }}
            className={`
        interactive-glass relative w-full h-[160px] flex flex-col justify-center 
        perspective-1000 overflow-hidden
        ${!isNear && !isBiased ? 'opacity-40' : 'opacity-100'}
      `}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: (isNear || isBiased) ? 1 : 0.4,
                y: 0,
            }}
            transition={{
                delay: 0.8 + (index * 0.12) + (isBiased ? 0.3 : 0),
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            <div className="relative z-10 w-full h-full flex flex-col justify-center px-8">
                <AnimatePresence mode="wait">
                    {!isHovered ? (
                        <motion.div
                            key="title"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col gap-1"
                        >
                            <div className={`text-identity text-[20px] transition-colors duration-500
                ${isBiased || isNear ? 'text-[#F2F2F2]' : 'text-white/40'}`}
                            >
                                {title}
                            </div>
                            {isBiased && (
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#2EE6D6] pt-1 block">
                                    Start Here.
                                </span>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="hover"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="text-explanation text-[14px] leading-relaxed transition-opacity"
                        >
                            {hoverText}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Specular Catch-light */}
            <div className="absolute top-0 left-0 w-full h-full border-t border-l border-white/5 rounded-2xl pointer-events-none" />

            {/* Signal Glow */}
            <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-700 
        ${isHovered ? 'opacity-100' : 'opacity-0'} 
        bg-gradient-to-br from-[#2EE6D6]/5 via-transparent to-transparent`}
            />
        </motion.div>
    );
}
