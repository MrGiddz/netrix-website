import { motion } from "framer-motion";
import { Sun, Camera, Network, BatteryCharging, Flame, Home, Fingerprint, Wrench } from "lucide-react";
import serviceSolar from "@/assets/hero-solar.jpg";
import serviceCctv from "@/assets/service-cctv.jpg";
import serviceCabling from "@/assets/service-cabling.jpg";
import serviceInverter from "@/assets/service-inverter.jpg";

const services = [
  {
    icon: Sun,
    title: "Solar Installation & Sales",
    description: "Complete solar panel systems — from design to installation — for homes and businesses across Nigeria.",
    image: serviceSolar,
  },
  {
    icon: Camera,
    title: "CCTV & Security Systems",
    description: "State-of-the-art surveillance equipment, installation, and monitoring for total peace of mind.",
    image: serviceCctv,
  },
  {
    icon: Network,
    title: "Structured & Fibre Cabling",
    description: "Enterprise-grade network infrastructure, fibre optic cabling, and data centre solutions.",
    image: serviceCabling,
  },
  {
    icon: BatteryCharging,
    title: "Inverters & Power Backup",
    description: "Inverter sales, installation, and lithium-ion battery systems to keep your operations running 24/7.",
    image: serviceInverter,
  },
];

const moreServices = [
  { icon: Flame, label: "Fire Detection Systems" },
  { icon: Home, label: "Home Automation" },
  { icon: Fingerprint, label: "Biometric Access Control" },
  { icon: Wrench, label: "Maintenance Services" },
];

const ServicesSection = () => {
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
          {services.map((service, i) => (
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
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading font-700 text-lg text-foreground">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional services */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {moreServices.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3 bg-card rounded-lg border border-border p-4"
            >
              <s.icon className="w-5 h-5 text-accent shrink-0" />
              <span className="text-sm font-medium text-foreground">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
