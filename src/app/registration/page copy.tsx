// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { CheckCircle, AlertCircle, ChevronRight, ChevronLeft, Building2, Users, CreditCard, Check } from "lucide-react";

// // Configuration des tarifs et services
// const TARIFFS = {
//   member: { individual: 350000, group: 300000 },
//   nonMember: { individual: 500000, group: 450000 },
// };

// const SERVICES = [
//   { 
//     value: "navette", 
//     label: "Navette aéroport", 
//     price: 25000,
//     description: "Transport aller-retour depuis l'aéroport Félix Houphouët-Boigny",
//     icon: "🚐"
//   },
//   { 
//     value: "car", 
//     label: "Car de ramassage", 
//     price: 15000,
//     description: "Transport quotidien entre hôtels et lieu de l'événement",
//     icon: "🚌"
//   },
//   { 
//     value: "hotel", 
//     label: "Hôtel partenaire", 
//     price: 75000,
//     description: "Hébergement 4 étoiles avec petit-déjeuner inclus",
//     icon: "🏨"
//   },
//   { 
//     value: "dinner", 
//     label: "Dîner de gala", 
//     price: 50000,
//     description: "Dîner officiel du 50ème anniversaire",
//     icon: "🍽️"
//   },
// ];

// const ORGANISATIONS = [
//   "NSIA Assurance", "Allianz Côte d'Ivoire", "Sanlam", "AXA Africa", 
//   "Atlantique Assurances", "Saham Assurance", "CNART", "Autre..."
// ];

// const COUNTRIES = [
//   "Côte d'Ivoire", "Sénégal", "Ghana", "Nigeria", "Cameroun", "Mali", 
//   "Burkina Faso", "Bénin", "Togo", "Niger", "Tchad", "République Centrafricaine", 
//   "Gabon", "Congo", "République Démocratique du Congo", "Rwanda", "Burundi", 
//   "Tanzanie", "Kenya", "Ouganda", "Éthiopie", "Somalie", "Djibouti", "Soudan", 
//   "Soudan du Sud", "Érythrée", "Égypte", "Libye", "Tunisie", "Algérie", 
//   "Maroc", "Mauritanie", "Autre"
// ];

// // Types pour la validation
// interface ValidationErrors {
//   [key: string]: string;
// }

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   position: string;
//   organisation: string;
//   company: string;
//   country: string;
//   services: string[];
// }

// export default function RegistrationPage() {
//   // États principaux
//   const [currentStep, setCurrentStep] = useState(1);
//   const [inscriptionType, setInscriptionType] = useState<"member"|"nonMember"|null>(null);
//   const [mode, setMode] = useState<"individual"|"groupe"|null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<ValidationErrors>({});

//   // Données du formulaire
//   const [individualData, setIndividualData] = useState<FormData>({
//     firstName: "", lastName: "", email: "", phone: "", position: "",
//     organisation: "", company: "", country: "", services: []
//   });

//   const [groupData, setGroupData] = useState({
//     responsable: {
//       firstName: "", lastName: "", email: "", phone: "", position: "",
//       organisation: "", company: "", country: ""
//     },
//     members: [] as Array<{firstName: string, lastName: string, email: string}>,
//     services: [] as string[],
//     nombre: 2
//   });

//   // États pour l'UX
//   const [showSummary, setShowSummary] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState<"pending"|"success"|"error"|null>(null);

//   // Configuration des étapes
//   const steps = [
//     { id: 1, title: "Type", description: "Membre ou non-membre" },
//     { id: 2, title: "Mode", description: "Individuel ou groupe" },
//     { id: 3, title: "Informations", description: "Données personnelles" },
//     { id: 4, title: "Services", description: "Options additionnelles" },
//     { id: 5, title: "Paiement", description: "Règlement sécurisé" },
//     { id: 6, title: "Confirmation", description: "Validation finale" }
//   ];

//   // Validation en temps réel
//   const validateField = (field: string, value: string): string => {
//     switch (field) {
//       case 'email':
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return !emailRegex.test(value) ? 'Email invalide' : '';
//       case 'phone':
//         return value.length < 8 ? 'Numéro de téléphone invalide' : '';
//       case 'firstName':
//       case 'lastName':
//         return value.length < 2 ? 'Minimum 2 caractères requis' : '';
//       default:
//         return value.length === 0 ? 'Ce champ est requis' : '';
//     }
//   };

