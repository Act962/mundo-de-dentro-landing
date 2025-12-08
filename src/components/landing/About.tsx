import { Heart, Lightbulb, Users, Shield, Sparkles, Zap } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Ciência com Propósito",
    description: "Atuamos com rigor técnico e práticas baseadas em evidências.",
    color: "bg-brand-coral/20 text-primary",
  },
  {
    icon: Heart,
    title: "Acolhimento",
    description: "Escutamos cada história com empatia e respeito.",
    color: "bg-brand-lavender/30 text-secondary-foreground",
  },
  {
    icon: Sparkles,
    title: "Fé que Fortalece",
    description: "Reconhecemos a fé como força que sustenta jornadas.",
    color: "bg-brand-mint/30 text-accent-foreground",
  },
  {
    icon: Shield,
    title: "Ética e Sigilo",
    description: "Transparência e confidencialidade em todas as decisões.",
    color: "bg-brand-sky/30 text-foreground",
  },
  {
    icon: Users,
    title: "Interdisciplinaridade",
    description: "Caminhamos ao lado da escola, saúde e família.",
    color: "bg-brand-peach text-foreground",
  },
  {
    icon: Zap,
    title: "Inovação Responsável",
    description: "Tecnologia de forma criteriosa, segura e embasada.",
    color: "bg-brand-lavender/30 text-secondary-foreground",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-body mb-4">
            Sobre Nós
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Nossa História
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            O Instituto Mundo de Dentro surgiu da expansão natural de uma trajetória de 
            <strong className="text-foreground"> mais de 20 anos</strong> trabalhando com crianças, 
            adolescentes e famílias. Nascemos como evolução, integrando neuropsicologia avançada, 
            neurofeedback, psicologia infantojuvenil, psicopedagogia e serviços especializados 
            em transtornos de aprendizagem.
          </p>
        </div>

        {/* Philosophy */}
        <div className="bg-hero-gradient rounded-3xl p-8 md:p-12 mb-16 shadow-card relative overflow-hidden">
          <div className="absolute top-4 right-4 w-20 h-20 bg-brand-coral/20 blob animate-float" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-brand-mint/20 blob-2 animate-float-delayed" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Nossa Filosofia
            </h3>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Cada pessoa carrega um universo interno único, feito de emoções, memórias, 
              interesses, forças e dificuldades. O que vemos "por fora" — comportamento, 
              aprendizagem, atenção, socialização — é resultado desse <strong className="text-foreground">mundo de dentro</strong>.
              Por isso, nosso cuidado combina ciência, acolhimento e experiência encantadora, 
              sempre respeitando a singularidade de cada criança.
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
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="group p-6 bg-background rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <value.icon className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-display font-semibold text-foreground mb-2">
                {value.title}
              </h4>
              <p className="text-muted-foreground font-body">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Target audience */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent rounded-full">
            <Users className="w-5 h-5 text-accent-foreground" />
            <span className="font-body text-accent-foreground">
              Atendemos de <strong>1 a 99 anos</strong> — crianças, adolescentes, adultos e famílias
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
