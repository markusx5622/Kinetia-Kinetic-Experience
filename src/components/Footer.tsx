import { motion } from "motion/react";
import { Send, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="pt-32 pb-12 px-4 bg-kinetia-800/30 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Contact Form UI */}
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-geist mb-8">
              LET'S <span className="text-kinetia-glow italic">CONNECT.</span>
            </h2>
            <p className="text-white/50 mb-12 max-w-md">
              Have a project in mind? We'd love to hear from you. Let's build 
              something extraordinary together.
            </p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-geist">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-kinetia-glow outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-geist">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-kinetia-glow outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/30 font-geist">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-kinetia-glow outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button className="w-full py-4 rounded-xl bg-kinetia-accent hover:bg-kinetia-glow text-white font-bold transition-colors flex items-center justify-center gap-2 group">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-12 lg:pl-20">
            <div className="space-y-6">
              <h4 className="text-xs font-geist uppercase tracking-[0.3em] text-white/30">Sitemap</h4>
              <ul className="space-y-4">
                {["Services", "Process", "Work", "About", "Careers"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors hover:translate-x-2 inline-block duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-geist uppercase tracking-[0.3em] text-white/30">Connect</h4>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Github, label: "GitHub" },
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href="#" 
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                  >
                    <social.icon className="w-4 h-4 group-hover:scale-125 transition-transform" />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="text-2xl font-bold font-geist tracking-tighter">KINETIA.</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/20">
            © 2026 Kinetic Ultra-LTD. All rights reserved.
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