//   const handleFieldChange = (field: string, value: string, formType: 'individual' | 'group' = 'individual') => {
//     const error = validateField(field, value);
    
//     if (formType === 'individual') {
//       setIndividualData(prev => ({ ...prev, [field]: value }));
//     } else {
//       setGroupData(prev => ({
//         ...prev,
//         responsable: { ...prev.responsable, [field]: value }
//       }));
//     }

//     setErrors(prev => ({
//       ...prev,
//       [field]: error
//     }));
//   };

//   // Calculs
//   const getBasePrice = () => {
//     if (!inscriptionType || !mode) return 0;
//     return TARIFFS[inscriptionType][mode === 'groupe' ? 'group' : 'individual'];
//   };

//   const getServicesPrice = () => {
//     const selectedServices = mode === 'individual' ? individualData.services : groupData.services;
//     const multiplier = mode === 'groupe' ? groupData.nombre : 1;
//     return selectedServices.reduce((total, service) => {
//       const serviceData = SERVICES.find(s => s.value === service);
//       return total + (serviceData?.price || 0) * multiplier;
//     }, 0);
//   };

//   const getTotalPrice = () => {
//     const basePrice = getBasePrice();
//     const servicesPrice = getServicesPrice();
//     return basePrice + servicesPrice;
//   };

//   const getProgressPercentage = () => {
//     return (currentStep / steps.length) * 100;
//   };

//   // Navigation
//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(prev => prev + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(prev => prev - 1);
//     }
//   };

//   // Rendu du stepper
//   const renderStepper = () => (
//     <div className="mb-6">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-xl font-bold text-gray-900">Inscription FANAF 2026</h2>
//         <div className="text-xs text-gray-600">
//           Étape {currentStep} sur {steps.length} ({Math.round(getProgressPercentage())}%)
//         </div>
//       </div>
      
//       <div className="relative">
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex items-center">
//               <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
//                 currentStep >= step.id 
//                   ? 'bg-blue-600 border-blue-600 text-white text-[7px]' 
//                   : 'bg-white border-gray-300 text-gray-500 text-[7px]'
//               }`}>
//                 {currentStep > step.id ? (
//                   <Check className="w-4 h-4" />
//                 ) : (
//                   <span className="text-xs font-semibold">{step.id}</span>
//                 )}
//               </div>
//               <div className="ml-2 hidden md:block">
//                 <div className={`text-xs font-medium ${
//                   currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
//                 }`}>
//                   {step.title}
//                 </div>
//                 {/* <div className="text-xs text-gray-400">{step.description}</div> */}
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`w-4 h-0.5 mx-2 transition-all duration-300 ${
//                   currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
        
//         {/* Barre de progression */}
//         <div className="mt-3">
//           <div className="w-full bg-gray-200 rounded-full h-1.5">
//             <div 
//               className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${getProgressPercentage()}%` }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Rendu des étapes
//   const renderStep1 = () => (
//     <div className="w-full max-w-2xl mx-auto bg-white rounded-lg">
//       <div className="p-4 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//           <Building2 className="w-5 h-5 text-blue-600" />
//           Type d'inscription
//         </h3>
//       </div>
//       <div className="p-4 space-y-4">
//         <div className="grid md:grid-cols-2 gap-4">
//           <div 
//             className={`cursor-pointer transition-all duration-300 hover:shadow-lg rounded-lg border-2 p-4 ${
//               inscriptionType === 'member' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
//             }`}
//             onClick={() => setInscriptionType('member')}
//           >
//             <div className="text-center">
//               <div className="text-2xl mb-2">🏢</div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-1">Membre FANAF</h3>
//               <p className="text-gray-600 mb-3 text-sm">Société d'assurance membre de la FANAF</p>
//               <span className="inline-block px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full mb-2">
//                 Tarif préférentiel : {TARIFFS.member.individual.toLocaleString()} FCFA
//               </span>
//               <ul className="text-xs text-gray-600 space-y-1">
//                 <li>✓ Accès complet à toutes les sessions</li>
//                 <li>✓ Documentation officielle</li>
//                 <li>✓ Réseautage privilégié</li>
//               </ul>
//             </div>
//           </div>

