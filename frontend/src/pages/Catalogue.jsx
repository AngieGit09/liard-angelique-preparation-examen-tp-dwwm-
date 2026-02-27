// ========= PAGE CATALOGUE =========
// Page présentant l’ensemble des catégories disponibles
// ainsi qu’un produit mis en avant (best-seller).

import { useEffect, useState } from "react";
import FeaturedProduct from "../components/FeaturedProduct";
import CategoryCard from "../components/CategoryCard";

function Catalogue() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  const CATEGORIES_API =
    "http://localhost/renomeuble/backend/api/public/categories/index.php";

  const FEATURED_API =
    "http://localhost/renomeuble/backend/api/public/products/featured.php";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des catégories
        const catRes = await fetch(CATEGORIES_API);
        if (!catRes.ok) throw new Error("Erreur API catégories");
        const catData = await catRes.json();
        setCategories(catData);

        // Récupération du produit mis en avant
        const featRes = await fetch(FEATURED_API);
        if (featRes.ok) {
          const featData = await featRes.json();
          setFeatured(featData);
        }
      } catch (error) {
        console.error("Erreur chargement catalogue :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="catalogue">
      {/* ==== TITRE ==== */}
      <section className="container-fluid px-5 pt-4 pb-2 text-center">
        <h1 className="mb-2">Toutes nos catégories disponibles</h1>
      </section>

      {/* ==== BEST SELLER VIA COMPOSANT REUTILISABLE ==== */}
      <FeaturedProduct
        product={featured}
        loading={loading}
        label="Notre best-seller du moment"
      />

      {/* ==== LISTE DES CATEGORIES ==== */}
      <section className="container py-2 text-center my-3">
        <h2 className="text-center h5 fw-semibold mb-5">
          Retrouvez nos produits
        </h2>

        {loading && (
          <div className="row g-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-6 col-lg-4">
                <div className="placeholder-glow">
                  <div
                    className="placeholder rounded"
                    style={{ height: "220px", display: "block", width: "100%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="row g-4 align-items-stretch">
            {/* Catégorie générique */}
            <CategoryCard
              key="all"
              title="Tous nos meubles"
              image="/src/assets/house.png"
              link="/categorie/all"
            />

            {/* Catégories dynamiques */}
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
