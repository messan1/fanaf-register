import React from "react";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";

const StatsSection = () => {
  const stats = [
    {
      number: "50",
      label: "Années d'excellence",
      description: "Cinquante ans au service de l'assurance africaine"
    },
    {
      number: "25+",
      label: "Pays membres",
      description: "Couverture panafricaine de la FANAF"
    },
    {
      number: "200+",
      label: "Sociétés d'assurance",
      description: "Membres actifs de la fédération"
    },
    {
      number: "500+",
      label: "Participants attendus",
      description: "Pour cette assemblée générale exceptionnelle"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-blue-900 text-white">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={cn(integralCF.className, "text-3xl md:text-4xl lg:text-5xl mb-6")}>
            Chiffres Clés
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Découvrez les statistiques qui témoignent de l'importance et de l'impact de la FANAF
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-blue-800/50 hover:bg-blue-800/70 transition-colors">
              <div className="text-4xl md:text-5xl font-bold text-blue-200 mb-3">
                {stat.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
              <p className="text-blue-100 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 