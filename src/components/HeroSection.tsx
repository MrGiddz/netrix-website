import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveIconKey, resolveImageKey } from "@/lib/site-content";
import { useSiteContent } from "@/providers/site-content-provider";

const HeroSection = () => {
  const { content } = useSiteContent();
  const hero = content.hero;

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={resolveImageKey(hero.backgroundImageKey)}
          alt="Solar panel installation by Netrix Systems"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-heading font-semibold tracking-widest uppercase bg-accent text-accent-foreground rounded-full">
            {hero.badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-800 leading-tight text-primary-foreground mb-6">
            {hero.title}
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg font-body">
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={hero.primaryCtaHref}>
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-heading font-semibold">
                {hero.primaryCtaLabel} <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href={hero.secondaryCtaHref}>
              <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base font-heading">
                {hero.secondaryCtaLabel}
              </Button>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-8 mt-12">
            {hero.trustBadges.map((badge, index) => {
              const Icon = resolveIconKey(index === 0 ? "shield" : "zap");
              return (
                <div key={badge} className="flex items-center gap-3 text-primary-foreground/70">
                  <Icon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
