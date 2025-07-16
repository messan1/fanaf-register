import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  plansService, 
  organizationsService, 
  eventOptionsService, 
  registrationService,
  validationService 
} from '@/lib/services/api';
import { 
  RegistrationRequest, 
  ParticipationPlan, 
  Organization, 
  EventOption,
  FormData,
  GroupFormData 
} from '@/types/api.types';
import { useRegistrationStore } from '@/lib/store/registrationStore';

// Hook pour récupérer les plans de participation
export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: plansService.getPlans,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour récupérer les organisations
export const useOrganizations = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: organizationsService.getOrganizations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour récupérer les options d'événement
export const useEventOptions = () => {
  return useQuery({
    queryKey: ['eventOptions'],
    queryFn: eventOptionsService.getEventOptions,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour l'inscription
export const useRegistration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: registrationService.register,
    onSuccess: (data) => {
      // Invalider le cache si nécessaire
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      console.log('Inscription réussie:', data);
    },
    onError: (error) => {
      console.error('Erreur lors de l\'inscription:', error);
    },
  });
};

// Hook pour la validation des champs
export const useValidation = () => {
  const validateField = (field: string, value: string): string => {
    // Si la valeur est vide, ne pas valider sauf pour les champs requis
    if (!value || value.trim() === '') {
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'position', 'company', 'country', 'organisation'];
      if (requiredFields.includes(field)) {
        return 'Ce champ est requis';
      }
      return ''; // Pas d'erreur pour les champs optionnels vides
    }

    switch (field) {
      case 'email':
        return !validationService.validateEmail(value) ? 'Email invalide' : '';
      case 'phone':
        return !validationService.validatePhone(value) ? 'Numéro de téléphone invalide' : '';
      case 'firstName':
      case 'lastName':
        return !validationService.validateName(value) ? 'Minimum 2 caractères requis' : '';
      case 'position':
      case 'company':
      case 'country':
        return !validationService.validateRequired(value) ? 'Ce champ est requis' : '';
      default:
        return !validationService.validateRequired(value) ? 'Ce champ est requis' : '';
    }
  };

  const validateForm = (data: FormData | GroupFormData['responsable']): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    Object.entries(data).forEach(([field, value]) => {
      if (field !== 'services' && field !== 'besoin') {
        const error = validateField(field, value);
        if (error) {
          errors[field] = error;
        }
      }
    });
    
    return errors;
  };

  return { validateField, validateForm };
};

// Hook pour les calculs de prix
export const usePricing = (eventOptions: EventOption[] = []) => {
  const { selectedPlan, individualData, groupData, mode } = useRegistrationStore();
  
  const getBasePrice = (): number => {
    if (!selectedPlan) return 0;
    return parseFloat(selectedPlan.price);
  };

  const getServicesPrice = (): number => {
    const selectedServices = mode === 'individual' ? individualData.services : groupData.services;
    const multiplier = mode === 'groupe' ? groupData.nombre : 1;
    
    // Calculer le prix total des services sélectionnés en utilisant les données de l'API
    return selectedServices.reduce((total, serviceId) => {
      const service = eventOptions.find(option => option.id.toString() === serviceId);
      if (service) {
        return total + (parseFloat(service.additional_cost) * multiplier);
      }
      return total;
    }, 0);
  };

  const getTotalPrice = (): number => {
    const basePrice = getBasePrice();
    const servicesPrice = getServicesPrice();
    return basePrice + servicesPrice;
  };

  return { getBasePrice, getServicesPrice, getTotalPrice };
};

// Hook pour préparer les données d'inscription
export const useRegistrationData = () => {
  const { 
    mode, 
    selectedPlan, 
    individualData, 
    groupData 
  } = useRegistrationStore();

  const prepareRegistrationData = (): RegistrationRequest => {
    if (!selectedPlan) {
      throw new Error('Aucun plan sélectionné');
    }

    const baseRequest = {
      type: (mode === 'groupe' ? 'group' : 'solo') as 'group' | 'solo',
      participation_plan_id: selectedPlan.id,
      event_options: [],
    };

    if (mode === 'individual') {
      // Préparer les données individuelles
      const creator: RegistrationRequest['creator'] = {
        first_name: individualData.firstName,
        last_name: individualData.lastName,
        email: individualData.email,
        phone: individualData.phone,
        company: individualData.organisation || individualData.company,
        country: individualData.country,
        registration_data: {
          fonction: individualData.position,
          besoin: individualData.besoin || 'Networking',
        },
      };

      return {
        ...baseRequest,
        creator,
        member: [creator], // Le créateur est aussi le membre pour les inscriptions individuelles
      };
    } else {
      // Préparer les données de groupe
      const creator: RegistrationRequest['creator'] = {
        first_name: groupData.responsable.firstName,
        last_name: groupData.responsable.lastName,
        email: groupData.responsable.email,
        phone: groupData.responsable.phone,
        company: groupData.responsable.organisation || groupData.responsable.company,
        country: groupData.responsable.country,
        registration_data: {
          fonction: groupData.responsable.position,
          besoin: groupData.responsable.besoin || 'Networking',
        },
      };

      const members: RegistrationRequest['member'] = [
        creator, // Le responsable est le premier membre
        ...groupData.members.map((member, index) => ({
          first_name: member.firstName,
          last_name: member.lastName,
          email: member.email,
          phone: member.phone || groupData.responsable.phone,
          company: groupData.responsable.organisation || groupData.responsable.company,
          country: groupData.responsable.country,
          registration_data: {
            fonction: member.position || 'Participant',
            besoin: 'Networking',
          },
        })),
      ];

      return {
        ...baseRequest,
        group_name: groupData.groupName || `Groupe ${groupData.responsable.lastName}`,
        creator,
        member: members,
      };
    }
  };

  return { prepareRegistrationData };
}; 