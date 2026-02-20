import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface EventCardProps {
  icon: LucideIcon;
  title: string;
  fee: string;
  delay: number;
  inView: boolean;
  accentColor?: "purple" | "blue" | "pink";
  registrationCount?: number;
}

const accents = {
  purple: "neon-glow",
  blue: "neon-glow-blue",
  pink: "neon-glow-pink",
};

const EventCard = ({ icon: Icon, title, fee, delay, inView, accentColor = "purple", registrationCount = 0 }: EventCardProps) => {
  const [confetti, setConfetti] = useState(false);

  const handleRegister = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 1500);
    const el = document.getElementById("register");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="glass-card rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden group"
    >
      {/* Confetti burst */}
      {confetti && (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                scale: 0,
                opacity: 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ["#a855f7", "#3b82f6", "#ec4899", "#22c55e", "#eab308"][i % 5],
              }}
            />
          ))}
        </div>
      )}

      <div
        className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 transition-all group-hover:${accents[accentColor]}`}
      >
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-base mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-1">{fee}</p>
      {registrationCount > 0 && (
        <p className="text-xs text-primary mb-2">{registrationCount} registered</p>
      )}
      <button
        onClick={handleRegister}
        className="btn-glow px-5 py-2 rounded-lg text-primary-foreground text-sm font-medium w-full"
      >
        Register Now
      </button>
    </motion.div>
  );
};

export default EventCard;
