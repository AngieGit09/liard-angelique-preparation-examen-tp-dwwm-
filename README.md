# Rénomeuble

## Présentation du projet

Rénomeuble est une application web développée dans le cadre de la préparation au **Titre Professionnel Développeur Web et Web Mobile (DWWM)**.

Le projet consiste à concevoir un site web vitrine pour une entreprise spécialisée dans la rénovation de meubles anciens.

L'objectif du site est de :

- présenter l'entreprise et sa démarche éco-responsable
- afficher un catalogue de meubles rénovés
- permettre aux visiteurs de contacter l'entreprise
- offrir un espace d'administration pour gérer le contenu du site

Le projet repose sur une architecture séparant :

- un front-end développé avec React
- une API back-end développée en PHP
- une base de données MySQL

---

# Technologies utilisées

## Front-end

- React
- React Router
- Vite
- Bootstrap
- Fetch API
- Vitest
- React Testing Library

## Back-end

- PHP
- API REST
- PDO
- Composer

## Base de données

- MySQL

---

# Architecture du projet

Renomeuble
│
├── backend
│ ├── api
    ├── admin
    ├── public 
│ ├── authentication
│ ├── config
│ ├── middleware
│ └── database.sql
│
└── frontend
├── src
├── index.html
├── package.json
└── vite.config.js

L’API est organisée en deux parties :
API publique accessible aux visiteurs pour consulter les produits et envoyer des messages.
API d’administration protégée et accessible uniquement aux administrateurs authentifiés pour gérer le catalogue.


Le front-end React communique avec l'API PHP via des requêtes HTTP utilisant Fetch API.

---

# Fonctionnalités

## Côté visiteur

- consultation du catalogue de meubles
- navigation par catégories
- consultation du détail d'un produit
- recherche de produits
- envoi d'un message via le formulaire de contact
- accès aux informations légales

## Côté administrateur

- connexion sécurisée
- tableau de bord
- gestion des produits (ajout, modification, suppression)
- gestion des catégories
- consultation des messages envoyés par les visiteurs

---

# Installation du projet

## 1. Cloner le projet

git clone https://github.com/AngieGit09/liard-angelique-preparation-examen-tp-dwwm-


---

## 2. Installation du front-end

cd frontend
npm install
npm run dev


Le front-end sera accessible sur :
http://localhost:5173


---

## 3. Installation du back-end

Placer le dossier backend dans un serveur local tel que XAMPP, WAMP ou MAMP.

Configurer la connexion à la base de données dans le fichier :
backend/config/database.php


---

## 4. Création de la base de données

Importer le fichier suivant dans votre serveur MySQL :
backend/database.sql


---

# Tests

Des tests unitaires ont été réalisés à l'aide de :

- Vitest
- React Testing Library

Pour lancer les tests :
npm run test


---

# Auteur

Projet réalisé par :

Angélique Liard

Dans le cadre de la préparation au  
**Titre Professionnel Développeur Web et Web Mobile (DWWM)**.


