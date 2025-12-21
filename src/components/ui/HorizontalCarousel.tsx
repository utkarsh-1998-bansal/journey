'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CARDS } from '@/constants/cards';
import ReactiveCard from './ReactiveCard';
import { useSessionStore } from '@/store/useSessionStore';

export default function HorizontalCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hasHovered, setHasHovered] = useState(false);

    const setScrollSpeed = useSessionStore((state) => state.setScrollSpeed);
    const scrollSpeed = useSessionStore((state) => state.scrollSpeed);
    const [lastX, setLastX] = useState(0);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const scrollX = el.scrollLeft;
            const width = el.offsetWidth;
            // Index detection based on smaller cards (375px + 64px gap)
            const itemWidth = 375 + 64;
            const centerOffset = width / 2;

            const newIndex = Math.round((scrollX + centerOffset - (itemWidth / 2) - (width * 0.25)) / itemWidth);
            const clampedIndex = Math.min(Math.max(newIndex, 0), CARDS.length - 1);

            if (clampedIndex !== activeIndex) {
                setActiveIndex(clampedIndex);
            }

            // Speed detection
            const diff = Math.abs(scrollX - lastX);
            setScrollSpeed(diff > 50 ? 'fast' : 'slow');
            setLastX(scrollX);
        };

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [activeIndex, lastX, setScrollSpeed]);

    useEffect(() => {
        if (scrollSpeed === 'fast') {
            setMessage("Most people start elsewhere.");
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [scrollSpeed]);

    return (
        <section
            className="snap-section relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden py-10"
            onMouseEnter={() => setHasHovered(true)}
        >

            {/* SECTION HEADER: ROAD METAPHOR */}
            <div className="absolute top-20 left-0 w-full flex flex-col items-center z-10 pointer-events-none">
                <div className="relative flex items-center justify-center w-full px-12">

                    {/* Left Road Line */}
                    <div className="flex-grow h-4 relative">
                        <svg viewBox="0 0 1000 16" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <AnimatePresence mode="wait">
                                <motion.path
                                    key={`left-solid-journey-${activeIndex}`}
                                    d="M 1000 8 Q 500 0 0 8"
                                    fill="none"
                                    stroke="#2EE6D6"
                                    strokeWidth="2.5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: 1,
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        times: [0, 0.1, 0.7, 1], // Fast draw, 2s hold (0.1->0.7), fade
                                        ease: "easeInOut"
                                    }}
                                    className="drop-shadow-[0_0_15px_rgba(46,230,214,0.6)]"
                                />
                            </AnimatePresence>
                        </svg>
                    </div>

                    {/* Title Anchor */}
                    <div className="px-12 whitespace-nowrap">
                        <h2 className="text-identity text-2xl lg:text-3xl font-medium text-white/80 italic tracking-wide">
                            Somewhere along the way
                        </h2>
                    </div>

                    {/* Right Road Line */}
                    <div className="flex-grow h-4 relative">
                        <svg viewBox="0 0 1000 16" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <AnimatePresence mode="wait">
                                <motion.path
                                    key={`right-solid-journey-${activeIndex}`}
                                    d="M 0 8 Q 500 16 1000 8"
                                    fill="none"
                                    stroke="#2EE6D6"
                                    strokeWidth="2.5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: 1,
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        times: [0, 0.1, 0.7, 1],
                                        ease: "easeInOut"
                                    }}
                                    className="drop-shadow-[0_0_15px_rgba(46,230,214,0.6)]"
                                />
                            </AnimatePresence>
                        </svg>
                    </div>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex items-center gap-16 px-[30vw] overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full h-full no-scrollbar overscroll-x-contain mt-12"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {CARDS.map((card, index) => {
                    const isFocused = index === activeIndex;
                    const distance = Math.abs(index - activeIndex);
                    const isVisible = distance <= 1; // 3-card rule

                    return (
                        <motion.div
                            key={card.id}
                            className={`flex-shrink-0 snap-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-10 blur-sm'}`}
                        >
                            <ReactiveCard
                                data={card}
                                status={isFocused ? 'focused' : 'preview'}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* BEHAVIORAL OVERLAY */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-16 left-16 text-identity italic opacity-30 text-xs pointer-events-none"
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
}
