"use client";
import { PaystackButton } from "react-paystack";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRegistration } from "@/lib/hooks/useRegistration";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

const publicKey = "pk_live_e60f1f7bfe3301fff3f5a14c24e753ce17bb04ee";

export default function PayPage() {
  const [details, setDetails] = useQueryState("details");
  const [type] = useQueryState("type");
  const registrationMutation = useRegistration();
  const t = useTranslations("PaymentPage");
  const router = useRouter();

  // If no details provided, redirect to home
  useEffect(() => {
    if (!details) {
      router.replace("/");
      return;
    }
  }, [details, router]);

  // Parse and validate details
  const parsedData = useMemo(() => {
    if (!details) return null;
    
    try {
      return JSON.parse(atob(details));
    } catch (error) {
      console.error("Failed to parse details:", error);
      router.replace("/");
      return null;
    }
  }, [details, router]);

  // Calculate pricing based on type and number of members
  const pricingData = useMemo(() => {
    if (!parsedData) return { amount: 0, totalAmount: "0 FCFA", memberCount: 0 };

    // Determine if it's a member or non-member
    const isMember = type === "member" || parsedData.type === "member";
    const basePrice = isMember ? 350000 : 500000; // Base price in FCFA
    
    // Calculate number of members
    let memberCount = 1; // At least the creator
    if (parsedData.member && Array.isArray(parsedData.member)) {
      memberCount = parsedData.member.length;
    }
    
    // Calculate total amount
    const totalAmountFCFA = basePrice * memberCount;
    const totalAmountKobo = totalAmountFCFA * 100; // Convert to kobo for Paystack
    
    return {
      amount: totalAmountKobo,
      totalAmount: `${totalAmountFCFA.toLocaleString()} FCFA`,
      memberCount,
      basePrice,
      isMember
    };
  }, [parsedData, type]);

  // Extract user data from details
  const userData = useMemo(() => {
    if (!parsedData?.creator) return { email: "", name: "", phone: "" };
    
    const creator = parsedData.creator;
    return {
      email: creator.email || "",
      name: `${creator.first_name || ""} ${creator.last_name || ""}`.trim(),
      phone: creator.phone || ""
    };
  }, [parsedData]);

  // State for payment data
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Update state when userData changes
  useEffect(() => {
    setEmail(userData.email);
    setName(userData.name);
    setPhone(userData.phone);
  }, [userData]);

  // Early return if no data
  if (!parsedData) {
    return null;
  }

  const creatorData = parsedData?.creator;

  const componentProps = {
    email,
    amount: pricingData.amount/1000,
    currency: "XOF",
    metadata: {
      name,
      phone,
      memberCount: pricingData.memberCount,
      isMember: pricingData.isMember
    },
    publicKey,
    text: t("actions.payNow"),
    onSuccess: async () => {
      const formData = JSON.parse(atob(details));
      //On payment succeed
      console.log(t("console.paymentSucceed"));
      console.log(formData);
      await registrationMutation.mutateAsync(formData, {
        onError(error, variables, context) {
          console.log(error);
        },
        onSuccess(data, variables, context) {
          console.log(data);
        },
      });
      router.push("https://fanaf-invoice.vercel.app/?details=" + details+"type="+type);
    },
    onClose: async () => {
      const formData = JSON.parse(atob(details));
      //On payment succeed
      console.log(t("console.formData"));
      console.log(formData);
      await registrationMutation.mutateAsync(formData, {
        onError(error, variables, context) {
          console.log(error);
        },
        onSuccess(data, variables, context) {
          console.log(data);
        },
      });
    },
  };

  const handlePayment = (e) => {
    // e.preventDefault();
    // Here you would integrate with a payment gateway (e.g., Stripe, PayPal)
    console.log(t("actions.processingPayment"));
    // alert(`Payment of ${totalAmount} processed (simulated)!`);
    // Redirect to a success page or show a success message
    // router.push("http://localhost:5173/");
  };

  // Get translated benefits
  const benefits = t.raw("benefits.items");

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <div className="bg-white">
        <h1 className="text-4xl font-extrabold mb-4">{t("title")}</h1>

        <div className="flex items-center justify-between mb-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-black">{pricingData.totalAmount}</p>
            <p className="text-sm text-gray-600 mt-2 text-start">
              {pricingData.isMember ? "Member" : "Non-member"} • {pricingData.memberCount} participant{pricingData.memberCount > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <PaystackButton
            {...componentProps}
            className="w-full flex items-center justify-center bg-blue-600 py-4 text-lg rounded-full font-semibold text-white hover:bg-blue-700 transition-colors duration-200"
          />
          <Accordion type="single" collapsible>
            <AccordionItem
              key={`recap`}
              value={`recap`}
              className="border rounded-lg shadow-sm mb-4 overflow-hidden"
            >
              <AccordionTrigger className="flex items-center justify-between p-4 text-lg font-semibold hover:no-underline">
                <span className="flex-1 text-left">
                  {t("recap.title")}
                </span>
              </AccordionTrigger>
              <AccordionContent className="border-t p-4">
                <div className="space-y-2 text-gray-700">
                  {/* <p>
                    <strong>{t("recap.fields.firstName")}:</strong> {creatorData?.first_name}
                  </p>
                  <p>
                    <strong>{t("recap.fields.lastName")}:</strong> {creatorData?.last_name}
                  </p>
                  <p>
                    <strong>{t("recap.fields.email")}:</strong> {creatorData?.email}
                  </p>
                  <p>
                    <strong>{t("recap.fields.phone")}:</strong> {creatorData?.phone}
                  </p>
                  <p>
                    <strong>{t("recap.fields.function")}:</strong>{" "}
                    {creatorData?.registration_data?.fonction}
                  </p>
                  <p>
                    <strong>{t("recap.fields.need")}:</strong>{" "}
                    {creatorData?.registration_data?.besoin}
                  </p>
                  <p>
                    <strong>{t("recap.fields.country")}:</strong> {creatorData?.country}
                  </p>
                  <p>
                    <strong>{t("recap.fields.organization")}:</strong> {creatorData?.company}
                  </p> */}
                  {parsedData.member && parsedData.member.length > 0 && (
                    <>
                      {parsedData.member.map((member, index) => (
                        <div key={index} className="ml-4 space-y-1">
                          <p className="font-medium">Member {index + 1}:</p>
                          <p className="text-sm">
                            {member.first_name} {member.last_name} - {member.email}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">{t("benefits.title")}</h2>
          <ul className="space-y-3 text-lg text-gray-700">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <span>
                  {benefit.text}
                  {benefit.linkText && (
                    <>
                      {" "}
                      <a href="#" className="text-blue-600 underline">
                        {benefit.linkText}
                      </a>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="px-8 text-center mt-4 text-sm text-muted-foreground">
          {t("legal.paymentTerms")}{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            {t("legal.termsLink")}
          </a>{" "}
          {t("legal.and")}{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            {t("legal.privacyLink")}
          </a>
          .
        </p>
      </div>
    </div>
  );
}