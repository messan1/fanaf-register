import React from 'react';

export default function GallerySection() {
  return (
    <section className="w-full bg-[#0B0C10] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Titre principal */}
        <div className="mb-16">
          <p className="text-white text-sm font-medium mb-4 tracking-wide">
            Edition Anniversaire - FANAF 2026
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
            Plongez dans<br />
            l'ambiance de la<br />
            FANAF 2026 !
          </h1>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Bloc gauche : 2 images carrées */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            {/* Image 1 : Personne avec ordinateur portable */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/pic1.png" 
                alt="Personne travaillant sur ordinateur portable lors d'une conférence"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 : Salle de conférence avec audience */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/pic2.png" 
                alt="Salle de conférence FANAF avec audience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bloc droite : grande image verticale + contenu */}
          <div className="flex flex-col w-full lg:w-1/2 gap-8">
            {/* Image principale : 3 personnes en networking */}
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/pic3.png" 
                alt="Participants FANAF 2026 en situation de networking"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Texte et bouton */}
            <div className="text-white space-y-6">
              <p className="text-lg leading-relaxed text-gray-300">
                Visionnez notre vidéo officielle et découvrez l'esprit de partage, d'innovation et de fraternité qui animera cette édition anniversaire.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Vidéo officielle FANAF 2026
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}