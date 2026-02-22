// ========= PAGE DASHBOARD ADMIN =========
// Tableau de bord de l’espace administrateur.
// Permet la vérification de session, l’affichage de statistiques,
// l’accès aux modules de gestion et l’ouverture de modales (produits / catégories).

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ModalProduct from "../components/ModalProduct";
import ModalCategory from "../components/ModalCategory";

function AdminDashboard() {
  const navigate = useNavigate();

  // ==== ETATS PRINCIPAUX DU DASHBOARD ====
  const [adminName, setAdminName] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastProduct, setLastProduct] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  // Liste des catégories (utilisée dans la modale d’ajout produit)
  const [categories, setCategories] = useState([]);

  // ==== VERIFICATION DE SESSION ADMIN + RECUPERATION DU NOM ====
  // Protection de la route : redirection vers login si non authentifié
  useEffect(() => {
    fetch("http://localhost/renomeuble/backend/authentification/me.php", {
      credentials: "include", // Conservation de la session PHP
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

  // ==== RECUPERATION DES STATISTIQUES DU DASHBOARD ====
  // Données synthétiques pour l’interface d’administration
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
  // Utilisées pour les formulaires d’ajout/édition de produits
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

  // ==== DECONNEXION ADMIN ====
  // Suppression de la session côté backend puis redirection vers la page de connexion
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
      {/* ==== HEADER DASHBOARD (TITRE + UTILISATEUR + LOGOUT) ==== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 text-center text-md-start">
        <h1 className="mb-2 mb-md-0">Dashboard administrateur</h1>

        {/* Affichage du nom de l’administrateur connecté */}
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

      {/* Accès aux messages */}
      {/* Bouton au centre */}
      <div className="d-flex justify-content-center mb-5">
        <Link
          to="/admin/messages"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
        >
          Voir les messages
        </Link>
      </div>

      {/* ==== BLOCS STATISTIQUES ==== */}
      {/* Indicateurs clés pour le suivi du catalogue */}
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

      {/* ==== ACTIONS PRINCIPALES DE L’ADMIN ==== */}
      {/* Accès rapide aux modules de gestion et création */}
      <div className="d-flex flex-column align-items-center gap-4">
        {/* Accès à la gestion complète des produits */}
        <Link
          to="/admin/gestion"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
        >
          Accéder à la gestion des produits
        </Link>

        {/* Ouverture modale d’ajout de produit */}
        <button
          type="button"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
          onClick={() => setActiveModal("product")}
        >
          Ajouter un produit
        </button>

        {/* Accès à la gestion des catégories */}
        <Link
          to="/admin/categories"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
        >
          Accéder à la gestion des catégories
        </Link>

        {/* Ouverture modale d’ajout de catégorie */}
        <button
          type="button"
          className="btn btn-primary rounded-pill px-5 py-3 w-100"
          style={{ maxWidth: "480px" }}
          onClick={() => setActiveModal("category")}
        >
          Ajouter une catégorie
        </button>
      </div>

      {/* ==== MODALES ADMIN ==== */}
      {/* Modale d’ajout de produit avec catégories dynamiques */}
      <ModalProduct
        isOpen={activeModal === "product"}
        mode="add"
        product={null}
        categories={categories}
        onClose={() => setActiveModal(null)}
      />

      {/* Modale d’ajout de catégorie */}
      <ModalCategory
        isOpen={activeModal === "category"}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
}

export default AdminDashboard;
