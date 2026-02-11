import { useState } from "react";
import ProductCard from "../components/ProductCard";

function Category() {
  /* === DONNÉES (temporaire, API plus tard) === */
  const products = [
    { id: 1, name: "Table en chêne", price: 200, image: "/images/table.png" },
    {
      id: 2,
      name: "Table basse",
      price: 300,
      image: "/images/table_basse.png",
    },
    {
      id: 3,
      name: "Table ronde",
      price: 280,
      image: "/images/table-basse.png",
    },
    {
      id: 4,
      name: "Table carrée",
      price: 150,
      image: "/images/table_basse.png",
    },
    {
      id: 5,
      name: "Table design",
      price: 250,
      image: "/images/table-basse.png",
    },
    { id: 6, name: "Table ancienne", price: 410, image: "/images/table.png" },
  ];

  /* === STATES === */
  const [sortBy, setSortBy] = useState("Pertinence");
  const [searchTerm, setSearchTerm] = useState("");

  /* === FILTRAGE PAR RECHERCHE === */
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category">
      {/* === TITRE + TRI === */}
      <section className="container-fluid px-5 py-4">
        <h1 className="text-center text-uppercase mb-4">
          Tous nos meubles de salon disponibles
        </h1>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-end gap-3">
          {/* BARRE DE RECHERCHE */}
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: "280px" }}
            placeholder="Rechercher un produit"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* TRI */}
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
              <option value="Nouveautés">Nouveautés</option>
            </select>
          </div>
        </div>
      </section>

      {/* === GRILLE PRODUITS === */}
      <section className="container-fluid px-5 py-4">
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))
          ) : (
            <p className="text-center mt-4">
              Aucun produit ne correspond à votre recherche.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Category;
