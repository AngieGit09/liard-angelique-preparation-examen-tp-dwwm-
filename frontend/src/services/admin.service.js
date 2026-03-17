// ===== SERVICE ADMIN =====
// Regroupe les fonctionnalités administrateur (stats, produits, catégories).
// Utilise des endpoints sécurisés côté backend.

import { apiFetch, BASE_URL } from "./api";

const ADMIN_API = "/api/admin";

// ===== DASHBOARD =====

// Récupère les statistiques globales (produits, etc.)
export const getAdminStats = () => apiFetch(`${ADMIN_API}/stats.php`);

// ===== CATÉGORIES =====

// Récupère les catégories côté admin
export const getAdminCategories = () =>
  apiFetch(`${ADMIN_API}/categories/index.php`);

// Supprime une catégorie (FormData nécessaire côté backend PHP)
export const deleteAdminCategory = async (id) => {
  const formData = new FormData();
  formData.append("id", id);

  return fetch(`${BASE_URL}/api/admin/categories/delete.php`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
};

// ===== PRODUITS =====

// Récupère les produits côté admin
export const getAdminProducts = () =>
  apiFetch(`${ADMIN_API}/products/index.php`);

// Supprime un produit (FormData pour compatibilité backend)
export const deleteAdminProduct = async (id) => {
  const formData = new FormData();
  formData.append("id", id);

  const response = await fetch(`${BASE_URL}/api/admin/products/delete.php`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return response.json();
};
