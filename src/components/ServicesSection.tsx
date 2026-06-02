import { motion, type Variants } from "framer-motion";
import { resolveIconKey, resolveImageSource } from "@/lib/site-content";
import { useSiteContent } from "@/providers/site-content-provider";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" },
  }),
};

const ServicesSection = () => {
  const { content } = useSiteContent();

  return (
    <section id="services" className="py-20 lg:py-28 section-gradient">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-heading font-semibold tracking-widest uppercase text-accent"
          >
            What We Do
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-heading font-800 text-foreground mt-3">
            Our Core Services
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Comprehensive ICT products and services with customer satisfaction and total quality management.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {content.services.map((service, i) => {
            const Icon = resolveIconKey(service.iconKey);
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent/40 transition-colors"
              >
                <div className="h-48 overflow-hidden">
                  <motion.img
                    src={resolveImageSource(service)}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center"
                      whileHover={{ scale: 1.15, backgroundColor: "rgba(var(--accent), 0.2)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Icon className="w-5 h-5 text-accent" />
                    </motion.div>
                    <h3 className="font-heading font-700 text-lg text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional services chips */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {content.additionalServices.map((s, i) => {
            const Icon = resolveIconKey(s.iconKey);
            return (
              <motion.div
                key={s.label}
                custom={i}
                variants={chipVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="flex items-center gap-3 bg-card rounded-lg border border-border p-4 hover:border-accent/40 hover:shadow-md transition-shadow cursor-default"
              >
                <Icon className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm font-medium text-foreground">{s.label}</span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
