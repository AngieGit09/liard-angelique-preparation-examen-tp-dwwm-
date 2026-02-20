// ========= PAGE DE CONNEXION ADMIN =========
// Page d'authentification administrateur.
// Envoie des identifiants au backend et gère la session via cookies (PHP session).
// Redirection vers le tableau de bord en cas de succès.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  // Etats des champs du formulaire
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Etat pour afficher/masquer le mot de passe (UX)
  const [showPassword, setShowPassword] = useState(false);

  // Gestion des messages d'erreur et du loader
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook de navigation programmatique (redirection après connexion)
  const navigate = useNavigate();

  // Soumission du formulaire d'authentification
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost/renomeuble/backend/authentification/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Permet la conservation de la session PHP via cookie
          credentials: "include",
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await res.json();

      // Si authentification valide → redirection vers le dashboard admin
      if (data.success) {
        navigate("/admin");
      } else {
        setError(data.message || "Identifiants incorrects");
      }
    } catch (err) {
      // Gestion d’erreur réseau ou serveur indisponible
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container text-center py-5">
      {/* Titre de l’espace administrateur */}
      <h1 className="mb-4">Bienvenue sur l'espace administrateur</h1>

      {/* Bloc formulaire centré et limité en largeur */}
      <div
        className="mx-auto p-4 rounded"
        style={{ maxWidth: "400px", backgroundColor: "var(--bs-light)" }}
      >
        {/* Message d’erreur affiché dynamiquement */}
        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Champ identifiant */}
          <div className="mb-3 text-start">
            <label className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Champ mot de passe avec option d'affichage */}
          <div className="mb-2 text-start">
            <label className="form-label">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Icône bascule visibilité mot de passe */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </span>
          </div>

          {/* Lien mot de passe oublié (placeholder UX) */}
          <div className="text-end mb-4">
            <span role="button" style={{ cursor: "pointer" }}>
              Mot de passe oublié
            </span>
          </div>

          {/* Bouton de connexion avec état de chargement */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 rounded-pill text-uppercase"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Connexion"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
