# Intégration API FANAF 2026

## Configuration

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Configuration API
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Configuration du site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FANAF_EMAIL=fanaf@orange.sn
```

## Architecture

### Structure des fichiers

```
src/
├── lib/
│   ├── services/
│   │   └── api.ts              # Service API avec axios
│   ├── store/
│   │   └── registrationStore.ts # Store Zustand pour l'état
│   ├── hooks/
│   │   └── useRegistration.ts  # Hooks React Query
│   └── providers/
│       └── QueryProvider.tsx   # Provider React Query
├── types/
│   └── api.types.ts            # Types TypeScript pour l'API
└── components/
    └── ui/
        ├── FormError.tsx       # Composant d'erreur
        └── ServiceIcon.tsx     # Composant d'icône de service
```

### Services API

#### Plans de participation

- **Endpoint**: `GET /api/plans`
- **Description**: Récupère tous les plans de participation (Membre/Non-membre)
- **Hook**: `usePlans()`

#### Organisations

- **Endpoint**: `GET /api//insurance-companies`
- **Description**: Récupère toutes les organisations membres
- **Hook**: `useOrganizations()`

#### Options d'événement

- **Endpoint**: `GET /api/participation/options`
- **Description**: Récupère les plans et options d'événement
- **Hook**: `useEventOptions()`

#### Inscription

- **Endpoint**: `POST /api/participation/register`
- **Description**: Soumet une inscription
- **Hook**: `useRegistration()`

### Store Zustand

Le store gère l'état global de l'inscription :

- **Navigation**: étapes, progression
- **Données**: informations personnelles, groupe, services
- **Validation**: erreurs de formulaire
- **État**: chargement, statut de paiement

### Hooks personnalisés

#### `useValidation()`

- Validation en temps réel des champs
- Validation complète du formulaire

#### `usePricing()`

- Calcul du prix de base
- Calcul du prix des services
- Calcul du prix total

#### `useRegistrationData()`

- Préparation des données pour l'API
- Transformation des données du formulaire

## Utilisation

### Dans un composant

```tsx
import { useRegistrationStore } from "@/lib/store/registrationStore";
import { usePlans, useOrganizations } from "@/lib/hooks/useRegistration";

export function MyComponent() {
  const { currentStep, setCurrentStep } = useRegistrationStore();
  const { data: plans, isLoading } = usePlans();

  // Utilisation...
}
```

### Validation

```tsx
import { useValidation } from "@/lib/hooks/useRegistration";

const { validateField, validateForm } = useValidation();

// Validation d'un champ
const error = validateField("email", emailValue);

// Validation du formulaire
const errors = validateForm(formData);
```

### Soumission

```tsx
import { useRegistration } from "@/lib/hooks/useRegistration";

const registrationMutation = useRegistration();

const handleSubmit = async () => {
  try {
    await registrationMutation.mutateAsync(registrationData);
    // Succès
  } catch (error) {
    // Erreur
  }
};
```

## Types de données

### Payload d'inscription

```typescript
{
  type: "solo" | "group",
  participation_plan_id: number,
  group_name?: string,
  creator: {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    company: string,
    country: string,
    registration_data: {
      fonction: string,
      besoin: string
    }
  },
  member: Array<Member>,
  event_options: Array<{
    id: number,
    applies_to_all: boolean,
    required: boolean,
    meta: any
  }>
}
```

## Gestion des erreurs

Les erreurs sont gérées de manière centralisée :

1. **Validation côté client** : Avant soumission
2. **Erreurs API** : Interceptées par axios
3. **Notifications** : Affichées avec Sonner
4. **État d'erreur** : Stocké dans le store Zustand

## Tests

Pour tester l'intégration :

1. Démarrer l'API backend sur `http://localhost:8000`
2. Configurer les variables d'environnement
3. Lancer l'application : `pnpm dev`
4. Naviguer vers `/registration`

## Déploiement

1. Configurer l'URL de l'API de production
2. Vérifier les variables d'environnement
3. Build : `pnpm build`
4. Déployer sur Vercel ou autre plateforme
