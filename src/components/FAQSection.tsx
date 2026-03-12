import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Solar Installation",
    questions: [
      {
        q: "How long does a solar panel installation take?",
        a: "A typical residential installation takes 1–3 days, while commercial projects may take 1–2 weeks depending on the system size and complexity.",
      },
      {
        q: "What size solar system do I need for my home or business?",
        a: "This depends on your energy consumption. We conduct a free energy audit to determine the optimal system size. A typical Nigerian home uses 3–5kW, while businesses may require 10–50kW or more.",
      },
      {
        q: "Do solar panels work during the rainy season?",
        a: "Yes! Solar panels generate electricity from daylight, not just direct sunlight. Output may reduce by 20–30% on cloudy days, but they still produce significant power year-round in Nigeria.",
      },
      {
        q: "What is the lifespan of solar panels?",
        a: "Quality solar panels last 25–30 years with minimal degradation. We use only tier-1 panels with manufacturer warranties to ensure long-term performance.",
      },
    ],
  },
  {
    category: "CCTV & Security",
    questions: [
      {
        q: "Can I view my CCTV cameras remotely?",
        a: "Absolutely. All our CCTV systems come with mobile app access, allowing you to monitor your property in real-time from anywhere in the world via your smartphone or computer.",
      },
      {
        q: "How many cameras do I need for my property?",
        a: "This depends on your property size and layout. We offer free site surveys to recommend the optimal camera placement. A typical home needs 4–8 cameras, while commercial properties may need 16–64+.",
      },
      {
        q: "Do CCTV systems work during power outages?",
        a: "Yes. We integrate battery backup and can connect your security system to solar power to ensure 24/7 uninterrupted surveillance even during NEPA outages.",
      },
    ],
  },
  {
    category: "Pricing & Support",
    questions: [
      {
        q: "Do you offer financing or payment plans?",
        a: "Yes, we offer flexible payment plans for both residential and commercial installations. Contact us to discuss options tailored to your budget.",
      },
      {
        q: "What warranty do you provide?",
        a: "We provide 1–2 year workmanship warranty on all installations, plus manufacturer warranties on equipment (up to 25 years on solar panels, 5–10 years on inverters).",
      },
      {
        q: "Do you provide after-sales support and maintenance?",
        a: "Yes. We offer maintenance packages and 24/7 technical support. Our team is always available via WhatsApp or phone for any issues.",
      },
    ],
  },
];

const FAQSection = () => {
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
          {faqs.map((category) => (
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
