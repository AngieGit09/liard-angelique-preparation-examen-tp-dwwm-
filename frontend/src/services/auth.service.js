// ===== SERVICE AUTHENTIFICATION =====
// Gère l'authentification administrateur et les fonctionnalités liées
// (connexion, session, mot de passe oublié).

import { apiFetch } from "./api";

// Connexion admin (création de session côté backend)
export const loginAdmin = (data) =>
  apiFetch("/authentification/login.php", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Vérifie si l'admin est authentifié (session active)
export const checkAdminAuth = () => apiFetch("/authentification/me.php");

// Déconnexion admin (suppression de la session)
export const logoutAdmin = () => apiFetch("/authentification/logout.php");

// Demande de réinitialisation de mot de passe (envoi email)
export const forgotPassword = (email) =>
  apiFetch("/authentification/forgot-password.php", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

// Réinitialisation du mot de passe avec token
export const resetPassword = (data) =>
  apiFetch("/authentification/reset-password.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
