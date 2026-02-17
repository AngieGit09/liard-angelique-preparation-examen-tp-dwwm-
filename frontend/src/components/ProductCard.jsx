import { Link, useParams } from "react-router-dom";

function ProductCard({ id, name, price, image }) {
  const { slug } = useParams(); // 🔥 récupération automatique du slug

  return (
    // Colonne responsive Bootstrap
    <div className="col-12 col-md-6 col-lg-4">
      <div className="product-card card border-0 h-100 p-3">
        {/* Nom du produit */}
        <h2 className="product-title text-center fw-semibold mb-4">{name}</h2>

        <div className="row align-items-center flex-grow-1">
          {/* Colonne gauche : prix + bouton détail */}
          <div className="col-5 d-flex flex-column align-items-center justify-content-center text-center">
            <p className="text-primary fw-semibold mb-3">
              {price ? parseFloat(price).toFixed(2) : "0.00"} €
            </p>

            {/* Bouton accès fiche produit */}
            <Link
              to={`/produit/${id}`}
              state={{ categorySlug: slug }}
              className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center text-uppercase"
              style={{ width: "95px", height: "95px", fontSize: "0.7rem" }}
            >
              en voir plus
            </Link>
          </div>

          {/* Colonne droite : image produit */}
          <div className="col-7 text-center">
            <img src={image} alt={name} className="img-fluid" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
