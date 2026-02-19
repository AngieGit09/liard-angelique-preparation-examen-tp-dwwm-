import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ModalProduct from "../components/ModalProduct";
import ModalCategory from "../components/ModalCategory";

function AdminDashboard() {
  const navigate = useNavigate();

  // ==== STATES ====
  const [adminName, setAdminName] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastProduct, setLastProduct] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [categories, setCategories] = useState([]); // NOUVEAU

  // ==== VERIFICATION SESSION + NOM ADMIN ====
  useEffect(() => {
    fetch("http://localhost/renomeuble/backend/authentification/me.php", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Non autorisé");
        }
        return res.json();
      })
      .then((data) => {
        setAdminName(data.username);
      })
      .catch(() => {
        navigate("/admin/login");
      });
  }, [navigate]);

  // ==== RECUPERATION DES STATS DASHBOARD ====
  useEffect(() => {
    fetch("http://localhost/renomeuble/backend/api/admin/stats.php", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur stats");
        }
        return res.json();
      })
      .then((data) => {
        setTotalProducts(data.totalProducts);
        setLastProduct(data.lastProduct);
      })
      .catch((err) => {
        console.error("Erreur récupération stats :", err);
      });
  }, []);

  // ==== RECUPERATION DES CATEGORIES (API ADMIN) ====
  useEffect(() => {
    fetch(
      "http://localhost/renomeuble/backend/api/admin/categories/index.php",
      {
        credentials: "include",
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur catégories");
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("Erreur récupération catégories :", err);
      });
  }, []);

  // ====== LOGOUT ======
  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost/renomeuble/backend/authentification/logout.php",
        {
          method: "POST",
          credentials: "include",
        },
      );

      navigate("/admin/login");
    } catch (error) {
      console.error("Erreur logout :", error);
    }
  };

  return (
    <section className="container py-5">
      {/* ==== HEADER DASHBOARD ==== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 text-center text-md-start">
        <h1 className="mb-2 mb-md-0">Dashboard administrateur</h1>

        <div className="d-flex align-items-center gap-3">
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

      {/* ==== STATS ==== */}
      <div className="row justify-content-center mb-5 g-4">
        <div className="col-12 col-md-4">
          <div
            className="p-4 text-center h-100"
            style={{ backgroundColor: "var(--bs-secondary)" }}
          >
            <p className="mb-1 fw-semibold">Nombre de produits disponibles :</p>
            <p className="mb-0 fs-3 ">{totalProducts}</p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="p-4 text-center h-100"
            style={{ backgroundColor: "var(--bs-secondary)" }}
          >
            <p className="mb-1 fw-semibold">Dernier article mis en ligne :</p>
            <p className="mb-0  fs-3">{lastProduct || "Aucun produit"}</p>
          </div>
        </div>
      </div>

      {/* ==== ACTIONS ==== */}
      <div className="d-flex flex-column align-items-center gap-4">
        <Link
          to="/admin/gestion"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
        >
          Accéder à la gestion des produits
        </Link>

        <button
          type="button"
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
        mode="add"
        product={null}
        categories={categories} // CATEGORIES DYNAMIQUES
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
