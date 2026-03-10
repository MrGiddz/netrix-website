import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-solar.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Solar panel installation by Netrix Systems" className="w-full h-full object-cover" />
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
            Since 2007
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-800 leading-tight text-primary-foreground mb-6">
            World-Class ICT Solutions for Your Business
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg font-body">
            Solar installations, CCTV systems, structured cabling, and power solutions — delivered with excellence across Nigeria.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-heading font-semibold">
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base font-heading">
                Our Services
              </Button>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-8 mt-12">
            <div className="flex items-center gap-3 text-primary-foreground/70">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">18+ Years Experience</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/70">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">10+ Cities Covered</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