//           <div 
//             className={`cursor-pointer transition-all duration-300 hover:shadow-lg rounded-lg border-2 p-4 ${
//               inscriptionType === 'nonMember' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
//             }`}
//             onClick={() => setInscriptionType('nonMember')}
//           >
//             <div className="text-center">
//               <div className="text-2xl mb-2">🌍</div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-1">Non-membre</h3>
//               <p className="text-gray-600 mb-3 text-sm">Autre organisation ou professionnel</p>
//               <span className="inline-block px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full mb-2">
//                 Tarif standard : {TARIFFS.nonMember.individual.toLocaleString()} FCFA
//               </span>
//               <ul className="text-xs text-gray-600 space-y-1">
//                 <li>✓ Accès complet à toutes les sessions</li>
//                 <li>✓ Documentation officielle</li>
//                 <li>✓ Opportunités de partenariat</li>
//               </ul>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex justify-end">
//           <Button 
//             onClick={nextStep}
//             disabled={!inscriptionType}
//             className="px-6"
//           >
//             Continuer <ChevronRight className="w-4 h-4 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="w-full max-w-2xl mx-auto bg-white rounded-lg">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//           <Users className="w-6 h-6 text-blue-600" />
//           Mode d'inscription
//         </h3>
//       </div>
//       <div className="p-6 space-y-6">
//         <div className="grid md:grid-cols-2 gap-6">
//           <div 
//             className={`cursor-pointer transition-all duration-300 hover rounded-lg border-2 p-6 ${
//               mode === 'individual' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
//             }`}
//             onClick={() => setMode('individual')}
//           >
//             <div className="text-center">
//               <div className="text-3xl mb-3">👤</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Inscription individuelle</h3>
//               <p className="text-gray-600 mb-4">Pour une personne</p>
//               <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
//                 {inscriptionType === 'member' 
//                   ? `${TARIFFS.member.individual.toLocaleString()} FCFA`
//                   : `${TARIFFS.nonMember.individual.toLocaleString()} FCFA`
//                 }
//               </span>
//             </div>
//           </div>

//           <div 
//             className={`cursor-pointer transition-all duration-300 hover rounded-lg border-2 p-6 ${
//               mode === 'groupe' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
//             }`}
//             onClick={() => setMode('groupe')}
//           >
//             <div className="text-center">
//               <div className="text-3xl mb-3">👥</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Inscription en groupe</h3>
//               <p className="text-gray-600 mb-4">Pour plusieurs personnes</p>
//               <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
//                 Tarif réduit par personne
//               </span>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex justify-between">
//           <Button variant="outline" onClick={prevStep}>
//             <ChevronLeft className="w-4 h-4 mr-2" /> Retour
//           </Button>
//           <Button 
//             onClick={nextStep}
//             disabled={!mode}
//             className="px-8"
//           >
//             Continuer <ChevronRight className="w-4 h-4 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep3 = () => (
//     <div className="w-full max-w-4xl mx-auto bg-white rounded-lg">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//           <CheckCircle className="w-6 h-6 text-blue-600" />
//           Informations personnelles
//         </h3>
//       </div>
//       <div className="p-6 space-y-6">
//         {mode === 'individual' ? (
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <Label htmlFor="firstName">Prénom *</Label>
//               <Input
//                 id="firstName"
//                 value={individualData.firstName}
//                 onChange={(e) => handleFieldChange('firstName', e.target.value)}
//                 className={errors.firstName ? 'border-red-500' : ''}
//               />
//               {errors.firstName && (
//                 <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.firstName}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <Label htmlFor="lastName">Nom *</Label>
//               <Input
//                 id="lastName"
//                 value={individualData.lastName}
//                 onChange={(e) => handleFieldChange('lastName', e.target.value)}
//                 className={errors.lastName ? 'border-red-500' : ''}
//               />
//               {errors.lastName && (
//                 <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.lastName}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <Label htmlFor="email">Email *</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={individualData.email}
//                 onChange={(e) => handleFieldChange('email', e.target.value)}
//                 className={errors.email ? 'border-red-500' : ''}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.email}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <Label htmlFor="phone">Téléphone *</Label>
//               <Input
//                 id="phone"
//                 value={individualData.phone}
//                 onChange={(e) => handleFieldChange('phone', e.target.value)}
//                 className={errors.phone ? 'border-red-500' : ''}
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.phone}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <Label htmlFor="position">Poste *</Label>
//               <Input
//                 id="position"
//                 value={individualData.position}
//                 onChange={(e) => handleFieldChange('position', e.target.value)}
//               />
//             </div>
            
