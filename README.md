# MPEL Products - Test Technique

Application complète de gestion de produits avec un backend NestJS et un frontend Next.js.

## Vue d'ensemble

Ce projet est une application full-stack permettant la gestion de produits avec les fonctionnalités CRUD, upload d'images et pagination.

## Structure du projet

```
mpel-product-manager/
├── backend/           # API NestJS
├── frontend/          # Application Next.js
├── README.md          # Ce fichier
├── .gitignore
└── uploads/           # Dossier des images uploadées
```

## Technologies utilisées

### Backend

- NestJS avec TypeScript
- PostgreSQL avec Prisma
- Gestion des logs avec Winston
- Validation avec class-validator
- Documentation Swagger

### Frontend

- Next.js 15 avec TypeScript
- TailwindCSS et shadcn/ui
- React Query
- Server Components

## Démarrage rapide

1. Backend :

```bash
cd backend
npm install
# Configurez votre .env
npm run start:dev
```

2. Frontend :

```bash
cd frontend
npm install
# Configurez votre .env.local
npm run dev
```

## Documentation détaillée

- [Documentation Backend](./backend/README.md)
- [Documentation Frontend](./frontend/README.md)

## Points forts du projet

- Architecture bien pensée et modulaire
- TypeScript strict des deux côtés
- Gestion optimisée des performances
- Interface utilisateur moderne et réactive
- Validation des données
- Documentation complète

## Auteur

Emmanuel Uzzo

## Licence

Test technique réalisé pour MPEL DIGITAL
