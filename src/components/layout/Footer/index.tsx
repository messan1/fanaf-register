import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import Image from "next/image";
import NewsLetterSection from "./NewsLetterSection";
import LayoutSpacing from "./LayoutSpacing";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com/fanaf_org",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com/fanaf",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com/fanaf_org",
  },
  {
    id: 4,
    icon: <FaLinkedin />,
    url: "https://linkedin.com/company/fanaf",
  },
];

const paymentBadgesData: PaymentBadge[] = [
  {
    id: 1,
    srcUrl: "/icons/Visa.svg",
  },
  {
    id: 2,
    srcUrl: "/icons/mastercard.svg",
  },
  {
    id: 3,
    srcUrl: "/icons/paypal.svg",
  },
  {
    id: 4,
    srcUrl: "/icons/applePay.svg",
  },
  {
    id: 5,
    srcUrl: "/icons/googlePay.svg",
  },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="relative">
        <div className="absolute bottom-0 w-full h-1/2 bg-blue-50"></div>
        <div className="px-4">
          <NewsLetterSection />
        </div>
      </div>
      <div className="pt-8 md:pt-[50px] bg-blue-50 px-4 pb-4">
        <div className="max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-8">
            <div className="flex flex-col lg:col-span-3 lg:max-w-[248px]">
              <h1
                className={cn([
                  integralCF.className,
                  "text-[28px] lg:text-[32px] mb-6 text-blue-600",
                ])}
              >
                FANAF 2026
              </h1>
              <p className="text-gray-600 text-sm mb-9">
                50 ans au service de l'assurance africaine : Bilan, innovations et perspectives. 
                50ᵉ Assemblée Générale à Abidjan, Côte d'Ivoire.
              </p>
              <div className="flex items-center">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="bg-white hover:bg-blue-600 hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center p-1.5"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid col-span-9 lg:grid-cols-4 lg:pl-10">
              <LinksSection />
            </div>
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4">
              <LinksSection />
            </div>
          </nav>

          <hr className="h-[1px] border-t-gray-300 mb-6" />
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-2">
            <p className="text-sm text-center sm:text-left text-gray-600 mb-4 sm:mb-0 sm:mr-1">
              FANAF 2026 © Fédération des Sociétés d'Assurances de Droit National Africaines
            </p>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                📧 fanaf@orange.sn
              </div>
              <div className="text-sm text-gray-600">
                📍 Dakar, Sénégal
              </div>
            </div>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
