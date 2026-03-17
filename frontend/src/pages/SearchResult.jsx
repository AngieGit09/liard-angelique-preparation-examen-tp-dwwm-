// ===== PAGE RÉSULTATS DE RECHERCHE =====
// Affiche les produits correspondant à une recherche utilisateur.
// Les résultats sont récupérés dynamiquement depuis l’API en fonction du mot-clé présent dans l’URL.

import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import { searchProducts } from "../services/products.service";

function SearchResult() {
  const [searchParams] = useSearchParams();
  // Récupère la valeur du paramètre "q" dans l'URL (ex: ?q=chaise)
  const query = searchParams.get("q")?.trim() || "";

  // Stocke les résultats de la recherche
  const [results, setResults] = useState([]);
  // Permet d'afficher un état de chargement pendant l'appel API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        // Si aucun mot-clé → pas d'appel API inutile
        if (!query) {
          setResults([]);
          return;
        }

        setLoading(true);

        // Appel au service pour récupérer les produits
        const data = await searchProducts(query);
        // Sécurise la donnée (on s'assure d'avoir un tableau)
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        // En cas d'erreur → log + reset des résultats
        console.error(err);
        setResults([]);
      } finally {
        // Stop le loader dans tous les cas
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]); // Relance la recherche à chaque changement de query

  return (
    <div className="container py-5">
      {/* Titre dynamique selon la recherche */}
      <h1 className="text-center mb-5">
        {query ? `Résultats pour "${query}"` : "Recherche"}
      </h1>

      {/* Message pendant le chargement */}
      {loading && <p className="text-center">Recherche en cours...</p>}

      {/* Message si aucun résultat */}
      {!loading && query && results.length === 0 && (
        <p className="text-center mt-4">Aucun résultat trouvé pour "{query}"</p>
      )}

      <div className="row g-4">
        {!loading &&
          results.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              // Construction de l'URL de l'image depuis le backend
              image={`http://localhost/renomeuble/backend/${product.image_path}`}
            />
          ))}
      </div>

      {/* Bouton de retour à l'accueil */}
      {!loading && (
        <div className="text-center mt-5">
          <Link
            to="/"
            className="btn btn-primary text-uppercase px-5 py-3 rounded-pill"
          >
            Retour à l'accueil
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
