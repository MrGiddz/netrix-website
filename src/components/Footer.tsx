import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background py-10">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-heading text-lg font-800 tracking-tight">
          NETRIX<span className="text-accent">.</span>
        </Link>
        <p className="text-sm text-background/60 text-center">
          © {new Date().getFullYear()} Netrix Systems Limited. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="/#home" className="text-sm text-background/60 hover:text-background transition-colors">Home</a>
          <Link to="/about" className="text-sm text-background/60 hover:text-background transition-colors">About</Link>
          <a href="/#services" className="text-sm text-background/60 hover:text-background transition-colors">Services</a>
          <Link to="/products" className="text-sm text-background/60 hover:text-background transition-colors">Products</Link>
          <a href="/#contact" className="text-sm text-background/60 hover:text-background transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
