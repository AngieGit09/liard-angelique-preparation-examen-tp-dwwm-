import { BASE_IMAGE_URL } from "../services/api";

function CardGestion({ product, onDelete, onEdit }) {
  return (
    <div
      className="p-4 h-100"
      style={{ backgroundColor: "var(--bs-secondary)" }}
    >
      <h2 className="h6 fw-semibold text-center mb-3 admin-card-title">
        {product.title}
      </h2>

      <div className="row align-items-center">
        <div className="col-7">
          <p className="mb-1">{product.category}</p>

          <p className="mb-1">
            {product.price
              ? new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(product.price)
              : "0,00 €"}
          </p>

          <p className="mb-1">{product.description}</p>

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

          <small>{product.photosCount} photos enregistrées</small>
        </div>
      </div>

      <div className="d-flex justify-content-around mt-4">
        <button
          type="button"
          className="btn btn-link admin-action"
          onClick={onEdit}
        >
          Modifier
        </button>

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
