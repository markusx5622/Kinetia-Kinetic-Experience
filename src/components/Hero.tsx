import { motion, useScroll, useTransform } from "motion/react";
import MagneticButton from "./ui/MagneticButton";
import TextReveal from "./ui/TextReveal";
import { fadeUp } from "@/src/lib/animations";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-kinetia-900">
        <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[150px] animate-mesh-gradient bg-hero-glow gpu-accelerated rounded-full" />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="z-10 text-center px-4 w-full max-w-5xl"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-block text-kinetia-glow font-geist text-sm tracking-[0.3em] uppercase mb-6"
        >
          Experience Architecture 2026
        </motion.span>
        
        <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.9] tracking-tighter font-geist mb-8 flex flex-col items-center">
          <TextReveal text="CRAFTING" />
          <TextReveal 
            text="DIGITAL KINETICS." 
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 font-light mb-12"
        >
          We merge high-performance engineering with avant-garde design to create 
          web experiences that move with purpose and precision.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
        >
          <MagneticButton className="px-10 py-5 text-lg">
            View Showreel
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-geist">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
