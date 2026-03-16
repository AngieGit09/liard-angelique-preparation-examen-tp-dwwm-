// ========= PAGE CATALOGUE =========
// Page présentant l’ensemble des catégories disponibles
// ainsi qu’un produit mis en avant (best-seller).

import { useEffect, useState } from "react";

import FeaturedProduct from "../components/FeaturedProduct";
import CategoryCard from "../components/CategoryCard";

import { getCategories } from "../services/categories.service";
import { getFeaturedProduct } from "../services/products.service";

function Catalogue() {
  // Etat des catégories
  const [categories, setCategories] = useState([]);

  // Produit mis en avant
  const [featured, setFeatured] = useState(null);

  // Etat chargement
  const [loading, setLoading] = useState(true);

  // ==== RECUPERATION DES DONNEES ====
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Catégories
        const catData = await getCategories();
        setCategories(catData);

        // Produit best seller
        const featuredData = await getFeaturedProduct();
        setFeatured(featuredData);
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

      {/* ==== PRODUIT MIS EN AVANT ==== */}
      <FeaturedProduct
        product={featured}
        loading={loading}
        label="Notre best-seller du moment"
      />

      {/* ==== LISTE DES CATEGORIES ==== */}
      <section className="container py-2 text-center my-3">
        <h2 className="text-center h5 fw-semibold mb-5">Tous nos produits</h2>

        {/* Loader */}
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

        {/* Catégories */}
        {!loading && (
          <div className="row g-4 align-items-stretch">
            {/* Catégorie globale */}
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
