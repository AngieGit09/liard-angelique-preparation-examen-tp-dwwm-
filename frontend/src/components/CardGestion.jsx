// =========== CARTE PRODUIT - INTERFACE ADMIN ===========
// Composant affichant un produit dans la page de gestion.
// Permet la visualisation des informations principales
// et l’accès aux actions d’édition et de suppression (CRUD).

function CardGestion({ product, onDelete, onEdit }) {
  return (
    // Conteneur principal de la carte (style cohérent avec le back-office)
    <div
      className="p-4 h-100"
      style={{ backgroundColor: "var(--bs-secondary)" }}
    >
      {/* Titre du produit */}
      <h2 className="h6 fw-semibold text-center mb-3 admin-card-title">
        {product.title}
      </h2>

      {/* Contenu informatif du produit */}
      <div className="row align-items-center">
        {/* Colonne gauche : informations textuelles */}
        <div className="col-7">
          {/* Catégorie du produit */}
          <p className="mb-1">{product.category}</p>

          {/* Prix formaté en devise (locale française) */}
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

          {/* Date (création ou mise à jour selon l’API) */}
          <p className="mb-0">{product.date}</p>
        </div>

        {/* Colonne droite : image + informations visuelles */}
        <div className="col-5 text-center">
          <div className="admin-product-img-wrapper mb-2">
            <img
              src={
                product.image
                  ? `http://localhost/renomeuble/backend/${product.image}`
                  : "/images/placeholder.png" // Image de secours si aucune image
              }
              alt={product.title} // Accessibilité et cohérence SEO
              className="admin-product-img"
            />
          </div>

          {/* Indicateur du nombre de photos associées au produit */}
          <small>{product.photosCount} photos enregistrées</small>
        </div>
      </div>

      {/* Actions administratives (CRUD) */}
      <div className="d-flex justify-content-around mt-4">
        {/* Bouton modification (ouvre la modale d’édition) */}
        <button
          type="button"
          className="btn btn-link admin-action"
          onClick={onEdit}
        >
          Modifier
        </button>

        {/* Bouton suppression (déclenche la modale de confirmation) */}
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
