"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ChevronDown, Plus } from "lucide-react";

export default function Component() {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    fonction: "",
    besoin: "",
    pays: "",
    organisation: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fonctions = [
    "General Manager",
    "Marketing Director",
    "Communications Manager",
    "Project Manager",
    "Consultant",
    "Student",
    "Other"
  ];

  const besoins = [
    "Consultation",
    "Training",
    "Audit",
    "Support",
    "Digital Strategy",
    "Web Development",
    "Other"
  ];

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
    "Other"
  ];

  const organisations = [
    "Private Company",
    "Public Organization",
    "NGO",
    "Startup",
    "Freelance",
    "University",
    "Other"
  ];

  return (
    <CardContent className="space-y-6 p-6">
      {/* Prénom et Nom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="prenom">
            First Name *
          </Label>
          <div className="relative">
            <Input 
              id="prenom" 
              type="text" 
              className="pr-10 py-3 border-gray-200 rounded-lg"
              value={formData.prenom}
              onChange={(e) => handleInputChange("prenom", e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="nom">
            Last Name *
          </Label>
          <div className="relative">
            <Input 
              id="nom" 
              type="text" 
              className="pr-10 py-3 border-gray-200 rounded-lg"
              value={formData.nom}
              onChange={(e) => handleInputChange("nom", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Email et Téléphone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="email">
            Email *
          </Label>
          <div className="relative">
            <Input 
              id="email" 
              type="email" 
              className="pr-10 py-3 border-gray-200 rounded-lg"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />

          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="telephone">
            Phone *
          </Label>
          <div className="flex">
            <div className="flex items-center justify-center w-12 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
              <Plus className="h-4 w-4 text-gray-500" />
            </div>
            <div className="relative flex-1">
              <Input 
                id="telephone" 
                type="tel" 
                placeholder="Phone number"
                className="pr-10 py-3 border-gray-200 rounded-l-none rounded-r-lg border-l-0"
                value={formData.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fonction et Besoin */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="fonction">
            Function *
          </Label>
          <Select onValueChange={(value) => handleInputChange("fonction", value)}>
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
          <Label className="text-sm font-medium" htmlFor="besoin">
            Need *
          </Label>
          <Select onValueChange={(value) => handleInputChange("besoin", value)}>
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
          <Label className="text-sm font-medium" htmlFor="pays">
            Country *
          </Label>
          <Select onValueChange={(value) => handleInputChange("pays", value)}>
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
          <Label className="text-sm font-medium" htmlFor="organisation">
            Organization *
          </Label>
          <Select onValueChange={(value) => handleInputChange("organisation", value)}>
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

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full flex items-center bg-blue-600 py-7 text-lg rounded-full font-semibold text-white hover:bg-blue-700 mt-8"
      >
        <p className="flex-1">Envoyer</p>
        <div className="border border-white rounded-full h-10 flex items-center w-10">
          <ArrowRight className="ml-2 h-5 w-5" />
        </div>
      </Button>

      {/* Terms and Privacy */}
      <p className="px-8 text-center text-sm text-muted-foreground">
        En envoyant ce formulaire, vous acceptez nos{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Conditions d'utilisation
        </a>{" "}
        et notre{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Politique de confidentialité
        </a>
        .
      </p>
    </CardContent>
  );
}