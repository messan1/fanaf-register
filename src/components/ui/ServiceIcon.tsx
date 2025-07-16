import { Car, Bus, Hotel, Utensils, MapPin, Users, CreditCard } from 'lucide-react';

interface ServiceIconProps {
  type: string;
  className?: string;
  size?: number;
}

const serviceIcons: Record<string, React.ComponentType<any>> = {
  'navette': Car,
  'car': Bus,
  'hotel': Hotel,
  'dinner': Utensils,
  'transport': Car,
  'accommodation': Hotel,
  'gala_dinner': Utensils,
  'other': MapPin,
};

const serviceEmojis: Record<string, string> = {
  'navette': '🚐',
  'car': '🚌',
  'hotel': '🏨',
  'dinner': '🍽️',
  'transport': '🚐',
  'accommodation': '🏨',
  'gala_dinner': '🍽️',
  'other': '📍',
};

export function ServiceIcon({ type, className = '', size = 24 }: ServiceIconProps) {
  const IconComponent = serviceIcons[type] || MapPin;
  const emoji = serviceEmojis[type] || '📍';

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-2xl" style={{ fontSize: `${size}px` }}>
        {emoji}
      </span>
    </div>
  );
}

export function ServiceIconComponent({ type, className = '', size = 24 }: ServiceIconProps) {
  const IconComponent = serviceIcons[type] || MapPin;

  return (
    <IconComponent 
      className={className} 
      size={size}
    />
  );
} 