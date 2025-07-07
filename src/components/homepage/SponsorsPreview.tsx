
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHandshake, FaMedal, FaStar, FaGem } from "react-icons/fa";

export default function SponsorsPreview() {
  const sponsors = {
    official: [
      { id: "sofitel", name: "Sofitel Hôtel Ivoire", logo: "/images/sofitel-logo.png", category: "Partenaire Officiel" },
      { id: "bad", name: "Banque Africaine de Développement", logo: "/images/bad-logo.png", category: "Partenaire Institutionnel" }
    ],
    gold: [
      { id: "allianz", name: "Allianz Africa", logo: "/images/allianz-logo.png" },
      { id: "axa", name: "AXA Africa", logo: "/images/axa-logo.png" },
      { id: "sanlam", name: "Sanlam", logo: "/images/sanlam-logo.png" }
    ],
    silver: [
      { id: "nsia", name: "NSIA Assurance", logo: "/images/nsia-logo.png" },
      { id: "atlantique", name: "Atlantique Assurances", logo: "/images/atlantique-logo.png" },
      { id: "allianz-ci", name: "Allianz Côte d'Ivoire", logo: "/images/allianz-ci-logo.png" },
      { id: "axa-ci", name: "AXA Côte d'Ivoire", logo: "/images/axa-ci-logo.png" }
    ],
    bronze: [
      { id: "saham", name: "Saham Assurance", logo: "/images/saham-logo.png" },
      { id: "gulf", name: "Gulf Insurance", logo: "/images/gulf-logo.png" },
      { id: "african-re", name: "African Reinsurance", logo: "/images/african-re-logo.png" },
      { id: "cica-re", name: "CICA Re", logo: "/images/cica-re-logo.png" },
      { id: "zep-re", name: "ZEP-RE", logo: "/images/zep-re-logo.png" }
    ]
  };

  const socialLinks = [
    { id: "facebook", icon: "Facebook", href: "#" },
    { id: "twitter", icon: "Twitter", href: "#" },
    { id: "linkedin", icon: "LinkedIn", href: "#" },
    { id: "instagram", icon: "Instagram", href: "#" }
  ];

  return (
    <section
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos partenaires et sponsors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les organisations qui soutiennent la 50ème Assemblée Générale FANAF
          </p>
        </div>

        {/* Official Partners */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaHandshake className="text-3xl text-blue-600" />
              <h3 className="text-2xl font-bold text-blue-900">Partenaires Officiels</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {sponsors.official.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="h-20 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-600">{sponsor.name}</span>
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">{sponsor.name}</h4>
                <p className="text-sm text-blue-600">{sponsor.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaMedal className="text-3xl text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-900">Sponsors Or</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sponsors.gold.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="h-16 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">{sponsor.name}</span>
                </div>
                <h4 className="font-medium text-gray-900">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaStar className="text-2xl text-gray-400" />
              <h3 className="text-lg font-bold text-gray-900">Sponsors Argent</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {sponsors.silver.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="h-12 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-600">{sponsor.name}</span>
                </div>
                <h4 className="text-sm font-medium text-gray-900">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Bronze Sponsors */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaGem className="text-2xl text-orange-600" />
              <h3 className="text-lg font-bold text-gray-900">Sponsors Bronze</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {sponsors.bronze.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className="bg-white rounded-lg p-3 shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="h-10 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-600">{sponsor.name}</span>
                </div>
                <h4 className="text-xs font-medium text-gray-900">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/partenaires">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full">
              Devenir partenaire
            </Button>
          </Link>
          <p className="text-gray-600 mt-4">
            Rejoignez nos partenaires et bénéficiez d'une visibilité exceptionnelle
          </p>
        </div>
      </div>
    </section>
  );
} 