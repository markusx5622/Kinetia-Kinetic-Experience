import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/src/lib/utils";

export default function Navbar({ onOpenStartProject }: { onOpenStartProject: () => void }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const navPadding = useTransform(scrollY, [0, 100], ["2rem", "1rem"]);

  return (
    <motion.nav
      style={{ width: navWidth, padding: navPadding }}
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-500",
        isScrolled ? "top-4 rounded-full glass px-8" : "px-12"
      )}
    >
      <div className="text-2xl font-bold tracking-tighter font-geist">KINETIA.</div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {["Services", "Process", "Work", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative group overflow-hidden"
          >
            <span className="block transition-transform duration-500 group-hover:-translate-y-full">
              {item}
            </span>
            <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-kinetia-glow">
              {item}
            </span>
          </a>
        ))}
      </div>

      <button 
        onClick={onOpenStartProject}
        className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform"
      >
        Start Project
      </button>
    </motion.nav>
  );
}
