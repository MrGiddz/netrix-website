import { motion, type Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useSiteContent } from "@/providers/site-content-provider";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
};

const starVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 15, delay: i * 0.07 },
  }),
};

const TestimonialsSection = () => {
  const { content } = useSiteContent();

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {content.testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6, boxShadow: "0 16px 36px rgba(0,0,0,0.10)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="bg-secondary rounded-lg p-6 lg:p-8 border border-border relative overflow-hidden cursor-default"
            >
              {/* Decorative quote mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.2, ease: "easeOut" }}
                className="absolute top-6 right-6"
              >
                <Quote className="w-8 h-8 text-accent/20" />
              </motion.div>

              {/* Stars */}
              <motion.div
                className="flex gap-1 mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {Array.from({ length: t.rating }).map((_, j) => (
                  <motion.span key={j} custom={j} variants={starVariants}>
                    <Star className="w-4 h-4 fill-accent text-accent" />
                  </motion.span>
                ))}
              </motion.div>

              <p className="text-foreground leading-relaxed mb-6 text-sm">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <motion.div
                  className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-accent font-heading font-700 text-sm">
                    {t.name.charAt(0)}
                  </span>
                </motion.div>
                <div>
                  <p className="font-heading font-700 text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
