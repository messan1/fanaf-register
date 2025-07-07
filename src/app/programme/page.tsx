import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProgrammePage() {
  const programme = [
    {
      jour: "Jour 1 - 15 Juin 2026",
      theme: "Ouverture et Bilan",
      sessions: [
        {
          heure: "08:00 - 09:00",
          titre: "Accueil et enregistrement",
          type: "Accueil",
          salle: "Hall principal"
        },
        {
          heure: "09:00 - 10:30",
          titre: "Cérémonie d'ouverture officielle",
          type: "Plénière",
          salle: "Grand Auditorium",
          description: "Discours d'ouverture, allocutions officielles et présentation du thème"
        },
        {
          heure: "10:30 - 11:00",
          titre: "Pause café",
          type: "Networking",
          salle: "Espace networking"
        },
        {
          heure: "11:00 - 12:30",
          titre: "50 ans de FANAF : Bilan et réalisations",
          type: "Conférence",
          salle: "Grand Auditorium",
          description: "Rétrospective des 50 années d'existence et des principales réalisations"
        },
        {
          heure: "12:30 - 14:00",
          titre: "Déjeuner",
          type: "Repas",
          salle: "Restaurant"
        },
        {
          heure: "14:00 - 15:30",
          titre: "L'évolution du marché de l'assurance africain",
          type: "Panel",
          salle: "Grand Auditorium",
          description: "Analyse des tendances et perspectives du secteur"
        },
        {
          heure: "15:30 - 16:00",
          titre: "Pause café",
          type: "Networking",
          salle: "Espace networking"
        },
        {
          heure: "16:00 - 17:30",
          titre: "Ateliers parallèles",
          type: "Ateliers",
          salle: "Salles A, B, C",
          description: "Sessions spécialisées par thématique"
        },
        {
          heure: "18:00 - 20:00",
          titre: "Cocktail de bienvenue",
          type: "Networking",
          salle: "Terrasse"
        }
      ]
    },
    {
      jour: "Jour 2 - 16 Juin 2026",
      theme: "Innovation et Digitalisation",
      sessions: [
        {
          heure: "08:30 - 10:00",
          titre: "L'IA et l'assurance : Opportunités et défis",
          type: "Conférence",
          salle: "Grand Auditorium",
          description: "Impact de l'intelligence artificielle sur le secteur"
        },
        {
          heure: "10:00 - 10:30",
          titre: "Pause café",
          type: "Networking",
          salle: "Espace networking"
        },
        {
          heure: "10:30 - 12:00",
          titre: "Blockchain et assurance : Cas d'usage concrets",
          type: "Panel",
          salle: "Grand Auditorium",
          description: "Applications pratiques de la blockchain"
        },
        {
          heure: "12:00 - 13:30",
          titre: "Déjeuner",
          type: "Repas",
          salle: "Restaurant"
        },
        {
          heure: "13:30 - 15:00",
          titre: "Cybersécurité dans l'assurance",
          type: "Atelier",
          salle: "Salle A",
          description: "Protection des données et gestion des risques cyber"
        },
        {
          heure: "15:00 - 15:30",
          titre: "Pause café",
          type: "Networking",
          salle: "Espace networking"
        },
        {
          heure: "15:30 - 17:00",
          titre: "InsurTech : Les nouvelles tendances",
          type: "Panel",
          salle: "Grand Auditorium",
          description: "Innovation technologique dans l'assurance"
        },
        {
          heure: "17:00 - 18:30",
          titre: "Networking libre",
          type: "Networking",
          salle: "Espace networking"
        }
      ]
    },
    {
      jour: "Jour 3 - 17 Juin 2026",
      theme: "Perspectives et Clôture",
      sessions: [
        {
          heure: "08:30 - 10:00",
          titre: "Assurance inclusive : Défis et solutions",
          type: "Conférence",
          salle: "Grand Auditorium",
          description: "Développement de l'assurance pour tous"
        },
        {
          heure: "10:00 - 10:30",
          titre: "Pause café",
          type: "Networking",
          salle: "Espace networking"
        },
        {
          heure: "10:30 - 12:00",
          titre: "Financement de l'économie africaine",
          type: "Panel",
          salle: "Grand Auditorium",
          description: "Rôle de l'assurance dans le développement économique"
        },
        {
          heure: "12:00 - 13:30",
          titre: "Déjeuner",
          type: "Repas",
          salle: "Restaurant"
        },
        {
          heure: "13:30 - 15:00",
          titre: "Assemblée Générale FANAF",
          type: "AG",
          salle: "Grand Auditorium",
          description: "Session réservée aux membres FANAF"
        },
        {
          heure: "15:00 - 15:30",
          titre: "Pause café",
          type: "Networking",
          salle: "Espace networking"
        },
        {
          heure: "15:30 - 17:00",
          titre: "Cérémonie de clôture",
          type: "Plénière",
          salle: "Grand Auditorium",
          description: "Discours de clôture et annonces importantes"
        },
        {
          heure: "17:00 - 19:00",
          titre: "Cocktail de clôture",
          type: "Networking",
          salle: "Terrasse"
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Plénière': return 'bg-blue-100 text-blue-800';
      case 'Conférence': return 'bg-green-100 text-green-800';
      case 'Panel': return 'bg-purple-100 text-purple-800';
      case 'Atelier': return 'bg-orange-100 text-orange-800';
      case 'AG': return 'bg-red-100 text-red-800';
      case 'Networking': return 'bg-gray-100 text-gray-800';
      case 'Repas': return 'bg-yellow-100 text-yellow-800';
      case 'Accueil': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Programme</h1>
        <p className="text-base text-blue-800 mb-6">Retrouvez ici le déroulé de la 50ᵉ Assemblée Générale de la FANAF.</p>
        <section id="plenieres" className="mb-10">
          <h2 className="text-xl font-semibold text-orange-600 mb-2">Plénières</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Ouverture officielle et discours de bienvenue</li>
            <li>Table ronde : 50 ans d'assurance en Afrique</li>
            <li>Débat : Les nouveaux défis du secteur</li>
            <li>Session questions/réponses avec les experts</li>
          </ul>
        </section>
        <section id="ateliers">
          <h2 className="text-xl font-semibold text-orange-600 mb-2">Ateliers</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Atelier 1 : Digitalisation de l'assurance</li>
            <li>Atelier 2 : Assurance inclusive</li>
            <li>Atelier 3 : Gestion des risques émergents</li>
            <li>Atelier 4 : Financement et innovation</li>
          </ul>
        </section>
      </div>
    </main>
  );
} 