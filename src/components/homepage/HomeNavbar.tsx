"use client";

import Link from "next/link";
import { integralCF } from "@/styles/fonts";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  {
    label: "Programme",
    url: "/programme",
    children: [
      {
        label: "Plénières",
        url: "/programme#plenieres",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI0IiB5PSIxMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE4IiByeD0iNSIgZmlsbD0iI0ZGRkYiIHN0cm9rZT0iIzY2N0VFQSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjgiIHI9IjQiIGZpbGw9IiM2NjdFRUEiIHN0cm9rZT0iIzY2N0VFQSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L3N2Zz4=",
        description: "Sessions principales et débats d'experts."
      },
      {
        label: "Ateliers",
        url: "/programme#ateliers",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIxIiB5PSIxOSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSIjRkZGRiIgc3Ryb2tlPSIjRkQ4NTAwIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxjaXJjbGUgY3g9IjgiIGN5PSIxMyIgcj0iMyIgZmlsbD0iI0ZEODUwMCIgc3Ryb2tlPSIjRkQ4NTAwIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvc3ZnPg==",
        description: "Workshops thématiques et interactifs."
      }
    ]
  },
  {
    label: "Intervenants",
    url: "/intervenants",
    children: [
      {
        label: "Conférenciers",
        url: "/intervenants#conferenciers",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjExIiByPSI2IiBmaWxsPSIjRkZGRiIgc3Ryb2tlPSIjN0ZGQzYwIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0yNSAyNEMyNSAyMC4xMzMgMjAuNDI3IDE3IDIxIDE3SDExQzExIDE3IDcgMjAuMTMzIDcgMjRWIj0iIiBmaWxsPSIjN0ZGQzYwIi8+PC9zdmc+",
        description: "Experts et leaders du secteur."
      },
      {
        label: "Modérateurs",
        url: "/intervenants#moderateurs",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjExIiByPSI2IiBmaWxsPSIjRkZGRiIgc3Ryb2tlPSIjRjQ3QjQwIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0yNSAyNEMyNSAyMC4xMzMgMjAuNDI3IDE3IDIxIDE3SDExQzExIDE3IDcgMjAuMTMzIDcgMjRWIj0iIiBmaWxsPSIjRjQ3QjQwIi8+PC9zdmc+",
        description: "Animateurs des débats et panels."
      }
    ]
  },
  {
    label: "Partenaires",
    url: "/partenaires"
  },
  {
    label: "Contact",
    url: "/contact"
  }
];

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-lg backdrop-blur border-b border-gray-200"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent"
      )}
    >
      <div className="flex relative max-w-7xl mx-auto items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            integralCF.className,
            "text-2xl md:text-3xl font-bold transition-colors duration-300",
            scrolled ? "text-blue-900" : "text-white drop-shadow-lg"
          )}
        >
          FANAF 2026
        </Link>
        {/* Navigation desktop */}
        <div className="hidden md:flex gap-7">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.url}
                className={cn(
                  "transition-colors duration-300 font-medium px-2 py-1 rounded-md",
                  scrolled ? "text-blue-900 hover:text-orange-500" : "text-white hover:text-orange-400"
                )}
              >
                {link.label}
              </Link>
              {/* Dropdown si children */}
              {link.children && link.children.length > 0 && (
                <div
                  className={cn(
                    "absolute left-0 top-full mt-2 min-w-[260px] bg-white rounded-2xl shadow-xl border border-gray-100 py-3 px-2 flex flex-col gap-1 transition-all duration-200",
                    openDropdown === link.label ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                  )}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.url}
                      href={child.url}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-blue-50 transition-colors"
                    >
                      {child.image && (
                        <Image src={child.image} alt={child.label} width={32} height={32} className="rounded-lg object-cover" />
                      )}
                      <div>
                        <div className="font-semibold text-blue-900 text-base">{child.label}</div>
                        {child.description && (
                          <div className="text-xs text-gray-500">{child.description}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Bouton inscription */}
        <div className="flex items-center gap-4">
          <Link href="/registration">
            <Button
              className={cn(
                "transition-colors duration-300 font-semibold px-6 py-2 text-base shadow-lg border",
                scrolled
                  ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:border-orange-600"
                  : "bg-white/90 text-blue-900 border-white hover:bg-orange-500 hover:text-white hover:border-orange-500"
              )}
            >
              S'inscrire
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
} 