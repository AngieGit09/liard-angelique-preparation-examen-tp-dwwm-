import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

function Catalogue() {
  return (
    <div className="catalogue">
      {/* ==== TITRE ==== */}
      <section className="container-fluid px-5 py-4 text-center">
        <h1 className="mb-4">Toutes nos catégories disponibles</h1>
      </section>

      {/* ==== BEST SELLER ==== */}
      <section className="container-fluid px-5 py-4 text-center">
        <h2 className="h5 fw-semibold mb-4">Notre best-seller du moment</h2>

        <div className="row align-items-center justify-content-center g-3">
          {/* Petite image gauche */}
          <div className="col-3 col-md-2">
            <img
              src="/images/table_basse.png"
              className="img-fluid bestseller-img-small"
              alt="Table basse - vue 1"
            />
          </div>

          {/* Image principale */}
          <div className="col-6 col-md-4">
            <img
              src="/images/table_basse.png"
              className="img-fluid bestseller-img-large"
              alt="Table basse - best seller"
            />
          </div>

          {/* Petite image droite */}
          <div className="col-3 col-md-2">
            <img
              src="/images/table_basse.png"
              className="img-fluid bestseller-img-small"
              alt="Table basse - vue 2"
            />
          </div>

          {/* Bouton */}
          <div className="col-12 col-md-3 d-flex align-items-center justify-content-center mt-3 mt-md-0">
            <Link
              to="/produit/1"
              className="btn btn-primary rounded-pill px-4 text-uppercase text-nowrap"
            >
              voir le produit
            </Link>
          </div>
        </div>
      </section>

      {/* ==== CATÉGORIES ==== */}
      <section className="container-fluid px-5 py-5">
        <h2 className="text-center h5 fw-semibold mb-5">
          Retrouvez nos produits
        </h2>

        <div className="row g-4 align-items-stretch">
          <CategoryCard
            title="Tous nos meubles"
            image="/images/house.png"
            link="/categorie/tous"
          />

          <CategoryCard
            title="Meubles de salon"
            image="/images/table.png"
            link="/categorie/salon"
          />

          <CategoryCard
            title="Meubles de chambre"
            image="/images/bed.png"
            link="/categorie/chambre"
          />

          <CategoryCard
            title="Meubles de bureau"
            image="/images/bureau.png"
            link="/categorie/bureau"
          />

          <CategoryCard
            title="Accessoires"
            image="/images/rocking-horse.png"
            link="/categorie/accessoires"
          />
        </div>
      </section>
    </div>
  );
}

export default Catalogue;
