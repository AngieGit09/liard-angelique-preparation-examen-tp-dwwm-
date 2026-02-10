import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="container text-center py-4 py-md-5">
      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        {/* marge plus grande sous le titre */}
        <h1 className="mb-4 mb-md-5">Une erreur s'est produite</h1>

        {/* marge verticale augmentée autour de l’image */}
        <img
          src="/images/error.png"
          alt="Erreur 404"
          className="img-fluid my-4 my-md-5"
          style={{ maxWidth: "260px" }}
        />

        {/* marge augmentée sous le texte */}
        <h2 className="h4 fw-semibold mb-5 text-center">
          Oups la page est introuvable !
        </h2>

        {/* bouton */}
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
