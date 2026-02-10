import { useState } from "react";
import ProductCard from "../components/ProductCard";

function Category() {
  // Liste temporaire des produits (sera remplacée plus tard par les données API)
  const products = [
    { id: 1, name: "Table en chêne", price: 200, image: "/images/table.png" },
    {
      id: 2,
      name: "Table en chêne",
      price: 300,
      image: "/images/table_basse.png",
    },
    {
      id: 3,
      name: "Table en chêne",
      price: 280,
      image: "/images/table-basse.png",
    },
    {
      id: 4,
      name: "Table en chêne",
      price: 150,
      image: "/images/table_basse.png",
    },
    {
      id: 5,
      name: "Table en chêne",
      price: 250,
      image: "/images/table-basse.png",
    },
    { id: 6, name: "Table en chêne", price: 410, image: "/images/table.png" },
  ];

  // État pour gérer le tri des produits
  const [sortBy, setSortBy] = useState("Pertinence");

  return (
    <div className="category">
      <section className="container-fluid px-5 py-4">
        <h1 className="text-center text-uppercase mb-3">
          Tous nos meubles de salon disponibles
        </h1>

        <div className="d-flex justify-content-end align-items-center">
          <label htmlFor="sort" className="me-2 small">
            Trier par :
          </label>
          <select
            id="sort"
            className="form-select form-select-sm text-primary"
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
      </section>

      {/* Grille des produits */}
      <section className="container-fluid px-5 py-4">
        <div className="row g-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Category;
