import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Music, Users, Sparkles } from "lucide-react";

const features = [
  { icon: Trophy, title: "Sports", desc: "Day 1 brings intense athletic competition across 8+ events." },
  { icon: Music, title: "Cultural", desc: "Day 2 showcases dance, singing, drama, fashion & more." },
  { icon: Users, title: "Community", desc: "Bringing together students from every department." },
  { icon: Sparkles, title: "DJ Night", desc: "The grand finale — an electrifying free DJ night for all." },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold gradient-text mb-4">
            About Pragyan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Pragyan 2K26 is the annual cultural and sports fest of Eshan College of Engineering.
            A two-day celebration of talent, passion, competition, and entertainment bringing together 
            students from all departments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 text-center floating"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
