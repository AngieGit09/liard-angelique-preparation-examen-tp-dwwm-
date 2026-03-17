// ===== PAGE RÉINITIALISATION MOT DE PASSE =====
// Permet à l’utilisateur de définir un nouveau mot de passe via un token sécurisé.
// Le token est transmis dans l’URL et vérifié côté backend avant validation.

import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/auth.service";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  // Récupère le token présent dans l'URL (envoyé par email)
  const token = searchParams.get("token");

  const navigate = useNavigate();

  // États pour gérer les champs du formulaire
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // États pour UX : chargement + message utilisateur
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification côté front : évite un appel API inutile
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      // Envoi du token + nouveau mot de passe au backend
      await resetPassword({ token, password });

      setMessage("Mot de passe modifié avec succès.");

      // Redirection après 2 secondes vers la page de connexion
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (error) {
      // Affiche l'erreur retournée par l'API
      setMessage(error.message);
    }
    // Fin du chargement
    setLoading(false);
  };

  // Sécurité : si aucun token → lien invalide
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

      <form onSubmit={handleSubmit}>
        {/* Champ nouveau mot de passe */}
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirmation du mot de passe */}
        <input
          type="password"
          placeholder="Confirmer mot de passe"
          className="form-control mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Bouton désactivé pendant le chargement */}
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Modification..." : "Modifier"}
        </button>

        {/* Message de succès ou d'erreur */}
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </section>
  );
}

export default ResetPassword;
