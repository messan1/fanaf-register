"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Qu'est-ce que la FANAF ?",
      answer: "La FANAF (Fédération des Sociétés d'Assurance de Droit National Africain) est une organisation panafricaine qui regroupe les sociétés d'assurance et de réassurance du continent africain. Elle œuvre pour le développement et la promotion de l'assurance en Afrique."
    },
    {
      question: "Quand et où se déroule l'événement ?",
      answer: "La 50ème Assemblée Générale de la FANAF se déroulera du 15 au 17 juin 2026 au SOFITEL Hôtel Ivoire à Abidjan, en Côte d'Ivoire."
    },
    {
      question: "Comment s'inscrire à l'événement ?",
      answer: "Vous pouvez vous inscrire en ligne via notre formulaire d'inscription disponible sur ce site. L'inscription est obligatoire et les places sont limitées."
    },
    {
      question: "Quels sont les frais d'inscription ?",
      answer: "Les frais d'inscription varient selon votre statut (membre FANAF, non-membre, étudiant). Consultez notre page d'inscription pour plus de détails."
    },
    {
      question: "Y a-t-il un programme spécifique ?",
      answer: "Oui, un programme détaillé sera disponible prochainement. Il comprendra des conférences plénières, des sessions parallèles, des ateliers et des événements de networking."
    },
    {
      question: "Quelles sont les langues de l'événement ?",
      answer: "L'événement se déroulera en français et en anglais avec traduction simultanée disponible."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={cn(integralCF.className, "text-3xl md:text-4xl lg:text-5xl mb-6")}>
            Questions Fréquentes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trouvez rapidement les réponses aux questions les plus courantes sur l'événement FANAF 2026
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <a 
            href="/contact" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Contactez-nous directement
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 