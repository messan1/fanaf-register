import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCheck, FaUsers, FaGraduationCap, FaUserPlus, FaCrown } from "react-icons/fa";

export default function RegistrationCTA() {
  const pricingPlans = [
    {
      id: "members",
      title: "Membres FANAF",
      price: "Gratuit",
      features: [
        "Accès à toutes les conférences",
        "Exposition commerciale",
        "Cocktails et networking",
        "Dîner gala du cinquantenaire",
        "Documentation complète",
        "Certificat de participation"
      ],
      popular: false
    },
    {
      id: "non-members",
      title: "Non-membres",
      price: "150 000 FCFA",
      features: [
        "Accès à toutes les conférences",
        "Exposition commerciale",
        "Cocktails et networking",
        "Dîner gala du cinquantenaire",
        "Documentation complète",
        "Certificat de participation"
      ],
      popular: false
    },
  ];

  const getIcon = (id: string) => {
    switch (id) {
      case "members": return <FaCrown className="text-3xl text-blue-600" />;
      case "non-members": return <FaUsers className="text-3xl text-green-600" />;
      case "students": return <FaGraduationCap className="text-3xl text-purple-600" />;
      case "accompanying": return <FaUserPlus className="text-3xl text-orange-600" />;
      default: return <FaUsers className="text-3xl text-blue-600" />;
    }
  };

  return (
    <section
      className="py-20 bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Formules d'inscription
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Choisissez la formule qui correspond à votre profil et bénéficiez d'un accès privilégié à l'événement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12 mx-40">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-lg border-2 ${
                plan.popular 
                  ? 'border-green-500 shadow-xl scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              } p-6`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommandé
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {getIcon(plan.id)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.title}
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {plan.price}
                </div>
                {plan.price !== "Gratuit" && (
                  <p className="text-sm text-gray-500">par personne</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/registration" className="block">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white font-semibold`}
                >
                  S'inscrire
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-blue-50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Informations importantes
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Conditions d'inscription :</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Inscription obligatoire avant le 31 décembre 2025</li>
                  <li>• Paiement en ligne sécurisé</li>
                  <li>• Confirmation par email</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Hébergement :</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Tarifs préférentiels à l'hôtel Sofitel</li>
                  <li>• Réservation via notre plateforme</li>
                  <li>• Transport aéroport-hôtel inclus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 