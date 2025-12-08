import { Brain, Heart, Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-display font-bold">
                Instituto Mundo de Dentro
              </span>
            </div>
            <p className="text-background/70 font-body leading-relaxed max-w-md">
              Cuidando do mundo interno de cada pessoa com ciência, acolhimento e fé. 
              Neuropsicologia, neurofeedback e psicologia para todas as idades.
            </p>
            <div className="flex items-center gap-2 mt-4 text-background/50 text-sm font-body">
              <Heart className="w-4 h-4 text-primary" />
              <span>"No Mundo de Dentro, cada cérebro conta uma história"</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Links Rápidos</h4>
            <nav className="space-y-2">
              {[
                { label: "Início", id: "hero" },
                { label: "Sobre", id: "about" },
                { label: "Serviços", id: "services" },
                { label: "Equipe", id: "team" },
                { label: "Contato", id: "contact" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-background/70 hover:text-primary transition-colors font-body"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Redes Sociais</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@mundodedentro.com.br"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-background/50 text-sm font-body">
              Teresina, Piauí<br />
              Segunda a Sexta: 8h às 21h
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm font-body">
              © {currentYear} Instituto Mundo de Dentro. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-background/50 hover:text-primary text-sm font-body transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="/terms"
                className="text-background/50 hover:text-primary text-sm font-body transition-colors"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
