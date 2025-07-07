# FANAF 2026 - Site Web Officiel

Site web officiel pour la **50ᵉ Assemblée Générale de la FANAF** qui se tiendra à Abidjan, Côte d'Ivoire du 15 au 17 juin 2026.

## 🎯 À propos du projet

Ce site web présente l'événement **FANAF 2026** avec le thème : _"50 ans au service de l'assurance africaine : Bilan, innovations et perspectives"_.

### Fonctionnalités principales

- **Page d'accueil** : Présentation de l'événement et de la FANAF
- **À propos** : Histoire, mission et gouvernance de la FANAF
- **Programme** : Agenda détaillé de l'événement sur 3 jours
- **Inscription** : Formulaire d'inscription en ligne avec étapes
- **Intervenants** : Présentation des experts et speakers
- **Partenaires** : Sponsors et partenaires de l'événement
- **Contact** : Informations de contact et FAQ

## 🚀 Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **React Icons** - Icônes
- **Framer Motion** - Animations

## 📦 Installation

```bash
# Cloner le repository
git clone [url-du-repo]

# Installer les dépendances
npm install
# ou
pnpm install

# Lancer le serveur de développement
npm run dev
# ou
pnpm dev
```

## 🌐 Déploiement

Le site est optimisé pour le déploiement sur Vercel :

```bash
# Build de production
npm run build

# Démarrage en production
npm start
```

## 📁 Structure du projet

```
src/
├── app/                    # Pages Next.js 14 (App Router)
│   ├── a-propos/          # Page À propos
│   ├── programme/         # Page Programme
│   ├── registration/      # Page Inscription
│   ├── intervenants/      # Page Intervenants
│   ├── partenaires/       # Page Partenaires
│   └── contact/           # Page Contact
├── components/            # Composants React
│   ├── homepage/          # Composants page d'accueil
│   ├── layout/            # Composants de mise en page
│   └── ui/                # Composants UI réutilisables
├── types/                 # Types TypeScript
└── styles/                # Styles globaux
```

## 🎨 Design System

Le site utilise une palette de couleurs cohérente avec l'identité FANAF :

- **Bleu principal** : `#1e40af` (blue-600)
- **Bleu foncé** : `#1e3a8a` (blue-800)
- **Bleu très foncé** : `#1e3a8a` (blue-900)
- **Gris** : `#6b7280` (gray-500)

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large Desktop (1280px+)

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FANAF_EMAIL=fanaf@orange.sn
```

## 📞 Contact

Pour toute question technique concernant le site web :

- **Email** : support@fanaf2026.org
- **FANAF** : fanaf@orange.sn
- **Site officiel** : https://fanaf.org

## 📄 Licence

Ce projet est développé pour la FANAF (Fédération des Sociétés d'Assurances de Droit National Africaines).

---

**FANAF 2026** - 50 ans au service de l'assurance africaine