//             {inscriptionType === 'member' ? (
//               <div>
//                 <Label htmlFor="organisation">Organisation *</Label>
//                 <Select 
//                   value={individualData.organisation} 
//                   onValueChange={(value) => handleFieldChange('organisation', value)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez votre organisation" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {ORGANISATIONS.map(org => (
//                       <SelectItem key={org} value={org}>{org}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             ) : (
//               <>
//                 <div>
//                   <Label htmlFor="country">Pays *</Label>
//                   <Select 
//                     value={individualData.country} 
//                     onValueChange={(value) => handleFieldChange('country', value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Sélectionnez votre pays" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {COUNTRIES.map(country => (
//                         <SelectItem key={country} value={country}>{country}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label htmlFor="company">Entreprise *</Label>
//                   <Input
//                     id="company"
//                     value={individualData.company}
//                     onChange={(e) => handleFieldChange('company', e.target.value)}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           // Formulaire groupe
//           <div className="space-y-8">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h4 className="font-semibold text-blue-900 mb-2">Responsable du groupe</h4>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Prénom *</Label>
//                   <Input
//                     value={groupData.responsable.firstName}
//                     onChange={(e) => handleFieldChange('firstName', e.target.value, 'group')}
//                   />
//                 </div>
//                 <div>
//                   <Label>Nom *</Label>
//                   <Input
//                     value={groupData.responsable.lastName}
//                     onChange={(e) => handleFieldChange('lastName', e.target.value, 'group')}
//                   />
//                 </div>
//                 <div>
//                   <Label>Email *</Label>
//                   <Input
//                     value={groupData.responsable.email}
//                     onChange={(e) => handleFieldChange('email', e.target.value, 'group')}
//                   />
//                 </div>
//                 <div>
//                   <Label>Téléphone *</Label>
//                   <Input
//                     value={groupData.responsable.phone}
//                     onChange={(e) => handleFieldChange('phone', e.target.value, 'group')}
//                   />
//                 </div>
//                 <div>
//                   <Label>Poste *</Label>
//                   <Input
//                     value={groupData.responsable.position}
//                     onChange={(e) => handleFieldChange('position', e.target.value, 'group')}
//                   />
//                 </div>
//                 {inscriptionType === 'member' ? (
//                   <div>
//                     <Label>Organisation *</Label>
//                     <Select 
//                       value={groupData.responsable.organisation} 
//                       onValueChange={(value) => handleFieldChange('organisation', value, 'group')}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Sélectionnez votre organisation" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {ORGANISATIONS.map(org => (
//                           <SelectItem key={org} value={org}>{org}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 ) : (
//                   <>
//                     <div>
//                       <Label>Pays *</Label>
//                       <Select 
//                         value={groupData.responsable.country} 
//                         onValueChange={(value) => handleFieldChange('country', value, 'group')}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Sélectionnez votre pays" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {COUNTRIES.map(country => (
//                             <SelectItem key={country} value={country}>{country}</SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div>
//                       <Label>Entreprise *</Label>
//                       <Input
//                         value={groupData.responsable.company}
//                         onChange={(e) => handleFieldChange('company', e.target.value, 'group')}
//                       />
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="font-semibold text-gray-900">Membres du groupe</h4>
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm text-gray-600">
//                     {groupData.nombre} personne{groupData.nombre > 1 ? 's' : ''}
//                   </span>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setGroupData(g => ({ ...g, nombre: g.nombre + 1 }))}
//                   >
//                     + Ajouter
//                   </Button>
//                 </div>
//               </div>
              
