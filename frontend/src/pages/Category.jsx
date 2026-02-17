import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Category() {
  // Récupération du slug depuis l’URL
  const { slug } = useParams();

  // Liste des produits
  const [products, setProducts] = useState([]);

  // Gestion du loader
  const [loading, setLoading] = useState(true);

  // Gestion du tri
  const [sortBy, setSortBy] = useState("Pertinence");

  // Nombre de produits visibles (pagination côté client)
  const [visibleCount, setVisibleCount] = useState(6);

  // Récupération des produits selon la catégorie
  useEffect(() => {
    setLoading(true);
    setVisibleCount(6); // Reset pagination quand on change de catégorie

    const API_URL = `http://localhost/renomeuble/backend/api/products/by-category.php?slug=${slug}`;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, [slug]);

  // Tri des produits
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

  // Produits affichés selon pagination
  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="category">
      {/* Titre + tri */}
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

      {/* Produits */}
      <section className="container py-4">
        {loading && (
          <div className="row g-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="skeleton-card"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && sortedProducts.length === 0 && (
          <p className="text-center mt-4">Aucun produit trouvé.</p>
        )}

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

        {/* Bouton afficher plus */}
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

      {/* Bouton retour catalogue */}
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
