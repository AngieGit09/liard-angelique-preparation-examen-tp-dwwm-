// ===== SERVICE API GLOBAL =====
// Centralise tous les appels API du projet.
// Gère la configuration de base (URL, credentials, gestion des erreurs).

export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost/renomeuble/backend";

// URL de base pour les images (optionnel selon usage)
export const BASE_IMAGE_URL =
  import.meta.env.VITE_API_URL || "http://localhost/renomeuble/backend/";

// Fonction générique pour effectuer les requêtes API
export async function apiFetch(endpoint, options = {}) {
  const config = {
    // Permet d'envoyer les cookies (session PHP)
    credentials: "include",
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  const data = await response.json();

  // Gestion centralisée des erreurs API
  if (!response.ok) {
    throw new Error(data.error || "Erreur API");
  }

  return data;
}
