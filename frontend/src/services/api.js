// ========= SERVICE API GLOBAL =========
// Centralise tous les appels API du projet

export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost/renomeuble/backend";

export const BASE_IMAGE_URL =
  import.meta.env.VITE_API_URL || "http://localhost/renomeuble/backend/";

// fonction générique pour fetch API
export async function apiFetch(endpoint, options = {}) {
  const config = {
    credentials: "include",
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erreur API");
  }

  return data;
}
