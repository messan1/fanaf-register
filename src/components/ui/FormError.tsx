import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  error?: string;
  className?: string;
}

export function FormError({ error, className }: FormErrorProps) {
  if (!error) return null;

  return (
    <p className={cn(
      "text-red-500 text-sm mt-1 flex items-center gap-1",
      className
    )}>
      <AlertCircle className="w-4 h-4" />
      {error}
    </p>
  );
} 