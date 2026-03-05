import { apiFetch, BASE_URL } from "./api";

const ADMIN_API = "/api/admin";

// ===== DASHBOARD =====

export const getAdminStats = () => apiFetch(`${ADMIN_API}/stats.php`);

// ===== CATEGORIES =====

export const getAdminCategories = () =>
  apiFetch(`${ADMIN_API}/categories/index.php`);

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

export const getAdminProducts = () =>
  apiFetch(`${ADMIN_API}/products/index.php`);

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
