'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { CARDS } from '@/constants/cards';
import ReactiveCard from './ReactiveCard';
import { useSessionStore } from '@/store/useSessionStore';

export default function CardCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Track scroll speed
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const setScrollSpeed = useSessionStore((state) => state.setScrollSpeed);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Calculate active index based on scroll
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            const index = Math.min(
                Math.floor(v * CARDS.length),
                CARDS.length - 1
            );
            setActiveIndex(index);

            // Simple speed detection
            const now = window.pageYOffset;
            const diff = Math.abs(now - lastScrollTop);
            setScrollSpeed(diff > 50 ? 'fast' : 'slow');
            setLastScrollTop(now);
        });
        return () => unsubscribe();
    }, [scrollYProgress, lastScrollTop, setScrollSpeed]);

    return (
        <div ref={containerRef} className="relative h-[800vh] w-full">
            {/* Sticky Fullscreen Context */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Session Insight (Subtle) */}
                <SessionInsight />

                {/* Card Stack */}
                <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                    {CARDS.map((card, index) => {
                        const distance = Math.abs(index - activeIndex);

                        // Only render 3 cards (center, prev, next)
                        if (distance > 1) return null;

                        let status: 'focused' | 'preview' | 'hidden' = 'hidden';
                        if (index === activeIndex) status = 'focused';
                        else if (distance === 1) status = 'preview';

                        // Vertical Offset for stack effect
                        const yOffset = (index - activeIndex) * 200; // 200px gap for previews

                        return (
                            <motion.div
                                key={card.id}
                                animate={{
                                    y: yOffset,
                                    zIndex: status === 'focused' ? 20 : 10
                                }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <div className="pointer-events-auto">
                                    <ReactiveCard
                                        data={card}
                                        isActive={index === activeIndex}
                                        status={status}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Scroll Progress Indicator (Systemic) */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                    {CARDS.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                width: i === activeIndex ? 24 : 8,
                                opacity: i === activeIndex ? 0.8 : 0.2,
                                backgroundColor: i === activeIndex ? '#2EE6D6' : '#FFFFFF'
                            }}
                            className="h-1 rounded-full transition-all duration-500"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function SessionInsight() {
    const scrollSpeed = useSessionStore((state) => state.scrollSpeed);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        // One subtle moment per visit
        if (scrollSpeed === 'fast') {
            setMessage("Most people start elsewhere.");
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [scrollSpeed]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-12 left-12 text-identity italic opacity-30 text-sm"
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
