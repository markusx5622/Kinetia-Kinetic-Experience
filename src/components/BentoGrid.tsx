import * as React from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Layers, 
  Cpu, 
  Globe, 
  Smartphone, 
  Code2 
} from "lucide-react";
import BentoCard from "./ui/BentoCard";
import { fadeUp, staggerContainer } from "@/src/lib/animations";

const services = [
  {
    title: "High-Perf Web",
    desc: "Next-gen architectures optimized for speed and core web vitals.",
    icon: Zap,
    tech: "React 19",
    size: "md:col-span-2",
  },
  {
    title: "3D Experiences",
    desc: "Immersive WebGL and Three.js environments.",
    icon: Cpu,
    tech: "Three.js",
    size: "md:col-span-1",
  },
  {
    title: "UI/UX Design",
    desc: "Minimalist interfaces with maximalist impact.",
    icon: Layers,
    tech: "Figma",
    size: "md:col-span-1",
  },
  {
    title: "Mobile First",
    desc: "Responsive designs that feel native on every screen.",
    icon: Smartphone,
    tech: "PWA",
    size: "md:col-span-1",
  },
  {
    title: "Global Scale",
    desc: "Edge-ready applications for a worldwide audience.",
    icon: Globe,
    tech: "Vercel Edge",
    size: "md:col-span-1",
  },
  {
    title: "Clean Code",
    desc: "Maintainable, scalable, and type-safe codebases.",
    icon: Code2,
    tech: "TypeScript",
    size: "md:col-span-1",
  },
];

export default function BentoGrid() {
  return (
    <section id="services" className="py-32 px-4 max-w-7xl mx-auto">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={fadeUp} className="md:col-span-3 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-geist">
            OUR <span className="text-kinetia-glow italic">CAPABILITIES.</span>
          </h2>
        </motion.div>

        {services.map((service, index) => (
          <motion.div key={index} variants={fadeUp} className={service.size}>
            <BentoCard className="h-full flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-kinetia-accent transition-colors duration-500">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-geist uppercase tracking-widest text-white/40">
                  {service.tech}
                </span>
                <div className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-kinetia-glow transition-all duration-500" />
              </div>
            </BentoCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
