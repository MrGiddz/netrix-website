import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import gallerySolar1 from "@/assets/gallery-solar-1.jpg";
import gallerySolar2 from "@/assets/gallery-solar-2.jpg";
import galleryCctv1 from "@/assets/gallery-cctv-1.jpg";
import galleryCabling1 from "@/assets/gallery-cabling-1.jpg";
import galleryInverter1 from "@/assets/gallery-inverter-1.jpg";
import galleryAutomation1 from "@/assets/gallery-automation-1.jpg";

const projects = [
  { image: gallerySolar1, title: "Commercial Solar Installation", category: "Solar", location: "Victoria Island, Lagos" },
  { image: galleryCctv1, title: "Office CCTV System", category: "CCTV", location: "Abuja" },
  { image: galleryCabling1, title: "Data Centre Cabling", category: "Cabling", location: "Ikeja, Lagos" },
  { image: gallerySolar2, title: "Residential Solar Project", category: "Solar", location: "Lekki, Lagos" },
  { image: galleryInverter1, title: "Inverter & Battery Setup", category: "Power", location: "Port Harcourt" },
  { image: galleryAutomation1, title: "Smart Home & Fire Detection", category: "Automation", location: "Ikoyi, Lagos" },
];

const categories = ["All", ...new Set(projects.map((p) => p.category))];

const GallerySection = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="py-20 lg:py-28 section-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-heading font-semibold tracking-widest uppercase text-accent">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-800 text-foreground mt-3">
            Project Gallery
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Browse our completed installations across Nigeria.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${
                filter === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-lg overflow-hidden cursor-pointer border border-border"
              onClick={() => setLightbox(projects.indexOf(project))}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors duration-300 flex items-end">
                <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-card font-heading font-700 text-sm">{project.title}</p>
                  <p className="text-card/70 text-xs">{project.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-card hover:text-accent transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={projects[lightbox].image}
            alt={projects[lightbox].title}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
          />
          <div className="absolute bottom-8 text-center">
            <p className="text-card font-heading font-700">{projects[lightbox].title}</p>
            <p className="text-card/60 text-sm">{projects[lightbox].location}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
