"use client";

import { usePathname } from "next/navigation";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isRegistrationPage = pathname === "/registration";

  return (
    <>
      {children}
    </>
  );
} 