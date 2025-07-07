import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos de la FANAF
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez l'histoire, la mission et les réalisations de la Fédération 
              des Sociétés d'Assurances de Droit National Africaines
            </p>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  La <strong>FANAF</strong> a été créée le <strong>17 mars 1976 à Yamoussoukro, Côte d'Ivoire</strong>, 
                  lors d'une assemblée constitutive qui a réuni les représentants de plusieurs 
                  sociétés d'assurances africaines.
                </p>
                <p>
                  Cette création s'inscrivait dans le contexte de l'émergence des nations africaines 
                  et de leur volonté de développer des institutions continentales fortes pour 
                  accompagner leur développement économique.
                </p>
                <p>
                  Depuis sa création, la FANAF n'a cessé de grandir et de se renforcer, 
                  passant de quelques sociétés fondatrices à plus de 200 membres aujourd'hui, 
                  représentant 29 pays africains.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-4">1976</div>
                <div className="text-xl font-semibold text-blue-800 mb-2">
                  Année de création
                </div>
                <div className="text-blue-600">
                  Yamoussoukro, Côte d'Ivoire
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission et Objectifs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre Mission et Nos Objectifs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La FANAF s'engage à promouvoir et développer le secteur de l'assurance en Afrique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Promouvoir
              </h3>
              <p className="text-gray-600">
                Le développement de l'assurance en Afrique et renforcer sa contribution 
                au développement économique du continent
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Renforcer
              </h3>
              <p className="text-gray-600">
                La solidarité entre les sociétés membres et favoriser les échanges 
                d'expériences et de bonnes pratiques
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Défendre
              </h3>
              <p className="text-gray-600">
                Les intérêts communs du secteur face aux autorités de régulation 
                et aux partenaires internationaux
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Former
              </h3>
              <p className="text-gray-600">
                Développer la formation technique, la gestion des risques, 
                l'innovation et la digitalisation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gouvernance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Gouvernance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La FANAF est dirigée par des instances élues démocratiquement 
              par ses membres
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">AG</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Assemblée Générale
              </h3>
              <p className="text-gray-600">
                Instance suprême qui se réunit chaque année pour définir 
                les orientations stratégiques
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">CA</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Conseil d'Administration
              </h3>
              <p className="text-gray-600">
                Organe exécutif élu par l'Assemblée Générale pour gérer 
                les affaires courantes
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">SG</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secrétariat Général
              </h3>
              <p className="text-gray-600">
                Organe permanent basé à Dakar qui assure la coordination 
                et l'exécution des décisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Rejoignez la FANAF
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Devenez membre de la plus importante fédération d'assurance d'Afrique 
            et participez au développement du secteur
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registration">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                S'inscrire à FANAF 2026
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 