import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Project Alpha",
    category: "Web Experience",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Project Beta",
    category: "Digital Product",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Project Gamma",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <span className="text-kinetia-glow font-geist text-xs tracking-widest uppercase mb-4 block">Selected Work</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-geist">
            FEATURED <span className="italic">PROJECTS.</span>
          </h2>
        </div>
        <button className="text-sm font-medium border-b border-white/20 pb-1 hover:border-kinetia-glow transition-colors">
          View All Work
        </button>
      </div>

      <div className="flex flex-col gap-32">
        {projects.map((project, index) => (
          <ProjectItem key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: typeof projects[0]; index: number }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
    >
      <div className="w-full md:w-3/5 overflow-hidden rounded-3xl aspect-[16/10] relative group">
        <motion.img
          style={{ y, scale: 1.1 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full glass flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
            <ArrowUpRight className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/5">
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-geist text-white/30 uppercase tracking-[0.3em] mb-4 block">
            {project.category}
          </span>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
            {project.title}
          </h3>
          <p className="text-white/50 leading-relaxed mb-8">
            A deep dive into how we transformed their digital presence through 
            kinetic design and high-performance engineering.
          </p>
          <button className="px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500 text-sm font-bold">
            Case Study
          </button>
        </motion.div>
      </div>
    </div>
  );
}
