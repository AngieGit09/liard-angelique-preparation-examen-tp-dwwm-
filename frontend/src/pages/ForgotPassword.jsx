import { useState } from "react";
import { Link } from "react-router-dom";

import { forgotPassword } from "../services/auth.service";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    try {
      await forgotPassword(email);

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
      <h1 className="text-center mb-4">Mot de passe oublié</h1>

      <p className="text-center mb-5">
        Entrez votre adresse email pour recevoir un lien de réinitialisation.
      </p>

      <div
        className="mx-auto p-4 rounded"
        style={{
          backgroundColor: "var(--bs-secondary)",
          maxWidth: "500px",
        }}
      >
        <form onSubmit={handleSubmit}>
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

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary px-4 py-2 rounded-pill"
            >
              {loading ? "Envoi..." : "Envoyer le lien"}
            </button>
          </div>

          {status === "success" && (
            <p className="text-success text-center mt-3">
              Si cette adresse existe, un email a été envoyé.
            </p>
          )}

          {status === "error" && (
            <p className="text-danger text-center mt-3">
              Une erreur est survenue.
            </p>
          )}
        </form>

        <div className="text-center mt-4">
          <Link to="/admin/login">Retour connexion</Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
