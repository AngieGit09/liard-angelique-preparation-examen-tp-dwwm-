import { Link } from "react-router-dom";
import { useState } from "react";
import CardGestion from "../components/CardGestion";

function AdminGestion() {
  const [visibleCount, setVisibleCount] = useState(4);

  const products = [
    {
      id: 1,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200.00€",
      description: "Table à manger ...",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
    {
      id: 2,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200.00€",
      description: "Table à manger ...",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
    {
      id: 3,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200.00€",
      description: "Table à manger ...",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
    {
      id: 4,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200.00€",
      description: "Table à manger ...",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
    {
      id: 5,
      title: "Table en chêne",
      category: "Meuble de salon",
      price: "200.00€",
      description: "Table à manger ...",
      date: "22/12/2025",
      image: "/images/table_basse.png",
      photosCount: 4,
    },
  ];

  return (
    <section className="container py-5">
      {/* ==== LIEN RETOUR ==== */}
      <div className="mb-4">
        <Link to="/admin" className="text-decoration-none">
          Retour vers le dashboard
        </Link>
      </div>

      {/* ==== TITRE ==== */}
      <h1 className="text-center mb-4">Gestion des produits</h1>

      {/* ==== ACTIONS ==== */}
      <div className="d-flex flex-column align-items-center my-5 gap-3">
        <button
          className="btn btn-primary rounded-pill px-4 py-2 w-100"
          style={{ maxWidth: "480px" }}
        >
          Ajouter un produit
        </button>

        <button
          className="btn btn-primary rounded-pill px-4 py-2 w-100"
          style={{ maxWidth: "480px" }}
        >
          Ajouter une catégorie
        </button>
      </div>

      {/* ==== FILTRES ==== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <label className="me-2 fw-semibold">Catégorie :</label>
          <select className="form-select d-inline-block w-auto me-3">
            <option>Tous les produits</option>
            <option>Meubles de salon</option>
            <option>Meubles de chambre</option>
            <option>Meubles de bureau</option>
            <option>Accessoires</option>
          </select>
        </div>

        <div>
          <label className="me-2 fw-semibold">Trier par :</label>
          <select className="form-select d-inline-block w-auto">
            <option>Nouveautés</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Ordre alphabétique A–Z</option>
            <option>Ordre alphabétique Z–A</option>
          </select>
        </div>
      </div>

      {/* ==== LISTE PRODUITS ==== */}
      <div className="row g-4">
        {products.slice(0, visibleCount).map((product) => (
          <div key={product.id} className="col-12 col-md-6">
            <CardGestion product={product} />
          </div>
        ))}
      </div>

      {/* ==== VOIR PLUS ==== */}
      {visibleCount < products.length && (
        <div className="text-center mt-5">
          <button
            className="btn btn-primary rounded-pill px-5"
            onClick={() => setVisibleCount(visibleCount + 4)}
          >
            Voir +
          </button>
        </div>
      )}
    </section>
  );
}

export default AdminGestion;
