import { apiFetch } from "./api";

export const loginAdmin = (data) =>
  apiFetch("/authentification/login.php", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const checkAdminAuth = () => apiFetch("/authentification/me.php");

export const logoutAdmin = () => apiFetch("/authentification/logout.php");

export const forgotPassword = (email) =>
  apiFetch("/authentification/forgot-password.php", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPassword = (data) =>
  apiFetch("/authentification/reset-password.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
