// ===== COMPONENT CARD GESTION =====
// Carte utilisée dans l’interface admin pour afficher un produit.
// Permet de visualiser ses informations principales et d’effectuer des actions (modifier / supprimer).

import { BASE_IMAGE_URL } from "../services/api";

function CardGestion({ product, onDelete, onEdit }) {
  return (
    <div
      className="p-4 h-100"
      style={{ backgroundColor: "var(--bs-secondary)" }}
    >
      {/* Nom du produit */}
      <h2 className="h6 fw-semibold text-center mb-3 admin-card-title">
        {product.title}
      </h2>

      <div className="row align-items-center">
        <div className="col-7">
          {/* Catégorie */}
          <p className="mb-1">{product.category}</p>

          {/* Formatage du prix en euros (locale FR) */}
          <p className="mb-1">
            {product.price
              ? new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(product.price)
              : "0,00 €"}
          </p>

          {/* Description courte */}
          <p className="mb-1">{product.description}</p>

          {/* Date */}
          <p className="mb-0">{product.date}</p>
        </div>

        <div className="col-5 text-center">
          <div className="admin-product-img-wrapper mb-2">
            <img
              src={
                product.image
                  ? `${BASE_IMAGE_URL}/${product.image}`
                  : "/images/placeholder.png"
              }
              alt={product.title}
              className="admin-product-img"
            />
          </div>

          {/* Nombre de photos associées */}
          <small>{product.photosCount} photos enregistrées</small>
        </div>
      </div>

      <div className="d-flex justify-content-around mt-4">
        {/* Action modification */}
        <button
          type="button"
          className="btn btn-link admin-action"
          onClick={onEdit}
        >
          Modifier
        </button>

        {/* Action suppression */}
        <button
          type="button"
          className="btn btn-link admin-action text-danger"
          onClick={onDelete}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default CardGestion;
