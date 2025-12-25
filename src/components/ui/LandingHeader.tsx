'use client';

import { motion, useMotionValue, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import {
    Microscope,
    ScrollText,
    Laptop,
    Sparkles,
    Scale,
    Eye,
    Activity,
    Workflow,
    Layers,
    Box,
    Globe,
    Zap,
    Home,
    User,
    Briefcase,
    Mail
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const icons = [
    { label: "Biological Logic", Icon: Microscope, quote: "Biology is just complex systems." },
    { label: "Inherent Rigor", Icon: ScrollText, quote: "Rigor is the floor, not the ceiling." },
    { label: "Computational Form", Icon: Laptop, quote: "Code is the secondary language." },
    { label: "Cognitive Resonance", Icon: Sparkles, quote: "Thinking is the primary work." },
    { label: "Systemic Equilibrium", Icon: Scale, quote: "Trade-offs are inevitable." },
    { label: "Optic Foresight", Icon: Eye, quote: "Perspective is a choice." },
    { label: "Kinetic Vitality", Icon: Activity, quote: "Motion isn't always progress." },
    { label: "Algorithmic Intent", Icon: Workflow, quote: "Systems should serve intent." },
    { label: "Atomic Abstraction", Icon: Layers, quote: "Peeling back the abstraction." },
    { label: "Pure Predicates", Icon: Box, quote: "What's outside the frame?" },
    { label: "Universal Grafting", Icon: Globe, quote: "Everything is connected." },
    { label: "Impact Vector", Icon: Zap, quote: "Impact over activity." }
];

const sideNavItems = [
    { Icon: Home, label: "Home", href: "/" },
    { Icon: User, label: "About", href: "/about" },
    { Icon: Briefcase, label: "Work", href: "#work" },
    { Icon: Mail, label: "Contact", href: "#contact" },
];

export default function LandingHeader() {
    const [activeQuote, setActiveQuote] = useState<string | null>(null);
    const [rippleOrigin, setRippleOrigin] = useState({ x: 0, y: 0 });
    const [showRipple, setShowRipple] = useState(false);

    return (
        <>
            {/* INDEPENDENT SIDE NAVIGATION PANEL */}
            <motion.nav
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-6 top-1/2 -translate-y-1/2 z-[110] flex flex-col gap-4 pointer-events-auto"
            >
                <div className="p-2.5 rounded-3xl bg-gradient-to-br from-white/[0.08] via-[#60A5FA]/[0.05] to-[#2EE6D6]/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-3.5">
                    {sideNavItems.map((item, i) => (
                        <SideNavItem key={i} item={item} index={i} />
                    ))}
                </div>
            </motion.nav>

            {/* ULTRA-COMPACT TOP HEADER PANEL */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
            >
                <div className="relative w-full pointer-events-auto">
                    {/* Razor-Thin Glass Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-[#60A5FA]/[0.05] to-[#2EE6D6]/[0.03] backdrop-blur-xl border-b border-white/10 shadow-lg" />

                    {/* Ultra-Compact Container (py-1.5) */}
                    <div className="relative flex items-center justify-between px-10 py-1.5 max-w-[100vw]">
                        {icons.map((item, i) => (
                            <FloatingIcon
                                key={i}
                                item={item}
                                index={i}
                                onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setRippleOrigin({
                                        x: rect.left + rect.width / 2,
                                        y: rect.top + rect.height / 2
                                    });
                                    setShowRipple(true);
                                    setTimeout(() => setShowRipple(false), 600);
                                    setActiveQuote(activeQuote === item.quote ? null : item.quote);
                                }}
                            />
                        ))}
                    </div>

                    {/* Ripple Effect Container */}
                    <AnimatePresence>
                        {showRipple && (
                            <motion.div
                                className="fixed pointer-events-none z-[101]"
                                style={{
                                    left: rippleOrigin.x,
                                    top: rippleOrigin.y,
                                    transform: 'translate(-50%, -50%)'
                                }}
                                initial={{ scale: 0, opacity: 0.6 }}
                                animate={{ scale: 3, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2EE6D6] to-[#60A5FA] blur-xl" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.header>

            {/* THIN GLASSMORPHIC FOOTER PANEL */}
            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-0 left-0 right-0 z-[100] h-8 pointer-events-none flex justify-center items-center px-8"
            >
                <div className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-auto">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-t border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]" />
                    <AnimatePresence mode="wait">
                        {activeQuote && (
                            <motion.div
                                key={activeQuote}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative flex items-center justify-center w-full"
                            >
                                <span className="text-center text-transparent bg-clip-text bg-gradient-to-r from-[#2EE6D6] via-[#60A5FA] to-[#A78BFA] text-[9px] uppercase tracking-[0.6em] font-medium">
                                    {activeQuote}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.footer>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </>
    );
}

function FloatingIcon({ item, index, onClick }: { item: any, index: number, onClick: (e: React.MouseEvent<HTMLDivElement>) => void }) {
    const { Icon, label } = item;
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
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

    // REDUCED FLOATING MOVEMENT (Subtle elegance)
    const waveY = useTransform(time, (t) => Math.sin(t * 1.0 + index * 0.4) * 3);
    const waveX = useTransform(time, (t) => Math.cos(t * 0.6 + index * 0.3) * 1.5);

    const springConfig = { damping: 12, stiffness: 250 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.55);
        mouseY.set((e.clientY - centerY) * 0.55);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ x: waveX, y: waveY }}
            transition={{ delay: index * 0.03, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="group relative cursor-pointer p-1.5"
        >
            <motion.div
                style={{ x, y }}
                className="relative z-10 w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.02] border border-white/5 group-hover:border-[#2EE6D6]/70 group-hover:bg-white/[0.1] transition-all duration-300 shadow-xl"
            >
                <Icon size={16} className="text-white/30 group-hover:text-[#2EE6D6] transition-colors duration-300 group-hover:scale-125" />
            </motion.div>

            {/* ENHANCED POETIC TOOLTIP */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded bg-black/90 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[120] shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                <span className="text-[8px] uppercase tracking-[0.3em] text-[#2EE6D6] font-bold italic">{label}</span>
            </div>

            {/* CORE GLOW */}
            <div className="absolute inset-0 bg-[#2EE6D6]/0 group-hover:bg-[#2EE6D6]/30 blur-2xl transition-all duration-500 rounded-full scale-50 group-hover:scale-150 pointer-events-none" />
        </motion.div>
    );
}

function SideNavItem({ item, index }: { item: any, index: number }) {
    const { Icon, label, href } = item;
    return (
        <motion.a
            href={href}
            whileHover={{ scale: 1.15, x: 8 }}
            whileTap={{ scale: 0.9 }}
            className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#60A5FA]/80 hover:bg-white/[0.08] transition-all duration-300 shadow-2xl"
        >
            <Icon size={18} className="text-white/20 group-hover:text-[#60A5FA] transition-colors duration-300" />

            <div className="absolute left-14 px-3 py-1.5 rounded-md bg-black/90 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                <span className="text-[9px] uppercase tracking-[0.4em] text-[#60A5FA] font-bold">{label}</span>
            </div>

            <div className="absolute inset-0 bg-[#60A5FA]/0 group-hover:bg-[#60A5FA]/20 blur-xl transition-all duration-500 rounded-xl scale-0 group-hover:scale-100 pointer-events-none" />
        </motion.a>
    );
}
