"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/ui/FormError";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import {
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Building2,
  Users,
  CreditCard,
  Check,
  Loader2,
  UserPlus,
} from "lucide-react";
import { useRegistrationStore } from "@/lib/store/registrationStore";
import {
  usePlans,
  useOrganizations,
  useEventOptions,
  useRegistration,
  useValidation,
  usePricing,
  useRegistrationData,
} from "@/lib/hooks/useRegistration";
import { toast } from "sonner";
import { COUNTRIES, getPhoneCodeByCountry } from "@/lib/data/countries";
import { cn } from "@/lib/utils";

const FONCTIONS = [
  "Directeur",
  "Manager",
  "Responsable RH",
  "Commercial",
  "Chargé de mission",
  "Consultant",
  "Chef de projet",
  "Autre...",
];
const BESOINS = [
  "Networking",
  "Formation",
  "Partenariat",
  "Veille",
  "Business",
  "Autre...",
];

export default function RegistrationPage() {
  // Ajout des hooks d'état pour les valeurs personnalisées
  const [customFonction, setCustomFonction] = useState("");
  const [customBesoin, setCustomBesoin] = useState("");
  const [customFonctionGroup, setCustomFonctionGroup] = useState("");
  const [customBesoinGroup, setCustomBesoinGroup] = useState("");
  const [customFonctionsMembers, setCustomFonctionsMembers] = useState<
    string[]
  >([]);
  const [customBesoinsMembers, setCustomBesoinsMembers] = useState<string[]>(
    []
  );

  // Store Zustand
  const {
    currentStep,
    inscriptionType,
    mode,
    selectedPlan,
    individualData,
    groupData,
    isLoading,
    errors,
    paymentStatus,
    setCurrentStep,
    setInscriptionType,
    setMode,
    setSelectedPlan,
    updateIndividualField,
    updateGroupResponsable,
    addGroupMember,
    removeGroupMember,
    updateGroupMember,
    setGroupNombre,
    addIndividualService,
    removeIndividualService,
    addGroupService,
    removeGroupService,
    setGroupName,
    setLoading,
    setErrors,
    clearErrors,
    setFieldError,
    setPaymentStatus,
    reset,
    nextStep,
    prevStep,
  } = useRegistrationStore();

  // Hooks API
  const { data: plansData, isLoading: plansLoading } = usePlans();
  const { data: organizationsData, isLoading: orgsLoading } =
    useOrganizations();
  const { data: eventOptionsData, isLoading: optionsLoading } =
    useEventOptions();
  const registrationMutation = useRegistration();
  const { validateField, validateForm } = useValidation();
  const eventOptions = (eventOptionsData as any)?.event_options || [];
  const { getBasePrice, getServicesPrice, getTotalPrice } =
    usePricing(eventOptions);
  const { prepareRegistrationData } = useRegistrationData();

  // États locaux
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);

  // Configuration des étapes
  const steps = [
    { id: 1, title: "Type", description: "Membre ou non-membre" },
    { id: 2, title: "Mode", description: "Individuel ou groupe" },
    { id: 3, title: "Informations", description: "Données personnelles" },
    { id: 4, title: "Services", description: "Options additionnelles" },
    { id: 5, title: "Paiement", description: "Règlement sécurisé" },
    { id: 6, title: "Confirmation", description: "Validation finale" },
  ];

  // Fonction pour initialiser les membres du groupe
  const initializeMember = () => ({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    besoin: "",
  });

  // Fonction pour s'assurer que les membres existent
  const ensureMembersExist = () => {
    const membersNeeded = groupData.nombre - 1;
    const currentMembers = groupData.members.length;

    if (currentMembers < membersNeeded) {
      // Ajouter les membres manquants
      for (let i = currentMembers; i < membersNeeded; i++) {
        addGroupMember(initializeMember());
      }
    }
  };

  // Fonction pour ajouter un membre
  const handleAddMember = () => {
    const newMemberCount = groupData.nombre + 1;
    setGroupNombre(newMemberCount);
    addGroupMember(initializeMember());
  };

  // Fonction pour supprimer un membre
  const handleRemoveMember = (index: number) => {
    removeGroupMember(index);
    setGroupNombre(Math.max(2, groupData.nombre - 1));

    // Nettoyer les valeurs personnalisées
    setCustomFonctionsMembers((prev) => {
      const arr = [...prev];
      arr.splice(index, 1);
      return arr;
    });

    setCustomBesoinsMembers((prev) => {
      const arr = [...prev];
      arr.splice(index, 1);
      return arr;
    });
  };

  // Fonction pour mettre à jour un membre avec vérification
  const handleUpdateMember = (index: number, field: string, value: string) => {
    // S'assurer que le membre existe
    ensureMembersExist();
    updateGroupMember(index, field, value);
  };

  // Fonction pour obtenir un membre avec valeur par défaut
  const getMember = (index: number) => {
    return groupData.members[index] || initializeMember();
  };

  // Gestion du scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const checkScroll = () => {
      setShowScrollDown(
        el.scrollHeight > el.clientHeight &&
          el.scrollTop + el.clientHeight < el.scrollHeight - 2
      );
      setShowScrollUp(el.scrollHeight > el.clientHeight && el.scrollTop > 2);
    };
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [currentStep]);

  // Initialiser les membres quand le nombre change
  useEffect(() => {
    if (mode === "groupe") {
      ensureMembersExist();
    }
  }, [groupData.nombre, mode]);

  // Validation en temps réel
  const handleFieldChange = (
    field: string,
    value: string,
    formType: "individual" | "group" = "individual"
  ) => {
    const error = validateField(field, value);

    if (formType === "individual") {
      updateIndividualField(field as any, value);
    } else {
      updateGroupResponsable(field, value);
    }

    if (error) {
      setFieldError(field, error);
    } else {
      setErrors({ ...errors, [field]: "" });
    }
  };

  // Gestion des services
  const handleServiceToggle = (serviceId: string) => {
    if (mode === "individual") {
      if (individualData.services.includes(serviceId)) {
        removeIndividualService(serviceId);
      } else {
        addIndividualService(serviceId);
      }
    } else {
      if (groupData.services.includes(serviceId)) {
        removeGroupService(serviceId);
      } else {
        addGroupService(serviceId);
      }
    }
  };

  // Gestion de la soumission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      clearErrors();

      // Validation du formulaire
      let validationErrors: Record<string, string> = {};

      if (mode === "individual") {
        // Pour les inscriptions individuelles, valider selon le type
        const requiredFields = [
          "firstName",
          "lastName",
          "email",
          "phone",
          "position",
        ];

        if (inscriptionType === "member") {
          // Membre : organisation requise
          requiredFields.push("organisation");
        } else {
          // Non-membre : pays et entreprise requis
          requiredFields.push("country", "company");
        }

        requiredFields.forEach((field) => {
          const value = individualData[field as keyof typeof individualData];
          if (typeof value === "string") {
            const error = validateField(field, value);
            if (error) {
              validationErrors[field] = error;
            }
          }
        });
      } else {
        // Validation du responsable selon le type
        const requiredFields = [
          "firstName",
          "lastName",
          "email",
          "phone",
          "position",
        ];

        if (inscriptionType === "member") {
          // Membre : organisation requise
          requiredFields.push("organisation");
        } else {
          // Non-membre : pays et entreprise requis
          requiredFields.push("country", "company");
        }

        requiredFields.forEach((field) => {
          const value =
            groupData.responsable[field as keyof typeof groupData.responsable];
          if (typeof value === "string") {
            const error = validateField(field, value);
            if (error) {
              validationErrors[field] = error;
            }
          }
        });

        // Validation des membres du groupe
        groupData.members.forEach((member, index) => {
          if (!member.firstName || member.firstName.length < 2) {
            validationErrors[`member_${index}_firstName`] =
              "Prénom requis (minimum 2 caractères)";
          }
          if (!member.lastName || member.lastName.length < 2) {
            validationErrors[`member_${index}_lastName`] =
              "Nom requis (minimum 2 caractères)";
          }
          const emailError = validateField("email", member.email);
          if (emailError) {
            validationErrors[`member_${index}_email`] = emailError;
          }
        });
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);

        // Afficher les erreurs spécifiques
        const errorMessages = Object.entries(validationErrors)
          .map(([field, error]) => {
            if (field.startsWith("member_")) {
              const memberIndex = field.split("_")[1];
              const fieldName = field.split("_")[2];
              return `Membre ${
                parseInt(memberIndex) + 2
              } - ${fieldName}: ${error}`;
            }
            return `${field}: ${error}`;
          })
          .join(", ");

        toast.error(`Erreurs de validation : ${errorMessages}`);

        // Retourner à l'étape des informations pour corriger
        setCurrentStep(3);
        return;
      }

      // Préparation des données
      const registrationData = prepareRegistrationData();

      console.log(JSON.stringify(registrationData), "registrationData");

      // Soumission
      await registrationMutation.mutateAsync(registrationData);

      setPaymentStatus("success");
      nextStep();
      toast.success("Inscription réussie !");
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      setPaymentStatus("error");
      toast.error(error.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  // Calculs
  const getProgressPercentage = () => {
    return (currentStep / steps.length) * 100;
  };

  // Rendu du stepper
  const renderStepper = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-900">
          Inscription FANAF 2026
        </h2>
        <div className="text-xs text-gray-600">
          Étape {currentStep} sur {steps.length} (
          {Math.round(getProgressPercentage())}%)
        </div>
      </div>

      <div className="relative">
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Rendu des étapes
  const renderStep1 = () => {
    if (plansLoading) {
      return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Chargement des plans de participation...</p>
        </div>
      );
    }

    const plans = (plansData as any)?.plans || [];

    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Type d'inscription
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {plans.map((plan: any) => (
              <div
                key={plan.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg rounded-lg border-2 p-4 ${
                  selectedPlan?.id === plan.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
                onClick={() => {
                  setSelectedPlan(plan);
                  setInscriptionType(plan.id === 1 ? "member" : "nonMember");
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {plan.id === 1 ? "🏢" : "🌍"}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    {plan.description}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full mb-2">
                    Tarif : {parseFloat(plan.price).toLocaleString()} FCFA
                  </span>
                  <ul className="text-start text-xs text-gray-600 space-y-1">
                    {plan.included_services.map((service: any, index: any) => (
                      <li key={index}>✓ {service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={nextStep}
              disabled={!selectedPlan}
              className="px-6"
            >
              Continuer <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          Mode d'inscription
        </h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div
            className={`cursor-pointer transition-all duration-300 hover rounded-lg border-2 p-6 ${
              mode === "individual"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
            onClick={() => setMode("individual")}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Inscription individuelle
              </h3>
              <p className="text-gray-600 mb-4">Pour une personne</p>
            </div>
          </div>

          <div
            className={`cursor-pointer transition-all duration-300 hover rounded-lg border-2 p-6 ${
              mode === "groupe"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
            onClick={() => setMode("groupe")}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Inscription en groupe
              </h3>
              <p className="text-gray-600 mb-4">Pour plusieurs personnes</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Retour
          </Button>
          <Button onClick={nextStep} disabled={!mode} className="px-8">
            Continuer <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (orgsLoading) {
      return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Chargement des organisations...</p>
        </div>
      );
    }

    const organizations = (organizationsData as any)?.data || [];

    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            Informations personnelles
          </h3>
        </div>
        <div className="p-6 space-y-6">
          {mode === "individual" ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={individualData.firstName}
                  onChange={(e) =>
                    handleFieldChange("firstName", e.target.value)
                  }
                  className={errors.firstName ? "border-red-500" : ""}
                />
                <FormError error={errors.firstName} />
              </div>

              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={individualData.lastName}
                  onChange={(e) =>
                    handleFieldChange("lastName", e.target.value)
                  }
                  className={errors.lastName ? "border-red-500" : ""}
                />
                <FormError error={errors.lastName} />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={individualData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                <FormError error={errors.email} />
              </div>

              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center px-3 py-[0.59rem] text-sm border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                      {getPhoneCodeByCountry(individualData.country)}
                    </div>
                  </div>
                  <Input
                    id="phone"
                    value={individualData.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    className={cn(
                      "rounded-l-none",
                      errors.phone ? "border-red-500" : ""
                    )}
                    placeholder="Numéro de téléphone"
                  />
                </div>
                <FormError error={errors.phone} />
              </div>

              <div>
                <Label htmlFor="fonction">Fonction *</Label>
                <Select
                  value={individualData.position}
                  onValueChange={(value) => {
                    handleFieldChange("position", value);
                    if (value !== "Autre...") setCustomFonction("");
                  }}
                >
                  <SelectTrigger
                    className={errors.position ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Sélectionnez votre fonction" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONCTIONS.map((fonction) => (
                      <SelectItem key={fonction} value={fonction}>
                        {fonction}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {individualData.position === "Autre..." && (
                  <Input
                    className="mt-2"
                    placeholder="Votre fonction"
                    value={customFonction}
                    onChange={(e) => setCustomFonction(e.target.value)}
                  />
                )}
                <FormError error={errors.position} />
              </div>

              <div>
                <Label htmlFor="besoin">Besoin *</Label>
                <Select
                  value={individualData.besoin || ""}
                  onValueChange={(value) => {
                    handleFieldChange("besoin", value);
                    if (value !== "Autre...") setCustomBesoin("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre besoin" />
                  </SelectTrigger>
                  <SelectContent>
                    {BESOINS.map((besoin) => (
                      <SelectItem key={besoin} value={besoin}>
                        {besoin}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {individualData.besoin === "Autre..." && (
                  <Input
                    className="mt-2"
                    placeholder="Votre besoin"
                    value={customBesoin}
                    onChange={(e) => setCustomBesoin(e.target.value)}
                  />
                )}
              </div>

              <div>
                <Label htmlFor="country">Pays *</Label>
                <Select
                  value={individualData.country}
                  onValueChange={(value) => handleFieldChange("country", value)}
                >
                  <SelectTrigger
                    className={errors.country ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Sélectionnez votre pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.name} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormError error={errors.country} />
              </div>

              {inscriptionType === "member" ? (
                <div>
                  <Label htmlFor="organisation">Organisation *</Label>
                  <Select
                    value={individualData.organisation}
                    onValueChange={(value) =>
                      handleFieldChange("organisation", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.organisation ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Sélectionnez votre organisation" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map((org: any) => (
                        <SelectItem key={org.id} value={org.name}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormError error={errors.organisation} />
                </div>
              ) : (
                <div>
                  <Label htmlFor="company">Entreprise *</Label>
                  <Input
                    id="company"
                    value={individualData.company}
                    onChange={(e) =>
                      handleFieldChange("company", e.target.value)
                    }
                    className={errors.company ? "border-red-500" : ""}
                  />
                  <FormError error={errors.company} />
                </div>
              )}
            </div>
          ) : (
            // Formulaire groupe
            <div className="space-y-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Responsable du groupe
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Prénom *</Label>
                    <Input
                      value={groupData.responsable.firstName}
                      onChange={(e) =>
                        handleFieldChange("firstName", e.target.value, "group")
                      }
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    <FormError error={errors.firstName} />
                  </div>
                  <div>
                    <Label>Nom *</Label>
                    <Input
                      value={groupData.responsable.lastName}
                      onChange={(e) =>
                        handleFieldChange("lastName", e.target.value, "group")
                      }
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    <FormError error={errors.lastName} />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input
                      value={groupData.responsable.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value, "group")
                      }
                      className={errors.email ? "border-red-500" : ""}
                    />
                    <FormError error={errors.email} />
                  </div>
                  <div>
                    <Label>Téléphone *</Label>
                    <Input
                      value={groupData.responsable.phone}
                      onChange={(e) =>
                        handleFieldChange("phone", e.target.value, "group")
                      }
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    <FormError error={errors.phone} />
                  </div>
                  <div>
                    <Label>Fonction *</Label>
                    <Select
                      value={groupData.responsable.position}
                      onValueChange={(value) => {
                        handleFieldChange("position", value, "group");
                        if (value !== "Autre...") setCustomFonctionGroup("");
                      }}
                    >
                      <SelectTrigger
                        className={errors.position ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Sélectionnez la fonction" />
                      </SelectTrigger>
                      <SelectContent>
                        {FONCTIONS.map((fonction) => (
                          <SelectItem key={fonction} value={fonction}>
                            {fonction}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {groupData.responsable.position === "Autre..." && (
                      <Input
                        className="mt-2"
                        placeholder="Votre fonction"
                        value={customFonctionGroup}
                        onChange={(e) => setCustomFonctionGroup(e.target.value)}
                      />
                    )}
                    <FormError error={errors.position} />
                  </div>
                  <div>
                    <Label>Besoin *</Label>
                    <Select
                      value={groupData.responsable.besoin || ""}
                      onValueChange={(value) => {
                        handleFieldChange("besoin", value, "group");
                        if (value !== "Autre...") setCustomBesoinGroup("");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le besoin" />
                      </SelectTrigger>
                      <SelectContent>
                        {BESOINS.map((besoin) => (
                          <SelectItem key={besoin} value={besoin}>
                            {besoin}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {groupData.responsable.besoin === "Autre..." && (
                      <Input
                        className="mt-2"
                        placeholder="Votre besoin"
                        value={customBesoinGroup}
                        onChange={(e) => setCustomBesoinGroup(e.target.value)}
                      />
                    )}
                  </div>
                  {inscriptionType === "member" ? (
                    <div>
                      <Label>Organisation *</Label>
                      <Select
                        value={groupData.responsable.organisation}
                        onValueChange={(value) =>
                          handleFieldChange("organisation", value, "group")
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.organisation ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Sélectionnez votre organisation" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizations.map((org: any) => (
                            <SelectItem key={org.id} value={org.name}>
                              {org.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormError error={errors.organisation} />
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label>Pays *</Label>
                        <Select
                          value={groupData.responsable.country}
                          onValueChange={(value) =>
                            handleFieldChange("country", value, "group")
                          }
                        >
                          <SelectTrigger
                            className={errors.country ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Sélectionnez votre pays" />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRIES.map((country) => (
                              <SelectItem
                                key={country.name}
                                value={country.name}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormError error={errors.country} />
                      </div>
                      <div>
                        <Label>Entreprise *</Label>
                        <Input
                          value={groupData.responsable.company}
                          onChange={(e) =>
                            handleFieldChange(
                              "company",
                              e.target.value,
                              "group"
                            )
                          }
                          className={errors.company ? "border-red-500" : ""}
                        />
                        <FormError error={errors.company} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Membres du groupe
                    </h4>
                    <p className="text-sm text-gray-600">
                      {groupData.nombre} personne
                      {groupData.nombre > 1 ? "s" : ""} au total
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddMember}
                    className="flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />+ Ajouter un membre
                  </Button>
                </div>

                <div className="space-y-6">
                  {Array.from({ length: groupData.nombre - 1 }).map(
                    (_, idx) => {
                      const member = getMember(idx);

                      return (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium text-gray-900 flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                {idx + 2}
                              </div>
                              Membre #{idx + 2}
                            </h5>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveMember(idx)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Supprimer
                            </Button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label htmlFor={`member-${idx}-firstName`}>
                                Prénom *
                              </Label>
                              <Input
                                id={`member-${idx}-firstName`}
                                placeholder="Prénom"
                                value={member.firstName}
                                onChange={(e) =>
                                  handleUpdateMember(
                                    idx,
                                    "firstName",
                                    e.target.value
                                  )
                                }
                                className={
                                  errors[`member_${idx}_firstName`]
                                    ? "border-red-500"
                                    : ""
                                }
                              />
                              <FormError
                                error={errors[`member_${idx}_firstName`]}
                              />
                            </div>

                            <div>
                              <Label htmlFor={`member-${idx}-lastName`}>
                                Nom *
                              </Label>
                              <Input
                                id={`member-${idx}-lastName`}
                                placeholder="Nom"
                                value={member.lastName}
                                onChange={(e) =>
                                  handleUpdateMember(
                                    idx,
                                    "lastName",
                                    e.target.value
                                  )
                                }
                                className={
                                  errors[`member_${idx}_lastName`]
                                    ? "border-red-500"
                                    : ""
                                }
                              />
                              <FormError
                                error={errors[`member_${idx}_lastName`]}
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label htmlFor={`member-${idx}-email`}>
                                Email *
                              </Label>
                              <Input
                                id={`member-${idx}-email`}
                                type="email"
                                placeholder="email@exemple.com"
                                value={member.email}
                                onChange={(e) =>
                                  handleUpdateMember(
                                    idx,
                                    "email",
                                    e.target.value
                                  )
                                }
                                className={
                                  errors[`member_${idx}_email`]
                                    ? "border-red-500"
                                    : ""
                                }
                              />
                              <FormError
                                error={errors[`member_${idx}_email`]}
                              />
                            </div>

                            <div>
                              <Label htmlFor={`member-${idx}-position`}>
                                Fonction
                              </Label>
                              <Select
                                value={member.position}
                                onValueChange={(value) => {
                                  handleUpdateMember(idx, "position", value);
                                  if (value !== "Autre...") {
                                    setCustomFonctionsMembers((prev) => {
                                      const arr = [...prev];
                                      arr[idx] = "";
                                      return arr;
                                    });
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez la fonction" />
                                </SelectTrigger>
                                <SelectContent>
                                  {FONCTIONS.map((fonction) => (
                                    <SelectItem key={fonction} value={fonction}>
                                      {fonction}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {member.position === "Autre..." && (
                                <Input
                                  className="mt-2"
                                  placeholder="Précisez la fonction"
                                  value={customFonctionsMembers[idx] || ""}
                                  onChange={(e) => {
                                    setCustomFonctionsMembers((prev) => {
                                      const arr = [...prev];
                                      arr[idx] = e.target.value;
                                      return arr;
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor={`member-${idx}-besoin`}>
                              Besoin
                            </Label>
                            <Select
                              value={member.besoin}
                              onValueChange={(value) => {
                                handleUpdateMember(idx, "besoin", value);
                                if (value !== "Autre...") {
                                  setCustomBesoinsMembers((prev) => {
                                    const arr = [...prev];
                                    arr[idx] = "";
                                    return arr;
                                  });
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez le besoin" />
                              </SelectTrigger>
                              <SelectContent>
                                {BESOINS.map((besoin) => (
                                  <SelectItem key={besoin} value={besoin}>
                                    {besoin}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {member.besoin === "Autre..." && (
                              <Input
                                className="mt-2"
                                placeholder="Précisez le besoin"
                                value={customBesoinsMembers[idx] || ""}
                                onChange={(e) => {
                                  setCustomBesoinsMembers((prev) => {
                                    const arr = [...prev];
                                    arr[idx] = e.target.value;
                                    return arr;
                                  });
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Retour
            </Button>
            <Button onClick={nextStep} className="px-8">
              Continuer <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    if (optionsLoading) {
      return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Chargement des services...</p>
        </div>
      );
    }

    const selectedServices =
      mode === "individual" ? individualData.services : groupData.services;

    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            Services additionnels
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {eventOptions.map((service: any) => (
              <div
                key={service.id}
                className={`cursor-pointer transition-all duration-300 hover rounded-lg border-2 p-6 ${
                  selectedServices.includes(service.id.toString())
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
                onClick={() => handleServiceToggle(service.id.toString())}
              >
                <div className="flex items-start gap-4">
                  <ServiceIcon type={service.type} className="text-2xl" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                        {parseFloat(service.additional_cost).toLocaleString()}{" "}
                        FCFA
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {service.description}
                    </p>
                    {selectedServices.includes(service.id.toString()) && (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <Check className="w-4 h-4" />
                        Sélectionné
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Récapitulatif des coûts */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              Récapitulatif des coûts
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Inscription de base</span>
                <span>{getBasePrice().toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Services sélectionnés</span>
                <span>{getServicesPrice().toLocaleString()} FCFA</span>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-blue-600">
                  {getTotalPrice().toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Retour
            </Button>
            <Button onClick={nextStep} className="px-8">
              Continuer <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep5 = () => (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-blue-600" />
          Paiement sécurisé
        </h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Montant à régler
          </h3>
          <div className="text-3xl font-bold text-blue-600 mb-6">
            {getTotalPrice().toLocaleString()} FCFA
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Modes de paiement acceptés :
            </p>
            <div className="flex justify-center gap-4">
              <div className="text-2xl">💳</div>
              <div className="text-2xl">🏦</div>
              <div className="text-2xl">📱</div>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
          onClick={handleSubmit}
          disabled={isLoading || registrationMutation.isPending}
        >
          {isLoading || registrationMutation.isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Traitement en cours...
            </div>
          ) : (
            "Procéder au paiement"
          )}
        </Button>

        <Button variant="outline" onClick={prevStep} className="w-full">
          <ChevronLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg">
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Inscription réussie !
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Votre inscription a été confirmée avec succès.
          <br />
          Un email de confirmation vous sera envoyé sous 24h.
        </p>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-green-800 mb-2">
            Prochaines étapes :
          </h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Vérifiez votre email pour la confirmation</li>
            <li>• Préparez vos documents d'identité</li>
            <li>• Notez les informations de connexion</li>
          </ul>
        </div>

        <Button
          onClick={() => {
            reset();
            setCurrentStep(1);
          }}
          className="px-8"
        >
          Nouvelle inscription
        </Button>
      </div>
    </div>
  );

  // Rendu principal
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/images/header-homepage.png"
      >
        <source src="/videos/video_fanaf.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Section gauche : illustration et branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 h-full py-10 px-12 relative z-10">
        {/* Illustration principale */}
        <div className="flex-1 flex items-center justify-center">
          <svg
            width="340"
            height="260"
            viewBox="0 0 340 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="20"
              y="60"
              width="120"
              height="80"
              rx="16"
              fill="#fff"
              fillOpacity="0.08"
            />
            <rect
              x="160"
              y="30"
              width="140"
              height="110"
              rx="20"
              fill="#fff"
              fillOpacity="0.10"
            />
            <ellipse
              cx="170"
              cy="200"
              rx="120"
              ry="30"
              fill="#fff"
              fillOpacity="0.07"
            />
            <circle cx="80" cy="120" r="18" fill="#fff" fillOpacity="0.13" />
            <circle cx="250" cy="80" r="14" fill="#fff" fillOpacity="0.10" />
            <rect
              x="110"
              y="110"
              width="60"
              height="30"
              rx="8"
              fill="#fff"
              fillOpacity="0.12"
            />
          </svg>
        </div>
        {/* Footer branding ou info */}
        <div className="flex items-center gap-3 pb-0 mb-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
            <img
              src="https://asaci.net/team/pr.jpg"
              alt="Pin Min"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-white">
              Mamadou GK Koné{" "}
              <span className="text-xs text-blue-200 font-normal ml-2">
                Président de l'ASACI
              </span>
            </div>
            <div className="text-blue-100 text-sm">
              Soyez le bienvenue à la 50ᵉ Assemblée Générale de la FANAF
            </div>
          </div>
        </div>
      </div>

      {/* Section droite : panneau formulaire */}
      <div className="flex-1 flex items-center justify-center min-h-screen py-12 px-4 bg-transparent relative z-20">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-8 animate-fade-in max-h-[85vh] h-[85vh]">
          <div className="mb-2 flex-shrink-0">
            <h2 className="text-3xl font-bold text-blue-900 mb-1">
              Bienvenue !
            </h2>
            <p className="text-gray-500 text-base">
              Merci de renseigner vos informations pour participer à la 50ᵉ
              Assemblée Générale de la FANAF.
            </p>
          </div>
          {/* Stepper et formulaire existant, scrollable */}
          <div
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto scrollbar-hide relative"
          >
            {renderStepper()}
            <div className="flex justify-center mt-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
              {currentStep === 6 && renderStep6()}
            </div>
            {showScrollDown && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <svg
                  className="w-7 h-7 text-blue-400 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            )}
            {showScrollUp && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <svg
                  className="w-7 h-7 text-blue-400 animate-bounce rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Décorations flottantes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 right-10 w-10 h-10 bg-white/10 rounded-full blur-xl animate-float"></div>
      </div>
    </main>
  );
}
