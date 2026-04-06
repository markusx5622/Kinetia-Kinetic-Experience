import * as React from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { X, ArrowRight, Check } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import { cn } from "@/src/lib/utils";

type Step = 1 | 2 | 3 | 4;

export default function StartProjectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = React.useState<Step>(1);
  const [formData, setFormData] = React.useState({
    services: [] as string[],
    budget: "",
    name: "",
    email: "",
    details: "",
  });

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset form after close animation
      setTimeout(() => {
        setStep(1);
        setFormData({ services: [], budget: "", name: "", email: "", details: "" });
      }, 500);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4) as Step);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1) as Step);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, type: "spring" as const, bounce: 0.2 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const [direction, setDirection] = React.useState(1);

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-kinetia-900/80 backdrop-blur-2xl p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl h-[80vh] max-h-[800px] glass rounded-[2rem] border border-white/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <span className="font-geist text-sm tracking-widest uppercase text-white/50">
                {step < 4 ? `Step 0${step} / 03` : "Status"}
              </span>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:rotate-90 transition-all duration-300"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/5">
              <motion.div
                className="h-full bg-kinetia-glow"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden p-8 md:p-16">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="h-full flex flex-col"
                  >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                      What can we help you with?
                    </h2>
                    <p className="text-white/50 mb-12">Select all that apply.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Web Experience", "Brand Identity", "3D & Motion", "Digital Product", "E-Commerce", "Other"].map((service) => {
                        const isSelected = formData.services.includes(service);
                        return (
                          <button
                            key={service}
                            onClick={() => toggleService(service)}
                            className={cn(
                              "p-6 rounded-2xl border text-left transition-all duration-300 flex justify-between items-center group",
                              isSelected 
                                ? "border-kinetia-glow bg-kinetia-glow/10 text-white" 
                                : "border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:bg-white/10"
                            )}
                          >
                            <span className="text-lg font-medium">{service}</span>
                            <div className={cn(
                              "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                              isSelected ? "border-kinetia-glow bg-kinetia-glow" : "border-white/20 group-hover:border-white/50"
                            )}>
                              {isSelected && <Check className="w-4 h-4 text-black" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="h-full flex flex-col"
                  >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                      What's your anticipated budget?
                    </h2>
                    <p className="text-white/50 mb-12">This helps us tailor our approach.</p>
                    
                    <div className="flex flex-col gap-4">
                      {["< $10k", "$10k - $25k", "$25k - $50k", "$50k+"].map((budget) => {
                        const isSelected = formData.budget === budget;
                        return (
                          <button
                            key={budget}
                            onClick={() => setFormData({ ...formData, budget })}
                            className={cn(
                              "p-6 rounded-2xl border text-left transition-all duration-300 flex justify-between items-center group",
                              isSelected 
                                ? "border-kinetia-glow bg-kinetia-glow/10 text-white" 
                                : "border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:bg-white/10"
                            )}
                          >
                            <span className="text-xl font-medium">{budget}</span>
                            <div className={cn(
                              "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                              isSelected ? "border-kinetia-glow bg-kinetia-glow" : "border-white/20 group-hover:border-white/50"
                            )}>
                              {isSelected && <Check className="w-4 h-4 text-black" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="h-full flex flex-col"
                  >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                      Tell us about yourself.
                    </h2>
                    <p className="text-white/50 mb-12">How can we reach you?</p>
                    
                    <div className="space-y-6 flex-1 overflow-y-auto pr-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/30 font-geist">Name</label>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-kinetia-glow outline-none transition-colors text-white"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/30 font-geist">Email</label>
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-kinetia-glow outline-none transition-colors text-white"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-geist">Project Details</label>
                        <textarea 
                          rows={4}
                          value={formData.details}
                          onChange={(e) => setFormData({...formData, details: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-kinetia-glow outline-none transition-colors resize-none text-white"
                          placeholder="Briefly describe your goals..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                      className="w-24 h-24 rounded-full bg-kinetia-glow/20 flex items-center justify-center mb-8"
                    >
                      <Check className="w-12 h-12 text-kinetia-glow" />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                      REQUEST <span className="italic text-kinetia-glow">RECEIVED.</span>
                    </h2>
                    <p className="text-white/50 max-w-md mx-auto mb-12">
                      Thank you, {formData.name || "there"}. Our team will review your requirements and get back to you within 24 hours.
                    </p>
                    <MagneticButton className="px-8 py-4" onClick={onClose}>
                      Return to Site
                    </MagneticButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            {step < 4 && (
              <div className="p-8 border-t border-white/5 flex justify-between items-center bg-black/20">
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={cn(
                    "text-sm font-bold font-geist tracking-widest uppercase transition-opacity",
                    step === 1 ? "opacity-0 pointer-events-none" : "opacity-50 hover:opacity-100"
                  )}
                >
                  Back
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && formData.services.length === 0) ||
                    (step === 2 && !formData.budget) ||
                    (step === 3 && (!formData.name || !formData.email))
                  }
                  className="px-8 py-4 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {step === 3 ? "Submit Request" : "Continue"}
                  {step < 3 && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
