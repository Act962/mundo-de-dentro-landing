import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Clock, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5586981181575", "_blank");
  };

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-28 h-28 bg-brand-blue-light blob animate-float pointer-events-none" />
      <div className="absolute bottom-10 left-20 w-20 h-20 bg-brand-red-light blob-2 animate-float-delayed pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-accent rounded-full text-accent-foreground text-sm font-body mb-4">
            Contato
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Fale Conosco
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Estamos prontos para ajudar. Entre em contato para agendar uma consulta 
            ou tirar suas dúvidas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* WhatsApp Card */}
            <div
              onClick={handleWhatsApp}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-muted-foreground font-body">(86) 98118-1575</p>
                  <p className="text-primary text-sm font-body">Clique para conversar →</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                  <Mail className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">E-mail</h3>
                  <p className="text-muted-foreground font-body">contato@mundodedentro.com.br</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                  <Clock className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Horário</h3>
                  <p className="text-muted-foreground font-body">Segunda a Sexta: 8h às 21h</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Localização</h3>
                  <p className="text-muted-foreground font-body">Teresina, Piauí</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 shadow-card">
            <h3 className="text-xl font-display font-bold text-foreground mb-6">
              Envie sua mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background border-border rounded-xl h-12"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background border-border rounded-xl h-12"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-border rounded-xl h-12"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Sua mensagem ou dúvida..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-background border-border rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 gap-2"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Google Maps Placeholder */}
        <div className="mt-12">
          <div className="bg-muted rounded-2xl h-64 md:h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground font-body">
                Mapa será adicionado com o endereço completo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
