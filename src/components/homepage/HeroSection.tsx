"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";

export interface HeroStat {
  label: string;
  value: string;
}

export interface HeroAction {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  eventDate?: string;
  stats?: HeroStat[];
  actions?: HeroAction[];
}

function getCountdown(eventDate: string) {
  const now = new Date();
  const event = new Date(eventDate);
  const diff = event.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function HeroSection({
  title = "CINQUANTENAIRE DE LA FANAF",
  subtitle = "Bienvenue à la 50ᵉ Assemblée Générale de la FANAF",
  backgroundImage = "/images/header-homepage.png",
  eventDate = "2026-06-15T08:00:00Z",
  stats = [
    { label: "pays représentés", value: "54" },
    { label: "participants attendus", value: "1300+" },
    { label: "conférenciers", value: "80" },
    { label: "stands d'exposition", value: "60+" }
  ],
  actions = [
    { label: "S'inscrire maintenant", href: "/registration", variant: "primary" },
    { label: "Voir le programme", href: "/programme", variant: "outline" }
  ]
}: HeroSectionProps) {
  const [countdown, setCountdown] = useState(getCountdown(eventDate));

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown(eventDate)), 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/videos/sofitel-1.jpg"
      >
        <source src="/videos/sofitel__ivoire.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content animé */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto px-4 py-20 text-center flex flex-col items-center"
      >
        {subtitle && (
          <h2 className={cn(
            integralCF.className, "lowercase tracking-widest text-lg md:text-xl text-blue-200 font-semibold mb-2")}>
            {subtitle}
          </h2>
        )}
        {title && (
          <h1 className={cn(
            integralCF.className, "md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg")}>
            {title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br className="hidden md:block" />
              </span>
            ))}
          </h1>
        )}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex gap-2 text-white text-2xl md:text-3xl font-bold bg-blue-900/80 rounded-lg px-6 py-2 shadow-lg">
            <div className="flex flex-col items-center">
              <span>{countdown.days}</span>
              <span className="text-xs font-normal">jours</span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <span>{countdown.hours}</span>
              <span className="text-xs font-normal">heures</span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <span>{countdown.minutes}</span>
              <span className="text-xs font-normal">min</span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <span>{countdown.seconds}</span>
              <span className="text-xs font-normal">sec</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-blue-200">{stat.value}</span>
              <span className="text-xs md:text-sm text-blue-100">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          {actions.map((action, i) => (
            <Link key={i} href={action.href}>
              <Button
                size="lg"
                className={
                  action.variant === "outline"
                    ? "border-white text-blue-700 hover:bg-white hover:text-blue-900 px-8 py-3 text-lg font-semibold"
                    : "bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold shadow-lg"
                }
                variant={action.variant === "outline" ? "outline" : undefined}
              >
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 