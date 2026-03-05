import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/auth.service";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({ token, password });

      setMessage("Mot de passe modifié avec succès.");

      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (error) {
      setMessage(error.message);
    }

    setLoading(false);
  };

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
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmer mot de passe"
          className="form-control mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Modification..." : "Modifier"}
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </section>
  );
}

export default ResetPassword;
