import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  RegistrationState,
  FormData,
  GroupFormData,
  ParticipationPlan,
  EventOption,
  Organization
} from '@/types/api.types';

interface RegistrationStore extends RegistrationState {
  // Actions pour la navigation
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Actions pour le type d'inscription
  setInscriptionType: (type: 'member' | 'nonMember' | null) => void;
  setSelectedPlan: (plan: ParticipationPlan | null) => void;
  
  // Actions pour le mode d'inscription
  setMode: (mode: 'individual' | 'groupe' | null) => void;
  
  // Actions pour les données individuelles
  setIndividualData: (data: Partial<FormData>) => void;
  updateIndividualField: (field: keyof FormData, value: string) => void;
  addIndividualService: (service: string) => void;
  removeIndividualService: (service: string) => void;
  
  // Actions pour les données de groupe
  setGroupData: (data: Partial<GroupFormData>) => void;
  updateGroupResponsable: (field: string, value: string) => void;
  addGroupMember: (member: { firstName: string; lastName: string; email: string; besoin?: string }) => void;
  removeGroupMember: (index: number) => void;
  updateGroupMember: (index: number, field: string, value: string) => void;
  setGroupNombre: (nombre: number) => void;
  addGroupService: (service: string) => void;
  removeGroupService: (service: string) => void;
  setGroupName: (name: string) => void;
  
  // Actions pour l'état de chargement
  setLoading: (loading: boolean) => void;
  
  // Actions pour les erreurs
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  setFieldError: (field: string, error: string) => void;
  
  // Actions pour le statut de paiement
  setPaymentStatus: (status: 'pending' | 'success' | 'error' | null) => void;
  
  // Actions pour réinitialiser
  reset: () => void;
  resetForm: () => void;
}

// État initial
const initialState: RegistrationState = {
  currentStep: 1,
  inscriptionType: null,
  mode: null,
  selectedPlan: null,
  individualData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    organisation: '',
    company: '',
    country: '',
    services: [],
    besoin: ''
  },
  groupData: {
    responsable: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      organisation: '',
      company: '',
      country: '',
      besoin: ''
    },
    members: [],
    services: [],
    nombre: 2,
    groupName: ''
  },
  isLoading: false,
  errors: {},
  paymentStatus: null
};

export const useRegistrationStore = create<RegistrationStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Navigation
      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 6) {
          set({ currentStep: currentStep + 1 });
        }
      },
      
      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      // Type d'inscription
      setInscriptionType: (type) => set({ inscriptionType: type }),
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),

      // Mode d'inscription
      setMode: (mode) => set({ mode }),

      // Données individuelles
      setIndividualData: (data) => 
        set((state) => ({
          individualData: { ...state.individualData, ...data }
        })),

      updateIndividualField: (field, value) =>
        set((state) => ({
          individualData: { ...state.individualData, [field]: value }
        })),

      addIndividualService: (service) =>
        set((state) => ({
          individualData: {
            ...state.individualData,
            services: [...state.individualData.services, service]
          }
        })),

      removeIndividualService: (service) =>
        set((state) => ({
          individualData: {
            ...state.individualData,
            services: state.individualData.services.filter(s => s !== service)
          }
        })),

      // Données de groupe
      setGroupData: (data) =>
        set((state) => ({
          groupData: { ...state.groupData, ...data }
        })),

      updateGroupResponsable: (field, value) =>
        set((state) => ({
          groupData: {
            ...state.groupData,
            responsable: { ...state.groupData.responsable, [field]: value }
          }
        })),

      addGroupMember: (member) =>
        set((state) => ({
          groupData: {
            ...state.groupData,
            members: [...state.groupData.members, member]
          }
        })),

      removeGroupMember: (index) =>
        set((state) => ({
          groupData: {
            ...state.groupData,
            members: state.groupData.members.filter((_, i) => i !== index)
          }
        })),

      updateGroupMember: (index, field, value) =>
        set((state) => ({
          groupData: {
            ...state.groupData,
            members: state.groupData.members.map((member, i) =>
              i === index ? { ...member, [field]: value } : member
            )
          }
        })),

      setGroupNombre: (nombre) =>
        set((state) => ({
          groupData: { ...state.groupData, nombre }
        })),

      addGroupService: (service) =>
        set((state) => ({
          groupData: {
            ...state.groupData,
            services: [...state.groupData.services, service]
          }
        })),

      removeGroupService: (service) =>
        set((state) => ({
          groupData: {
            ...state.groupData,
            services: state.groupData.services.filter(s => s !== service)
          }
        })),

      setGroupName: (name) =>
        set((state) => ({
          groupData: { ...state.groupData, groupName: name }
        })),

      // État de chargement
      setLoading: (loading) => set({ isLoading: loading }),

      // Erreurs
      setErrors: (errors) => set({ errors }),
      
      clearErrors: () => set({ errors: {} }),
      
      setFieldError: (field, error) =>
        set((state) => ({
          errors: { ...state.errors, [field]: error }
        })),

      // Statut de paiement
      setPaymentStatus: (status) => set({ paymentStatus: status }),

      // Réinitialisation
      reset: () => set(initialState),
      
      resetForm: () => set((state) => ({
        ...state,
        individualData: initialState.individualData,
        groupData: initialState.groupData,
        errors: {},
        paymentStatus: null
      }))
    }),
    {
      name: 'registration-store',
    }
  )
); 