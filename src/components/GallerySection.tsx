import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { resolveImageKey } from "@/lib/site-content";
import { useSiteContent } from "@/providers/site-content-provider";

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" },
  }),
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.25 } },
};

const GallerySection = () => {
  const { content } = useSiteContent();
  const categories = ["All", ...new Set(content.projects.map((p) => p.category))];
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    filter === "All"
      ? content.projects
      : content.projects.filter((p) => p.category === filter);

  const handlePrev = () => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + content.projects.length) % content.projects.length);
  };
  const handleNext = () => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % content.projects.length);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 section-gradient">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${
                filter === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative rounded-lg overflow-hidden cursor-pointer border border-border"
                onClick={() => setLightbox(content.projects.indexOf(project))}
              >
                <img
                  src={resolveImageKey(project.imageKey)}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors duration-300 flex items-end">
                  <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
                    <p className="text-card font-heading font-700 text-sm">{project.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-accent" />
                      <p className="text-card/70 text-xs">{project.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-foreground/92 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <motion.button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-card hover:text-accent transition-colors z-10"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Prev */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 text-card hover:text-accent transition-colors z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-10 h-10" />
            </motion.button>

            {/* Image */}
            <motion.img
              key={lightbox}
              src={resolveImageKey(content.projects[lightbox].imageKey)}
              alt={content.projects[lightbox].title}
              className="max-w-full max-h-[80vh] rounded-lg object-contain"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 text-card hover:text-accent transition-colors z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-10 h-10" />
            </motion.button>

            {/* Caption */}
            <motion.div
              className="absolute bottom-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-card font-heading font-700">
                {content.projects[lightbox].title}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-accent" />
                <p className="text-card/60 text-sm">{content.projects[lightbox].location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
