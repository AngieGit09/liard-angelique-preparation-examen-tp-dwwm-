import { apiFetch } from "./api";

// Envoi message contact
export const sendMessage = (data) =>
  apiFetch("/api/public/messages/store.php", {
    method: "POST",
    body: JSON.stringify(data),
  });

// messages admin
export const getAdminMessages = () => apiFetch("/api/admin/messages/index.php");

// suppression message
export const deleteAdminMessage = (id) =>
  apiFetch("/api/admin/messages/delete.php", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
