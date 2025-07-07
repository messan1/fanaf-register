import Image from "next/image";

const partners = [
  { name: "Nescafé", logo: "/images/nescafe-logo.png" },
  { name: "Intel", logo: "/images/intel-logo.png" },
  { name: "Gillette", logo: "/images/gillette-logo.png" },
  { name: "Netflix", logo: "/images/netflix-logo.png" },
  { name: "Acer", logo: "/images/acer-logo.png" },
];

export default function PremiumPartnersBar() {
  return (
    <section>
      <div className="bg-orange-400 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8">
          {partners.map((p, idx) => (
            <div key={idx} className="flex items-center justify-center h-12">
              <Image
                src={p.logo}
                alt={p.name}
                width={100}
                height={48}
                className="object-contain h-12 w-auto grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 