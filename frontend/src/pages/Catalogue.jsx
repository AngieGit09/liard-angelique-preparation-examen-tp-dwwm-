// ========= PAGE CATALOGUE =========
// Page présentant l’ensemble des catégories disponibles
// ainsi qu’un produit mis en avant (best-seller).
// Les données sont récupérées dynamiquement via l’API backend.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

function Catalogue() {
  // Etat des catégories récupérées depuis l’API
  const [categories, setCategories] = useState([]);

  // Etat du produit best-seller
  const [featured, setFeatured] = useState(null);

  // Etat global de chargement
  const [loading, setLoading] = useState(true);

  // Endpoints API
  const CATEGORIES_API =
    "http://localhost/renomeuble/backend/api/public/categories/index.php";

  const FEATURED_API =
    "http://localhost/renomeuble/backend/api/public/products/featured.php";

  // Chargement initial des données (catégories + produit mis en avant)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des catégories
        const catRes = await fetch(CATEGORIES_API);
        if (!catRes.ok) throw new Error("Erreur API catégories");
        const catData = await catRes.json();
        setCategories(catData);

        // Récupération du best-seller (même logique que sur la page Home)
        const featRes = await fetch(FEATURED_API);
        if (featRes.ok) {
          const featData = await featRes.json();
          setFeatured(featData);
        }
      } catch (error) {
        console.error("Erreur chargement catalogue :", error);
      } finally {
        // Désactivation du loader après chargement des données
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Exécuté une seule fois au montage du composant

  return (
    <div className="catalogue">
      {/* ==== TITRE PRINCIPAL ==== */}
      <section className="container-fluid px-5 pt-4 pb-2 text-center">
        <h1 className="mb-2">Toutes nos catégories disponibles</h1>
      </section>

      {/* ==== SECTION BEST-SELLER ==== */}
      {/* Produit mis en avant dynamiquement */}
      {!loading && featured && (
        <section className="container py-2 text-center my-3">
          <h2 className="h5 fw-semibold mb-4">Notre best-seller du moment</h2>

          <div className="row align-items-center justify-content-center g-4">
            {/* Image secondaire gauche */}
            <div className="col-4 col-md-2">
              {featured.images?.[1] && (
                <img
                  src={`http://localhost/renomeuble/backend/${featured.images[1].image_path}`}
                  alt={featured.title}
                  className="catalogue-bestseller-small"
                />
              )}
            </div>

            {/* Image principale mise en avant */}
            <div className="col-12 col-md-4 d-flex justify-content-center">
              <img
                src={`http://localhost/renomeuble/backend/${
                  featured.image_path || featured.images?.[0]?.image_path
                }`}
                alt={featured.title}
                className="catalogue-bestseller-main"
                loading="lazy"
              />
            </div>

            {/* Image secondaire droite */}
            <div className="col-4 col-md-2">
              {featured.images?.[2] && (
                <img
                  src={`http://localhost/renomeuble/backend/${featured.images[2].image_path}`}
                  alt={featured.title}
                  className="catalogue-bestseller-small"
                />
              )}
            </div>

            {/* Lien vers la page détail du produit */}
            <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-start">
              <Link
                to={`/produit/${featured.id}`}
                className="btn btn-primary rounded-pill px-4"
              >
                VOIR LE PRODUIT
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ==== LOADER GLOBAL ==== */}
      {loading && (
        <section className="container text-center py-4">
          <p>Chargement...</p>
        </section>
      )}

      {/* ==== LISTE DES CATEGORIES ==== */}
      <section className="container py-2 text-center my-3">
        <h2 className="text-center h5 fw-semibold mb-5">
          Retrouvez nos produits
        </h2>

        {/* Skeleton pendant chargement */}
        {loading && (
          <div className="row g-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-6 col-lg-4">
                <div className="skeleton-card"></div>
              </div>
            ))}
          </div>
        )}

        {/* Affichage des cartes catégories */}
        {!loading && (
          <div className="row g-4 align-items-stretch">
            {/* Catégorie générique : tous les produits */}
            <CategoryCard
              key="all"
              title="Tous nos meubles"
              image="/src/assets/house.png"
              link="/categorie/all"
            />

            {/* Catégories dynamiques issues de l’API */}
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.name}
                image={`http://localhost/renomeuble/backend/${category.image_path}`}
                link={`/categorie/${category.slug}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Catalogue;
