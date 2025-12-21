'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import {
    Microscope,
    ScrollText,
    Laptop,
    Sparkle,
    Scale,
    Eye,
    Activity,
    Workflow,
    Layers,
    Box,
    Globe,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

const icons = [
    { Icon: Microscope, delay: 0, quote: "Biology is just complex systems." },
    { Icon: ScrollText, delay: 0.4, quote: "Rigor is the floor, not the ceiling." },
    { Icon: Laptop, delay: 0.2, quote: "Code is the secondary language." },
    { Icon: Sparkle, delay: 0.6, quote: "Thinking is the primary work." },
    { Icon: Scale, delay: 0.1, quote: "Trade-offs are inevitable." },
    { Icon: Eye, delay: 0.5, quote: "Perspective is a choice." },
    { Icon: Activity, delay: 0.3, quote: "Motion isn't always progress." },
    { Icon: Workflow, delay: 0.7, quote: "Systems should serve intent." },
    { Icon: Layers, delay: 0.8, quote: "Peeling back the abstraction." },
    { Icon: Box, delay: 0.9, quote: "What's outside the frame?" },
    { Icon: Globe, delay: 1.0, quote: "Everything is connected." },
    { Icon: Zap, delay: 1.1, quote: "Impact over activity." }
];

export default function LandingHeader() {
    const [activeQuote, setActiveQuote] = useState<string | null>(null);

    return (
        <header className="fixed top-0 left-0 w-full z-[100] flex flex-col items-center pt-8 pointer-events-none">
            <div className="flex w-full justify-between items-center max-w-7xl px-16 lg:px-24">
                {icons.map((item, i) => (
                    <FloatingIcon
                        key={i}
                        item={item}
                        onClick={() => setActiveQuote(activeQuote === item.quote ? null : item.quote)}
                    />
                ))}
            </div>

            <div className="h-12 mt-4 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {activeQuote && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-acid-green/60 text-[11px] uppercase tracking-[0.4em] font-bold"
                        >
                            {activeQuote}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

function FloatingIcon({ item, onClick }: { item: any, onClick: () => void }) {
    const { Icon, delay } = item;
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

    const waveX = useTransform(time, (t) => Math.sin(t + delay * 5) * 6);
    const waveY = useTransform(time, (t) => Math.cos(t * 0.7 + delay * 3) * 5);

    return (
        <motion.div
            style={{ x: waveX, y: waveY }}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className="relative group p-3 rounded-full hover:bg-white/5 transition-all duration-500 pointer-events-auto cursor-pointer"
        >
            <Icon
                size={22} // Increased by ~20% (from 18)
                strokeWidth={1.2}
                className="text-white/20 group-hover:text-acid-green transition-colors duration-500"
            />
        </motion.div>
    );
}
