"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export default function RegistrantForm({ index, registrant, onUpdate }) {
  const handleInputChange = (field, value) => {
    onUpdate(index, field, value)
  }

  const fonctions = [
    "General Manager",
    "Marketing Director",
    "Communications Manager",
    "Project Manager",
    "Consultant",
    "Student",
    "Other",
  ]

  const besoins = ["Consultation", "Training", "Audit", "Support", "Digital Strategy", "Web Development", "Other"]

  const pays = [
    "France",
    "Belgium",
    "Switzerland",
    "Canada",
    "Morocco",
    "Tunisia",
    "Algeria",
    "Senegal",
    "Ivory Coast",
    "Other",
  ]

  const organisations = ["Private Company", "Public Organization", "NGO", "Startup", "Freelance", "University", "Other"]

  return (
    <div className="space-y-6 p-6 bg-white">
      {/* Prénom et Nom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`prenom-${index}`}>
            First Name *
          </Label>
          <div className="relative">
            <Input
              id={`prenom-${index}`}
              type="text"
              className="pr-10 py-3 border-gray-200 rounded-lg"
              value={registrant.prenom}
              onChange={(e) => handleInputChange("prenom", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`nom-${index}`}>
            Last Name *
          </Label>
          <div className="relative">
            <Input
              id={`nom-${index}`}
              type="text"
              className="pr-10 py-3 border-gray-200 rounded-lg"
              value={registrant.nom}
              onChange={(e) => handleInputChange("nom", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Email et Téléphone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`email-${index}`}>
            Email *
          </Label>
          <div className="relative">
            <Input
              id={`email-${index}`}
              type="email"
              className="pr-10 py-3 border-gray-200 rounded-lg"
              value={registrant.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`telephone-${index}`}>
            Phone *
          </Label>
          <div className="flex">
            <div className="flex items-center justify-center w-12 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
              <Plus className="h-4 w-4 text-gray-500" />
            </div>
            <div className="relative flex-1">
              <Input
                id={`telephone-${index}`}
                type="tel"
                placeholder="Phone number"
                className="pr-10 py-3 border-gray-200 rounded-l-none rounded-r-lg border-l-0"
                value={registrant.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fonction et Besoin */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`fonction-${index}`}>
            Function *
          </Label>
          <Select value={registrant.fonction} onValueChange={(value) => handleInputChange("fonction", value)}>
            <SelectTrigger className="py-5 border-gray-200 rounded-lg">
              <SelectValue placeholder="Select your function" />
            </SelectTrigger>
            <SelectContent>
              {fonctions.map((fonction) => (
                <SelectItem key={fonction} value={fonction}>
                  {fonction}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`besoin-${index}`}>
            Need *
          </Label>
          <Select value={registrant.besoin} onValueChange={(value) => handleInputChange("besoin", value)}>
            <SelectTrigger className="py-5 border-gray-200 rounded-lg">
              <SelectValue placeholder="Select your need" />
            </SelectTrigger>
            <SelectContent>
              {besoins.map((besoin) => (
                <SelectItem key={besoin} value={besoin}>
                  {besoin}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pays et Organisation */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`pays-${index}`}>
            Country *
          </Label>
          <Select value={registrant.pays} onValueChange={(value) => handleInputChange("pays", value)}>
            <SelectTrigger className="py-5 border-gray-200 rounded-lg">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {pays.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor={`organisation-${index}`}>
            Organization *
          </Label>
          <Select value={registrant.organisation} onValueChange={(value) => handleInputChange("organisation", value)}>
            <SelectTrigger className="py-5 border-gray-200 rounded-lg">
              <SelectValue placeholder="Select your organization" />
            </SelectTrigger>
            <SelectContent>
              {organisations.map((org) => (
                <SelectItem key={org} value={org}>
                  {org}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
