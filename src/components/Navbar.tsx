import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useSiteContent } from "@/providers/site-content-provider";
import logo from "@/assets/logo.png";

// Map nav label → section id (for home-page hash links)
const SECTION_MAP: Record<string, string> = {
  Home: "home",
  About: "about",
  Services: "services",
  Gallery: "gallery",
  Contact: "contact",
};

// Map nav label → route path (for page links)
const ROUTE_MAP: Record<string, string> = {
  About: "/about",
  Products: "/products",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { content } = useSiteContent();

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver — track active section on home page
  useEffect(() => {
    if (!isHome) return;

    const ids = ["home", "about", "services", "gallery", "testimonials", "faq", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        // Fire when the section occupies the top-centre band of the viewport
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  // Determine whether a nav item is active
  const isActive = (label: string) => {
    if (isHome) {
      return activeSection === (SECTION_MAP[label] ?? "");
    }
    // Non-home page: match by pathname
    return location.pathname === (ROUTE_MAP[label] ?? null);
  };

  const navLinks = content.navigation.map((item) => {
    if (item.label === "Home")
      return { ...item, href: isHome ? "#home" : "/", isRoute: !isHome };
    if (item.label === "About")
      return { ...item, href: isHome ? "#about" : "/about", isRoute: !isHome };
    if (item.label === "Services")
      return { ...item, href: isHome ? "#services" : "/#services", isRoute: !isHome };
    if (item.label === "Gallery")
      return { ...item, href: isHome ? "#gallery" : "/#gallery", isRoute: !isHome };
    if (item.label === "Contact")
      return { ...item, href: isHome ? "#contact" : "/#contact", isRoute: !isHome };
    return { ...item, isRoute: true };
  });

  const linkClass = (label: string) =>
    `text-sm font-medium transition-colors relative ${
      isActive(label) ? "text-primary" : "text-muted-foreground hover:text-primary"
    }`;

  const mobileLinkClass = (label: string) =>
    `block text-sm font-medium py-2 transition-colors ${
      isActive(label) ? "text-primary" : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300 ${
        scrolled
          ? "bg-card/98 backdrop-blur-lg shadow-lg shadow-foreground/5"
          : "bg-card/95 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <motion.img
            src={logo}
            alt="Netrix Systems logo"
            className="h-32 w-32 md:h-64 md:w-64 object-contain scale-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => {
            const active = isActive(link.label);
            const cls = linkClass(link.label);

            return link.isRoute ? (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
              >
                <Link to={link.href} className={cls}>
                  {link.label}
                  {/* Sliding active underline */}
                  {active ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full" />
                  )}
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
              >
                <a href={link.href} className={cls}>
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent/60 transition-all duration-300 group-hover:w-full rounded-full" />
                  )}
                </a>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <a href={`tel:${content.contact.phones[0].replace(/\s+/g, "")}`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </Button>
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 space-y-1">
              {navLinks.map((link, i) =>
                link.isRoute ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={mobileLinkClass(link.label)}
                    >
                      <span className="flex items-center gap-2">
                        {isActive(link.label) && (
                          <motion.span
                            layoutId="mobile-active-dot"
                            className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={mobileLinkClass(link.label)}
                    >
                      <span className="flex items-center gap-2">
                        {isActive(link.label) && (
                          <motion.span
                            layoutId="mobile-active-dot"
                            className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        {link.label}
                      </span>
                    </a>
                  </motion.div>
                ),
              )}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
                className="pt-2"
              >
                <a href={`tel:${content.contact.phones[0].replace(/\s+/g, "")}`}>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
