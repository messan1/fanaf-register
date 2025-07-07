import React from "react";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EventHighlights = () => {
  const highlights = [
    {
      icon: "🎯",
      title: "Conférences Plénières",
      description: "Sessions plénières avec des experts internationaux de l'assurance"
    },
    {
      icon: "🤝",
      title: "Networking",
      description: "Opportunités de rencontres avec les leaders de l'assurance africaine"
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Présentation des dernières innovations technologiques du secteur"
    },
    {
      icon: "🏆",
      title: "Cérémonie",
      description: "Célébration des 50 ans de la FANAF avec remise de prix"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={cn(integralCF.className, "text-3xl md:text-4xl lg:text-5xl mb-6")}>
            Points Forts de l'Événement
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez les moments clés qui feront de cette assemblée générale un événement exceptionnel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="text-4xl mb-4">{highlight.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
              <p className="text-gray-600">{highlight.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/programme">
            <Button size="lg" className="text-lg px-8 py-4">
              Voir le programme complet
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventHighlights; 