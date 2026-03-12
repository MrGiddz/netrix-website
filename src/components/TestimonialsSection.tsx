import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chief Adebayo Ogunleye",
    role: "MD, Ogunleye & Associates",
    text: "Netrix Systems installed a complete solar power system for our office complex in Ikeja. The team was professional, punctual, and the quality of work exceeded our expectations. We've cut our energy bills by over 70%.",
    rating: 5,
  },
  {
    name: "Mrs. Funke Adeyemi",
    role: "Homeowner, Lekki",
    text: "I was impressed by the CCTV installation Netrix did at my residence. The coverage is excellent and the remote monitoring setup works perfectly. I feel so much safer knowing my family is protected.",
    rating: 5,
  },
  {
    name: "Engr. Tunde Bakare",
    role: "CTO, TechVentures Nigeria",
    text: "We contracted Netrix for structured cabling across our new office. Their attention to detail and cable management was outstanding. The network performance has been flawless since installation.",
    rating: 5,
  },
  {
    name: "Alhaji Mustapha Ibrahim",
    role: "Director, Ibrahim Holdings",
    text: "Netrix installed inverters and battery backup systems across three of our properties. They delivered on time, within budget, and the systems have been running without issues for over two years.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
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
          {testimonials.map((t, i) => (
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
