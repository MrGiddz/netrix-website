import { motion, type Variants } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSiteContent } from "@/providers/site-content-provider";

type Status = "idle" | "loading" | "success" | "error";

const infoItemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
  }),
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.1 + i * 0.08, ease: "easeOut" },
  }),
};

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { content } = useSiteContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const apiBase = (
        import.meta.env.VITE_API_URL || "http://localhost:3001"
      ).replace(/\/api$/, "");
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: MapPin, text: content.contact.address },
    { icon: Phone, text: content.contact.phones.join(" · ") },
    { icon: Mail, text: content.contact.email },
  ];

  const fields = [
    { name: "name" as const, label: "Full Name", type: "text", placeholder: "Your name" },
    { name: "email" as const, label: "Email", type: "email", placeholder: "you@company.com" },
    { name: "phone" as const, label: "Phone Number", type: "tel", placeholder: "0801 234 5678" },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-800 mt-3 mb-6">
              {content.contact.quoteHeading}
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-md">
              {content.contact.quoteDescription}
            </p>

            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactInfo.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  custom={i}
                  variants={infoItemVariants}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  </motion.div>
                  <span className="text-sm text-primary-foreground/80">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href={`https://wa.me/${content.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#25D366] text-primary-foreground rounded-lg font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-card text-card-foreground rounded-lg p-6 lg:p-8 space-y-5"
          >
            {fields.map((field, i) => (
              <motion.div
                key={field.name}
                custom={i}
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                />
              </motion.div>
            ))}

            <motion.div
              custom={3}
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <label className="block text-sm font-medium mb-1.5">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project…"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none transition-shadow"
              />
            </motion.div>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-green-800 text-sm"
              >
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Your message has been sent! We'll get back to you shortly.</span>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-red-800 text-sm"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorMsg || "Failed to send message. Please try again."}</span>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold disabled:opacity-70"
              >
                {status === "loading" ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…</>
                ) : status === "success" ? (
                  <><CheckCircle className="w-4 h-4 mr-2" /> Message Sent</>
                ) : (
                  "Send Message"
                )}
              </Button>
            </motion.div>
          </motion.form>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
