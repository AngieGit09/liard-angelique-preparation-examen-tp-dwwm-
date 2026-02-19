function CategoryCardAdmin({ category, onEdit, onDelete }) {
  return (
    <div className="col-6 col-lg-4 d-flex">
      <div
        className="card w-100 h-100 text-center border-0 p-4 d-flex flex-column admin-card admin-no-hover"
        style={{ backgroundColor: "var(--bs-secondary)" }}
      >
        <h3 className="product-title fw-semibold mb-3">{category.name}</h3>

        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <img
            src={`http://localhost/renomeuble/backend/${category.image_path}`}
            alt={category.name}
            className="img-fluid category-card-img"
          />
        </div>

        <div className="d-flex justify-content-around mt-4">
          <button
            type="button"
            className="btn btn-link admin-action"
            onClick={() => onEdit(category)}
          >
            Modifier
          </button>

          <button
            type="button"
            className="btn btn-link admin-action"
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
