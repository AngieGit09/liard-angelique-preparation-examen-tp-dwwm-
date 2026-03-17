// ===== COMPONENT CATEGORY CARD =====
// Composant d’affichage d’une catégorie.
// Permet d’accéder à la page correspondante via un lien cliquable.

import { Link } from "react-router-dom";

function CategoryCard({ title, image, link }) {
  return (
    <div className="col-6 col-lg-4 mb-4">
      {/* Lien vers la page de la catégorie */}
      <Link to={link} className="text-decoration-none w-100">
        <div className="category-card text-center p-4">
          {/* Titre de la catégorie */}
          <h3 className="category-card-title mb-3">{title}</h3>

          {/* Image de la catégorie */}
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
