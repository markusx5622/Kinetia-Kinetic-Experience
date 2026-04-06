import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";

const cards = [
  { id: 1, title: "DISCOVER", text: "Unearthing the core truth of your brand through deep market analysis and user research." },
  { id: 2, title: "DEFINE", text: "Structuring the chaos into a clear, actionable digital roadmap and architecture." },
  { id: 3, title: "DESIGN", text: "Crafting visual languages and kinetic interfaces that resonate on a visceral level." },
  { id: 4, title: "DEVELOP", text: "Engineering robust, scalable architectures using the bleeding edge of web technology." },
  { id: 5, title: "DEPLOY", text: "Launching into the digital stratosphere with zero-downtime CI/CD pipelines." },
];

export default function HorizontalScroll() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Moves the cards horizontally based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-kinetia-900">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-kinetia-900 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-kinetia-900 to-transparent z-10" />
        
        <motion.div style={{ x }} className="flex gap-8 px-4 md:px-32">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="w-[85vw] md:w-[45vw] h-[60vh] flex-shrink-0 glass rounded-3xl p-8 md:p-16 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-kinetia-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex justify-between items-start">
                <span className="text-kinetia-glow font-geist text-2xl md:text-4xl font-light">
                  0{card.id}
                </span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="w-2 h-2 bg-kinetia-glow rounded-full animate-pulse" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 group-hover:translate-x-4 transition-transform duration-500">
                  {card.title}
                </h3>
                <p className="text-lg md:text-2xl text-white/50 max-w-md group-hover:text-white/80 transition-colors duration-500">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
