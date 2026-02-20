// =========== CARTES CATEGORIES - INTERFACE ADMIN ===========
// Composant affichant une catégorie dans la page de gestion admin.
// Permet la visualisation de la catégorie et le déclenchement
// d’une action de suppression via une modale de confirmation.

function CategoryCardAdmin({ category, onDelete }) {
  return (
    // Colonne responsive (2 cartes par ligne mobile, 3 en desktop large)
    <div className="col-6 col-lg-4 d-flex">
      <div
        className="card w-100 h-100 text-center border-0 p-4 d-flex flex-column admin-card admin-no-hover"
        style={{ backgroundColor: "var(--bs-secondary)" }}
      >
        {/* Nom de la catégorie */}
        <h3 className="product-title fw-semibold mb-3">{category.name}</h3>

        {/* Image associée à la catégorie */}
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <img
            src={`http://localhost/renomeuble/backend/${category.image_path}`}
            alt={category.name}
            className="img-fluid category-card-img"
          />
        </div>

        {/* Action administrative : suppression */}
        {/* L’événement est transmis au parent pour ouverture de la modale */}
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-link admin-action text-danger"
            onClick={() => onDelete(category)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryCardAdmin;
