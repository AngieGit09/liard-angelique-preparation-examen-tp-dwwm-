// =========== CARTE CATEGORIE - FRONT PUBLIC ===========
// Composant réutilisable affichant une catégorie dans la page Catalogue.
// Permet la navigation vers la page correspondante via React Router.

import { Link } from "react-router-dom";

function CategoryCard({ title, image, link }) {
  return (
    // Colonne responsive (2 cartes par ligne mobile, 3 en desktop large)
    <div className="col-6 col-lg-4 mb-4">
      {/* Carte entièrement cliquable via Link */}
      <Link to={link} className="text-decoration-none w-100">
        <div className="category-card text-center p-4">
          {/* Titre de la catégorie */}
          <h3 className="category-card-title mb-3">{title}</h3>

          {/* Image représentative de la catégorie */}
          <div className="category-image-wrapper">
            <img
              src={image}
              alt={title} // Accessibilité et SEO
              className="category-card-img"
              loading="lazy" // Optimisation des performances
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;
