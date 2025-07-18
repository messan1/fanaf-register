import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import HolyLoader from "holy-loader";
import LayoutWrapper from "@/app/LayoutWrapper";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { Toaster } from "sonner";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "FANAF 2026 - 50ᵉ Assemblée Générale | Abidjan, Côte d'Ivoire",
  description:
    "50 ans au service de l'assurance africaine : Bilan, innovations et perspectives. 50ᵉ Assemblée Générale de la FANAF à Abidjan, Côte d'Ivoire.",
  keywords:
    "FANAF, assurance africaine, assemblée générale, Abidjan, Côte d'Ivoire, 2026, assurance inclusive, digitalisation",
  authors: [{ name: "FANAF" }],
  openGraph: {
    title: "FANAF 2026 - 50ᵉ Assemblée Générale",
    description:
      "50 ans au service de l'assurance africaine : Bilan, innovations et perspectives",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={satoshi.className}>
        <QueryProvider>
          <LayoutWrapper>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </LayoutWrapper>
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
