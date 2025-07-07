"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import DressStyleCard from "./DressStyleCard";

const DressStyle = () => {
  const dressStyles = [
    {
      title: "Casual",
      url: "/shop#casual",
      className: "bg-[url('/images/dress-style-1.png')]"
    },
    {
      title: "Formal",
      url: "/shop#formal", 
      className: "bg-[url('/images/dress-style-2.png')]"
    },
    {
      title: "Party",
      url: "/shop#party",
      className: "bg-[url('/images/dress-style-3.png')]"
    },
    {
      title: "Gym",
      url: "/shop#gym",
      className: "bg-[url('/images/dress-style-4.png')]"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={cn(integralCF.className, "text-3xl md:text-4xl lg:text-5xl mb-6")}>
            Choose Your Style
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our diverse collection of clothing styles designed to match your personality and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dressStyles.map((style, index) => (
            <div key={style.title}>
              <DressStyleCard 
                title={style.title}
                url={style.url}
                className={style.className}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DressStyle;
