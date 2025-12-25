'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Slide data structure with context cards
const slides = [
    {
        id: 1,
        primary: "People often ask how my career makes sense.",
        secondary: [],
        card: null,
        visual: null
    },
    {
        id: 2,
        primary: "It started with Biology.",
        secondary: ["Systems.", "Structure.", "Cause and effect."],
        card: {
            title: "B.Sc. Life Sciences",
            lines: ["University of Delhi", "2016 – 2019"],
            color: "#4ade80"
        },
        visual: "/images/about/biology.png"
    },
    {
        id: 3,
        primary: "Then came a pivot.",
        secondary: ["From studying systems", "to understanding outcomes."],
        card: null,
        visual: "/images/about/decision.png"
    },
    {
        id: 4,
        primary: "The MBA changed the lens.",
        secondary: ["Decisions aren't made in isolation.", "They're negotiated."],
        card: {
            title: "MBA – IT & Marketing",
            lines: ["Focus: Strategy, Systems, Growth", "2020 – 2022"],
            color: "#fbbf24"
        },
        visual: null
    },
    {
        id: 5,
        primary: "Sales was the uncomfortable phase.",
        secondary: ["Fast.", "Repetitive.", "Honest."],
        card: {
            title: "Enterprise Software Sales",
            lines: ["B2B SaaS", "Exposure to Tech, Customers, Incentives"],
            color: "#fb923c"
        },
        visual: "/images/about/systems.png"
    },
    {
        id: 6,
        primary: "That's where I met Business Analysis.",
        secondary: ["Between problem and solution.", "Between people and systems."],
        card: null,
        visual: null
    },
    {
        id: 7,
        primary: "Product gave structure to that chaos.",
        secondary: ["Trade-offs.", "Priorities.", "Delivery under constraints."],
        card: {
            title: "Business Analyst / Product Owner",
            lines: ["Travel & Aviation Tech", "GDS, OTAs, Enterprise Platforms"],
            color: "#2EE6D6"
        },
        visual: "/images/about/aviation.png"
    },
    {
        id: 8,
        primary: "My role has evolved.",
        secondary: ["My way of thinking hasn't."],
        card: null,
        visual: "/images/about/alignment.png"
    }
];

const timelineData = [
    { period: "2016–2019", title: "B.Sc. Life Sciences (DU)" },
    { period: "2020–2022", title: "MBA – IT & Marketing" },
    { period: "2022", title: "Enterprise Software Sales" },
    { period: "2023–Now", title: "Business Analysis & Product" }
];

