// ========= PAGE ERREUR / 404 =========
// Composant affiché lorsqu'aucune route ne correspond à l'URL.
// Permet d'informer l'utilisateur et de proposer une redirection vers l'accueil.

import { Link } from "react-router-dom";

function NotFound() {
  return (
    // Section centrée avec gestion responsive des espacements (Bootstrap)
    <section className="container text-center py-4 py-md-5">
      {/* Conteneur limité en largeur pour améliorer la lisibilité */}
      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        {/* Titre principal de la page d'erreur */}
        <h1 className="mb-4 mb-md-5">Une erreur s'est produite</h1>

        {/* Illustration visuelle de l'erreur (optimisée responsive) */}
        <img
          src="/images/error.png"
          alt="Erreur 404"
          className="img-fluid my-4 my-md-5"
          style={{ maxWidth: "260px" }}
        />

        {/* Message explicatif pour l'utilisateur */}
        <h2 className="h4 fw-semibold mb-5 text-center">
          Oups la page est introuvable !
        </h2>

        {/* Bouton de redirection vers la page d'accueil */}
        <Link
          to="/"
          className="btn btn-primary px-4 px-md-5 py-2 py-md-3 rounded-pill text-uppercase"
        >
          Retour page d'accueil
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
