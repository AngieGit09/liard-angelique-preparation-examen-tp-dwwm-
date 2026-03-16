// ========= PAGE CATEGORIES =========
// Page d'affichage des produits par catégorie (slug dynamique).
// Inclut la récupération des données via API, le tri des produits
// et une pagination côté client avec bouton "Afficher plus".

import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

// Service API
import { getProductsByCategory } from "../services/products.service";

function Category() {
  // Récupération du slug depuis l'URL
  const { slug } = useParams();

  // Etat produits
  const [products, setProducts] = useState([]);

  // Etat chargement
  const [loading, setLoading] = useState(true);

  // Etat tri
  const [sortBy, setSortBy] = useState("Pertinence");

  // Pagination
  const [visibleCount, setVisibleCount] = useState(6);

  // ==== RECUPERATION DES PRODUITS ====
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setVisibleCount(6);

        const data = await getProductsByCategory(slug);

        if (Array.isArray(data)) {
          const uniqueProducts = [
            ...new Map(data.map((p) => [p.id, p])).values(),
          ];

          setProducts(uniqueProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Erreur chargement produits :", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [slug]);

  // ==== TRI DES PRODUITS ====
  const sortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let result = [...products];

    switch (sortBy) {
      case "Prix croissant":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;

      case "Prix décroissant":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;

      case "Alphabétique":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        break;
    }

    return result;
  }, [products, sortBy]);

  // Pagination
  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="category">
      {/* ==== EN-TÊTE + TRI ==== */}
      <section className="container py-4">
        <h1 className="text-center text-uppercase mb-4">NOS PRODUITS</h1>

        <div className="d-flex justify-content-end">
          <div className="d-flex align-items-center">
            <label htmlFor="sort" className="me-2 small">
              Trier par :
            </label>

            <select
              id="sort"
              className="form-select form-select-sm"
              style={{ width: "auto" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Pertinence">Pertinence</option>
              <option value="Prix croissant">Prix croissant</option>
              <option value="Prix décroissant">Prix décroissant</option>
              <option value="Alphabétique">Ordre alphabétique</option>
            </select>
          </div>
        </div>
      </section>

      {/* ==== LISTE PRODUITS ==== */}
      <section className="container py-4">
        {/* Loader */}
        {loading && (
          <div className="row g-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="skeleton-card"></div>
              </div>
            ))}
          </div>
        )}

        {/* Aucun produit */}
        {!loading && sortedProducts.length === 0 && (
          <p className="text-center mt-4">Aucun produit trouvé.</p>
        )}

        {/* Grille produits */}
        <div className="row g-4">
          {!loading &&
            visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.price}
                image={`http://localhost/renomeuble/backend/${product.image_path}`}
              />
            ))}
        </div>

        {/* Pagination */}
        {!loading && visibleCount < sortedProducts.length && (
          <div className="text-center mt-5">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="btn btn-primary text-uppercase px-5 py-3 rounded-pill"
            >
              Afficher plus d'articles
            </button>
          </div>
        )}
      </section>

      {/* Retour catalogue */}
      <div className="text-center mt-4">
        <Link
          to="/catalogue"
          className="btn btn-primary text-uppercase px-5 py-3 rounded-pill"
        >
          Retour
        </Link>
      </div>
    </div>
  );
}

export default Category;
