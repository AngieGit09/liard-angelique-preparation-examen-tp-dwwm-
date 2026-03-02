// ========= PAGE RESET PASSWORD =========
// Permet à l'administrateur de définir un nouveau mot de passe
// grâce au token reçu par email.

import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  // Récupération du token dans l'URL
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  // Etats formulaire
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Etats interface
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // ==== SOUMISSION FORMULAIRE ====
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification simple
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        "http://localhost/renomeuble/backend/authentification/reset-password.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      setMessage("Mot de passe modifié avec succès.");

      // Redirection vers login après 2 secondes
      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (error) {
      setMessage(error.message);
    }

    setLoading(false);
  };

  // ==== TOKEN MANQUANT ====
  if (!token) {
    return (
      <section className="container py-5 text-center">
        <h1>Lien invalide</h1>
        <p>Le lien de réinitialisation est incorrect.</p>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <h1 className="text-center mb-5">Réinitialiser le mot de passe</h1>

      <div
        className="mx-auto p-4 rounded"
        style={{ maxWidth: "500px", backgroundColor: "var(--bs-secondary)" }}
      >
        <form onSubmit={handleSubmit}>
          {/* Nouveau mot de passe */}
          <div className="mb-3">
            <label className="form-label">Nouveau mot de passe</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirmation */}
          <div className="mb-4">
            <label className="form-label">Confirmer le mot de passe</label>
            <input
              type="password"
              className="form-control"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary px-4 py-2"
            >
              {loading ? "Modification..." : "Modifier le mot de passe"}
            </button>
          </div>

          {/* Message retour */}
          {message && <p className="text-center mt-3">{message}</p>}
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
