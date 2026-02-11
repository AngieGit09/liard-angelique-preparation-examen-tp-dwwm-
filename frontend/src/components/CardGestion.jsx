function CardGestion({ product, onDelete, onEdit }) {
  return (
    <div
      className="p-4 h-100"
      style={{ backgroundColor: "var(--bs-secondary)" }}
    >
      {/* Titre */}
      <h2 className="h6 fw-semibold text-center mb-3 admin-card-title">
        {product.title}
      </h2>

      {/* Contenu */}
      <div className="row align-items-center">
        <div className="col-7">
          <p className="mb-1">{product.category}</p>
          <p className="mb-1">{product.price}</p>
          <p className="mb-1">{product.description}</p>
          <p className="mb-0">{product.date}</p>
        </div>

        <div className="col-5 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid mb-2"
          />
          <small>{product.photosCount} photos enregistrées</small>
        </div>
      </div>

      {/* Actions */}
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
          className="btn btn-link admin-action"
          onClick={onDelete}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default CardGestion;