//               <div className="space-y-3">
//                 {Array.from({ length: groupData.nombre - 1 }).map((_, idx) => (
//                   <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
//                     <div className="flex items-center gap-4">
//                       <div className="flex-1 grid md:grid-cols-3 gap-3">
//                         <Input
//                           placeholder={`Prénom membre #${idx + 2}`}
//                           value={groupData.members[idx]?.firstName || ""}
//                           onChange={e => {
//                             const members = [...groupData.members];
//                             members[idx] = { ...members[idx], firstName: e.target.value };
//                             setGroupData(g => ({ ...g, members }));
//                           }}
//                         />
//                         <Input
//                           placeholder={`Nom membre #${idx + 2}`}
//                           value={groupData.members[idx]?.lastName || ""}
//                           onChange={e => {
//                             const members = [...groupData.members];
//                             members[idx] = { ...members[idx], lastName: e.target.value };
//                             setGroupData(g => ({ ...g, members }));
//                           }}
//                         />
//                         <Input
//                           placeholder="Email"
//                           value={groupData.members[idx]?.email || ""}
//                           onChange={e => {
//                             const members = [...groupData.members];
//                             members[idx] = { ...members[idx], email: e.target.value };
//                             setGroupData(g => ({ ...g, members }));
//                           }}
//                         />
//                       </div>
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => {
//                           const members = [...groupData.members];
//                           members.splice(idx, 1);
//                           setGroupData(g => ({ ...g, members, nombre: Math.max(2, g.nombre - 1) }));
//                         }}
//                       >
//                         Supprimer
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
        
//         <div className="flex justify-between">
//           <Button variant="outline" onClick={prevStep}>
//             <ChevronLeft className="w-4 h-4 mr-2" /> Retour
//           </Button>
//           <Button 
//             onClick={nextStep}
//             className="px-8"
//           >
//             Continuer <ChevronRight className="w-4 h-4 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep4 = () => (
//     <div className="w-full max-w-4xl mx-auto bg-white rounded-lg">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//           <CheckCircle className="w-6 h-6 text-blue-600" />
//           Services additionnels
//         </h3>
//       </div>
//       <div className="p-6 space-y-6">
//         <div className="grid md:grid-cols-2 gap-6">
//           {SERVICES.map(service => (
//             <div 
//               key={service.value}
//               className={`cursor-pointer transition-all duration-300 hover rounded-lg border-2 p-6 ${
//                 (mode === 'individual' ? individualData.services : groupData.services).includes(service.value)
//                   ? 'border-blue-600 bg-blue-50' 
//                   : 'border-gray-200 bg-white hover:bg-gray-50'
//               }`}
//               onClick={() => {
//                 if (mode === 'individual') {
//                   setIndividualData(prev => ({
//                     ...prev,
//                     services: prev.services.includes(service.value)
//                       ? prev.services.filter(s => s !== service.value)
//                       : [...prev.services, service.value]
//                   }));
//                 } else {
//                   setGroupData(prev => ({
//                     ...prev,
//                     services: prev.services.includes(service.value)
//                       ? prev.services.filter(s => s !== service.value)
//                       : [...prev.services, service.value]
//                   }));
//                 }
//               }}
//             >
//               <div className="flex items-start gap-4">
//                 <div className="text-2xl">{service.icon}</div>
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="font-semibold text-gray-900">{service.label}</h3>
//                     <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
//                       {service.price.toLocaleString()} FCFA
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-3">{service.description}</p>
//                   {(mode === 'individual' ? individualData.services : groupData.services).includes(service.value) && (
//                     <div className="flex items-center gap-1 text-green-600 text-sm">
//                       <Check className="w-4 h-4" />
//                       Sélectionné
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Récapitulatif des coûts */}
//         <div className="bg-gray-50 rounded-lg p-6">
//           <h4 className="font-semibold text-gray-900 mb-4">Récapitulatif des coûts</h4>
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span>Inscription de base</span>
//               <span>{getBasePrice().toLocaleString()} FCFA</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Services sélectionnés</span>
//               <span>{getServicesPrice().toLocaleString()} FCFA</span>
//             </div>
//             <div className="border-t border-gray-300 my-2"></div>
//             <div className="flex justify-between font-semibold text-lg">
//               <span>Total</span>
//               <span className="text-blue-600">{getTotalPrice().toLocaleString()} FCFA</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex justify-between">
//           <Button variant="outline" onClick={prevStep}>
//             <ChevronLeft className="w-4 h-4 mr-2" /> Retour
//           </Button>
//           <Button 
//             onClick={nextStep}
//             className="px-8"
//           >
//             Continuer <ChevronRight className="w-4 h-4 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep5 = () => (
//     <div className="w-full max-w-2xl mx-auto bg-white rounded-lg">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//           <CreditCard className="w-6 h-6 text-blue-600" />
//           Paiement sécurisé
//         </h3>
//       </div>
//       <div className="p-6 space-y-6">
//         <div className="text-center">
//           <div className="text-4xl mb-4">💳</div>
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">
//             Montant à régler
//           </h3>
//           <div className="text-3xl font-bold text-blue-600 mb-6">
//             {getTotalPrice().toLocaleString()} FCFA
//           </div>
          
