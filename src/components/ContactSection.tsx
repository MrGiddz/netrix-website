import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waMsg = `Hello Netrix Systems! My name is ${form.name}. ${form.message} — Email: ${form.email}, Phone: ${form.phone}`;
    window.open(`https://wa.me/2348105249055?text=${encodeURIComponent(waMsg)}`, "_blank");
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-heading font-800 mt-3 mb-6">
              Request a Free Quote
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-md">
              Ready to power your business? Reach out and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, text: "3 Akintoye Sogunle Street, Off Obafemi Awolowo Way, Ikeja, Lagos" },
                { icon: Phone, text: "0810 524 9055" },
                { icon: Mail, text: "netrixsystemsng@gmail.com" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-4">
                  <item.icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-primary-foreground/80">{item.text}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/2348105249055"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#25D366] text-primary-foreground rounded-lg font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card text-card-foreground rounded-lg p-6 lg:p-8 space-y-5"
          >
            {[
              { name: "name" as const, label: "Full Name", type: "text", placeholder: "Your name" },
              { name: "email" as const, label: "Email", type: "email", placeholder: "you@company.com" },
              { name: "phone" as const, label: "Phone Number", type: "tel", placeholder: "0801 234 5678" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-1.5">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project…"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
              />
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold">
              Send via WhatsApp
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
