import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import {
  Code, Drama, Mic, Music, PersonStanding, Shirt, Users, Palette, Sparkles, Heart,
} from "lucide-react";
import EventCard from "./EventCard";
import { useEventCounts } from "@/hooks/useEventCounts";

const events = [
  { icon: Code, title: "Coding Battle", fee: "₹50" },
  { icon: Drama, title: "Stage Play", fee: "₹50/member" },
  { icon: Mic, title: "Open Mic", fee: "₹50" },
  { icon: Music, title: "Solo Singing", fee: "₹50" },
  { icon: PersonStanding, title: "Solo Dance", fee: "₹50" },
  { icon: Shirt, title: "Fashion Show", fee: "₹50" },
  { icon: Users, title: "Group Singing", fee: "₹50/member" },
  { icon: Sparkles, title: "Group Dance", fee: "₹50/member" },
  { icon: Palette, title: "Poster Making", fee: "₹50" },
  { icon: Heart, title: "Mehendi Competition", fee: "₹50" },
];

const CulturalDay = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const counts = useEventCounts();

  return (
    <section id="cultural" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-sm tracking-widest uppercase text-accent mb-2 block">
            28 February 2026
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold gradient-text-warm mb-3">
            🎭 Day 2 — Cultural Day
          </h2>
          <p className="text-muted-foreground">Express. Perform. Shine.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {events.map((e, i) => (
            <EventCard
              key={e.title}
              icon={e.icon}
              title={e.title}
              fee={`${e.fee} Registration`}
              delay={0.1 + i * 0.06}
              inView={inView}
              accentColor="pink"
              registrationCount={counts[e.title] || 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalDay;
