import { motion } from "framer-motion";
import { Sun, Camera, BatteryCharging, Network, ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import serviceSolar from "@/assets/hero-solar.jpg";
import serviceCctv from "@/assets/service-cctv.jpg";
import serviceCabling from "@/assets/service-cabling.jpg";
import serviceInverter from "@/assets/service-inverter.jpg";

interface Product {
  name: string;
  description: string;
  specs: string[];
  image: string;
  category: string;
}

const products: Product[] = [
  {
    name: "Monocrystalline Solar Panel — 550W",
    description: "High-efficiency monocrystalline panels ideal for commercial and residential rooftop installations. Built for the Nigerian climate.",
    specs: ["550W output", "21.3% efficiency", "25-year warranty", "IP68 rated"],
    image: serviceSolar,
    category: "Solar Panels",
  },
  {
    name: "Polycrystalline Solar Panel — 330W",
    description: "Cost-effective polycrystalline panels perfect for budget-conscious residential projects without compromising quality.",
    specs: ["330W output", "17.5% efficiency", "20-year warranty", "Anti-reflective coating"],
    image: serviceSolar,
    category: "Solar Panels",
  },
  {
    name: "4-Channel DVR CCTV System",
    description: "Complete 4-camera surveillance kit with night vision, motion detection, and remote viewing via mobile app.",
    specs: ["1080p Full HD", "Night vision 30m", "1TB storage", "Mobile app access"],
    image: serviceCctv,
    category: "CCTV Equipment",
  },
  {
    name: "8-Channel IP Camera System",
    description: "Enterprise-grade IP camera system with PoE, AI motion detection, and cloud backup support.",
    specs: ["4K resolution", "PoE powered", "AI detection", "Cloud backup ready"],
    image: serviceCctv,
    category: "CCTV Equipment",
  },
  {
    name: "5KVA Hybrid Inverter",
    description: "Hybrid inverter with built-in MPPT charge controller for seamless solar and grid integration.",
    specs: ["5000W output", "MPPT charger", "LCD display", "Pure sine wave"],
    image: serviceInverter,
    category: "Inverters & Power",
  },
  {
    name: "10KVA Online UPS Inverter",
    description: "Heavy-duty online UPS for businesses requiring zero-transfer-time power backup.",
    specs: ["10,000VA capacity", "Zero transfer time", "Rack mountable", "Battery scalable"],
    image: serviceInverter,
    category: "Inverters & Power",
  },
  {
    name: "Cat6A Structured Cabling Kit",
    description: "Complete Cat6A cabling solution for enterprise networks supporting 10Gbps speeds.",
    specs: ["10Gbps speeds", "500MHz bandwidth", "Shielded (STP)", "Includes patch panels"],
    image: serviceCabling,
    category: "Network & Cabling",
  },
  {
    name: "Fibre Optic Cabling Solution",
    description: "Single-mode fibre optic cabling for long-distance, high-bandwidth data centre and campus deployments.",
    specs: ["Single-mode fibre", "Up to 100km range", "Low attenuation", "Splice & terminate"],
    image: serviceCabling,
    category: "Network & Cabling",
  },
];

const categoryIcons: Record<string, typeof Sun> = {
  "Solar Panels": Sun,
  "CCTV Equipment": Camera,
  "Inverters & Power": BatteryCharging,
  "Network & Cabling": Network,
};

const categories = [...new Set(products.map((p) => p.category))];

const ProductsPage = () => {
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
        const categoryProducts = products.filter((p) => p.category === category);

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
                        src={product.image}
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
                      <a href="https://wa.me/2348105249055?text=Hello%20Netrix!%20I%27m%20interested%20in%20the%20" target="_blank" rel="noopener noreferrer">
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
