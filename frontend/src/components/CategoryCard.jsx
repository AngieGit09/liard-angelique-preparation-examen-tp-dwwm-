import { Link } from "react-router-dom";

// CARD CATALOGUE
function CategoryCard({ title, image, link }) {
  return (
    <div className="col-6 col-lg-4 d-flex">
      <Link to={link} className="text-decoration-none w-100">
        <div
          className="card h-100 text-center border-0 p-4 d-flex flex-column category-card"
          style={{ backgroundColor: "var(--bs-secondary)" }}
        >
          <h3
            className="h6 fw-semibold mb-3"
            style={{ color: "var(--bs-dark)" }}
          >
            {title}
          </h3>

          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <img
              src={image}
              alt={title}
              className="img-fluid category-card-img"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;
