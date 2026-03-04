// ========= SERVICE API GLOBAL =========
// Centralise tous les appels vers le backend.
// Permet d'éviter la duplication des fetch()
// et facilite la maintenance et le passage en production.

const BASE_URL = "http://localhost/renomeuble/backend";

/**
 * Fonction générique pour appeler l'API
 * @param {string} endpoint - chemin API après /backend
 * @param {object} options - options fetch (method, body, headers...)
 */
export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include", // nécessaire pour l'auth admin (sessions PHP)
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Réponse serveur invalide");
  }

  if (!response.ok) {
    throw new Error(data?.error || "Erreur API");
  }

  return data;
};
