"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import { Button } from "@/components/ui/button";

const data: NavMenu = [
  {
    id: 1,
    label: "À propos",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Histoire de la FANAF",
        url: "/a-propos#histoire",
        description: "Découvrez l'histoire de la FANAF depuis 1976",
      },
      {
        id: 12,
        label: "Mission et objectifs",
        url: "/a-propos#mission",
        description: "Nos engagements pour l'assurance africaine",
      },
      {
        id: 13,
        label: "Gouvernance",
        url: "/a-propos#gouvernance",
        description: "Organisation et instances dirigeantes",
      },
    ],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "Programme",
    url: "/programme",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "Intervenants",
    url: "/intervenants",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Partenaires",
    url: "/partenaires",
    children: [],
  },
  {
    id: 5,
    type: "MenuItem",
    label: "Contact",
    url: "/contact",
    children: [],
  },
];

const TopNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-30 transition-all duration-300",
        isScrolled
          ? "bg-white/95 shadow-lg backdrop-blur border-b border-gray-200"
          : "bg-transparent"
      )}
    >
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10 transition-colors duration-300",
              isScrolled ? "text-blue-600" : "text-white drop-shadow-lg",
            ])}
          >
            FANAF 2026
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem
                    label={item.label}
                    url={item.url}
                    className={cn(
                      "transition-colors duration-300 font-medium",
                      isScrolled ? "text-blue-900 hover:text-orange-500" : "text-white hover:text-orange-400"
                    )}
                  />
                )}
                {item.type === "MenuList" && (
                  <MenuList
                    data={item.children}
                    label={item.label}
                    className={cn(
                      "transition-colors duration-300 font-medium",
                      isScrolled ? "text-blue-900 hover:text-orange-500" : "text-white hover:text-orange-400"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <Link href="/registration">
            <Button
              className={cn(
                "transition-colors duration-300",
                isScrolled
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-white/90 text-blue-900 hover:bg-orange-500 hover:text-white border border-white"
              )}
            >
              S'inscrire
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
