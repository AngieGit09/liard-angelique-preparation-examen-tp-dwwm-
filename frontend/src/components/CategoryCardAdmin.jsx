import { BASE_IMAGE_URL } from "../services/api";

function CategoryCardAdmin({ category, onDelete }) {
  return (
    <div className="col-6 col-lg-4 d-flex">
      <div
        className="card w-100 h-100 text-center border-0 p-4 d-flex flex-column admin-card admin-no-hover"
        style={{ backgroundColor: "var(--bs-secondary)" }}
      >
        <h3 className="product-title fw-semibold mb-3">{category.name}</h3>

        <div className="category-image-wrapper">
          <img
            src={`${BASE_IMAGE_URL}/${category.image_path}`}
            alt={category.name}
            className="category-card-img"
          />
        </div>

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
