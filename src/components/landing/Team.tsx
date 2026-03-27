import { User } from "lucide-react";
import { useContent } from "@/hooks/useContent";

// Import team photos
import talitaPhoto from "@/assets/team/talita-iglesias.jpg";
import mauraPhoto from "@/assets/team/maura-gisele.jpg";
import simonePhoto from "@/assets/team/simone-rodrigues.jpg";
import isadoraPhoto from "@/assets/team/isadora.jpg";

import moisesPhoto from "@/assets/team/moises-rego.jpg";
import kennyaPhoto from "@/assets/team/kennya-martins.jpg";

const teamMembers = [
  {
    name: "Dra. Kennya Martins",
    role: "Psicóloga e Neuropsicóloga",
    specialties: ["Neurofeedback", "Psicologia Infantil", "Avaliação Neuropsicológica"],
    isLeader: true,
    photo: kennyaPhoto,
  },
  {
    name: "Talita Iglesias",
    role: "Psicóloga e Neuropsicóloga",
    specialties: ["Neuropsicologia", "Avaliação"],
    photo: talitaPhoto,
  },
  {
    name: "Cecilia Sardinha",
    role: "Psicóloga",
    specialties: ["Orientação Parental"],
    photo: null,
  },
  {
    name: "Maura Gisele",
    role: "Pedagoga e Neuropsicopedagoga",
    specialties: ["Neuropsicopedagogia"],
    photo: mauraPhoto,
  },
  {
    name: "Simone Rodrigues",
    role: "Recepcionista",
    specialties: ["Recepção"],
    photo: simonePhoto,
  },
  {
    name: "Isadora",
    role: "Recepcionista",
    specialties: ["Recepção"],
    photo: isadoraPhoto,
  },
  {
    name: "Moisés Rêgo",
    role: "Tutor",
    specialties: ["Sala de Estudo Assistido"],
    photo: moisesPhoto,
  },
];

const Team = () => {
  const { content } = useContent();
  const data = content?.team || {
    subtitle: "Nossa Equipe",
    title: "Profissionais Dedicados",
    description: "Uma equipe multidisciplinar...",
    members: []
  };

  return (
    <section id="team" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-24 h-24 bg-brand-blue-light blob animate-float pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-20 h-20 bg-brand-orange-light blob-2 animate-float-delayed pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-body mb-4">
            {data.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.members.map((member: any, index: number) => (
            <div
              key={member.name}
              className={`group bg-card rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-2 ${
                member.isLeader ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Photo */}
              <div className="relative mb-6">
                {member.photo ? (
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden group-hover:scale-105 transition-transform">
                    <img 
                      src={member.photo.startsWith('http') || member.photo.startsWith('/') ? member.photo : `http://localhost:3001${member.photo}`} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className={`w-24 h-24 mx-auto rounded-full ${
                    member.isLeader ? "bg-primary/20" : "bg-muted"
                  } flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <User className={`w-12 h-12 ${
                      member.isLeader ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                )}
                {member.isLeader && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">★</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-body text-sm mb-3">
                  {member.role}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.specialties?.map((specialty: string) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground font-body"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
