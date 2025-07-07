import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PartenairesPage() {
  return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Partenaires</h1>
        <p className="text-base text-blue-800 mb-6">Merci à nos partenaires pour leur soutien à la 50ᵉ Assemblée Générale de la FANAF.</p>
        <ul className="list-disc pl-6 text-gray-800 space-y-1">
          <li>Allianz Africa</li>
          <li>AXA Africa</li>
          <li>NSIA Assurance</li>
          <li>Sanlam</li>
          <li>Mutualité Générale</li>
          <li>Saham Assurance</li>
        </ul>
      </div>
    </main>
  );
} 