import { motion } from "framer-motion";
import { Flame, Headphones, MapPin, CalendarDays } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import ParticleBackground from "./ParticleBackground";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

      <ParticleBackground />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4"
        >
          Feel The Vibe. Live The Moment.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-black gradient-text mb-4 leading-tight"
        >
          PRAGYAN
          <br />
          2K26
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-foreground/80 mb-2 font-light"
        >
          Two Days. Unlimited Energy. Infinite Memories.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-8"
        >
          <span className="flex items-center gap-1.5">
            <CalendarDays size={16} className="text-primary" /> 27–28 February 2026
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={16} className="text-accent" /> Eshan College of Engineering
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("register")}
            className="btn-glow px-8 py-4 rounded-xl text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2"
          >
            <Flame size={20} /> Register Now
          </button>
          <button
            onClick={() => scrollTo("dj")}
            className="btn-glow-blue px-8 py-4 rounded-xl text-secondary-foreground font-semibold text-lg flex items-center justify-center gap-2"
          >
            <Headphones size={20} /> Explore DJ Night
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
