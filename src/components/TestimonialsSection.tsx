import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useSiteContent } from "@/providers/site-content-provider";

const TestimonialsSection = () => {
  const { content } = useSiteContent();

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-800 text-foreground mt-3">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Trusted by businesses and homeowners across Nigeria for quality ICT solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {content.testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-secondary rounded-lg p-6 lg:p-8 border border-border relative"
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 text-sm">
                "{t.text}"
              </p>
              <div>
                <p className="font-heading font-700 text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
