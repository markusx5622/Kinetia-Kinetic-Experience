import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const team = [
  { 
    name: "ALEX RIDER", 
    role: "Creative Director", 
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    name: "SAM TAYLOR", 
    role: "Lead Engineer", 
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    name: "JORDAN LEE", 
    role: "Motion Designer", 
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    name: "CASEY SMITH", 
    role: "UX Architect", 
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600" 
  },
];

export default function TeamReveal() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth cursor tracking
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      className="py-32 px-4 max-w-7xl mx-auto relative cursor-crosshair" 
      onMouseMove={handleMouseMove}
    >
      <div className="mb-20">
        <span className="text-kinetia-glow font-geist text-xs tracking-widest uppercase mb-4 block">The Collective</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-geist">
          OUR <span className="italic text-kinetia-glow">MINDS.</span>
        </h2>
      </div>

      <div className="relative border-t border-white/10">
        {team.map((member, i) => (
          <div 
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group border-b border-white/10 py-10 md:py-16 flex flex-col md:flex-row justify-between md:items-center hover:bg-white/[0.02] transition-colors px-4 md:px-8"
          >
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter group-hover:translate-x-8 transition-transform duration-500 text-white/80 group-hover:text-white">
              {member.name}
            </h3>
            <span className="text-kinetia-glow font-geist uppercase tracking-widest text-sm mt-4 md:mt-0 group-hover:-translate-x-8 transition-transform duration-500 opacity-50 group-hover:opacity-100">
              {member.role}
            </span>
          </div>
        ))}

        {/* Floating Image Reveal (Hidden on mobile for better UX) */}
        <motion.div
          className="absolute top-0 left-0 w-72 h-96 pointer-events-none overflow-hidden rounded-2xl z-50 hidden md:block shadow-2xl shadow-black/50"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: hoveredIndex !== null ? 1 : 0,
            scale: hoveredIndex !== null ? 1 : 0.5,
            rotate: hoveredIndex !== null ? (hoveredIndex % 2 === 0 ? 5 : -5) : 0,
          }}
          transition={{ 
            opacity: { duration: 0.3 }, 
            scale: { duration: 0.4, type: "spring" },
            rotate: { duration: 0.4 }
          }}
        >
          {team.map((member, i) => (
            <img 
              key={i}
              src={member.img}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ 
                opacity: hoveredIndex === i ? 1 : 0,
                transform: `scale(${hoveredIndex === i ? 1 : 1.2})`,
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              referrerPolicy="no-referrer"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
