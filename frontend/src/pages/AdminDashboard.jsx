// ===== PAGE DASHBOARD ADMIN =====
// Tableau de bord permettant à l’administrateur de visualiser les statistiques du site
// et d’accéder rapidement aux fonctionnalités de gestion (produits, catégories, messages)

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ModalProduct from "../components/ModalProduct";
import ModalCategory from "../components/ModalCategory";

import { checkAdminAuth, logoutAdmin } from "../services/auth.service";
import { getAdminStats, getAdminCategories } from "../services/admin.service";

function AdminDashboard() {
  const navigate = useNavigate();

  // Informations admin + données affichées
  const [adminName, setAdminName] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastProduct, setLastProduct] = useState("");
  const [categories, setCategories] = useState([]);
  // Gestion des modales (ajout produit / catégorie)
  const [activeModal, setActiveModal] = useState(null);

  // Vérifie si l’admin est authentifié au chargement
  useEffect(() => {
    checkAdminAuth()
      .then((data) => setAdminName(data.username))
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  // Récupère les statistiques + catégories depuis l’API
  useEffect(() => {
    Promise.all([getAdminStats(), getAdminCategories()])
      .then(([stats, cats]) => {
        setTotalProducts(stats.totalProducts);
        setLastProduct(stats.lastProduct);
        setCategories(cats);
      })
      .catch(console.error);
  }, []);

  // Déconnexion admin
  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <section className="container py-5">
      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 text-center text-md-start">
        <h1 className="mb-2 mb-md-0">Dashboard administrateur</h1>

        <div className="d-flex align-items-center gap-3">
          {/* Affichage du nom admin avec majuscule */}
          <span className="fw-semibold">
            Bonjour{" "}
            {adminName &&
              adminName.charAt(0).toUpperCase() + adminName.slice(1)}
          </span>

          <button
            onClick={handleLogout}
            className="btn btn-primary text-uppercase px-4 py-2 rounded-pill"
            style={{ fontSize: "0.8rem" }}
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* BOUTON MESSAGES */}
      <div className="d-flex justify-content-center mb-5">
        <Link
          to="/admin/messages"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
        >
          Voir les messages
        </Link>
      </div>

      {/* STATS */}
      <div className="row justify-content-center mb-5 g-4">
        <div className="col-12 col-md-4">
          <div
            className="p-4 text-center h-100"
            style={{ backgroundColor: "var(--bs-secondary)" }}
          >
            <p className="mb-1 fw-semibold">Nombre de produits disponibles :</p>
            <p className="mb-0 fs-3">{totalProducts}</p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="p-4 text-center h-100"
            style={{ backgroundColor: "var(--bs-secondary)" }}
          >
            <p className="mb-1 fw-semibold">Dernier article mis en ligne :</p>
            {/* Fallback si aucun produit */}
            <p className="mb-0 fs-3">{lastProduct || "Aucun produit"}</p>
          </div>
        </div>
      </div>

      {/* ACTIONS ADMIN */}
      <div className="d-flex flex-column align-items-center gap-4">
        <Link
          to="/admin/gestion"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
        >
          Accéder à la gestion des produits
        </Link>

        {/* Ouverture modale ajout produit */}
        <button
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
          onClick={() => setActiveModal("product")}
        >
          Ajouter un produit
        </button>

        <Link
          to="/admin/categories"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
        >
          Accéder à la gestion des catégories
        </Link>

        {/* Ouverture modale ajout catégorie */}
        <button
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
          onClick={() => setActiveModal("category")}
        >
          Ajouter une catégorie
        </button>
      </div>

      {/* MODALES */}

      <ModalProduct
        isOpen={activeModal === "product"}
        mode="add"
        product={null}
        categories={categories}
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
