import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import LayoutWrapper from "@/app/LayoutWrapper";

export const metadata: Metadata = {
  title: "FANAF 2026 - 50ᵉ Assemblée Générale | Abidjan, Côte d'Ivoire",
  description: "50 ans au service de l'assurance africaine : Bilan, innovations et perspectives. 50ᵉ Assemblée Générale de la FANAF à Abidjan, Côte d'Ivoire.",
  keywords: "FANAF, assurance africaine, assemblée générale, Abidjan, Côte d'Ivoire, 2026, assurance inclusive, digitalisation",
  authors: [{ name: "FANAF" }],
  openGraph: {
    title: "FANAF 2026 - 50ᵉ Assemblée Générale",
    description: "50 ans au service de l'assurance africaine : Bilan, innovations et perspectives",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        {/* <TopBanner /> */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
