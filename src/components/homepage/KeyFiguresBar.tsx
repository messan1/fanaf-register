
import { FaGlobeAfrica, FaUsers, FaBuilding, FaCalendarAlt, FaStoreAlt, FaUtensils, FaStar } from "react-icons/fa";

export default function KeyFiguresBar() {
  const figures = [
    { id: "countries", value: "54", label: "pays représentés" },
    { id: "participants", value: "1300+", label: "participants attendus" },
    { id: "companies", value: "80", label: "sociétés d'assurance & réassurance" },
    { id: "days", value: "3", label: "jours de conférences" },
    { id: "stands", value: "60+", label: "stands d'exposition" },
    { id: "gala", value: "1", label: "dîner gala du cinquantenaire" },
    { id: "rating", value: "4.8/5", label: "Avis des participants" },
  ];

  const getIcon = (id: string) => {
    switch (id) {
      case "countries": return <FaGlobeAfrica className="text-2xl text-blue-200" />;
      case "participants": return <FaUsers className="text-2xl text-blue-200" />;
      case "companies": return <FaBuilding className="text-2xl text-blue-200" />;
      case "days": return <FaCalendarAlt className="text-2xl text-blue-200" />;
      case "stands": return <FaStoreAlt className="text-2xl text-blue-200" />;
      case "gala": return <FaUtensils className="text-2xl text-blue-200" />;
      case "rating": return <FaStar className="text-2xl text-yellow-400" />;
      default: return <FaGlobeAfrica className="text-2xl text-blue-200" />;
    }
  };

  return (
    <section
      className="bg-blue-900 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8">
        {figures.map((fig) => (
          <div key={fig.id} className="flex flex-col items-center min-w-[120px]">
            <div className="mb-1">{getIcon(fig.id)}</div>
            <span className="text-2xl md:text-3xl font-bold text-blue-100">{fig.value}</span>
            <span className="text-xs md:text-sm text-blue-100 text-center">{fig.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 