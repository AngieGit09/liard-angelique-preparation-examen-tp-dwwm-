// ========= PAGE MOT DE PASSE OUBLIE =========
// Permet à l'administrateur de demander une réinitialisation
// de son mot de passe via son adresse email.

import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  // ==== STATE EMAIL ====
  const [email, setEmail] = useState("");

  // ==== ETATS INTERFACE ====
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error

  // ==== ENVOI DEMANDE RESET ====
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(
        "http://localhost/renomeuble/backend/authentification/forgot-password.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <section className="container py-5">
      {/* ==== TITRE ==== */}
      <h1 className="text-center mb-4">Mot de passe oublié</h1>

      <p className="text-center mb-5">
        Entrez votre adresse email pour recevoir un lien de réinitialisation de
        votre mot de passe.
      </p>

      {/* ==== FORMULAIRE ==== */}
      <div
        className="mx-auto p-4 rounded"
        style={{
          backgroundColor: "var(--bs-secondary)",
          maxWidth: "500px",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="mb-4">
            <label className="form-label">Adresse email</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@mail.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* BOUTON */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary px-4 py-2 rounded-pill"
            >
              {loading ? "Envoi..." : "Envoyer le lien"}
            </button>
          </div>

          {/* MESSAGE SUCCES */}
          {status === "success" && (
            <p className="text-success text-center mt-3">
              Si cette adresse existe, un lien de réinitialisation a été envoyé.
            </p>
          )}

          {/* MESSAGE ERREUR */}
          {status === "error" && (
            <p className="text-danger text-center mt-3">
              Une erreur est survenue.
            </p>
          )}
        </form>

        {/* RETOUR LOGIN */}
        <div className="text-center mt-4">
          <Link to="/admin/login">Retour à la connexion</Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
