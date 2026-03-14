import { motion } from "framer-motion";
import { resolveIconKey, resolveImageKey } from "@/lib/site-content";
import { useSiteContent } from "@/providers/site-content-provider";

const ServicesSection = () => {
  const { content } = useSiteContent();

  return (
    <section id="services" className="py-20 lg:py-28 section-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">What We Do</span>
          <h2 className="text-3xl md:text-4xl font-heading font-800 text-foreground mt-3">
            Our Core Services
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Comprehensive ICT products and services with customer satisfaction and total quality management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {content.services.map((service, i) => {
            const Icon = resolveIconKey(service.iconKey);
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent/40 transition-all hover:shadow-lg"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={resolveImageKey(service.imageKey)}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading font-700 text-lg text-foreground">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Additional services */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.additionalServices.map((s, i) => {
            const Icon = resolveIconKey(s.iconKey);
            return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3 bg-card rounded-lg border border-border p-4"
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
