import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IntervenantsPage() {
  return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Intervenants</h1>
        <p className="text-base text-blue-800 mb-6">Découvrez les experts et leaders présents lors de l'événement.</p>
        <section id="conferenciers" className="mb-10">
          <h2 className="text-xl font-semibold text-orange-600 mb-2">Conférenciers</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Dr. Aminata Diallo – Présidente de la FANAF</li>
            <li>M. Jean-Pierre Koné – Directeur Général, Allianz Côte d'Ivoire</li>
            <li>Mme. Fatou Ndiaye – Experte en Assurance Inclusive, Banque Mondiale</li>
            <li>Dr. Kwame Asante – Spécialiste Digitalisation, African Development Bank</li>
            <li>M. Pierre Moussa – Directeur Technique, NSIA Assurance</li>
            <li>Mme. Sarah Johnson – Responsable Innovation, Sanlam</li>
          </ul>
        </section>
        <section id="moderateurs">
          <h2 className="text-xl font-semibold text-orange-600 mb-2">Modérateurs</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>M. Abdoulaye Diop – Modérateur principal</li>
            <li>Mme. Awa Traoré – Modératrice, experte secteur assurance</li>
            <li>M. Samuel Kouassi – Journaliste économique</li>
          </ul>
        </section>
      </div>
    </main>
  );
} 