import { useState } from "react";
import { Brain, Activity, Heart, BookOpen, ChevronDown, ChevronUp, Sparkles, Users, GraduationCap, MessageCircle, School, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";

const iconMap: Record<string, any> = {
  Brain, Activity, Heart, BookOpen, Sparkles, Users, GraduationCap, MessageCircle, School, Crown
};

const featuredServices = [
  {
    icon: Brain,
    title: "Avaliação Neuropsicológica",
    description: "Um 'mapa do cérebro' que mostra como a criança funciona: atenção, memória, linguagem, raciocínio, organização e comportamento.",
    color: "bg-brand-blue-light",
    iconColor: "text-primary",
  },
  {
    icon: Activity,
    title: "Neurofeedback",
    description: "Treina o cérebro como uma academia mental. A criança aprende a se concentrar melhor, controlar ansiedade e reduzir impulsividade.",
    color: "bg-brand-red-light",
    iconColor: "text-secondary",
  },
  {
    icon: Heart,
    title: "Psicologia Infantil e Adolescente",
    description: "Acompanhamento emocional e comportamental focado em autorregulação, habilidades sociais, emoções, rotina e autoestima.",
    color: "bg-brand-orange-light",
    iconColor: "text-accent",
  },
  {
    icon: BookOpen,
    title: "Sala de Estudo Assistido - TDAH",
    description: "Ambiente estruturado para organizar tarefas, revisar conteúdos, aprender métodos de estudo e manter a rotina escolar.",
    color: "bg-brand-blue-light",
    iconColor: "text-primary",
  },
];

const otherServices = [
  {
    icon: Sparkles,
    title: "Avaliação com Realidade Virtual",
    description: "Ferramentas modernas para observar atenção, impulsividade e comportamento em situações próximas da vida real.",
  },
  {
    icon: School,
    title: "Consultoria Escolar",
    description: "Acompanhamento junto à escola para adaptações, comunicação e alinhamento das necessidades da criança.",
  },
  {
    icon: Users,
    title: "Orientação Parental",
    description: "Apoio direto à família: como organizar rotina, lidar com comportamentos difíceis, telas, sono, regras e combinados.",
  },
  {
    icon: GraduationCap,
    title: "Núcleo de Dislexia",
    description: "Avaliação e intervenção completa para dislexia e transtornos de aprendizagem com apoio escolar.",
  },
  {
    icon: Crown,
    title: "Escola de Princesas/Príncipes",
    description: "Vivências de identidade, autoestima, etiqueta, habilidades sociais e valores para crianças.",
  },
  {
    icon: MessageCircle,
    title: "Grupos Terapêuticos",
    description: "Espaço seguro para trabalhar convivência, expressão emocional, cooperação e resolução de conflitos.",
  },
];

const Services = () => {
  const { content } = useContent();
  const [showAll, setShowAll] = useState(false);

  const data = content?.services || {
    subtitle: "Nossos Serviços",
    title: "Como Podemos Ajudar",
    description: "Oferecemos atendimentos...",
    featured: [],
    others: []
  };

  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-brand-orange-light blob animate-float pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-brand-blue-light blob-2 animate-float-delayed pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-body mb-4">
            {data.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Featured Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {data.featured.map((service: any, index: number) => {
            const Icon = iconMap[service.icon] || Brain;
            return (
              <div
                key={service.title}
                className="group relative bg-card rounded-3xl p-8 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Background decoration */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-brand-blue-light blob opacity-50 group-hover:scale-125 transition-transform duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-brand-blue-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 text-primary`} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle more services */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/5"
          >
            {showAll ? (
              <>
                Ver menos serviços <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Ver todos os serviços <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Other Services */}
        {showAll && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {data.others.map((service: any) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <div
                  key={service.title}
                  className="bg-card rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-display font-semibold text-foreground mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
