import { Link } from "react-router-dom";

function CategoryCard({ title, image, link }) {
  return (
    <div className="col-6 col-lg-4 d-flex">
      <Link to={link} className="text-decoration-none w-100">
        <div
          className="card h-100 text-center border-0 p-4 d-flex flex-column category-card"
          style={{ backgroundColor: "var(--bs-secondary)" }}
        >
          <h3 className="product-title fw-semibold mb-3">{title}</h3>

          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <img
              src={image}
              alt={title}
              className="img-fluid category-card-img"
              loading="lazy"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;
