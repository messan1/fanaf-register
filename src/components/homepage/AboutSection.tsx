import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      className="py-20 bg-gray-50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Qu'est-ce que la FANAF ?</h2>
            <p className="text-lg text-gray-700 mb-4">
              La Fédération des Sociétés d'Assurances de Droit National Africaines, la <b>FANAF</b>, est une organisation professionnelle internationale qui s'est fixée comme objectif de promouvoir le développement de l'assurance en Afrique. Forte d'environ 210 membres à travers l'Afrique, elle œuvre à faire du secteur de l'industrie des assurances un acteur majeur du développement économique et social.
            </p>
            <ul className="list-disc pl-6 text-blue-900 mb-6 text-base">
              <li>210 membres à travers l'Afrique</li>
              <li>50 ans d'existence</li>
              <li>Un réseau d'experts et de partenaires</li>
            </ul>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/a-propos#presentation" className="text-blue-700 hover:underline font-medium">La Fédération : présentation</Link>
              <Link href="/a-propos#instances" className="text-blue-700 hover:underline font-medium">Les Instances de la FANAF</Link>
              <Link href="/partenaires" className="text-blue-700 hover:underline font-medium">Les Partenaires de la FANAF</Link>
              <Link href="/stats" className="text-blue-700 hover:underline font-medium">Les Statistiques de la FANAF</Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src="/images/header-homepage.png" alt="FANAF" className="rounded-2xl w-full max-w-xs shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
} 