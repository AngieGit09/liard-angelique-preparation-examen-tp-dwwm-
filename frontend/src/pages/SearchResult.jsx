import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import { searchProducts } from "../services/products.service";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        if (!query) {
          setResults([]);
          return;
        }

        setLoading(true);

        const data = await searchProducts(query);
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        {query ? `Résultats pour "${query}"` : "Recherche"}
      </h1>

      {loading && <p className="text-center">Recherche en cours...</p>}

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
              image={`http://localhost/renomeuble/backend/${product.image_path}`}
            />
          ))}
      </div>

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
