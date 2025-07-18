import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export const SelectionCard = ({
  isMember,
  title,
}: {
  isMember?: boolean;
  title: string;
}) => {
  const router = useRouter();
  const [registrationType, setRegistrationType] = useQueryState("type",{defaultValue:"member"});

  return (
    <div className="bg-white rounded-3xl p-8 px-12 flex-1 shadow-2xl max-w-2xl">
      <div className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-gray-900 text-md font-medium tracking-wide uppercase">
            {title}
          </h3>
          <p className="text-gray-600 text-md leading-relaxed">
            Our meetings provide a platform for trust-based engagement, robust
            debate and public-facing dialogue.
          </p>
        </div>

        <button
          onClick={() => {
            if (isMember) {
              router.push("/register/member?type="+registrationType);
              return;
            } else {
              router.push("/register/group?type="+registrationType);
              return
            }
          }}
          className={`group flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-full transition-all duration-300 font-medium ${
            !isMember && "!bg-black text-white"
          }`}
        >
          <span>Continuer</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
