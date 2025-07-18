"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEventOptions, useRegistration } from "@/lib/hooks/useRegistration";
import { ArrowRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Component() {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    fonction: "",
    besoin: "",
    pays: "",
    organisation: "",
  });
  const [errors, setErrors] = useState({});
  const [registrationType, setRegistrationType] = useQueryState("type", {
    defaultValue: "member",
  });

  const { data: eventOptionsData, isLoading: optionsLoading } =
    useEventOptions();
  const registrationMutation = useRegistration();
  const [date, setData] = useQueryState("data");
  const router = useRouter();
  const t = useTranslations("RegistrationForm");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for the field when it changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined,
    }));
  };

  // Get translated arrays
  const fonctions = t.raw("functions");
  const besoins = t.raw("needs");
  const pays = t.raw("countries");
  const organisations = t.raw("organizations");

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.prenom.trim()) {
      newErrors.prenom = t("fields.firstName.required");
      isValid = false;
    }
    if (!formData.nom.trim()) {
      newErrors.nom = t("fields.lastName.required");
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = t("fields.email.required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("fields.email.invalid");
      isValid = false;
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = t("fields.phone.required");
      isValid = false;
    } else if (!/^\d+$/.test(formData.telephone)) {
      // Basic numeric check
      newErrors.telephone = t("fields.phone.invalid");
      isValid = false;
    }
    if (!formData.fonction) {
      newErrors.fonction = t("fields.function.required");
      isValid = false;
    }
    if (!formData.besoin) {
      newErrors.besoin = t("fields.need.required");
      isValid = false;
    }
    if (!formData.pays) {
      newErrors.pays = t("fields.country.required");
      isValid = false;
    }
    if (!formData.organisation) {
      newErrors.organisation = t("fields.organization.required");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const SubmitData = async () => {
    const dataToSend = {
      type: "solo",
      participation_plan_id: 1,
      event_options: [],
      creator: {
        first_name: formData?.nom,
        last_name: formData?.prenom,
        email: formData?.email,
        phone: formData?.telephone,
        company: formData?.organisation,
        country: formData?.pays,
        registration_data: {
          fonction: formData?.fonction,
          besoin: formData?.besoin,
        },
      },
      member: [
        {
          first_name: formData?.nom,
          last_name: formData?.prenom,
          email: formData?.email,
          phone: formData?.telephone,
          company: formData?.organisation,
          country: formData?.pays,
          registration_data: {
            fonction: formData?.fonction,
            besoin: formData?.besoin,
          },
        },
      ],
    };
    router.push(
      "/register/payment?details=" +
        btoa(JSON.stringify(dataToSend)) +
        "&type=" +
        registrationType
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      SubmitData();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-6 p-6">
        {/* Prénom et Nom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="prenom">
              {t("fields.firstName.label")} *
            </Label>
            <div className="relative">
              <Input
                id="prenom"
                type="text"
                required
                className="pr-10 py-3 border-gray-200 rounded-lg"
                placeholder={t("fields.firstName.placeholder")}
                value={formData.prenom}
                onChange={(e) => handleInputChange("prenom", e.target.value)}
              />
            </div>
            {errors.prenom && (
              <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="nom">
              {t("fields.lastName.label")} *
            </Label>
            <div className="relative">
              <Input
                id="nom"
                required
                type="text"
                className="pr-10 py-3 border-gray-200 rounded-lg"
                placeholder={t("fields.lastName.placeholder")}
                value={formData.nom}
                onChange={(e) => handleInputChange("nom", e.target.value)}
              />
            </div>
            {errors.nom && (
              <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
            )}
          </div>
        </div>
        {/* Email et Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="email">
              {t("fields.email.label")} *
            </Label>
            <div className="relative">
              <Input
                id="email"
                required
                type="email"
                className="pr-10 py-3 border-gray-200 rounded-lg"
                placeholder={t("fields.email.placeholder")}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="telephone">
              {t("fields.phone.label")} *
            </Label>
            <div className="flex">
              <div className="flex items-center justify-center w-12 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
                <Plus className="h-4 w-4 text-gray-500" />
              </div>
              <div className="relative flex-1">
                <Input
                  id="telephone"
                  type="tel"
                  required
                  placeholder={t("fields.phone.placeholder")}
                  className="pr-10 py-3 border-gray-200 rounded-l-none rounded-r-lg border-l-0"
                  value={formData.telephone}
                  onChange={(e) =>
                    handleInputChange("telephone", e.target.value)
                  }
                />
              </div>
            </div>
            {errors.telephone && (
              <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
            )}
          </div>
        </div>
        {/* Fonction et Besoin */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="fonction">
              {t("fields.function.label")} *
            </Label>
            <Select
              onValueChange={(value) => handleInputChange("fonction", value)}
              value={formData.fonction} // Ensure controlled component
            >
              <SelectTrigger className="py-5 border-gray-200 rounded-lg">
                <SelectValue placeholder={t("fields.function.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {fonctions.map((fonction) => (
                  <SelectItem key={fonction} value={fonction}>
                    {fonction}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.fonction && (
              <p className="text-red-500 text-sm mt-1">{errors.fonction}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="besoin">
              {t("fields.need.label")} *
            </Label>
            <Select
              onValueChange={(value) => handleInputChange("besoin", value)}
              value={formData.besoin} // Ensure controlled component
            >
              <SelectTrigger className="py-5 border-gray-200 rounded-lg">
                <SelectValue placeholder={t("fields.need.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {besoins.map((besoin) => (
                  <SelectItem key={besoin} value={besoin}>
                    {besoin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.besoin && (
              <p className="text-red-500 text-sm mt-1">{errors.besoin}</p>
            )}
          </div>
        </div>
        {/* Pays et Organisation */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="pays">
              {t("fields.country.label")} *
            </Label>
            <Select
              onValueChange={(value) => handleInputChange("pays", value)}
              value={formData.pays} // Ensure controlled component
            >
              <SelectTrigger className="py-5 border-gray-200 rounded-lg">
                <SelectValue placeholder={t("fields.country.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {pays.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.pays && (
              <p className="text-red-500 text-sm mt-1">{errors.pays}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="organisation">
              {t("fields.organization.label")} *
            </Label>
            <Select
              onValueChange={(value) =>
                handleInputChange("organisation", value)
              }
              value={formData.organisation} // Ensure controlled component
            >
              <SelectTrigger className="py-5 border-gray-200 rounded-lg">
                <SelectValue
                  placeholder={t("fields.organization.placeholder")}
                />
              </SelectTrigger>
              <SelectContent>
                {organisations.map((org) => (
                  <SelectItem key={org} value={org}>
                    {org}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.organisation && (
              <p className="text-red-500 text-sm mt-1">{errors.organisation}</p>
            )}
          </div>
        </div>
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
      </CardContent>
    </form>
  );
}
