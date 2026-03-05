// ========= PAGE DE CONNEXION ADMIN =========
// Permet l'authentification de l'administrateur.
// Les identifiants sont envoyés à l'API backend qui crée une session PHP.
// En cas de succès, l'utilisateur est redirigé vers le dashboard admin.

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAdmin } from "../services/auth.service";

function AdminLogin() {
  // Etat global du formulaire
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Etats interface
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Mise à jour des champs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Soumission formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin(formData);

      if (data.success) {
        navigate("/admin");
      }
    } catch (err) {
      // affiche le vrai message serveur
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container text-center py-5">
      <h1 className="mb-4">Bienvenue sur l'espace administrateur</h1>

      <div
        className="mx-auto p-4 rounded"
        style={{ maxWidth: "400px", backgroundColor: "var(--bs-light)" }}
      >
        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3 text-start">
            <label className="form-label">Nom d'utilisateur</label>

            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2 text-start">
            <label className="form-label">Mot de passe</label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </span>
            </div>
          </div>

          {/* Lien reset password */}
          <div className="text-end mb-4">
            <Link to="/admin/forgot-password">Mot de passe oublié ?</Link>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill text-uppercase"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Connexion"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
