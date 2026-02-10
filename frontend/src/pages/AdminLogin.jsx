function AdminLogin() {
  return (
    <section className="container text-center py-5">
      {/* Titre */}
      <h1 className="mb-4">Bienvenue sur l’espace administrateur</h1>

      {/* Bloc formulaire */}
      <div
        className="mx-auto p-4 rounded"
        style={{ maxWidth: "400px", backgroundColor: "var(--bs-light)" }}
      >
        <form>
          {/* Nom d'utilisateur */}
          <div className="mb-3 text-start">
            <label className="form-label">Nom d’utilisateur</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nom d'utilisateur"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-2 text-start">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              required
            />
          </div>

          {/* Mot de passe oublié */}
          <div className="text-end mb-4">
            <span
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => {}}
            >
              Mot de passe oublié
            </span>
          </div>

          {/* Bouton */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 rounded-pill text-uppercase"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
