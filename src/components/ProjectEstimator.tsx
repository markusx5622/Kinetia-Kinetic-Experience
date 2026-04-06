import * as React from "react";
import { motion, useSpring, useTransform } from "motion/react";

export default function ProjectEstimator({ onOpenStartProject }: { onOpenStartProject: () => void }) {
  const [complexity, setComplexity] = React.useState(50);
  const [pages, setPages] = React.useState(5);
  
  const baseRate = 5000;
  const calculatedCost = baseRate + (complexity * 150) + (pages * 800);

  // Smooth spring animation for the number
  const springCost = useSpring(calculatedCost, { stiffness: 40, damping: 20 });
  
  // Transform the raw number into a formatted currency string
  const displayCost = useTransform(springCost, (latest) => 
    `$${Math.round(latest).toLocaleString()}`
  );

  return (
    <section className="py-32 px-4 max-w-6xl mx-auto">
      <div className="glass rounded-[3rem] p-8 md:p-20 relative overflow-hidden border border-white/10">
        {/* Animated Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-kinetia-accent/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-kinetia-glow/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
            INTERACTIVE <span className="italic text-kinetia-glow">ESTIMATOR.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-16">
              {/* Slider 1 */}
              <div className="space-y-6">
                <div className="flex justify-between text-sm font-geist text-white/60 uppercase tracking-widest">
                  <span>Design & Animation Complexity</span>
                  <span className="text-white">{complexity}%</span>
                </div>
                <div className="relative pt-2">
                  <input 
                    type="range" min="0" max="100" value={complexity} 
                    onChange={(e) => setComplexity(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer relative z-10"
                    style={{
                      background: `linear-gradient(to right, #4F46E5 ${complexity}%, rgba(255,255,255,0.1) ${complexity}%)`
                    }}
                  />
                  {/* Custom Thumb Style via CSS isn't fully cross-browser without complex CSS, 
                      so we use inline background trick for the track fill */}
                </div>
              </div>

              {/* Slider 2 */}
              <div className="space-y-6">
                <div className="flex justify-between text-sm font-geist text-white/60 uppercase tracking-widest">
                  <span>Scale (Views / Pages)</span>
                  <span className="text-white">{pages}</span>
                </div>
                <div className="relative pt-2">
                  <input 
                    type="range" min="1" max="50" value={pages} 
                    onChange={(e) => setPages(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer relative z-10"
                    style={{
                      background: `linear-gradient(to right, #4F46E5 ${(pages/50)*100}%, rgba(255,255,255,0.1) ${(pages/50)*100}%)`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0 lg:pl-20">
              <span className="text-sm font-geist text-white/50 uppercase tracking-widest mb-6">Estimated Investment</span>
              <motion.div className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8">
                {displayCost}
              </motion.div>
              <p className="text-white/40 text-sm max-w-xs lg:text-right mb-10">
                *This is a dynamic estimate based on standard rates. Final scope requires a discovery phase.
              </p>
              <button 
                onClick={onOpenStartProject}
                className="px-10 py-5 rounded-full bg-white text-black font-bold hover:scale-105 hover:bg-kinetia-glow hover:text-white transition-all duration-300"
              >
                Request Detailed Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
