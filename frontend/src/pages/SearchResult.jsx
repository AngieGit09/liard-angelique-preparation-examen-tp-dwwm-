// ========= PAGE RECHERCHE PRODUIT =========

// useState : pour gérer l'état (résultats, loading)
// useEffect : pour exécuter du code quand la recherche change
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const API_URL = `http://localhost/renomeuble/backend/api/public/products/search.php?q=${encodeURIComponent(query)}`;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setResults([]);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="container py-5">
      {/* ==== TITRE ==== */}
      <h1 className="text-center mb-5">
        {query ? `Résultats pour "${query}"` : "Recherche"}
      </h1>

      {/* ==== LOADING ==== */}
      {loading && <p className="text-center">Recherche en cours...</p>}

      {/* ==== AUCUN RESULTAT ==== */}
      {!loading && query && results.length === 0 && (
        <p className="text-center mt-4">Aucun résultat trouvé pour "{query}"</p>
      )}

      {/* ==== RESULTATS ==== */}
      <div className="row g-4">
        {!loading &&
          results.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              image={`http://localhost/renomeuble/backend/${product.image_path}`}
            />
          ))}
      </div>

      {/* ==== BOUTON RETOUR ==== */}
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
