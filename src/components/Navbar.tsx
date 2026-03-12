import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { label: "Home", href: isHome ? "#home" : "/", isRoute: !isHome },
    { label: "About", href: isHome ? "#about" : "/about", isRoute: !isHome },
    { label: "Services", href: isHome ? "#services" : "/#services", isRoute: !isHome },
    { label: "Products", href: "/products", isRoute: true },
    { label: "Gallery", href: isHome ? "#gallery" : "/#gallery", isRoute: !isHome },
    { label: "Contact", href: isHome ? "#contact" : "/#contact", isRoute: !isHome },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="font-heading text-xl font-800 tracking-tight text-primary">
          NETRIX<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <a href="tel:08105249055">
            <Button variant="default" size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Phone className="w-4 h-4" />
              Call Us
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                {link.label}
              </a>
            )
          )}
          <a href="tel:08105249055">
            <Button variant="default" size="sm" className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Phone className="w-4 h-4" />
              Call Us
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
