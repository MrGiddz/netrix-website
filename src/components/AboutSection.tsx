import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/providers/site-content-provider";

const AboutSection = () => {
  const { content } = useSiteContent();
  const overview = content.about.overview;

  return (
    <section id="about" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">About Us</span>
            <h2 className="text-3xl md:text-4xl font-heading font-800 text-foreground mt-3 mb-6">
              {overview.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {overview.description}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our mission is <strong className="text-foreground">"{overview.mission}"</strong>.
            </p>
            <ul className="space-y-3">
              {overview.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm font-medium">{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {overview.stats.map((stat) => (
              <div key={stat.label} className="bg-secondary rounded-lg p-6 text-center">
                <div className="text-3xl font-heading font-800 text-gradient mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
