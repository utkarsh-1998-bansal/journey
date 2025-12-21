'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CardData } from '@/constants/cards';
import { useSessionStore } from '@/store/useSessionStore';

interface ReactiveCardProps {
    data: CardData;
    status: 'focused' | 'preview' | 'hidden';
}

export default function ReactiveCard({ data, status }: ReactiveCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [linger, setLinger] = useState(false);

    const recordVisit = useSessionStore((state) => state.recordVisit);
    const cardMetrics = useSessionStore((state) => state.cardMetrics[data.id]);
    const isRevisit = (cardMetrics?.visitCount || 0) > 1;

    const isFocused = status === 'focused';

    // Linger Detection (6s threshold as requested)
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isFocused && isHovered && !linger) {
            timer = setTimeout(() => {
                setLinger(true);
            }, 6000);
        }
        if (!isFocused || !isHovered) {
            setLinger(false);
        }
        return () => clearTimeout(timer);
    }, [isFocused, isHovered, linger]);

    // Record Visit on focus
    useEffect(() => {
        if (isFocused) {
            recordVisit(data.id);
        }
    }, [isFocused, data.id, recordVisit]);

    // CTA State Logic:
    // 1. Focused Card + 6s Linger -> CTA Only
    // 2. Preview Cards (not focused) -> CTA Only
    const showCTAOnly = (isFocused && linger) || !isFocused;

    // Secondary line: Only if Focused + Hovered + NOT in CTA state (less than 6s)
    const showSecondary = isFocused && isHovered && !linger;

    return (
        <motion.div
            initial={false}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                scale: isFocused ? 1.0 : 0.75,
                opacity: status === 'hidden' ? 0 : isFocused ? 1 : 0.4,
            }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={`
        relative w-[300px] lg:w-[375px] aspect-[4/3] p-10 rounded-2xl
        ${isFocused ? 'narrative-glass shadow-2xl z-20' : 'bg-white/5 border border-white/5 z-10'}
        flex flex-col justify-center select-none overflow-hidden
      `}
        >
            {/* Meta Line (Revisit) - Only on Focused Card, non-CTA state */}
            <div className="absolute top-8 left-10 h-4">
                <AnimatePresence>
                    {isFocused && isRevisit && !linger && data.metaOnRevisit && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-[9px] uppercase tracking-[0.4em] text-[#2EE6D6] font-bold"
                        >
                            {data.metaOnRevisit}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Main Narrative Area */}
            <div className="relative w-full">
                <AnimatePresence mode="wait">
                    {showCTAOnly ? (
                        <motion.div
                            key="cta"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center justify-center text-center gap-4"
                        >
                            <span className="w-8 h-px bg-[#2EE6D6]/40 mb-2" />
                            <div className="text-[10px] lg:text-[11px] uppercase tracking-[0.5em] font-bold text-[#2EE6D6] max-w-[200px] leading-relaxed">
                                {data.cta}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col gap-5 px-2"
                        >
                            {/* Primary Line */}
                            <div className="text-identity text-xl lg:text-2xl italic leading-tight text-white">
                                {data.primary}
                            </div>

                            {/* Secondary Line (on hover) */}
                            <AnimatePresence>
                                {showSecondary && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="text-explanation text-base leading-relaxed text-white/50 pt-3 border-t border-white/5"
                                    >
                                        {data.secondary}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
