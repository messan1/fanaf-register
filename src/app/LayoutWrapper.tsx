"use client";

import { usePathname } from "next/navigation";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isRegistrationPage = pathname === "/registration";

  return (
    <>
      {!isRegistrationPage && !isHomePage && <TopNavbar />}
      {children}
      {!isRegistrationPage && <Footer />}
    </>
  );
} 