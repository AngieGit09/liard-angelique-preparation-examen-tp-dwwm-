// ===== SERVICE CATÉGORIES =====
// Permet de récupérer les catégories côté public.

import { apiFetch } from "./api";

// Récupère toutes les catégories
export const getCategories = () => apiFetch("/api/public/categories/index.php");
