import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/src/lib/utils";

const steps = [
  {
    id: "01",
    title: "Strategy",
    desc: "We define the digital roadmap, analyzing market trends and user behavior to ensure every pixel serves a purpose.",
    color: "from-blue-500/20",
  },
  {
    id: "02",
    title: "Design",
    desc: "Our designers craft high-fidelity interfaces that blend kinetic motion with minimalist aesthetics.",
    color: "from-purple-500/20",
  },
  {
    id: "03",
    title: "Launch",
    desc: "We deploy high-performance codebases, optimized for scale, SEO, and flawless user interaction.",
    color: "from-kinetia-accent/20",
  },
];

export default function Process() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section id="process" ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Dynamic Background Overlay */}
      <motion.div 
        style={{ opacity: backgroundOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-kinetia-accent/5 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <span className="text-kinetia-glow font-geist text-xs tracking-widest uppercase mb-4 block">How we work</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-geist">
            THE <span className="italic">KINETIC</span> PROCESS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] group hover:border-white/20 transition-colors duration-500"
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl -z-10", step.color)} />
      
      <span className="text-5xl font-bold font-geist text-white/5 mb-8 block group-hover:text-kinetia-glow/20 transition-colors">
        {step.id}
      </span>
      
      <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-500">
        {step.title}
      </h3>
      
      <p className="text-white/40 text-sm leading-relaxed">
        {step.desc}
      </p>

      <div className="mt-8 overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] w-full bg-gradient-to-r from-kinetia-glow to-transparent"
        />
      </div>
    </motion.div>
  );
}
