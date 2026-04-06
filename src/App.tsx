import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import SmoothScroll from "./components/ui/SmoothScroll";
import CustomCursor from "./components/ui/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import HorizontalScroll from "./components/HorizontalScroll";
import Process from "./components/Process";
import Projects from "./components/Projects";
import TeamReveal from "./components/TeamReveal";
import ProjectEstimator from "./components/ProjectEstimator";
import Footer from "./components/Footer";
import StartProjectModal from "./components/StartProjectModal";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isStartProjectOpen, setIsStartProjectOpen] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading for entry animation
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <div className="hide-cursor">
        <CustomCursor />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
              className="fixed inset-0 z-[100] bg-kinetia-900 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold font-geist tracking-tighter mb-4"
              >
                KINETIA<span className="animate-pulse text-kinetia-glow">.</span>
              </motion.div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
                className="h-[2px] bg-kinetia-glow"
              />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Navbar onOpenStartProject={() => setIsStartProjectOpen(true)} />
              <Hero />
              <BentoGrid />
              <HorizontalScroll />
              <Process />
              <Projects />
              <TeamReveal />
              <ProjectEstimator onOpenStartProject={() => setIsStartProjectOpen(true)} />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        <StartProjectModal 
          isOpen={isStartProjectOpen} 
          onClose={() => setIsStartProjectOpen(false)} 
        />
      </div>
    </SmoothScroll>
  );
}
