import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/providers/site-content-provider";

/* ── animated counter ── */
const AnimatedCounter = ({ value }: { value: string }) => {
  const match = value.match(/^(\d+)(\+?.*)$/);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || !match) return;
    const target = parseInt(match[1]);
    const duration = 1400;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(target);
    };
    requestAnimationFrame(step);
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {display}
      {match[2]}
    </span>
  );
};

/* ── variants ── */
const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } as never },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const statsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } as never },
};

const AboutSection = () => {
  const { content } = useSiteContent();
  const overview = content.about.overview;

  return (
    <section id="about" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-sm font-heading font-semibold tracking-widest uppercase text-accent"
            >
              About Us
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-heading font-800 text-foreground mt-3 mb-6">
              {overview.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {overview.description}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our mission is{" "}
              <strong className="text-foreground">"{overview.mission}"</strong>.
            </p>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-3"
            >
              {overview.highlights.map((h) => (
                <motion.li
                  key={h}
                  variants={listItemVariants}
                  className="flex items-center gap-3 text-foreground"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  </motion.span>
                  <span className="text-sm font-medium">{h}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right column — animated stat cards */}
          <motion.div
            variants={statsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-4"
          >
            {overview.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-secondary rounded-lg p-6 text-center border border-border/50 hover:border-accent/30 hover:shadow-lg transition-shadow cursor-default"
              >
                <div className="text-3xl font-heading font-800 text-gradient mb-1">
                  <AnimatedCounter value={stat.number} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
