import { Country } from '@/types/api.types';

export const COUNTRIES: Country[] = [
  { name: "Côte d'Ivoire", code: "CI", phoneCode: "+225" },
  { name: "Sénégal", code: "SN", phoneCode: "+221" },
  { name: "Ghana", code: "GH", phoneCode: "+233" },
  { name: "Nigeria", code: "NG", phoneCode: "+234" },
  { name: "Cameroun", code: "CM", phoneCode: "+237" },
  { name: "Mali", code: "ML", phoneCode: "+223" },
  { name: "Burkina Faso", code: "BF", phoneCode: "+226" },
  { name: "Bénin", code: "BJ", phoneCode: "+229" },
  { name: "Togo", code: "TG", phoneCode: "+228" },
  { name: "Niger", code: "NE", phoneCode: "+227" },
  { name: "Tchad", code: "TD", phoneCode: "+235" },
  { name: "République Centrafricaine", code: "CF", phoneCode: "+236" },
  { name: "Gabon", code: "GA", phoneCode: "+241" },
  { name: "Congo", code: "CG", phoneCode: "+242" },
  { name: "République Démocratique du Congo", code: "CD", phoneCode: "+243" },
  { name: "Rwanda", code: "RW", phoneCode: "+250" },
  { name: "Burundi", code: "BI", phoneCode: "+257" },
  { name: "Tanzanie", code: "TZ", phoneCode: "+255" },
  { name: "Kenya", code: "KE", phoneCode: "+254" },
  { name: "Ouganda", code: "UG", phoneCode: "+256" },
  { name: "Éthiopie", code: "ET", phoneCode: "+251" },
  { name: "Somalie", code: "SO", phoneCode: "+252" },
  { name: "Djibouti", code: "DJ", phoneCode: "+253" },
  { name: "Soudan", code: "SD", phoneCode: "+249" },
  { name: "Soudan du Sud", code: "SS", phoneCode: "+211" },
  { name: "Érythrée", code: "ER", phoneCode: "+291" },
  { name: "Égypte", code: "EG", phoneCode: "+20" },
  { name: "Libye", code: "LY", phoneCode: "+218" },
  { name: "Tunisie", code: "TN", phoneCode: "+216" },
  { name: "Algérie", code: "DZ", phoneCode: "+213" },
  { name: "Maroc", code: "MA", phoneCode: "+212" },
  { name: "Mauritanie", code: "MR", phoneCode: "+222" },
  { name: "Autre", code: "XX", phoneCode: "+" },
];

export const getCountryByCode = (code: string): Country | undefined => {
  return COUNTRIES.find(country => country.code === code);
};

export const getCountryByName = (name: string): Country | undefined => {
  return COUNTRIES.find(country => country.name === name);
};

export const getPhoneCodeByCountry = (countryName: string): string => {
  const country = getCountryByName(countryName);
  return country?.phoneCode || "+";
}; 