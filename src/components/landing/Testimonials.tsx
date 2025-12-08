import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    text: "O atendimento foi transformador para minha filha. Ela desenvolveu muito a autoestima e hoje enfrenta os desafios da escola com mais confiança.",
    author: "Mãe da Maria, 8 anos",
    rating: 5,
  },
  {
    text: "A avaliação neuropsicológica nos deu clareza sobre as dificuldades do nosso filho. A equipe foi muito acolhedora e profissional.",
    author: "Pai do João, 10 anos",
    rating: 5,
  },
  {
    text: "O neurofeedback mudou a rotina de casa. Meu filho está mais focado e menos ansioso. Recomendo muito!",
    author: "Mãe do Pedro, 12 anos",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-brand-coral/10 blob animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-24 h-24 bg-brand-mint/20 blob-2 animate-float-delayed pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-body mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            O Que as Famílias Dizem
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Histórias reais de famílias que encontraram apoio e transformação conosco.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-3xl p-8 shadow-card hover:shadow-soft transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 pt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground font-body leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <p className="text-muted-foreground font-body text-sm">
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>

        {/* Note about privacy */}
        <p className="text-center text-muted-foreground/70 text-sm font-body mt-8">
          * Os depoimentos são anônimos para proteger a privacidade das famílias.
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
