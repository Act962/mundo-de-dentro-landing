import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Sparkles, Award } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import logo from "@/assets/logo_mundo_de_dentro.svg";
import { useContent } from "@/hooks/useContent";

const Hero = () => {
  const { content } = useContent();
  const data = content?.hero || {
    tagline: "No Mundo de Dentro, cada cérebro conta uma história",
    description: "Cuidamos do mundo interno de cada pessoa com ciência, acolhimento e fé. Neuropsicologia, neurofeedback e psicologia para crianças, adolescentes, adultos e suas famílias.",
    cta_primary: { text: "Agendar Consulta", link: "https://wa.me/5586981181575" },
    cta_secondary: { text: "Conhecer Serviços", link: "services" },
    badges: ["+20 anos de experiência", "Atendimento humanizado"]
  };

  const handleWhatsApp = () => {
    window.open(data.cta_primary.link, "_blank");
  };

  const bgImage = data.background 
    ? (data.background.startsWith('http') || data.background.startsWith('/') ? data.background : `http://localhost:3001${data.background}`)
    : heroBackground;

  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Background image with opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-blue-light blob animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-brand-orange-light blob-2 animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-brand-red-light blob animate-float" />
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-brand-blue-light blob-2 animate-float-delayed" />
        
        {/* Stars */}
        <Sparkles className="absolute top-32 right-1/4 w-8 h-8 text-accent/40 animate-pulse-soft" />
        <Sparkles className="absolute top-60 left-1/3 w-6 h-6 text-secondary/50 animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src={logo} 
              alt="Instituto Mundo de Dentro" 
              className="w-64 md:w-80 lg:w-96 h-auto"
            />
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground font-body mb-4">
            "{data.tagline}"
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto mb-10">
            {data.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleWhatsApp}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft px-8 py-6 text-lg rounded-2xl gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              {data.cta_primary.text}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/30 hover:bg-primary/5 px-8 py-6 text-lg rounded-2xl"
              onClick={() => document.getElementById(data.cta_secondary.link)?.scrollIntoView({ behavior: 'smooth' })}
            >
              {data.cta_secondary.text}
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Award className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-body">{data.badges[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Heart className="w-5 h-5 text-secondary-foreground" />
              </div>
              <span className="font-body">{data.badges[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L60 55C120 50 240 40 360 45C480 50 600 70 720 75C840 80 960 70 1080 60C1200 50 1320 40 1380 35L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V60Z" 
            fill="hsl(var(--card))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
