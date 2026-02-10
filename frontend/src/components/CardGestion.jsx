function CardGestion({ product }) {
  return (
    /* Carte produit – interface administrateur */
    <div
      className="p-4 h-100"
      style={{ backgroundColor: "var(--bs-secondary)" }}
    >
      {/* Titre du produit */}
      <h2 className="h6 text-center mb-3 admin-card-title">{product.title}</h2>

      {/* Contenu principal de la carte */}
      <div className="row align-items-center">
        {/* Informations produit */}
        <div className="col-7">
          <p className="mb-1">{product.category}</p>
          <p className="mb-1">{product.price}</p>
          <p className="mb-1">{product.description}</p>
          <p className="mb-0">{product.date}</p>
        </div>

        {/* Image et infos complémentaires */}
        <div className="col-5 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid mb-2"
          />
          <small>{product.photosCount} photos enregistrées</small>
        </div>
      </div>

      {/* Actions administrateur */}
      <div className="d-flex justify-content-around mt-4">
        <button className="btn btn-link text-decoration-none admin-action">
          Modifier
        </button>
        <button className="btn btn-link text-decoration-none admin-action">
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default CardGestion;
