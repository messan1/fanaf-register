"use client";

import type React from "react";

import RegistrantForm, {
  type RegistrantFormHandle,
} from "@/components/registrant-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createRef, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

interface RegistrantData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  fonction: string;
  besoin: string;
  pays: string;
  organisation: string;
}

const initialRegistrantState: RegistrantData = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  fonction: "",
  besoin: "",
  pays: "",
  organisation: "",
};

export default function GroupRegistrationPage() {
  const [groupName, setGroupName] = useState("");
    const [registrationType, setRegistrationType] = useQueryState("type", {
    defaultValue: "member",
  });

  const [groupNameError, setGroupNameError] = useState("");
  const [registrants, setRegistrants] = useState<RegistrantData[]>([
    initialRegistrantState,
  ]);
  const registrantRefs = useRef<(RegistrantFormHandle | null)[]>(
    registrants.map(() => createRef())
  );
  const [activeAccordionItem, setActiveAccordionItem] =
    useState(`registrant-0`); // Keep track of the open item
  const router = useRouter();
  const t = useTranslations("GroupRegistration");

  const handleAddRegistrant = () => {
    const newRegistrants = [...registrants, initialRegistrantState];
    setRegistrants(newRegistrants);
    // Add a new ref for the new registrant
    registrantRefs.current = [...registrantRefs.current, createRef()];
    setActiveAccordionItem(`registrant-${newRegistrants.length - 1}`); // Open the newly added registrant
  };

  const handleRemoveRegistrant = (
    indexToRemove: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent accordion from toggling when removing
    const newRegistrants = registrants.filter(
      (_, index) => index !== indexToRemove
    );
    setRegistrants(newRegistrants);
    // Remove the corresponding ref
    registrantRefs.current = registrantRefs.current.filter(
      (_, index) => index !== indexToRemove
    );

    // Adjust active item if the removed item was active or if it affects subsequent items
    if (activeAccordionItem === `registrant-${indexToRemove}`) {
      setActiveAccordionItem(newRegistrants.length > 0 ? `registrant-0` : ""); // Open first or close all
    } else if (
      indexToRemove < Number.parseInt(activeAccordionItem.split("-")[1])
    ) {
      // If an item before the active one is removed, adjust the active index
      setActiveAccordionItem(
        `registrant-${Number.parseInt(activeAccordionItem.split("-")[1]) - 1}`
      );
    }
  };

  const handleUpdateRegistrant = (
    index: number,
    field: keyof RegistrantData,
    value: string
  ) => {
    setRegistrants((prev) =>
      prev.map((registrant, i) =>
        i === index ? { ...registrant, [field]: value } : registrant
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let formIsValid = true;
    let newGroupNameError = "";

    // Validate each registrant
    const allRegistrantErrors: Record<string, string>[] = [];
    registrantRefs.current.forEach((ref, index) => {
      if (ref && ref.current) {
        const { isValid, errors } = ref.current.validate();
        if (!isValid) {
          formIsValid = false;
        }
        allRegistrantErrors[index] = errors;
      }
    });

    if (formIsValid) {
      // Structure the data as requested
      const creator = {
        first_name: registrants[0].prenom,
        last_name: registrants[0].nom,
        email: registrants[0].email,
        phone: registrants[0].telephone,
        company: registrants[0].organisation,
        country: registrants[0].pays,
        registration_data: {
          fonction: registrants[0].fonction,
          besoin: registrants[0].besoin,
        },
      };

      const members = registrants.map((reg) => ({
        first_name: reg.prenom,
        last_name: reg.nom,
        email: reg.email,
        phone: reg.telephone,
        company: reg.organisation,
        country: reg.pays,
        registration_data: {
          fonction: reg.fonction,
          besoin: reg.besoin,
        },
      }));

      const dataToSend = {
        type: "group",
        participation_plan_id: 2,
        event_options: [],
        group_name: groupName,
        creator: creator,
        member: members,
      };

    console.log(t("console.allRegistrantsData"), dataToSend);
    router.push(
      "/register/payment?details=" +
        btoa(JSON.stringify(dataToSend)) +
        "&type=" +
        registrationType
    );
      // alert(t("console.registrationSubmitted"))
      // Here you would typically send dataToSend to your backend
    } else {
      console.log(t("validation.formErrors"));
      // Optionally, you could set a state here to display a general error message
      // or ensure the first invalid accordion item is open.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-5">
      <div className="max-h-[70vh] overflow-y-auto pr-4">
        <Accordion
          type="single"
          collapsible
          value={activeAccordionItem}
          onValueChange={setActiveAccordionItem}
        >
          {registrants.map((registrant, index) => (
            <AccordionItem
              key={`registrant-${index}`}
              value={`registrant-${index}`}
              className="border rounded-lg shadow-sm mb-4 overflow-hidden"
            >
              <AccordionTrigger className="flex items-center justify-between p-4 text-lg font-semibold hover:no-underline">
                <span className="flex-1 text-left">
                  {registrant.prenom || registrant.nom
                    ? `${registrant.prenom} ${registrant.nom}`.trim()
                    : `${t("registrant.defaultName")} ${index + 1}`}
                </span>
                {registrants.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleRemoveRegistrant(index, e)}
                    className="text-gray-400 hover:text-red-500 ml-2"
                    aria-label={`${t("registrant.removeLabel")} ${index + 1}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <RegistrantForm
                  index={index}
                  registrant={registrant}
                  onUpdate={handleUpdateRegistrant}
                  ref={registrantRefs.current[index]}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Button
        type="button"
        onClick={handleAddRegistrant}
        variant="outline"
        className="w-full flex items-center justify-center py-6 text-lg rounded-full font-semibold border-dashed border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 bg-transparent"
      >
        <Plus className="h-5 w-5 mr-2" /> {t("actions.addRegistrant")}
      </Button>
      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full flex items-center bg-blue-600 py-7 text-lg rounded-full font-semibold text-white hover:bg-blue-700 mt-8"
      >
        <p className="flex-1">{t("actions.send")}</p>
        <div className="border border-white rounded-full h-10 flex items-center w-10">
          <ArrowRight className="ml-2 h-5 w-5" />
        </div>
      </Button>
      {/* Terms and Privacy */}
      <p className="px-8 text-center text-sm text-muted-foreground">
        {t("legal.termsText")}{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          {t("legal.termsLink")}
        </a>{" "}
        {t("legal.and")}{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          {t("legal.privacyLink")}
        </a>
        .
      </p>
    </form>
  );
}