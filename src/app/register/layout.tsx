"use client";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState, useMemo } from "react";

export default function Layout({ children }) {
  const [registrationType, setRegistrationType] = useQueryState("type", { defaultValue: "member" });
  const [details] = useQueryState("details");

  const t = useTranslations("Home");
  const path = usePathname();

  // Calculate pricing based on details or show base price
  const pricingData = useMemo(() => {
    // Base prices
    const basePriceMember = 350000; // FCFA
    const basePriceNonMember = 500000; // FCFA

    // If no details, return base price
    if (!details) {
      const basePrice = registrationType === "member" ? basePriceMember : basePriceNonMember;
      return {
        totalAmount: `${basePrice.toLocaleString()} FCFA`,
        memberCount: 1,
        isMember: registrationType === "member",
        isCalculated: false
      };
    }

    // Parse details and calculate actual price
    try {
      const parsedData = JSON.parse(atob(details));
      
      // Determine if it's a member or non-member
      const isMember = registrationType === "member" || parsedData.type === "member";
      const basePrice = isMember ? basePriceMember : basePriceNonMember;
      
      // Calculate number of members
      let memberCount = 1; // At least the creator
      if (parsedData.member && Array.isArray(parsedData.member)) {
        memberCount = parsedData.member.length;
      }
      
      // Calculate total amount
      const totalAmountFCFA = basePrice * memberCount;
      
      return {
        totalAmount: `${totalAmountFCFA.toLocaleString()} FCFA`,
        memberCount,
        isMember,
        isCalculated: true
      };
    } catch (error) {
      // Fallback to base price if parsing fails
      const basePrice = registrationType === "member" ? basePriceMember : basePriceNonMember;
      return {
        totalAmount: `${basePrice.toLocaleString()} FCFA`,
        memberCount: 1,
        isMember: registrationType === "member",
        isCalculated: false
      };
    }
  }, [details, registrationType]);

  // Dynamic content based on selection
  const content = {
    individual: {
      title: t("individual.title"),
      subtitle: t("individual.subtitle"),
      description: t("individual.description"),
      price: pricingData.totalAmount,
      priceEuro: t("individual.priceEuro"),
      membershipType: pricingData.isCalculated && pricingData.memberCount > 1 
        ? `${t("individual.membershipType")} (${pricingData.memberCount} participants)`
        : t("individual.membershipType"),
      privileges: [
        t("individual.privileges.item1"),
        t("individual.privileges.item2"),
        t("individual.privileges.item3"),
        t("individual.privileges.item4"),
      ],
    },
    group: {
      title: t("group.title"),
      subtitle: t("group.subtitle"),
      description: t("group.description"),
      price: pricingData.totalAmount,
      priceEuro: t("group.priceEuro"),
      membershipType: pricingData.isCalculated && pricingData.memberCount > 1 
        ? `${t("group.membershipType")} (${pricingData.memberCount} participants)`
        : t("group.membershipType"),
      privileges: [
        t("group.privileges.item1"),
        t("group.privileges.item2"),
        t("group.privileges.item3"),
        t("group.privileges.item4"),
        t("group.privileges.item5"),
      ],
    },
  };

  const currentContent = registrationType !== "member" ? content.group : content.individual;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const priceVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const router = useRouter();

  return (
    <div className="relative h-full w-full overflo mb-40">
      {/* Background Image */}
      <Image
        src="/header-bgfanaf19.jpg"
        alt={t("images.worldEconomicForumEvent")}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.header
          className="flex items-center justify-between p-4 md:p-4"
          variants={itemVariants}
        >
          <div className="flex items-center px-10 space-x-4">
            <Button
              variant="ghost"
              size="icon"
              //  className="text-white hover:bg-white/10"
            >
              <LocaleSwitcher />

              <span className="sr-only">{t("ui.toggleNavigation")}</span>
            </Button>
          </div>
          <div className="text-white text-center">
            <Image
              src="/LogoFanaf_Blanc-75b20c91.png"
              alt={t("images.worldEconomicForumEvent")}
              width={100}
              height={100}
              priority
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
           
            <span className="sr-only">{t("ui.userProfile")}</span>
          </Button>

          {/* Join type selector */}
          <motion.div
            className="absolute top-28 w-full transform flex items-center justify-center -tr/2 z-40"
            variants={itemVariants}
          >
            <div className="flex gap-2 bg-white/10 px-2 py-2 backdrop-blur-sm rounded-full p-1">
              <motion.button
                onClick={() => setRegistrationType("member")}
                className={`px-6 py-1 font-semibold ${
                  path !== "/register" && "cursor-not-allowed opacity-30"
                } rounded-full text-sm transition-all ${
                  registrationType === "member"
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={path !== "/register"}
              >
                {t("ui.joinAsMember")}
              </motion.button>
              <motion.button
                onClick={() => setRegistrationType("non-member")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold ${
                  path !== "/register" && "cursor-not-allowed opacity-30"
                } transition-all ${
                  registrationType !== "member"
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={path !== "/register"}
              >
                {t("ui.joinAsNonMember")}
              </motion.button>
            </div>
          </motion.div>
        </motion.header>

        {/* Content Sections */}
        <main className="flex flex-1 flex-col items-center justify-center -mt-6 p-6 md:flex-row md:items-start md:justify-between md:p-12 lg:p-24">
          {/* Left Section: Dynamic Marketing Text */}
          <div className="mb-10 space-y-10 max-w-2xl text-center md:mb-0 md:mr-12 md:text-left">
            {/* Fixed height container for title to prevent layout shift */}
            <div className="min-h-[200px] flex items-center justify-center md:justify-start">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentContent.title}
                  className="text-6xl font-extrabold leading-tight text-white md:text-6xl lg:text-6xl"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {currentContent.title}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Fixed height container for price to prevent layout shift */}
            <div className="min-h-[120px] flex items-center justify-center md:justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentContent.price}-${pricingData.memberCount}`}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  variants={priceVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <p className="text-white/80 text-lg mb-2">
                      {currentContent.membershipType}
                    </p>
                    <p className="text-5xl font-bold text-white mb-2">
                      {currentContent.price}
                    </p>
                    <p className="text-white/70 text-sm">
                      {currentContent.priceEuro}
                    </p>
                    {pricingData.isCalculated && (
                      <p className="text-white/60 text-xs mt-2">
                        {pricingData.isMember ? "Member" : "Non-member"} rate
                        {pricingData.memberCount > 1 && ` × ${pricingData.memberCount} participants`}
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Fixed height container for subtitle to prevent layout shift */}
            <div className="min-h-[60px] flex items-center justify-center md:justify-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentContent.subtitle}
                  className="text-lg font-semibold text-white/90 md:text-2xl"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {currentContent.subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Fixed height container for description to prevent layout shift */}
            <div className="min-h-[50px] flex items-center justify-center md:justify-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentContent.description}
                  className="text-base text-white/80 md:text-xl"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {currentContent.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Section: Sign-in Form */}
          <motion.div
            className="flex-shrink-0 w-full max-w-xl"
            variants={itemVariants}
          >
            <motion.div>
              <Card className="min-h-[70vh] rounded-lg p-6 shadow-lg md:p-2">
                {!path.includes("paym") && (
                  <CardHeader className="pb-6 text-center md:text-left">
                    <CardTitle className="text-2xl flex items-center gap-2 font-bold">
                      {path !== "/register" && (
                        <button onClick={() => router.back()}>
                          <ChevronLeft size={30} />
                        </button>
                      )}
                      {t("ui.startRegistration")}
                    </CardTitle>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`form-subtitle-${registrationType !== "member"}`}
                        className="text-sm text-muted-foreground mt-2"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {registrationType !== "member"
                          ? t("ui.registerOrganization")
                          : t("ui.createIndividualAccount")}
                      </motion.p>
                    </AnimatePresence>
                  </CardHeader>
                )}
                <>{children}</>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}