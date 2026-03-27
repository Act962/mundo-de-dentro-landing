import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/hooks/useContent";

import espaco28 from "@/assets/espaco-28.jpg";
import espaco35 from "@/assets/espaco-35.jpg";
import espaco45 from "@/assets/espaco-45.jpg";
import espaco58 from "@/assets/espaco-58.jpg";
import espaco62 from "@/assets/espaco-62.jpg";
import espaco66 from "@/assets/espaco-66.jpg";

const photos = [
  { src: espaco28, alt: "Sala infantil com mesa e brinquedos", label: "Sala Lúdica" },
  { src: espaco35, alt: "Sala de atividades em grupo com mesa laranja", label: "Sala de Grupo" },
  { src: espaco45, alt: "Consultório temático com decoração náutica", label: "Consultório" },
  { src: espaco58, alt: "Sala de neurofeedback com estações individuais", label: "Neurofeedback" },
  { src: espaco62, alt: "Consultório com ambiente acolhedor e sofás", label: "Consultório" },
  { src: espaco66, alt: "Entrada temática Mundo de Dentro", label: "Recepção" },
];

const Gallery = () => {
  const { content } = useContent();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const data = content?.gallery || {
    subtitle: "Nosso Espaço",
    title: "Conheça Nossa Estrutura",
    description: "Ambientes planejados...",
    photos: []
  };

  const images = data.photos.length > 0 ? data.photos : photos;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % images.length);
  };
  const goPrev = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  return (
    <section id="galeria" className="py-20 bg-brand-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-orange-light text-accent px-4 py-2 rounded-full text-sm font-semibold font-display mb-4">
            <Camera className="w-4 h-4" />
            {data.subtitle}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {data.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            {data.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
          {images.map((photo: any, index: number) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 text-sm font-display font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Fechar"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Próximo"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-6 text-white/70 text-sm font-body">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