//           <div className="bg-gray-50 p-4 rounded-lg mb-6">
//             <p className="text-sm text-gray-600 mb-2">Modes de paiement acceptés :</p>
//             <div className="flex justify-center gap-4">
//               <div className="text-2xl">💳</div>
//               <div className="text-2xl">🏦</div>
//               <div className="text-2xl">📱</div>
//             </div>
//           </div>
//         </div>

//         <Button
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
//           onClick={() => {
//             setIsLoading(true);
//             setTimeout(() => {
//               setPaymentStatus('success');
//               setIsLoading(false);
//               nextStep();
//             }, 2000);
//           }}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <div className="flex items-center gap-2">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               Traitement en cours...
//             </div>
//           ) : (
//             'Procéder au paiement'
//           )}
//         </Button>
        
//         <Button variant="outline" onClick={prevStep} className="w-full">
//           <ChevronLeft className="w-4 h-4 mr-2" /> Retour
//         </Button>
//       </div>
//     </div>
//   );

//   const renderStep6 = () => (
//     <div className="w-full max-w-2xl mx-auto bg-white rounded-lg">
//       <div className="p-8 text-center">
//         <div className="text-6xl mb-4">✅</div>
//         <h2 className="text-2xl font-bold text-green-700 mb-4">
//           Inscription réussie !
//         </h2>
//         <p className="text-lg text-gray-700 mb-6">
//           Votre inscription a été confirmée avec succès.
//           <br />
//           Un email de confirmation vous sera envoyé sous 24h.
//         </p>
        
//         <div className="bg-green-50 p-4 rounded-lg mb-6">
//           <h4 className="font-semibold text-green-800 mb-2">Prochaines étapes :</h4>
//           <ul className="text-sm text-green-700 space-y-1">
//             <li>• Vérifiez votre email pour la confirmation</li>
//             <li>• Préparez vos documents d'identité</li>
//             <li>• Notez les informations de connexion</li>
//           </ul>
//         </div>
        
//         <Button 
//           onClick={() => {
//             setCurrentStep(1);
//             setInscriptionType(null);
//             setMode(null);
//             setPaymentStatus(null);
//             setIndividualData({
//               firstName: "", lastName: "", email: "", phone: "", position: "",
//               organisation: "", company: "", country: "", services: []
//             });
//             setGroupData({
//               responsable: {
//                 firstName: "", lastName: "", email: "", phone: "", position: "",
//                 organisation: "", company: "", country: ""
//               },
//               members: [],
//               services: [],
//               nombre: 2
//             });
//           }}
//           className="px-8"
//         >
//           Nouvelle inscription
//         </Button>
//       </div>
//     </div>
//   );

//   // Rendu principal
//   return (
//     <main className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
//       {/* Layout en deux colonnes */}
//       <div className="flex h-full">
//         {/* Section informative à gauche - FIXE */}
//         <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
//           {/* Vidéo en arrière-plan */}
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-700/90">
//             <div className="absolute inset-0 bg-black/40"></div>
            
//             {/* Vidéo placeholder avec animation */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative w-full h-full">
//                 {/* Overlay avec pattern */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-transparent to-blue-700/60"></div>
//                 <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
                
