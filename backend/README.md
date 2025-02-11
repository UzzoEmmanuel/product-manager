# MPEL Products API

API de gestion de produits développée avec NestJS, PostgreSQL et Prisma.

## Technologies utilisées

- NestJS
- PostgreSQL
- Prisma ORM
- TypeScript
- Multer (upload de fichiers)
- Winston (logging)
- Swagger (documentation API)

## Prérequis

- Node.js (v18+)
- PostgreSQL
- npm ou yarn

## Installation

1. Installer les dépendances

```bash
npm install
```

2. Configuration environnement
   Créer un fichier `.env` à la racine du projet :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mpel_products"
```

3. Lancer les migrations Prisma

```bash
npx prisma migrate dev
```

## Démarrage

```bash
# Mode développement
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

L'API sera disponible sur `http://localhost:3000`
La documentation Swagger est disponible sur `http://localhost:3000/api`

## Endpoints API

### Produits

#### GET /products

- Description: Liste des produits (paginée)
- Query params:
  - page (défaut: 1)
  - limit (défaut: 10)
- Exemple: `/products?page=1&limit=10`

#### POST /products

- Description: Création d'un produit
- Content-Type: multipart/form-data
- Corps de la requête:
  - name (string, obligatoire)
  - description (string, optionnel)
  - price (number, obligatoire)
  - stock (number, obligatoire)
  - image (file, optionnel)

#### PATCH /products/:id

- Description: Mise à jour d'un produit
- Paramètres similaires à la création
- Tous les champs sont optionnels

#### DELETE /products/:id

- Description: Suppression d'un produit
- Retourne: 204 No Content

#### POST /products/upload

- Description: Upload d'image séparé
- Content-Type: multipart/form-data
- Corps: image (file)
- Formats acceptés: jpg, jpeg, png
- Taille maximale: 5MB

## Fonctionnalités

### Sécurité

- Validation des données (class-validator)
- Rate limiting
- Validation des types de fichiers
- Limite de taille pour les uploads (5MB)

### Performance

- Cache intégré
- Pagination
- Compression des réponses

### Logging

- Logs des actions CRUD
- Logs des erreurs
- Fichiers de logs séparés (error.log, combined.log)

## Structure du projet

```
src/
├── common/          # Utilitaires partagés
│   ├── cache/      # Service de cache
│   ├── file/       # Gestion des fichiers
│   ├── filters/    # Filtres d'exception
│   ├── interceptors/# Intercepteurs
│   └── logger/     # Service de logging
├── prisma/         # Configuration Prisma
├── products/       # Module produits
│   ├── dto/       # Data Transfer Objects
│   ├── products.controller.ts
│   ├── products.module.ts
│   └── products.service.ts
└── main.ts         # Point d'entrée
```

## Commandes utiles

```bash
# Générer une migration Prisma
npx prisma migrate dev

# Voir la base de données avec Prisma Studio
npx prisma studio

# Vérifier le formatage du code
npm run format

# Linter
npm run lint
```
