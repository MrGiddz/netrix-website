import { motion } from "framer-motion";
import { Sun, Camera, BatteryCharging, Network, ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { resolveImageKey } from "@/lib/site-content";
import { useSiteContent } from "@/providers/site-content-provider";

const categoryIcons: Record<string, typeof Sun> = {
  "Solar Panels": Sun,
  "CCTV Equipment": Camera,
  "Inverters & Power": BatteryCharging,
  "Network & Cabling": Network,
};

const ProductsPage = () => {
  const { content } = useSiteContent();
  const categories = [...new Set(content.products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-background">
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
            <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">Products</span>
            <h1 className="text-4xl md:text-5xl font-heading font-800 mt-3 mb-4">Product Catalog</h1>
            <p className="text-primary-foreground/70 max-w-xl text-lg">
              Browse our range of solar panels, CCTV systems, inverters, and network infrastructure products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      {categories.map((category) => {
        const Icon = categoryIcons[category] || Sun;
        const categoryProducts = content.products.filter((p) => p.category === category);

        return (
          <section key={category} className="py-16 lg:py-20 odd:bg-card even:section-gradient">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-800 text-foreground">{category}</h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {categoryProducts.map((product, i) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-card rounded-lg border border-border overflow-hidden hover:border-accent/40 transition-all hover:shadow-lg group"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={resolveImageKey(product.imageKey)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading font-700 text-lg text-foreground mb-2">{product.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {product.specs.map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-full border border-border"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`https://wa.me/${content.contact.whatsappNumber}?text=Hello%20Netrix!%20I%27m%20interested%20in%20the%20`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-heading font-semibold">
                          <Phone className="w-4 h-4" /> Enquire Now
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </div>
  );
};

export default ProductsPage;
