import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Headphones, Ticket, Music } from "lucide-react";
import djBg from "@/assets/dj-bg.jpg";

const DJNightSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dj" className="relative overflow-hidden" ref={ref}>
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${djBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

      {/* Animated orbs */}
      <motion.div
        animate={{ x: [0, 50, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -40, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-[100px]"
      />

      <div className="relative z-10 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center neon-glow"
              >
                <Headphones size={40} className="text-primary" />
              </motion.div>
            </div>

            <h2 className="text-4xl md:text-6xl font-heading font-black gradient-text mb-4">
              🎧 DJ Night
            </h2>
            <p className="text-xl md:text-2xl font-heading font-semibold text-foreground/90 mb-2">
              The Grand Finale
            </p>
            <p className="text-muted-foreground mb-2">28 February 2026</p>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <span className="px-6 py-2 rounded-full glass text-lg font-bold gradient-text tracking-wider flex items-center gap-2">
                <Ticket size={18} /> FREE FOR ALL
              </span>
            </motion.div>

            <p className="text-foreground/70 mb-8 max-w-lg mx-auto">
              Get ready for the most electrifying night of the fest! High-energy beats, 
              stunning lights, and non-stop dancing. Don't miss the grand finale!
            </p>

            <button className="btn-glow px-10 py-4 rounded-xl text-primary-foreground font-semibold text-lg inline-flex items-center gap-2">
              <Music size={20} /> Join The DJ Night
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DJNightSection;
