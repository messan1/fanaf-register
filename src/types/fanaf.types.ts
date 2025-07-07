export interface Speaker {
  id: number;
  name: string;
  title: string;
  company: string;
  country: string;
  photo: string;
  bio: string;
}

export interface EventSession {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  room: string;
  speakers: Speaker[];
  type: 'keynote' | 'panel' | 'workshop' | 'networking';
}

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  level: 'platinum' | 'gold' | 'silver' | 'bronze';
  website?: string;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  country: string;
  phone: string;
  registrationType: 'member' | 'non-member' | 'student' | 'press';
  dietaryRestrictions?: string;
  specialNeeds?: string;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  phone: string;
  website: string;
  distance: string;
  priceRange: string;
  amenities: string[];
  image: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'registration' | 'venue' | 'accommodation';
} 