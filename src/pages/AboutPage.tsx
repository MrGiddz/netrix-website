import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { getAbsoluteUrl } from "@/lib/seo";
import { resolveIconKey, resolveImageKey } from "@/lib/site-content";
import { useSiteContent } from "@/providers/site-content-provider";

const AboutPage = () => {
  const { content } = useSiteContent();
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Netrix Systems Limited",
    url: getAbsoluteUrl("/about"),
    description: content.about.overview.description,
    mainEntity: {
      "@type": "Organization",
      name: "Netrix Systems Limited",
      foundingDate: "2007",
      description: content.about.overview.description,
      employee: content.about.team.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="About Netrix Systems Limited"
        description={content.about.overview.description}
        path="/about"
        schema={aboutSchema}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pb-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-6 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">
              {content.about.overview.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-800 mt-3 mb-4">
              Our Story & Team
            </h1>
            <p className="text-primary-foreground/70 max-w-xl text-lg">
              {content.about.overview.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.about.values.map((v, i) => {
              const Icon = resolveIconKey(v.iconKey);
              return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-lg border border-border p-6"
              >
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-700 text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-heading font-800 text-foreground mt-3">Company Milestones</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
            {content.about.milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-4 mb-8 pl-10 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"
                }`}
              >
                <div className="absolute left-2.5 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background md:-translate-x-1.5 mt-1.5" />
                <div className="bg-secondary rounded-lg p-4 border border-border w-full">
                  <span className="text-xs font-heading font-700 text-accent">{m.year}</span>
                  <p className="text-sm text-foreground mt-1">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">Our People</span>
            <h2 className="text-3xl md:text-4xl font-heading font-800 text-foreground mt-3">Meet the Team</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {content.about.team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card rounded-lg border border-border overflow-hidden text-center"
              >
                <img
                  src={resolveImageKey(member.imageKey)}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading font-700 text-foreground">{member.name}</h3>
                  <p className="text-xs text-accent font-heading font-semibold uppercase tracking-wide mt-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
