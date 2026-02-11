import { Link } from "react-router-dom";
import { useState } from "react";

import ModalProduct from "../components/ModalProduct";
import ModalCategory from "../components/ModalCategory";

function AdminDashboard() {
  // données temporaires (plus tard : API / backend)
  const adminName = "Nom Admin";
  const totalProducts = 12;
  const lastProduct = "Table en chêne";

  // gestion des modales
  const [activeModal, setActiveModal] = useState(null);
  // null | "product" | "category"

  return (
    <section className="container py-5">
      {/* ==== HEADER DASHBOARD ==== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 text-center text-md-start">
        <h1 className="mb-2 mb-md-0">Dashboard administrateur</h1>
        <span className="fw-semibold">{adminName}</span>
      </div>

      {/* ==== STATS ==== */}
      <div className="row justify-content-center mb-5 g-4">
        <div className="col-12 col-md-4">
          <div
            className="p-4 text-center h-100"
            style={{ backgroundColor: "var(--bs-secondary)" }}
          >
            <p className="mb-1 fw-semibold">Nombre de produits disponibles :</p>
            <p className="mb-0">{totalProducts}</p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="p-4 text-center h-100"
            style={{ backgroundColor: "var(--bs-secondary)" }}
          >
            <p className="mb-1 fw-semibold">Dernier article mis en ligne :</p>
            <p className="mb-0">{lastProduct}</p>
          </div>
        </div>
      </div>

      {/* ==== ACTIONS ==== */}
      <div className="d-flex flex-column align-items-center gap-4">
        {/* Accès gestion produits */}
        <Link
          to="/admin/gestion"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
        >
          Accéder à la gestion des produits
        </Link>

        {/* Ajouter un produit */}
        <button
          type="button"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
          onClick={() => setActiveModal("product")}
        >
          Ajouter un produit
        </button>

        {/* Ajouter une catégorie */}
        <button
          type="button"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
          onClick={() => setActiveModal("category")}
        >
          Ajouter une catégorie
        </button>
      </div>

      {/* ==== MODALES ==== */}
      <ModalProduct
        isOpen={activeModal === "product"}
        title="Ajouter un produit"
        onClose={() => setActiveModal(null)}
      />

      <ModalCategory
        isOpen={activeModal === "category"}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
}

export default AdminDashboard;
