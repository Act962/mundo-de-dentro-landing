import { Heart, Lightbulb, Users, Shield, Sparkles, Zap } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const iconMap: Record<string, any> = {
  Heart, Lightbulb, Users, Shield, Sparkles, Zap
};

const values = [
  {
    icon: Lightbulb,
    title: "Ciência com Propósito",
    description: "Atuamos com rigor técnico e práticas baseadas em evidências.",
    color: "bg-brand-blue-light text-primary",
  },
  {
    icon: Heart,
    title: "Acolhimento",
    description: "Escutamos cada história com empatia e respeito.",
    color: "bg-brand-red-light text-secondary",
  },
  {
    icon: Sparkles,
    title: "Fé que Fortalece",
    description: "Reconhecemos a fé como força que sustenta jornadas.",
    color: "bg-brand-orange-light text-accent",
  },
  {
    icon: Shield,
    title: "Ética e Sigilo",
    description: "Transparência e confidencialidade em todas as decisões.",
    color: "bg-brand-blue-light text-primary",
  },
  {
    icon: Users,
    title: "Interdisciplinaridade",
    description: "Caminhamos ao lado da escola, saúde e família.",
    color: "bg-brand-red-light text-secondary",
  },
  {
    icon: Zap,
    title: "Inovação Responsável",
    description: "Tecnologia de forma criteriosa, segura e embasada.",
    color: "bg-brand-orange-light text-accent",
  },
];

const About = () => {
  const { content } = useContent();
  const data = content?.about || {
    subtitle: "Sobre Nós",
    title: "Nossa História",
    description: "O Instituto Mundo de Dentro surgiu...",
    philosophy_title: "Nossa Filosofia",
    philosophy_description: "Cada pessoa carrega um universo interno único...",
    values: [],
    target_audience: "Atendemos de 1 a 99 anos — crianças, adolescentes, adultos e famílias"
  };

  const valuesData = data.values.length > 0 ? data.values : [
    { title: "Ciência com Propósito", description: "...", icon: "Lightbulb" },
    // ... initial values
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-body mb-4">
            {data.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Philosophy */}
        <div className="bg-hero-gradient rounded-3xl p-8 md:p-12 mb-16 shadow-card relative overflow-hidden">
          <div className="absolute top-4 right-4 w-20 h-20 bg-brand-blue-light blob animate-float" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-brand-orange-light blob-2 animate-float-delayed" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              {data.philosophy_title}
            </h3>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              {data.philosophy_description}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Nossos Valores
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.values.map((value: any, index: number) => {
            const Icon = iconMap[value.icon] || Lightbulb;
            return (
              <div 
                key={value.title}
                className="group p-6 bg-background rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-brand-blue-light text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-display font-semibold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-muted-foreground font-body">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Target audience */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent rounded-full">
            <Users className="w-5 h-5 text-accent-foreground" />
            <span className="font-body text-accent-foreground">
              {data.target_audience}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