//                 {/* Bouton play central avec animation */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="relative group cursor-pointer">
//                     <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
//                       <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
//                     </div>
//                     <div className="absolute inset-0 w-20 h-20 border-2 border-white/30 rounded-full animate-ping opacity-75"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contenu principal avec glassmorphism */}
//           <div className="relative z-10 p-12 flex flex-col justify-center h-full">
//             <div className="max-w-lg mx-auto">
//               {/* Logo/Titre avec animation */}
//               <div className="mb-8 animate-fade-in">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
//                     <span className="text-2xl">🏢</span>
//                   </div>
//                   <div>
//                     <h1 className="text-4xl font-bold text-white mb-1">FANAF 2026</h1>
//                     <p className="text-blue-200 text-lg">50ᵉ Assemblée Générale</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Informations principales avec cartes glassmorphism */}
//               <div className="space-y-4 mb-8">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
//                   <div className="flex items-start gap-4">
//                     <div className="text-2xl">📅</div>
//                     <div>
//                       <h3 className="font-semibold text-lg mb-1 text-white">Date et lieu</h3>
//                       <p className="text-blue-100">15-17 Juin 2026</p>
//                       <p className="text-blue-100">Hôtel Ivoire • Abidjan, Côte d'Ivoire</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
//                   <div className="flex items-start gap-4">
//                     <div className="text-2xl">👥</div>
//                     <div>
//                       <h3 className="font-semibold text-lg mb-1 text-white">Participants attendus</h3>
//                       <p className="text-blue-100">500+ professionnels du secteur de l'assurance</p>
//                       <p className="text-blue-100">Directeurs, experts et décideurs africains</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Statistiques avec design moderne */}
//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 <div className="bg-gradient-to-br from-blue-600/30 to-blue-700/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center hover:scale-105 transition-all duration-300">
//                   <div className="text-3xl font-bold text-white mb-1">50</div>
//                   <div className="text-blue-200 text-sm">Années d'excellence</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-green-600/30 to-green-700/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center hover:scale-105 transition-all duration-300">
//                   <div className="text-3xl font-bold text-white mb-1">500+</div>
//                   <div className="text-blue-200 text-sm">Participants</div>
//                 </div>
//               </div>

//               {/* Call-to-action */}
//               <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
//                 <h3 className="text-xl font-semibold text-white mb-2">Rejoignez l'événement</h3>
//                 <p className="text-blue-100 text-sm mb-4">Découvrez les innovations et perspectives de l'assurance africaine</p>
//                 <button className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/30">
//                   <span>Regarder la vidéo</span>
//                   <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Particules flottantes */}
//           <div className="absolute inset-0 pointer-events-none">
//             <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
//             <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
//             <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"></div>
//             <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
//           </div>
//         </div>

//         {/* Section inscription à droite - FIXE avec scroll interne */}
//         <div className="flex-1 lg:w-1/2 flex flex-col h-full">
//           {/* Header mobile - FIXE */}
//           <div className="lg:hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white p-4 flex-shrink-0">
//             <div className="text-center">
//               <h1 className="text-xl font-bold mb-1">Inscription FANAF 2026</h1>
//               <p className="text-blue-100 text-sm">50ᵉ Assemblée Générale • 15-17 Juin 2026</p>
//             </div>
//           </div>

//           {/* Contenu du formulaire - SCROLLABLE */}
//           <div className="flex-1 flex flex-col p-4 lg:p-8 overflow-y-auto custom-scrollbar">
//             <div className="max-w-2xl mx-auto w-full">
//               <div className="mb-6">
//                 {renderStepper()}
//               </div>
              
//               <div className="flex justify-center">
//                 {currentStep === 1 && renderStep1()}
//                 {currentStep === 2 && renderStep2()}
//                 {currentStep === 3 && renderStep3()}
//                 {currentStep === 4 && renderStep4()}
//                 {currentStep === 5 && renderStep5()}
//                 {currentStep === 6 && renderStep6()}
//               </div>
//             </div>
//           </div>

//           {/* Footer - FIXE */}
//           <div className="p-4 border-t border-gray-200 bg-white/50 flex-shrink-0">
//             <div className="text-center text-xs text-gray-600">
//               <p>© 2026 FANAF - Fédération des Sociétés d'Assurances de Droit National Africaines</p>
//               <p className="mt-1">Inscription sécurisée • Données protégées</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// } 