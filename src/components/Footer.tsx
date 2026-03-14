import { Link } from "react-router-dom";
import { useSiteContent } from "@/providers/site-content-provider";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { content } = useSiteContent();

  return (
    <footer className="bg-foreground text-background py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Netrix Systems logo" className="h-10 w-10 object-contain" />
            <span className="font-heading text-lg font-800 tracking-tight">
              NETRIX<span className="text-accent">.</span>
            </span>
          </Link>
          <p className="text-sm text-background/60 text-center">
            © {new Date().getFullYear()} Netrix Systems Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            {content.navigation.map((item) =>
              item.href.startsWith("/about") || item.href.startsWith("/products") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.label === "Home" ? "/#home" : item.href}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
