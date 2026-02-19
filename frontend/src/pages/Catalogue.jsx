import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

function Catalogue() {
  // State pour stocker les catégories récupérées depuis l’API
  const [categories, setCategories] = useState([]);

  // State pour gérer l’affichage du loader
  const [loading, setLoading] = useState(true);

  // URL de l’API catégories
  const API_URL =
    "http://localhost/renomeuble/backend/api/public/categories/index.php";

  // Récupération des catégories au chargement du composant
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur API catégories");
        }
        return res.json();
      })
      .then((data) => {
        console.log("DATA CATEGORIES :", data);
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="catalogue">
      {/* Titre principal */}
      <section className="container-fluid px-5 py-4 text-center">
        <h1 className="mb-4">Toutes nos catégories disponibles</h1>
      </section>

      {/* Liste des catégories */}
      <section className="container-fluid px-5 py-5">
        <h2 className="text-center h5 fw-semibold mb-5">
          Retrouvez nos produits
        </h2>

        {/* Skeleton loader pendant le chargement */}
        {loading && (
          <div className="row g-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-6 col-lg-4">
                <div className="skeleton-card"></div>
              </div>
            ))}
          </div>
        )}

        {/* Affichage des catégories une fois chargées */}
        {!loading && (
          <div className="row g-4 align-items-stretch">
            {/* Carte spéciale : tous les produits */}
            <CategoryCard
              key="all"
              title="Tous nos meubles"
              image="/images/house.png"
              link="/categorie/all"
            />

            {/* Mapping des catégories dynamiques */}
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
