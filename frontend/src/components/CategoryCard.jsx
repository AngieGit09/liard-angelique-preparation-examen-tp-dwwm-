import { Link } from "react-router-dom";

function CategoryCard({ title, image, link }) {
  return (
    <div className="col-6 col-lg-4 mb-4">
      <Link to={link} className="text-decoration-none w-100">
        <div className="category-card text-center p-4">
          <h3 className="category-card-title mb-3">{title}</h3>

          <div className="category-image-wrapper">
            <img
              src={image}
              alt={title}
              className="category-card-img"
              loading="lazy"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;
