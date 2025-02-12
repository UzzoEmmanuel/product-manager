# MPEL Products Frontend

Interface utilisateur pour la gestion des produits MPEL, développée avec Next.js 15 et TypeScript.

## Technologies utilisées

- Next.js 15 avec TypeScript
- React Server Components
- TailwindCSS avec shadcn/ui
- TanStack Query (React Query) v5
- Axios pour les requêtes API

## Prérequis

- Node.js (v18+)
- npm
- Backend en cours d'exécution sur le port 3000

## Installation

```bash
# Installation des dépendances
npm install
```

## Configuration

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Démarrage

```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

L'application sera disponible sur `http://localhost:4200`

## Structure du projet

```
src/
├── app/                 # Pages de l'application (App Router)
├── components/
│   ├── ui/              # Composants UI réutilisables (shadcn)
│   └── products/        # Composants spécifiques aux produits
├── hooks/               # Custom hooks (React Query)
├── lib/                 # Utilitaires et configuration
└── types/               # Types TypeScript

```

## Fonctionnalités

- Liste des produits avec pagination
- Création et modification de produits
- Upload d'images
- Suppression avec confirmation
- Validation des formulaires
- Feedback utilisateur (toasts)

## Points forts techniques

- Server Components pour optimisation des performances
- React Query pour la gestion du cache et des requêtes
- Custom hooks pour la logique réutilisable
- TypeScript strict pour une meilleure maintenabilité
- Interface utilisateur moderne avec shadcn/ui
- Gestion responsive des images avec next/image
