// Types pour les plans de participation
export interface ParticipationPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  included_services: string[];
  excluded_services: string[];
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

// Types pour les organisations/compagnies
export interface Organization {
  id: number;
  name: string;
  code: string;
  description: string;
  logo: string | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: null;
}

// Types pour les pays avec indicatifs
export interface Country {
  name: string;
  code: string;
  phoneCode: string;
  flag?: string;
}

// Types pour les options d'événement
export interface EventOption {
  id: number;
  name: string;
  description: string;
  type: 'transport' | 'accommodation' | 'gala_dinner' | 'other';
  additional_cost: string;
  details: string[];
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

// Types pour les données d'inscription
export interface RegistrationData {
  fonction: string;
  besoin: string;
  [key: string]: any; // Pour d'autres champs personnalisés
}

// Types pour les membres
export interface Member {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  registration_data: RegistrationData;
}

// Types pour les options d'événement sélectionnées
export interface SelectedEventOption {
  id: number;
  applies_to_all: boolean;
  required: boolean;
  meta: any | null;
}

// Types pour la requête d'inscription
export interface RegistrationRequest {
  type: 'solo' | 'group';
  participation_plan_id: number;
  group_name?: string;
  creator: Member;
  member: Member[];
  event_options: SelectedEventOption[];
}

// Types pour les réponses API
export interface PlansResponse {
  plans: ParticipationPlan[];
}

export interface OrganizationsResponse {
  success: boolean;
  data: Organization[];
  message: string;
}

export interface EventOptionsResponse {
  plans: ParticipationPlan[];
  event_options: EventOption[];
}

export interface RegistrationResponse {
  success: boolean;
  data?: any;
  message: string;
}

// Types pour les erreurs API
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

// Types pour l'état du formulaire
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  organisation: string;
  company: string;
  country: string;
  services: string[];
  besoin?: string;
}

export interface GroupFormData {
  responsable: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    organisation: string;
    company: string;
    country: string;
    besoin?: string;
  };
  members: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    position?: string;
    besoin?: string;
  }>;
  services: string[];
  nombre: number;
  groupName?: string;
}

// Types pour l'état de l'inscription
export interface RegistrationState {
  currentStep: number;
  inscriptionType: 'member' | 'nonMember' | null;
  mode: 'individual' | 'groupe' | null;
  selectedPlan: ParticipationPlan | null;
  individualData: FormData;
  groupData: GroupFormData;
  isLoading: boolean;
  errors: Record<string, string>;
  paymentStatus: 'pending' | 'success' | 'error' | null;
} 