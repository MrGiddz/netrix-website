import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "18+ years of industry experience",
  "Operations across 10+ Nigerian cities",
  "Certified ICT professionals",
  "End-to-end project delivery",
];

const AboutSection = () => {
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
              Trusted ICT Partner Since 2007
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Netrix Systems Limited is a leading provider of information and communication technology products and services. Based in Ikeja, Lagos, we deliver world-class solar, power, security, and networking solutions to businesses and homes across Nigeria.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our mission is <strong className="text-foreground">"Providing world-class ICT goods and services with customer satisfaction and total quality management"</strong>.
            </p>
            <ul className="space-y-3">
              {highlights.map((h) => (
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
            {[
              { number: "18+", label: "Years Experience" },
              { number: "10+", label: "Cities Covered" },
              { number: "500+", label: "Projects Completed" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
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
