// ===== COMPONENT PRODUCT CARD =====
// Composant d’affichage d’un produit dans une liste
// Permet de visualiser les infos principales et d’accéder au détail du produit

import { Link, useParams } from "react-router-dom";

function ProductCard({ id, name, price, image }) {
  // Récupère le slug de la catégorie depuis l’URL (utile pour le retour)
  const { slug } = useParams();

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="product-card card border-0 h-100 p-3">
        <h2 className="product-title text-center fw-semibold mb-4">{name}</h2>

        <div className="row align-items-center flex-grow-1">
          <div className="col-5 d-flex flex-column align-items-center justify-content-center text-center">
            {/* Formatage du prix pour affichage */}
            <p className="text-primary fw-semibold mb-3">
              {price ? parseFloat(price).toFixed(2) : "0.00"} €
            </p>

            <Link
              to={`/produit/${id}`}
              // Transmet la catégorie pour gérer le retour sur la page détail
              state={{ categorySlug: slug }}
              className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center text-uppercase"
              style={{ width: "95px", height: "95px", fontSize: "0.7rem" }}
            >
              en voir plus
            </Link>
          </div>

          <div className="col-7 text-center">
            <img
              src={image}
              alt={name}
              className="product-image"
              loading="lazy"
              // Image de secours si erreur de chargement
              onError={(e) => {
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
