import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Bus, Coffee, Trophy, Award } from "lucide-react";

const facilities = [
  {
    icon: Bus,
    title: "Bus Facility",
    description: "Transport support for all participants to and from the venue.",
  },
  {
    icon: Coffee,
    title: "Refreshments",
    description: "Snacks & water will be provided to all participants.",
  },
  {
    icon: Trophy,
    title: "Exciting Cash Prizes",
    description: "Attractive cash rewards for winners across all events.",
  },
  {
    icon: Award,
    title: "Certificates for All",
    description: "Every participant receives an official certificate of participation.",
  },
];

const FacilitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold gradient-text mb-3">
            🎁 Facilities for Participants
          </h2>
          <p className="text-muted-foreground">We've got you covered.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {facilities.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
