import { apiFetch } from "./api";

// ========= SERVICE CATEGORIES =========
// Centralise les appels API liés aux catégories.

export const getCategories = () => apiFetch("/api/public/categories/index.php");
