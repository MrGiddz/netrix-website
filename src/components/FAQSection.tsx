import { motion, type Variants } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteContent } from "@/providers/site-content-provider";

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const FAQSection = () => {
  const { content } = useSiteContent();

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our services, installations, and pricing.
          </p>
        </motion.div>

        <div className="space-y-8">
          {content.faqs.map((category, i) => (
            <motion.div
              key={category.category}
              custom={i}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.h3
                className="text-lg font-semibold text-primary mb-3"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 + 0.1 }}
              >
                {category.category}
              </motion.h3>
              <Accordion
                type="single"
                collapsible
                className="bg-background rounded-lg border"
              >
                {category.questions.map((faq, j) => (
                  <AccordionItem key={j} value={`${category.category}-${j}`}>
                    <AccordionTrigger className="px-5 text-left text-foreground hover:text-accent transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
