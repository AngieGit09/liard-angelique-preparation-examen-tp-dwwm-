// Gère les interactions liées aux messages (contact et administration).
// Permet l'envoi de messages côté public et leur gestion côté admin.

import { apiFetch } from "./api";

// Envoi message depuis le formulaire de contact
export const sendMessage = (data) =>
  apiFetch("/api/public/messages/store.php", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Récupère tous les messages pour l'administration
export const getAdminMessages = () => apiFetch("/api/admin/messages/index.php");

// supprime un message via son id
export const deleteAdminMessage = (id) =>
  apiFetch("/api/admin/messages/delete.php", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
