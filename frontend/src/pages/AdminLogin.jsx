import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // empêche le rafraîchissement
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost/renomeuble/backend/authentification/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // important pour que la session PHP soit conservée
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await res.json();

      if (data.success) {
        navigate("/admin"); // redirige vers ton dashboard
      } else {
        setError(data.message || "Identifiants incorrects");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
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

          <div className="mb-2 text-start">
            <label className="form-label">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: "pointer",
              }}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </span>
          </div>

          <div className="text-end mb-4">
            <span role="button" style={{ cursor: "pointer" }}>
              Mot de passe oublié
            </span>
          </div>

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
