import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  PlansResponse,
  OrganizationsResponse,
  EventOptionsResponse,
  RegistrationResponse,
  RegistrationRequest,
  ApiError
} from '@/types/api.types';

// Configuration de l'instance axios
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Intercepteur pour les requêtes
  instance.interceptors.request.use(
    (config) => {
      // Ajouter un token d'authentification si nécessaire
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Intercepteur pour les réponses
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Gestion centralisée des erreurs
      const apiError: ApiError = {
        message: 'Une erreur est survenue',
        status: error.response?.status,
      };

      if (error.response?.data) {
        apiError.message = error.response.data.message || apiError.message;
        apiError.errors = error.response.data.errors;
      }

      return Promise.reject(apiError);
    }
  );

  return instance;
};

const api = createApiInstance();

// Service pour les plans de participation
export const plansService = {
  // Récupérer tous les plans de participation
  getPlans: async (): Promise<PlansResponse> => {
    const response = await api.get('/plans');
    return response.data;
  },
};

// Service pour les organisations
export const organizationsService = {
  // Récupérer toutes les organisations
  getOrganizations: async (): Promise<OrganizationsResponse> => {
    const response = await api.get('/insurance-companies');
    return response.data;
  },
};

// Service pour les options d'événement
export const eventOptionsService = {
  // Récupérer toutes les options d'événement
  getEventOptions: async (): Promise<EventOptionsResponse> => {
    const response = await api.get('/participation/options');
    return response.data;
  },
};

// Service pour l'inscription
export const registrationService = {
  // Soumettre une inscription
  register: async (data: RegistrationRequest): Promise<RegistrationResponse> => {
    const response = await api.post('/participation/register', data);
    return response.data;
  },
};

// Service utilitaire pour la validation
export const validationService = {
  // Valider un email
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Valider un numéro de téléphone
  validatePhone: (phone: string): boolean => {
    // const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    // return phoneRegex.test(phone.replace(/\s/g, ''));
    return true;
  },

  // Valider un nom
  validateName: (name: string): boolean => {
    return name.length >= 2 && /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name);
  },

  // Valider un champ requis
  validateRequired: (value: string): boolean => {
    return value.trim().length > 0;
  },
};

// Export de l'instance API pour une utilisation directe si nécessaire
export { api };

// Export des types d'erreur
export type { ApiError }; 