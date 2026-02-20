import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-02-27T09:00:00").getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, TARGET_DATE - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 md:gap-5 justify-center">
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
          className="glass-card rounded-xl p-3 md:p-5 min-w-[70px] md:min-w-[90px] text-center"
        >
          <motion.span
            key={b.value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-2xl md:text-4xl font-heading font-bold gradient-text"
          >
            {String(b.value).padStart(2, "0")}
          </motion.span>
          <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest mt-1 block">
            {b.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
