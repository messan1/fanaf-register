"use client"

import { forwardRef, useImperativeHandle, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"

// Define the shape of a registrant's data
interface RegistrantData {
  prenom: string
  nom: string
  email: string
  telephone: string
  fonction: string
  besoin: string
  pays: string
  organisation: string
}

// Define the props for RegistrantForm
interface RegistrantFormProps {
  index: number
  registrant: RegistrantData
  onUpdate: (index: number, field: keyof RegistrantData, value: string) => void
}

// Define the handle for useImperativeHandle
export interface RegistrantFormHandle {
  validate: () => { isValid: boolean; errors: Record<string, string> }
}

const RegistrantForm = forwardRef<RegistrantFormHandle, RegistrantFormProps>(({ index, registrant, onUpdate }, ref) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const t = useTranslations("RegistrantForm")

  // Get translated arrays
  const fonctions = t.raw("functions")
  const besoins = t.raw("needs")
  const pays = t.raw("countries")
  const organisations = t.raw("organizations")

  const handleInputChange = (field: keyof RegistrantData, value: string) => {
    onUpdate(index, field, value)
    // Clear error for the field when it changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined,
    }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    if (!registrant.prenom.trim()) {
      newErrors.prenom = t("fields.firstName.required")
      isValid = false
    }
    if (!registrant.nom.trim()) {
      newErrors.nom = t("fields.lastName.required")
      isValid = false
    }
    if (!registrant.email.trim()) {
      newErrors.email = t("fields.email.required")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(registrant.email)) {
      newErrors.email = t("fields.email.invalid")
      isValid = false
    }
    if (!registrant.telephone.trim()) {
      newErrors.telephone = t("fields.phone.required")
      isValid = false
    } else if (!/^\d+$/.test(registrant.telephone)) {
      newErrors.telephone = t("fields.phone.invalid")
      isValid = false
    }
    if (!registrant.fonction) {
      newErrors.fonction = t("fields.function.required")
      isValid = false
    }
    if (!registrant.besoin) {
      newErrors.besoin = t("fields.need.required")
      isValid = false
    }
    if (!registrant.pays) {
      newErrors.pays = t("fields.country.required")
      isValid = false
    }
    if (!registrant.organisation) {
      newErrors.organisation = t("fields.organization.required")
      isValid = false
    }

    setErrors(newErrors)
    return { isValid, errors: newErrors }
  }

  useImperativeHandle(ref, () => ({
    validate,
  }))

  return (
    <div className="space-y-6 p-6 bg-white">
      {/* Prénom et Nom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`prenom-${index}`}>
            {t("fields.firstName.label")} *
          </Label>
          <div className="relative">
            <Input
              id={`prenom-${index}`}
              type="text"
              required
              className="pr-10 py-3 border-gray-200 rounded-lg"
              placeholder={t("fields.firstName.placeholder")}
              value={registrant.prenom}
              onChange={(e) => handleInputChange("prenom", e.target.value)}
            />
          </div>
          {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`nom-${index}`}>
            {t("fields.lastName.label")} *
          </Label>
          <div className="relative">
            <Input
              id={`nom-${index}`}
              required
              type="text"
              className="pr-10 py-3 border-gray-200 rounded-lg"
              placeholder={t("fields.lastName.placeholder")}
              value={registrant.nom}
              onChange={(e) => handleInputChange("nom", e.target.value)}
            />
          </div>
          {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
        </div>
      </div>
      {/* Email et Téléphone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`email-${index}`}>
            {t("fields.email.label")} *
          </Label>
          <div className="relative">
            <Input
              id={`email-${index}`}
              required
              type="email"
              className="pr-10 py-3 border-gray-200 rounded-lg"
              placeholder={t("fields.email.placeholder")}
              value={registrant.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`telephone-${index}`}>
            {t("fields.phone.label")} *
          </Label>
          <div className="flex">
            <div className="flex items-center justify-center w-12 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
              <Plus className="h-4 w-4 text-gray-500" />
            </div>
            <div className="relative flex-1">
              <Input
                id={`telephone-${index}`}
                type="tel"
                required
                placeholder={t("fields.phone.placeholder")}
                className="pr-10 py-3 border-gray-200 rounded-l-none rounded-r-lg border-l-0"
                value={registrant.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
              />
            </div>
          </div>
          {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
        </div>
      </div>
      {/* Fonction et Besoin */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`fonction-${index}`}>
            {t("fields.function.label")} *
          </Label>
          <Select value={registrant.fonction} onValueChange={(value) => handleInputChange("fonction", value)} required>
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
          {errors.fonction && <p className="text-red-500 text-sm mt-1">{errors.fonction}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`besoin-${index}`}>
            {t("fields.need.label")} *
          </Label>
          <Select value={registrant.besoin} onValueChange={(value) => handleInputChange("besoin", value)} required>
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
          {errors.besoin && <p className="text-red-500 text-sm mt-1">{errors.besoin}</p>}
        </div>
      </div>
      {/* Pays et Organisation */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`pays-${index}`}>
            {t("fields.country.label")} *
          </Label>
          <Select value={registrant.pays} onValueChange={(value) => handleInputChange("pays", value)} required>
            <SelectTrigger className="py-5 border-gray-200 rounded-lg">
              <SelectValue placeholder={t("fields.country.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {pays.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.pays && <p className="text-red-500 text-sm mt-1">{errors.pays}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`organisation-${index}`}>
            {t("fields.organization.label")} *
          </Label>
          <Select
            value={registrant.organisation}
            onValueChange={(value) => handleInputChange("organisation", value)}
            required
          >
            <SelectTrigger className="py-5 border-gray-200 rounded-lg">
              <SelectValue placeholder={t("fields.organization.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {organisations.map((org) => (
                <SelectItem key={org} value={org}>
                  {org}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.organisation && <p className="text-red-500 text-sm mt-1">{errors.organisation}</p>}
        </div>
      </div>
    </div>
  )
})

RegistrantForm.displayName = "RegistrantForm"

export default RegistrantForm