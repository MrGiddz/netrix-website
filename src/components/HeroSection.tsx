import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveIconKey, resolveHeroImageSource } from "@/lib/site-content";
import { useSiteContent } from "@/providers/site-content-provider";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 } as never,
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

const trustBadgeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 } as never,
  },
};

const trustItemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HeroSection = () => {
  const { content } = useSiteContent();
  const hero = content.hero;
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={resolveHeroImageSource(hero)}
          alt="Solar panel installation by Netrix Systems"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 hero-overlay" />
      </motion.div>

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="container mx-auto px-4 lg:px-8 relative z-10 pt-20"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.span
            variants={badgeVariants}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-heading font-semibold tracking-widest uppercase bg-accent text-accent-foreground rounded-full"
          >
            {hero.badge}
          </motion.span>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-800 leading-tight text-primary-foreground mb-6"
          >
            {hero.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-primary-foreground/80 mb-8 max-w-lg font-body"
          >
            {hero.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a href={hero.primaryCtaHref}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-heading font-semibold"
                >
                  {hero.primaryCtaLabel}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Button>
              </motion.div>
            </a>
            <a href={hero.secondaryCtaHref}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 text-base font-heading"
                >
                  {hero.secondaryCtaLabel}
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={trustBadgeVariants}
            className="flex flex-wrap gap-8 mt-12"
          >
            {hero.trustBadges.map((badge, index) => {
              const Icon = resolveIconKey(index === 0 ? "shield" : "zap");
              return (
                <motion.div
                  key={badge}
                  variants={trustItemVariants}
                  className="flex items-center gap-3 text-primary-foreground/70"
                >
                  <Icon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">{badge}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
