const Footer = () => (
  <footer className="bg-foreground text-background py-10">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-lg font-800 tracking-tight">
          NETRIX<span className="text-accent">.</span>
        </span>
        <p className="text-sm text-background/60 text-center">
          © {new Date().getFullYear()} Netrix Systems Limited. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Home", "About", "Services", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-background/60 hover:text-background transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
