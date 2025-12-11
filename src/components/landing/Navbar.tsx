import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import logo from "@/assets/logo_mundo_de_dentro.svg";

const navLinks = [
  { label: "Início", id: "hero" },
  { label: "Sobre", id: "about" },
  { label: "Serviços", id: "services" },
  { label: "Para Pais", id: "parents" },
  { label: "Equipe", id: "team" },
  { label: "Contato", id: "contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5500000000000", "_blank");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group"
          >
            <img 
              src={logo} 
              alt="Instituto Mundo de Dentro" 
              className="h-10 sm:h-12 w-auto group-hover:scale-105 transition-transform"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-foreground/80 hover:text-primary font-body transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleWhatsApp}
              size="sm"
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Agendar
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="bg-card rounded-2xl p-4 shadow-card space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-foreground hover:bg-muted font-body transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={handleWhatsApp}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Agendar Consulta
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
