// ===== SERVICE PRODUITS =====
// Ce service centralise les appels API liés aux produits.
// Il permet de récupérer les données depuis le backend (liste, détail, recherche).

import { apiFetch } from "./api";

// Récupère le produit mis en avant (homepage)
export const getFeaturedProduct = () =>
  apiFetch("/api/public/products/featured.php");

// Récupère les produits d’une catégorie via son slug
export const getProductsByCategory = (slug) =>
  apiFetch(`/api/public/products/index.php?slug=${slug}`);

// Récupère le détail d’un produit via son id
export const getProductById = (id) =>
  apiFetch(`/api/public/products/show.php?id=${id}`);

// Recherche des produits via un mot-clé (encodé pour sécuriser l’URL)
export const searchProducts = (query) =>
  apiFetch(`/api/public/products/search.php?q=${encodeURIComponent(query)}`);
