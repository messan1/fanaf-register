import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function IntroEditionSection() {
  return (
    <section>
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          {/* Visuel/vidéo */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="relative w-full max-w-xs md:max-w-sm rounded-2xl overflow-hidden shadow-lg mb-6">
              <Image
                src="/images/dress-style-1.png"
                alt="Ambiance FANAF 2026"
                width={350}
                height={220}
                className="object-cover w-full h-56 md:h-64"
              />
              <button className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/80 rounded-full p-3 shadow-lg">
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="16" fill="#F59E42" />
                    <polygon points="13,11 23,16 13,21" fill="white" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="text-center md:text-left text-blue-900 font-bold text-lg">
              1300+ participants attendus
            </div>
          </div>
          {/* Texte + bouton */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              LA FANAF 2026
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Bien plus qu'un simple cadre de concertation, une édition spéciale !!!
            </p>
            <p className="text-gray-600 mb-8">
              La FANAF fête son cinquantenaire avec une édition exceptionnelle à Abidjan. Un programme riche, des intervenants de renom, des moments de networking inédits et un dîner gala du cinquantenaire. Rejoignez-nous pour célébrer 50 ans d'innovation et de solidarité dans l'assurance africaine !
            </p>
            <Link href="/programme">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold">
                Découvrir le programme
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 