'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import LandingHeader from '@/components/ui/LandingHeader';
import InteractiveArtifact from '@/components/ui/InteractiveArtifact';
import DecisionECG from '@/components/ui/DecisionECG';
import HorizontalCarousel from '@/components/ui/HorizontalCarousel';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

const AntigravityField = dynamic(() => import('@/components/canvas/AntigravityField'), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#08090A] w-full h-screen" />;

  return (
    <main className="relative w-full bg-[#08090A] selection:bg-[#2EE6D6]/30 overflow-hidden">

      {/* FIXED DEPTH LAYERS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AntigravityField />
      </div>

      <LandingHeader />

      <div className="section-wrapper relative z-10" ref={containerRef}>

        {/* ACT 0: ARRIVAL */}
        <section className="snap-section max-w-7xl mx-auto px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="narrative-glass"
            >
              <div className="flex flex-col gap-8 items-start">
                <div className="flex flex-col gap-2">
                  <h1 className="text-identity text-5xl lg:text-6xl italic">
                    Utkarsh Bansal
                  </h1>
                  <div className="h-px w-8 bg-white/5 my-2" />
                  <p className="text-designation uppercase tracking-[0.3em]">
                    Business Consultant & Product Owner
                  </p>
                </div>

                <p className="text-explanation max-w-2xl">
                  You’re entering a space about how <span className="text-accent">decisions get made</span> before clarity exists.
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="flex items-center gap-4 group cursor-pointer pt-6"
                  onClick={() => {
                    containerRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                  }}
                >
                  <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#2EE6D6]/40 transition-colors">
                    <ArrowDown size={14} className="text-white/30 group-hover:text-[#2EE6D6] transition-colors" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold group-hover:text-white transition-colors">Begin Scroll</span>
                </motion.div>
              </div>
            </motion.div>

            {/* INTRO VIDEO PLACEHOLDER */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-video rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden group cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex flex-col items-center gap-4 text-center px-8">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#2EE6D6]/30 group-hover:scale-110 transition-all duration-700">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white/20 border-b-[8px] border-b-transparent ml-1 group-hover:border-l-[#2EE6D6] transition-colors" />
                </div>
                <div>
                  <div className="text-identity text-sm italic opacity-40 group-hover:opacity-80 transition-opacity">Introduction</div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold mt-1">Video Placeholder</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ACT 1: REACTIVE EXPERIENCE (CARDS) */}
        <HorizontalCarousel />

        {/* ACT 2: IDENTITY */}
        <section className="snap-section max-w-7xl mx-auto px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="narrative-glass w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="flex flex-col items-start gap-8">
                <div className="portrait-frame relative overflow-hidden">
                  <Image
                    src="/portrait.png"
                    alt="Utkarsh Bansal"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <div className="text-[#6B7280] text-[13px] font-medium tracking-wide italic font-instrument">
                  Grounding the work in responsibility.
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <p className="text-explanation">
                  I work across the intersection of
                  <span className="text-white mx-1.5 font-medium underline underline-offset-[12px] decoration-white/5">Business</span>,
                  <span className="text-white mx-1.5 font-medium underline underline-offset-[12px] decoration-white/5">Product</span>,
                  and
                  <span className="text-white mx-1.5 font-medium underline underline-offset-[12px] decoration-white/5">Systems</span>.
                </p>
                <div className="h-px w-10 bg-white/5" />
                <p className="text-explanation italic opacity-80">
                  My approach is built for ambiguity. I focus on clarifying the problem space before committing to the solution set. I work with leaders who demand rigor over noise.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ACT 3: CORE METAPHOR (ECG) */}
        <section className="snap-section max-w-7xl mx-auto px-16 lg:px-24 overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="narrative-glass w-full py-24"
          >
            <div className="w-full h-80 relative pointer-events-auto">
              <DecisionECG />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-identity text-center italic text-lg mt-16 opacity-40"
            >
              This single curve maps how judgment evolves over time.
            </motion.div>
          </motion.div>
        </section>

        {/* ACT 4: INVITATION */}
        <section className="snap-section max-w-7xl mx-auto px-16 lg:px-24 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-20">
            <InteractiveArtifact
              index={0}
              isBiased
              title="How I think"
              hoverText="Explore the deep decision system."
            />
            <InteractiveArtifact
              index={1}
              title="The short version"
              hoverText="A compressed view of the professional journey."
            />
            <InteractiveArtifact
              index={2}
              title="Current work"
              hoverText="The problems I'm solving right now."
            />
            <InteractiveArtifact
              index={3}
              title="Why this exists"
              hoverText="The philosophy behind the deliberate build."
            />
          </div>

          <div className="mt-32 pt-12 border-t border-white/5 flex justify-between items-center opacity-30 px-4">
            <div className="text-identity text-sm italic">Utkarsh Bansal</div>
            <div className="text-designation uppercase tracking-[0.8em] font-bold">Synthesis · Systems</div>
          </div>
        </section>

      </div>
    </main>
  );
}
