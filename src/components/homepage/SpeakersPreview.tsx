import React from "react";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SpeakersPreview = () => {
  const speakers = [
    {
      name: "Dr. Jean-Pierre Ombé",
      title: "Président de la FANAF",
      company: "FANAF",
      image: "/images/speaker1.jpg"
    },
    {
      name: "Mme. Fatou Diallo",
      title: "Directrice Générale",
      company: "Assurance Afrique",
      image: "/images/speaker2.jpg"
    },
    {
      name: "Prof. Kwame Nkrumah",
      title: "Expert en Assurance",
      company: "Université d'Abidjan",
      image: "/images/speaker3.jpg"
    },
    {
      name: "M. Pierre Dubois",
      title: "Consultant International",
      company: "Dubois Consulting",
      image: "/images/speaker4.jpg"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={cn(integralCF.className, "text-3xl md:text-4xl lg:text-5xl mb-6")}>
            Intervenants de Prestige
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez les experts et leaders qui interviendront lors de cette assemblée générale exceptionnelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl text-gray-500">👤</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{speaker.name}</h3>
              <p className="text-blue-600 font-medium mb-1">{speaker.title}</p>
              <p className="text-gray-600 text-sm">{speaker.company}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/intervenants">
            <Button size="lg" className="text-lg px-8 py-4">
              Voir tous les intervenants
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpeakersPreview; 