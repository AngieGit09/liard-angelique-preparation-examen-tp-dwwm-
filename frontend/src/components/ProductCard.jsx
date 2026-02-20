// ========= COMPOSANT PRODUCT CARD =========
// Carte produit réutilisable utilisée dans les pages Catalogue,
// Catégories et Résultats de recherche.
// Affiche les informations essentielles du produit avec un lien vers la fiche détail.

import { Link, useParams } from "react-router-dom";

function ProductCard({ id, name, price, image }) {
  // Récupération du slug de catégorie depuis l’URL
  // Permet de conserver le contexte lors de la navigation vers la fiche produit
  const { slug } = useParams();

  return (
    // Colonne responsive (grille Bootstrap)
    <div className="col-12 col-md-6 col-lg-4">
      <div className="product-card card border-0 h-100 p-3">
        {/* Titre du produit */}
        <h2 className="product-title text-center fw-semibold mb-4">{name}</h2>

        <div className="row align-items-center flex-grow-1">
          {/* Colonne gauche : prix + navigation vers le détail */}
          <div className="col-5 d-flex flex-column align-items-center justify-content-center text-center">
            {/* Formatage du prix avec valeur par défaut */}
            <p className="text-primary fw-semibold mb-3">
              {price ? parseFloat(price).toFixed(2) : "0.00"} €
            </p>

            {/* Lien vers la page détail du produit
                Transmission du slug pour gérer le bouton "retour" contextualisé */}
            <Link
              to={`/produit/${id}`}
              state={{ categorySlug: slug }}
              className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center text-uppercase"
              style={{ width: "95px", height: "95px", fontSize: "0.7rem" }}
            >
              en voir plus
            </Link>
          </div>

          {/* Colonne droite : image du produit */}
          <div className="col-7 text-center">
            <img
              src={image}
              alt={name} // Accessibilité SEO et UX
              className="img-fluid"
              loading="lazy" // Optimisation des performances (lazy loading)
              onError={(e) => {
                // Image de secours si l’image produit est introuvable
                e.target.src = "/images/placeholder.png";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
