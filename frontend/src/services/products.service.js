import { apiFetch } from "./api";

// produit mis en avant
export const getFeaturedProduct = () =>
  apiFetch("/api/public/products/featured.php");

// produits par catégorie
export const getProductsByCategory = (slug) =>
  apiFetch(`/api/public/products/index.php?slug=${slug}`);

// produit détail
export const getProductById = (id) =>
  apiFetch(`/api/public/products/show.php?id=${id}`);

export const searchProducts = (query) =>
  apiFetch(`/api/public/products/search.php?q=${encodeURIComponent(query)}`);