export default function AboutPage() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [clickState, setClickState] = useState<'primary' | 'secondary' | 'card'>('primary');

    const isTimelineSlide = activeSlide === slides.length;
    const currentSlide = isTimelineSlide ? null : slides[activeSlide];
    const hasCard = currentSlide?.card !== null;

    const handleProgress = () => {
        // Timeline slide: just show everything
        if (isTimelineSlide) return;

        // Determine next state
        if (clickState === 'primary' && currentSlide?.secondary.length > 0) {
            setClickState('secondary');
        } else if (clickState === 'secondary' && hasCard) {
            setClickState('card');
        } else {
            // Move to next slide
            if (activeSlide < slides.length) {
                setActiveSlide(prev => prev + 1);
                setClickState('primary');
            }
        }
    };

    const handlePrevious = () => {
        if (activeSlide > 0) {
            setActiveSlide(prev => prev - 1);
            setClickState('primary');
        }
    };

    return (
        <main
            className="min-h-screen bg-[#0a0a0c] text-white relative overflow-hidden cursor-pointer"
            onClick={handleProgress}
        >
            {/* Subtle grain texture */}
            <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

            {/* Background Visual */}
            {!isTimelineSlide && (
                <AnimatePresence mode="wait">
                    {currentSlide?.visual && (
                        <motion.div
                            key={`visual-${currentSlide.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="fixed inset-0 pointer-events-none"
                        >
                            <Image
                                src={currentSlide.visual}
                                alt=""
                                fill
                                className="object-cover opacity-[0.08] blur-sm"
                                style={{ filter: 'grayscale(40%)' }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-8 lg:px-16">
                {isTimelineSlide ? (
                    // TIMELINE SUMMARY SLIDE
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl w-full space-y-12"
                    >
                        <h1 className="text-identity text-4xl lg:text-5xl font-medium text-white/95 text-center">
                            The journey, in order.
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="relative p-8 lg:p-12 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6"
                        >
                            {timelineData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
                                    className="flex items-start gap-6 group"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.8 + index * 0.15 + 0.2, type: "spring" }}
                                        className="w-3 h-3 rounded-full bg-[#2EE6D6] mt-2 flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <p className="text-[#2EE6D6]/60 text-sm font-mono mb-1">{item.period}</p>
                                        <p className="text-white/80 text-lg">{item.title}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 0.8 }}
                            className="text-white/50 text-center text-lg italic"
                        >
                            Each phase added a lens. None were wasted.
                        </motion.p>
                    </motion.div>
                ) : (
                    // REGULAR SLIDES
                    <div className="max-w-6xl w-full grid lg:grid-cols-[1fr,400px] gap-12 items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`slide-${currentSlide?.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-8"
                            >
                                {/* Primary Line */}
                                <h1 className="text-identity text-4xl lg:text-5xl xl:text-6xl font-medium text-white/95 leading-tight">
                                    {currentSlide?.primary}
                                </h1>

                                {/* Secondary Beats */}
                                <AnimatePresence>
                                    {(clickState === 'secondary' || clickState === 'card') && currentSlide?.secondary.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-4 pl-0 lg:pl-8"
                                        >
                                            {currentSlide.secondary.map((line, index) => (
                                                <motion.p
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{
                                                        delay: index * 0.15,
                                                        duration: 0.5,
                                                        ease: "easeOut"
                                                    }}
                                                    className="text-xl lg:text-2xl text-white/60 leading-relaxed"
                                                >
                                                    {line}
                                                </motion.p>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </AnimatePresence>

                        {/* Context Card (Right Side) */}
                        <div className="hidden lg:block">
                            <AnimatePresence>
                                {clickState === 'card' && currentSlide?.card && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative p-6 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-default"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            boxShadow: `0 0 20px ${currentSlide.card.color}15`
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            style={{
                                                boxShadow: `0 0 30px ${currentSlide.card.color}25`
                                            }}
                                        />

                                        <h3
                                            className="text-lg font-medium mb-3"
                                            style={{ color: currentSlide.card.color }}
                                        >
                                            {currentSlide.card.title}
                                        </h3>

                                        <div className="space-y-2">
                                            {currentSlide.card.lines.map((line, index) => (
                                                <p key={index} className="text-white/60 text-sm leading-relaxed">
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Indicators */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none z-20">
                {[...slides, { id: 'timeline' }].map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${index === activeSlide
                                ? 'w-8 bg-[#2EE6D6]'
                                : index < activeSlide
                                    ? 'w-4 bg-white/30'
                                    : 'w-2 bg-white/10'
                            }`}
                    />
                ))}
            </div>

            {/* Subtle Hint */}
            {!isTimelineSlide && (
                <>
                    {clickState === 'primary' && currentSlide?.secondary.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="fixed bottom-20 left-1/2 -translate-x-1/2 text-white/20 text-xs uppercase tracking-widest pointer-events-none"
                        >
                            Tap to reveal
                        </motion.div>
                    )}
                    {clickState === 'secondary' && hasCard && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed bottom-20 left-1/2 -translate-x-1/2 text-white/20 text-xs uppercase tracking-widest pointer-events-none"
                        >
                            Tap for context
                        </motion.div>
                    )}
                </>
            )}

            {/* Back Navigation */}
            {activeSlide > 0 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                    }}
                    className="fixed top-8 left-8 text-white/40 hover:text-white/80 transition-colors duration-300 z-30 pointer-events-auto"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Exit Link */}
            <Link
                href="/"
                onClick={(e) => e.stopPropagation()}
                className="fixed top-8 right-8 text-white/40 hover:text-[#2EE6D6] text-sm uppercase tracking-widest transition-colors duration-300 z-30 pointer-events-auto"
            >
                ← Home
            </Link>

            {/* Final Slide CTAs */}
            {isTimelineSlide && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                    className="fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-8 pointer-events-auto z-30"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Link
                        href="/"
                        className="text-[#2EE6D6]/70 hover:text-[#2EE6D6] text-sm uppercase tracking-widest transition-colors duration-300"
                    >
                        → Back to work
                    </Link>
                    <Link
                        href="/#decisions"
                        className="text-[#60A5FA]/70 hover:text-[#60A5FA] text-sm uppercase tracking-widest transition-colors duration-300"
                    >
                        → How I think
                    </Link>
                </motion.div>
            )}
        </main>
    );
}
