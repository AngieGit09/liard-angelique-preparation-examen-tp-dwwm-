// ========= PAGE CATEGORIES =========
// Page d'affichage des produits par catégorie (slug dynamique).
// Inclut la récupération des données via API, le tri des produits
// et une pagination côté client avec bouton "Afficher plus".

import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Category() {
  // Récupération du slug de catégorie depuis l’URL (routing dynamique)
  const { slug } = useParams();

  // Etat contenant la liste des produits de la catégorie
  const [products, setProducts] = useState([]);

  // Etat de chargement pour l'affichage conditionnel (loader / contenu)
  const [loading, setLoading] = useState(true);

  // Etat du critère de tri sélectionné par l’utilisateur
  const [sortBy, setSortBy] = useState("Pertinence");

  // Nombre de produits visibles (pagination côté client)
  const [visibleCount, setVisibleCount] = useState(6);

  // Récupération des produits selon la catégorie sélectionnée
  useEffect(() => {
    setLoading(true);
    // Réinitialisation de la pagination lors du changement de catégorie
    setVisibleCount(6);

    const API_URL = `http://localhost/renomeuble/backend/api/public/products/index.php?slug=${slug}`;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((data) => {
        // Vérification du format des données retournées par l’API
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Fallback en cas d’erreur API
        setProducts([]);
        setLoading(false);
      });
  }, [slug]); // Déclenché à chaque changement de catégorie

  // Tri des produits en fonction du critère sélectionné
  // useMemo évite un recalcul inutile à chaque rendu
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
        // Tri par pertinence (ordre API par défaut)
        break;
    }

    return result;
  }, [products, sortBy]);

  // Sous-ensemble des produits affichés (pagination progressive)
  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="category">
      {/* ==== EN-TÊTE + SYSTEME DE TRI ==== */}
      <section className="container py-4">
        <h1 className="text-center text-uppercase mb-4">NOS PRODUITS</h1>

        {/* Sélecteur de tri des produits */}
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

      {/* ==== LISTE DES PRODUITS ==== */}
      <section className="container py-4">
        {/* Affichage d'un skeleton loader pendant le chargement */}
        {loading && (
          <div className="row g-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="skeleton-card"></div>
              </div>
            ))}
          </div>
        )}

        {/* Message si aucun produit n'est disponible dans la catégorie */}
        {!loading && sortedProducts.length === 0 && (
          <p className="text-center mt-4">Aucun produit trouvé.</p>
        )}

        {/* Grille de produits (responsive) */}
        <div className="row g-4">
          {!loading &&
            visibleProducts.map((product) => (
              <ProductCard
                key={product.id} // Clé unique pour le rendu des listes React
                id={product.id}
                name={product.title}
                price={product.price}
                image={`http://localhost/renomeuble/backend/${product.image_path}`}
              />
            ))}
        </div>

        {/* Bouton de chargement progressif (pagination côté client) */}
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

      {/* Navigation retour vers la page catalogue */}
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