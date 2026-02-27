// ========= COMPOSANT PRODUIT MIS EN AVANT =========

import { Link } from "react-router-dom";

function FeaturedProduct({
  product,
  loading,
  label = "Notre article coup de cœur",
}) {
  if (loading) {
    return (
      <section className="container py-3 text-center my-5">
        <h2 className="h5 fw-semibold mb-4">{label}</h2>
        <p>Chargement...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="container py-3 text-center my-5">
        <h2 className="h5 fw-semibold mb-4">{label}</h2>
        <p>Aucun produit mis en avant disponible.</p>
      </section>
    );
  }

  return (
    <section className="container py-3 text-center my-5">
      <h2 className="h5 fw-semibold mb-4">{label}</h2>

      <div className="row align-items-center justify-content-center g-4">
        {/* Image secondaire gauche */}
        <div className="col-4 col-md-2">
          {product.images?.[1] && (
            <img
              src={`http://localhost/renomeuble/backend/${product.images[1].image_path}`}
              alt={product.title}
              className="bestseller-small img-fluid"
              loading="lazy"
            />
          )}
        </div>

        {/* Image principale */}
        <div className="col-6 col-md-4">
          {product.images?.[0] && (
            <img
              src={`http://localhost/renomeuble/backend/${product.images[0].image_path}`}
              alt={product.title}
              className="bestseller-main img-fluid"
              loading="lazy"
            />
          )}
        </div>

        {/* Image secondaire droite */}
        <div className="col-4 col-md-2">
          {product.images?.[2] && (
            <img
              src={`http://localhost/renomeuble/backend/${product.images[2].image_path}`}
              alt={product.title}
              className="bestseller-small img-fluid"
              loading="lazy"
            />
          )}
        </div>

        {/* Bouton */}
        <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-start">
          <Link
            to={`/produit/${product.id}`}
            className="btn btn-primary rounded-pill px-4"
          >
            VOIR LE PRODUIT
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProduct;
