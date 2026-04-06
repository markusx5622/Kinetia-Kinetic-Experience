import * as React from "react";
import { motion } from "motion/react";

export default function TextReveal({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string 
}) {
  const words = text.split(" ");
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {}
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-2">
          <motion.span
            variants={{
              hidden: { y: "120%", opacity: 0, rotateZ: 5 },
              visible: { 
                y: 0, 
                opacity: 1, 
                rotateZ: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
              }
            }}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
