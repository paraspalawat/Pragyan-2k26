import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import {
  Zap, Trophy, Users, Target, ArrowRight, Dumbbell, Flame,
} from "lucide-react";
import EventCard from "./EventCard";
import { useEventCounts } from "@/hooks/useEventCounts";

const events = [
  { icon: Zap, title: "100m Race (Boys & Girls)", fee: "₹50" },
  { icon: Zap, title: "200m Race (Boys & Girls)", fee: "₹50" },
  { icon: Flame, title: "400m Race", fee: "₹50" },
  { icon: ArrowRight, title: "Relay 4×100", fee: "₹200" },
  { icon: Users, title: "Kabaddi", fee: "₹400" },
  { icon: Trophy, title: "Volleyball", fee: "₹400" },
  { icon: Dumbbell, title: "Tug of War (Boys & Girls)", fee: "₹400" },
  { icon: Target, title: "Disc Throw", fee: "₹50" },
];

const SportsDay = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const counts = useEventCounts();

  return (
    <section id="sports" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-sm tracking-widest uppercase text-secondary mb-2 block">
            27 February 2026
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold gradient-text mb-3">
            🏆 Day 1 — Sports Day
          </h2>
          <p className="text-muted-foreground">Compete. Conquer. Celebrate.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {events.map((e, i) => (
            <EventCard
              key={e.title}
              icon={e.icon}
              title={e.title}
              fee={`${e.fee} Registration`}
              delay={0.1 + i * 0.08}
              inView={inView}
              accentColor="blue"
              registrationCount={counts[e.title] || 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsDay;
