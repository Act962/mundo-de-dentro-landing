import { AlertCircle, BookOpen, Brain, Heart, Lightbulb, Users } from "lucide-react";

const approaches = [
  {
    icon: Heart,
    title: "Psicologia Infantil",
    description: "Ajuda a criança a entender emoções, melhorar comportamentos e desenvolver habilidades sociais por meio de brincadeiras e atividades lúdicas.",
  },
  {
    icon: Brain,
    title: "Neuropsicologia",
    description: "Mostra como a criança funciona por dentro: atenção, memória, linguagem, raciocínio, organização, comportamento e aprendizagem.",
  },
  {
    icon: Lightbulb,
    title: "Neurofeedback",
    description: "Treina o cérebro, como uma academia mental. A criança aprende a se concentrar melhor, controlar ansiedade e reduzir impulsividade.",
  },
  {
    icon: BookOpen,
    title: "Sala de Estudo",
    description: "Ajuda a criança com TDAH ou dificuldades escolares a organizar cadernos, realizar tarefas, se concentrar e criar rotina.",
  },
  {
    icon: Users,
    title: "Orientação Parental",
    description: "Apoio direto à família: como organizar rotina, lidar com comportamentos difíceis, telas, sono, regras e combinados.",
  },
];

const warningSignals = [
  "Dificuldade de concentração e atenção nas atividades",
  "Problemas de comportamento em casa ou na escola",
  "Dificuldades na leitura, escrita ou matemática",
  "Ansiedade, medos ou mudanças de humor frequentes",
  "Dificuldade em fazer amigos ou manter relacionamentos",
  "Agitação excessiva ou dificuldade em ficar parado",
  "Resistência para ir à escola ou fazer tarefas",
  "Baixa autoestima ou falta de motivação",
];

const ParentsSection = () => {
  return (
    <section id="parents" className="py-20 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-5 w-20 h-20 bg-brand-mint/20 blob animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-28 h-28 bg-brand-coral/20 blob-2 animate-float-delayed pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-accent rounded-full text-accent-foreground text-sm font-body mb-4">
            Para Pais e Responsáveis
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Entendendo Cada Abordagem
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Sabemos que pode ser difícil entender as diferentes abordagens. 
            Preparamos explicações simples para ajudar você.
          </p>
        </div>

        {/* Approaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {approaches.map((approach, index) => (
            <div
              key={approach.title}
              className="bg-background rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <approach.icon className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {approach.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {approach.description}
              </p>
            </div>
          ))}
        </div>

        {/* Warning Signals */}
        <div className="bg-hero-gradient rounded-3xl p-8 md:p-12 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground">
              Sinais de Alerta
            </h3>
          </div>
          
          <p className="text-muted-foreground font-body mb-6">
            Alguns sinais podem indicar que seu filho(a) pode se beneficiar de uma avaliação:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warningSignals.map((signal, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-card/80 rounded-xl p-4"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-foreground font-body">{signal}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-muted-foreground font-body">
            Se você identificou algum desses sinais, <strong className="text-foreground">estamos aqui para ajudar</strong>. 
            Entre em contato para uma conversa inicial sem compromisso.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ParentsSection;
