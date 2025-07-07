import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Contact</h1>
        <p className="text-base text-blue-800 mb-6">Une question ? Besoin d'information ? Contactez-nous !</p>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-orange-600 mb-1">Email</h2>
          <p className="text-gray-800">fanaf@orange.sn</p>
          <p className="text-gray-800">fanaf2026@fanaf.org</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-orange-600 mb-1">Téléphone</h2>
          <p className="text-gray-800">+221 33 889 00 00</p>
          <p className="text-gray-800">+225 27 22 49 00 00</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-orange-600 mb-1">Adresse</h2>
          <p className="text-gray-800">Secrétariat Général FANAF<br />Dakar, Sénégal</p>
        </div>
      </div>
    </main>
  );
} 