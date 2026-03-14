import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteContent } from "@/providers/site-content-provider";

const FAQSection = () => {
  const { content } = useSiteContent();

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our services, installations, and pricing.
          </p>
        </div>

        <div className="space-y-8">
          {content.faqs.map((category) => (
            <div key={category.category}>
              <h3 className="text-lg font-semibold text-primary mb-3">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="bg-background rounded-lg border">
                {category.questions.map((faq, i) => (
                  <AccordionItem key={i} value={`${category.category}-${i}`}>
                    <AccordionTrigger className="px-5 text-left text-foreground">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
