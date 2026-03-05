import { apiFetch } from "./api";

export const getCategories = () => apiFetch("/api/public/categories/index.php");
